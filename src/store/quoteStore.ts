import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { InsuranceType, InsuranceFormData, Quote, ContactInfo } from '@/types/insurance'
import { calculateQuote } from '@/utils/quoteCalculator'

interface QuoteState {
  // Step 1: Insurance type selection
  insuranceType: InsuranceType | null

  // Step 2: Form data (varies by insurance type)
  formData: InsuranceFormData | null

  // Step 3: Calculated quote
  quote: Quote | null

  // Step 3: Contact information
  contactInfo: ContactInfo | null

  // Reference number for success page
  referenceNumber: string | null

  // Timestamps for UX features (draft expiry, last saved, etc.)
  createdAt: string | null
  updatedAt: string | null

  // Actions
  setInsuranceType: (type: InsuranceType) => void
  setFormData: (data: InsuranceFormData) => void
  calculateQuote: () => void
  setContactInfo: (info: ContactInfo) => void
  reset: () => void
}

const initialState = {
  insuranceType: null,
  formData: null,
  quote: null,
  contactInfo: null,
  referenceNumber: null,
  createdAt: null,
  updatedAt: null,
}

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setInsuranceType: (type: InsuranceType) => {
        const now = new Date().toISOString()
        const { createdAt } = get()

        // Generate reference number immediately when insurance type is selected
        const year = new Date().getFullYear()
        const randomId = Math.random().toString().slice(2, 8)
        const referenceNumber = `QT-${year}-${randomId}`

        set({
          insuranceType: type,
          formData: null, // Reset form data when changing insurance type
          quote: null, // Reset quote
          referenceNumber, // Set reference number for entire flow
          createdAt: createdAt || now, // Set if first time
          updatedAt: now,
        })
      },

      setFormData: (data: InsuranceFormData) => {
        set({ formData: data, updatedAt: new Date().toISOString() })
      },

      calculateQuote: () => {
        const { insuranceType, formData } = get()
        if (!insuranceType || !formData) {
          return
        }

        const quote = calculateQuote(insuranceType, formData)
        set({ quote, updatedAt: new Date().toISOString() })
      },

      setContactInfo: (info: ContactInfo) => {
        set({
          contactInfo: info,
          updatedAt: new Date().toISOString(),
        })
      },

      reset: () => {
        set(initialState)
      },
    }),
    {
      name: 'capstone-shop-quote-storage',
      version: 1,
      partialize: state => ({
        insuranceType: state.insuranceType,
        formData: state.formData,
        quote: state.quote,
        contactInfo: state.contactInfo,
        referenceNumber: state.referenceNumber,
        createdAt: state.createdAt,
        updatedAt: state.updatedAt,
      }),
      migrate: (persistedState: unknown, version: number) => {
        // Migration for old Spanish field names to new English names
        if (version === 0 && persistedState && typeof persistedState === 'object') {
          const migrated = { ...(persistedState as Record<string, unknown>) }

          // Migrate contact info if exists (Spanish → English)
          const contactInfo = migrated.contactInfo as Record<string, unknown> | undefined
          if (contactInfo && typeof contactInfo === 'object') {
            migrated.contactInfo = {
              name: (contactInfo.nombre as string) || (contactInfo.name as string) || '',
              email: (contactInfo.email as string) || '',
              phone: (contactInfo.telefono as string) || (contactInfo.phone as string) || '',
            }
          }

          // FormData integrity check: Reset if incompatible structure detected
          // Old formData may have Spanish keys (año, cédula, etc.) which are now English
          // Rather than complex per-schema migration, we reset to prevent corrupt state
          const formData = migrated.formData as Record<string, unknown> | undefined
          if (formData && typeof formData === 'object') {
            // Check for old Spanish keys as indicator of old structure
            const hasOldKeys =
              'año' in formData ||
              'cedula' in formData ||
              'cédula' in formData ||
              'placaORAMV' in formData ||
              'sumaAsegurada' in formData
            if (hasOldKeys) {
              // Reset incompatible formData to prevent errors
              migrated.formData = null
              migrated.quote = null // Quote depends on formData, must reset too
            }
          }

          // Add timestamps if missing (new in v1)
          if (!migrated.createdAt) {
            migrated.createdAt = new Date().toISOString()
          }
          if (!migrated.updatedAt) {
            migrated.updatedAt = new Date().toISOString()
          }

          return migrated
        }
        return persistedState as QuoteState
      },
    },
  ),
)

// Selectors for common use cases
export const useInsuranceType = () => useQuoteStore(state => state.insuranceType)
export const useFormData = () => useQuoteStore(state => state.formData)
export const useQuote = () => useQuoteStore(state => state.quote)
export const useContactInfo = () => useQuoteStore(state => state.contactInfo)

// Derived selectors for navigation guards
export const useIsReadyForDetails = () => useQuoteStore(state => state.insuranceType !== null)

export const useIsReadyForSummary = () =>
  useQuoteStore(
    state => state.insuranceType !== null && state.formData !== null && state.quote !== null,
  )

export const useHasQuote = () => useQuoteStore(state => state.quote !== null)
