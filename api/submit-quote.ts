import { sql } from '@vercel/postgres'
import { kv } from '@vercel/kv'
import { google } from 'googleapis'
import { Resend } from 'resend'

import { submitQuoteRequestSchema, SubmitQuoteRequest, SubmitQuoteResponse } from './lib/schemas'
import { encrypt, hashForLogging } from './utils/encryption'
import { logger } from './utils/logger'
import { emailRateLimiter, ipRateLimiter } from './utils/rateLimit'

// Initialize services
const resend = new Resend(process.env.RESEND_API_KEY)
const sheets = google.sheets({ version: 'v4', auth: new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
}) })

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const startTime = Date.now()
  const clientIP = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown'
  let requestData: SubmitQuoteRequest | undefined

  try {
    // Parse and validate request
    const body = req.body
    const validation = submitQuoteRequestSchema.safeParse(body)

    if (!validation.success) {
      logger.warn('validation_failed', {
        metadata: { validationErrors: validation.error.format() }
      })

      const response: SubmitQuoteResponse = {
        success: false,
        referenceNumber: '',
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request data',
          retryable: false
        },
        timestamp: new Date().toISOString()
      }

      return res.status(400).json(response)
    }

    requestData = validation.data

    // Rate limiting
    const emailLimit = await emailRateLimiter.check(requestData.contactInfo.email)
    const ipLimit = await ipRateLimiter.check(clientIP)

    if (!emailLimit.allowed) {
      const response: SubmitQuoteResponse = {
        success: false,
        referenceNumber: requestData!.referenceNumber,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many submissions from this email',
          retryable: true,
          retryAfter: emailLimit.retryAfter
        },
        timestamp: new Date().toISOString()
      }
      return res.status(429).json(response)
    }

    if (!ipLimit.allowed) {
      const response: SubmitQuoteResponse = {
        success: false,
        referenceNumber: requestData!.referenceNumber,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many submissions from this IP',
          retryable: true,
          retryAfter: ipLimit.retryAfter
        },
        timestamp: new Date().toISOString()
      }
      return res.status(429).json(response)
    }

    // Check idempotency
    const idempotencyKey = `idempotency:${requestData!.idempotencyKey}`
    const existingResponse = await kv.get<SubmitQuoteResponse>(idempotencyKey)

    if (existingResponse) {
      logger.info('idempotent_request', {
        referenceNumber: requestData!.referenceNumber,
        idempotencyKey: requestData!.idempotencyKey
      })
      return res.status(200).json(existingResponse)
    }

    // Execute parallel operations
    const results = await Promise.allSettled([
      saveToDatabase(requestData),
      saveToGoogleSheets(requestData),
      sendConfirmationEmail(requestData),
      logAnalytics(requestData)
    ])

    // Process results
    const warnings: SubmitQuoteResponse['warnings'] = []
    let hasCriticalFailure = false

    results.forEach((result, index) => {
      const operation = ['database', 'sheets', 'email', 'analytics'][index]

      if (result.status === 'rejected') {
        if (operation === 'database') {
          hasCriticalFailure = true
          logger.error('database_save_failed', result.reason, {
            referenceNumber: requestData!.referenceNumber
          })
        } else {
          warnings.push({
            code: operation === 'email' ? 'EMAIL_DELAYED' :
                  operation === 'sheets' ? 'SHEETS_SLOW' : 'ANALYTICS_FAILED',
            message: `${operation} operation failed: ${result.reason.message}`
          })
          logger.warn(`${operation}_failed`, {
            metadata: { error: result.reason, referenceNumber: requestData!.referenceNumber }
          })
        }
      }
    })

    if (hasCriticalFailure) {
      const response: SubmitQuoteResponse = {
        success: false,
        referenceNumber: requestData!.referenceNumber,
        error: {
          code: 'STORAGE_ERROR',
          message: 'Failed to save quote data',
          retryable: true
        },
        timestamp: new Date().toISOString()
      }

      return res.status(500).json(response)
    }

    // Success response
    const response: SubmitQuoteResponse = {
      success: true,
      referenceNumber: requestData!.referenceNumber,
      warnings: warnings.length > 0 ? warnings : undefined,
      processingTime: Date.now() - startTime,
      timestamp: new Date().toISOString()
    }

    // Cache response for idempotency
    await kv.set(idempotencyKey, response, { ex: 24 * 60 * 60 }) // 24 hours

    logger.info('quote_submitted', {
      referenceNumber: requestData!.referenceNumber,
      insuranceType: requestData!.insuranceType,
      duration: Date.now() - startTime,
      email: hashForLogging(requestData!.contactInfo.email)
    })

    return res.status(200).json(response)

  } catch (error) {
    logger.error('unexpected_error', error as Error, {
      referenceNumber: requestData?.referenceNumber
    })

    const response: SubmitQuoteResponse = {
      success: false,
      referenceNumber: requestData?.referenceNumber || '',
      error: {
        code: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred',
        retryable: true
      },
      timestamp: new Date().toISOString()
    }

    return res.status(500).json(response)
  }
}

// Helper functions for parallel operations
async function saveToDatabase(data: SubmitQuoteRequest) {
  // Encrypt sensitive data
  const encryptedContactInfo = {
    ...data.contactInfo,
    email: encrypt(data.contactInfo.email),
    phone: encrypt(data.contactInfo.phone)
  }

  // Encrypt ID numbers in form data if present
  const encryptedFormData = {
    ...data.formData,
    ...('idNumber' in data.formData && data.formData.idNumber && { idNumber: encrypt(data.formData.idNumber) })
  }

  await sql`
    INSERT INTO quotes (
      reference_number, idempotency_key, insurance_type, form_data, quote_data,
      contact_info, status, created_at, updated_at, consent_given, marketing_opt_in,
      source, user_agent
    ) VALUES (
      ${data.referenceNumber}, ${data.idempotencyKey}, ${data.insuranceType},
      ${JSON.stringify(encryptedFormData)}, ${JSON.stringify(data.quote)},
      ${JSON.stringify(encryptedContactInfo)}, 'pending',
      ${data.createdAt}, ${data.updatedAt}, ${data.consentGiven}, ${data.marketingOptIn},
      ${data.source}, ${data.userAgent}
    )
  `
}

async function saveToGoogleSheets(data: SubmitQuoteRequest) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID
  if (!spreadsheetId) return

  const sheetName = data.insuranceType
  const values = [
    data.referenceNumber,
    data.createdAt,
    data.contactInfo.name,
    data.contactInfo.email,
    data.contactInfo.phone,
    'pending',
    data.quote.monthlyPremium,
    data.quote.annualPremium,
    JSON.stringify(data.formData),
    JSON.stringify(data.quote)
  ]

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:J`,
    valueInputOption: 'RAW',
    requestBody: { values: [values] }
  })
}

async function sendConfirmationEmail(data: SubmitQuoteRequest) {
  const subject = data.contactInfo.preferredLanguage === 'es'
    ? `Confirmación de Cotización - ${data.referenceNumber}`
    : `Quote Confirmation - ${data.referenceNumber}`

  const html = generateEmailHTML(data)

  await resend.emails.send({
    from: process.env.FROM_EMAIL || 'noreply@yourdomain.com',
    to: data.contactInfo.email,
    subject,
    html
  })
}

async function logAnalytics(data: SubmitQuoteRequest) {
  // Placeholder for analytics logging (Google Analytics, Mixpanel, etc.)
  // For now, just log to our structured logger
  logger.info('analytics_event', {
    metadata: {
      event: 'quote_submitted',
      insuranceType: data.insuranceType,
      quotedAmount: data.quote.monthlyPremium,
      source: data.source,
      referenceNumber: data.referenceNumber
    }
  })
}

function generateEmailHTML(data: SubmitQuoteRequest): string {
  const lang = data.contactInfo.preferredLanguage
  const currency = 'USD'

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>${lang === 'es' ? 'Confirmación de Cotización' : 'Quote Confirmation'}</h1>
      <p>${lang === 'es' ? 'Referencia' : 'Reference'}: ${data.referenceNumber}</p>
      <p>${lang === 'es' ? 'Tipo de Seguro' : 'Insurance Type'}: ${data.insuranceType}</p>
      <p>${lang === 'es' ? 'Prima Mensual' : 'Monthly Premium'}: ${currency} ${data.quote.monthlyPremium}</p>
      <p>${lang === 'es' ? 'Prima Anual' : 'Annual Premium'}: ${currency} ${data.quote.annualPremium}</p>
      <p>${lang === 'es' ? 'Gracias por su interés.' : 'Thank you for your interest.'}</p>
    </div>
  `
}