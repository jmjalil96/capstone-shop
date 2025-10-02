import type { FormContainerProps } from './types'

/**
 * White card container that wraps the form element
 * Provides consistent styling for all insurance forms
 */
function FormContainer({ children, onSubmit }: FormContainerProps) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg lg:p-10">
      <form onSubmit={onSubmit}>{children}</form>
    </div>
  )
}

export default FormContainer
