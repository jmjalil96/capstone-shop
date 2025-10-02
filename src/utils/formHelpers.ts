/**
 * Generate array of years for vehicle year select
 * Returns current year + 1 (for next model year) down to 30 years ago
 */
export function generateYearOptions(): string[] {
  const currentYear = new Date().getFullYear()
  const years: string[] = []

  // Include next year (for new model releases)
  for (let year = currentYear + 1; year >= currentYear - 30; year--) {
    years.push(year.toString())
  }

  return years
}

/**
 * Format currency input with commas as user types
 * Removes non-digit characters and formats with commas
 */
export function formatCurrency(value: string): string {
  // Remove all non-digit characters
  const digitsOnly = value.replace(/\D/g, '')

  // Return empty if no digits
  if (!digitsOnly) return ''

  // Convert to number and format with commas
  const number = parseInt(digitsOnly, 10)
  return number.toLocaleString('en-US')
}

/**
 * Parse formatted currency string to number for form submission
 */
export function parseCurrency(value: string): number {
  const digitsOnly = value.replace(/\D/g, '')
  return parseInt(digitsOnly, 10) || 0
}
