import { sql } from '@vercel/postgres'
import { decrypt } from '../utils/encryption'
import { logger } from '../utils/logger'

interface QuoteRecord {
  reference_number: string
  insurance_type: string
  form_data: any
  quote_data: any
  contact_info: any
  status: string
  created_at: string
  updated_at: string
  consent_given: boolean
  marketing_opt_in: boolean
  source?: string
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { ref } = req.query
  const email = req.headers['x-user-email'] // Would be set by authentication middleware

  if (!ref || typeof ref !== 'string') {
    return res.status(400).json({ error: 'Reference number required' })
  }

  // Basic validation for reference format
  if (!/^QT-\d{4}-\d{6}$/.test(ref)) {
    return res.status(400).json({ error: 'Invalid reference format' })
  }

  try {
    // Fetch quote from database
    const result = await sql`
      SELECT reference_number, insurance_type, form_data, quote_data,
             contact_info, status, created_at, updated_at,
             consent_given, marketing_opt_in, source
      FROM quotes
      WHERE reference_number = ${ref}
    `

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Quote not found' })
    }

    const quote = result.rows[0] as QuoteRecord

    // Decrypt sensitive data
    const decryptedContactInfo = {
      ...quote.contact_info,
      email: decrypt(quote.contact_info.email),
      phone: decrypt(quote.contact_info.phone)
    }

    const decryptedFormData = {
      ...quote.form_data,
      ...('idNumber' in quote.form_data && quote.form_data.idNumber && {
        idNumber: decrypt(quote.form_data.idNumber)
      })
    }

    const response = {
      referenceNumber: quote.reference_number,
      insuranceType: quote.insurance_type,
      formData: decryptedFormData,
      quote: quote.quote_data,
      contactInfo: decryptedContactInfo,
      status: quote.status,
      createdAt: quote.created_at,
      updatedAt: quote.updated_at,
      consentGiven: quote.consent_given,
      marketingOptIn: quote.marketing_opt_in,
      source: quote.source
    }

    logger.info('quote_retrieved', {
      referenceNumber: ref,
      insuranceType: quote.insurance_type
    })

    return res.status(200).json(response)

  } catch (error) {
    logger.error('quote_retrieval_failed', error as Error, {
      referenceNumber: ref
    })

    return res.status(500).json({ error: 'Failed to retrieve quote' })
  }
}