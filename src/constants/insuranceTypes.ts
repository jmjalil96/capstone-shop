import { Briefcase, Car, Heart, Home, Users, type LucideIcon } from 'lucide-react'
import type { InsuranceType } from '@/types/insurance'

export interface InsuranceTypeMetadata {
  id: number
  type: InsuranceType // Maps to store type
  title: string
  shortDescription: string
  icon: LucideIcon
  priceFrom: string
  featured: boolean
  color: string
}

export const insuranceTypes: InsuranceTypeMetadata[] = [
  {
    id: 1,
    type: 'home',
    title: 'Hogar',
    shortDescription: 'Protege tu casa',
    icon: Home,
    priceFrom: 'Desde $67/mes',
    featured: false,
    color: '#0d9488', // teal
  },
  {
    id: 2,
    type: 'auto',
    title: 'Auto',
    shortDescription: 'Asegura tu auto',
    icon: Car,
    priceFrom: 'Desde $89/mes',
    featured: true,
    color: '#0d9488', // teal (featured gets gold anyway)
  },
  {
    id: 3,
    type: 'life',
    title: 'Vida',
    shortDescription: 'Cuida tu familia',
    icon: Heart,
    priceFrom: 'Desde $24/mes',
    featured: false,
    color: '#dc2626', // red for life/heart
  },
  {
    id: 4,
    type: 'health',
    title: 'Salud',
    shortDescription: 'Tu bienestar',
    icon: Users,
    priceFrom: 'Desde $189/mes',
    featured: false,
    color: '#0891b2', // cyan for health
  },
  {
    id: 5,
    type: 'business',
    title: 'Negocio',
    shortDescription: 'Protege tu empresa',
    icon: Briefcase,
    priceFrom: 'Desde $134/mes',
    featured: false,
    color: '#1d2c3d', // navy for business
  },
]
