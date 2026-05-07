'use client'

import { useEffect, useRef, useState, Suspense, useMemo, useSyncExternalStore } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Icosahedron, Octahedron, Torus, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Trophy, Shield, CheckCircle, Zap, Sparkles, Star } from 'lucide-react'
import HeroTyping from '@/components/hero-typing'

/* ─────────────────────────────────────────────
   DETERMINISTIC SEEDED RANDOM (no hydration mismatch)
   ───────────────────────────────────────────── */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
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
   3D SCENE COMPONENTS
   ───────────────────────────────────────────── */

// Mouse-reactive scene group — subtle parallax by shifting the scene
function SceneParallax({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      // Smoothly lerp group position toward mouse offset (inverse for parallax feel)
      groupRef.current.position.x += (mouse.current.x * -0.3 - groupRef.current.position.x) * 0.02
      groupRef.current.position.y += (mouse.current.y * 0.2 - groupRef.current.position.y) * 0.02
    }
  })

  return <group ref={groupRef}>{children}</group>
}

// Gold wireframe icosahedron — main centerpiece, slowly rotating
function WireframeIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.05
      meshRef.current.rotation.y += delta * 0.08
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Icosahedron ref={meshRef} args={[1.8, 1]}>
        <meshBasicMaterial
          color="#C9A84C"
          wireframe
          transparent
          opacity={0.12}
        />
      </Icosahedron>
    </Float>
  )
}

// Cyan wireframe octahedron — off to the right
function WireframeOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x -= delta * 0.06
      meshRef.current.rotation.z += delta * 0.04
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <Octahedron ref={meshRef} args={[1.2, 0]} position={[3.5, 0.5, -1]}>
        <meshBasicMaterial
          color="#22D3EE"
          wireframe
          transparent
          opacity={0.08}
        />
      </Octahedron>
    </Float>
  )
}

// Violet wireframe smaller icosahedron — off to the left
function WireframeSmallIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.07
      meshRef.current.rotation.z += delta * 0.05
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.4}>
      <Icosahedron ref={meshRef} args={[0.9, 0]} position={[-3.2, -0.8, -0.5]}>
        <meshBasicMaterial
          color="#A78BFA"
          wireframe
          transparent
          opacity={0.1}
        />
      </Icosahedron>
    </Float>
  )
}

// Gold torus ring — slowly rotating around the center
function GoldTorusRing() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.03
      meshRef.current.rotation.z += delta * 0.02
    }
  })

  return (
    <Torus ref={meshRef} args={[3, 0.015, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
      <meshBasicMaterial
        color="#C9A84C"
        transparent
        opacity={0.2}
      />
    </Torus>
  )
}

// Secondary torus — larger, more subtle, different angle
function SecondaryTorusRing() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.015
      meshRef.current.rotation.x -= delta * 0.01
    }
  })

  return (
    <Torus ref={meshRef} args={[4.2, 0.008, 16, 120]} rotation={[Math.PI / 2.5, Math.PI / 6, 0]}>
      <meshBasicMaterial
        color="#22D3EE"
        transparent
        opacity={0.08}
      />
    </Torus>
  )
}

// 3D Particle field — glowing points scattered in 3D space
function ParticleField() {
  // Use deterministic seeded random for consistent SSR
  const particleCount = 150
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const seed = i * 3
      pos[i * 3] = (seededRandom(seed + 1) - 0.5) * 16     // x: -8 to 8
      pos[i * 3 + 1] = (seededRandom(seed + 2) - 0.5) * 10  // y: -5 to 5
      pos[i * 3 + 2] = (seededRandom(seed + 3) - 0.5) * 8   // z: -4 to 4
    }
    return pos
  }, [])

  return (
    <Points positions={positions} stride={3}>
      <PointMaterial
        color="#C9A84C"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </Points>
  )
}

// Cyan accent particles — fewer, subtle
function CyanParticleField() {
  const particleCount = 40
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const seed = i * 3 + 500
      pos[i * 3] = (seededRandom(seed + 1) - 0.5) * 14
      pos[i * 3 + 1] = (seededRandom(seed + 2) - 0.5) * 8
      pos[i * 3 + 2] = (seededRandom(seed + 3) - 0.5) * 6
    }
    return pos
  }, [])

  return (
    <Points positions={positions} stride={3}>
      <PointMaterial
        color="#22D3EE"
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </Points>
  )
}

// Complete 3D hero scene
function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} color="#C9A84C" intensity={0.3} />
      <pointLight position={[-5, -3, 3]} color="#22D3EE" intensity={0.1} />

      <SceneParallax>
        {/* Main wireframe shapes */}
        <WireframeIcosahedron />
        <WireframeOctahedron />
        <WireframeSmallIcosahedron />

        {/* Orbiting rings */}
        <GoldTorusRing />
        <SecondaryTorusRing />

        {/* Particle fields */}
        <ParticleField />
        <CyanParticleField />
      </SceneParallax>
    </>
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

const counterItems = [
  { value: 135, suffix: '%', prefix: '', label: 'B-BBEE Procurement', colorClass: 'text-cd-emerald', shadowClass: 'heading-shadow-emerald' },
  { value: 100, suffix: '%', prefix: '', label: 'Youth-Owned', colorClass: 'text-cd-cyan', shadowClass: 'heading-shadow-cyan' },
]

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS — Immediate, elegant entrance
   ───────────────────────────────────────────── */
const contentContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const preHeadingReveal = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const headingCharReveal = {
  hidden: { opacity: 0, y: 30, scale: 0.5 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

const subtitleReveal = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 },
  },
}

const ctaReveal = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

const badgeSpringReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 12, delay: 0.1 },
  },
}

const counterReveal = {
  hidden: { opacity: 0, y: 40 },
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

  // Only render 3D Canvas on client side (R3F requires browser APIs)
  const isClient = useSyncExternalStore(
    () => () => {},  // subscribe - no-op
    () => true,      // getSnapshot (client)
    () => false      // getServerSnapshot
  )

  // Scroll-linked parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const canvasOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3])
  const canvasScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.08])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const contentScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])

  // Split "We Build Websites" into characters for per-char reveal
  const headingLine1 = 'We Build Websites'
  const headingChars1 = headingLine1.split('')

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-x-hidden"
    >
      {/* ── LAYER 0: 3D Canvas Background ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ opacity: canvasOpacity, scale: canvasScale }}
      >
        {isClient && (
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 0, 6], fov: 55 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
              style={{ background: 'transparent' }}
            >
              <HeroScene />
            </Canvas>
          </Suspense>
        )}
      </motion.div>

      {/* ── LAYER 1: Dark gradient overlay for readability ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-cd-bg/70 via-cd-bg/40 to-cd-bg/90" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(8,8,8,0.7) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 40%, rgba(201,168,76,0.04) 0%, transparent 55%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 30%, rgba(34,211,238,0.02) 0%, transparent 45%)' }} />
      </div>

      {/* ── LAYER 2: Grid Lines ── */}
      <div className="absolute inset-0 grid-lines z-[2] pointer-events-none" />

      {/* ── LAYER 3: Subtle grain overlay ── */}
      <div className="absolute inset-0 grain-overlay z-[3] pointer-events-none" />

      {/* ── NEON LINE AT TOP ── */}
      <div className="absolute top-0 left-0 right-0 z-[8]">
        <motion.div
          className="neon-line h-[1px]"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ── MAIN CONTENT ── */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24 text-center w-full"
        style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
      >
        <motion.div
          variants={contentContainer}
          initial="hidden"
          animate="visible"
          className="space-y-5 sm:space-y-8"
        >
          {/* ── Pre-heading Label ── */}
          <motion.div
            variants={preHeadingReveal}
            className="flex items-center justify-center gap-2"
          >
            <span className="h-px w-8 sm:w-14 bg-gradient-to-r from-transparent to-cd-gold/70" />
            <span className="text-cd-gold font-mono text-[9px] sm:text-[11px] tracking-[0.25em] uppercase flex items-center gap-1.5">
              <Sparkles size={9} className="opacity-60" />
              Soshanguve, Pretoria
              <Sparkles size={9} className="opacity-60" />
            </span>
            <span className="h-px w-8 sm:w-14 bg-gradient-to-l from-transparent to-cd-gold/70" />
          </motion.div>

          {/* ── H1: Character-by-Character Reveal ── */}
          <div className="relative">
            {/* Subtle gold glow behind text */}
            <span
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              aria-hidden="true"
            >
              <span className="w-[90%] h-[70%] rounded-full bg-cd-gold opacity-[0.06]" style={{ filter: 'blur(120px)' }} />
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
                        staggerChildren: 0.035,
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
                {/* Gold underline accent */}
                <motion.span
                  className="block mx-auto mt-2 h-[2px] rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #C9A84C, #E8CA7A, #C9A84C, transparent)',
                    boxShadow: '0 0 12px rgba(201,168,76,0.3), 0 0 24px rgba(201,168,76,0.15)',
                  }}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '65%', opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
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

          {/* ── Subtitle ── */}
          <motion.p
            variants={subtitleReveal}
            className="max-w-2xl mx-auto text-cd-text-muted text-sm sm:text-lg lg:text-xl leading-relaxed font-sans"
          >
            Carter Digitals is a 100% Black-owned,{' '}
            <span className="text-cd-emerald font-semibold">B-BBEE Level 1</span>{' '}
            digital services studio from Soshanguve, Pretoria. High-performance websites, bespoke web
            applications, and strategic brand collateral — delivered in{' '}
            <span className="text-cd-gold font-semibold">5–7 business days</span>.
          </motion.p>

          {/* ── CTAs ── */}
          <motion.div
            variants={ctaReveal}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5"
          >
            {/* Primary CTA */}
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

            {/* Secondary CTA */}
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

          {/* ── Badge Strip ── */}
          <motion.div
            variants={badgeSpringReveal}
            className="glass-card rounded-xl px-3 py-2 sm:px-6 sm:py-3 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-0 border-t border-t-cd-gold/15 max-w-3xl mx-auto backdrop-blur-xl"
          >
            {badgeItems.map((badge, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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

        {/* ── Counter Row ── */}
        <motion.div
          variants={counterReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-8 sm:mt-14 flex items-center justify-center gap-6 sm:gap-10"
        >
          {counterItems.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 sm:gap-3 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
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

      {/* ── Subtle scroll-down chevron hint ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 1 }}
        aria-hidden="true"
      >
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-cd-gold"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.div>

      {/* ── Bottom fade into next section ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cd-bg to-transparent z-[11] pointer-events-none" />
    </section>
  )
}
