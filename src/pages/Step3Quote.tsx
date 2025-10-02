import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useQuoteStore } from '@/store/quoteStore'
import type { ContactInfoFormData } from '@/schemas/contactInfo'
import FormPageLayout from '@/components/ui/form/FormPageLayout'
import QuoteDisplayCard from '@/components/step3/QuoteDisplayCard'
import ContactFormCard from '@/components/step3/ContactFormCard'
import TrustIndicators from '@/components/step3/TrustIndicators'

function Step3Quote() {
  const navigate = useNavigate()
  const { quote, setContactInfo, insuranceType, formData } = useQuoteStore()

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

  const handleSubmit = (data: ContactInfoFormData) => {
    setContactInfo(data)
    navigate('/success')
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
          <span className="font-medium text-sm" style={{ color: '#1d2c3d' }}>
            Paso 3 de 3
          </span>
        </div>

        <h1
          className="mb-4 font-bold text-3xl sm:text-4xl md:text-5xl"
          style={{ color: '#1d2c3d' }}
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
          <ContactFormCard onSubmit={handleSubmit} onBack={handleBack} />
        </div>
      </div>

      {/* Trust Indicators */}
      <TrustIndicators />
    </FormPageLayout>
  )
}

export default Step3Quote
