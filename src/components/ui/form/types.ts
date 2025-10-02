import type { ReactNode, FormEvent } from 'react'
import type {
  FieldError,
  UseFormRegisterReturn,
  UseFormRegister,
  FieldErrors,
  FormState,
} from 'react-hook-form'
import type { HealthInsuranceFormData } from '@/schemas/healthInsurance'

export interface FormPageLayoutProps {
  children: ReactNode
}

export interface FormHeaderProps {
  title: string
}

export interface FormContainerProps {
  children: ReactNode
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export interface FormProgressIndicatorProps {
  completedFields: number
  totalFields: number
}

export interface FormButtonsProps {
  isValid: boolean
  totalFields: number
  completedFields: number
  onBack: () => void
}

export interface FormInputProps {
  label: string
  type?: 'text' | 'number' | 'date'
  placeholder?: string
  registerReturn: UseFormRegisterReturn
  error?: FieldError
  showError: boolean
  isValid: boolean
  animationDelay: string
  min?: string | number
  max?: string | number
  step?: string | number
  inputMode?: 'text' | 'numeric' | 'tel'
}

export interface FormTextareaProps {
  label: string
  rows?: number
  placeholder?: string
  registerReturn: UseFormRegisterReturn
  error?: FieldError
  showError: boolean
  isValid: boolean
  animationDelay: string
}

export interface FormCheckboxProps {
  label: string
  checkboxLabel: string
  registerReturn: UseFormRegisterReturn
  error?: FieldError
  showError: boolean
  isValid: boolean
  animationDelay: string
}

export interface RadioOption {
  value: string
  title: string
  description: string
  icon?: string
}

export interface FormRadioCardProps {
  title: string
  subtitle: string
  options: RadioOption[]
  registerReturn: UseFormRegisterReturn
  selectedValue: string | undefined
  error?: FieldError
  showError: boolean
  animationDelay?: string
  columns?: 2 | 3
}

export interface FormMemberFieldProps {
  index: number
  register: UseFormRegister<HealthInsuranceFormData>
  errors: FieldErrors<HealthInsuranceFormData>
  touchedFields: FormState<HealthInsuranceFormData>['touchedFields']
  isSubmitted: boolean
  onRemove: () => void
  canRemove: boolean
  today: string
  watchedMembers: HealthInsuranceFormData['members'] | undefined
}
