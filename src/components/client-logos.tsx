'use client'

import { motion } from 'framer-motion'

interface ClientLogo {
  abbr: string
  name: string
}

const clients: ClientLogo[] = [
  { abbr: 'SOS', name: 'Soshanguve SOS' },
  { abbr: 'DB', name: 'Direla Bakgatla' },
  { abbr: 'BLT', name: 'Block L Traders' },
  { abbr: 'TSM', name: 'Tshwane SMEs' },
  { abbr: 'GB', name: 'Gauteng Business' },
  { abbr: 'CD', name: 'Carter Digitals' },
]

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export default function ClientLogos() {
  return (
    <section id="clients" className="relative py-20 md:py-28 bg-cd-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-18"
        >
          <h2 className="font-display text-cd-text font-bold tracking-tight" style={{ fontSize: 'var(--text-h2)' }}>
            Trusted by South African Businesses
          </h2>
          {/* Gold accent line */}
          <div className="mt-4 mx-auto w-20 h-1 bg-cd-gold rounded-full" />
          <p className="mt-6 text-[#C8C8C0] text-lg font-sans max-w-2xl mx-auto">
            From Soshanguve to Sandton, businesses choose Carter Digitals.
          </p>
        </motion.div>

        {/* Logo grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
          {clients.map((client, i) => (
            <motion.div
              key={client.abbr}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ scale: 1.05 }}
              className="glass-card rounded-xl aspect-square flex flex-col items-center justify-center cursor-default border border-cd-border hover:border-cd-gold/30 transition-colors duration-300"
              title={client.name}
            >
              <span className="font-display text-xl sm:text-2xl font-bold text-cd-gold select-none">
                {client.abbr}
              </span>
              <span className="mt-2 text-[9px] sm:text-[10px] text-[#9A9A92] font-sans text-center px-1 leading-tight truncate w-full">
                {client.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
