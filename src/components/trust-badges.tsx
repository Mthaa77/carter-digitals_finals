'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, CheckCircle, Lock, Smartphone, Zap, Flag } from 'lucide-react'

const badges = [
  {
    icon: Shield,
    emoji: '🛡️',
    label: 'B-BBEE Level 1 — EME',
    accent: 'emerald',
    borderColor: '#34D399',
    hoverShadow: '0 0 20px rgba(52,211,153,0.15), 0 0 40px rgba(52,211,153,0.06)',
    textColor: 'color: #34D399',
  },
  {
    icon: CheckCircle,
    emoji: '✅',
    label: 'CSD Registered',
    accent: 'cyan',
    borderColor: '#22D3EE',
    hoverShadow: '0 0 20px rgba(34,211,238,0.15), 0 0 40px rgba(34,211,238,0.06)',
    textColor: 'color: #22D3EE',
  },
  {
    icon: Lock,
    emoji: '🔒',
    label: 'POPIA Compliant',
    accent: 'violet',
    borderColor: '#A78BFA',
    hoverShadow: '0 0 20px rgba(167,139,250,0.15), 0 0 40px rgba(167,139,250,0.06)',
    textColor: 'color: #A78BFA',
  },
  {
    icon: Smartphone,
    emoji: '📱',
    label: 'Mobile-First Design',
    accent: 'rose',
    borderColor: '#FB7185',
    hoverShadow: '0 0 20px rgba(251,113,133,0.15), 0 0 40px rgba(251,113,133,0.06)',
    textColor: 'color: #FB7185',
  },
  {
    icon: Zap,
    emoji: '⚡',
    label: '5–7 Day Delivery',
    accent: 'gold',
    borderColor: '#C9A84C',
    hoverShadow: '0 0 20px rgba(201,168,76,0.15), 0 0 40px rgba(201,168,76,0.06)',
    textColor: 'color: #C9A84C',
  },
  {
    icon: Flag,
    emoji: '🇿🇦',
    label: '100% Youth-Owned',
    accent: 'amber',
    borderColor: '#FBBF24',
    hoverShadow: '0 0 20px rgba(251,191,36,0.15), 0 0 40px rgba(251,191,36,0.06)',
    textColor: 'color: #FBBF24',
  },
]

export default function TrustBadges() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="trust-badges" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] relative overflow-hidden" ref={ref}>
      {/* Gradient line divider at the top — gold → emerald → cyan */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent 5%, #C9A84C 25%, #34D399 50%, #22D3EE 75%, transparent 95%)',
          opacity: 0.5,
        }}
      />

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
              style={{
                borderLeft: `2px solid ${badge.borderColor}`,
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = badge.hoverShadow
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = ''
              }}
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
