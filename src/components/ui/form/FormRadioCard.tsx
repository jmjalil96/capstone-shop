import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'
import type { FormRadioCardProps } from './types'

/**
 * Radio button selection displayed as interactive cards
 * Used for coverage type selection and insurance type selection
 */
function FormRadioCard({
  title,
  subtitle,
  options,
  registerReturn,
  selectedValue,
  error,
  showError,
  animationDelay = '0ms',
  columns = 3,
}: FormRadioCardProps) {
  return (
    <div className="animate-fade-in" style={{ animationDelay }}>
      <div className="mb-4">
        <h3 className="font-semibold text-lg" style={{ color: '#1d2c3d' }}>
          {title} *
        </h3>
        <p className="text-sm" style={{ color: '#666666' }}>
          {subtitle}
        </p>
      </div>

      <div
        className={cn(
          'grid grid-cols-1 gap-4',
          columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2',
        )}
      >
        {options.map((option, idx) => {
          const isSelected = selectedValue === option.value
          return (
            <label
              key={option.value}
              className={cn(
                'relative flex cursor-pointer flex-col rounded-xl border-2 p-5 transition-all duration-200',
                'hover:scale-105 hover:shadow-md active:scale-95 animate-fade-in',
                isSelected
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 bg-white hover:border-gray-300',
              )}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <input {...registerReturn} type="radio" value={option.value} className="sr-only" />
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  {option.icon && <span className="text-2xl">{option.icon}</span>}
                  <h4
                    className={cn('font-semibold', option.icon ? 'text-lg' : 'text-base')}
                    style={{ color: isSelected ? '#0d9488' : '#1d2c3d' }}
                  >
                    {option.title}
                  </h4>
                </div>
                {isSelected && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-500">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </div>
                )}
              </div>
              <p
                className={cn('leading-relaxed', option.icon ? 'text-sm' : 'text-xs')}
                style={{ color: '#666666' }}
              >
                {option.description}
              </p>
            </label>
          )
        })}
      </div>
      {showError && error && <p className="mt-2 text-red-500 text-sm">{error.message}</p>}
    </div>
  )
}

export default FormRadioCard
