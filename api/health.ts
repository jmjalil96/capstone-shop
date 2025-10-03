import { sql } from '@vercel/postgres'
import { kv } from '@vercel/kv'
import { google } from 'googleapis'
import { Resend } from 'resend'

import { healthCheckResponseSchema, HealthCheckResponse } from './lib/schemas'
import { logger } from './utils/logger'

const resend = new Resend(process.env.RESEND_API_KEY)
const sheets = google.sheets({ version: 'v4', auth: new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
}) })

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const checks: HealthCheckResponse['checks'] = {
    postgres: { status: 'down' },
    kv: { status: 'down' },
    sheets: { status: 'down' },
    resend: { status: 'down' }
  }

  let overallStatus: HealthCheckResponse['status'] = 'healthy'

  // Check Postgres
  const postgresStart = Date.now()
  try {
    await sql`SELECT 1`
    checks.postgres = { status: 'up', latency: Date.now() - postgresStart }
  } catch (error) {
    checks.postgres = { status: 'down' }
    overallStatus = 'unhealthy'
    logger.error('health_check_postgres_failed', error as Error)
  }

  // Check KV
  const kvStart = Date.now()
  try {
    await kv.set('health-check', 'ok', { ex: 10 })
    await kv.get('health-check')
    checks.kv = { status: 'up', latency: Date.now() - kvStart }
  } catch (error) {
    checks.kv = { status: 'down' }
    overallStatus = 'unhealthy'
    logger.error('health_check_kv_failed', error as Error)
  }

  // Check Google Sheets
  const sheetsStart = Date.now()
  try {
    if (process.env.GOOGLE_SHEET_ID) {
      await sheets.spreadsheets.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID
      })
      checks.sheets = { status: 'up', latency: Date.now() - sheetsStart }
    } else {
      checks.sheets = { status: 'up' } // Consider up if not configured
    }
  } catch (error) {
    checks.sheets = { status: 'down' }
    overallStatus = 'degraded' // Non-critical
    logger.warn('health_check_sheets_failed', { metadata: { errorMessage: (error as Error).message } })
  }

  // Check Resend
  const resendStart = Date.now()
  try {
    // Simple API call to check connectivity
    await resend.domains.list()
    checks.resend = { status: 'up', latency: Date.now() - resendStart }
  } catch (error) {
    checks.resend = { status: 'down' }
    overallStatus = 'degraded' // Non-critical
    logger.warn('health_check_resend_failed', { metadata: { errorMessage: (error as Error).message } })
  }

  const response: HealthCheckResponse = {
    status: overallStatus,
    checks,
    timestamp: new Date().toISOString()
  }

  const statusCode = overallStatus === 'healthy' ? 200 :
                     overallStatus === 'degraded' ? 200 : 503

  logger.info('health_check_completed', {
    metadata: { status: overallStatus, checks }
  })

  return res.status(statusCode).json(response)
}