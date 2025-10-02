import type { LucideIcon } from 'lucide-react'
import { Calendar, Headphones, Shield, Users } from 'lucide-react'

export interface Feature {
  text: string
}

export interface InfoCard {
  icon: LucideIcon
  title: string
  description: string
  iconColor: string
}

export const features: Feature[] = [
  { text: 'Asesoramiento personalizado según tus necesidades' },
  { text: 'Comparamos múltiples aseguradoras para ofrecerte el mejor precio' },
  { text: 'Respaldo completo durante reclamaciones' },
  { text: 'Atención al cliente 24/7' },
]

export const infoCards: InfoCard[] = [
  {
    icon: Users,
    title: 'Atención personalizada',
    description: 'Te asesoramos de principio a fin',
    iconColor: '#1d2c3d',
  },
  {
    icon: Shield,
    title: 'Respuesta rápida',
    description: 'Siempre disponibles cuando nos necesitas',
    iconColor: '#4ca18d',
  },
]

export const stats = {
  established: {
    icon: Calendar,
    label: 'Establecido en',
    value: '2005',
    iconColor: '#e9b949',
  },
  experience: {
    icon: Headphones,
    label: 'Años de experiencia',
    value: '+19 años',
    iconColor: '#4ca18d',
  },
}
