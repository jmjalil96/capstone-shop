import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

interface NavbarLinkProps {
  href: string
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'default' | 'mobile'
}

const NavbarLink = ({
  href,
  children,
  onClick,
  className,
  variant = 'default',
}: NavbarLinkProps) => {
  const baseStyles =
    variant === 'mobile'
      ? 'text-lg font-medium text-slate-800 py-2 sm:text-xl sm:py-3'
      : 'text-sm font-medium text-slate-800 hover:text-teal-500 transition-colors duration-300 lg:text-base'

  // Use anchor tag for hash links (same page navigation)
  // Use React Router Link for route navigation
  if (href.startsWith('#')) {
    return (
      <a href={href} className={cn(baseStyles, className)} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <Link to={href} className={cn(baseStyles, className)} onClick={onClick}>
      {children}
    </Link>
  )
}

export default NavbarLink
