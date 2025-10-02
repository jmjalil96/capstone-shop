import { z } from 'zod'

export const homeInsuranceSchema = z.object({
  constructionYear: z
    .number({ message: 'El año de construcción es requerido' })
    .int('El año debe ser un número entero')
    .min(1800, 'El año debe ser mayor a 1800')
    .max(new Date().getFullYear(), 'El año no puede ser mayor al año actual'),
  structureValue: z
    .number({ message: 'El valor de la estructura es requerido' })
    .positive('El valor de la estructura debe ser mayor a 0')
    .min(10000, 'El valor mínimo de la estructura es 10,000'),
  contentValue: z
    .number({ message: 'El valor del contenido es requerido' })
    .positive('El valor del contenido debe ser mayor a 0')
    .min(1000, 'El valor mínimo del contenido es 1,000'),
  address: z.string().min(1, 'La dirección es requerida').max(200, 'La dirección es muy larga'),
  city: z.string().min(1, 'La ciudad es requerida').max(100, 'La ciudad es muy larga'),
  idNumber: z
    .string()
    .min(1, 'El número de cédula es requerido')
    .regex(/^[0-9]+$/, 'La cédula debe contener solo números'),
  dateOfBirth: z
    .string()
    .min(1, 'La fecha de nacimiento es requerida')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
})

export type HomeInsuranceFormData = z.infer<typeof homeInsuranceSchema>
