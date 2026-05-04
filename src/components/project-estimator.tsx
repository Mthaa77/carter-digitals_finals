'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, LayoutDashboard, TrendingUp, ArrowRight, ArrowLeft, Check, Calculator } from 'lucide-react'

type ServiceType = 'sme' | 'dashboard' | 'seo'

interface ServiceOption {
  id: ServiceType
  title: string
  description: string
  icon: React.ReactNode
  basePrice: number
  features: { name: string; price: number }[]
}

const services: ServiceOption[] = [
  {
    id: 'sme',
    title: 'SME Website',
    description: 'A professional web presence designed to convert visitors into customers.',
    icon: <Globe className="w-8 h-8" />,
    basePrice: 7950,
    features: [
      { name: 'Responsive Design', price: 800 },
      { name: 'CMS Access', price: 1200 },
      { name: 'E-commerce', price: 1500 },
      { name: 'Contact Form', price: 800 },
      { name: 'SEO Setup', price: 1000 },
      { name: 'Analytics', price: 900 },
    ],
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Data-driven dashboards and internal tools for smarter operations.',
    icon: <LayoutDashboard className="w-8 h-8" />,
    basePrice: 12500,
    features: [
      { name: 'Real-time Data', price: 1500 },
      { name: 'User Auth', price: 1200 },
      { name: 'Charts', price: 1000 },
      { name: 'Export to PDF', price: 800 },
      { name: 'API Integration', price: 1500 },
      { name: 'Notifications', price: 900 },
    ],
  },
  {
    id: 'seo',
    title: 'SEO & Growth',
    description: 'Get found on Google and grow your traffic with proven strategies.',
    icon: <TrendingUp className="w-8 h-8" />,
    basePrice: 9500,
    features: [
      { name: 'Keyword Research', price: 1000 },
      { name: 'Content Strategy', price: 1200 },
      { name: 'Google Ads Setup', price: 1500 },
      { name: 'Social Media', price: 900 },
      { name: 'Analytics', price: 800 },
      { name: 'Link Building', price: 1100 },
    ],
  },
]

export default function ProjectEstimator() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null)
  const [selectedFeatures, setSelectedFeatures] = useState<Set<number>>(new Set())

  const currentService = useMemo(
    () => services.find((s) => s.id === selectedService),
    [selectedService]
  )

  const estimate = useMemo(() => {
    if (!currentService) return { min: 0, max: 0, weeks: '' }
    const featureTotal = currentService.features
      .filter((_, i) => selectedFeatures.has(i))
      .reduce((sum, f) => sum + f.price, 0)
    const total = currentService.basePrice + featureTotal
    const featureCount = selectedFeatures.size
    const baseWeeks = currentService.id === 'dashboard' ? 3 : 2
    const extraWeeks = Math.ceil(featureCount / 2)
    const minWeeks = baseWeeks + extraWeeks
    const maxWeeks = minWeeks + 1
    return {
      min: total,
      max: total + 2000,
      weeks: `${minWeeks}–${maxWeeks} weeks`,
    }
  }, [currentService, selectedFeatures])

  const toggleFeature = (index: number) => {
    setSelectedFeatures((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
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

  return (
    <section id="estimator" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <p className="mt-4 text-cd-text-muted text-lg max-w-xl mx-auto font-sans">
            Select your service, choose features, and see a price range — no commitment needed.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            {['Select Service', 'Choose Features', 'Get Estimate'].map(
              (label, i) => (
                <span
                  key={i}
                  className={`text-xs sm:text-sm font-medium font-sans transition-colors duration-300 ${
                    step > i
                      ? 'text-cd-gold'
                      : step === i + 1
                        ? 'text-cd-text'
                        : 'text-cd-text-dim'
                  }`}
                >
                  {label}
                </span>
              )
            )}
          </div>
          <div className="h-1.5 bg-cd-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, #7A6330, #C9A84C, #E8CA7A)',
              }}
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
                  >
                    <div className="w-14 h-14 rounded-lg bg-cd-gold/10 flex items-center justify-center text-cd-gold mb-4 group-hover:bg-cd-gold/20 transition-colors duration-300">
                      {service.icon}
                    </div>
                    <h3 className="font-display text-lg font-bold text-cd-text mb-2 group-hover:text-cd-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-cd-text-muted text-sm leading-relaxed font-sans mb-3">
                      {service.description}
                    </p>
                    <span className="text-cd-gold text-sm font-mono font-semibold">
                      From {formatPrice(service.basePrice)}
                    </span>
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
                  <p className="text-cd-text-muted text-sm font-sans mb-6">
                    Select the features you need. Each adds to your base price.
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
                      >
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors duration-300 ${
                            selectedFeatures.has(i)
                              ? 'bg-cd-gold text-cd-bg'
                              : 'border border-cd-border-glow'
                          }`}
                        >
                          {selectedFeatures.has(i) && (
                            <Check className="w-3 h-3" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium text-cd-text font-sans">
                            {feature.name}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-cd-gold shrink-0">
                          +{formatPrice(feature.price)}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Get Estimate */}
            {step === 3 && currentService && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-xl p-6 sm:p-8"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-cd-gold/10 flex items-center justify-center mx-auto mb-5">
                    <Calculator className="w-8 h-8 text-cd-gold" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-cd-text mb-2">
                    Your Project Estimate
                  </h3>
                  <p className="text-cd-text-muted text-sm font-sans mb-8">
                    Based on {currentService.title} with {selectedFeatures.size} feature
                    {selectedFeatures.size !== 1 ? 's' : ''}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {/* Price */}
                    <div className="bg-cd-surface rounded-lg p-5 border border-cd-border">
                      <span className="text-cd-text-dim text-xs uppercase tracking-widest font-mono">
                        Estimated Price
                      </span>
                      <div className="mt-2">
                        <span className="font-display text-3xl sm:text-4xl font-bold gold-gradient-text">
                          {formatPrice(estimate.min)}
                        </span>
                        <span className="text-cd-text-dim text-lg"> – </span>
                        <span className="font-display text-3xl sm:text-4xl font-bold gold-gradient-text">
                          {formatPrice(estimate.max)}
                        </span>
                      </div>
                    </div>
                    {/* Timeline */}
                    <div className="bg-cd-surface rounded-lg p-5 border border-cd-border">
                      <span className="text-cd-text-dim text-xs uppercase tracking-widest font-mono">
                        Estimated Timeline
                      </span>
                      <div className="mt-2">
                        <span className="font-display text-3xl sm:text-4xl font-bold text-cd-text">
                          {estimate.weeks}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Selected features summary */}
                  {selectedFeatures.size > 0 && (
                    <div className="mb-8 text-left">
                      <span className="text-cd-text-dim text-xs uppercase tracking-widest font-mono">
                        Selected Features
                      </span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {currentService.features
                          .filter((_, i) => selectedFeatures.has(i))
                          .map((f, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-cd-gold/10 border border-cd-gold/20 text-cd-gold text-xs font-medium font-sans"
                            >
                              <Check className="w-3 h-3" />
                              {f.name}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                  <a
                    href="#contact"
                    className="btn-press btn-glow-gold inline-flex items-center gap-2 px-8 py-3.5 bg-cd-gold text-cd-bg font-bold rounded-lg hover:bg-cd-gold-light transition-colors duration-300 font-sans text-sm"
                  >
                    Get a Detailed Quote
                    <ArrowRight className="w-4 h-4" />
                  </a>
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
              className="btn-press inline-flex items-center gap-2 px-6 py-2.5 border border-cd-border rounded-lg text-cd-text-muted hover:text-cd-text hover:border-cd-border-glow transition-all duration-300 font-sans text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
            {step === 2 && (
              <button
                onClick={handleNext}
                className="btn-press inline-flex items-center gap-2 px-6 py-2.5 bg-cd-gold text-cd-bg font-bold rounded-lg hover:bg-cd-gold-light transition-colors duration-300 font-sans text-sm"
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
