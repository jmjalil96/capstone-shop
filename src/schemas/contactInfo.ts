import { z } from 'zod'

export const contactInfoSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100, 'El nombre es muy largo'),
  email: z.string().min(1, 'El email es requerido').email('Email inválido'),
  phone: z
    .string()
    .min(1, 'El teléfono es requerido')
    .regex(/^[0-9]{10,15}$/, 'El teléfono debe tener entre 10 y 15 dígitos'),
})

export type ContactInfoFormData = z.infer<typeof contactInfoSchema>
