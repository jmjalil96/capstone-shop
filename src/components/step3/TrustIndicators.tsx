import { Award, Shield, Clock, Users } from 'lucide-react'

function TrustIndicators() {
  return (
    <div className="mt-12 rounded-2xl bg-white p-6 shadow-lg">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center">
          <div
            className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ backgroundColor: 'rgba(13, 148, 136, 0.1)' }}
          >
            <Clock size={24} style={{ color: '#0d9488' }} />
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ color: '#1d2c3d' }}>
              Respuesta Rápida
            </div>
            <div className="text-xs" style={{ color: '#666666' }}>
              Garantizada
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div
            className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ backgroundColor: 'rgba(13, 148, 136, 0.1)' }}
          >
            <Shield size={24} style={{ color: '#0d9488' }} />
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ color: '#1d2c3d' }}>
              Sin Compromiso
            </div>
            <div className="text-xs" style={{ color: '#666666' }}>
              Cotización gratuita
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div
            className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ backgroundColor: 'rgba(233, 185, 73, 0.1)' }}
          >
            <Users size={24} style={{ color: '#e9b949' }} />
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ color: '#1d2c3d' }}>
              500+ Familias
            </div>
            <div className="text-xs" style={{ color: '#666666' }}>
              Protegidas
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div
            className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ backgroundColor: 'rgba(29, 44, 61, 0.1)' }}
          >
            <Award size={24} style={{ color: '#1d2c3d' }} />
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ color: '#1d2c3d' }}>
              Expertos Certificados
            </div>
            <div className="text-xs" style={{ color: '#666666' }}>
              Brokers licenciados
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrustIndicators
