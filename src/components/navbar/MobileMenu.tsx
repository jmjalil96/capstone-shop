import { useEffect, useRef } from 'react'
import { ctaButton, navItems } from './constants'

interface MobileMenuProps {
  isOpen: boolean
  toggleMenu: () => void
}

const MobileMenu = ({ isOpen, toggleMenu }: MobileMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null)

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        toggleMenu()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, toggleMenu])

  // Focus trap
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const firstFocusable = menuRef.current.querySelector<HTMLElement>('a, button')
      firstFocusable?.focus()
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 animate-fade-in-backdrop bg-black/50 backdrop-blur-sm md:hidden"
        onClick={toggleMenu}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className="fixed top-0 right-0 z-50 h-full w-full max-w-sm animate-slide-in-right bg-white shadow-xl md:hidden"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={toggleMenu}
          className="absolute top-4 right-4 rounded-lg p-2 text-slate-600 hover:bg-gray-100 hover:text-slate-900"
          aria-label="Close menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <title>Close</title>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Menu content */}
        <nav className="flex h-full flex-col px-6 pt-20">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-lg px-4 py-3 font-medium text-lg text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-600"
                  onClick={toggleMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="mt-auto mb-8 border-gray-200 border-t pt-6">
            <a
              href={ctaButton.href}
              className="btn-primary w-full text-center"
              onClick={toggleMenu}
            >
              {ctaButton.label}
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}

export default MobileMenu
