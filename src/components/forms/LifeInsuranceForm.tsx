import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useQuoteStore } from '@/store/quoteStore'
import { lifeInsuranceSchema, type LifeInsuranceFormData } from '@/schemas/lifeInsurance'
import { useFormValidation } from '@/hooks/useFormValidation'
import FormPageLayout from '@/components/ui/form/FormPageLayout'
import FormHeader from '@/components/ui/form/FormHeader'
import FormContainer from '@/components/ui/form/FormContainer'
import FormProgressIndicator from '@/components/ui/form/FormProgressIndicator'
import FormButtons from '@/components/ui/form/FormButtons'
import FormInput from '@/components/ui/form/FormInput'
import FormTextarea from '@/components/ui/form/FormTextarea'
import FormCheckbox from '@/components/ui/form/FormCheckbox'

interface LifeInsuranceFormProps {
  onSubmit: (data: LifeInsuranceFormData) => void
}

function LifeInsuranceForm({ onSubmit }: LifeInsuranceFormProps) {
  const navigate = useNavigate()
  const { formData } = useQuoteStore()
  const defaultValues = (formData as LifeInsuranceFormData | null) ?? undefined

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields, isSubmitted },
  } = useForm<LifeInsuranceFormData>({
    resolver: zodResolver(lifeInsuranceSchema),
    defaultValues,
    mode: 'all',
  })

  const today = new Date().toISOString().split('T')[0]

  // Watch all fields for progress tracking
  const watchedFields = watch()

  const { isFieldValid, completedFields } = useFormValidation(watchedFields, errors)

  const handleBack = () => {
    navigate('/quote/type')
  }

  return (
    <FormPageLayout>
      <FormHeader title="Información del Seguro de Vida" />
      <FormProgressIndicator completedFields={completedFields} totalFields={6} />
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        {/* 2-Column Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column - Policy Information */}
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="font-semibold text-lg" style={{ color: '#0c2939' }}>
                Datos de la Póliza
              </h3>
              <p className="text-sm" style={{ color: '#666666' }}>
                Información de la cobertura
              </p>
            </div>

            {/* Término */}
            <FormInput
              label="Término (años)"
              type="number"
              placeholder="Ej: 20"
              registerReturn={register('term', { valueAsNumber: true })}
              error={errors.term}
              showError={!!touchedFields.term || isSubmitted}
              isValid={isFieldValid('term')}
              animationDelay="0ms"
              min="1"
              max="50"
              step="1"
            />

            {/* Suma Asegurada */}
            <FormInput
              label="Suma Asegurada (USD)"
              type="number"
              placeholder="100000"
              registerReturn={register('insuredSum', {
                setValueAs: v => (v === '' ? undefined : Number(v)),
              })}
              error={errors.insuredSum}
              showError={!!touchedFields.insuredSum || isSubmitted}
              isValid={isFieldValid('insuredSum')}
              animationDelay="100ms"
              min="10000"
              step="1000"
              inputMode="numeric"
            />

            {/* Propósito de la Cobertura */}
            <FormTextarea
              label="Propósito de la Cobertura"
              rows={4}
              placeholder="Ej: Protección familiar, deudas hipotecarias"
              registerReturn={register('coveragePurpose')}
              error={errors.coveragePurpose}
              showError={!!(touchedFields.coveragePurpose || isSubmitted)}
              isValid={isFieldValid('coveragePurpose')}
              animationDelay="200ms"
            />
          </div>

          {/* Right Column - Personal Information */}
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="font-semibold text-lg" style={{ color: '#0c2939' }}>
                Información Personal
              </h3>
              <p className="text-sm" style={{ color: '#666666' }}>
                Datos del asegurado
              </p>
            </div>

            {/* Cédula */}
            <FormInput
              label="Cédula"
              placeholder="12345678"
              registerReturn={register('idNumber')}
              error={errors.idNumber}
              showError={!!touchedFields.idNumber || isSubmitted}
              isValid={isFieldValid('idNumber')}
              animationDelay="300ms"
            />

            {/* Fecha de Nacimiento */}
            <FormInput
              label="Fecha de Nacimiento"
              type="date"
              registerReturn={register('dateOfBirth')}
              error={errors.dateOfBirth}
              showError={!!touchedFields.dateOfBirth || isSubmitted}
              isValid={isFieldValid('dateOfBirth')}
              animationDelay="400ms"
              max={today}
            />

            {/* Fumador */}
            <FormCheckbox
              label="Estado de Fumador"
              checkboxLabel="¿Es fumador?"
              registerReturn={register('isSmoker')}
              error={errors.isSmoker}
              showError={!!(touchedFields.isSmoker || isSubmitted)}
              isValid={isFieldValid('isSmoker')}
              animationDelay="500ms"
            />
          </div>
        </div>

        <FormButtons
          isValid={isValid}
          totalFields={6}
          completedFields={completedFields}
          onBack={handleBack}
        />
      </FormContainer>
    </FormPageLayout>
  )
}

export default LifeInsuranceForm
