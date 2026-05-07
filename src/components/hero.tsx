'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight, Trophy, Shield, CheckCircle, Zap, ChevronDown, Sparkles, Star, Film, Clock } from 'lucide-react'
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
   Mix of larger golden particles + tiny cinematic dust specs
   ───────────────────────────────────────────── */
const GOLD_PARTICLE_COUNT = 25
const DUST_PARTICLE_COUNT = 20

const goldParticles = Array.from({ length: GOLD_PARTICLE_COUNT }, (_, i) => {
  const x = r4(seededRandom(i * 5 + 1) * 100)
  const y = r4(seededRandom(i * 5 + 2) * 100)
  const size = r4(1.5 + seededRandom(i * 5 + 3) * 2.5)
  const opacity = r4(0.1 + seededRandom(i * 5 + 4) * 0.3)
  const duration = r4(14 + seededRandom(i * 5 + 5) * 20)
  const delay = r4(seededRandom(i * 5 + 6) * 10)
  const drift = r4(seededRandom(i * 5 + 7) * 40 - 20)
  return { id: i, x, y, size, opacity, duration, delay, drift }
})

const dustParticles = Array.from({ length: DUST_PARTICLE_COUNT }, (_, i) => {
  const idx = i + GOLD_PARTICLE_COUNT
  const x = r4(seededRandom(idx * 7 + 1) * 100)
  const y = r4(seededRandom(idx * 7 + 2) * 100)
  const size = r4(0.5 + seededRandom(idx * 7 + 3) * 1)
  const opacity = r4(0.04 + seededRandom(idx * 7 + 4) * 0.12)
  const duration = r4(20 + seededRandom(idx * 7 + 5) * 30)
  const delay = r4(seededRandom(idx * 7 + 6) * 15)
  const drift = r4(seededRandom(idx * 7 + 7) * 20 - 10)
  return { id: idx, x, y, size, opacity, duration, delay, drift }
})

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Gold particles — medium, brighter */}
      {goldParticles.map((p) => (
        <motion.div
          key={`gold-${p.id}`}
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
      {/* Cinematic dust specs — tiny, slow, subtle */}
      {dustParticles.map((p) => (
        <motion.div
          key={`dust-${p.id}`}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `rgba(201,168,76,${p.opacity})`,
          }}
          animate={{
            y: [0, -30, -60],
            x: [0, p.drift * 0.2, 0],
            opacity: [0, p.opacity, 0],
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
   GOLD ORBIT RING — slowly rotating around center
   ───────────────────────────────────────────── */
function GoldOrbitRing() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[2] flex items-center justify-center" aria-hidden="true">
      <motion.div
        className="absolute w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] rounded-full"
        style={{
          border: '1px solid rgba(201,168,76,0.04)',
          boxShadow: '0 0 60px rgba(201,168,76,0.02), inset 0 0 60px rgba(201,168,76,0.01)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        {/* Orbiting dot */}
        <motion.div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cd-gold/30"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
      <motion.div
        className="absolute w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] rounded-full"
        style={{
          border: '1px solid rgba(201,168,76,0.025)',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cd-cyan/25"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   FLOATING 3D-LIKE GEOMETRIC SHAPES
   Wireframe triangle, hexagon, diamond that rotate and float
   ───────────────────────────────────────────── */
function FloatingGeometricShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[3]" aria-hidden="true">
      {/* Triangle — top right area */}
      <div
        className="geo-shape"
        style={{
          top: '12%',
          right: '8%',
          width: '120px',
          height: '120px',
          animation: 'geo-float-1 25s ease-in-out infinite, geo-rotate-cw 80s linear infinite',
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,8 92,85 8,85" stroke="rgba(201,168,76,0.5)" strokeWidth="0.8" fill="none" />
        </svg>
      </div>

      {/* Hexagon — bottom left area */}
      <div
        className="geo-shape"
        style={{
          bottom: '18%',
          left: '6%',
          width: '100px',
          height: '100px',
          animation: 'geo-float-2 30s ease-in-out infinite, geo-rotate-ccw 100s linear infinite',
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" stroke="rgba(34,211,238,0.4)" strokeWidth="0.8" fill="none" />
        </svg>
      </div>

      {/* Diamond — mid right area */}
      <div
        className="geo-shape"
        style={{
          top: '55%',
          right: '12%',
          width: '80px',
          height: '80px',
          animation: 'geo-float-3 22s ease-in-out infinite, geo-rotate-cw 70s linear infinite',
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,5 95,50 50,95 5,50" stroke="rgba(167,139,250,0.4)" strokeWidth="0.8" fill="none" />
        </svg>
      </div>

      {/* Small triangle — bottom right */}
      <div
        className="geo-shape"
        style={{
          bottom: '30%',
          right: '22%',
          width: '60px',
          height: '60px',
          opacity: 0.04,
          animation: 'geo-float-1 28s ease-in-out infinite 3s, geo-rotate-ccw 90s linear infinite',
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,10 90,85 10,85" stroke="rgba(201,168,76,0.5)" strokeWidth="1" fill="none" />
        </svg>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MOUSE-FOLLOW SPOTLIGHT EFFECT
   Radial gradient that follows the cursor for a flashlight feel
   ───────────────────────────────────────────── */
function MouseSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        const x = (e.clientX / window.innerWidth) * 100
        const y = (e.clientY / window.innerHeight) * 100
        spotlightRef.current.style.background = `radial-gradient(circle 400px at ${x}% ${y}%, rgba(201,168,76,0.04) 0%, rgba(201,168,76,0.01) 30%, transparent 70%)`
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={spotlightRef}
      className="absolute inset-0 pointer-events-none z-[2] transition-none"
      aria-hidden="true"
    />
  )
}

/* ─────────────────────────────────────────────
   CINEMATIC INTRO OVERLAY
   Black screen → gold line sweep → fade out
   ───────────────────────────────────────────── */
function CinematicIntro() {
  return (
    <div className="hero-intro-overlay" aria-hidden="true">
      {/* Gold line sweep across center */}
      <div className="hero-line-sweep" />
    </div>
  )
}

/* ─────────────────────────────────────────────
   FILM SLATE STATUS BAR
   "CARTER DIGITALS" on left, status on right, gold accent line
   ───────────────────────────────────────────── */
function FilmSlateBar() {
  const [time, setTime] = useState('00:00:00')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const h = String(now.getHours()).padStart(2, '0')
      const m = String(now.getMinutes()).padStart(2, '0')
      const s = String(now.getSeconds()).padStart(2, '0')
      setTime(`${h}:${m}:${s}`)
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 z-[20] film-slate-bar"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      {/* Gold accent line above */}
      <div
        className="h-[1px] w-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.2) 20%, rgba(201,168,76,0.4) 50%, rgba(201,168,76,0.2) 80%, transparent 100%)',
        }}
      />
      <div className="flex items-center justify-between px-4 sm:px-8 py-2 bg-cd-bg/80 backdrop-blur-sm">
        {/* Left: Company name + reel icon */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Film size={10} className="text-cd-gold/40" />
          <span className="text-[8px] sm:text-[9px] text-cd-gold/40 tracking-[0.2em] uppercase font-medium">
            Carter Digitals
          </span>
        </div>
        {/* Center: Progress bar */}
        <div className="hidden sm:flex items-center gap-2 flex-1 max-w-[200px] mx-6">
          <div className="flex-1 h-[1px] bg-cd-border/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-cd-gold/30 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: 4 }}
            />
          </div>
        </div>
        {/* Right: Time + status */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[8px] sm:text-[9px] text-cd-text-dim/30 tracking-wider">
            {time}
          </span>
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-cd-emerald/40" />
            <span className="text-[8px] sm:text-[9px] text-cd-emerald/40 tracking-wider uppercase">
              Live
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   BADGE & COUNTER DATA
   ───────────────────────────────────────────── */
const badgeItems = [
  { icon: Trophy, label: 'B-BBEE Level 1', emoji: '🏆', colorClass: 'text-cd-emerald', bgClass: 'bg-cd-emerald/5' },
  { icon: Shield, label: 'Black-Owned', emoji: '🇿🇦', colorClass: 'text-cd-violet', bgClass: 'bg-cd-violet/5' },
  { icon: CheckCircle, label: 'CSD Registered', emoji: '✅', colorClass: 'text-cd-cyan', bgClass: 'bg-cd-cyan/5' },
  { icon: Zap, label: '5–7 Day Delivery', emoji: '⚡', colorClass: 'text-cd-gold', bgClass: 'bg-cd-gold/5' },
]

/* Only 2 counter items — compact & elegant */
const counterItems = [
  { value: 135, suffix: '%', prefix: '', label: 'B-BBEE Procurement', colorClass: 'text-cd-emerald', shadowClass: 'heading-shadow-emerald' },
  { value: 100, suffix: '%', prefix: '', label: 'Youth-Owned', colorClass: 'text-cd-cyan', shadowClass: 'heading-shadow-cyan' },
]

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS — CINEMATIC SEQUENCE
   ───────────────────────────────────────────── */
const cinematicContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 2.2, // after cinematic intro
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

/* Character-by-character reveal for heading text */
const headingCharReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.5 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
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

  // Split "We Build Websites" into characters for per-char reveal
  const headingLine1 = 'We Build Websites'
  const headingChars1 = headingLine1.split('')

  return (
    <>
      {/* ── CINEMATIC INTRO OVERLAY ── */}
      <CinematicIntro />

      <section
        ref={sectionRef}
        id="home"
        className="relative min-h-screen flex items-start sm:items-center justify-center overflow-x-hidden"
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

        {/* ── MOUSE-FOLLOW SPOTLIGHT ── */}
        <MouseSpotlight />

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

        {/* ── LAYER 9: Gold Orbit Ring ── */}
        <GoldOrbitRing />

        {/* ── FLOATING 3D GEOMETRIC SHAPES ── */}
        <FloatingGeometricShapes />

        {/* ── CINEMATIC LETTERBOX BARS ── */}
        <div className="absolute top-0 left-0 right-0 z-[7] pointer-events-none" aria-hidden="true">
          <div className="h-1.5 bg-gradient-to-b from-black/90 to-transparent" />
          <motion.div
            className="h-[1px] bg-gradient-to-r from-transparent via-cd-gold/40 to-transparent"
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
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
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24 text-center w-full"
          style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
        >
          <motion.div
            variants={cinematicContainer}
            initial="hidden"
            animate="visible"
            className="space-y-5 sm:space-y-8"
          >
            {/* ── Pre-heading Label ── */}
            <motion.div
              variants={preHeadingReveal}
              className="flex items-center justify-center gap-2"
            >
              <motion.span
                className="h-px w-8 sm:w-14 bg-gradient-to-r from-transparent to-cd-gold/70"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 2.5 }}
                style={{ transformOrigin: 'right' }}
              />
              <span className="text-cd-gold font-mono text-[9px] sm:text-[11px] tracking-[0.25em] uppercase flex items-center gap-1.5">
                <Sparkles size={9} className="opacity-60" />
                Soshanguve, Pretoria
                <Sparkles size={9} className="opacity-60" />
              </span>
              <motion.span
                className="h-px w-8 sm:w-14 bg-gradient-to-l from-transparent to-cd-gold/70"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 2.5 }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>

            {/* ── H1: Character-by-Character Reveal with Gold Glow Halo ── */}
            <div className="relative">
              {/* Persistent subtle gold glow pulse behind text */}
              <span
                className="absolute inset-0 flex items-center justify-center pointer-events-none gold-glow-pulse"
                aria-hidden="true"
              >
                <span className="w-[90%] h-[70%] rounded-full bg-cd-gold blur-[120px] sm:blur-[160px] opacity-[0.08]" />
              </span>

              <h1
                className="font-display font-bold leading-[1.05] tracking-tight relative text-cd-gold heading-shadow-lg"
                style={{ fontSize: 'clamp(2.5rem, 6vw + 0.5rem, 6rem)' }}
              >
                {/* Line 1: "We Build Websites" — character-by-character reveal */}
                <span className="relative block">
                  <motion.span
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.04,
                          delayChildren: 0,
                        },
                      },
                    }}
                    className="inline"
                  >
                    {headingChars1.map((char, i) => (
                      <motion.span
                        key={i}
                        variants={headingCharReveal}
                        className="inline-block"
                        style={{ originX: 0.5, originY: 1 }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </motion.span>
                  {/* Animated underline accent below "We Build Websites" */}
                  <motion.span
                    className="block mx-auto mt-2 h-[2px] rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #C9A84C, #E8CA7A, #C9A84C, transparent)',
                      boxShadow: '0 0 12px rgba(201,168,76,0.3), 0 0 24px rgba(201,168,76,0.15)',
                    }}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '65%', opacity: 1 }}
                    transition={{ duration: 2, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>

                {/* Line 2: "That [typing]" */}
                <span className="relative">
                  {' '}That{' '}
                  <HeroTyping />
                </span>

                {/* Shimmer sweep overlay on the heading */}
                <span className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                  <motion.span
                    className="absolute top-0 bottom-0 w-[40%] skew-x-[-15deg]"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(232,202,122,0.08), transparent)',
                    }}
                    animate={{ x: ['-100%', '300%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 8 }}
                  />
                </span>
              </h1>
            </div>

            {/* ── Subtitle: Clip-path Reveal (wipe-in) — Enhanced ── */}
            <motion.p
              variants={subtitleClipReveal}
              className="max-w-2xl mx-auto text-cd-text-muted text-sm sm:text-lg lg:text-xl leading-relaxed font-sans"
            >
              Carter Digitals is a 100% Black-owned,{' '}
              <span className="text-cd-emerald font-semibold">B-BBEE Level 1</span>{' '}
              digital services studio from Soshanguve, Pretoria. High-performance websites, bespoke web
              applications, and strategic brand collateral — delivered in{' '}
              <span className="text-cd-gold font-semibold">5–7 business days</span>.
            </motion.p>

            {/* ── CTAs with Premium Animation ── */}
            <motion.div
              variants={ctaReveal}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5"
            >
              {/* Primary CTA — gold with glow + pulse breathing */}
              <motion.a
                href="#contact"
                className="btn-press btn-glow-gold group inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-10 sm:py-4 bg-cd-gold text-cd-bg font-bold rounded-xl hover:bg-cd-gold-light hover:shadow-[0_0_50px_rgba(201,168,76,0.4)] hover:scale-[1.03] transition-all duration-300 shadow-lg shadow-cd-gold/25 text-sm sm:text-base relative"
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
                  <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </motion.a>

              {/* Secondary CTA — solid text colors, NO bg-clip-text */}
              <motion.a
                href="#portfolio"
                className="btn-press group relative inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-10 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cd-gold/30 via-cd-cyan/20 to-cd-violet/20 p-[1px]" aria-hidden="true">
                  <span className="flex h-full w-full items-center justify-center rounded-[10px] bg-cd-bg" />
                </span>
                <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_25px_rgba(201,168,76,0.12),0_0_25px_rgba(34,211,238,0.08),0_0_25px_rgba(167,139,250,0.08)]" aria-hidden="true" />
                <span className="relative flex items-center gap-2 text-cd-gold group-hover:text-cd-gold-light transition-colors duration-300">
                  See Our Work
                  <Star size={14} className="opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                </span>
              </motion.a>
            </motion.div>

            {/* ── Badge Strip — Compact, single row, subtle dividers ── */}
            <motion.div
              variants={badgeSpringReveal}
              className="glass-card rounded-xl px-3 py-2 sm:px-6 sm:py-3 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-0 border-t border-t-cd-gold/15 max-w-3xl mx-auto backdrop-blur-xl"
            >
              {badgeItems.map((badge, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-medium"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.5 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className={`inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full ${badge.bgClass} text-[10px] sm:text-xs`}>
                    {badge.emoji}
                  </span>
                  <span className={`${badge.colorClass} font-semibold`}>{badge.label}</span>
                  {i < badgeItems.length - 1 && (
                    <span className="text-cd-border/40 mx-2 sm:mx-3 text-[8px]">•</span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Counter Row — Compact 2-item horizontal strip ── */}
          <motion.div
            variants={counterCreditsReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 4, duration: 1.2 }}
            className="mt-8 sm:mt-14 flex items-center justify-center gap-6 sm:gap-10"
          >
            {counterItems.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 sm:gap-3 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 4.2 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={`font-display text-2xl sm:text-4xl font-bold ${item.colorClass} ${item.shadowClass}`}>
                  <AnimatedCounter
                    target={item.value}
                    suffix={item.suffix}
                    prefix={item.prefix}
                  />
                </span>
                <span className="text-cd-text-dim text-[10px] sm:text-xs font-sans leading-tight max-w-[80px] sm:max-w-[100px] text-left">
                  {item.label}
                </span>
                {i < counterItems.length - 1 && (
                  <span className="hidden sm:inline-block w-px h-8 bg-gradient-to-b from-transparent via-cd-border/30 to-transparent" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Scroll Indicator — Film-Inspired Design ── */}
        <motion.div
          className="absolute bottom-14 sm:bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5, duration: 1 }}
        >
          <motion.a
            href="#why-carter"
            className="flex flex-col items-center gap-1.5 text-cd-gold/40 group"
            aria-label="Scroll to explore"
          >
            <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.3em] uppercase group-hover:text-cd-gold/60 transition-colors duration-300">
              Explore
            </span>
            {/* Film reel icon */}
            <div className="relative flex items-center justify-center">
              <motion.div
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-cd-gold/15 group-hover:border-cd-gold/30 transition-colors duration-300 flex items-center justify-center"
              >
                {/* Film sprocket holes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-dashed border-cd-gold/10"
                    style={{ animation: 'film-reel-spin 8s linear infinite' }}
                  />
                </div>
                {/* Center dot that bounces down */}
                <motion.div
                  className="w-1 h-1 rounded-full bg-cd-gold/50"
                  animate={{ y: [0, 5, 0], opacity: [0.8, 0.2, 0.8] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </div>
            {/* Small arrow below */}
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={10} className="text-cd-gold/25" />
            </motion.div>
          </motion.a>
        </motion.div>

        {/* ── FILM SLATE STATUS BAR ── */}
        <FilmSlateBar />

        {/* ── Bottom Fade ── */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-cd-bg via-cd-bg/60 to-transparent z-[9] pointer-events-none" />
      </section>
    </>
  )
}
