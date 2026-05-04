'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield } from 'lucide-react'

interface StatItem {
  targetValue: number
  prefix: string
  suffix: string
  label: string
  subtitle: string
  badge?: string
  isDecimal?: boolean
}

const stats: StatItem[] = [
  {
    targetValue: 47,
    prefix: '',
    suffix: '+',
    label: 'Projects Delivered',
    subtitle: 'From Soshanguve to the world',
  },
  {
    targetValue: 2.3,
    prefix: 'R',
    suffix: 'M+',
    label: 'Client Revenue Generated',
    subtitle: 'Real economic impact for SA businesses',
    isDecimal: true,
  },
  {
    targetValue: 100,
    prefix: '',
    suffix: '%',
    label: 'Black-Owned',
    subtitle: 'B-BBEE Level 1',
    badge: 'Level 1',
  },
  {
    targetValue: 4.9,
    prefix: '',
    suffix: '/5',
    label: 'Client Satisfaction',
    subtitle: 'Based on client feedback',
    isDecimal: true,
  },
]

function AnimatedStatCounter({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 2200
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * stat.targetValue

      if (stat.isDecimal) {
        setCount(parseFloat(current.toFixed(1)))
      } else {
        setCount(Math.round(current))
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, stat.targetValue, stat.isDecimal])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="flex flex-col items-center text-center p-6 sm:p-8"
    >
      {/* Large Gold Number */}
      <div className="relative">
        <span className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-cd-gold text-glow-gold tabular-nums">
          {stat.prefix}
          {stat.isDecimal ? count.toFixed(1) : count}
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <h3 className="mt-3 font-display text-lg sm:text-xl font-semibold text-cd-text">
        {stat.label}
      </h3>

      {/* Subtitle */}
      <p className="mt-1 text-cd-text-muted text-sm font-sans max-w-[200px]">
        {stat.subtitle}
      </p>

      {/* Optional Badge */}
      {stat.badge && (
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cd-gold/10 border border-cd-gold/25 text-cd-gold text-xs font-medium font-sans">
          <Shield className="w-3 h-3" />
          {stat.badge}
        </div>
      )}
    </motion.div>
  )
}

export default function AnimatedStats() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="achievements" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden" ref={ref}>
      {/* Background radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, rgba(201,168,76,0.02) 40%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="section-label inline-block">Our Achievements</span>
          <h2 className="section-heading text-[var(--text-h2)]">
            Numbers That <span className="gold-gradient-text">Speak</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="glass-card rounded-2xl"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`${
                  i < stats.length - 1 ? 'border-r border-b lg:border-b-0 border-cd-gold/15' : 'border-b lg:border-b-0'
                } ${
                  i >= 2 ? 'border-t lg:border-t-0' : ''
                } ${
                  i % 2 === 1 ? 'border-l lg:border-l-0' : ''
                }`}
              >
                <AnimatedStatCounter stat={stat} index={i} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
