import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Home } from 'lucide-react'
import { useQuoteStore } from '@/store/quoteStore'
import { insuranceTypes } from '@/constants/insuranceTypes'
import type { InsuranceTypeMetadata } from '@/constants/insuranceTypes'
import InsuranceTypeCard from '@/components/ui/InsuranceTypeCard'

function Step1InsuranceType() {
  const navigate = useNavigate()
  const { setInsuranceType } = useQuoteStore()

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSelectType = (insuranceType: InsuranceTypeMetadata) => {
    // Save insurance type to store
    setInsuranceType(insuranceType.type)
    // Navigate to details page
    navigate('/quote/details')
  }

  const handleBackToHome = () => {
    navigate('/')
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-12 sm:px-6 md:px-8 lg:px-12">
      {/* Back to Home Button */}
      <button
        type="button"
        onClick={handleBackToHome}
        className="group fixed top-6 left-6 z-40 flex items-center gap-2 rounded-full border border-slate-300/50 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-teal-500/50 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
        aria-label="Volver a la página principal"
      >
        <Home
          size={18}
          className="text-slate-600 transition-colors duration-300 group-hover:text-teal-600"
        />
        <span className="hidden text-sm font-medium text-slate-700 transition-colors duration-300 group-hover:text-teal-600 sm:inline">
          Inicio
        </span>
      </button>

      <div className="mx-auto max-w-4xl">
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
              Paso 1 de 3
            </span>
          </div>

          <h1
            className="mb-4 font-bold text-3xl sm:text-4xl md:text-5xl"
            style={{ color: '#0c2939' }}
          >
            ¿Qué tipo de seguro necesitas?
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed" style={{ color: '#666666' }}>
            Selecciona el tipo de seguro que te interesa y te ayudaremos a encontrar la mejor opción
            para ti.
          </p>
        </div>

        {/* Insurance Type Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {insuranceTypes.map((insuranceType, index) => (
            <InsuranceTypeCard
              key={insuranceType.id}
              insuranceType={insuranceType}
              index={index}
              onSelect={handleSelectType}
            />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-sm" style={{ color: '#999999' }}>
            ⚡ Cotización en menos de 60 segundos
          </p>
        </div>
      </div>
    </section>
  )
}

export default Step1InsuranceType
