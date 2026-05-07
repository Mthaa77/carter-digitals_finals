'use client'

import { motion } from 'framer-motion'

const clients = [
  { name: 'Soshanguve SOS', color: '#34D399' },
  { name: 'Direla Bakgatla', color: '#C9A84C' },
  { name: 'Block L Traders', color: '#22D3EE' },
  { name: 'Tshwane SMEs', color: '#A78BFA' },
  { name: 'Gauteng Businesses', color: '#FB7185' },
  { name: 'Pretoria Startups', color: '#FBBF24' },
  { name: 'SA Digital Hub', color: '#C9A84C' },
  { name: 'Maboneng Precinct', color: '#2DD4BF' },
]

export default function ClientLogos() {
  // Duplicate for seamless infinite scroll
  const marqueeItems = [...clients, ...clients]

  return (
    <section id="clients" className="relative py-20 md:py-28 bg-cd-bg overflow-hidden">
      {/* Subtle gradient mesh background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.03) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(34,211,238,0.03) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-18"
        >
          <span className="section-label">Our Partners</span>
          <h2 className="section-heading heading-shadow" style={{ fontSize: 'var(--text-h2)' }}>
            Trusted by <span className="text-cd-gold">South African</span> Businesses
          </h2>
          {/* Multi-color gradient line */}
          <div
            className="mt-4 mx-auto w-24 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #C9A84C, #34D399, #22D3EE)' }}
          />
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
                key={`${client.name}-${index}`}
                className="rounded-full px-5 sm:px-7 py-2.5 sm:py-3 inline-flex items-center gap-2.5 transition-all duration-300 cursor-default shrink-0 border"
                style={{
                  background: `${client.color}06`,
                  borderColor: `${client.color}18`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${client.color}40`
                  e.currentTarget.style.boxShadow = `0 0 16px ${client.color}12, 0 0 32px ${client.color}06`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${client.color}18`
                  e.currentTarget.style.boxShadow = ''
                }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: client.color, opacity: 0.6 }}
                />
                <span className="font-display text-sm sm:text-base font-medium text-cd-text-muted transition-colors">
                  {client.name}
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
