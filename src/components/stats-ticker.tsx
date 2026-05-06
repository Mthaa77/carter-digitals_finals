'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface StatItem {
  value: number
  suffix: string
  prefix: string
  label: string
  isStatic?: boolean
  staticDisplay?: string
  accent: string
  gradientFrom: string
  gradientTo: string
}

const stats: StatItem[] = [
  { value: 135, suffix: '%', prefix: '', label: 'B-BBEE Procurement Recognition', accent: '#34D399', gradientFrom: '#065F46', gradientTo: '#34D399' },
  { value: 5, suffix: '', prefix: '', label: 'Day Delivery', isStatic: true, staticDisplay: '5–7', accent: '#C9A84C', gradientFrom: '#7A6330', gradientTo: '#E8CA7A' },
  { value: 100, suffix: '%', prefix: '', label: 'Black-Owned & Youth-Owned', accent: '#A78BFA', gradientFrom: '#4C1D95', gradientTo: '#C4B5FD' },
  { value: 2023, suffix: '', prefix: '', label: 'Founded', accent: '#22D3EE', gradientFrom: '#0E7490', gradientTo: '#67E8F9' },
]

function AnimatedStat({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [count, setCount] = useState(stat.value)

  useEffect(() => {
    if (!isInView || stat.isStatic) return

    let start = 0
    const duration = 2000
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * stat.value)
      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, stat.value, stat.isStatic])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className={`flex-1 flex flex-col items-center px-6 py-8 hover:scale-105 transition-transform duration-300 cursor-default group ${
        index < stats.length - 1
          ? 'border-r border-cd-gold/10'
          : ''
      }`}
    >
      <span
        className="font-display text-4xl sm:text-5xl font-bold tabular-nums"
        style={{
          background: `linear-gradient(135deg, ${stat.gradientFrom}, ${stat.gradientTo})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: `drop-shadow(0 0 12px ${stat.accent}25)`,
        }}
      >
        {stat.isStatic
          ? stat.staticDisplay
          : `${stat.prefix}${count}${stat.suffix}`
        }
      </span>
      <span className="mt-2 text-sm text-cd-text-muted font-sans text-center group-hover:text-cd-text transition-colors duration-300">
        {stat.label}
      </span>
    </motion.div>
  )
}

export default function StatsTicker() {
  return (
    <section id="stats" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 aurora-bg">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card rounded-xl flex flex-col sm:flex-row card-shadow-gold">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
