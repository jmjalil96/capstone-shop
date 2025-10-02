/**
 * Input formatting utilities for better UX
 */

/**
 * Format Venezuelan phone number as user types
 * Formats: 04121234567 → 0412-123-4567
 * @param value - Raw phone number string
 * @returns Formatted phone number
 */
export function formatPhone(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '')

  // Limit to 11 digits (Venezuelan format: 04XX-XXX-XXXX)
  const limited = digits.slice(0, 11)

  // Apply formatting based on length
  if (limited.length <= 4) {
    return limited
  } else if (limited.length <= 7) {
    return `${limited.slice(0, 4)}-${limited.slice(4)}`
  } else {
    return `${limited.slice(0, 4)}-${limited.slice(4, 7)}-${limited.slice(7)}`
  }
}

/**
 * Parse formatted phone to raw digits for validation/submission
 * @param value - Formatted phone string
 * @returns Raw digits only
 */
export function parsePhone(value: string): string {
  return value.replace(/\D/g, '')
}

// TODO: Currency formatting for inputs
// Consider using react-number-format library for better UX:
// - Real-time thousands separators
// - Decimal handling
// - Negative value prevention
// - Min/max enforcement
// Current approach (plain number input) works but could be enhanced
