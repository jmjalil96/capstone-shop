import { Menu } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { ctaButton, navItems } from './constants'
import MobileMenu from './MobileMenu'
import NavbarLink from './NavbarLink'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Memoized toggle function with debouncing
  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial scroll position

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      // Save original overflow value
      const originalOverflow = document.body.style.overflow
      // Prevent scrolling when menu is open
      document.body.style.overflow = 'hidden'

      // Cleanup function to restore original overflow
      return () => {
        document.body.style.overflow = originalOverflow || 'unset'
      }
    }
    // Explicitly reset overflow when menu closes
    document.body.style.overflow = 'unset'
    return undefined
  }, [isOpen])

  // Failsafe: Always restore scroll on unmount
  useEffect(() => {
    return () => {
      // Ensure scrolling is restored when component unmounts
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Close menu on resize to prevent stuck states
  useEffect(() => {
    const handleResize = () => {
      // Close menu if window is resized to desktop size
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 z-50 w-full px-4 py-3 transition-all duration-300 sm:px-6 sm:py-4 md:px-8 lg:px-12',
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="font-bold font-display text-slate-800 text-xl sm:text-2xl md:text-3xl">
            Capstone
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-8 md:flex">
          {navItems.map(item => (
            <NavbarLink key={item.href} href={item.href}>
              {item.label}
            </NavbarLink>
          ))}
          <Link to={ctaButton.href} className="btn-primary">
            {ctaButton.label}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={cn(
            'rounded-lg p-2 text-slate-800 transition-colors md:hidden',
            isScrolled
              ? 'hover:bg-gray-100'
              : 'bg-white/90 shadow-md backdrop-blur-sm hover:bg-white',
          )}
          onClick={toggleMenu}
          aria-label="Abrir menú de navegación"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </nav>
  )
}

export default Navbar
