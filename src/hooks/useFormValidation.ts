import type { FieldErrors, FieldValues } from 'react-hook-form'

/**
 * Generic form validation hook
 * Provides isFieldValid checker and completed field count
 */
export function useFormValidation<T extends FieldValues>(
  watchedFields: Partial<T>,
  errors: FieldErrors<T>,
) {
  const isFieldValid = (field: keyof T): boolean => {
    const value = watchedFields[field]
    // Check if field has a value (allow 0 for numbers, false for boolean)
    if (value == null || value === '') return false
    // Check for NaN on number fields
    if (typeof value === 'number' && isNaN(value)) return false
    // Check if RHF has no error for this field
    return !errors[field]
  }

  const completedFields = Object.keys(watchedFields).filter(field =>
    isFieldValid(field as keyof T),
  ).length

  return { isFieldValid, completedFields }
}
