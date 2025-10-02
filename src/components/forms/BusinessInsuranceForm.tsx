import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useQuoteStore } from '@/store/quoteStore'
import {
  businessInsuranceSchema,
  type BusinessInsuranceFormData,
} from '@/schemas/businessInsurance'
import { useFormValidation } from '@/hooks/useFormValidation'
import FormPageLayout from '@/components/ui/form/FormPageLayout'
import FormHeader from '@/components/ui/form/FormHeader'
import FormContainer from '@/components/ui/form/FormContainer'
import FormProgressIndicator from '@/components/ui/form/FormProgressIndicator'
import FormButtons from '@/components/ui/form/FormButtons'
import FormInput from '@/components/ui/form/FormInput'
import FormRadioCard from '@/components/ui/form/FormRadioCard'

interface BusinessInsuranceFormProps {
  onSubmit: (data: BusinessInsuranceFormData) => void
}

function BusinessInsuranceForm({ onSubmit }: BusinessInsuranceFormProps) {
  const navigate = useNavigate()
  const { formData } = useQuoteStore()
  const defaultValues = (formData as BusinessInsuranceFormData | null) ?? undefined

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields, isSubmitted },
  } = useForm<BusinessInsuranceFormData>({
    resolver: zodResolver(businessInsuranceSchema),
    defaultValues,
    mode: 'all',
  })

  const watchedFields = watch()

  const { isFieldValid, completedFields } = useFormValidation(watchedFields, errors)

  const handleBack = () => {
    navigate('/quote/type')
  }

  return (
    <FormPageLayout>
      <FormHeader title="Información del Negocio" />
      <FormProgressIndicator completedFields={completedFields} totalFields={4} />
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-8">
          {/* Business Information */}
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="font-semibold text-lg" style={{ color: '#1d2c3d' }}>
                Datos del Negocio
              </h3>
              <p className="text-sm" style={{ color: '#666666' }}>
                Información de la empresa
              </p>
            </div>

            {/* Nombre del Negocio */}
            <FormInput
              label="Nombre del Negocio"
              type="text"
              placeholder="Ej: Panadería La Esperanza"
              registerReturn={register('businessName')}
              error={errors.businessName}
              showError={!!(touchedFields.businessName || isSubmitted)}
              isValid={isFieldValid('businessName')}
              animationDelay="0ms"
            />

            {/* RIF o Cédula */}
            <FormInput
              label="RIF o Cédula"
              type="text"
              placeholder="Ej: J-12345678-9"
              registerReturn={register('taxIdOrIdNumber')}
              error={errors.taxIdOrIdNumber}
              showError={!!(touchedFields.taxIdOrIdNumber || isSubmitted)}
              isValid={isFieldValid('taxIdOrIdNumber')}
              animationDelay="100ms"
            />

            {/* Industria/Giro */}
            <FormInput
              label="Industria/Giro del Negocio"
              type="text"
              placeholder="Ej: Comercio, Restaurante, Oficina"
              registerReturn={register('industry')}
              error={errors.industry}
              showError={!!(touchedFields.industry || isSubmitted)}
              isValid={isFieldValid('industry')}
              animationDelay="200ms"
            />
          </div>

          {/* Insurance Type - Radio Cards */}
          <FormRadioCard
            title="Tipo de Seguro"
            subtitle="¿Qué deseas proteger en tu negocio?"
            options={[
              {
                value: 'Personas',
                title: 'Personas',
                description: 'Seguro de vida y salud para empleados',
                icon: '👥',
              },
              {
                value: 'Patrimonio',
                title: 'Patrimonio',
                description: 'Protección de bienes, locales y equipos',
                icon: '🏢',
              },
            ]}
            registerReturn={register('insuranceType')}
            selectedValue={watchedFields.insuranceType}
            error={errors.insuranceType}
            showError={!!(touchedFields.insuranceType || isSubmitted)}
            animationDelay="300ms"
            columns={2}
          />

          <FormButtons
            isValid={isValid}
            totalFields={4}
            completedFields={completedFields}
            onBack={handleBack}
          />
        </div>
      </FormContainer>
    </FormPageLayout>
  )
}

export default BusinessInsuranceForm
