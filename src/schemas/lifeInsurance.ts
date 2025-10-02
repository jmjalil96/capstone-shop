import { z } from 'zod'

export const lifeInsuranceSchema = z.object({
  term: z
    .number({ message: 'El término es requerido' })
    .int('El término debe ser un número entero')
    .positive('El término debe ser mayor a 0')
    .min(1, 'El término mínimo es 1 año')
    .max(50, 'El término máximo es 50 años'),
  insuredSum: z
    .number({ message: 'La suma asegurada es requerida' })
    .positive('La suma asegurada debe ser mayor a 0')
    .min(10000, 'La suma asegurada mínima es 10,000'),
  idNumber: z
    .string()
    .min(1, 'La cédula es requerida')
    .regex(/^[0-9]+$/, 'La cédula debe contener solo números'),
  dateOfBirth: z
    .string()
    .min(1, 'La fecha de nacimiento es requerida')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
  coveragePurpose: z
    .string()
    .min(1, 'El propósito de la cobertura es requerido')
    .max(200, 'El propósito es muy largo'),
  isSmoker: z.boolean({ message: 'Debe indicar si es fumador' }),
})

export type LifeInsuranceFormData = z.infer<typeof lifeInsuranceSchema>
