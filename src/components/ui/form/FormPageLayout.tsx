import { Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { FormPageLayoutProps } from './types'

/**
 * Outer page wrapper for all insurance forms
 * Provides consistent light gradient background and max-width container
 */
function FormPageLayout({ children }: FormPageLayoutProps) {
  const navigate = useNavigate()

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

      <div className="mx-auto max-w-4xl">{children}</div>
    </section>
  )
}

export default FormPageLayout
