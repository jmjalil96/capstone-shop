import { cn } from '@/utils/cn'
import type { InsuranceTypeMetadata } from '@/constants/insuranceTypes'

interface InsuranceTypeCardProps {
  insuranceType: InsuranceTypeMetadata
  index: number
  onSelect: (insuranceType: InsuranceTypeMetadata) => void
}

const InsuranceTypeCard = ({ insuranceType, index, onSelect }: InsuranceTypeCardProps) => {
  const { title, shortDescription, icon: Icon, priceFrom, featured } = insuranceType

  const handleCardClick = () => {
    // Haptic feedback for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(50) // 50ms subtle vibration
    }
    onSelect(insuranceType)
  }

  return (
    <button
      type="button"
      onClick={handleCardClick}
      className="group h-full w-full animate-card-reveal"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div
        className={cn(
          'hover:-translate-y-1 relative flex h-full min-h-[200px] flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95',
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
            style={{ backgroundColor: 'rgba(225, 171, 51, 0.9)', color: '#0c2939' }}
          >
            Popular
          </div>
        )}

        <div
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
          style={{
            backgroundColor: featured ? 'rgba(233, 185, 73, 0.15)' : 'rgba(29, 44, 61, 0.08)',
            color: featured ? 'rgba(225, 171, 51, 0.9)' : '#0c2939',
          }}
        >
          <Icon size={32} strokeWidth={2} />
        </div>

        <h3 className="mb-2 font-bold text-xl sm:text-2xl" style={{ color: '#0c2939' }}>
          {title}
        </h3>

        <p className="mb-3 text-sm" style={{ color: '#666666' }}>
          {shortDescription}
        </p>

        <div
          className="rounded-full px-3 py-1 font-semibold text-xs"
          style={{
            backgroundColor: featured ? 'rgba(233, 185, 73, 0.1)' : 'rgba(29, 44, 61, 0.05)',
            color: featured ? 'rgba(225, 171, 51, 0.9)' : '#0c2939',
          }}
        >
          {priceFrom}
        </div>
      </div>
    </button>
  )
}

export default InsuranceTypeCard
