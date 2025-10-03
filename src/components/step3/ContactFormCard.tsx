import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactInfoSchema, type ContactInfoFormData } from '@/schemas/contactInfo'
import { useFormValidation } from '@/hooks/useFormValidation'
import FormInput from '@/components/ui/form/FormInput'

interface ContactFormCardProps {
  onSubmit: (data: ContactInfoFormData) => void
  onBack: () => void
  isSubmitting?: boolean
  error?: string | null
  showRetryButton?: boolean
  retryAfter?: number | null
}

function ContactFormCard({ onSubmit, onBack, isSubmitting = false, error, showRetryButton, retryAfter = null }: ContactFormCardProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields, isSubmitted },
  } = useForm<ContactInfoFormData>({
    resolver: zodResolver(contactInfoSchema),
    mode: 'all',
  })

  const watchedFields = watch()
  const { isFieldValid, completedFields } = useFormValidation(watchedFields, errors)

  return (
    <div className="h-full rounded-2xl bg-white p-8 shadow-xl lg:p-10">
      <div className="mb-8 text-center lg:text-left">
        <h2 className="mb-3 font-bold text-2xl lg:text-3xl" style={{ color: '#1d2c3d' }}>
          Completa tu Solicitud
        </h2>
        <p className="text-base leading-relaxed" style={{ color: '#666666' }}>
          Un agente experto te contactará{' '}
          <span className="font-semibold" style={{ color: '#0d9488' }}>
            pronto
          </span>{' '}
          con tu cotización personalizada.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
          {showRetryButton && (
            <button
              type="submit"
              disabled={isSubmitting || !isValid || (retryAfter !== null && retryAfter > 0)}
              className="mt-2 w-full rounded-full py-2 font-medium text-sm transition-all duration-200 bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300"
            >
              {retryAfter && retryAfter > 0
                ? `Reintentar en ${retryAfter}s`
                : isSubmitting
                ? 'Enviando...'
                : 'Reintentar'}
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          label="Nombre Completo"
          placeholder="Juan Pérez"
          registerReturn={register('name')}
          error={errors.name}
          showError={!!touchedFields.name || isSubmitted}
          isValid={isFieldValid('name')}
          animationDelay="0ms"
        />

        <FormInput
          label="Teléfono"
          type="text"
          placeholder="0412-123-4567"
          registerReturn={register('phone')}
          error={errors.phone}
          showError={!!touchedFields.phone || isSubmitted}
          isValid={isFieldValid('phone')}
          animationDelay="100ms"
          inputMode="tel"
        />

        <FormInput
          label="Email"
          type="text"
          placeholder="juan@email.com"
          registerReturn={register('email')}
          error={errors.email}
          showError={!!touchedFields.email || isSubmitted}
          isValid={isFieldValid('email')}
          animationDelay="200ms"
        />

        <div className="space-y-4 pt-4">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full rounded-full py-4 font-bold text-lg transition-all duration-300 hover:-translate-y-1 transform hover:shadow-xl active:scale-95 text-white disabled:opacity-50"
            style={{
              backgroundColor: (!isValid || isSubmitting) ? '#cbd5e1' : '#0d9488',
            }}
            onMouseEnter={e => {
              if (isValid && !isSubmitting) {
                e.currentTarget.style.backgroundColor = '#0f766e'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(13, 148, 136, 0.4)'
              }
            }}
            onMouseLeave={e => {
              if (isValid && !isSubmitting) {
                e.currentTarget.style.backgroundColor = '#0d9488'
                e.currentTarget.style.boxShadow = 'none'
              }
            }}
          >
            {isSubmitting
              ? 'Enviando...'
              : !isValid
              ? completedFields === 2
                ? 'Completa 1 campo más'
                : `Completa ${3 - completedFields} campos más`
              : 'Enviar Solicitud →'}
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full rounded-full border-2 py-3 font-medium text-base transition-all duration-200 hover:bg-gray-50"
            style={{ borderColor: '#e5e7eb', color: '#666666' }}
          >
            Atrás
          </button>

          <div className="text-center">
            <p className="text-sm" style={{ color: '#999999' }}>
              🔒 Información completamente protegida
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ContactFormCard
