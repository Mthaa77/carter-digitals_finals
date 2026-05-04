'use client'

import { motion } from 'framer-motion'

const clients = [
  'Soshanguve SOS',
  'Direla Bakgatla',
  'Block L Traders',
  'Tshwane SMEs',
  'Gauteng Businesses',
  'Pretoria Startups',
  'SA Digital Hub',
  'Maboneng Precinct',
]

export default function ClientLogos() {
  // Duplicate for seamless infinite scroll
  const marqueeItems = [...clients, ...clients]

  return (
    <section id="clients" className="relative py-20 md:py-28 bg-cd-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-18"
        >
          <span className="section-label">Our Partners</span>
          <h2 className="section-heading" style={{ fontSize: 'var(--text-h2)' }}>
            Trusted by South African Businesses
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 bg-cd-gold rounded-full" />
          <p className="mt-6 text-cd-text-muted text-lg font-sans max-w-2xl mx-auto">
            From Soshanguve to Sandton, businesses choose Carter Digitals.
          </p>
        </motion.div>
      </div>

      {/* Infinite Marquee Carousel */}
      <div className="relative w-full">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-cd-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-cd-bg to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <div className="flex items-center gap-4 sm:gap-6 animate-client-marquee whitespace-nowrap">
            {marqueeItems.map((client, index) => (
              <div
                key={`${client}-${index}`}
                className="glass-card rounded-full px-5 sm:px-7 py-2.5 sm:py-3 inline-flex items-center gap-2 hover:border-cd-gold/30 hover:bg-cd-gold/5 transition-all duration-300 cursor-default shrink-0"
              >
                <span className="w-2 h-2 rounded-full bg-cd-gold shrink-0" />
                <span className="font-display text-sm sm:text-base font-medium text-cd-text-muted group-hover:text-cd-gold transition-colors">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS animation keyframes */}
      <style jsx>{`
        @keyframes client-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-client-marquee {
          animation: client-marquee 30s linear infinite;
        }

        .animate-client-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
