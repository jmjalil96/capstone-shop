import { z } from 'zod'

export const autoInsuranceSchema = z.object({
  licensePlate: z
    .string()
    .min(1, 'La placa o RAMV es requerida')
    .max(20, 'La placa no puede exceder 20 caracteres'),
  idNumber: z
    .string()
    .min(1, 'La cédula es requerida')
    .regex(/^[0-9]+$/, 'La cédula debe contener solo números'),
  make: z.string().min(1, 'La marca es requerida').max(50, 'La marca es muy larga'),
  model: z.string().min(1, 'El modelo es requerido').max(50, 'El modelo es muy largo'),
  year: z
    .number({ message: 'El año es requerido' })
    .int('El año debe ser un número entero')
    .min(1900, 'El año debe ser mayor a 1900')
    .max(new Date().getFullYear() + 1, 'El año no puede ser mayor al año próximo'),
  dateOfBirth: z
    .string()
    .min(1, 'La fecha de nacimiento es requerida')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
  insuredSum: z
    .number({ message: 'La suma asegurada es requerida' })
    .positive('La suma asegurada debe ser mayor a 0')
    .min(1000, 'La suma asegurada mínima es 1,000'),
})

export type AutoInsuranceFormData = z.infer<typeof autoInsuranceSchema>
