import { cn } from '@/utils/cn'
import type { ServiceItem } from './services-constants'

interface ServiceCardProps {
  service: ServiceItem
  index: number
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const { title, description, icon: Icon, featured } = service

  return (
    <div className="h-full animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
      <div
        className={cn(
          'hover:-translate-y-1 relative flex h-full flex-col rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl',
        )}
        style={{
          ...(featured && {
            boxShadow:
              '0 10px 30px -10px rgba(29, 44, 61, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(233, 185, 73, 0.3)',
          }),
        }}
      >
        {featured && (
          <div
            className="-right-2 -top-2 absolute rounded-lg px-3 py-1 font-bold text-xs"
            style={{ backgroundColor: 'rgba(225, 171, 51, 0.8)', color: '#0c2939' }}
          >
            Destacado
          </div>
        )}

        <div
          className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300"
          style={{
            backgroundColor: featured ? 'rgba(233, 185, 73, 0.15)' : 'rgba(29, 44, 61, 0.08)',
            color: featured ? 'rgba(225, 171, 51, 0.8)' : '#0c2939',
          }}
        >
          <Icon size={24} strokeWidth={2} />
        </div>

        <h3 className="mb-3 font-bold text-xl" style={{ color: '#0c2939' }}>
          {title}
        </h3>
        <p className="flex-grow leading-relaxed" style={{ color: '#333333' }}>
          {description}
        </p>

        <button
          type="button"
          className="mt-6 w-full rounded-full px-4 py-2.5 font-semibold transition-all duration-300"
          style={{
            backgroundColor: 'transparent',
            color: '#0c2939',
            border: featured ? '2px solid rgba(225, 171, 51, 0.8)' : '2px solid rgba(29, 44, 61, 0.2)',
          }}
          onMouseEnter={(e) => {
            if (featured) {
              e.currentTarget.style.backgroundColor = 'rgba(225, 171, 51, 0.9)'
              e.currentTarget.style.borderColor = 'rgba(225, 171, 51, 0.7)'
              e.currentTarget.style.color = '#0c2939'
            } else {
              e.currentTarget.style.backgroundColor = '#0c2939'
              e.currentTarget.style.borderColor = '#0c2939'
              e.currentTarget.style.color = '#ffffff'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = '#0c2939'
            if (featured) {
              e.currentTarget.style.borderColor = 'rgba(225, 171, 51, 0.8)'
            } else {
              e.currentTarget.style.borderColor = 'rgba(29, 44, 61, 0.2)'
            }
          }}
        >
          Más información
        </button>
      </div>
    </div>
  )
}

export default ServiceCard
