import type { InsuranceType, Quote, InsuranceFormData } from '@/types/insurance'
import type {
  AutoInsuranceFormData,
  HomeInsuranceFormData,
  LifeInsuranceFormData,
  HealthInsuranceFormData,
  BusinessInsuranceFormData,
} from '@/schemas'

/**
 * Mock quote calculator - calculates estimated premium based on insurance type and form data
 * In production, this would call a backend API or use actual actuarial tables
 *
 * TODO: EDGE CASE HANDLING (P1)
 * - Add bounds checking on all multiplier factors (e.g., Math.min(Math.max(factor, 0.5), 2.0))
 * - Cap extreme inputs to prevent unrealistic quotes
 * - Add input validation before calculations (defensive programming)
 *
 * TODO: SERVICE LAYER ABSTRACTION (P2)
 * - Wrap in QuoteService class for future API integration
 * - Add caching layer for repeated calculations
 * - Prepare for backend transition (API calls, error handling, loading states)
 * - Enable A/B testing of calculation algorithms
 */
export function calculateQuote(type: InsuranceType, formData: InsuranceFormData): Quote {
  switch (type) {
    case 'auto': {
      const data = formData as AutoInsuranceFormData
      // Mock calculation: base rate + age factor + vehicle age factor
      // TODO: Cap vehicleAgeFactor between 0.8-2.0 for realism (very new cars = lower, classics = higher)
      // TODO: Add driver age factor from dateOfBirth (young/senior = higher premium)
      // TODO: Validate year is realistic (not future, not pre-1900)
      const baseRate = 150
      const currentYear = new Date().getFullYear()
      const vehicleAge = currentYear - data.year
      const vehicleAgeFactor = vehicleAge > 10 ? 1.3 : vehicleAge > 5 ? 1.1 : 1.0
      const sumInsuredFactor = data.insuredSum / 50000

      const monthlyPremium = Math.round(baseRate * vehicleAgeFactor * sumInsuredFactor * 100) / 100

      return {
        type: 'auto',
        monthlyPremium,
        annualPremium: Math.round(monthlyPremium * 12 * 100) / 100,
        coverage: ['Responsabilidad Civil', 'Colisión y Vuelco', 'Robo Total', 'Daños a Terceros'],
        details: data,
      }
    }

    case 'home': {
      const data = formData as HomeInsuranceFormData
      // TODO: Add location-based multipliers (city risk factor, flood zones, earthquake zones)
      // TODO: Cap ageFactor (buildings over 100 years might need special handling)
      // TODO: Add property type factor (apartment vs house vs commercial)
      // TODO: Validate constructionYear is reasonable
      const structureFactor = data.structureValue / 100000
      const contentFactor = data.contentValue / 50000
      const buildingAge = new Date().getFullYear() - data.constructionYear
      const ageFactor = buildingAge > 50 ? 1.5 : buildingAge > 20 ? 1.2 : 1.0

      const monthlyPremium =
        Math.round((structureFactor * 100 + contentFactor * 50) * ageFactor * 100) / 100

      return {
        type: 'home',
        monthlyPremium,
        annualPremium: Math.round(monthlyPremium * 12 * 100) / 100,
        coverage: ['Estructura', 'Contenido', 'Responsabilidad Civil', 'Daños por Agua'],
        details: data,
      }
    }

    case 'life': {
      const data = formData as LifeInsuranceFormData
      // TODO: Add age factor from dateOfBirth (major pricing component for life insurance)
      // TODO: Add health status questions (pre-existing conditions, lifestyle)
      // TODO: Cap smokerMultiplier (currently 1.8x, industry standard is 2-3x)
      // TODO: Add beneficiary verification in future
      const baseFactor = data.insuredSum / 100000
      const termFactor = data.term / 10
      const smokerMultiplier = data.isSmoker ? 1.8 : 1.0

      const monthlyPremium = Math.round(baseFactor * termFactor * 80 * smokerMultiplier * 100) / 100

      return {
        type: 'life',
        monthlyPremium,
        annualPremium: Math.round(monthlyPremium * 12 * 100) / 100,
        coverage: ['Muerte Natural', 'Muerte Accidental', 'Invalidez Total y Permanente'],
        details: data,
      }
    }

    case 'health': {
      const data = formData as HealthInsuranceFormData
      // TODO: Add age-based pricing per member (currently flat $200/member)
      // TODO: Add deductible selection (affects premium)
      // TODO: Add pre-existing condition questions
      // TODO: Cap member count premium scaling (family discounts after 4 members)
      const memberCount = data.members.length
      const basePerMember = 200

      let coverageMultiplier = 1.0
      if (data.coverageType === 'Gastos Médicos Mayores') {
        coverageMultiplier = 1.5
      } else if (data.coverageType === 'Gastos Médicos Menores') {
        coverageMultiplier = 0.7
      }

      const monthlyPremium =
        Math.round(memberCount * basePerMember * coverageMultiplier * 100) / 100

      return {
        type: 'health',
        monthlyPremium,
        annualPremium: Math.round(monthlyPremium * 12 * 100) / 100,
        coverage: [data.coverageType, 'Hospitalización', 'Consultas Médicas', 'Medicamentos'],
        details: data,
      }
    }

    case 'business': {
      const data = formData as BusinessInsuranceFormData
      // TODO: Add employee count factor (currently flat rate)
      // TODO: Add industry risk multiplier (construction > retail)
      // TODO: Add claims history factor
      // TODO: Combine Personas + Patrimonio for comprehensive coverage option
      const monthlyPremium = data.insuranceType === 'Personas' ? 500 : 800

      return {
        type: 'business',
        monthlyPremium,
        annualPremium: Math.round(monthlyPremium * 12 * 100) / 100,
        coverage:
          data.insuranceType === 'Personas'
            ? ['Vida Grupo', 'Accidentes Personales', 'Gastos Médicos Empleados']
            : ['Responsabilidad Civil General', 'Propiedad Comercial', 'Interrupción de Negocios'],
        details: data,
      }
    }
  }
}
