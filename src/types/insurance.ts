import type {
  AutoInsuranceFormData,
  HomeInsuranceFormData,
  LifeInsuranceFormData,
  HealthInsuranceFormData,
  BusinessInsuranceFormData,
} from '@/schemas'

// Insurance type identifiers
export type InsuranceType = 'auto' | 'home' | 'life' | 'health' | 'business'

// Union type for all insurance form data
export type InsuranceFormData =
  | AutoInsuranceFormData
  | HomeInsuranceFormData
  | LifeInsuranceFormData
  | HealthInsuranceFormData
  | BusinessInsuranceFormData

// Insurance type metadata
export interface InsuranceTypeMetadata {
  id: InsuranceType
  name: string
  icon: string
  description: string
}

// Quote result structure with discriminated union for type-safe details
export type Quote =
  | {
      type: 'auto'
      monthlyPremium: number
      annualPremium: number
      coverage: string[]
      details: AutoInsuranceFormData
    }
  | {
      type: 'home'
      monthlyPremium: number
      annualPremium: number
      coverage: string[]
      details: HomeInsuranceFormData
    }
  | {
      type: 'life'
      monthlyPremium: number
      annualPremium: number
      coverage: string[]
      details: LifeInsuranceFormData
    }
  | {
      type: 'health'
      monthlyPremium: number
      annualPremium: number
      coverage: string[]
      details: HealthInsuranceFormData
    }
  | {
      type: 'business'
      monthlyPremium: number
      annualPremium: number
      coverage: string[]
      details: BusinessInsuranceFormData
    }

// Contact information for lead capture
export interface ContactInfo {
  name: string
  email: string
  phone: string
}
