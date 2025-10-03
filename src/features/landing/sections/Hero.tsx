import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 py-20 sm:px-6 md:px-8 lg:px-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        {/* Blur effects */}
        <div className="-translate-y-1/2 absolute top-0 right-0 h-64 w-64 translate-x-1/3 rounded-full bg-gray-50 opacity-50 blur-3xl sm:h-80 sm:w-80 md:h-96 md:w-96" />
        <div className="-translate-x-1/3 absolute bottom-0 left-0 h-64 w-64 translate-y-1/2 rounded-full bg-gray-50 opacity-50 blur-3xl sm:h-80 sm:w-80 md:h-96 md:w-96" />

        {/* Opaque rectangle shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large rectangle behind text area */}
          <div
            className="-left-10 absolute top-32 h-96 w-[30rem] rounded-3xl sm:w-[36rem] md:h-[28rem] md:w-[42rem] lg:w-[48rem]"
            style={{
              backgroundColor: '#e5e7eb',
              opacity: 0.4,
            }}
          />

          {/* Rectangle behind image area */}
          <div
            className="absolute top-48 right-0 h-80 w-80 rounded-3xl sm:right-10 sm:h-96 sm:w-96 md:right-20 md:h-[30rem] md:w-[30rem]"
            style={{
              backgroundColor: '#e5e7eb',
              opacity: 0.3,
            }}
          />

          {/* Top accent rectangle */}
          <div
            className="-top-20 absolute left-1/3 h-48 w-64 rounded-2xl sm:left-1/2 sm:h-56 sm:w-72"
            style={{
              backgroundColor: '#e5e7eb',
              opacity: 0.25,
            }}
          />

          {/* Bottom floating rectangle */}
          <div
            className="absolute bottom-10 left-1/4 h-40 w-72 animate-float rounded-2xl sm:bottom-20 sm:h-48 sm:w-80"
            style={{
              backgroundColor: '#e5e7eb',
              opacity: 0.35,
              animationDelay: '3s',
            }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-center gap-8 md:grid md:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="w-full max-w-xl animate-fade-in md:max-w-2xl">
            <div className="mb-4 inline-block rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1.5 backdrop-blur-sm sm:mb-6 sm:px-5 sm:py-2">
              <span className="font-semibold text-teal-600 text-xs sm:text-sm">
                Tu tranquilidad es nuestra prioridad
              </span>
            </div>
            <h1 className="mb-4 font-bold text-3xl text-slate-900 leading-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Protegemos lo que <span className="text-teal-600">más valoras</span>
            </h1>
            <p className="mb-6 text-base text-gray-600 leading-relaxed sm:mb-8 sm:text-lg md:text-xl">
              Expertos en encontrar las soluciones de seguros que mejor se adaptan a tus necesidades
              personales y empresariales.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 md:gap-5">
              <Link to="/quote/type" className="btn-primary group flex items-center justify-center">
                <span>Capstone Shop</span>
                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <a href="#contacto" className="btn-secondary flex items-center justify-center">
                Contáctanos
              </a>
            </div>
          </div>

          <div className="relative mt-8 flex items-center justify-center md:mt-0 md:justify-center lg:justify-end">
            <div className="absolute h-48 w-48 rounded-full bg-teal-500/10 blur-3xl sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72" />
            <div className="-translate-x-10 absolute h-48 w-48 translate-y-10 rounded-full bg-yellow-500/5 blur-3xl sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72" />

            <div className="relative aspect-square w-full max-w-xs animate-float overflow-hidden rounded-2xl shadow-xl sm:aspect-[4/3] sm:max-w-sm md:max-w-md lg:max-w-lg lg:rounded-3xl lg:shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                alt="Familia protegida por Capstone"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 p-3 sm:p-4 md:p-6 lg:p-8">
                <p className="font-medium text-white text-xs sm:font-semibold sm:text-sm md:text-base lg:text-lg">
                  Más de 500 familias confían en nosotros
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
