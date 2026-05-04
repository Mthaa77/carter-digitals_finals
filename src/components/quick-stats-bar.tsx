'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface QuickStat {
  value: number
  suffix: string
  prefix: string
  label: string
  description: string
}

const quickStats: QuickStat[] = [
  { value: 100, suffix: '%', prefix: '', label: 'Client Satisfaction', description: 'Every client is our priority' },
  { value: 24, suffix: 'hr', prefix: '', label: 'Response Time', description: 'We reply within 24 hours' },
  { value: 0, suffix: '', prefix: 'R', label: 'Hidden Fees', description: 'Transparent pricing always' },
]

function AnimatedQuickStat({ stat, index }: { stat: QuickStat; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(stat.value)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 1800
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
  }, [isInView, stat.value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex-1 flex flex-col items-center text-center px-4"
    >
      <span className="font-display text-3xl sm:text-4xl font-bold text-cd-gold tabular-nums text-glow-gold">
        {stat.prefix}{count}{stat.suffix}
      </span>
      <span className="mt-1.5 text-sm sm:text-base font-display font-semibold text-cd-text">
        {stat.label}
      </span>
      <span className="mt-0.5 text-xs text-cd-text-dim font-sans">
        {stat.description}
      </span>
    </motion.div>
  )
}

export default function QuickStatsBar() {
  return (
    <section id="quick-stats" className="py-6 px-4 sm:px-6 lg:px-8 bg-cd-bg">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-xl border-t-2 border-t-cd-gold flex flex-col sm:flex-row items-center justify-center divide-y sm:divide-y-0 sm:divide-x divide-cd-border/50 py-6 sm:py-8 px-6">
          {quickStats.map((stat, i) => (
            <AnimatedQuickStat key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
