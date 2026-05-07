'use client'

import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calculator, ArrowRight, Package, Clock, FileText, Sparkles,
  Share2, Mail, Check, CheckCircle2, Copy, ExternalLink, ChevronRight
} from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

const FEATURES = [
  { id: 'blog', label: 'Blog', price: 2500, included: ['Vula+', 'Included in Khula & Elevate'] },
  { id: 'booking', label: 'Online Booking', price: 3000, included: ['Khula+', 'Calendar integration'] },
  { id: 'ecommerce', label: 'E-commerce', price: 5000, included: ['Elevate', 'Full shop with payments'] },
  { id: 'portal', label: 'Staff Portal / Dashboard', price: 8000, included: ['Elevate+', 'Admin & user roles'] },
  { id: 'whatsapp', label: 'WhatsApp Integration', price: 1500, included: ['All plans', 'Click-to-chat widget'] },
  { id: 'googleAds', label: 'Google Ads Landing Page', price: 2000, included: ['Khula+', 'Optimised for conversions'] },
] as const

type FeatureId = (typeof FEATURES)[number]['id']

const TIMELINE_OPTIONS = [
  { value: 'urgent', label: 'Urgent', sublabel: '5\u20137 days', multiplier: 1.3 },
  { value: 'standard', label: 'Standard', sublabel: '2\u20133 weeks', multiplier: 1.0 },
  { value: 'flexible', label: 'Flexible', sublabel: '4+ weeks', multiplier: 0.9 },
] as const

type TimelineValue = (typeof TIMELINE_OPTIONS)[number]['value']

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
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
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
  { id: 1, label: 'Pages', icon: FileText },
  { id: 2, label: 'Features', icon: Sparkles },
  { id: 3, label: 'Timeline', icon: Clock },
]

export default function WebsiteCostCalculator() {
  const [step, setStep] = useState(1)
  const [pages, setPages] = useState([5])
  const [selectedFeatures, setSelectedFeatures] = useState<Set<FeatureId>>(new Set())
  const [timeline, setTimeline] = useState<TimelineValue>('standard')
  const [copied, setCopied] = useState(false)
  const [showComparison, setShowComparison] = useState(false)

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
    }
  }, [pages, selectedFeatures, timeline])

  const animatedTotal = useAnimatedNumber(calculation.total, 600)
  const animatedLower = useAnimatedNumber(calculation.lower, 600)
  const animatedUpper = useAnimatedNumber(calculation.upper, 600)

  const toggleFeature = (id: FeatureId) => {
    setSelectedFeatures((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleShare = useCallback(() => {
    const text = [
      `Website Cost Estimate — Carter Digitals`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Pages: ${pages[0]}`,
      `Features: ${FEATURES.filter(f => selectedFeatures.has(f.id)).map(f => f.label).join(', ') || 'None'}`,
      `Timeline: ${TIMELINE_OPTIONS.find(t => t.value === timeline)?.label}`,
      ``,
      `Estimated: R${formatCurrency(calculation.lower)} – R${formatCurrency(calculation.upper)}`,
      `Midpoint: R${formatCurrency(calculation.total)}`,
      `Best Package: ${calculation.packageName}`,
      ``,
      `Get yours: carterdigitals.co.za/tools/website-cost-calculator`,
    ].join('\n')

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }, [pages, selectedFeatures, timeline, calculation])

  const mailtoLink = useMemo(() => {
    const subject = encodeURIComponent('Website Cost Estimate — Carter Digitals')
    const body = encodeURIComponent([
      `Website Cost Estimate`,
      ``,
      `Pages: ${pages[0]}`,
      `Features: ${FEATURES.filter(f => selectedFeatures.has(f.id)).map(f => f.label).join(', ') || 'None'}`,
      `Timeline: ${TIMELINE_OPTIONS.find(t => t.value === timeline)?.label}`,
      ``,
      `Estimated: R${formatCurrency(calculation.lower)} – R${formatCurrency(calculation.upper)}`,
      `Midpoint: R${formatCurrency(calculation.total)}`,
      `Best Package: ${calculation.packageName}`,
      ``,
      `Generated at carterdigitals.co.za/tools/website-cost-calculator`,
    ].join('\n'))
    return `mailto:?subject=${subject}&body=${body}`
  }, [pages, selectedFeatures, timeline, calculation])

  // What's included vs excluded in best package
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
      excluded.push('')
    }
    return { included, excluded }
  }, [calculation.packageName])

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
      {/* Floating orb */}
      <div
        className="absolute top-1/4 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float-orb-2 25s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <span className="section-label inline-block">Free Tool</span>
          <h2 className="section-heading text-[var(--text-h2)] text-cd-text font-bold leading-tight">
            Website Cost Calculator
          </h2>
          {/* Multi-color gradient accent line */}
          <div
            className="mt-3 w-20 h-[3px] rounded-full"
            style={{
              background: 'linear-gradient(90deg, #C9A84C, #34D399, #22D3EE, #A78BFA)',
            }}
          />
          <p className="text-cd-text-muted text-lg max-w-2xl mt-3">
            Get an instant estimate based on your requirements. No email required — just honest numbers.
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="mb-10">
          <div className="flex items-center gap-2 sm:gap-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon
              const isActive = step === s.id
              const isComplete = step > s.id
              return (
                <button
                  key={s.id}
                  onClick={() => setStep(s.id)}
                  className="flex items-center gap-0 flex-1 cursor-pointer group"
                  aria-label={`Go to step ${s.id}: ${s.label}`}
                >
                  <div className={`
                    flex items-center gap-2 sm:gap-2.5 px-3 py-2 rounded-lg transition-all duration-300 w-full
                    ${isActive ? 'bg-cd-gold/10 border border-cd-gold/30' : isComplete ? 'bg-cd-emerald/5 border border-cd-emerald/20' : 'bg-cd-surface border border-cd-border'}
                  `}>
                    <div className={`
                      flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold font-mono shrink-0 transition-colors
                      ${isActive ? 'bg-cd-gold text-cd-bg' : isComplete ? 'bg-cd-emerald text-cd-bg' : 'bg-cd-border text-cd-text-dim'}
                    `}>
                      {isComplete ? <Check className="w-3.5 h-3.5" /> : s.id}
                    </div>
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cd-gold' : isComplete ? 'text-cd-emerald' : 'text-cd-text-dim'}`} />
                    <span className={`text-xs sm:text-sm font-medium truncate ${isActive ? 'text-cd-gold' : isComplete ? 'text-cd-emerald' : 'text-cd-text-dim'}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-cd-border shrink-0 mx-0.5" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left Column — Inputs (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 space-y-6"
          >
            <AnimatePresence mode="wait">
              {/* Step 1: Pages */}
              {step >= 1 && (
                <motion.div
                  key="pages"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="glass-card rounded-xl p-6 relative overflow-hidden"
                    style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.2), 0 0 40px rgba(201,168,76,0.04)' }}
                  >
                    {/* Gradient left accent */}
                    <div
                      className="absolute top-0 left-0 bottom-0 w-[2px]"
                      style={{
                        background: 'linear-gradient(180deg, #C9A84C, #34D399)',
                        opacity: 0.4,
                      }}
                    />
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-cd-gold/8">
                          <FileText className="w-4 h-4 text-cd-gold" strokeWidth={1.8} />
                        </div>
                        <Label className="text-cd-text font-display font-semibold text-base cursor-default">
                          Number of Pages
                        </Label>
                      </div>
                      <span className="font-mono text-2xl font-bold text-cd-gold tabular-nums">
                        {pages[0]}
                      </span>
                    </div>

                    <Slider
                      value={pages}
                      onValueChange={setPages}
                      min={1}
                      max={20}
                      step={1}
                      aria-label="Number of Pages"
                      className="w-full [&_[data-slot=slider-track]]:bg-cd-border [&_[data-slot=slider-track]]:h-2 [&_[data-slot=slider-range]]:bg-cd-gold [&_[data-slot=slider-thumb]]:w-5 [&_[data-slot=slider-thumb]]:h-5 [&_[data-slot=slider-thumb]]:border-cd-gold [&_[data-slot=slider-thumb]]:bg-cd-elevated [&_[data-slot=slider-thumb]]:shadow-[0_0_12px_rgba(201,168,76,0.3)] [&_[data-slot=slider-thumb]]:hover:shadow-[0_0_20px_rgba(201,168,76,0.5)]"
                    />

                    <div className="flex justify-between mt-2">
                      <span className="text-cd-text-dim font-mono text-xs">1</span>
                      <span className="text-cd-text-dim font-mono text-xs">20</span>
                    </div>

                    <p className="text-cd-text-dim text-xs mt-3">
                      First 4 pages included in base (R3,999). Additional pages: R800 each.
                    </p>

                    <button
                      onClick={() => setStep(2)}
                      className="mt-4 inline-flex items-center gap-2 text-cd-gold text-sm font-semibold hover:gap-3 transition-all duration-300"
                    >
                      Next: Features
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Features */}
              {step >= 2 && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                >
                  <div className="glass-card rounded-xl p-6 relative overflow-hidden"
                    style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.2), 0 0 40px rgba(52,211,153,0.04)' }}
                  >
                    {/* Gradient left accent */}
                    <div
                      className="absolute top-0 left-0 bottom-0 w-[2px]"
                      style={{
                        background: 'linear-gradient(180deg, #34D399, #22D3EE)',
                        opacity: 0.4,
                      }}
                    />
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-cd-gold/8">
                        <Sparkles className="w-4 h-4 text-cd-gold" strokeWidth={1.8} />
                      </div>
                      <Label className="text-cd-text font-display font-semibold text-base cursor-default">
                        Features Needed
                      </Label>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {FEATURES.map((feature) => (
                        <label
                          key={feature.id}
                          className={`
                            flex items-center gap-3 rounded-lg px-4 py-3 cursor-pointer
                            transition-all duration-200 border
                            ${selectedFeatures.has(feature.id)
                              ? 'bg-cd-gold/6 border-cd-gold-dim'
                              : 'bg-white/[0.02] border-cd-border hover:border-cd-border-glow'}
                          `}
                        >
                          <Checkbox
                            checked={selectedFeatures.has(feature.id)}
                            onCheckedChange={() => toggleFeature(feature.id)}
                            className="border-cd-border bg-white/[0.04] data-[state=checked]:bg-cd-gold data-[state=checked]:border-cd-gold data-[state=checked]:text-cd-bg focus-visible:ring-cd-gold/30 focus-visible:ring-[3px] size-4.5"
                          />
                          <div className="flex items-center justify-between w-full">
                            <span className="text-cd-text text-sm">{feature.label}</span>
                            <span className="text-cd-text-dim font-mono text-xs">
                              +R{formatCurrency(feature.price)}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>

                    <button
                      onClick={() => setStep(3)}
                      className="mt-4 inline-flex items-center gap-2 text-cd-gold text-sm font-semibold hover:gap-3 transition-all duration-300"
                    >
                      Next: Timeline
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Timeline */}
              {step >= 3 && (
                <motion.div
                  key="timeline"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                >
                  <div className="glass-card rounded-xl p-6 relative overflow-hidden"
                    style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.2), 0 0 40px rgba(34,211,238,0.04)' }}
                  >
                    {/* Gradient left accent */}
                    <div
                      className="absolute top-0 left-0 bottom-0 w-[2px]"
                      style={{
                        background: 'linear-gradient(180deg, #22D3EE, #A78BFA)',
                        opacity: 0.4,
                      }}
                    />
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-cd-gold/8">
                        <Clock className="w-4 h-4 text-cd-gold" strokeWidth={1.8} />
                      </div>
                      <Label className="text-cd-text font-display font-semibold text-base cursor-default">
                        Timeline
                      </Label>
                    </div>

                    <RadioGroup
                      value={timeline}
                      onValueChange={(val) => setTimeline(val as TimelineValue)}
                      className="grid sm:grid-cols-3 gap-3"
                    >
                      {TIMELINE_OPTIONS.map((option) => (
                        <label
                          key={option.value}
                          className={`
                            flex items-center gap-3 rounded-lg px-4 py-3.5 cursor-pointer
                            transition-all duration-200 border
                            ${timeline === option.value
                              ? 'bg-cd-gold/6 border-cd-gold-dim'
                              : 'bg-white/[0.02] border-cd-border hover:border-cd-border-glow'}
                          `}
                        >
                          <RadioGroupItem
                            value={option.value}
                            className="border-cd-border bg-white/[0.04] text-cd-gold data-[state=checked]:border-cd-gold [&_[data-slot=radio-group-indicator]]:text-cd-gold focus-visible:ring-cd-gold/30 focus-visible:ring-[3px]"
                          />
                          <div>
                            <div className="text-cd-text text-sm font-medium">{option.label}</div>
                            <div className="text-cd-text-dim text-xs">{option.sublabel}</div>
                          </div>
                          {option.multiplier !== 1.0 && (
                            <span
                              className={`ml-auto font-mono text-xs font-bold ${
                                option.multiplier > 1 ? 'text-red-400/80' : 'text-emerald-400/80'
                              }`}
                            >
                              {option.multiplier > 1 ? '+' : ''}
                              {Math.round((option.multiplier - 1) * 100)}%
                            </span>
                          )}
                        </label>
                      ))}
                    </RadioGroup>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Comparison View Toggle */}
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="text-cd-text-dim text-sm hover:text-cd-gold transition-colors duration-200 flex items-center gap-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {showComparison ? 'Hide' : 'Show'} what&apos;s included vs excluded in {calculation.packageName}
                </button>

                <AnimatePresence>
                  {showComparison && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* Included */}
                        <div className="glass-card rounded-xl p-5 border-t-2 border-t-cd-emerald relative overflow-hidden"
                          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.15), 0 0 30px rgba(52,211,153,0.04)' }}
                        >
                          {/* Gradient left accent */}
                          <div
                            className="absolute top-0 left-0 bottom-0 w-[2px]"
                            style={{
                              background: 'linear-gradient(180deg, #34D399, transparent)',
                              opacity: 0.4,
                            }}
                          />
                          <h4 className="text-cd-emerald font-display font-semibold text-sm mb-3 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Included in {calculation.packageName}
                          </h4>
                          <ul className="space-y-2">
                            {packageInclusions.included.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-cd-text-muted text-sm">
                                <Check className="w-3.5 h-3.5 text-cd-emerald shrink-0 mt-0.5" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* Excluded */}
                        <div className="glass-card rounded-xl p-5 border-t-2 border-t-cd-rose/50 relative overflow-hidden"
                          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.15), 0 0 30px rgba(251,113,133,0.04)' }}
                        >
                          {/* Gradient left accent */}
                          <div
                            className="absolute top-0 left-0 bottom-0 w-[2px]"
                            style={{
                              background: 'linear-gradient(180deg, #FB7185, transparent)',
                              opacity: 0.4,
                            }}
                          />
                          <h4 className="text-cd-rose font-display font-semibold text-sm mb-3 flex items-center gap-2">
                            <span className="w-4 h-4 flex items-center justify-center text-cd-rose">&times;</span>
                            Not included
                          </h4>
                          <ul className="space-y-2">
                            {packageInclusions.excluded.filter(Boolean).map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-cd-text-dim text-sm">
                                <span className="w-3.5 h-3.5 flex items-center justify-center text-cd-rose/60 shrink-0 mt-0.5">&times;</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column — Output (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass-card rounded-xl p-6 lg:sticky lg:top-24 space-y-6 relative overflow-hidden"
              style={{
                boxShadow: '0 8px 40px rgba(0,0,0,0.25), 0 0 60px rgba(201,168,76,0.06)',
              }}
            >
              {/* Gradient border on result card */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{
                  background: 'linear-gradient(90deg, #C9A84C, #34D399, #22D3EE, #A78BFA, #FB7185)',
                }}
              />
              {/* Gradient left border */}
              <div
                className="absolute top-0 left-0 bottom-0 w-[2px]"
                style={{
                  background: 'linear-gradient(180deg, #C9A84C, transparent 40%, transparent 60%, #A78BFA)',
                  opacity: 0.3,
                }}
              />

              {/* Estimation Header */}
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-cd-gold/8">
                  <Calculator className="w-4 h-4 text-cd-gold" strokeWidth={1.8} />
                </div>
                <span className="text-cd-text-muted font-mono text-sm tracking-wider uppercase">
                  Your Estimate
                </span>
              </div>

              {/* Price Display with Animated Counter — gradient accent */}
              <div className="text-center py-4 relative">
                {/* Glow behind price */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)',
                  }}
                />
                <div className="font-mono text-sm text-cd-text-dim mb-2 tracking-wide relative">
                  Estimated
                </div>
                <div className="font-mono text-3xl md:text-4xl font-bold text-cd-gold tabular-nums relative"
                  style={{
                    textShadow: '0 0 30px rgba(201,168,76,0.15), 0 0 60px rgba(201,168,76,0.06)',
                  }}
                >
                  R{formatCurrency(animatedLower)} – R{formatCurrency(animatedUpper)}
                </div>
                <div className="text-cd-text-dim text-xs font-mono mt-2 relative">
                  &plusmn;15% range &middot; Midpoint: R{formatCurrency(animatedTotal)}
                </div>
              </div>

              {/* Divider — gradient */}
              <div className="h-px"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), rgba(34,211,238,0.15), transparent)',
                }}
              />

              {/* Breakdown */}
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
                {FEATURES.map((feature) => {
                  if (!selectedFeatures.has(feature.id)) return null
                  return (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-cd-text-muted">{feature.label}</span>
                      <span className="text-cd-text font-mono tabular-nums">
                        R{formatCurrency(feature.price)}
                      </span>
                    </motion.div>
                  )
                })}
                {calculation.multiplier !== 1.0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-cd-text-muted">
                      Timeline ({calculation.multiplier > 1 ? '+' : ''}{Math.round((calculation.multiplier - 1) * 100)}%)
                    </span>
                    <span className={`font-mono tabular-nums font-semibold ${calculation.multiplier > 1 ? 'text-red-400/80' : 'text-emerald-400/80'}`}>
                      {calculation.multiplier > 1 ? '+' : ''}
                      R{formatCurrency(Math.round(calculation.subtotal * (calculation.multiplier - 1)))}
                    </span>
                  </div>
                )}
              </div>

              {/* Divider — gradient */}
              <div className="h-px"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), rgba(34,211,238,0.15), transparent)',
                }}
              />

              {/* Package Match with Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-cd-text-dim" strokeWidth={1.8} />
                  <span className="text-cd-text-muted text-sm">Best Package</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={calculation.packageName}
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.9 }}
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

              {/* Divider — gradient */}
              <div className="h-px"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), rgba(34,211,238,0.15), transparent)',
                }}
              />

              {/* Share & Email Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-cd-border bg-cd-surface text-cd-text text-sm font-medium hover:border-cd-gold/40 hover:bg-cd-gold/5 transition-all duration-200"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-cd-emerald" />
                      <span className="text-cd-emerald">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Share Quote</span>
                    </>
                  )}
                </button>
                <a
                  href={mailtoLink}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-cd-border bg-cd-surface text-cd-text text-sm font-medium hover:border-cd-gold/40 hover:bg-cd-gold/5 transition-all duration-200"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Quote</span>
                </a>
              </div>

              {/* CTA — enhanced gradient accent */}
              <a
                href="#contact"
                className="group flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-lg
                  bg-cd-gold text-cd-bg font-display font-semibold text-sm
                  hover:bg-cd-gold-light transition-all duration-300
                  shadow-[0_0_25px_rgba(201,168,76,0.2),0_0_50px_rgba(201,168,76,0.06)] hover:shadow-[0_0_35px_rgba(201,168,76,0.3),0_0_70px_rgba(201,168,76,0.1)]"
              >
                Get exact quote
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
