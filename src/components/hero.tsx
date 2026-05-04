'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ExternalLink, Trophy, Zap } from 'lucide-react'

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [count, setCount] = useState(target)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 2000
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * target)
      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, target])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  )
}

const badgeItems = [
  { icon: Trophy, label: 'B-BBEE Level 1', emoji: '🏆' },
  { icon: Zap, label: 'Pretoria-Based', emoji: '🇿🇦' },
  { icon: ExternalLink, label: 'Next.js + GCP Stack', emoji: '⚡' },
]

const counterItems = [
  { value: 47, suffix: '+', label: 'Projects Built' },
  { value: 0, prefix: 'R', suffix: '', label: 'Spent on Templates' },
  { value: 2, suffix: '+', label: 'Years of Real Work' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 20% 50%, #1a1408 0%, #080808 60%)' }}
    >
      {/* Grid lines */}
      <div className="absolute inset-0 grid-lines" />

      {/* Grain overlay */}
      <div className="absolute inset-0 grain-overlay" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold text-cd-text leading-[1.05] tracking-tight relative"
            style={{ fontSize: 'var(--text-hero)' }}
          >
            {/* Animated gradient glow behind headline */}
            <span
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ animation: 'gradient-glow 4s ease-in-out infinite' }}
              aria-hidden="true"
            >
              <span className="w-[80%] h-[60%] rounded-full bg-cd-gold blur-[80px] opacity-20" />
            </span>
            <span className="relative">
              We Build Websites{' '}
              <br className="hidden sm:block" />
              That{' '}
              <span className="gold-gradient-text text-glow-gold">Make Money.</span>
            </span>
          </motion.h1>

          {/* Sub text */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-cd-text-muted text-lg sm:text-xl leading-relaxed font-sans"
            style={{ fontSize: 'var(--text-body-lg)' }}
          >
            Carter Digitals is a 100% Black-owned B-BBEE Level 1 agency from
            Soshanguve, Pretoria. Premium websites and business tools for SMEs
            done waiting to be seen.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-cd-gold text-cd-bg font-bold rounded-lg hover:bg-cd-gold-light transition-all duration-300 shadow-lg shadow-cd-gold/20 text-base"
              style={{ animation: 'float 3s ease-in-out infinite' }}
            >
              Get a Free Quote
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-cd-border text-cd-text font-medium rounded-lg hover:border-cd-gold-dim hover:text-cd-gold transition-all duration-300 text-base"
              style={{ animation: 'float 3s ease-in-out infinite 0.5s' }}
            >
              See Our Work
            </a>
          </motion.div>

          {/* Badge strip - glassmorphism */}
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-xl px-6 py-3 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            {badgeItems.map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-cd-text-muted"
              >
                <span className="text-base">{badge.emoji}</span>
                <span>{badge.label}</span>
                {i < badgeItems.length - 1 && (
                  <span className="hidden sm:inline text-cd-border ml-4">|</span>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Counter row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 sm:mt-28 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
        >
          {counterItems.map((item, i) => (
            <div
              key={i}
              className="glass-card rounded-xl p-6 text-center group hover:border-l-cd-gold hover:border-t-2 hover:border-t-cd-gold transition-all duration-300"
            >
              <div className="font-display text-3xl sm:text-4xl font-bold text-cd-gold mb-2">
                <AnimatedCounter
                  target={item.value}
                  suffix={item.suffix}
                  prefix={item.prefix}
                />
              </div>
              <div className="text-cd-text-muted text-sm font-sans">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cd-bg to-transparent z-10 pointer-events-none" />
    </section>
  )
}
