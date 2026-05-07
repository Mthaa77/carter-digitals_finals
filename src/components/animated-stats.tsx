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
  isStatic?: boolean
  staticDisplay?: string
  accentColor: string
  accentGlow: string
  accentShadow: string
}

const stats: StatItem[] = [
  {
    targetValue: 135,
    prefix: '',
    suffix: '%',
    label: 'B-BBEE Procurement',
    subtitle: '135% recognition on your scorecard',
    badge: 'Level 1',
    accentColor: 'text-cd-emerald',
    accentGlow: 'text-shadow: 0 0 30px rgba(52,211,153,0.25), 0 0 60px rgba(52,211,153,0.1)',
    accentShadow: '0 8px 32px rgba(52,211,153,0.08), 0 0 40px rgba(52,211,153,0.04)',
  },
  {
    targetValue: 5,
    prefix: '',
    suffix: '',
    label: 'Delivery Time',
    subtitle: 'Production-ready in under a week',
    isStatic: true,
    staticDisplay: '5–7 Days',
    accentColor: 'text-cd-gold',
    accentGlow: 'text-shadow: 0 0 30px rgba(201,168,76,0.25), 0 0 60px rgba(201,168,76,0.1)',
    accentShadow: '0 8px 32px rgba(201,168,76,0.08), 0 0 40px rgba(201,168,76,0.04)',
  },
  {
    targetValue: 100,
    prefix: '',
    suffix: '%',
    label: 'Black-Owned',
    subtitle: 'Also 100% Youth-Owned',
    accentColor: 'text-cd-violet',
    accentGlow: 'text-shadow: 0 0 30px rgba(167,139,250,0.25), 0 0 60px rgba(167,139,250,0.1)',
    accentShadow: '0 8px 32px rgba(167,139,250,0.08), 0 0 40px rgba(167,139,250,0.04)',
  },
  {
    targetValue: 100,
    prefix: '',
    suffix: '%',
    label: 'CSD Registered',
    subtitle: 'Ready for government procurement',
    accentColor: 'text-cd-cyan',
    accentGlow: 'text-shadow: 0 0 30px rgba(34,211,238,0.25), 0 0 60px rgba(34,211,238,0.1)',
    accentShadow: '0 8px 32px rgba(34,211,238,0.08), 0 0 40px rgba(34,211,238,0.04)',
  },
]

function AnimatedStatCounter({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView || stat.isStatic) return

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
  }, [isInView, stat.targetValue, stat.isDecimal, stat.isStatic])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="flex flex-col items-center text-center p-6 sm:p-8 relative"
      style={{ boxShadow: stat.accentShadow }}
    >
      {/* Large Number with color-coded accent */}
      <div className="relative">
        <span
          className={`font-display text-5xl sm:text-6xl md:text-7xl font-bold tabular-nums ${stat.accentColor}`}
          style={{ textShadow: stat.accentGlow.replace(/text-shadow:\s*/, '') }}
        >
          {stat.isStatic
            ? stat.staticDisplay
            : `${stat.prefix}${stat.isDecimal ? count.toFixed(1) : count}${stat.suffix}`
          }
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
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cd-emerald/10 border border-cd-emerald/25 text-cd-emerald text-xs font-medium font-sans">
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
      {/* Subtle mesh gradient background with emerald, violet, cyan */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 15% 30%, rgba(52,211,153,0.04) 0%, transparent 50%), radial-gradient(ellipse at 85% 20%, rgba(34,211,238,0.04) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(167,139,250,0.04) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, rgba(201,168,76,0.02) 40%, transparent 70%)',
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

        {/* Stats Grid with gradient border + shimmer sweep */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative glass-card rounded-2xl shimmer-sweep overflow-hidden"
        >
          {/* Gradient border at the top — gold → cyan → violet */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px] z-10"
            style={{
              background: 'linear-gradient(90deg, #C9A84C, #22D3EE, #A78BFA)',
            }}
          />

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
