'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const techItems = [
  { name: 'Next.js', percentage: 95, color: '#C9A84C' },
  { name: 'React', percentage: 95, color: '#E8CA7A' },
  { name: 'TypeScript', percentage: 90, color: '#7A6330' },
  { name: 'Google Cloud', percentage: 85, color: '#C9A84C' },
  { name: 'Tailwind CSS', percentage: 95, color: '#E8CA7A' },
  { name: 'Prisma', percentage: 80, color: '#7A6330' },
  { name: 'Figma', percentage: 90, color: '#C9A84C' },
  { name: 'Vercel', percentage: 85, color: '#E8CA7A' },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="tech-stack" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="section-label inline-block">Our Stack</span>
          <h2 className="section-heading text-[var(--text-h2)]">
            Technology We <span className="gold-gradient-text">Trust</span>
          </h2>
          <p className="mt-4 text-cd-text-muted text-lg max-w-xl mx-auto font-sans">
            Built with modern, battle-tested tools that deliver speed, reliability, and scale.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {techItems.map((tech) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              className="glass-card rounded-xl p-5 group hover:border-cd-gold/30 transition-[border-color,box-shadow] duration-300 hover:shadow-[0_0_16px_rgba(201,168,76,0.08)]"
            >
              <div className="flex items-center gap-4 mb-4">
                {/* Icon placeholder - colored circle */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${tech.color}15`, border: `1px solid ${tech.color}30` }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: tech.color, boxShadow: `0 0 8px ${tech.color}40` }}
                  />
                </div>

                {/* Name and percentage */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-base font-semibold text-cd-text group-hover:text-cd-gold transition-colors duration-300">
                      {tech.name}
                    </h3>
                    <span className="font-mono text-sm text-cd-gold font-semibold ml-3 shrink-0">
                      {tech.percentage}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-cd-elevated rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${tech.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, #7A6330, #C9A84C, #E8CA7A)`,
                    boxShadow: '0 0 12px rgba(201, 168, 76, 0.3)',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
