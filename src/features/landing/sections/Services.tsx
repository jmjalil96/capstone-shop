import ServiceCard from './ServiceCard'
import { serviceItems } from './services-constants'

const Services = () => {
  return (
    // biome-ignore lint/correctness/useUniqueElementIds: Navigation anchors need static IDs
    <section
      id="servicios"
      className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 px-4 py-20 sm:px-6 md:px-8 lg:px-12"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-16">
          <div
            className="mb-6 inline-block rounded-full px-4 py-2 backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(217, 213, 225, 0.45)',
              border: '1px solid rgba(29, 44, 61, 0.15)',
            }}
          >
            <span className="font-medium text-sm" style={{ color: '#0c2939' }}>
              Protección integral
            </span>
          </div>
          <h2
            className="mb-6 font-bold text-3xl sm:text-4xl md:text-5xl"
            style={{ color: '#0c2939' }}
          >
            Nuestros Servicios
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed" style={{ color: '#666666' }}>
            Ofrecemos una amplia gama de seguros para proteger lo que más te importa. Nuestro equipo
            de expertos te ayudará a encontrar la mejor solución para ti.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceItems.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contacto"
            className="inline-flex items-center rounded-full px-7 py-3 font-semibold transition-all duration-300"
            style={{
              backgroundColor: '#0c2939',
              color: '#ffffff',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2a3a4d'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(29, 44, 61, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#0c2939'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Solicitar asesoría personalizada
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <title>Arrow Right</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Services
