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
    accentBgGradient: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))',
    circleShadow: '0 0 30px rgba(201,168,76,0.15), 0 0 60px rgba(201,168,76,0.06)',
    hoverShadow: '0 0 40px rgba(201,168,76,0.25), 0 0 80px rgba(201,168,76,0.1)',
    lineGradient: 'linear-gradient(90deg, rgba(201,168,76,0.6), rgba(52,211,153,0.6))',
    lineGradientVertical: 'linear-gradient(180deg, rgba(201,168,76,0.6), rgba(52,211,153,0.6))',
  },
  {
    number: '02',
    name: 'Architecture & Wireflow',
    description: 'Structure, user flows, and technical architecture — approved before a line of code.',
    accent: '#34D399',
    accentBg: 'rgba(52,211,153,0.1)',
    accentBgGradient: 'linear-gradient(135deg, rgba(52,211,153,0.2), rgba(52,211,153,0.05))',
    circleShadow: '0 0 30px rgba(52,211,153,0.15), 0 0 60px rgba(52,211,153,0.06)',
    hoverShadow: '0 0 40px rgba(52,211,153,0.25), 0 0 80px rgba(52,211,153,0.1)',
    lineGradient: 'linear-gradient(90deg, rgba(52,211,153,0.6), rgba(34,211,238,0.6))',
    lineGradientVertical: 'linear-gradient(180deg, rgba(52,211,153,0.6), rgba(34,211,238,0.6))',
  },
  {
    number: '03',
    name: 'Design & Build',
    description: 'Next.js + GCP + Vercel. Fast, modern, built to production standard.',
    accent: '#22D3EE',
    accentBg: 'rgba(34,211,238,0.1)',
    accentBgGradient: 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(34,211,238,0.05))',
    circleShadow: '0 0 30px rgba(34,211,238,0.15), 0 0 60px rgba(34,211,238,0.06)',
    hoverShadow: '0 0 40px rgba(34,211,238,0.25), 0 0 80px rgba(34,211,238,0.1)',
    lineGradient: 'linear-gradient(90deg, rgba(34,211,238,0.6), rgba(167,139,250,0.6))',
    lineGradientVertical: 'linear-gradient(180deg, rgba(34,211,238,0.6), rgba(167,139,250,0.6))',
  },
  {
    number: '04',
    name: 'QA & Compliance',
    description: 'Testing, POPIA compliance, accessibility checks, and performance optimisation.',
    accent: '#A78BFA',
    accentBg: 'rgba(167,139,250,0.1)',
    accentBgGradient: 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(167,139,250,0.05))',
    circleShadow: '0 0 30px rgba(167,139,250,0.15), 0 0 60px rgba(167,139,250,0.06)',
    hoverShadow: '0 0 40px rgba(167,139,250,0.25), 0 0 80px rgba(167,139,250,0.1)',
    lineGradient: 'linear-gradient(90deg, rgba(167,139,250,0.6), rgba(251,113,133,0.6))',
    lineGradientVertical: 'linear-gradient(180deg, rgba(167,139,250,0.6), rgba(251,113,133,0.6))',
  },
  {
    number: '05',
    name: 'Launch & Enablement',
    description: 'Go-live, training, handover, and ongoing support if you need it.',
    accent: '#FB7185',
    accentBg: 'rgba(251,113,133,0.1)',
    accentBgGradient: 'linear-gradient(135deg, rgba(251,113,133,0.2), rgba(251,113,133,0.05))',
    circleShadow: '0 0 30px rgba(251,113,133,0.15), 0 0 60px rgba(251,113,133,0.06)',
    hoverShadow: '0 0 40px rgba(251,113,133,0.25), 0 0 80px rgba(251,113,133,0.1)',
    lineGradient: 'linear-gradient(90deg, rgba(251,113,133,0.6), rgba(201,168,76,0.6))',
    lineGradientVertical: 'linear-gradient(180deg, rgba(251,113,133,0.6), rgba(201,168,76,0.6))',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
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

      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.5) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Additional ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(167,139,250,0.03) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
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
          {/* Multi-color gradient line */}
          <div
            className="mx-auto w-20 h-[3px] rounded-full mb-6"
            style={{
              background: 'linear-gradient(90deg, #C9A84C, #34D399, #22D3EE, #A78BFA, #FB7185)',
            }}
          />
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
            {/* Gradient connecting line */}
            <div className="absolute top-[3.25rem] left-[10%] right-[10%] h-[2px] overflow-hidden">
              <motion.div
                className="h-full origin-left"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
                style={{
                  background: 'linear-gradient(90deg, #C9A84C, #34D399, #22D3EE, #A78BFA, #FB7185)',
                  opacity: 0.5,
                }}
              />
              {/* Animated shimmer on connecting line */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={isInView ? { x: '200%' } : { x: '-100%' }}
                transition={{ duration: 4, ease: 'easeInOut', delay: 2, repeat: Infinity, repeatDelay: 6 }}
                className="absolute inset-0 w-1/4"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
                }}
              />
            </div>

            <div className="grid grid-cols-5 gap-4">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.number}
                  variants={itemVariants}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Numbered circle with gradient background */}
                  <div className="relative mb-6">
                    <div
                      className="w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center border-2 bg-cd-bg/80 backdrop-blur-sm transition-all duration-500"
                      style={{
                        borderColor: `${phase.accent}66`,
                        background: phase.accentBgGradient,
                        boxShadow: phase.circleShadow,
                        transition: 'border-color 0.5s, box-shadow 0.5s, transform 0.5s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = phase.hoverShadow
                        e.currentTarget.style.transform = 'scale(1.08)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = phase.circleShadow
                        e.currentTarget.style.transform = 'scale(1)'
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
                {/* Numbered circle with gradient */}
                <div className="relative z-10">
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 bg-cd-bg/80 backdrop-blur-sm transition-all duration-500"
                    style={{
                      borderColor: `${phase.accent}66`,
                      background: phase.accentBgGradient,
                      boxShadow: phase.circleShadow,
                    }}
                  >
                    <span className="font-display text-lg sm:text-xl font-bold" style={{ color: phase.accent }}>
                      {phase.number}
                    </span>
                  </div>
                </div>

                {/* Gradient connecting line */}
                {index < phases.length - 1 && (
                  <div className="w-px flex-1 min-h-[2rem] overflow-hidden">
                    <motion.div
                      className="w-full h-full origin-top"
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 + index * 0.15 }}
                      style={{
                        background: phase.lineGradientVertical,
                        opacity: 0.5,
                      }}
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
