'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight, Trophy, Shield, CheckCircle, Zap, ChevronDown, Sparkles, Star } from 'lucide-react'
import HeroTyping from '@/components/hero-typing'

/* ─────────────────────────────────────────────
   DETERMINISTIC SEEDED RANDOM (no hydration mismatch)
   ───────────────────────────────────────────── */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

function r4(n: number): number {
  return Math.round(n * 10000) / 10000
}

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
          const duration = 2200

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
   DETERMINISTIC FLOATING PARTICLES (hydration-safe)
   ───────────────────────────────────────────── */
const PARTICLE_COUNT = 40

const heroParticles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const x = r4(seededRandom(i * 5 + 1) * 100)
  const y = r4(seededRandom(i * 5 + 2) * 100)
  const size = r4(1 + seededRandom(i * 5 + 3) * 2.5)
  const opacity = r4(0.08 + seededRandom(i * 5 + 4) * 0.35)
  const duration = r4(12 + seededRandom(i * 5 + 5) * 20)
  const delay = r4(seededRandom(i * 5 + 6) * 10)
  const drift = r4(seededRandom(i * 5 + 7) * 40 - 20)
  return { id: i, x, y, size, opacity, duration, delay, drift }
})

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {heroParticles.map((p) => (
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
            y: [0, -60, -120, -180],
            x: [0, p.drift * 0.3, p.drift * 0.7, 0],
            opacity: [0, p.opacity, p.opacity * 0.7, 0],
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
   CINEMATIC LIGHT RAYS
   ───────────────────────────────────────────── */
function CinematicRays() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[3]" aria-hidden="true">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Central light burst */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.03) 0%, rgba(201,168,76,0.01) 30%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Horizontal light streak */}
        <motion.div
          className="absolute w-full h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent 10%, rgba(201,168,76,0.04) 30%, rgba(201,168,76,0.08) 50%, rgba(201,168,76,0.04) 70%, transparent 90%)',
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleX: [0.8, 1, 0.8],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        {/* Vertical light streak */}
        <motion.div
          className="absolute h-full w-[1px]"
          style={{
            background: 'linear-gradient(180deg, transparent 10%, rgba(201,168,76,0.03) 30%, rgba(201,168,76,0.06) 50%, rgba(201,168,76,0.03) 70%, transparent 90%)',
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scaleY: [0.7, 1, 0.7],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }}
        />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SCAN LINE OVERLAY (cinematic film effect)
   ───────────────────────────────────────────── */
function ScanLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[4] opacity-[0.015]"
      aria-hidden="true"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        backgroundSize: '100% 4px',
      }}
    />
  )
}

/* ─────────────────────────────────────────────
   BADGE & COUNTER DATA
   ───────────────────────────────────────────── */
const badgeItems = [
  { icon: Trophy, label: 'B-BBEE Level 1', emoji: '🏆', colorClass: 'emerald-gradient-text', bgClass: 'glass-card-emerald' },
  { icon: Shield, label: '100% Black-Owned', emoji: '🇿🇦', colorClass: 'violet-gradient-text', bgClass: 'glass-card-violet' },
  { icon: CheckCircle, label: 'CSD Registered', emoji: '✅', colorClass: 'cyan-gradient-text', bgClass: 'glass-card-cyan' },
  { icon: Zap, label: '5–7 Day Delivery', emoji: '⚡', colorClass: 'gold-gradient-text', bgClass: 'glass-card-gold' },
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
      staggerChildren: 0.15,
      delayChildren: 0.8,
    },
  },
}

const preHeadingReveal = {
  hidden: { opacity: 0, y: 20, letterSpacing: '0.5em' },
  visible: {
    opacity: 1,
    y: 0,
    letterSpacing: '0.25em',
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const headingScaleReveal = {
  hidden: { opacity: 0, scale: 0.78, filter: 'blur(16px)', y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
  },
}

const subtitleClipReveal = {
  hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)', y: 10 },
  visible: {
    opacity: 1,
    clipPath: 'inset(0 0% 0 0)',
    y: 0,
    transition: { duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 },
  },
}

const ctaReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
}

const badgeSpringReveal = {
  hidden: { opacity: 0, y: 50, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 12, delay: 0.1 },
  },
}

const counterCreditsReveal = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

/* ─────────────────────────────────────────────
   MAIN HERO COMPONENT
   ───────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const orbLayerRef = useRef<HTMLDivElement>(null)

  // Mouse parallax tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 })

  // Scroll-linked parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const contentScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])

  // Mouse move handler for parallax
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { innerWidth, innerHeight } = window
    const x = (e.clientX / innerWidth - 0.5) * 20
    const y = (e.clientY / innerHeight - 0.5) * 20
    mouseX.set(x)
    mouseY.set(y)
  }, [mouseX, mouseY])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  // Grain overlay scroll
  const grainRef = useRef<HTMLDivElement>(null)
  const handleScroll = useCallback(() => {
    if (grainRef.current) {
      grainRef.current.style.transform = `translateY(${window.scrollY * 0.06}px)`
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
      className="relative h-screen min-h-[650px] flex items-center justify-center overflow-hidden"
    >
      {/* ── LAYER 0: Hero Banner with Ken Burns ── */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: bgY }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 25, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        >
          <Image
            src="/hero-banner.png"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-30"
            sizes="100vw"
          />
        </motion.div>
      </motion.div>

      {/* ── LAYER 1: Multi-gradient Dark Overlays ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-cd-bg/80 via-cd-bg/50 to-cd-bg/95" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 40%, rgba(201,168,76,0.05) 0%, transparent 55%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 30%, rgba(34,211,238,0.025) 0%, transparent 45%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 70%, rgba(167,139,250,0.02) 0%, transparent 40%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(8,8,8,0.8) 100%)' }} />
      </div>

      {/* ── LAYER 2: Aurora Background ── */}
      <div className="absolute inset-0 aurora-bg z-[2]" />

      {/* ── LAYER 3: Aurora Gradient Orbs (mouse parallax mid-ground) ── */}
      <motion.div
        ref={orbLayerRef}
        className="absolute inset-0 z-[2] overflow-hidden pointer-events-none"
        style={{ y: orbY, x: springX, translateY: springY }}
        aria-hidden="true"
      >
        {/* Gold orb - top left */}
        <motion.div
          className="absolute w-[600px] h-[600px] -top-24 -left-48 rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.5) 0%, transparent 70%)' }}
          animate={{ x: [0, 30, -20, 0], y: [0, -25, 10, 0], scale: [1, 1.05, 0.97, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Cyan orb - top right */}
        <motion.div
          className="absolute w-[500px] h-[500px] -top-16 -right-24 rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.5) 0%, transparent 70%)' }}
          animate={{ x: [0, -25, 15, 0], y: [0, 20, -15, 0], scale: [1, 0.97, 1.04, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Violet orb - bottom center */}
        <motion.div
          className="absolute w-[550px] h-[550px] -bottom-24 left-1/3 rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.5) 0%, transparent 70%)' }}
          animate={{ x: [0, 20, -15, 0], y: [0, -20, 25, 0], scale: [1, 1.03, 0.96, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Emerald orb - mid left */}
        <motion.div
          className="absolute w-[450px] h-[450px] top-1/2 -left-12 rounded-full opacity-[0.035]"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.5) 0%, transparent 70%)' }}
          animate={{ x: [0, -15, 20, 0], y: [0, 15, -25, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Rose orb - bottom right */}
        <motion.div
          className="absolute w-[400px] h-[400px] -bottom-16 -right-16 rounded-full opacity-[0.025]"
          style={{ background: 'radial-gradient(circle, rgba(251,113,133,0.5) 0%, transparent 70%)' }}
          animate={{ x: [0, 20, -10, 0], y: [0, -15, 20, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ── LAYER 4: Floating Particles (deterministic, no hydration error) ── */}
      <div className="absolute inset-0 z-[3]" aria-hidden="true">
        <FloatingParticles />
      </div>

      {/* ── LAYER 5: Cinematic Light Rays ── */}
      <CinematicRays />

      {/* ── LAYER 6: Scan Lines ── */}
      <ScanLines />

      {/* ── LAYER 7: Grid Lines ── */}
      <div className="absolute inset-0 grid-lines z-[5]" />

      {/* ── LAYER 8: Grain Overlay with Parallax ── */}
      <div ref={grainRef} className="absolute inset-0 grain-overlay will-change-transform z-[6]" />

      {/* ── CINEMATIC LETTERBOX BARS ── */}
      <div className="absolute top-0 left-0 right-0 z-[7] pointer-events-none" aria-hidden="true">
        <div className="h-1.5 bg-gradient-to-b from-black/90 to-transparent" />
        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent via-cd-gold/40 to-transparent"
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-[7] pointer-events-none" aria-hidden="true">
        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent via-cd-gold/25 to-transparent"
          animate={{ opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        />
        <div className="h-1.5 bg-gradient-to-t from-black/90 to-transparent" />
      </div>

      {/* ── NEON LINE AT TOP (pulsing) ── */}
      <div className="absolute top-0 left-0 right-0 z-[8]">
        <motion.div
          className="neon-line h-[1px]"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ── MAIN CONTENT (parallax foreground + mouse parallax) ── */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center w-full"
        style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
      >
        <motion.div
          variants={cinematicContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6 sm:space-y-10"
        >
          {/* ── Pre-heading Label ── */}
          <motion.div
            variants={preHeadingReveal}
            className="flex items-center justify-center gap-2"
          >
            <motion.span
              className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-cd-gold/70"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 1 }}
              style={{ transformOrigin: 'right' }}
            />
            <span className="text-cd-gold font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase flex items-center gap-1.5">
              <Sparkles size={10} className="opacity-60" />
              Soshanguve, Pretoria
              <Sparkles size={10} className="opacity-60" />
            </span>
            <motion.span
              className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-cd-gold/70"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 1 }}
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
              <span className="w-[80%] h-[60%] rounded-full bg-cd-gold blur-[140px] opacity-[0.15]" />
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

          {/* ── CTAs with Premium Animation ── */}
          <motion.div
            variants={ctaReveal}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            {/* Primary CTA — gold with glow + pulse breathing */}
            <motion.a
              href="#contact"
              className="btn-press btn-glow-gold group inline-flex items-center gap-2.5 px-8 py-4 sm:px-12 sm:py-5 bg-cd-gold text-cd-bg font-bold rounded-xl hover:bg-cd-gold-light hover:shadow-[0_0_50px_rgba(201,168,76,0.4)] hover:scale-[1.03] transition-all duration-300 shadow-lg shadow-cd-gold/25 text-base sm:text-lg relative"
              animate={{
                boxShadow: [
                  '0 8px 30px rgba(201,168,76,0.2), 0 0 0 0 rgba(201,168,76,0)',
                  '0 8px 30px rgba(201,168,76,0.3), 0 0 30px 8px rgba(201,168,76,0.08)',
                  '0 8px 30px rgba(201,168,76,0.2), 0 0 0 0 rgba(201,168,76,0)',
                ],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10 flex items-center gap-2.5">
                Get a Free Quote
                <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </motion.a>

            {/* Secondary CTA — gradient border */}
            <motion.a
              href="#portfolio"
              className="btn-press group relative inline-flex items-center gap-2.5 px-8 py-4 sm:px-12 sm:py-5 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cd-gold/50 via-cd-cyan/40 to-cd-violet/40 p-[1.5px]" aria-hidden="true">
                <span className="flex h-full w-full items-center justify-center rounded-[10px] bg-cd-bg" />
              </span>
              <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_25px_rgba(201,168,76,0.12),0_0_25px_rgba(34,211,238,0.08),0_0_25px_rgba(167,139,250,0.08)]" aria-hidden="true" />
              <span className="relative flex items-center gap-2 bg-gradient-to-r from-cd-gold via-cd-text-muted to-cd-cyan bg-clip-text text-transparent">
                See Our Work
              </span>
            </motion.a>
          </motion.div>

          {/* ── Badge Strip — Spring Slide-in ── */}
          <motion.div
            variants={badgeSpringReveal}
            className="glass-card rounded-2xl px-4 py-3 sm:px-8 sm:py-5 flex flex-wrap items-center justify-center gap-3 sm:gap-6 border-t border-t-cd-gold/20 max-w-3xl mx-auto backdrop-blur-xl"
          >
            {badgeItems.map((badge, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${badge.bgClass} text-base sm:text-lg`}>
                  {badge.emoji}
                </span>
                <span className={`${badge.colorClass} font-semibold`}>{badge.label}</span>
                {i < badgeItems.length - 1 && (
                  <span className="hidden sm:inline text-cd-border/50 ml-3 sm:ml-5">|</span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Counter Row — Dramatic Delayed Entrance ── */}
        <motion.div
          variants={counterCreditsReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 2, duration: 1.2 }}
          className="mt-10 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 relative"
        >
          {/* Radial gradient glow behind counter row */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <div className="w-[80%] h-[80%] rounded-full bg-cd-gold blur-[140px] opacity-[0.03]" />
          </div>

          {counterItems.map((item, i) => (
            <motion.div
              key={i}
              className={`glass-card rounded-2xl p-6 sm:p-8 text-center group ${item.borderAccent} hover:shadow-[0_0_30px_rgba(201,168,76,0.08)] transition-[border-color,box-shadow] duration-500 relative overflow-hidden`}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 2.2 + i * 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Subtle colored top accent line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 2.5 + i * 0.25 }}
                style={{
                  transformOrigin: 'left',
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
      <motion.div
        className="absolute bottom-10 sm:bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.a
          href="#why-carter"
          className="flex flex-col items-center gap-1.5 text-cd-gold group"
          aria-label="Scroll to explore"
        >
          <span className="text-cd-gold/50 text-[9px] sm:text-[10px] font-mono tracking-[0.3em] uppercase">Explore</span>
          <motion.div
            className="relative w-6 h-10 rounded-full border border-cd-gold/30 flex items-start justify-center p-1.5"
            animate={{ borderColor: ['rgba(201,168,76,0.2)', 'rgba(201,168,76,0.4)', 'rgba(201,168,76,0.2)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-cd-gold"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.a>
      </motion.div>

      {/* ── Bottom Fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-cd-bg via-cd-bg/60 to-transparent z-[9] pointer-events-none" />
    </section>
  )
}
