import { type FormEvent, useId, useState } from 'react'
import { contactInfo, mapConfig, socialLinks } from './contact-constants'

const ContactItem = ({
  icon: Icon,
  title,
  content,
}: {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>
  title: string
  content: string | string[]
}) => {
  return (
    <div className="mb-8 flex items-start">
      <div
        className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: 'rgba(76, 161, 141, 0.1)' }}
      >
        <Icon size={24} style={{ color: 'rgba(0, 140, 126, 0.8)' }} />
      </div>
      <div>
        <h3 className="mb-2 font-bold text-lg" style={{ color: '#0c2939' }}>
          {title}
        </h3>
        <div style={{ color: '#666666' }}>
          {Array.isArray(content) ? (
            content.map(line => (
              <p key={line} className={content.indexOf(line) > 0 ? 'mt-1' : ''}>
                {title === 'Teléfono' ? (
                  <a
                    href={`tel:${line.replace(/\s/g, '')}`}
                    className="transition-colors hover:opacity-80"
                    style={{ color: '#666666' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#008c7e'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = '#666666'
                    }}
                  >
                    {line}
                  </a>
                ) : (
                  line
                )}
              </p>
            ))
          ) : title === 'Email' ? (
            <a
              href={`mailto:${content}`}
              className="transition-colors hover:opacity-80"
              style={{ color: '#666666' }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#008c7e'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#666666'
              }}
            >
              {content}
            </a>
          ) : (
            <p>{content}</p>
          )}
        </div>
      </div>
    </div>
  )
}

const Contact = () => {
  const nameId = useId()
  const emailId = useId()
  const phoneId = useId()
  const messageId = useId()
  const privacyId = useId()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    privacy: false,
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Implement contact form submission (e.g., send to backend API or email service)
    // For now, form data is stored in state and submission is prevented
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  return (
    // biome-ignore lint/correctness/useUniqueElementIds: Navigation anchors need static IDs
    <section
      id="contacto"
      className="relative overflow-hidden bg-gray-50 px-4 py-20 sm:px-6 md:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-16">
          <div
            className="mb-6 inline-block rounded-full px-4 py-2 backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(76, 161, 141, 0.1)',
              border: '1px solid rgba(76, 161, 141, 0.2)',
            }}
          >
            <span className="font-medium text-sm" style={{ color: '#008c7e' }}>
              Estamos aquí para ti
            </span>
          </div>

          <h2
            className="mb-6 font-bold text-3xl sm:text-4xl md:text-5xl"
            style={{ color: '#0c2939' }}
          >
            Contáctanos
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed" style={{ color: '#666666' }}>
            Estamos aquí para responder a todas tus preguntas y ayudarte a encontrar la mejor
            solución de seguros para tus necesidades.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
          <div className="rounded-2xl bg-white p-8 shadow-lg lg:p-10">
            <h3 className="mb-8 font-bold text-2xl" style={{ color: '#0c2939' }}>
              Información de contacto
            </h3>

            {contactInfo.map(info => (
              <ContactItem
                key={info.title}
                icon={info.icon}
                title={info.title}
                content={info.content}
              />
            ))}

            <div className="mt-10">
              <h4 className="mb-3 font-bold text-lg" style={{ color: '#0c2939' }}>
                Ubicación
              </h4>
              <div className="h-48 overflow-hidden rounded-lg bg-gray-100">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src={mapConfig.embedUrl}
                  style={{ border: 0 }}
                  title="Mapa de ubicación"
                  loading="lazy"
                />
              </div>
              <div className="mt-2 text-right text-xs" style={{ color: '#999999' }}>
                <a
                  href={mapConfig.fullMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:underline"
                  style={{ color: '#008c7e' }}
                >
                  Ver mapa más grande
                </a>
              </div>
            </div>

            <div className="mt-10">
              <h4 className="mb-4 font-bold text-lg" style={{ color: '#0c2939' }}>
                Síguenos
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map(social => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
                    style={{ backgroundColor: '#f5f5f5', color: '#666666' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = '#0c2939'
                      e.currentTarget.style.color = '#ffffff'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = '#f5f5f5'
                      e.currentTarget.style.color = '#666666'
                    }}
                    aria-label={social.name}
                  >
                    <svg
                      role="img"
                      aria-label={social.name}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <form
              onSubmit={handleSubmit}
              className="h-full rounded-2xl bg-white p-8 shadow-lg lg:p-10"
            >
              <h3 className="mb-8 font-bold text-2xl" style={{ color: '#0c2939' }}>
                Envíanos un mensaje
              </h3>

              <div className="mb-6">
                <label
                  htmlFor={nameId}
                  className="mb-2 block font-medium text-sm"
                  style={{ color: '#666666' }}
                >
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id={nameId}
                  name="name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#008c7e' } as React.CSSProperties}
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor={emailId}
                  className="mb-2 block font-medium text-sm"
                  style={{ color: '#666666' }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  id={emailId}
                  name="email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#008c7e' } as React.CSSProperties}
                  placeholder="tucorreo@ejemplo.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor={phoneId}
                  className="mb-2 block font-medium text-sm"
                  style={{ color: '#666666' }}
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  id={phoneId}
                  name="phone"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#008c7e' } as React.CSSProperties}
                  placeholder="Tu número de teléfono"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor={messageId}
                  className="mb-2 block font-medium text-sm"
                  style={{ color: '#666666' }}
                >
                  Mensaje *
                </label>
                <textarea
                  id={messageId}
                  name="message"
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#008c7e' } as React.CSSProperties}
                  placeholder="¿En qué podemos ayudarte?"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-8">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    id={privacyId}
                    name="privacy"
                    className="mt-1 rounded"
                    style={{ accentColor: '#008c7e' }}
                    checked={formData.privacy}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="ml-2 text-sm" style={{ color: '#666666' }}>
                    Acepto la política de privacidad y el tratamiento de mis datos personales.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-full px-7 py-3 font-semibold transition-all duration-300"
                style={{
                  backgroundColor: '#0c2939',
                  color: '#ffffff',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#2a3a4d'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(29, 44, 61, 0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#0c2939'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
