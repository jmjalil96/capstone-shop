import { Check } from 'lucide-react'
import { features, infoCards, stats } from './about-constants'

const About = () => {
  return (
    // biome-ignore lint/correctness/useUniqueElementIds: Navigation anchors need static IDs
    <section
      id="nosotros"
      className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 md:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 md:grid-cols-2 lg:gap-20">
          {/* Image column */}
          <div className="order-2 md:order-1">
            <div className="relative mx-auto max-w-lg">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Equipo de Capstone"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Floating card - Established */}
              <div className="-right-4 absolute bottom-8 rounded-2xl bg-white p-5 shadow-md">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${stats.established.iconColor}15`,
                    }}
                  >
                    <stats.established.icon
                      size={24}
                      style={{ color: stats.established.iconColor }}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm" style={{ color: '#666666' }}>
                      {stats.established.label}
                    </p>
                    <p className="font-bold text-lg" style={{ color: '#1d2c3d' }}>
                      {stats.established.value}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating card - Experience */}
              <div className="-left-4 absolute top-8 rounded-2xl bg-white p-5 shadow-md">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${stats.experience.iconColor}15`,
                    }}
                  >
                    <stats.experience.icon
                      size={24}
                      style={{ color: stats.experience.iconColor }}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm" style={{ color: '#666666' }}>
                      {stats.experience.label}
                    </p>
                    <p className="font-bold text-lg" style={{ color: '#1d2c3d' }}>
                      {stats.experience.value}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className="order-1 md:order-2">
            <div
              className="mb-6 inline-block rounded-full px-4 py-2 backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(29, 44, 61, 0.1)',
                border: '1px solid rgba(29, 44, 61, 0.2)',
              }}
            >
              <span className="font-medium text-sm" style={{ color: '#1d2c3d' }}>
                Quiénes somos
              </span>
            </div>

            <h2
              className="mb-6 font-bold text-3xl sm:text-4xl md:text-5xl"
              style={{ color: '#1d2c3d' }}
            >
              Tu Broker de confianza desde 2005
            </h2>

            <p className="mb-8 text-lg leading-relaxed" style={{ color: '#333333' }}>
              En Capstone, nos dedicamos a proteger lo que más valoras con soluciones de seguros
              personalizadas y un servicio excepcional. Nuestra misión es simplificar el mundo de
              los seguros y brindarte la tranquilidad que mereces.
            </p>

            {/* Features list */}
            <div className="mb-8 space-y-4">
              {features.map(feature => (
                <div key={feature.text} className="flex items-start">
                  <div className="mt-1 rounded-full p-1" style={{ backgroundColor: '#f5f5f5' }}>
                    <Check size={16} style={{ color: '#4ca18d' }} />
                  </div>
                  <p className="ml-3" style={{ color: '#333333' }}>
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Info cards */}
            <div className="mb-8 grid grid-cols-2 gap-6">
              {infoCards.map(card => (
                <div
                  key={card.title}
                  className="rounded-2xl p-6 transition-all hover:shadow-md"
                  style={{ backgroundColor: '#f9fafb' }}
                >
                  <card.icon size={28} className="mb-3" style={{ color: card.iconColor }} />
                  <h3 className="mb-2 font-bold text-lg" style={{ color: '#1d2c3d' }}>
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#contacto"
              className="inline-flex items-center rounded-full px-7 py-3 font-semibold transition-all duration-300"
              style={{
                backgroundColor: '#1d2c3d',
                color: '#ffffff',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#2a3a4d'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(29, 44, 61, 0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#1d2c3d'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Conoce más sobre nosotros
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
      </div>
    </section>
  )
}

export default About
