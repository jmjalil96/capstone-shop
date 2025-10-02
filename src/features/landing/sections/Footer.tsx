import { Mail, MapPin, Phone } from 'lucide-react'
import { socialLinks } from './contact-constants'
import { companyInfo, contactDetails, legalLinks, quickLinks } from './footer-constants'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative" style={{ backgroundColor: '#1d2c3d', color: '#ffffff' }}>
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <a href="/" className="mb-6 inline-block">
              <span className="font-bold font-display text-3xl text-white">{companyInfo.name}</span>
            </a>
            <p className="mb-6 max-w-xs text-white/80">{companyInfo.description}</p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:bg-white/20"
                  aria-label={social.name}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 140, 126, 0.8)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <svg
                    role="img"
                    aria-label={social.name}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="mb-6 font-bold text-xl">Enlaces útiles</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/80 transition-colors hover:text-white"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#e1ab33'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="mb-6 font-bold text-xl">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/80 transition-colors hover:text-white"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#e1ab33'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="mb-6 font-bold text-xl">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone size={20} className="mt-1 mr-3 flex-shrink-0" style={{ color: '#e1ab33' }} />
                <div>
                  {contactDetails.phones.map((phone) => (
                    <p key={phone} className="text-white/80">
                      <a
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="transition-colors hover:text-white"
                      >
                        {phone}
                      </a>
                    </p>
                  ))}
                </div>
              </li>
              <li className="flex items-start">
                <Mail size={20} className="mt-1 mr-3 flex-shrink-0" style={{ color: '#e1ab33' }} />
                <p className="text-white/80">
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="transition-colors hover:text-white"
                  >
                    {contactDetails.email}
                  </a>
                </p>
              </li>
              <li className="flex items-start">
                <MapPin
                  size={20}
                  className="mt-1 mr-3 flex-shrink-0"
                  style={{ color: '#e1ab33' }}
                />
                <div className="text-white/80">
                  {contactDetails.address.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-white/10" />

        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <p className="text-center text-sm text-white/60 md:text-left">
            © {currentYear} {companyInfo.name} Seguros C.A. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:justify-end">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/60 transition-colors hover:text-white"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#e1ab33'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
