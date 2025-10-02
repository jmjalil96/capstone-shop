export interface FooterLink {
  label: string
  href: string
}

export const companyInfo = {
  name: 'Capstone',
  description:
    'Tu broker de confianza desde 2005. Especialistas en encontrar la mejor solución de seguros para ti y tu familia.',
  year: 2005,
}

export const quickLinks: FooterLink[] = [
  { label: 'Sobre nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Blog', href: '#blog' },
  { label: 'Preguntas frecuentes', href: '#faq' },
]

export const legalLinks: FooterLink[] = [
  { label: 'Términos y condiciones', href: '#terminos' },
  { label: 'Política de privacidad', href: '#privacidad' },
  { label: 'Cookies', href: '#cookies' },
]

export const contactDetails = {
  phones: ['+34 900 123 456', '+34 900 654 321'],
  email: 'info@capstone.com',
  address: ['Calle Principal 123, 28001', 'Madrid, España'],
}
