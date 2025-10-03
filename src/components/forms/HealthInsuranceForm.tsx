import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useQuoteStore } from '@/store/quoteStore'
import { healthInsuranceSchema, type HealthInsuranceFormData } from '@/schemas/healthInsurance'
import { Plus } from 'lucide-react'
import { cn } from '@/utils/cn'
import FormPageLayout from '@/components/ui/form/FormPageLayout'
import FormHeader from '@/components/ui/form/FormHeader'
import FormContainer from '@/components/ui/form/FormContainer'
import FormProgressIndicator from '@/components/ui/form/FormProgressIndicator'
import FormButtons from '@/components/ui/form/FormButtons'
import FormRadioCard from '@/components/ui/form/FormRadioCard'
import FormMemberField from '@/components/ui/form/FormMemberField'

interface HealthInsuranceFormProps {
  onSubmit: (data: HealthInsuranceFormData) => void
}

function HealthInsuranceForm({ onSubmit }: HealthInsuranceFormProps) {
  const navigate = useNavigate()
  const { formData } = useQuoteStore()
  const savedData = (formData as HealthInsuranceFormData | null) ?? undefined

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields, isSubmitted },
  } = useForm<HealthInsuranceFormData>({
    resolver: zodResolver(healthInsuranceSchema),
    defaultValues: savedData || {
      members: [{ dateOfBirth: '', memberType: 'Titular' }],
    },
    mode: 'all',
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  })

  const today = new Date().toISOString().split('T')[0]

  const watchedFields = watch()

  // Count completed fields dynamically (custom logic for this form)
  const totalFields = fields.length * 2 + 1 // Each member has 2 fields + coverageType
  let completedFields = 0

  // Count completed member fields
  watchedFields.members?.forEach((member, index) => {
    if (member.dateOfBirth && !errors.members?.[index]?.dateOfBirth) completedFields++
    if (member.memberType && !errors.members?.[index]?.memberType) completedFields++
  })

  // Count coverageType
  if (watchedFields.coverageType && !errors.coverageType) completedFields++

  const handleBack = () => {
    navigate('/quote/type')
  }

  const addMember = () => {
    if (fields.length < 10) {
      append({ dateOfBirth: '', memberType: 'Hijo' })
    }
  }

  return (
    <FormPageLayout>
      <FormHeader title="Información del Seguro de Salud" />
      <FormProgressIndicator completedFields={completedFields} totalFields={totalFields} />
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-8">
          {/* Members Section */}
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div>
                <h3 className="font-semibold text-lg" style={{ color: '#0c2939' }}>
                  Miembros del Grupo Familiar
                </h3>
                <p className="text-sm" style={{ color: '#666666' }}>
                  Agrega todos los miembros a asegurar
                </p>
              </div>
              <button
                type="button"
                onClick={addMember}
                disabled={fields.length >= 10}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium text-sm transition-all',
                  'w-full sm:w-auto',
                  fields.length >= 10
                    ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                    : 'bg-teal-500 hover:bg-teal-600 text-white',
                )}
              >
                <Plus className="h-4 w-4" />
                Agregar Miembro
              </button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <FormMemberField
                  key={field.id}
                  index={index}
                  register={register}
                  errors={errors}
                  touchedFields={touchedFields}
                  isSubmitted={isSubmitted}
                  onRemove={() => remove(index)}
                  canRemove={fields.length > 1}
                  today={today}
                  watchedMembers={watchedFields.members}
                />
              ))}
            </div>

            {errors.members && typeof errors.members.message === 'string' && (
              <p className="text-red-500 text-sm mt-2">{errors.members.message}</p>
            )}
          </div>

          {/* Coverage Type - Radio Cards */}
          <FormRadioCard
            title="Tipo de Cobertura"
            subtitle="Selecciona el nivel de cobertura que necesitas"
            options={[
              {
                value: 'Gastos Médicos Mayores',
                title: 'Mayores',
                description: 'Hospitalización, cirugías mayores, enfermedades graves',
              },
              {
                value: 'Gastos Médicos Menores',
                title: 'Menores',
                description: 'Consultas médicas, exámenes, medicamentos ambulatorios',
              },
              {
                value: 'Indiferente',
                title: 'Indiferente',
                description: 'Déjanos recomendarte la mejor opción',
              },
            ]}
            registerReturn={register('coverageType')}
            selectedValue={watchedFields.coverageType}
            error={errors.coverageType}
            showError={!!(touchedFields.coverageType || isSubmitted)}
            columns={3}
          />

          <FormButtons
            isValid={isValid}
            totalFields={totalFields}
            completedFields={completedFields}
            onBack={handleBack}
          />
        </div>
      </FormContainer>
    </FormPageLayout>
  )
}

export default HealthInsuranceForm
