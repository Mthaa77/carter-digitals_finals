'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const phases = [
  {
    number: '01',
    name: 'Discovery',
    description: 'We listen. You tell us what your business needs.',
  },
  {
    number: '02',
    name: 'Design',
    description: 'Wireframes and mockups. You approve before we code.',
  },
  {
    number: '03',
    name: 'Build',
    description: 'Next.js + GCP. Fast, modern, built to last.',
  },
  {
    number: '04',
    name: 'Launch',
    description: 'Testing, optimisation, and go-live.',
  },
  {
    number: '05',
    name: 'Support',
    description: 'Ongoing updates, analytics, and growth.',
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
          <span className="inline-block text-cd-gold text-sm font-medium tracking-widest uppercase mb-4">
            How We Work
          </span>
          <div className="w-12 h-0.5 bg-cd-gold mx-auto mb-6" />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cd-text">
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
                      className="w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center border-2 border-cd-gold/40 bg-cd-bg/80 backdrop-blur-sm group-hover:border-cd-gold group-hover:bg-cd-gold/10 transition-all duration-500 group-hover:shadow-[0_0_12px_rgba(201,168,76,0.2)]"
                    >
                      <span className="font-display text-xl font-bold text-cd-gold">
                        {phase.number}
                      </span>
                    </div>
                    {/* Glow on hover */}
                    <div className="absolute inset-0 rounded-full bg-cd-gold/0 group-hover:bg-cd-gold/10 blur-xl transition-all duration-500" />
                  </div>

                  {/* Phase name */}
                  <h3 className="font-display text-lg font-bold text-cd-text mb-2 group-hover:text-cd-gold transition-colors duration-300">
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
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 border-cd-gold/40 bg-cd-bg/80 backdrop-blur-sm group-hover:border-cd-gold group-hover:bg-cd-gold/10 transition-all duration-500 group-hover:shadow-[0_0_12px_rgba(201,168,76,0.2)]">
                    <span className="font-display text-lg sm:text-xl font-bold text-cd-gold">
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
