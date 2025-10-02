import { Shield, Clock, TrendingDown } from 'lucide-react'
import type { Quote } from '@/types/insurance'

interface QuoteDisplayCardProps {
  quote: Quote
}

function QuoteDisplayCard({ quote }: QuoteDisplayCardProps) {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Get insurance type label
  const insuranceTypeLabels = {
    auto: 'Seguro de Auto',
    home: 'Seguro de Hogar',
    life: 'Seguro de Vida',
    health: 'Seguro de Salud',
    business: 'Seguro de Negocios',
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-xl lg:p-10">
      {/* Quote Hero */}
      <div className="mb-8 text-center lg:text-left">
        <div className="mb-4">
          <div
            className="inline-flex items-center rounded-full px-4 py-2"
            style={{
              backgroundColor: 'rgba(13, 148, 136, 0.1)',
              color: '#0d9488',
            }}
          >
            <span className="font-medium text-sm">Tu Cotización Personal</span>
          </div>
        </div>

        <div className="mb-6">
          <div
            className="mb-3 font-black text-5xl tracking-tight sm:text-6xl lg:text-7xl"
            style={{ color: '#1d2c3d' }}
          >
            {formatCurrency(quote.monthlyPremium)}
            <span className="text-2xl font-normal">/mes</span>
          </div>

          <div className="mb-4">
            <p className="font-bold text-xl lg:text-2xl" style={{ color: '#1d2c3d' }}>
              {insuranceTypeLabels[quote.type]}
            </p>
            <p className="font-medium text-base" style={{ color: '#666666' }}>
              Prima anual: {formatCurrency(quote.annualPremium)}
            </p>
          </div>

          <div
            className="inline-flex items-center rounded-full px-4 py-2"
            style={{
              backgroundColor: 'rgba(13, 148, 136, 0.1)',
              color: '#0d9488',
            }}
          >
            <TrendingDown size={16} className="mr-2" />
            <span className="font-semibold text-sm">Cotización competitiva garantizada</span>
          </div>
        </div>
      </div>

      {/* Coverage Features */}
      <div className="border-gray-100 border-t pt-6">
        <h3 className="mb-4 font-semibold text-lg" style={{ color: '#1d2c3d' }}>
          Coberturas Incluidas
        </h3>
        <div className="space-y-2">
          {quote.coverage.map((item, index) => (
            <div key={index} className="flex items-start">
              <span className="text-teal-500 mr-2 mt-0.5">✓</span>
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="flex items-center">
            <div
              className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: 'rgba(13, 148, 136, 0.1)' }}
            >
              <Shield size={20} style={{ color: '#0d9488' }} />
            </div>
            <div>
              <div className="font-medium text-sm" style={{ color: '#1d2c3d' }}>
                Protección Completa
              </div>
              <div className="text-xs" style={{ color: '#666666' }}>
                Sin letra pequeña
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div
              className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: 'rgba(13, 148, 136, 0.1)' }}
            >
              <Clock size={20} style={{ color: '#0d9488' }} />
            </div>
            <div>
              <div className="font-medium text-sm" style={{ color: '#1d2c3d' }}>
                Respuesta Rápida
              </div>
              <div className="text-xs" style={{ color: '#666666' }}>
                Agente dedicado
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuoteDisplayCard
