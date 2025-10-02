import { cn } from '@/utils/cn'
import type { FormProgressIndicatorProps } from './types'

/**
 * Progress indicator showing completion status and animated dots
 * Used across all insurance forms for visual feedback
 */
function FormProgressIndicator({ completedFields, totalFields }: FormProgressIndicatorProps) {
  return (
    <div className="mb-8 text-center">
      <div className="mx-auto max-w-sm rounded-full bg-white p-3 shadow-md">
        <div className="flex items-center justify-between text-sm" style={{ color: '#666666' }}>
          <span>
            {completedFields} de {totalFields} campos completos
          </span>
          <div className="flex space-x-1">
            {Array.from({ length: totalFields }, (_, i) => (
              <div
                key={`progress-dot-${i}`}
                className={cn(
                  'h-2 w-2 rounded-full transition-all duration-300',
                  i < completedFields ? 'animate-pulse bg-teal-500' : 'bg-gray-200',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormProgressIndicator
