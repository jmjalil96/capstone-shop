import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { testimonials } from './testimonials-constants'

// Static array for star ratings to avoid index key warnings
const STAR_INDICES = [0, 1, 2, 3, 4] as const

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {STAR_INDICES.map(i => (
        <Star
          key={i}
          size={18}
          className={i < rating ? 'fill-current' : ''}
          style={{ color: i < rating ? '#e9b949' : '#d1d5db' }}
        />
      ))}
    </div>
  )
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentTestimonial = testimonials[currentIndex]

  const handlePrev = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }, [])

  const handleNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }, [])

  const handleDotClick = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev()
      }
      if (e.key === 'ArrowRight') {
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 6000)
    return () => clearInterval(interval)
  }, [handleNext])

  if (!currentTestimonial) {
    return null
  }

  return (
    // biome-ignore lint/correctness/useUniqueElementIds: Navigation anchors need static IDs
    <section
      id="testimonios"
      className="relative overflow-hidden px-4 py-20 sm:px-6 md:px-8 lg:px-12"
      style={{ backgroundColor: '#1d2c3d' }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-16">
          <div
            className="mb-6 inline-block rounded-full px-4 py-2 backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(233, 185, 73, 0.15)',
              border: '1px solid rgba(233, 185, 73, 0.3)',
            }}
          >
            <span className="font-medium text-sm" style={{ color: '#e9b949' }}>
              Lo que dicen de nosotros
            </span>
          </div>

          <h2 className="mb-6 font-bold text-3xl text-white sm:text-4xl md:text-5xl">
            Testimonios de nuestros clientes
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-white/80 leading-relaxed">
            Miles de personas y empresas confían en nosotros para proteger lo que más valoran.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="relative rounded-2xl bg-white/5 p-8 backdrop-blur-sm md:p-12">
            <div
              className="-left-4 -top-4 absolute text-7xl opacity-20 md:text-8xl"
              style={{ color: '#e9b949' }}
            >
              &ldquo;
            </div>

            <div className="relative z-10">
              <div className="md:flex md:items-start md:gap-8">
                <div className="mb-6 flex-shrink-0 md:mb-0">
                  <div className="mx-auto h-20 w-20 overflow-hidden rounded-2xl md:mx-0">
                    <img
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <StarRating rating={currentTestimonial.rating} />
                  <p className="mt-4 mb-6 text-lg text-white leading-relaxed md:text-xl lg:text-2xl">
                    &ldquo;{currentTestimonial.content}&rdquo;
                  </p>
                  <div>
                    <h4 className="font-bold text-lg text-white">{currentTestimonial.name}</h4>
                    <p className="text-white/70">{currentTestimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((testimonial, index) => (
                  <button
                    type="button"
                    key={testimonial.id}
                    onClick={() => handleDotClick(index)}
                    className="h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: currentIndex === index ? '24px' : '10px',
                      backgroundColor:
                        currentIndex === index ? '#e9b949' : 'rgba(255, 255, 255, 0.3)',
                    }}
                    aria-label={`Ir al testimonio ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Testimonio anterior"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Testimonio siguiente"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contacto"
            className="inline-flex items-center rounded-full px-7 py-3 font-semibold transition-all duration-300"
            style={{
              backgroundColor: '#e9b949',
              color: '#1d2c3d',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#f0c65a'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(233, 185, 73, 0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#e9b949'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Únete a nuestros clientes satisfechos
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

export default Testimonials
