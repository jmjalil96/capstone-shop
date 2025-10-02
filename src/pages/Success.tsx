import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuoteStore } from '@/store/quoteStore'
import SuccessHero from '@/components/success/SuccessHero'
import ConfirmationSummary from '@/components/success/ConfirmationSummary'
import ProcessTimeline from '@/components/success/ProcessTimeline'
import ActionButtons from '@/components/success/ActionButtons'

function Success() {
  const navigate = useNavigate()
  const { contactInfo, quote, referenceNumber, reset } = useQuoteStore()

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Navigation guard: redirect if no contactInfo
  useEffect(() => {
    if (!contactInfo || !quote || !referenceNumber) {
      navigate('/quote/type')
    }
  }, [contactInfo, quote, referenceNumber, navigate])

  const handleNewQuote = () => {
    reset()
    navigate('/quote/type')
  }

  const handleGoHome = () => {
    reset()
    navigate('/')
  }

  // Don't render if required state is missing (guard is redirecting)
  if (!contactInfo || !quote || !referenceNumber) {
    return null
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-12 sm:px-6 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Hero Section - Centered */}
        <div className="mb-16 text-center">
          <SuccessHero referenceNumber={referenceNumber} />
        </div>

        {/* Main Content - Single Column for Better Flow */}
        <div className="mx-auto max-w-4xl space-y-8">
          <ConfirmationSummary
            email={contactInfo.email}
            phone={contactInfo.phone}
            quoteSummary={{
              monthlyPremium: quote.monthlyPremium,
              insuranceType: quote.type,
            }}
          />

          <ProcessTimeline />

          <ActionButtons onNewQuote={handleNewQuote} onGoHome={handleGoHome} />
        </div>

        {/* Bottom Spacing */}
        <div className="mt-16 text-center">
          <p className="text-sm" style={{ color: '#999999' }}>
            Gracias por confiar en nosotros para proteger lo que más valoras.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Success
