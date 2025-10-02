export interface NavItem {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Contacto', href: '#contacto' },
]

export const ctaButton = {
  label: 'Capstone Shop',
  href: '/quote/type',
}
