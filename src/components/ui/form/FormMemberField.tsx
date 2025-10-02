import { Check, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import type { FormMemberFieldProps } from './types'

/**
 * Member field component for dynamic family member array in Health insurance form
 * Renders dateOfBirth and memberType inputs with validation and checkmarks
 */
function FormMemberField({
  index,
  register,
  errors,
  touchedFields,
  isSubmitted,
  onRemove,
  canRemove,
  today,
  watchedMembers,
}: FormMemberFieldProps) {
  return (
    <div
      className="relative rounded-xl border border-gray-200 bg-gray-50 p-6 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium" style={{ color: '#1d2c3d' }}>
          Miembro {index + 1}
          {index === 0 && <span className="ml-2 text-xs text-teal-600">(Titular)</span>}
        </h4>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm transition-colors"
          >
            <X className="h-4 w-4" />
            Eliminar
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fecha de Nacimiento */}
        <div className="relative">
          <label
            htmlFor={`members.${index}.dateOfBirth`}
            className="mb-2 block font-medium text-sm"
            style={{ color: '#666666' }}
          >
            Fecha de Nacimiento *
          </label>
          <input
            {...register(`members.${index}.dateOfBirth`)}
            type="date"
            id={`members.${index}.dateOfBirth`}
            max={today}
            className={cn(
              'w-full rounded-lg border px-4 py-3 pr-10 transition-all duration-200',
              'focus:scale-[1.02] focus:border-transparent focus:outline-none focus:ring-2',
              errors.members?.[index]?.dateOfBirth ? 'border-red-300' : 'border-gray-300',
            )}
            style={{ '--tw-ring-color': '#4ca18d' } as React.CSSProperties}
          />
          {watchedMembers?.[index]?.dateOfBirth && !errors.members?.[index]?.dateOfBirth && (
            <div className="absolute top-11 right-3 flex h-4 w-4 animate-fade-in items-center justify-center rounded-full bg-teal-500">
              <Check className="h-3 w-3 text-white" strokeWidth={3} />
            </div>
          )}
          {errors.members?.[index]?.dateOfBirth &&
            (touchedFields.members?.[index]?.dateOfBirth || isSubmitted) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.members[index]?.dateOfBirth?.message}
              </p>
            )}
        </div>

        {/* Tipo de Miembro */}
        <div className="relative">
          <label
            htmlFor={`members.${index}.memberType`}
            className="mb-2 block font-medium text-sm"
            style={{ color: '#666666' }}
          >
            Tipo de Miembro *
          </label>
          <select
            {...register(`members.${index}.memberType`)}
            id={`members.${index}.memberType`}
            className={cn(
              'w-full rounded-lg border py-3 pr-10 transition-all duration-200',
              'focus:scale-[1.02] focus:border-transparent focus:outline-none focus:ring-2',
              errors.members?.[index]?.memberType ? 'border-red-300' : 'border-gray-300',
            )}
            style={
              {
                '--tw-ring-color': '#4ca18d',
                paddingLeft:
                  watchedMembers?.[index]?.memberType && !errors.members?.[index]?.memberType
                    ? '2.5rem'
                    : '1rem',
              } as React.CSSProperties
            }
          >
            <option value="Titular">Titular</option>
            <option value="Cónyuge">Cónyuge</option>
            <option value="Hijo">Hijo</option>
            <option value="Otro">Otro</option>
          </select>
          {watchedMembers?.[index]?.memberType && !errors.members?.[index]?.memberType && (
            <div className="absolute top-11 left-3 flex h-4 w-4 animate-fade-in items-center justify-center rounded-full bg-teal-500">
              <Check className="h-3 w-3 text-white" strokeWidth={3} />
            </div>
          )}
          {errors.members?.[index]?.memberType &&
            (touchedFields.members?.[index]?.memberType || isSubmitted) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.members[index]?.memberType?.message}
              </p>
            )}
        </div>
      </div>
    </div>
  )
}

export default FormMemberField
