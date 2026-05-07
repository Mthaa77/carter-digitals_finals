'use client'

const clients = [
  { name: 'Soshanguve SOS', color: '#34D399' },
  { name: 'Direla Bakgatla', color: '#C9A84C' },
  { name: 'Block L Traders', color: '#22D3EE' },
  { name: 'Tshwane SMEs', color: '#A78BFA' },
  { name: 'Gauteng Businesses', color: '#FB7185' },
]

const trustIndicators = [
  { name: 'B-BBEE Level 1', color: '#34D399' },
  { name: 'Google Cloud', color: '#22D3EE' },
  { name: 'Next.js', color: '#C8C8C0' },
  { name: '100% Black-Owned', color: '#A78BFA' },
]

// Combine clients and trust indicators for a single marquee strip
const allItems: ({ name: string; color: string } | null)[] = [...clients, null, ...trustIndicators]

export default function ClientMarquee() {
  // Duplicate items for seamless infinite scroll
  const marqueeItems = [...allItems, ...allItems, ...allItems, ...allItems]

  return (
    <section className="relative py-10 sm:py-14 overflow-hidden">
      {/* Gradient border at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent 5%, #C9A84C 30%, #34D399 50%, #22D3EE 70%, transparent 95%)',
          opacity: 0.4,
        }}
      />
      {/* Gradient border at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent 5%, #A78BFA 30%, #FB7185 50%, #FBBF24 70%, transparent 95%)',
          opacity: 0.3,
        }}
      />

      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(8,8,8,0.9) 0%, rgba(18,16,12,0.95) 50%, rgba(8,8,8,0.9) 100%)',
        }}
      />

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

      <div className="relative z-10">
        {/* Marquee */}
        <div className="flex overflow-hidden">
          <div
            className="flex items-center gap-8 sm:gap-12 animate-marquee whitespace-nowrap"
          >
            {marqueeItems.map((item, index) => {
              if (!item) {
                return (
                  <span
                    key={`dot-${index}`}
                    className="text-cd-gold/30 text-xl"
                  >
                    •
                  </span>
                )
              }

              const isTrust = trustIndicators.some(t => t.name === item.name)

              return (
                <span
                  key={`${item.name}-${index}`}
                  className={`
                    font-display text-sm sm:text-base tracking-wide transition-all duration-300 cursor-default
                    ${isTrust
                      ? 'font-semibold rounded-full px-4 py-1.5'
                      : 'opacity-60 font-medium'
                    }
                  `}
                  style={isTrust ? {
                    color: `${item.color}99`,
                    border: `1px solid ${item.color}25`,
                    background: `${item.color}08`,
                  } : {
                    color: '#9A9A92',
                  }}
                  onMouseEnter={(e) => {
                    if (isTrust) {
                      e.currentTarget.style.borderColor = `${item.color}50`
                      e.currentTarget.style.boxShadow = `0 0 12px ${item.color}15`
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isTrust) {
                      e.currentTarget.style.borderColor = `${item.color}25`
                      e.currentTarget.style.boxShadow = ''
                    }
                  }}
                >
                  {item.name}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      {/* CSS animation keyframes */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
