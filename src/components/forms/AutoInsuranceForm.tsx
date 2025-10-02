import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useQuoteStore } from '@/store/quoteStore'
import { autoInsuranceSchema, type AutoInsuranceFormData } from '@/schemas/autoInsurance'
import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useId } from 'react'
import { generateYearOptions } from '@/utils/formHelpers'
import { useFormValidation } from '@/hooks/useFormValidation'
import FormPageLayout from '@/components/ui/form/FormPageLayout'
import FormHeader from '@/components/ui/form/FormHeader'
import FormContainer from '@/components/ui/form/FormContainer'
import FormProgressIndicator from '@/components/ui/form/FormProgressIndicator'
import FormButtons from '@/components/ui/form/FormButtons'
import FormInput from '@/components/ui/form/FormInput'

interface AutoInsuranceFormProps {
  onSubmit: (data: AutoInsuranceFormData) => void
}

function AutoInsuranceForm({ onSubmit }: AutoInsuranceFormProps) {
  const navigate = useNavigate()
  const { formData } = useQuoteStore()
  const defaultValues = (formData as AutoInsuranceFormData | null) ?? undefined

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields, isSubmitted },
  } = useForm<AutoInsuranceFormData>({
    resolver: zodResolver(autoInsuranceSchema),
    defaultValues,
    mode: 'all', // Validate on all events for live feedback
  })

  const yearOptions = generateYearOptions()
  const today = new Date().toISOString().split('T')[0]

  // Generate unique IDs for accessibility (only for non-FormInput fields)
  const yearId = useId()

  // Watch all fields for progress tracking
  const watchedFields = watch()

  const { isFieldValid, completedFields } = useFormValidation(watchedFields, errors)

  const handleBack = () => {
    navigate('/quote/type')
  }

  return (
    <FormPageLayout>
      <FormHeader title="Información del Vehículo" />
      <FormProgressIndicator completedFields={completedFields} totalFields={7} />
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        {/* 2-Column Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column - Vehicle Information */}
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="font-semibold text-lg" style={{ color: '#1d2c3d' }}>
                Datos del Vehículo
              </h3>
              <p className="text-sm" style={{ color: '#666666' }}>
                Información del auto a asegurar
              </p>
            </div>

            {/* Año */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0ms' }}>
              <label
                htmlFor={yearId}
                className="mb-2 block font-medium text-sm"
                style={{ color: '#666666' }}
              >
                Año del Vehículo *
              </label>
              <select
                {...register('year', {
                  setValueAs: v => (v === '' ? undefined : parseInt(v, 10)),
                })}
                id={yearId}
                className={cn(
                  'w-full rounded-lg border py-3 pr-10 transition-all duration-200',
                  'focus:scale-[1.02] focus:border-transparent focus:outline-none focus:ring-2',
                  errors.year ? 'border-red-300' : 'border-gray-300',
                  isFieldValid('year') ? 'pl-10' : 'pl-4',
                )}
                style={{ '--tw-ring-color': '#4ca18d' } as React.CSSProperties}
              >
                <option value="">Selecciona el año</option>
                {yearOptions.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {isFieldValid('year') && (
                <div className="absolute top-11 left-3 flex h-4 w-4 animate-fade-in items-center justify-center rounded-full bg-teal-500">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </div>
              )}
              {errors.year && (touchedFields.year || isSubmitted) && (
                <p className="mt-1 text-red-500 text-sm">{errors.year.message}</p>
              )}
            </div>

            {/* Marca */}
            <FormInput
              label="Marca"
              type="text"
              placeholder="Toyota, Honda, Ford"
              registerReturn={register('make')}
              error={errors.make}
              showError={!!touchedFields.make || isSubmitted}
              isValid={isFieldValid('make')}
              animationDelay="100ms"
            />

            {/* Modelo */}
            <FormInput
              label="Modelo"
              placeholder="Corolla, Civic, F-150"
              registerReturn={register('model')}
              error={errors.model}
              showError={!!touchedFields.model || isSubmitted}
              isValid={isFieldValid('model')}
              animationDelay="200ms"
            />

            {/* Placa o RAMV */}
            <FormInput
              label="Placa o RAMV"
              placeholder="ABC123"
              registerReturn={register('licensePlate')}
              error={errors.licensePlate}
              showError={!!touchedFields.licensePlate || isSubmitted}
              isValid={isFieldValid('licensePlate')}
              animationDelay="300ms"
            />
          </div>

          {/* Right Column - Personal Information */}
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="font-semibold text-lg" style={{ color: '#1d2c3d' }}>
                Información Personal
              </h3>
              <p className="text-sm" style={{ color: '#666666' }}>
                Datos del titular
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
              animationDelay="400ms"
            />

            {/* Fecha de Nacimiento */}
            <FormInput
              label="Fecha de Nacimiento"
              type="date"
              registerReturn={register('dateOfBirth')}
              error={errors.dateOfBirth}
              showError={!!touchedFields.dateOfBirth || isSubmitted}
              isValid={isFieldValid('dateOfBirth')}
              animationDelay="500ms"
              max={today}
            />

            {/* Suma Asegurada */}
            {/* TODO: Add real-time currency formatting (e.g., 15000 → $15,000) using formatCurrency onChange */}
            <FormInput
              label="Suma Asegurada"
              type="number"
              placeholder="15000"
              registerReturn={register('insuredSum', {
                setValueAs: v => (v === '' ? undefined : Number(v)),
              })}
              error={errors.insuredSum}
              showError={!!touchedFields.insuredSum || isSubmitted}
              isValid={isFieldValid('insuredSum')}
              animationDelay="600ms"
              min="1000"
              step="100"
              inputMode="numeric"
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

export default AutoInsuranceForm
