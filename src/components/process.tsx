'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const phases = [
  {
    number: '01',
    name: 'Discovery & Alignment',
    description: 'We listen. We align on your goals, audience, and business requirements.',
    accent: '#C9A84C',
    accentBg: 'rgba(201,168,76,0.1)',
  },
  {
    number: '02',
    name: 'Architecture & Wireflow',
    description: 'Structure, user flows, and technical architecture — approved before a line of code.',
    accent: '#34D399',
    accentBg: 'rgba(52,211,153,0.1)',
  },
  {
    number: '03',
    name: 'Design & Build',
    description: 'Next.js + GCP + Vercel. Fast, modern, built to production standard.',
    accent: '#22D3EE',
    accentBg: 'rgba(34,211,238,0.1)',
  },
  {
    number: '04',
    name: 'QA & Compliance',
    description: 'Testing, POPIA compliance, accessibility checks, and performance optimisation.',
    accent: '#A78BFA',
    accentBg: 'rgba(167,139,250,0.1)',
  },
  {
    number: '05',
    name: 'Launch & Enablement',
    description: 'Go-live, training, handover, and ongoing support if you need it.',
    accent: '#FB7185',
    accentBg: 'rgba(251,113,133,0.1)',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="process" className="relative py-20 md:py-28 overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="section-label inline-block gold-gradient-text">
            How We Work
          </span>
          <div className="mx-auto w-16 h-[3px] bg-gradient-to-r from-[#7A6330] via-[#C9A84C] to-[#22D3EE] rounded-full mb-6" />
          <h2 className="font-display heading-shadow" style={{ fontSize: 'var(--text-h2)' }}>
            Our <span className="gold-gradient-text">5-Phase</span> Delivery Process
          </h2>
          <p className="mt-4 text-cd-text-muted text-lg max-w-2xl mx-auto font-sans">
            From first conversation to long-term growth — a proven framework that delivers results.
          </p>
        </motion.div>

        {/* Desktop: Horizontal Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="hidden lg:block"
        >
          <div className="relative">
            {/* Animated connecting line - draws from left to right */}
            <div className="absolute top-[3.25rem] left-[10%] right-[10%] h-[2px] overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-transparent via-cd-gold/70 to-transparent origin-left"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
              />
            </div>

            <div className="grid grid-cols-5 gap-4">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.number}
                  variants={itemVariants}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Numbered circle */}
                  <div className="relative mb-6">
                    <div
                      className="w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center border-2 bg-cd-bg/80 backdrop-blur-sm transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.15)]"
                      style={{
                        borderColor: `${phase.accent}66`,
                        backgroundColor: `${phase.accentBg}`,
                      }}
                    >
                      <span className="font-display text-xl font-bold" style={{ color: phase.accent }}>
                        {phase.number}
                      </span>
                    </div>
                    {/* Glow on hover */}
                    <div className="absolute inset-0 rounded-full blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" style={{ backgroundColor: `${phase.accent}20` }} />
                  </div>

                  {/* Phase name */}
                  <h3 className="font-display text-lg font-bold text-cd-text mb-2 transition-colors duration-300 group-hover:text-cd-gold">
                    {phase.name}
                  </h3>

                  {/* Description */}
                  <p className="text-cd-text-muted text-sm leading-relaxed font-sans max-w-[200px]">
                    {phase.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mobile/Tablet: Vertical Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="lg:hidden space-y-0"
        >
          {phases.map((phase, index) => (
            <motion.div
              key={phase.number}
              variants={itemVariants}
              className="relative flex gap-5 sm:gap-6 group"
            >
              {/* Left: Number + connecting line */}
              <div className="flex flex-col items-center">
                {/* Numbered circle */}
                <div className="relative z-10">
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 bg-cd-bg/80 backdrop-blur-sm transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.15)]"
                    style={{
                      borderColor: `${phase.accent}66`,
                      backgroundColor: `${phase.accentBg}`,
                    }}
                  >
                    <span className="font-display text-lg sm:text-xl font-bold" style={{ color: phase.accent }}>
                      {phase.number}
                    </span>
                  </div>
                </div>

                {/* Animated connecting line - draws from top to bottom */}
                {index < phases.length - 1 && (
                  <div className="w-px flex-1 min-h-[2rem] overflow-hidden">
                    <motion.div
                      className="w-full h-full bg-gradient-to-b from-cd-gold/70 to-cd-gold/20 origin-top"
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 + index * 0.15 }}
                    />
                  </div>
                )}
              </div>

              {/* Right: Content */}
              <div className="pb-8 sm:pb-10 pt-1">
                <h3 className="font-display text-lg sm:text-xl font-bold text-cd-text mb-1 group-hover:text-cd-gold transition-colors duration-300">
                  {phase.name}
                </h3>
                <p className="text-cd-text-muted text-sm sm:text-base leading-relaxed font-sans">
                  {phase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
