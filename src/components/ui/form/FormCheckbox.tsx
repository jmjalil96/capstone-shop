import { useId } from 'react'
import { Check } from 'lucide-react'
import type { FormCheckboxProps } from './types'

/**
 * Checkbox field with inline checkmark indicator in bordered container
 * Used for boolean fields like "isSmoker" in Life insurance form
 */
function FormCheckbox({
  label,
  checkboxLabel,
  registerReturn,
  error,
  showError,
  isValid,
  animationDelay,
}: FormCheckboxProps) {
  const fieldId = useId()

  return (
    <div className="relative animate-fade-in" style={{ animationDelay }}>
      <label className="mb-2 block font-medium text-sm" style={{ color: '#666666' }}>
        {label} *
      </label>
      <div className="flex items-center space-x-4 rounded-lg border border-gray-300 px-4 py-3">
        <label htmlFor={fieldId} className="flex items-center space-x-2 cursor-pointer">
          <input
            {...registerReturn}
            type="checkbox"
            id={fieldId}
            className="w-5 h-5 rounded border-gray-300 text-teal-500 focus:ring-2 focus:ring-teal-500"
          />
          <span className="text-sm" style={{ color: '#1d2c3d' }}>
            {checkboxLabel}
          </span>
        </label>
        {isValid && (
          <div className="ml-auto flex h-4 w-4 animate-fade-in items-center justify-center rounded-full bg-teal-500">
            <Check className="h-3 w-3 text-white" strokeWidth={3} />
          </div>
        )}
      </div>
      {showError && error && <p className="mt-1 text-red-500 text-sm">{error.message}</p>}
    </div>
  )
}

export default FormCheckbox
