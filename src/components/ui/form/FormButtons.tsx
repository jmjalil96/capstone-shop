import { cn } from '@/utils/cn'
import type { FormButtonsProps } from './types'

/**
 * Standard form action buttons with smart submit button and back navigation
 * Submit button shows progress when form is incomplete
 */
function FormButtons({ isValid, totalFields, completedFields, onBack }: FormButtonsProps) {
  // Spanish pluralization for remaining fields
  const remaining = totalFields - completedFields
  const remainingText =
    remaining === 1
      ? 'Completa 1 campo más' // Singular
      : `Completa ${remaining} campos más` // Plural

  return (
    <div className="mt-10 space-y-4 md:col-span-2">
      <button
        type="submit"
        disabled={!isValid}
        className={cn(
          'w-full rounded-full py-4 font-semibold text-lg transition-all duration-300',
          'hover:-translate-y-1 transform hover:shadow-lg active:scale-95',
          !isValid ? 'cursor-not-allowed bg-gray-400 text-white' : 'text-white',
        )}
        style={{
          backgroundColor: !isValid ? undefined : '#1d2c3d',
        }}
        onMouseEnter={e => {
          if (isValid) {
            e.currentTarget.style.backgroundColor = '#2a3a4d'
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(29, 44, 61, 0.3)'
          }
        }}
        onMouseLeave={e => {
          if (isValid) {
            e.currentTarget.style.backgroundColor = '#1d2c3d'
            e.currentTarget.style.boxShadow = 'none'
          }
        }}
      >
        {!isValid ? remainingText : 'Obtener Mi Cotización'}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="w-full rounded-full border-2 py-3 font-medium text-base transition-all duration-200 hover:bg-gray-50"
        style={{ borderColor: '#e5e7eb', color: '#666666' }}
      >
        Atrás
      </button>

      <div className="mt-4 text-center">
        <p className="text-sm" style={{ color: '#999999' }}>
          🔒 Información segura y protegida
        </p>
      </div>
    </div>
  )
}

export default FormButtons
