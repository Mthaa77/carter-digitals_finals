'use client'

import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calculator, ArrowRight, ArrowLeft, Package, Clock, FileText, Sparkles,
  Check, CheckCircle2, Building2, GraduationCap, Rocket, Briefcase, HelpCircle,
  BookOpen, CalendarCheck, ShoppingCart, Users, MessageCircle, Target,
  Zap, ShieldCheck, Star, PartyPopper
} from 'lucide-react'
import { Slider } from '@/components/ui/slider'

// ─── Data Structures (preserved from original) ────────────────────────────────

const FEATURES = [
  { id: 'blog', label: 'Blog', price: 2500, included: ['Vula+', 'Included in Khula & Elevate'], icon: BookOpen, description: 'Publish articles, news, and updates to drive traffic' },
  { id: 'booking', label: 'Online Booking', price: 3000, included: ['Khula+', 'Calendar integration'], icon: CalendarCheck, description: 'Let clients book appointments directly on your site' },
  { id: 'ecommerce', label: 'E-commerce', price: 5000, included: ['Elevate', 'Full shop with payments'], icon: ShoppingCart, description: 'Sell products online with secure payment processing' },
  { id: 'portal', label: 'Staff Portal / Dashboard', price: 8000, included: ['Elevate+', 'Admin & user roles'], icon: Users, description: 'Private area with role-based access for your team' },
  { id: 'whatsapp', label: 'WhatsApp Integration', price: 1500, included: ['All plans', 'Click-to-chat widget'], icon: MessageCircle, description: 'Floating chat button connecting straight to your WhatsApp' },
  { id: 'googleAds', label: 'Google Ads Landing Page', price: 2000, included: ['Khula+', 'Optimised for conversions'], icon: Target, description: 'High-converting page designed for your ad campaigns' },
] as const

type FeatureId = (typeof FEATURES)[number]['id']

const TIMELINE_OPTIONS = [
  { value: 'urgent', label: 'Urgent', sublabel: '5\u20137 days', multiplier: 1.3, description: 'Need it yesterday? We\u2019ll fast-track your project with priority resources.', icon: Zap },
  { value: 'standard', label: 'Standard', sublabel: '2\u20133 weeks', multiplier: 1.0, description: 'Our most popular timeline. Balanced speed with thorough quality.', icon: Clock },
  { value: 'flexible', label: 'Flexible', sublabel: '4+ weeks', multiplier: 0.9, description: 'No rush? Save 10% and let us perfect every detail.', icon: ShieldCheck },
] as const

type TimelineValue = (typeof TIMELINE_OPTIONS)[number]['value']

const BUSINESS_TYPES = [
  { value: 'small-business', label: 'Small Business', description: 'Local shop, salon, or trades business', icon: Building2 },
  { value: 'school', label: 'School / Institution', description: 'Schools, colleges, or training centres', icon: GraduationCap },
  { value: 'startup', label: 'Startup', description: 'Growing tech or product venture', icon: Rocket },
  { value: 'professional', label: 'Professional Services', description: 'Law firm, medical practice, or consultancy', icon: Briefcase },
  { value: 'other', label: 'Other', description: 'Something else entirely — we\u2019ve got you', icon: HelpCircle },
] as const

type BusinessType = (typeof BUSINESS_TYPES)[number]['value']

const PACKAGES = [
  { name: 'Vula', minPrice: 0, maxPrice: 5999, color: 'text-cd-text-muted', borderColor: 'border-cd-border', bgColor: 'bg-cd-surface', tagline: 'Getting started' },
  { name: 'Khula', minPrice: 6000, maxPrice: 11999, color: 'text-cd-gold', borderColor: 'border-cd-gold-dim', bgColor: 'bg-cd-gold/5', tagline: 'Growing business' },
  { name: 'Elevate', minPrice: 12000, maxPrice: 19999, color: 'text-cd-gold-light', borderColor: 'border-cd-gold', bgColor: 'bg-cd-gold/8', tagline: 'Full power' },
  { name: 'Custom', minPrice: 20000, maxPrice: Infinity, color: 'text-cd-gold-light', borderColor: 'border-cd-gold', bgColor: 'bg-cd-gold/10', tagline: 'Enterprise' },
]

function getPackage(price: number) {
  return PACKAGES.find(p => price >= p.minPrice && price <= p.maxPrice) || PACKAGES[0]
}

function formatCurrency(value: number): string {
  return value.toLocaleString('en-ZA')
}

// Animated counter hook
function useAnimatedNumber(target: number, duration = 500) {
  const [current, setCurrent] = useState(target)
  const prevTarget = useRef(target)
  const startTime = useRef(Date.now())
  const startValue = useRef(target)

  useEffect(() => {
    if (prevTarget.current !== target) {
      startTime.current = Date.now()
      startValue.current = prevTarget.current
      prevTarget.current = target
    }

    const animate = () => {
      const elapsed = Date.now() - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const value = Math.round(startValue.current + (target - startValue.current) * eased)
      setCurrent(value)
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [target, duration])

  return current
}

// Step definitions
const STEPS = [
  { id: 1, label: 'Business', color: '#C9A84C' },
  { id: 2, label: 'Pages', color: '#34D399' },
  { id: 3, label: 'Features', color: '#22D3EE' },
  { id: 4, label: 'Timeline', color: '#A78BFA' },
]

// Confetti sparkle component for results
function SparkleBurst() {
  const sparkles = useMemo(() => {
    const arr = []
    for (let i = 0; i < 30; i++) {
      const seed = i * 137.5
      const x = (Math.sin(seed) * 0.5 + 0.5) * 100
      const y = (Math.cos(seed * 1.3) * 0.5 + 0.5) * 100
      const size = 2 + (Math.sin(seed * 2.1) * 0.5 + 0.5) * 4
      const delay = (Math.sin(seed * 3.7) * 0.5 + 0.5) * 0.8
      const duration = 1.5 + (Math.sin(seed * 4.2) * 0.5 + 0.5) * 1.5
      const colors = ['#C9A84C', '#E8CA7A', '#34D399', '#22D3EE', '#A78BFA', '#FB7185']
      const color = colors[i % colors.length]
      arr.push({ x, y, size, delay, duration, color })
    }
    return arr
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.5, 1, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

// Page stack visual component
function PageStack({ count }: { count: number }) {
  const displayCount = Math.min(count, 10)
  const extraCount = Math.max(0, count - 10)

  return (
    <div className="relative w-28 h-36 flex items-end justify-center">
      {Array.from({ length: displayCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-md border"
          style={{
            width: 64 + i * 2,
            height: 80 + i * 1.5,
            bottom: i * 4,
            zIndex: i,
            background: `rgba(52, 211, 153, ${0.03 + i * 0.015})`,
            borderColor: `rgba(52, 211, 153, ${0.1 + i * 0.04})`,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.02, duration: 0.2 }}
        />
      ))}
      {/* Top page label */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center w-16 h-20 rounded-lg border border-cd-emerald/30 bg-cd-emerald/5"
        style={{
          bottom: displayCount * 4,
        }}
        layout
      >
        <span className="font-mono text-2xl font-bold text-cd-emerald">{count}</span>
        <span className="text-[10px] text-cd-emerald/70 font-mono">
          {count === 1 ? 'page' : 'pages'}
        </span>
      </motion.div>
      {extraCount > 0 && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-30 px-2 py-0.5 rounded-full bg-cd-emerald/10 border border-cd-emerald/20 text-cd-emerald text-[10px] font-mono">
          +{extraCount} more
        </div>
      )}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WebsiteCostCalculator() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [businessType, setBusinessType] = useState<BusinessType | ''>('')
  const [pages, setPages] = useState([5])
  const [selectedFeatures, setSelectedFeatures] = useState<Set<FeatureId>>(new Set())
  const [timeline, setTimeline] = useState<TimelineValue>('standard')
  const [showResults, setShowResults] = useState(false)

  const toggleFeature = (id: FeatureId) => {
    setSelectedFeatures((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const goNext = () => {
    if (step < 4) {
      setDirection(1)
      setStep(step + 1)
    } else {
      setDirection(1)
      setShowResults(true)
    }
  }

  const goBack = () => {
    if (showResults) {
      setDirection(-1)
      setShowResults(false)
    } else if (step > 1) {
      setDirection(-1)
      setStep(step - 1)
    }
  }

  const canProceed = useMemo(() => {
    if (step === 1) return businessType !== ''
    return true
  }, [step, businessType])

  // Calculation
  const calculation = useMemo(() => {
    const pageCount = pages[0]
    const basePrice = 3999
    const additionalPages = Math.max(0, pageCount - 4)
    const pageCost = additionalPages * 800

    let featureCost = 0
    selectedFeatures.forEach((id) => {
      const feature = FEATURES.find((f) => f.id === id)
      if (feature) featureCost += feature.price
    })

    const subtotal = basePrice + pageCost + featureCost
    const timelineOption = TIMELINE_OPTIONS.find((t) => t.value === timeline)!
    const total = subtotal * timelineOption.multiplier
    const lower = Math.round(total * 0.85)
    const upper = Math.round(total * 1.15)
    const pkg = getPackage(total)

    return {
      basePrice,
      pageCost,
      featureCost,
      subtotal,
      total: Math.round(total),
      lower,
      upper,
      packageName: pkg.name,
      packageColor: pkg.color,
      packageTagline: pkg.tagline,
      packageBorderClass: pkg.borderColor,
      packageBgClass: pkg.bgColor,
      multiplier: timelineOption.multiplier,
      timelineAdjustment: Math.round(subtotal * (timelineOption.multiplier - 1)),
    }
  }, [pages, selectedFeatures, timeline])

  const animatedTotal = useAnimatedNumber(calculation.total, 600)
  const animatedLower = useAnimatedNumber(calculation.lower, 600)
  const animatedUpper = useAnimatedNumber(calculation.upper, 600)

  // Package inclusions
  const packageInclusions = useMemo(() => {
    const pkgName = calculation.packageName
    const included: string[] = []
    const excluded: string[] = []

    if (pkgName === 'Vula') {
      included.push('Up to 4 pages', 'Mobile responsive', 'Contact form', 'Basic SEO setup', 'SSL certificate')
      excluded.push('Blog', 'E-commerce', 'Booking system', 'Staff portal', 'Custom integrations')
    } else if (pkgName === 'Khula') {
      included.push('Up to 8 pages', 'Mobile responsive', 'Contact form', 'SEO optimisation', 'SSL certificate', 'Blog', 'WhatsApp integration', 'Google Ads landing page')
      excluded.push('E-commerce', 'Staff portal', 'Advanced dashboard', 'Custom API integrations')
    } else if (pkgName === 'Elevate') {
      included.push('Unlimited pages', 'Mobile responsive', 'Advanced SEO', 'SSL certificate', 'Blog', 'E-commerce', 'Booking system', 'Staff portal', 'WhatsApp integration', 'Google Ads landing page')
      excluded.push('Custom API integrations', 'Machine learning features')
    } else {
      included.push('Everything in Elevate', 'Custom API integrations', 'Dedicated account manager', 'Priority support', 'Custom features')
    }
    return { included, excluded }
  }, [calculation.packageName])

  // WhatsApp message
  const whatsappUrl = useMemo(() => {
    const selectedFeatureLabels = FEATURES
      .filter(f => selectedFeatures.has(f.id))
      .map(f => f.label)

    const timelineLabel = TIMELINE_OPTIONS.find(t => t.value === timeline)?.label ?? 'Standard'
    const businessLabel = BUSINESS_TYPES.find(b => b.value === businessType)?.label ?? 'Not specified'
    const additionalPages = Math.max(0, pages[0] - 4)

    const message = [
      '\uD83C\uDF1F Website Cost Estimate \u2014 Carter Digitals',
      '',
      `\uD83D\uDCCB Business Type: ${businessLabel}`,
      `\uD83D\uDCC4 Pages: ${pages[0]}`,
      `\u2728 Features: ${selectedFeatureLabels.length > 0 ? selectedFeatureLabels.join(', ') : 'None'}`,
      `\u23F1\uFE0F Timeline: ${timelineLabel}`,
      '',
      '\uD83D\uDCB0 Cost Breakdown:',
      `  \u2022 Base (4 pages): R${formatCurrency(calculation.basePrice)}`,
    ]

    if (additionalPages > 0) {
      message.push(`  \u2022 Extra pages (${additionalPages} \u00D7 R800): R${formatCurrency(calculation.pageCost)}`)
    }

    if (calculation.featureCost > 0) {
      message.push(`  \u2022 Features: R${formatCurrency(calculation.featureCost)}`)
    }

    if (calculation.multiplier !== 1.0) {
      const sign = calculation.multiplier > 1 ? '+' : ''
      message.push(`  \u2022 Timeline adjustment: ${sign}R${formatCurrency(Math.abs(calculation.timelineAdjustment))}`)
    }

    message.push(
      '',
      `\uD83D\uDCCA Estimated Total: R${formatCurrency(calculation.lower)} \u2013 R${formatCurrency(calculation.upper)}`,
      `\uD83D\uDCE6 Recommended Package: ${calculation.packageName}`,
      '',
      '\uD83E\uDD1D I\u2019d like to discuss this further. Please get back to me!',
      '',
      '\u2014',
      'Generated at carterdigitals.co.za',
    )

    return `https://wa.me/27724026893?text=${encodeURIComponent(message.join('\n'))}`
  }, [businessType, pages, selectedFeatures, timeline, calculation])

  // Animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  }

  const currentStepColor = STEPS[step - 1]?.color ?? '#C9A84C'

  return (
    <section id="website-cost-calc" className="py-20 md:py-28 bg-[var(--cd-bg)] relative overflow-hidden">
      {/* Subtle animated gradient mesh background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 30%, rgba(201,168,76,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(34,211,238,0.03) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.02) 0%, transparent 60%)',
        }}
      />
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.5) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14 text-center"
        >
          <span className="section-label inline-block">Free Tool</span>
          <h2 className="section-heading text-[var(--text-h2)] text-cd-text font-bold leading-tight">
            Website Cost Calculator
          </h2>
          <div
            className="mt-3 w-20 h-[3px] rounded-full mx-auto"
            style={{
              background: 'linear-gradient(90deg, #C9A84C, #34D399, #22D3EE, #A78BFA)',
            }}
          />
          <p className="text-cd-text-muted text-lg max-w-xl mx-auto mt-3">
            Get an instant estimate based on your requirements. No email required — just honest numbers.
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            {STEPS.map((s, i) => {
              const isActive = step === s.id && !showResults
              const isComplete = (step > s.id) || showResults
              return (
                <div key={s.id} className="flex items-center">
                  <motion.div
                    className="flex items-center gap-1.5 sm:gap-2"
                    animate={{ scale: isActive ? 1.05 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={`
                        flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs font-bold font-mono transition-all duration-300
                        ${isActive
                          ? 'text-cd-bg shadow-lg'
                          : isComplete
                            ? 'text-cd-bg'
                            : 'bg-cd-surface border border-cd-border text-cd-text-dim'
                        }
                      `}
                      style={{
                        backgroundColor: isActive || isComplete ? s.color : undefined,
                        boxShadow: isActive ? `0 0 20px ${s.color}40` : undefined,
                      }}
                    >
                      {isComplete ? <Check className="w-3.5 h-3.5" /> : s.id}
                    </div>
                    <span className={`text-xs sm:text-sm font-medium hidden sm:inline transition-colors duration-300 ${
                      isActive ? 'text-cd-text' : isComplete ? 'text-cd-text-muted' : 'text-cd-text-dim'
                    }`}>
                      {s.label}
                    </span>
                  </motion.div>
                  {i < STEPS.length - 1 && (
                    <div
                      className="w-6 sm:w-10 h-px mx-1 sm:mx-2 transition-colors duration-500"
                      style={{
                        backgroundColor: isComplete ? STEPS[i + 1].color : 'var(--cd-border)',
                      }}
                    />
                  )}
                </div>
              )
            })}
            {/* Results checkmark */}
            <div className="flex items-center">
              <div className="w-6 sm:w-10 h-px mx-1 sm:mx-2 transition-colors duration-500"
                style={{ backgroundColor: showResults ? '#C9A84C' : 'var(--cd-border)' }}
              />
              <div
                className={`
                  flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs font-bold font-mono transition-all duration-300
                  ${showResults
                    ? 'text-cd-bg shadow-lg'
                    : 'bg-cd-surface border border-cd-border text-cd-text-dim'
                  }
                `}
                style={{
                  backgroundColor: showResults ? '#C9A84C' : undefined,
                  boxShadow: showResults ? '0 0 20px rgba(201,168,76,0.4)' : undefined,
                }}
              >
                {showResults ? <Check className="w-3.5 h-3.5" /> : <Star className="w-3.5 h-3.5" />}
              </div>
              <span className={`text-xs sm:text-sm font-medium hidden sm:inline ml-1.5 sm:ml-2 transition-colors duration-300 ${
                showResults ? 'text-cd-gold' : 'text-cd-text-dim'
              }`}>
                Results
              </span>
            </div>
          </div>
        </div>

        {/* Main Card Area */}
        <div className="relative min-h-[420px]">
          <AnimatePresence mode="wait" custom={direction}>
            {!showResults ? (
              <motion.div
                key={`step-${step}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="glass-card rounded-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden"
                  style={{
                    boxShadow: `0 8px 40px rgba(0,0,0,0.25), 0 0 60px ${currentStepColor}10`,
                  }}
                >
                  {/* Top gradient bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${currentStepColor}, transparent)`,
                    }}
                  />

                  {/* Step 1: Business Type */}
                  {step === 1 && (
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cd-gold/8">
                          <Building2 className="w-5 h-5 text-cd-gold" />
                        </div>
                        <div>
                          <h3 className="text-cd-text font-display font-semibold text-lg">What type of business?</h3>
                          <p className="text-cd-text-dim text-sm">This helps us recommend the right package for you.</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 mt-6">
                        {BUSINESS_TYPES.map((bt) => {
                          const Icon = bt.icon
                          const isSelected = businessType === bt.value
                          return (
                            <motion.button
                              key={bt.value}
                              onClick={() => setBusinessType(bt.value)}
                              className={`
                                flex items-center gap-3 rounded-xl px-4 py-3.5 cursor-pointer
                                transition-all duration-200 border text-left
                                ${isSelected
                                  ? 'bg-cd-gold/8 border-cd-gold/40 shadow-[0_0_20px_rgba(201,168,76,0.08)]'
                                  : 'bg-white/[0.02] border-cd-border hover:border-cd-border-glow hover:bg-white/[0.03]'
                                }
                              `}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <div className={`
                                flex items-center justify-center w-9 h-9 rounded-lg shrink-0 transition-colors
                                ${isSelected ? 'bg-cd-gold/15' : 'bg-white/[0.04]'}
                              `}>
                                <Icon className={`w-4.5 h-4.5 ${isSelected ? 'text-cd-gold' : 'text-cd-text-dim'}`} />
                              </div>
                              <div className="min-w-0">
                                <div className={`text-sm font-medium ${isSelected ? 'text-cd-gold' : 'text-cd-text'}`}>
                                  {bt.label}
                                </div>
                                <div className="text-xs text-cd-text-dim truncate">{bt.description}</div>
                              </div>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="ml-auto shrink-0"
                                >
                                  <CheckCircle2 className="w-5 h-5 text-cd-gold" />
                                </motion.div>
                              )}
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Website Pages */}
                  {step === 2 && (
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cd-emerald/8">
                          <FileText className="w-5 h-5 text-cd-emerald" />
                        </div>
                        <div>
                          <h3 className="text-cd-text font-display font-semibold text-lg">How many pages?</h3>
                          <p className="text-cd-text-dim text-sm">First 4 pages included in base (R3,999). Additional pages: R800 each.</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 mt-6">
                        {/* Page Stack Visual */}
                        <PageStack count={pages[0]} />

                        {/* Slider */}
                        <div className="flex-1 w-full">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-cd-text-dim font-mono text-xs">1</span>
                            <span className="font-mono text-4xl sm:text-5xl font-bold text-cd-emerald tabular-nums"
                              style={{
                                textShadow: '0 0 30px rgba(52, 211, 153, 0.15), 0 0 60px rgba(52, 211, 153, 0.06)',
                              }}
                            >
                              {pages[0]}
                            </span>
                            <span className="text-cd-text-dim font-mono text-xs">20</span>
                          </div>

                          <Slider
                            value={pages}
                            onValueChange={setPages}
                            min={1}
                            max={20}
                            step={1}
                            aria-label="Number of Pages"
                            className="w-full [&_[data-slot=slider-track]]:bg-cd-border [&_[data-slot=slider-track]]:h-2.5 [&_[data-slot=slider-range]]:bg-cd-emerald [&_[data-slot=slider-thumb]]:w-6 [&_[data-slot=slider-thumb]]:h-6 [&_[data-slot=slider-thumb]]:border-cd-emerald [&_[data-slot=slider-thumb]]:bg-cd-elevated [&_[data-slot=slider-thumb]]:shadow-[0_0_12px_rgba(52,211,153,0.3)] [&_[data-slot=slider-thumb]]:hover:shadow-[0_0_20px_rgba(52,211,153,0.5)]"
                          />

                          {pages[0] > 4 && (
                            <motion.p
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-cd-emerald/80 text-xs mt-3 font-mono"
                            >
                              +{pages[0] - 4} extra page{pages[0] - 4 > 1 ? 's' : ''} = R{formatCurrency((pages[0] - 4) * 800)}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Features Needed */}
                  {step === 3 && (
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cd-cyan/8">
                          <Sparkles className="w-5 h-5 text-cd-cyan" />
                        </div>
                        <div>
                          <h3 className="text-cd-text font-display font-semibold text-lg">What features do you need?</h3>
                          <p className="text-cd-text-dim text-sm">Select all that apply. You can skip this step if you&apos;re not sure.</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 mt-6">
                        {FEATURES.map((feature) => {
                          const Icon = feature.icon
                          const isActive = selectedFeatures.has(feature.id)
                          return (
                            <motion.button
                              key={feature.id}
                              onClick={() => toggleFeature(feature.id)}
                              className={`
                                flex items-start gap-3 rounded-xl px-4 py-3.5 cursor-pointer
                                transition-all duration-200 border text-left
                                ${isActive
                                  ? 'bg-cd-cyan/6 border-cd-cyan/30 shadow-[0_0_20px_rgba(34,211,238,0.06)]'
                                  : 'bg-white/[0.02] border-cd-border hover:border-cd-border-glow hover:bg-white/[0.03]'
                                }
                              `}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <div className={`
                                flex items-center justify-center w-9 h-9 rounded-lg shrink-0 transition-colors mt-0.5
                                ${isActive ? 'bg-cd-cyan/15' : 'bg-white/[0.04]'}
                              `}>
                                <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-cd-cyan' : 'text-cd-text-dim'}`} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                  <span className={`text-sm font-medium ${isActive ? 'text-cd-cyan' : 'text-cd-text'}`}>
                                    {feature.label}
                                  </span>
                                  <span className={`text-xs font-mono shrink-0 ${isActive ? 'text-cd-cyan/70' : 'text-cd-text-dim'}`}>
                                    +R{formatCurrency(feature.price)}
                                  </span>
                                </div>
                                <p className="text-xs text-cd-text-dim mt-0.5 leading-relaxed">{feature.description}</p>
                              </div>
                              {/* Toggle indicator */}
                              <div className={`
                                mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                                ${isActive ? 'border-cd-cyan bg-cd-cyan' : 'border-cd-border'}
                              `}>
                                {isActive && <Check className="w-3 h-3 text-cd-bg" />}
                              </div>
                            </motion.button>
                          )
                        })}
                      </div>

                      {selectedFeatures.size > 0 && (
                        <motion.p
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-cd-cyan/80 text-xs mt-4 font-mono"
                        >
                          {selectedFeatures.size} feature{selectedFeatures.size > 1 ? 's' : ''} selected = R{formatCurrency(calculation.featureCost)}
                        </motion.p>
                      )}
                    </div>
                  )}

                  {/* Step 4: Timeline */}
                  {step === 4 && (
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cd-violet/8">
                          <Clock className="w-5 h-5 text-cd-violet" />
                        </div>
                        <div>
                          <h3 className="text-cd-text font-display font-semibold text-lg">When do you need it?</h3>
                          <p className="text-cd-text-dim text-sm">Your timeline affects the final price.</p>
                        </div>
                      </div>

                      <div className="grid gap-3 mt-6">
                        {TIMELINE_OPTIONS.map((option) => {
                          const Icon = option.icon
                          const isActive = timeline === option.value
                          return (
                            <motion.button
                              key={option.value}
                              onClick={() => setTimeline(option.value)}
                              className={`
                                flex items-center gap-4 rounded-xl px-5 py-4 cursor-pointer
                                transition-all duration-200 border text-left
                                ${isActive
                                  ? 'bg-cd-violet/6 border-cd-violet/30 shadow-[0_0_20px_rgba(167,139,250,0.06)]'
                                  : 'bg-white/[0.02] border-cd-border hover:border-cd-border-glow hover:bg-white/[0.03]'
                                }
                              `}
                              whileHover={{ scale: 1.005 }}
                              whileTap={{ scale: 0.995 }}
                            >
                              <div className={`
                                flex items-center justify-center w-11 h-11 rounded-xl shrink-0 transition-colors
                                ${isActive ? 'bg-cd-violet/15' : 'bg-white/[0.04]'}
                              `}>
                                <Icon className={`w-5 h-5 ${isActive ? 'text-cd-violet' : 'text-cd-text-dim'}`} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                  <span className={`text-sm font-semibold ${isActive ? 'text-cd-violet' : 'text-cd-text'}`}>
                                    {option.label}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-cd-text-dim text-xs font-mono">{option.sublabel}</span>
                                    {option.multiplier !== 1.0 && (
                                      <span
                                        className={`font-mono text-xs font-bold px-2 py-0.5 rounded-full ${
                                          option.multiplier > 1
                                            ? 'text-red-400/80 bg-red-400/5'
                                            : 'text-cd-emerald bg-cd-emerald/5'
                                        }`}
                                      >
                                        {option.multiplier > 1 ? '+' : ''}
                                        {Math.round((option.multiplier - 1) * 100)}%
                                      </span>
                                    )}
                                    {option.multiplier === 1.0 && (
                                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full text-cd-gold bg-cd-gold/5">
                                        Most Popular
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <p className="text-xs text-cd-text-dim mt-1">{option.description}</p>
                              </div>
                              {/* Radio indicator */}
                              <div className={`
                                mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                                ${isActive ? 'border-cd-violet' : 'border-cd-border'}
                              `}>
                                {isActive && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-2.5 h-2.5 rounded-full bg-cd-violet"
                                  />
                                )}
                              </div>
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              /* ─── Results Page ────────────────────────────────────────────── */
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="glass-card rounded-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden"
                  style={{
                    boxShadow: '0 8px 40px rgba(0,0,0,0.25), 0 0 60px rgba(201,168,76,0.08)',
                  }}
                >
                  <SparkleBurst />

                  {/* Top gradient bar - gold celebratory */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{
                      background: 'linear-gradient(90deg, #C9A84C, #34D399, #22D3EE, #A78BFA, #C9A84C)',
                    }}
                  />

                  {/* Celebratory header */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-center mb-6 relative z-10"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cd-gold/10 border border-cd-gold/20 mb-3">
                      <PartyPopper className="w-6 h-6 text-cd-gold" />
                    </div>
                    <h3 className="text-cd-text font-display font-bold text-xl sm:text-2xl">Your Estimate is Ready</h3>
                    <p className="text-cd-text-dim text-sm mt-1">Here&apos;s what your website project will likely cost.</p>
                  </motion.div>

                  {/* Price Display */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center py-6 relative z-10"
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)',
                      }}
                    />
                    <div className="font-mono text-sm text-cd-text-dim mb-2 tracking-wide relative">
                      Estimated Total
                    </div>
                    <div
                      className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold text-cd-gold tabular-nums relative"
                      style={{
                        textShadow: '0 0 40px rgba(201,168,76,0.2), 0 0 80px rgba(201,168,76,0.08)',
                      }}
                    >
                      R{formatCurrency(animatedLower)} – R{formatCurrency(animatedUpper)}
                    </div>
                    <div className="text-cd-text-dim text-xs font-mono mt-2 relative">
                      &plusmn;15% range &middot; Midpoint: R{formatCurrency(animatedTotal)}
                    </div>
                  </motion.div>

                  {/* Divider */}
                  <div className="h-px"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), rgba(34,211,238,0.15), transparent)',
                    }}
                  />

                  {/* Summary Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="py-5 relative z-10"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Business Type */}
                      <div className="flex items-center gap-3 rounded-lg px-4 py-3 bg-cd-gold/3 border border-cd-gold/10">
                        <Building2 className="w-4 h-4 text-cd-gold shrink-0" />
                        <div className="min-w-0">
                          <div className="text-[10px] font-mono text-cd-text-dim uppercase tracking-wider">Business</div>
                          <div className="text-sm text-cd-text font-medium truncate">
                            {BUSINESS_TYPES.find(b => b.value === businessType)?.label ?? 'Not specified'}
                          </div>
                        </div>
                      </div>

                      {/* Pages */}
                      <div className="flex items-center gap-3 rounded-lg px-4 py-3 bg-cd-emerald/3 border border-cd-emerald/10">
                        <FileText className="w-4 h-4 text-cd-emerald shrink-0" />
                        <div className="min-w-0">
                          <div className="text-[10px] font-mono text-cd-text-dim uppercase tracking-wider">Pages</div>
                          <div className="text-sm text-cd-text font-medium">
                            {pages[0]} page{pages[0] > 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex items-start gap-3 rounded-lg px-4 py-3 bg-cd-cyan/3 border border-cd-cyan/10">
                        <Sparkles className="w-4 h-4 text-cd-cyan shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <div className="text-[10px] font-mono text-cd-text-dim uppercase tracking-wider">Features</div>
                          <div className="text-sm text-cd-text font-medium">
                            {selectedFeatures.size > 0
                              ? FEATURES.filter(f => selectedFeatures.has(f.id)).map(f => f.label).join(', ')
                              : 'None selected'}
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="flex items-center gap-3 rounded-lg px-4 py-3 bg-cd-violet/3 border border-cd-violet/10">
                        <Clock className="w-4 h-4 text-cd-violet shrink-0" />
                        <div className="min-w-0">
                          <div className="text-[10px] font-mono text-cd-text-dim uppercase tracking-wider">Timeline</div>
                          <div className="text-sm text-cd-text font-medium">
                            {TIMELINE_OPTIONS.find(t => t.value === timeline)?.label}
                            <span className="text-cd-text-dim text-xs ml-1">
                              ({TIMELINE_OPTIONS.find(t => t.value === timeline)?.sublabel})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Divider */}
                  <div className="h-px"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), rgba(34,211,238,0.15), transparent)',
                    }}
                  />

                  {/* Price Breakdown */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.5 }}
                    className="py-5 relative z-10"
                  >
                    <h4 className="text-cd-text-muted font-mono text-xs tracking-wider uppercase mb-3">Cost Breakdown</h4>
                    <div className="space-y-2.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-cd-text-muted">Base (4 pages)</span>
                        <span className="text-cd-text font-mono tabular-nums">R{formatCurrency(calculation.basePrice)}</span>
                      </div>
                      {calculation.pageCost > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-cd-text-muted">Extra pages ({pages[0] - 4} &times; R800)</span>
                          <span className="text-cd-text font-mono tabular-nums">R{formatCurrency(calculation.pageCost)}</span>
                        </div>
                      )}
                      {calculation.featureCost > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-cd-text-muted">Features ({selectedFeatures.size})</span>
                          <span className="text-cd-text font-mono tabular-nums">R{formatCurrency(calculation.featureCost)}</span>
                        </div>
                      )}
                      {calculation.multiplier !== 1.0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-cd-text-muted">
                            Timeline ({calculation.multiplier > 1 ? '+' : ''}{Math.round((calculation.multiplier - 1) * 100)}%)
                          </span>
                          <span className={`font-mono tabular-nums font-semibold ${calculation.multiplier > 1 ? 'text-red-400/80' : 'text-cd-emerald'}`}>
                            {calculation.multiplier > 1 ? '+' : ''}R{formatCurrency(Math.abs(calculation.timelineAdjustment))}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Divider */}
                  <div className="h-px"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), rgba(34,211,238,0.15), transparent)',
                    }}
                  />

                  {/* Recommended Package */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="py-5 relative z-10"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-cd-text-dim" />
                        <span className="text-cd-text-muted font-mono text-xs tracking-wider uppercase">Recommended Package</span>
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={calculation.packageName}
                          initial={{ opacity: 0, y: 6, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                          className={`
                            flex items-center gap-2 px-3 py-1.5 rounded-full border
                            ${calculation.packageBorderClass} ${calculation.packageBgClass}
                          `}
                          style={{
                            boxShadow: '0 0 20px rgba(201,168,76,0.06)',
                          }}
                        >
                          <span className={`font-display font-bold text-sm ${calculation.packageColor}`}>
                            {calculation.packageName}
                          </span>
                          <span className="text-cd-text-dim text-[10px] font-mono">
                            {calculation.packageTagline}
                          </span>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Inclusions / Exclusions */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="rounded-lg p-4 border border-cd-emerald/15 bg-cd-emerald/3">
                        <h5 className="text-cd-emerald font-display font-semibold text-xs mb-2 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Included in {calculation.packageName}
                        </h5>
                        <ul className="space-y-1.5">
                          {packageInclusions.included.map((item, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-cd-text-muted text-xs">
                              <Check className="w-3 h-3 text-cd-emerald shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {packageInclusions.excluded.length > 0 && (
                        <div className="rounded-lg p-4 border border-cd-rose/10 bg-cd-rose/3">
                          <h5 className="text-cd-rose font-display font-semibold text-xs mb-2 flex items-center gap-1.5">
                            <span className="w-3.5 h-3.5 flex items-center justify-center">&times;</span>
                            Not included
                          </h5>
                          <ul className="space-y-1.5">
                            {packageInclusions.excluded.filter(Boolean).map((item, i) => (
                              <li key={i} className="flex items-start gap-1.5 text-cd-text-dim text-xs">
                                <span className="w-3 h-3 flex items-center justify-center text-cd-rose/60 shrink-0 mt-0.5">&times;</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Divider */}
                  <div className="h-px"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), rgba(34,211,238,0.15), transparent)',
                    }}
                  />

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.95, duration: 0.5 }}
                    className="pt-6 relative z-10 space-y-3"
                  >
                    {/* Primary: Send to WhatsApp */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-xl
                        bg-cd-gold text-cd-bg font-display font-bold text-base
                        hover:bg-cd-gold-light transition-all duration-300
                        shadow-[0_0_25px_rgba(201,168,76,0.2),0_0_50px_rgba(201,168,76,0.06)]
                        hover:shadow-[0_0_35px_rgba(201,168,76,0.3),0_0_70px_rgba(201,168,76,0.1)]"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Send to WhatsApp
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>

                    {/* Secondary: Get Exact Quote */}
                    <a
                      href="#contact"
                      className="group flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl
                        border border-cd-gold/40 text-cd-gold font-display font-semibold text-sm
                        hover:bg-cd-gold/5 hover:border-cd-gold transition-all duration-300"
                    >
                      Get Exact Quote
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between mt-6"
        >
          <button
            onClick={goBack}
            disabled={step === 1 && !showResults}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
              ${step === 1 && !showResults
                ? 'text-cd-text-dim/30 cursor-not-allowed'
                : 'text-cd-text-muted hover:text-cd-text border border-cd-border hover:border-cd-border-glow hover:bg-white/[0.02]'
              }
            `}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {!showResults && (
            <button
              onClick={goNext}
              disabled={!canProceed}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300
                ${canProceed
                  ? 'bg-cd-gold text-cd-bg hover:bg-cd-gold-light shadow-[0_0_15px_rgba(201,168,76,0.15)] hover:shadow-[0_0_25px_rgba(201,168,76,0.25)]'
                  : 'bg-cd-surface text-cd-text-dim/50 cursor-not-allowed border border-cd-border'
                }
              `}
              style={canProceed ? { backgroundColor: currentStepColor } : undefined}
            >
              {step === 4 ? 'See Results' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {showResults && (
            <button
              onClick={() => {
                setShowResults(false)
                setStep(1)
                setDirection(-1)
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-cd-text-muted hover:text-cd-text border border-cd-border hover:border-cd-border-glow hover:bg-white/[0.02] transition-all duration-200"
            >
              <Calculator className="w-4 h-4" />
              Start Over
            </button>
          )}
        </motion.div>
      </div>
    </section>
  )
}
