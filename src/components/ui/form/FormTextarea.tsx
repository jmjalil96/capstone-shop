import { useId } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'
import type { FormTextareaProps } from './types'

/**
 * Reusable textarea field with validation UI, checkmarks, and consistent styling
 */
function FormTextarea({
  label,
  rows = 3,
  placeholder,
  registerReturn,
  error,
  showError,
  isValid,
  animationDelay,
}: FormTextareaProps) {
  const fieldId = useId()

  return (
    <div className="relative animate-fade-in" style={{ animationDelay }}>
      <label
        htmlFor={fieldId}
        className="mb-2 block font-medium text-sm"
        style={{ color: '#666666' }}
      >
        {label} *
      </label>
      <textarea
        {...registerReturn}
        id={fieldId}
        rows={rows}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-lg border px-4 py-3 pr-10 transition-all duration-200',
          'focus:scale-[1.02] focus:border-transparent focus:outline-none focus:ring-2',
          error ? 'border-red-300' : 'border-gray-300',
        )}
        style={{ '--tw-ring-color': '#4ca18d' } as React.CSSProperties}
      />
      {isValid && (
        <div className="absolute top-11 right-3 flex h-4 w-4 animate-fade-in items-center justify-center rounded-full bg-teal-500">
          <Check className="h-3 w-3 text-white" strokeWidth={3} />
        </div>
      )}
      {showError && error && <p className="mt-1 text-red-500 text-sm">{error.message}</p>}
    </div>
  )
}

export default FormTextarea
