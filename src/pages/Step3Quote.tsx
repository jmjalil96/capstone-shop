import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuoteStore } from '@/store/quoteStore'
import type { ContactInfoFormData } from '@/schemas/contactInfo'
import FormPageLayout from '@/components/ui/form/FormPageLayout'
import QuoteDisplayCard from '@/components/step3/QuoteDisplayCard'
import ContactFormCard from '@/components/step3/ContactFormCard'
import TrustIndicators from '@/components/step3/TrustIndicators'

function Step3Quote() {
  const navigate = useNavigate()
  const { quote, setContactInfo, insuranceType, formData, referenceNumber, createdAt, updatedAt } = useQuoteStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showRetryButton, setShowRetryButton] = useState(false)
  const [retryAfter, setRetryAfter] = useState<number | null>(null)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Navigation guard: redirect if any required state is missing
  useEffect(() => {
    if (!insuranceType || !formData || !quote) {
      navigate('/quote/type')
    }
  }, [insuranceType, formData, quote, navigate])

  const handleSubmit = async (data: ContactInfoFormData) => {
    const idempotencyKey = crypto.randomUUID()
    setIsSubmitting(true)
    setError(null)

    const startTime = Date.now()

    try {
      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          insuranceType,
          formData,
          quote,
          contactInfo: data,
          referenceNumber,
          idempotencyKey,
          createdAt,
          updatedAt,
          consentGiven: true, // Assuming consent is collected in the form
          marketingOptIn: false,
          source: new URLSearchParams(window.location.search).get('utm_source'),
          userAgent: navigator.userAgent
        })
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.error?.retryable) {
          setShowRetryButton(true)
          setRetryAfter(result.error.retryAfter)
        }
        throw new Error(result.error?.message || 'Submission failed')
      }

      // Show warnings if any (non-blocking)
      if (result.warnings?.length) {
        console.warn('Submission warnings:', result.warnings)
      }

      // Update store with contact info
      setContactInfo(data)

      // Track success
      // analytics.track('quote_submitted', {
      //   referenceNumber: result.referenceNumber,
      //   insuranceType,
      //   duration: Date.now() - startTime
      // })

      // Navigate to success page
      navigate(`/success?ref=${result.referenceNumber}`)

    } catch (err) {
      setError((err as Error).message)
      // analytics.track('quote_submission_failed', {
      //   error: (err as Error).message
      // })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    navigate('/quote/details')
  }

  // Don't render if any required state is missing (guard is redirecting)
  if (!insuranceType || !formData || !quote) {
    return null
  }

  return (
    <FormPageLayout>
      {/* Header */}
      <div className="mb-12 text-center">
        <div
          className="mb-6 inline-block rounded-full px-4 py-2 backdrop-blur-sm"
          style={{
            backgroundColor: 'rgba(29, 44, 61, 0.08)',
            border: '1px solid rgba(29, 44, 61, 0.15)',
          }}
        >
          <span className="font-medium text-sm" style={{ color: '#0c2939' }}>
            Paso 3 de 3
          </span>
        </div>

        <h1
          className="mb-4 font-bold text-3xl sm:text-4xl md:text-5xl"
          style={{ color: '#0c2939' }}
        >
          ¡Tu Cotización Está Lista!
        </h1>

        <p className="mx-auto max-w-2xl text-lg leading-relaxed" style={{ color: '#666666' }}>
          Aquí está tu cotización estimada. Completa tus datos para recibir la oferta detallada.
        </p>
      </div>

      {/* Main Content - Side by Side Layout */}
      <div className="grid gap-8 lg:grid-cols-5 xl:gap-12">
        {/* Quote Display - Left Side (60%) */}
        <div className="lg:col-span-3">
          <QuoteDisplayCard quote={quote} />
        </div>

        {/* Contact Form - Right Side (40%) */}
        <div className="lg:col-span-2">
          <ContactFormCard
            onSubmit={handleSubmit}
            onBack={handleBack}
            isSubmitting={isSubmitting}
            error={error}
            showRetryButton={showRetryButton}
            retryAfter={retryAfter}
          />
        </div>
      </div>

      {/* Trust Indicators */}
      <TrustIndicators />
    </FormPageLayout>
  )
}

export default Step3Quote
