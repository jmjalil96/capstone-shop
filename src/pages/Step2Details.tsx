import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useQuoteStore } from '@/store/quoteStore'
import type { InsuranceFormData } from '@/types/insurance'

// Import all form components
import AutoInsuranceForm from '@/components/forms/AutoInsuranceForm'
import HomeInsuranceForm from '@/components/forms/HomeInsuranceForm'
import LifeInsuranceForm from '@/components/forms/LifeInsuranceForm'
import HealthInsuranceForm from '@/components/forms/HealthInsuranceForm'
import BusinessInsuranceForm from '@/components/forms/BusinessInsuranceForm'

function Step2Details() {
  const navigate = useNavigate()
  const { insuranceType, setFormData, calculateQuote } = useQuoteStore()
  const isReady = !!insuranceType

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Navigation guard: redirect if no insurance type selected
  useEffect(() => {
    if (!isReady) {
      navigate('/quote/type')
    }
  }, [isReady, navigate])

  const handleSubmit = (data: InsuranceFormData) => {
    // Save form data to store
    setFormData(data)
    // Calculate quote based on saved data
    calculateQuote()
    // Navigate to summary page
    navigate('/quote/summary')
  }

  // Don't render if not ready (guard is redirecting)
  if (!isReady) {
    return null
  }

  // Render the appropriate form based on insurance type
  return (
    <div>
      {insuranceType === 'auto' && <AutoInsuranceForm onSubmit={handleSubmit} />}
      {insuranceType === 'home' && <HomeInsuranceForm onSubmit={handleSubmit} />}
      {insuranceType === 'life' && <LifeInsuranceForm onSubmit={handleSubmit} />}
      {insuranceType === 'health' && <HealthInsuranceForm onSubmit={handleSubmit} />}
      {insuranceType === 'business' && <BusinessInsuranceForm onSubmit={handleSubmit} />}
    </div>
  )
}

export default Step2Details
