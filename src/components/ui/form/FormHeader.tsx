import type { FormHeaderProps } from './types'

/**
 * Standard form header with step badge, title, and subtitle
 * Used across all insurance forms for consistency
 */
function FormHeader({ title }: FormHeaderProps) {
  return (
    <div className="mb-12 text-center">
      <div
        className="mb-6 inline-block rounded-full px-4 py-2 backdrop-blur-sm"
        style={{
          backgroundColor: 'rgba(29, 44, 61, 0.08)',
          border: '1px solid rgba(29, 44, 61, 0.15)',
        }}
      >
        <span className="font-medium text-sm" style={{ color: '#0c2939' }}>
          Paso 2 de 3
        </span>
      </div>

      <h1 className="mb-4 font-bold text-3xl sm:text-4xl md:text-5xl" style={{ color: '#0c2939' }}>
        {title}
      </h1>

      <p className="mx-auto max-w-2xl text-lg leading-relaxed" style={{ color: '#666666' }}>
        Completa estos datos para obtener tu cotización personalizada en segundos
      </p>
    </div>
  )
}

export default FormHeader
