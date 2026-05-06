'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Trophy, Shield, CheckCircle, Zap, ChevronDown } from 'lucide-react'
import HeroTyping from '@/components/hero-typing'

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
  { icon: Trophy, label: 'B-BBEE Level 1', emoji: '🏆', colorClass: 'emerald-gradient-text', bgClass: 'glass-card-emerald', accentColor: 'cd-emerald' },
  { icon: Shield, label: '100% Black-Owned', emoji: '🇿🇦', colorClass: 'violet-gradient-text', bgClass: 'glass-card-violet', accentColor: 'cd-violet' },
  { icon: CheckCircle, label: 'CSD Registered', emoji: '✅', colorClass: 'cyan-gradient-text', bgClass: 'glass-card-cyan', accentColor: 'cd-cyan' },
  { icon: Zap, label: '5–7 Day Delivery', emoji: '⚡', colorClass: 'gold-gradient-text', bgClass: 'glass-card-gold', accentColor: 'cd-gold' },
]

const counterItems = [
  { value: 135, suffix: '%', prefix: '', label: 'B-BBEE Procurement Recognition', colorClass: 'emerald-gradient-text', shadowClass: 'heading-shadow-emerald', accentBg: 'bg-cd-emerald/5', borderAccent: 'hover:border-cd-emerald/30' },
  { value: 5, suffix: '–7 Days', prefix: '', label: 'Average Delivery Time', colorClass: 'gold-gradient-text', shadowClass: 'heading-shadow', accentBg: 'bg-cd-gold/5', borderAccent: 'hover:border-cd-gold/30' },
  { value: 100, suffix: '%', prefix: '', label: 'Youth-Owned', colorClass: 'cyan-gradient-text', shadowClass: 'heading-shadow-cyan', accentBg: 'bg-cd-cyan/5', borderAccent: 'hover:border-cd-cyan/30' },
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
  const grainRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    if (grainRef.current) {
      grainRef.current.style.transform = `translateY(${window.scrollY * 0.1}px)`
    }
  }, [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [handleScroll])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero banner image background */}
      <Image
        src="/hero-banner.png"
        alt=""
        fill
        priority
        className="object-cover object-center opacity-30"
        sizes="100vw"
      />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cd-bg/80 via-cd-bg/70 to-cd-bg z-[1]" />

      {/* Aurora background effect */}
      <div className="absolute inset-0 aurora-bg z-[2]" />

      {/* Aurora gradient orbs */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Gold orb - top left */}
        <div
          className="absolute w-[500px] h-[500px] -top-20 -left-40 rounded-full opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)',
            animation: 'float-orb-1 20s ease-in-out infinite',
          }}
        />
        {/* Cyan orb - top right */}
        <div
          className="absolute w-[400px] h-[400px] -top-10 -right-20 rounded-full opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)',
            animation: 'float-orb-2 25s ease-in-out infinite',
          }}
        />
        {/* Violet orb - bottom center */}
        <div
          className="absolute w-[450px] h-[450px] -bottom-20 left-1/3 rounded-full opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, rgba(167,139,250,0.4) 0%, transparent 70%)',
            animation: 'float-orb-3 22s ease-in-out infinite',
          }}
        />
        {/* Emerald orb - mid left */}
        <div
          className="absolute w-[350px] h-[350px] top-1/2 -left-10 rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, rgba(52,211,153,0.4) 0%, transparent 70%)',
            animation: 'float-orb-2 18s ease-in-out infinite',
            animationDelay: '-5s',
          }}
        />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 grid-lines z-[3]" />

      {/* Grain overlay with parallax */}
      <div ref={grainRef} className="absolute inset-0 grain-overlay will-change-transform z-[4]" />

      {/* Neon line at top */}
      <div className="absolute top-0 left-0 right-0 neon-line z-[5]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 sm:space-y-10"
        >
          {/* Pre-heading label */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2"
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-cd-gold/60" />
            <span className="text-cd-gold font-mono text-xs sm:text-sm tracking-[0.2em] uppercase">
              Soshanguve, Pretoria
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-cd-gold/60" />
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold leading-[1.05] tracking-tight relative gold-gradient-text heading-shadow-lg"
            style={{ fontSize: 'var(--text-hero)' }}
          >
            {/* Animated gradient glow behind headline */}
            <span
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ animation: 'gradient-glow 4s ease-in-out infinite' }}
              aria-hidden="true"
            >
              <span className="w-[80%] h-[60%] rounded-full bg-cd-gold blur-[100px] opacity-20" />
            </span>
            <span className="relative">
              We Build Websites{' '}
              <br className="hidden sm:block" />
              That{' '}
              <HeroTyping />
            </span>
          </motion.h1>

          {/* Sub text */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-cd-text-muted text-base sm:text-xl leading-relaxed font-sans"
          >
            Carter Digitals is a 100% Black-owned, B-BBEE Level 1 digital services
            studio from Soshanguve, Pretoria. High-performance websites, bespoke web
            applications, and strategic brand collateral — delivered in 5–7 business days.
          </motion.p>

          {/* CTAs with gradient borders and glow */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            {/* Primary CTA - gold with glow */}
            <a
              href="#contact"
              className="btn-press btn-glow-gold group inline-flex items-center gap-2 px-7 py-3.5 sm:px-10 sm:py-4 bg-cd-gold text-cd-bg font-bold rounded-xl hover:bg-cd-gold-light hover:shadow-[0_0_30px_rgba(201,168,76,0.35)] hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-cd-gold/25 text-base sm:text-lg"
            >
              Get a Free Quote
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            {/* Secondary CTA - gradient border */}
            <a
              href="#portfolio"
              className="btn-press group relative inline-flex items-center gap-2 px-7 py-3.5 sm:px-10 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300"
            >
              {/* Gradient border background */}
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cd-gold/50 via-cd-cyan/40 to-cd-violet/40 p-[1.5px]" aria-hidden="true">
                <span className="flex h-full w-full items-center justify-center rounded-[10px] bg-cd-bg" />
              </span>
              {/* Glow on hover */}
              <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(201,168,76,0.15),0_0_20px_rgba(34,211,238,0.1),0_0_20px_rgba(167,139,250,0.1)]" aria-hidden="true" />
              <span className="relative flex items-center gap-2 bg-gradient-to-r from-cd-gold via-cd-text-muted to-cd-cyan bg-clip-text text-transparent">
                See Our Work
              </span>
            </a>
          </motion.div>

          {/* Badge strip - glassmorphism with colored accents */}
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-xl px-4 py-3 sm:px-6 sm:py-4 flex flex-wrap items-center justify-center gap-3 sm:gap-5 border-t border-t-cd-gold/20"
          >
            {badgeItems.map((badge, i) => (
              <div
                key={i}
                className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium`}
              >
                <span className={`inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full ${badge.bgClass} text-lg`}>{badge.emoji}</span>
                <span className={`${badge.colorClass} font-semibold`}>{badge.label}</span>
                {i < badgeItems.length - 1 && (
                  <span className="hidden sm:inline text-cd-border ml-3 sm:ml-5">|</span>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Counter row with colored accents */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 relative"
        >
          {/* Radial gradient glow behind counter row */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <div className="w-[80%] h-[80%] rounded-full bg-cd-gold blur-[120px] opacity-[0.04]" />
          </div>

          {counterItems.map((item, i) => (
            <div
              key={i}
              className={`glass-card rounded-xl p-5 sm:p-7 text-center group ${item.borderAccent} hover:shadow-[0_0_24px_rgba(201,168,76,0.1)] transition-[border-color,box-shadow] duration-300 relative overflow-hidden`}
            >
              {/* Subtle colored top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: i === 0
                    ? 'linear-gradient(90deg, transparent, #34D399, transparent)'
                    : i === 1
                    ? 'linear-gradient(90deg, transparent, #C9A84C, transparent)'
                    : 'linear-gradient(90deg, transparent, #22D3EE, transparent)',
                }}
              />
              <div className={`font-display text-3xl sm:text-5xl font-bold mb-1 sm:mb-2 ${item.colorClass} ${item.shadowClass}`}>
                <AnimatedCounter
                  target={item.value}
                  suffix={item.suffix}
                  prefix={item.prefix}
                />
              </div>
              <div className="text-cd-text-muted text-sm sm:text-base font-sans">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#why-carter"
        className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-cd-gold animate-bounce"
        aria-label="Scroll to explore"
      >
        <ChevronDown size={24} />
        <span className="text-cd-gold/70 text-xs font-sans">Scroll to explore</span>
      </a>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cd-bg to-transparent z-10 pointer-events-none" />
    </section>
  )
}
