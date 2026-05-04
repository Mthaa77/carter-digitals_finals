'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, CheckCircle, Lock, Smartphone, Zap, Flag } from 'lucide-react'

const badges = [
  {
    icon: Shield,
    emoji: '🛡️',
    label: 'B-BBEE Level 1 — EME',
  },
  {
    icon: CheckCircle,
    emoji: '✅',
    label: 'CSD Registered',
  },
  {
    icon: Lock,
    emoji: '🔒',
    label: 'POPIA Compliant',
  },
  {
    icon: Smartphone,
    emoji: '📱',
    label: 'Mobile-First Design',
  },
  {
    icon: Zap,
    emoji: '⚡',
    label: '5–7 Day Delivery',
  },
  {
    icon: Flag,
    emoji: '🇿🇦',
    label: '100% Youth-Owned',
  },
]

export default function TrustBadges() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="trust-badges" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card rounded-full px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2 cursor-default transition-[border-color,box-shadow] duration-300 hover:border-cd-gold/30"
            >
              <span className="text-base sm:text-lg shrink-0">{badge.emoji}</span>
              <span className="text-cd-text text-xs sm:text-sm font-medium font-sans whitespace-nowrap">
                {badge.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
