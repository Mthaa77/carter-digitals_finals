'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, ArrowRight, Package, Clock, FileText, Sparkles } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

const FEATURES = [
  { id: 'blog', label: 'Blog', price: 2500 },
  { id: 'booking', label: 'Online Booking', price: 3000 },
  { id: 'ecommerce', label: 'E-commerce', price: 5000 },
  { id: 'portal', label: 'Staff Portal / Dashboard', price: 8000 },
  { id: 'whatsapp', label: 'WhatsApp Integration', price: 1500 },
  { id: 'googleAds', label: 'Google Ads Landing Page', price: 2000 },
] as const

type FeatureId = (typeof FEATURES)[number]['id']

const TIMELINE_OPTIONS = [
  { value: 'urgent', label: 'Urgent', sublabel: '1 week', multiplier: 1.3 },
  { value: 'standard', label: 'Standard', sublabel: '3 weeks', multiplier: 1.0 },
  { value: 'flexible', label: 'Flexible', sublabel: '6+ weeks', multiplier: 0.9 },
] as const

type TimelineValue = (typeof TIMELINE_OPTIONS)[number]['value']

function getPackage(price: number): { name: string; color: string } {
  if (price < 10000) return { name: 'Starter', color: 'text-[var(--cd-text-muted)]' }
  if (price < 17000) return { name: 'Business', color: 'text-[var(--cd-gold)]' }
  if (price < 25000) return { name: 'Growth', color: 'text-[var(--cd-gold-light)]' }
  return { name: 'Custom', color: 'text-[var(--cd-gold-light)]' }
}

function formatCurrency(value: number): string {
  return value.toLocaleString('en-ZA')
}

export default function WebsiteCostCalculator() {
  const [pages, setPages] = useState([5])
  const [selectedFeatures, setSelectedFeatures] = useState<Set<FeatureId>>(new Set())
  const [timeline, setTimeline] = useState<TimelineValue>('standard')

  const calculation = useMemo(() => {
    // Base price: R7,950 covers first 5 pages, then R800 per additional page
    const pageCount = pages[0]
    const basePrice = 7950
    const additionalPages = Math.max(0, pageCount - 5)
    const pageCost = additionalPages * 800

    // Feature costs
    let featureCost = 0
    selectedFeatures.forEach((id) => {
      const feature = FEATURES.find((f) => f.id === id)
      if (feature) featureCost += feature.price
    })

    const subtotal = basePrice + pageCost + featureCost

    // Timeline multiplier
    const timelineOption = TIMELINE_OPTIONS.find((t) => t.value === timeline)!
    const total = subtotal * timelineOption.multiplier

    // ±15% range
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
      multiplier: timelineOption.multiplier,
    }
  }, [pages, selectedFeatures, timeline])

  const toggleFeature = (id: FeatureId) => {
    setSelectedFeatures((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <section id="website-cost-calc" className="py-20 md:py-28 bg-[var(--cd-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-[var(--cd-gold)]" />
            <span className="text-[var(--cd-gold)] font-mono text-sm tracking-widest uppercase">
              Free Tool
            </span>
          </div>
          <h2 className="font-display text-[var(--text-h2)] text-[var(--cd-text)] font-bold leading-tight mb-3">
            Website Cost Calculator
          </h2>
          <p className="text-[var(--cd-text-muted)] text-lg max-w-2xl">
            Get an instant estimate based on your requirements. No email required — just honest numbers.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left Column — Inputs (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Pages Slider */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[rgba(201,168,76,0.08)]">
                    <FileText className="w-4 h-4 text-[var(--cd-gold)]" strokeWidth={1.8} />
                  </div>
                  <Label className="text-[var(--cd-text)] font-display font-semibold text-base cursor-default">
                    Number of Pages
                  </Label>
                </div>
                <span className="font-mono text-2xl font-bold text-[var(--cd-gold)] tabular-nums">
                  {pages[0]}
                </span>
              </div>

              <Slider
                value={pages}
                onValueChange={setPages}
                min={1}
                max={20}
                step={1}
                className="w-full [&_[data-slot=slider-track]]:bg-[var(--cd-border)] [&_[data-slot=slider-track]]:h-2 [&_[data-slot=slider-range]]:bg-[var(--cd-gold)] [&_[data-slot=slider-thumb]]:w-5 [&_[data-slot=slider-thumb]]:h-5 [&_[data-slot=slider-thumb]]:border-[var(--cd-gold)] [&_[data-slot=slider-thumb]]:bg-[var(--cd-elevated)] [&_[data-slot=slider-thumb]]:shadow-[0_0_12px_rgba(201,168,76,0.3)] [&_[data-slot=slider-thumb]]:hover:shadow-[0_0_20px_rgba(201,168,76,0.5)]"
              />

              <div className="flex justify-between mt-2">
                <span className="text-[var(--cd-text-dim)] font-mono text-xs">1</span>
                <span className="text-[var(--cd-text-dim)] font-mono text-xs">20</span>
              </div>

              <p className="text-[var(--cd-text-dim)] text-xs mt-3 font-sans">
                First 5 pages included in base (R7,950). Additional pages: R800 each.
              </p>
            </div>

            {/* Features Checkboxes */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[rgba(201,168,76,0.08)]">
                  <Sparkles className="w-4 h-4 text-[var(--cd-gold)]" strokeWidth={1.8} />
                </div>
                <Label className="text-[var(--cd-text)] font-display font-semibold text-base cursor-default">
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
                      ${
                        selectedFeatures.has(feature.id)
                          ? 'bg-[rgba(201,168,76,0.06)] border-[var(--cd-gold-dim)]'
                          : 'bg-[rgba(255,255,255,0.02)] border-[var(--cd-border)] hover:border-[var(--cd-border-glow)]'
                      }
                    `}
                  >
                    <Checkbox
                      checked={selectedFeatures.has(feature.id)}
                      onCheckedChange={() => toggleFeature(feature.id)}
                      className="
                        border-[var(--cd-border)] bg-[rgba(255,255,255,0.04)]
                        data-[state=checked]:bg-[var(--cd-gold)] data-[state=checked]:border-[var(--cd-gold)]
                        data-[state=checked]:text-[var(--cd-bg)]
                        focus-visible:ring-[var(--cd-gold)]/30 focus-visible:ring-[3px]
                        size-4.5
                      "
                    />
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[var(--cd-text)] text-sm font-sans">{feature.label}</span>
                      <span className="text-[var(--cd-text-dim)] font-mono text-xs">
                        +R{formatCurrency(feature.price)}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Timeline Radio */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[rgba(201,168,76,0.08)]">
                  <Clock className="w-4 h-4 text-[var(--cd-gold)]" strokeWidth={1.8} />
                </div>
                <Label className="text-[var(--cd-text)] font-display font-semibold text-base cursor-default">
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
                      ${
                        timeline === option.value
                          ? 'bg-[rgba(201,168,76,0.06)] border-[var(--cd-gold-dim)]'
                          : 'bg-[rgba(255,255,255,0.02)] border-[var(--cd-border)] hover:border-[var(--cd-border-glow)]'
                      }
                    `}
                  >
                    <RadioGroupItem
                      value={option.value}
                      className="
                        border-[var(--cd-border)] bg-[rgba(255,255,255,0.04)]
                        text-[var(--cd-gold)]
                        data-[state=checked]:border-[var(--cd-gold)]
                        [&_[data-slot=radio-group-indicator]]:text-[var(--cd-gold)]
                        focus-visible:ring-[var(--cd-gold)]/30 focus-visible:ring-[3px]
                      "
                    />
                    <div>
                      <div className="text-[var(--cd-text)] text-sm font-sans font-medium">{option.label}</div>
                      <div className="text-[var(--cd-text-dim)] text-xs font-sans">{option.sublabel}</div>
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

          {/* Right Column — Output (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass-card rounded-xl p-6 lg:sticky lg:top-24 space-y-6">
              {/* Estimation Header */}
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[rgba(201,168,76,0.08)]">
                  <Calculator className="w-4 h-4 text-[var(--cd-gold)]" strokeWidth={1.8} />
                </div>
                <span className="text-[var(--cd-text-muted)] font-mono text-sm tracking-wider uppercase">
                  Your Estimate
                </span>
              </div>

              {/* Price Display */}
              <div className="text-center py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={calculation.total}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <div className="font-mono text-sm text-[var(--cd-text-dim)] mb-2 tracking-wide">
                      Estimated
                    </div>
                    <div className="font-mono text-3xl md:text-4xl font-bold text-[var(--cd-gold)] tabular-nums">
                      R{formatCurrency(calculation.lower)} – R{formatCurrency(calculation.upper)}
                    </div>
                    <div className="text-[var(--cd-text-dim)] text-xs font-mono mt-2">
                      ±15% range &middot; Midpoint: R{formatCurrency(calculation.total)}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Divider */}
              <div className="h-px bg-[var(--cd-border)]" />

              {/* Breakdown */}
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--cd-text-muted)] font-sans">Base (5 pages)</span>
                  <span className="text-[var(--cd-text)] font-mono tabular-nums">R{formatCurrency(calculation.basePrice)}</span>
                </div>
                {calculation.pageCost > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-[var(--cd-text-muted)] font-sans">
                      Extra pages ({pages[0] - 5} × R800)
                    </span>
                    <span className="text-[var(--cd-text)] font-mono tabular-nums">
                      R{formatCurrency(calculation.pageCost)}
                    </span>
                  </motion.div>
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
                      <span className="text-[var(--cd-text-muted)] font-sans">{feature.label}</span>
                      <span className="text-[var(--cd-text)] font-mono tabular-nums">
                        R{formatCurrency(feature.price)}
                      </span>
                    </motion.div>
                  )
                })}
                {calculation.multiplier !== 1.0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-[var(--cd-text-muted)] font-sans">
                      Timeline ({calculation.multiplier > 1 ? '+' : ''}{Math.round((calculation.multiplier - 1) * 100)}%)
                    </span>
                    <span
                      className={`font-mono tabular-nums font-semibold ${
                        calculation.multiplier > 1 ? 'text-red-400/80' : 'text-emerald-400/80'
                      }`}
                    >
                      {calculation.multiplier > 1 ? '+' : ''}
                      R{formatCurrency(Math.round(calculation.subtotal * (calculation.multiplier - 1)))}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-[var(--cd-border)]" />

              {/* Package Match */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[var(--cd-text-dim)]" strokeWidth={1.8} />
                  <span className="text-[var(--cd-text-muted)] text-sm font-sans">Best Package</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={calculation.packageName}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className={`font-display font-bold text-lg ${calculation.packageColor}`}
                  >
                    {calculation.packageName}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className="group flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-lg
                  bg-[var(--cd-gold)] text-[var(--cd-bg)] font-display font-semibold text-sm
                  hover:bg-[var(--cd-gold-light)] transition-all duration-300
                  shadow-[0_0_20px_rgba(201,168,76,0.15)] hover:shadow-[0_0_30px_rgba(201,168,76,0.25)]"
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
