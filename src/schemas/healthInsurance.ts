import { z } from 'zod'

const memberTypeEnum = z.enum(['Titular', 'Cónyuge', 'Hijo', 'Otro'], {
  message: 'Seleccione un tipo de miembro válido',
})

const memberSchema = z.object({
  dateOfBirth: z
    .string()
    .min(1, 'La fecha de nacimiento es requerida')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
  memberType: memberTypeEnum,
})

const coverageTypeEnum = z.enum(
  ['Gastos Médicos Mayores', 'Gastos Médicos Menores', 'Indiferente'],
  {
    message: 'Seleccione un tipo de cobertura válido',
  },
)

export const healthInsuranceSchema = z.object({
  members: z
    .array(memberSchema)
    .min(1, 'Debe agregar al menos un miembro')
    .max(10, 'Máximo 10 miembros permitidos'),
  coverageType: coverageTypeEnum,
})

export type HealthInsuranceFormData = z.infer<typeof healthInsuranceSchema>
export type MemberFormData = z.infer<typeof memberSchema>
export type MemberType = z.infer<typeof memberTypeEnum>
export type CoverageType = z.infer<typeof coverageTypeEnum>
