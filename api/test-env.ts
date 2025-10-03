export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Check all environment variables except sensitive ones
  const envStatus = {
    // Vercel Services
    POSTGRES_URL: {
      present: !!process.env.POSTGRES_URL,
      preview: process.env.POSTGRES_URL?.substring(0, 20) + '...' || 'missing'
    },
    KV_URL: {
      present: !!process.env.KV_URL,
      preview: process.env.KV_URL?.substring(0, 20) + '...' || 'missing'
    },

    // External Services
    GOOGLE_SHEET_ID: {
      present: !!process.env.GOOGLE_SHEET_ID,
      value: process.env.GOOGLE_SHEET_ID || 'missing'
    },
    RESEND_API_KEY: {
      present: !!process.env.RESEND_API_KEY,
      preview: process.env.RESEND_API_KEY ? 're_...' + process.env.RESEND_API_KEY.substring(10) : 'missing'
    },
    FROM_EMAIL: {
      present: !!process.env.FROM_EMAIL,
      value: process.env.FROM_EMAIL || 'missing'
    },

    // Encryption
    ENCRYPTION_KEY: {
      present: !!process.env.ENCRYPTION_KEY,
      length: process.env.ENCRYPTION_KEY?.length || 0,
      valid: process.env.ENCRYPTION_KEY?.length === 64 // 32 bytes in hex
    },
    ENCRYPTION_SALT: {
      present: !!process.env.ENCRYPTION_SALT,
      length: process.env.ENCRYPTION_SALT?.length || 0,
      valid: process.env.ENCRYPTION_SALT?.length === 32 // 16 bytes in hex
    },

    // Google Service Account (sensitive - just check presence)
    GOOGLE_SERVICE_ACCOUNT_KEY: {
      present: !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
      isValidJSON: (() => {
        try {
          if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) return false
          const parsed = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY)
          return !!(parsed.type === 'service_account' && parsed.project_id)
        } catch {
          return false
        }
      })()
    }
  }

  // Overall status
  const allPresent = Object.values(envStatus).every((env: any) => env.present)
  const allValid = allPresent && envStatus.ENCRYPTION_KEY.valid && envStatus.ENCRYPTION_SALT.valid && envStatus.GOOGLE_SERVICE_ACCOUNT_KEY.isValidJSON

  res.status(allValid ? 200 : 500).json({
    status: allValid ? 'ready' : 'incomplete',
    timestamp: new Date().toISOString(),
    environment: envStatus,
    summary: {
      totalVariables: Object.keys(envStatus).length,
      present: Object.values(envStatus).filter((env: any) => env.present).length,
      valid: allValid
    },
    nextSteps: allValid
      ? ['Environment is ready! You can now test the API endpoints.']
      : [
          'Missing environment variables detected.',
          'Please check Vercel dashboard and add missing variables.',
          'Ensure encryption keys are 64 and 32 characters respectively.',
          'Verify Google service account JSON is valid.'
        ]
  })
}