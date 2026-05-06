'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Trophy, Shield, CheckCircle, Zap, ChevronDown } from 'lucide-react'
import HeroTyping from '@/components/hero-typing'

/* ─────────────────────────────────────────────
   ANIMATED COUNTER COMPONENT
   ───────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = performance.now()
          const duration = 2000

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, hasAnimated])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  )
}

/* ─────────────────────────────────────────────
   FLOATING PARTICLE COMPONENT
   ───────────────────────────────────────────── */
interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

function FloatingParticles({ count = 30 }: { count?: number }) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.8,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.4 + 0.1,
    }))
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(201,168,76,${p.opacity}) 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -80, -160, -240],
            x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
            opacity: [0, p.opacity, p.opacity * 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   BADGE & COUNTER DATA
   ───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS — CINEMATIC SEQUENCE
   ───────────────────────────────────────────── */
const cinematicContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.6,
    },
  },
}

const preHeadingReveal = {
  hidden: { opacity: 0, y: 15, letterSpacing: '0.4em' },
  visible: {
    opacity: 1,
    y: 0,
    letterSpacing: '0.2em',
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const headingScaleReveal = {
  hidden: { opacity: 0, scale: 0.82, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
}

const subtitleClipReveal = {
  hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  visible: {
    opacity: 1,
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 },
  },
}

const ctaReveal = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const badgeSpringReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 14, delay: 0.1 },
  },
}

const counterCreditsReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

/* ─────────────────────────────────────────────
   MAIN HERO COMPONENT
   ───────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const orbLayerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  // Scroll-linked parallax via framer-motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60])

  // Additional manual scroll handler for grain overlay
  const grainRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    if (grainRef.current) {
      grainRef.current.style.transform = `translateY(${window.scrollY * 0.08}px)`
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
      ref={sectionRef}
      id="home"
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* ── LAYER 0: Hero Banner with Ken Burns ── */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: bgY }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        >
          <Image
            src="/hero-banner.png"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-40"
            sizes="100vw"
          />
        </motion.div>
      </motion.div>

      {/* ── LAYER 1: Multi-gradient Dark Overlays ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Primary dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-cd-bg/70 via-cd-bg/60 to-cd-bg/90" />
        {/* Color wash - warm gold from left */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 15% 50%, rgba(201,168,76,0.06) 0%, transparent 55%)' }} />
        {/* Color wash - cool cyan from right */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 85% 30%, rgba(34,211,238,0.03) 0%, transparent 45%)' }} />
        {/* Vignette overlay */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8,8,8,0.7) 100%)' }} />
      </div>

      {/* ── LAYER 2: Aurora Background ── */}
      <div className="absolute inset-0 aurora-bg z-[2]" />

      {/* ── LAYER 3: Aurora Gradient Orbs (parallax mid-ground) ── */}
      <motion.div
        ref={orbLayerRef}
        className="absolute inset-0 z-[2] overflow-hidden pointer-events-none"
        style={{ y: orbY }}
        aria-hidden="true"
      >
        {/* Gold orb - top left */}
        <div
          className="absolute w-[550px] h-[550px] -top-24 -left-48 rounded-full opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.5) 0%, transparent 70%)',
            animation: 'float-orb-1 20s ease-in-out infinite',
          }}
        />
        {/* Cyan orb - top right */}
        <div
          className="absolute w-[450px] h-[450px] -top-16 -right-24 rounded-full opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.5) 0%, transparent 70%)',
            animation: 'float-orb-2 25s ease-in-out infinite',
          }}
        />
        {/* Violet orb - bottom center */}
        <div
          className="absolute w-[500px] h-[500px] -bottom-24 left-1/3 rounded-full opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, rgba(167,139,250,0.5) 0%, transparent 70%)',
            animation: 'float-orb-3 22s ease-in-out infinite',
          }}
        />
        {/* Emerald orb - mid left */}
        <div
          className="absolute w-[400px] h-[400px] top-1/2 -left-12 rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, rgba(52,211,153,0.5) 0%, transparent 70%)',
            animation: 'float-orb-2 18s ease-in-out infinite',
            animationDelay: '-5s',
          }}
        />
        {/* Secondary gold glow - center */}
        <div
          className="absolute w-[300px] h-[300px] top-1/3 left-1/2 -translate-x-1/2 rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.6) 0%, transparent 70%)',
            animation: 'float-orb-1 16s ease-in-out infinite',
            animationDelay: '-3s',
          }}
        />
      </motion.div>

      {/* ── LAYER 4: Floating Particles ── */}
      <div className="absolute inset-0 z-[3]" aria-hidden="true">
        <FloatingParticles count={35} />
      </div>

      {/* ── LAYER 5: Grid Lines ── */}
      <div className="absolute inset-0 grid-lines z-[4]" />

      {/* ── LAYER 6: Grain Overlay with Parallax ── */}
      <div ref={grainRef} className="absolute inset-0 grain-overlay will-change-transform z-[5]" />

      {/* ── CINEMATIC LETTERBOX BARS ── */}
      <div className="absolute top-0 left-0 right-0 z-[6] pointer-events-none" aria-hidden="true">
        <div className="h-1 bg-gradient-to-b from-black/80 to-transparent" />
        <motion.div
          className="h-[2px] bg-gradient-to-r from-transparent via-cd-gold/30 to-transparent"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-[6] pointer-events-none" aria-hidden="true">
        <motion.div
          className="h-[2px] bg-gradient-to-r from-transparent via-cd-gold/20 to-transparent"
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <div className="h-1 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* ── NEON LINE AT TOP (pulsing) ── */}
      <div className="absolute top-0 left-0 right-0 z-[7]">
        <motion.div
          className="neon-line h-[1px]"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ── MAIN CONTENT (parallax foreground) ── */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center w-full"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.div
          variants={cinematicContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6 sm:space-y-10"
        >
          {/* ── Pre-heading Label with Animated Reveal ── */}
          <motion.div
            variants={preHeadingReveal}
            className="flex items-center justify-center gap-2"
          >
            <motion.span
              className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-cd-gold/60"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              style={{ transformOrigin: 'right' }}
            />
            <span className="text-cd-gold font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase">
              Soshanguve, Pretoria
            </span>
            <motion.span
              className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-cd-gold/60"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>

          {/* ── H1: Scale-up + Blur Reveal ── */}
          <motion.h1
            variants={headingScaleReveal}
            className="font-display font-bold leading-[1.05] tracking-tight relative gold-gradient-text heading-shadow-lg"
            style={{ fontSize: 'var(--text-hero)' }}
          >
            {/* Ambient gradient glow behind headline */}
            <span
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ animation: 'gradient-glow 4s ease-in-out infinite' }}
              aria-hidden="true"
            >
              <span className="w-[80%] h-[60%] rounded-full bg-cd-gold blur-[120px] opacity-20" />
            </span>
            <span className="relative">
              We Build Websites{' '}
              <br className="hidden sm:block" />
              That{' '}
              <HeroTyping />
            </span>
          </motion.h1>

          {/* ── Subtitle: Clip-path Reveal (wipe-in) ── */}
          <motion.p
            variants={subtitleClipReveal}
            className="max-w-2xl mx-auto text-cd-text-muted text-base sm:text-xl leading-relaxed font-sans"
          >
            Carter Digitals is a 100% Black-owned, B-BBEE Level 1 digital services
            studio from Soshanguve, Pretoria. High-performance websites, bespoke web
            applications, and strategic brand collateral — delivered in 5–7 business days.
          </motion.p>

          {/* ── CTAs with Pulse Breathing ── */}
          <motion.div
            variants={ctaReveal}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            {/* Primary CTA — gold with glow + pulse breathing */}
            <motion.a
              href="#contact"
              className="btn-press btn-glow-gold group inline-flex items-center gap-2.5 px-8 py-4 sm:px-12 sm:py-5 bg-cd-gold text-cd-bg font-bold rounded-xl hover:bg-cd-gold-light hover:shadow-[0_0_40px_rgba(201,168,76,0.4)] hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-cd-gold/25 text-base sm:text-lg relative"
              animate={{
                boxShadow: [
                  '0 8px 25px rgba(201,168,76,0.2), 0 0 0 0 rgba(201,168,76,0)',
                  '0 8px 25px rgba(201,168,76,0.3), 0 0 20px 4px rgba(201,168,76,0.1)',
                  '0 8px 25px rgba(201,168,76,0.2), 0 0 0 0 rgba(201,168,76,0)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              Get a Free Quote
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>

            {/* Secondary CTA — gradient border */}
            <motion.a
              href="#portfolio"
              className="btn-press group relative inline-flex items-center gap-2.5 px-8 py-4 sm:px-12 sm:py-5 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cd-gold/50 via-cd-cyan/40 to-cd-violet/40 p-[1.5px]" aria-hidden="true">
                <span className="flex h-full w-full items-center justify-center rounded-[10px] bg-cd-bg" />
              </span>
              <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(201,168,76,0.15),0_0_20px_rgba(34,211,238,0.1),0_0_20px_rgba(167,139,250,0.1)]" aria-hidden="true" />
              <span className="relative flex items-center gap-2 bg-gradient-to-r from-cd-gold via-cd-text-muted to-cd-cyan bg-clip-text text-transparent">
                See Our Work
              </span>
            </motion.a>
          </motion.div>

          {/* ── Badge Strip — Spring Slide-in from Below ── */}
          <motion.div
            variants={badgeSpringReveal}
            className="glass-card rounded-xl px-4 py-3 sm:px-6 sm:py-4 flex flex-wrap items-center justify-center gap-3 sm:gap-5 border-t border-t-cd-gold/20 max-w-3xl mx-auto"
          >
            {badgeItems.map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium"
              >
                <span className={`inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full ${badge.bgClass} text-lg`}>
                  {badge.emoji}
                </span>
                <span className={`${badge.colorClass} font-semibold`}>{badge.label}</span>
                {i < badgeItems.length - 1 && (
                  <span className="hidden sm:inline text-cd-border ml-3 sm:ml-5">|</span>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Counter Row — Dramatic Delayed Entrance (end credits) ── */}
        <motion.div
          variants={counterCreditsReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-10 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 relative"
        >
          {/* Radial gradient glow behind counter row */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <div className="w-[80%] h-[80%] rounded-full bg-cd-gold blur-[120px] opacity-[0.04]" />
          </div>

          {counterItems.map((item, i) => (
            <motion.div
              key={i}
              className={`glass-card rounded-xl p-5 sm:p-7 text-center group ${item.borderAccent} hover:shadow-[0_0_24px_rgba(201,168,76,0.1)] transition-[border-color,box-shadow] duration-300 relative overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.5 + i * 0.2 }}
            >
              {/* Subtle colored top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.a
        href="#why-carter"
        className="absolute bottom-8 sm:bottom-14 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-cd-gold"
        aria-label="Scroll to explore"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} />
        </motion.div>
        <span className="text-cd-gold/60 text-[10px] sm:text-xs font-mono tracking-wider uppercase">Scroll</span>
      </motion.a>

      {/* ── Bottom Fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cd-bg via-cd-bg/50 to-transparent z-10 pointer-events-none" />
    </section>
  )
}
