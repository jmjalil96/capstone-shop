import { z } from 'zod'

// Enhanced contact info schema
const contactInfoSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  phone: z.string().regex(/^\+593[0-9]{9}$/),
  preferredLanguage: z.enum(['es', 'en']).optional().default('es')
})

// Base insurance form data schemas (imported from frontend)
const autoInsuranceSchema = z.object({
  licensePlate: z.string().min(1).max(20),
  idNumber: z.string().min(1).regex(/^[0-9]+$/),
  make: z.string().min(1).max(50),
  model: z.string().min(1).max(50),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  insuredSum: z.number().positive().min(1000)
})

// Add other insurance schemas similarly...
const homeInsuranceSchema = z.object({
  // Define based on frontend schema
  propertyValue: z.number().positive(),
  address: z.string().min(1),
  // Add other fields
})

const lifeInsuranceSchema = z.object({
  // Define based on frontend schema
  coverageAmount: z.number().positive(),
  // Add other fields
})

const healthInsuranceSchema = z.object({
  // Define based on frontend schema
  planType: z.string(),
  // Add other fields
})

const businessInsuranceSchema = z.object({
  // Define based on frontend schema
  businessType: z.string(),
  // Add other fields
})

// Union of all form data
const insuranceFormDataSchema = z.union([
  autoInsuranceSchema,
  homeInsuranceSchema,
  lifeInsuranceSchema,
  healthInsuranceSchema,
  businessInsuranceSchema
])

// Quote schema
const quoteSchema = z.object({
  type: z.enum(['auto', 'home', 'life', 'health', 'business']),
  monthlyPremium: z.number().positive(),
  annualPremium: z.number().positive(),
  coverage: z.array(z.string()),
  details: insuranceFormDataSchema
})

// Main request schema
export const submitQuoteRequestSchema = z.object({
  insuranceType: z.enum(['auto', 'home', 'life', 'health', 'business']),
  formData: insuranceFormDataSchema,
  quote: quoteSchema,
  contactInfo: contactInfoSchema,
  referenceNumber: z.string().regex(/^QT-\d{4}-\d{6}$/),
  idempotencyKey: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  consentGiven: z.boolean().refine(val => val === true, 'Consent must be given'),
  marketingOptIn: z.boolean().optional().default(false),
  source: z.string().optional(),
  userAgent: z.string().optional()
})

// Response schemas
export const submitQuoteResponseSchema = z.object({
  success: z.boolean(),
  referenceNumber: z.string(),
  warnings: z.array(z.object({
    code: z.enum(['EMAIL_DELAYED', 'SHEETS_SLOW', 'ANALYTICS_FAILED']),
    message: z.string()
  })).optional(),
  error: z.object({
    code: z.enum(['VALIDATION_ERROR', 'DUPLICATE_SUBMISSION', 'RATE_LIMIT_EXCEEDED',
                  'STORAGE_ERROR', 'EMAIL_ERROR', 'UNKNOWN_ERROR']),
    message: z.string(),
    retryable: z.boolean(),
    retryAfter: z.number().optional(),
    details: z.record(z.string(), z.unknown()).optional()
  }).optional(),
  processingTime: z.number().optional(),
  timestamp: z.string().datetime()
})

// Health check response
export const healthCheckResponseSchema = z.object({
  status: z.enum(['healthy', 'degraded', 'unhealthy']),
  checks: z.object({
    postgres: z.object({
      status: z.enum(['up', 'down']),
      latency: z.number().optional()
    }),
    kv: z.object({
      status: z.enum(['up', 'down']),
      latency: z.number().optional()
    }),
    sheets: z.object({
      status: z.enum(['up', 'down']),
      latency: z.number().optional()
    }),
    resend: z.object({
      status: z.enum(['up', 'down']),
      latency: z.number().optional()
    })
  }),
  timestamp: z.string().datetime()
})

// Export types
export type SubmitQuoteRequest = z.infer<typeof submitQuoteRequestSchema>
export type SubmitQuoteResponse = z.infer<typeof submitQuoteResponseSchema>
export type HealthCheckResponse = z.infer<typeof healthCheckResponseSchema>