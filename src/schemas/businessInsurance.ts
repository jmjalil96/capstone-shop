import { z } from 'zod'

const insuranceTypeEnum = z.enum(['Personas', 'Patrimonio'], {
  message: 'Seleccione un tipo de seguro válido',
})

export const businessInsuranceSchema = z.object({
  businessName: z
    .string()
    .min(1, 'El nombre del negocio es requerido')
    .max(100, 'El nombre del negocio es muy largo'),
  taxIdOrIdNumber: z
    .string()
    .min(1, 'El RIF o Cédula es requerido')
    .max(20, 'El RIF o Cédula es muy largo'),
  industry: z
    .string()
    .min(1, 'La industria/giro es requerida')
    .max(100, 'La industria/giro es muy larga'),
  insuranceType: insuranceTypeEnum,
})

export type BusinessInsuranceFormData = z.infer<typeof businessInsuranceSchema>
export type BusinessInsuranceType = z.infer<typeof insuranceTypeEnum>
