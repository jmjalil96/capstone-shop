import { Mail, Phone } from 'lucide-react'

interface ConfirmationSummaryProps {
  email: string
  phone: string
  quoteSummary: {
    monthlyPremium: number
    insuranceType: string
  }
}

function ConfirmationSummary({ email, phone, quoteSummary }: ConfirmationSummaryProps) {
  const insuranceTypeNames: Record<string, string> = {
    auto: 'Seguro de Auto',
    home: 'Seguro de Hogar',
    life: 'Seguro de Vida',
    health: 'Seguro de Salud',
    business: 'Seguro de Negocio',
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 font-bold text-2xl" style={{ color: '#1d2c3d' }}>
        Resumen de Confirmación
      </h2>

      {/* Contact Information */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: 'rgba(13, 148, 136, 0.1)' }}
          >
            <Mail size={20} style={{ color: '#0d9488' }} />
          </div>
          <div>
            <p className="text-sm" style={{ color: '#666666' }}>
              Email de contacto
            </p>
            <p className="font-semibold" style={{ color: '#1d2c3d' }}>
              {email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: 'rgba(13, 148, 136, 0.1)' }}
          >
            <Phone size={20} style={{ color: '#0d9488' }} />
          </div>
          <div>
            <p className="text-sm" style={{ color: '#666666' }}>
              Teléfono de contacto
            </p>
            <p className="font-semibold" style={{ color: '#1d2c3d' }}>
              {phone}
            </p>
          </div>
        </div>
      </div>

      {/* Quote Summary */}
      <div
        className="rounded-xl p-6"
        style={{
          backgroundColor: 'rgba(13, 148, 136, 0.05)',
          border: '1px solid rgba(13, 148, 136, 0.2)',
        }}
      >
        <h3 className="mb-4 font-semibold text-lg" style={{ color: '#1d2c3d' }}>
          Tu Cotización
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span style={{ color: '#666666' }}>Tipo de Seguro:</span>
            <span className="font-semibold" style={{ color: '#1d2c3d' }}>
              {insuranceTypeNames[quoteSummary.insuranceType] || quoteSummary.insuranceType}
            </span>
          </div>

          <div className="flex justify-between">
            <span style={{ color: '#666666' }}>Prima Mensual Estimada:</span>
            <span className="font-bold text-xl" style={{ color: '#0d9488' }}>
              ${quoteSummary.monthlyPremium.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm" style={{ color: '#999999' }}>
        * Esta es una cotización preliminar. El monto final puede variar según la evaluación del
        agente.
      </p>
    </div>
  )
}

export default ConfirmationSummary
