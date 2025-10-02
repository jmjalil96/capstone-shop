import { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import confetti from 'canvas-confetti'

interface SuccessHeroProps {
  referenceNumber: string
}

function SuccessHero({ referenceNumber }: SuccessHeroProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Fire confetti on mount
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // Teal + Gold colors
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0.1, 0.2) },
        colors: ['#0d9488', '#14b8a6', '#f59e0b', '#fbbf24'],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0.1, 0.2) },
        colors: ['#0d9488', '#14b8a6', '#f59e0b', '#fbbf24'],
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  const handleCopyReference = () => {
    navigator.clipboard.writeText(referenceNumber)
    setCopied(true)
    alert(`Referencia copiada: ${referenceNumber}`)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="text-center">
      {/* Animated Checkmark */}
      <div className="mb-8 flex justify-center">
        <div
          className="animate-bounce-once rounded-full p-6"
          style={{
            backgroundColor: 'rgba(13, 148, 136, 0.1)',
            animation: 'scale-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          }}
        >
          <CheckCircle
            size={80}
            style={{ color: '#0d9488' }}
            strokeWidth={2}
            className="animate-scale-in"
          />
        </div>
      </div>

      {/* Title */}
      <h1 className="mb-4 font-bold text-4xl md:text-5xl" style={{ color: '#1d2c3d' }}>
        ¡Solicitud Enviada con Éxito!
      </h1>

      {/* Reference Badge */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleCopyReference}
          className="group cursor-pointer rounded-full border-2 px-6 py-3 transition-all duration-200 hover:scale-105"
          style={{
            borderColor: '#0d9488',
            backgroundColor: copied ? '#0d9488' : 'transparent',
          }}
        >
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm" style={{ color: copied ? '#ffffff' : '#0d9488' }}>
              Referencia:
            </span>
            <span className="font-bold text-base" style={{ color: copied ? '#ffffff' : '#1d2c3d' }}>
              {referenceNumber}
            </span>
            <span className="text-xs" style={{ color: copied ? '#ffffff' : '#666666' }}>
              {copied ? '✓ Copiado' : '(Click para copiar)'}
            </span>
          </div>
        </button>
      </div>

      <style>{`
        @keyframes scale-bounce {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out 0.3s both;
        }

        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default SuccessHero
