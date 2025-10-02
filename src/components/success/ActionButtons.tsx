interface ActionButtonsProps {
  onNewQuote: () => void
  onGoHome: () => void
}

function ActionButtons({ onNewQuote, onGoHome }: ActionButtonsProps) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">
      {/* Action Buttons */}
      <div className="space-y-4">
        <button
          onClick={onNewQuote}
          className="w-full rounded-full py-4 font-bold text-lg transition-all duration-300 hover:-translate-y-1 transform hover:shadow-xl active:scale-95 text-white"
          style={{
            backgroundColor: '#0d9488',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#0f766e'
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(13, 148, 136, 0.4)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = '#0d9488'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Cotizar Otro Seguro
        </button>

        <button
          onClick={onGoHome}
          className="w-full rounded-full border-2 py-3 font-medium text-base transition-all duration-200 hover:bg-gray-50"
          style={{ borderColor: '#e5e7eb', color: '#666666' }}
        >
          Volver al Inicio
        </button>
      </div>

      {/* Tips Section */}
      <div
        className="mt-8 rounded-xl p-6"
        style={{
          backgroundColor: 'rgba(245, 158, 11, 0.05)',
          border: '1px solid rgba(245, 158, 11, 0.2)',
        }}
      >
        <h3 className="mb-4 font-semibold text-lg" style={{ color: '#1d2c3d' }}>
          Consejos Útiles
        </h3>
        <ul className="space-y-2 text-sm" style={{ color: '#666666' }}>
          <li className="flex items-start gap-2">
            <span style={{ color: '#f59e0b' }}>•</span>
            <span>Mantén tu teléfono disponible para recibir la llamada de nuestro agente</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#f59e0b' }}>•</span>
            <span>Revisa tu correo electrónico, incluyendo la carpeta de spam</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#f59e0b' }}>•</span>
            <span>Prepara cualquier pregunta que tengas sobre tu póliza</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#f59e0b' }}>•</span>
            <span>Guarda tu número de referencia para cualquier consulta futura</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ActionButtons
