import type { LucideIcon } from 'lucide-react'
import { Briefcase, Car, Heart, Home, Users } from 'lucide-react'

export interface ServiceItem {
  id: number
  title: string
  description: string
  icon: LucideIcon
  featured: boolean
}

export const serviceItems: ServiceItem[] = [
  {
    id: 1,
    title: 'Seguro de Salud',
    description:
      'Planes de salud completos para individuos y familias con la mejor cobertura médica.',
    icon: Users,
    featured: false,
  },
  {
    id: 2,
    title: 'Seguro de Vida',
    description:
      'Protege el futuro financiero de tus seres queridos con nuestros planes personalizados.',
    icon: Heart,
    featured: true,
  },
  {
    id: 3,
    title: 'Seguro de Auto',
    description: 'Conduce con tranquilidad sabiendo que estás protegido ante cualquier imprevisto.',
    icon: Car,
    featured: false,
  },
  {
    id: 4,
    title: 'Seguro de Hogar',
    description: 'Cobertura integral para tu patrimonio contra daños, robos y desastres naturales.',
    icon: Home,
    featured: false,
  },
  {
    id: 5,
    title: 'Seguro Empresarial',
    description: 'Soluciones a medida para proteger tu negocio, empleados y operaciones.',
    icon: Briefcase,
    featured: false,
  },
]
