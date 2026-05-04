'use client'

const clients = [
  'Soshanguve SOS',
  'Direla Bakgatla',
  'Block L Traders',
  'Tshwane SMEs',
  'Gauteng Businesses',
]

const trustIndicators = [
  'B-BBEE Level 1',
  'Google Cloud',
  'Next.js',
  '100% Black-Owned',
]

// Combine clients and trust indicators for a single marquee strip
const allItems = [...clients, '•', ...trustIndicators]

export default function ClientMarquee() {
  // Duplicate items for seamless infinite scroll
  const marqueeItems = [...allItems, ...allItems, ...allItems, ...allItems]

  return (
    <section className="relative py-10 sm:py-14 overflow-hidden border-y border-cd-border/30">
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
              if (item === '•') {
                return (
                  <span
                    key={`dot-${index}`}
                    className="text-cd-gold/30 text-xl"
                  >
                    •
                  </span>
                )
              }

              const isTrust = trustIndicators.includes(item)

              return (
                <span
                  key={`${item}-${index}`}
                  className={`
                    font-display text-sm sm:text-base tracking-wide transition-opacity duration-300 hover:opacity-100 cursor-default
                    ${isTrust
                      ? 'text-cd-gold/50 font-semibold border border-cd-gold/15 rounded-full px-4 py-1.5'
                      : 'text-[#9A9A92] opacity-60 font-medium'
                    }
                  `}
                >
                  {item}
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
