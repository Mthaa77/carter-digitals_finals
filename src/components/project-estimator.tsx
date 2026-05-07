'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe, LayoutDashboard, TrendingUp, ArrowRight, ArrowLeft, Check,
  Calculator, Copy, CheckCircle2, Clock, Package
} from 'lucide-react'

type ServiceType = 'sme' | 'dashboard' | 'seo'

interface ServiceOption {
  id: ServiceType
  title: string
  description: string
  icon: React.ReactNode
  basePrice: number
  baseWeeks: number
  features: { name: string; price: number; description: string; weekCost: number }[]
}

const services: ServiceOption[] = [
  {
    id: 'sme',
    title: 'SME Website',
    description: 'A professional web presence designed to convert visitors into customers.',
    icon: <Globe className="w-8 h-8" />,
    basePrice: 7950,
    baseWeeks: 2,
    features: [
      { name: 'Responsive Design', price: 800, description: 'Looks great on all devices', weekCost: 0.5 },
      { name: 'CMS Access', price: 1200, description: 'Update your own content', weekCost: 1 },
      { name: 'E-commerce', price: 1500, description: 'Sell products online', weekCost: 1 },
      { name: 'Contact Form', price: 800, description: 'Capture leads directly', weekCost: 0.5 },
      { name: 'SEO Setup', price: 1000, description: 'Get found on Google', weekCost: 0.5 },
      { name: 'Analytics', price: 900, description: 'Track visitor behaviour', weekCost: 0.5 },
    ],
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Data-driven dashboards and internal tools for smarter operations.',
    icon: <LayoutDashboard className="w-8 h-8" />,
    basePrice: 12500,
    baseWeeks: 3,
    features: [
      { name: 'Real-time Data', price: 1500, description: 'Live data feeds', weekCost: 1 },
      { name: 'User Auth', price: 1200, description: 'Secure login system', weekCost: 1 },
      { name: 'Charts', price: 1000, description: 'Visual data representation', weekCost: 0.5 },
      { name: 'Export to PDF', price: 800, description: 'Download reports as PDFs', weekCost: 0.5 },
      { name: 'API Integration', price: 1500, description: 'Connect external services', weekCost: 1 },
      { name: 'Notifications', price: 900, description: 'Email & push alerts', weekCost: 0.5 },
    ],
  },
  {
    id: 'seo',
    title: 'SEO & Growth',
    description: 'Get found on Google and grow your traffic with proven strategies.',
    icon: <TrendingUp className="w-8 h-8" />,
    basePrice: 9500,
    baseWeeks: 2,
    features: [
      { name: 'Keyword Research', price: 1000, description: 'Find the right keywords', weekCost: 0.5 },
      { name: 'Content Strategy', price: 1200, description: 'Plan your content calendar', weekCost: 1 },
      { name: 'Google Ads Setup', price: 1500, description: 'Launch paid campaigns', weekCost: 1 },
      { name: 'Social Media', price: 900, description: 'Social presence optimisation', weekCost: 0.5 },
      { name: 'Analytics', price: 800, description: 'Track campaign performance', weekCost: 0.5 },
      { name: 'Link Building', price: 1100, description: 'Build domain authority', weekCost: 0.5 },
    ],
  },
]

export default function ProjectEstimator() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null)
  const [selectedFeatures, setSelectedFeatures] = useState<Set<number>>(new Set())
  const [copied, setCopied] = useState(false)

  const currentService = useMemo(
    () => services.find((s) => s.id === selectedService),
    [selectedService]
  )

  const estimate = useMemo(() => {
    if (!currentService) return { min: 0, max: 0, totalWeeks: 0, featureCount: 0 }
    const featureTotal = currentService.features
      .filter((_, i) => selectedFeatures.has(i))
      .reduce((sum, f) => sum + f.price, 0)
    const total = currentService.basePrice + featureTotal
    const featureWeeks = currentService.features
      .filter((_, i) => selectedFeatures.has(i))
      .reduce((sum, f) => sum + f.weekCost, 0)
    const totalWeeks = Math.ceil(currentService.baseWeeks + featureWeeks)
    return {
      min: total,
      max: total + 2000,
      totalWeeks,
      featureCount: selectedFeatures.size,
    }
  }, [currentService, selectedFeatures])

  const selectedFeaturesList = useMemo(() => {
    if (!currentService) return []
    return currentService.features
      .filter((_, i) => selectedFeatures.has(i))
  }, [currentService, selectedFeatures])

  const toggleFeature = (index: number) => {
    setSelectedFeatures((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const handleServiceSelect = (id: ServiceType) => {
    setSelectedService(id)
    setSelectedFeatures(new Set())
    setStep(2)
  }

  const handleNext = () => {
    if (step === 2) setStep(3)
  }

  const handlePrev = () => {
    if (step === 2) {
      setStep(1)
      setSelectedFeatures(new Set())
    } else if (step === 3) {
      setStep(2)
    }
  }

  const formatPrice = (n: number) =>
    `R${n.toLocaleString('en-ZA')}`

  const handleShare = useCallback(() => {
    if (!currentService) return
    const text = [
      `Project Estimate — Carter Digitals`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Service: ${currentService.title}`,
      `Features: ${selectedFeaturesList.map(f => f.name).join(', ') || 'None'}`,
      ``,
      `Estimated Price: ${formatPrice(estimate.min)} – ${formatPrice(estimate.max)}`,
      `Estimated Timeline: ${estimate.totalWeeks} weeks`,
      ``,
      `Get yours: carterdigitals.co.za/tools/project-estimator`,
    ].join('\n')

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }, [currentService, selectedFeaturesList, estimate])

  // Timeline visualization data
  const timelinePhases = useMemo(() => {
    if (!currentService) return []
    const phases = [
      { name: 'Discovery & Planning', weeks: 1, color: 'bg-cd-gold' },
      { name: 'Design', weeks: Math.ceil(currentService.baseWeeks / 2), color: 'bg-cd-emerald' },
      { name: 'Development', weeks: currentService.baseWeeks, color: 'bg-cd-cyan' },
    ]
    // Add feature phases
    if (selectedFeatures.size > 0) {
      phases.push({
        name: 'Feature Integration',
        weeks: Math.ceil(estimate.totalWeeks - currentService.baseWeeks - 1.5),
        color: 'bg-cd-violet',
      })
    }
    phases.push({ name: 'Testing & Launch', weeks: 1, color: 'bg-cd-rose' })
    return phases
  }, [currentService, selectedFeatures, estimate.totalWeeks])

  const totalTimelineWeeks = timelinePhases.reduce((sum, p) => sum + p.weeks, 0)

  return (
    <section id="estimator" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="section-label inline-block">Estimate Your Project</span>
          <h2 className="section-heading text-[var(--text-h2)]">
            Get an <span className="gold-gradient-text">Instant</span> Estimate
          </h2>
          <p className="mt-4 text-cd-text-muted text-lg max-w-xl mx-auto">
            Select your service, choose features, and see a price range — no commitment needed.
          </p>
        </motion.div>

        {/* Enhanced Progress Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            {['Select Service', 'Choose Features', 'Get Estimate'].map(
              (label, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`
                    flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold font-mono
                    transition-all duration-300
                    ${step > i + 1 ? 'bg-cd-emerald text-cd-bg' : step === i + 1 ? 'bg-cd-gold text-cd-bg' : 'bg-cd-border text-cd-text-dim'}
                  `}>
                    {step > i + 1 ? <Check className="w-3.5 h-3.5" /> : i + 1}
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${
                      step > i
                        ? 'text-cd-gold'
                        : step === i + 1
                          ? 'text-cd-text'
                          : 'text-cd-text-dim'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              )
            )}
          </div>
          <div className="h-2 bg-cd-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cd-gold-dim via-cd-gold to-cd-gold-light"
              initial={{ width: '0%' }}
              animate={{
                width: step === 1 ? '16%' : step === 2 ? '50%' : '100%',
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="relative min-h-[320px]">
          <AnimatePresence mode="wait">
            {/* Step 1: Select Service */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-5"
              >
                {services.map((service) => (
                  <motion.button
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className="glass-card rounded-xl p-6 text-left group cursor-pointer transition-[border-color,box-shadow] duration-300 hover:border-cd-gold/40"
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={`Select ${service.title} service starting from ${formatPrice(service.basePrice)}`}
                  >
                    <div className="w-14 h-14 rounded-lg bg-cd-gold/10 flex items-center justify-center text-cd-gold mb-4 group-hover:bg-cd-gold/20 transition-colors duration-300">
                      {service.icon}
                    </div>
                    <h3 className="font-display text-lg font-bold text-cd-text mb-2 group-hover:text-cd-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-cd-text-muted text-sm leading-relaxed mb-3">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-cd-gold text-sm font-mono font-semibold">
                        From {formatPrice(service.basePrice)}
                      </span>
                      <span className="text-cd-text-dim text-xs font-mono">
                        ~{service.baseWeeks} weeks
                      </span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Step 2: Choose Features */}
            {step === 2 && currentService && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4 }}
              >
                <div className="glass-card rounded-xl p-6 sm:p-8">
                  <h3 className="font-display text-xl font-bold text-cd-text mb-1">
                    {currentService.title} Features
                  </h3>
                  <p className="text-cd-text-muted text-sm mb-6">
                    Select the features you need. Each adds to your base price and timeline.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentService.features.map((feature, i) => (
                      <motion.button
                        key={i}
                        onClick={() => toggleFeature(i)}
                        className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 text-left cursor-pointer ${
                          selectedFeatures.has(i)
                            ? 'border-cd-gold/50 bg-cd-gold/8'
                            : 'border-cd-border bg-cd-surface/50 hover:border-cd-border-glow'
                        }`}
                        whileTap={{ scale: 0.97 }}
                        aria-label={`${selectedFeatures.has(i) ? 'Remove' : 'Add'} ${feature.name} feature, +${formatPrice(feature.price)}`}
                        aria-pressed={selectedFeatures.has(i)}
                      >
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors duration-300 ${
                            selectedFeatures.has(i)
                              ? 'bg-cd-gold text-cd-bg'
                              : 'border border-cd-border-glow'
                          }`}
                        >
                          {selectedFeatures.has(i) && <Check className="w-3 h-3" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium text-cd-text block">
                            {feature.name}
                          </span>
                          <span className="text-xs text-cd-text-dim block mt-0.5">
                            {feature.description}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-mono text-cd-gold block">
                            +{formatPrice(feature.price)}
                          </span>
                          <span className="text-[10px] font-mono text-cd-text-dim block">
                            +{feature.weekCost}w
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Feature Comparison Summary */}
                  {selectedFeatures.size > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 bg-cd-surface rounded-lg p-4 border border-cd-border"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-cd-text-dim text-xs uppercase tracking-wider font-mono">
                          Running Total
                        </span>
                        <span className="text-cd-gold font-mono font-bold">
                          {formatPrice(currentService.basePrice + selectedFeaturesList.reduce((s, f) => s + f.price, 0))}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-cd-text-dim text-xs uppercase tracking-wider font-mono">
                          Selected Features
                        </span>
                        <span className="text-cd-text font-mono">
                          {selectedFeatures.size} / {currentService.features.length}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Summary Card */}
            {step === 3 && currentService && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4 }}
              >
                <div className="glass-card rounded-xl p-6 sm:p-8">
                  {/* Summary Card Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-cd-gold/10 flex items-center justify-center mx-auto mb-5">
                      <Calculator className="w-8 h-8 text-cd-gold" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-cd-text mb-2">
                      Your Project Estimate
                    </h3>
                    <p className="text-cd-text-muted text-sm">
                      {currentService.title} with {selectedFeatures.size} feature{selectedFeatures.size !== 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* Price & Timeline Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="bg-cd-surface rounded-lg p-5 border border-cd-border text-center">
                      <Package className="w-5 h-5 text-cd-gold mx-auto mb-2" />
                      <span className="text-cd-text-dim text-xs uppercase tracking-widest font-mono">
                        Estimated Price
                      </span>
                      <div className="mt-2">
                        <span className="font-display text-3xl sm:text-4xl font-bold text-cd-gold">
                          {formatPrice(estimate.min)}
                        </span>
                        <span className="text-cd-text-dim text-lg"> &ndash; </span>
                        <span className="font-display text-3xl sm:text-4xl font-bold text-cd-gold">
                          {formatPrice(estimate.max)}
                        </span>
                      </div>
                    </div>
                    <div className="bg-cd-surface rounded-lg p-5 border border-cd-border text-center">
                      <Clock className="w-5 h-5 text-cd-cyan mx-auto mb-2" />
                      <span className="text-cd-text-dim text-xs uppercase tracking-widest font-mono">
                        Estimated Timeline
                      </span>
                      <div className="mt-2">
                        <span className="font-display text-3xl sm:text-4xl font-bold text-cd-text">
                          ~{estimate.totalWeeks} weeks
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Gantt Chart */}
                  <div className="mb-8">
                    <h4 className="text-cd-text-dim text-xs uppercase tracking-widest font-mono mb-3">
                      Project Timeline
                    </h4>
                    <div className="bg-cd-surface rounded-lg p-4 border border-cd-border">
                      <div className="flex gap-0.5 h-10 rounded-md overflow-hidden">
                        {timelinePhases.map((phase, i) => {
                          const widthPercent = (phase.weeks / totalTimelineWeeks) * 100
                          return (
                            <motion.div
                              key={i}
                              initial={{ width: 0 }}
                              animate={{ width: `${widthPercent}%` }}
                              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                              className={`${phase.color} rounded-sm flex items-center justify-center relative group/phase min-w-[20px]`}
                            >
                              <span className="text-[9px] font-mono text-cd-bg font-bold truncate px-1 hidden sm:block">
                                {phase.name}
                              </span>
                              {/* Tooltip on hover */}
                              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-cd-bg border border-cd-border rounded-md px-2 py-1 text-[10px] text-cd-text whitespace-nowrap opacity-0 group-hover/phase:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                                {phase.name} ({phase.weeks}w)
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                      {/* Legend */}
                      <div className="flex flex-wrap gap-3 mt-3">
                        {timelinePhases.map((phase, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <div className={`w-2.5 h-2.5 rounded-sm ${phase.color}`} />
                            <span className="text-[10px] text-cd-text-dim">{phase.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Selected Features Summary */}
                  {selectedFeatures.size > 0 && (
                    <div className="mb-8">
                      <h4 className="text-cd-text-dim text-xs uppercase tracking-widest font-mono mb-3">
                        Selected Features
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedFeaturesList.map((f, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cd-gold/10 border border-cd-gold/20 text-cd-gold text-xs font-medium"
                          >
                            <Check className="w-3 h-3" />
                            {f.name}
                            <span className="text-cd-gold-dim font-mono">+{formatPrice(f.price)}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-cd-border bg-cd-surface text-cd-text text-sm font-medium hover:border-cd-gold/40 hover:bg-cd-gold/5 transition-all duration-200"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-cd-emerald" />
                          <span className="text-cd-emerald">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Share Estimate</span>
                        </>
                      )}
                    </button>
                    <a
                      href="#contact"
                      className="btn-press btn-glow-gold inline-flex items-center gap-2 px-8 py-3.5 bg-cd-gold text-cd-bg font-bold rounded-lg hover:bg-cd-gold-light transition-colors duration-300 text-sm"
                    >
                      Get a Detailed Quote
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        {step > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mt-8"
          >
            <button
              onClick={handlePrev}
              className="btn-press inline-flex items-center gap-2 px-6 py-2.5 border border-cd-border rounded-lg text-cd-text-muted hover:text-cd-text hover:border-cd-border-glow transition-all duration-300 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
            {step === 2 && (
              <button
                onClick={handleNext}
                className="btn-press inline-flex items-center gap-2 px-6 py-2.5 bg-cd-gold text-cd-bg font-bold rounded-lg hover:bg-cd-gold-light transition-colors duration-300 text-sm"
              >
                See Estimate
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
