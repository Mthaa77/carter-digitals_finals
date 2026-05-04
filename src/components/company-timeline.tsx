'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const milestones = [
  {
    year: '2021',
    title: 'Carter Digitals Founded',
    description:
      'Started in Soshanguve with a laptop and a vision: make premium web design accessible to SA SMEs.',
  },
  {
    year: '2022',
    title: 'First 10 Projects',
    description:
      'Delivered websites for local businesses in Soshanguve, Mabopane, and central Pretoria.',
  },
  {
    year: '2023',
    title: 'B-BBEE Level 1 Certified',
    description:
      'Achieved Level 1 certification, making us a 135% qualifying procurement supplier.',
  },
  {
    year: '2024',
    title: 'Dashboards & Business Tools',
    description:
      'Expanded into business dashboards and internal tools, helping SMEs run smarter.',
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
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function CompanyTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="timeline" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 30%, rgba(201,168,76,0.04) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 sm:mb-20"
          ref={ref}
        >
          <span className="section-label inline-block">Our Journey</span>
          <h2 className="section-heading text-[var(--text-h2)]">
            The Carter <span className="gold-gradient-text">Story</span>
          </h2>
          <p className="mt-4 text-cd-text-muted text-lg max-w-lg mx-auto font-sans">
            From a laptop in Soshanguve to a trusted digital partner for SA businesses.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative"
        >
          {/* Vertical line - left side on desktop, left side on mobile */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cd-gold/40 via-cd-gold/20 to-transparent" />

          <div className="space-y-10 sm:space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                variants={itemVariants}
                className="relative flex gap-5 sm:gap-6 md:gap-8 group"
              >
                {/* Left: Gold dot on timeline */}
                <div className="relative flex flex-col items-center shrink-0">
                  <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-cd-bg border-2 border-cd-gold flex items-center justify-center group-hover:bg-cd-gold/15 transition-colors duration-500">
                    <div className="w-2.5 h-2.5 rounded-full bg-cd-gold" />
                  </div>
                  {/* Connecting line segment to next */}
                  {index < milestones.length - 1 && (
                    <div className="w-px flex-1 min-h-[1rem] bg-cd-gold/15" />
                  )}
                </div>

                {/* Right: Content card */}
                <div className="glass-card rounded-xl p-5 sm:p-6 flex-1 group-hover:border-cd-gold/30 transition-[border-color] duration-500">
                  {/* Year badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-md bg-cd-gold/10 border border-cd-gold/25 mb-3">
                    <span className="font-mono text-sm font-bold text-cd-gold tracking-wider">
                      {milestone.year}
                    </span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-cd-text mb-2 group-hover:text-cd-gold transition-colors duration-300">
                    {milestone.title}
                  </h3>
                  <p className="text-cd-text-muted text-sm sm:text-base leading-relaxed font-sans">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
