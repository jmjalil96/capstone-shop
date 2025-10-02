function ProcessTimeline() {
  const steps = [
    {
      emoji: '📝',
      title: 'Ahora',
      subtitle: 'Solicitud recibida',
      description: 'Hemos recibido tu solicitud y la estamos procesando.',
    },
    {
      emoji: '📞',
      title: 'Pronto',
      subtitle: 'Agente te contacta',
      description: 'Un agente experto se comunicará contigo pronto.',
    },
    {
      emoji: '📄',
      title: 'Después',
      subtitle: 'Recibe tu póliza',
      description: 'Recibirás tu póliza personalizada y podrás activar tu cobertura.',
    },
  ]

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">
      <h2 className="mb-8 text-center font-bold text-2xl" style={{ color: '#1d2c3d' }}>
        ¿Qué Sigue Ahora?
      </h2>

      <div className="relative">
        {/* Connection Line */}
        <div
          className="absolute top-16 left-0 right-0 h-1 hidden md:block"
          style={{
            background:
              'linear-gradient(to right, #0d9488 0%, #0d9488 33%, #cbd5e1 33%, #cbd5e1 100%)',
            marginLeft: '10%',
            marginRight: '10%',
          }}
        />

        {/* Steps */}
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative flex">
              {/* Step Card */}
              <div
                className="rounded-xl border p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white relative z-10 flex flex-col w-full"
                style={{
                  borderWidth: '2px',
                  borderColor: index === 0 ? '#0d9488' : '#e5e7eb',
                }}
              >
                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full text-3xl"
                    style={{
                      backgroundColor: index === 0 ? 'rgba(13, 148, 136, 0.1)' : '#f3f4f6',
                      border: index === 0 ? '2px solid #0d9488' : 'none',
                    }}
                  >
                    {step.emoji}
                  </div>
                </div>

                {/* Title */}
                <div className="mb-2">
                  <p
                    className="font-bold text-sm uppercase tracking-wide"
                    style={{ color: index === 0 ? '#0d9488' : '#999999' }}
                  >
                    {step.title}
                  </p>
                  <h3 className="font-bold text-lg" style={{ color: '#1d2c3d' }}>
                    {step.subtitle}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed flex-grow" style={{ color: '#666666' }}>
                  {step.description}
                </p>

                {/* Active Indicator - Always rendered for equal height */}
                <div className="mt-4 h-7 flex items-center justify-center">
                  {index === 0 && (
                    <span
                      className="inline-block rounded-full px-3 py-1 font-medium text-xs"
                      style={{ backgroundColor: '#0d9488', color: '#ffffff' }}
                    >
                      En Proceso
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProcessTimeline
