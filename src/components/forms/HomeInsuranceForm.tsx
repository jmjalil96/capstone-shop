import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useQuoteStore } from '@/store/quoteStore'
import { homeInsuranceSchema, type HomeInsuranceFormData } from '@/schemas/homeInsurance'
import { useFormValidation } from '@/hooks/useFormValidation'
import FormPageLayout from '@/components/ui/form/FormPageLayout'
import FormHeader from '@/components/ui/form/FormHeader'
import FormContainer from '@/components/ui/form/FormContainer'
import FormProgressIndicator from '@/components/ui/form/FormProgressIndicator'
import FormButtons from '@/components/ui/form/FormButtons'
import FormInput from '@/components/ui/form/FormInput'
import FormTextarea from '@/components/ui/form/FormTextarea'

interface HomeInsuranceFormProps {
  onSubmit: (data: HomeInsuranceFormData) => void
}

function HomeInsuranceForm({ onSubmit }: HomeInsuranceFormProps) {
  const navigate = useNavigate()
  const { formData } = useQuoteStore()
  const defaultValues = (formData as HomeInsuranceFormData | null) ?? undefined

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields, isSubmitted },
  } = useForm<HomeInsuranceFormData>({
    resolver: zodResolver(homeInsuranceSchema),
    defaultValues,
    mode: 'all',
  })

  const today = new Date().toISOString().split('T')[0]
  const currentYear = new Date().getFullYear()

  const watchedFields = watch()

  const { isFieldValid, completedFields } = useFormValidation(watchedFields, errors)

  const handleBack = () => {
    navigate('/quote/type')
  }

  return (
    <FormPageLayout>
      <FormHeader title="Información de la Propiedad" />
      <FormProgressIndicator completedFields={completedFields} totalFields={7} />
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left - Property Details */}
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="font-semibold text-lg" style={{ color: '#1d2c3d' }}>
                Datos de la Propiedad
              </h3>
              <p className="text-sm" style={{ color: '#666666' }}>
                Información del inmueble
              </p>
            </div>

            {/* Año de Construcción */}
            <FormInput
              label="Año de Construcción"
              type="number"
              placeholder="Ej: 2015"
              registerReturn={register('constructionYear', {
                setValueAs: v => (v === '' ? undefined : Number(v)),
              })}
              error={errors.constructionYear}
              showError={!!(touchedFields.constructionYear || isSubmitted)}
              isValid={isFieldValid('constructionYear')}
              animationDelay="0ms"
              min="1800"
              max={currentYear.toString()}
              step="1"
            />

            {/* Valor Estructura */}
            <FormInput
              label="Valor de la Estructura (USD)"
              type="number"
              placeholder="100000"
              registerReturn={register('structureValue', {
                setValueAs: v => (v === '' ? undefined : Number(v)),
              })}
              error={errors.structureValue}
              showError={!!(touchedFields.structureValue || isSubmitted)}
              isValid={isFieldValid('structureValue')}
              animationDelay="100ms"
              min="10000"
              step="1000"
              inputMode="numeric"
            />

            {/* Valor Contenido */}
            <FormInput
              label="Valor del Contenido (USD)"
              type="number"
              placeholder="20000"
              registerReturn={register('contentValue', {
                setValueAs: v => (v === '' ? undefined : Number(v)),
              })}
              error={errors.contentValue}
              showError={!!(touchedFields.contentValue || isSubmitted)}
              isValid={isFieldValid('contentValue')}
              animationDelay="200ms"
              min="1000"
              step="1000"
              inputMode="numeric"
            />

            {/* Ciudad */}
            <FormInput
              label="Ciudad"
              type="text"
              placeholder="Caracas, Valencia, Maracaibo"
              registerReturn={register('city')}
              error={errors.city}
              showError={!!(touchedFields.city || isSubmitted)}
              isValid={isFieldValid('city')}
              animationDelay="300ms"
            />
          </div>

          {/* Right - Owner Information */}
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="font-semibold text-lg" style={{ color: '#1d2c3d' }}>
                Información del Propietario
              </h3>
              <p className="text-sm" style={{ color: '#666666' }}>
                Datos del titular
              </p>
            </div>

            {/* Cédula */}
            <FormInput
              label="Número de Cédula"
              type="text"
              placeholder="12345678"
              registerReturn={register('idNumber')}
              error={errors.idNumber}
              showError={!!(touchedFields.idNumber || isSubmitted)}
              isValid={isFieldValid('idNumber')}
              animationDelay="400ms"
            />

            {/* Fecha de Nacimiento */}
            <FormInput
              label="Fecha de Nacimiento"
              type="date"
              registerReturn={register('dateOfBirth')}
              error={errors.dateOfBirth}
              showError={!!(touchedFields.dateOfBirth || isSubmitted)}
              isValid={isFieldValid('dateOfBirth')}
              animationDelay="500ms"
              max={today}
            />

            {/* Dirección */}
            <FormTextarea
              label="Dirección Completa"
              rows={4}
              placeholder="Av. Principal, Urb. Los Rosales, Casa #10"
              registerReturn={register('address')}
              error={errors.address}
              showError={!!(touchedFields.address || isSubmitted)}
              isValid={isFieldValid('address')}
              animationDelay="600ms"
            />
          </div>
        </div>

        <FormButtons
          isValid={isValid}
          totalFields={7}
          completedFields={completedFields}
          onBack={handleBack}
        />
      </FormContainer>
    </FormPageLayout>
  )
}

export default HomeInsuranceForm
