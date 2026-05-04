'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, ArrowRight, ShieldCheck, Building2, TrendingUp, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const BBEE_LEVELS = [
  { value: '1', label: 'Level 1' },
  { value: '2', label: 'Level 2' },
  { value: '3', label: 'Level 3' },
  { value: '4', label: 'Level 4' },
  { value: '5', label: 'Level 5' },
  { value: '6', label: 'Level 6' },
  { value: '7', label: 'Level 7' },
  { value: '8', label: 'Level 8' },
  { value: 'non-compliant', label: 'Non-compliant' },
] as const

type BbeeLevel = (typeof BBEE_LEVELS)[number]['value']

const PROCUREMENT_ELEMENTS = [
  {
    value: 'general',
    label: 'General Procurement',
    multiplier: 1.35,
    description: '135% recognition',
  },
  {
    value: 'supplier',
    label: 'Supplier Development',
    multiplier: 1.25,
    description: '125% recognition',
  },
  {
    value: 'enterprise',
    label: 'Enterprise Development',
    multiplier: 1.10,
    description: '110% recognition',
  },
] as const

type ProcurementElement = (typeof PROCUREMENT_ELEMENTS)[number]['value']

function formatCurrency(value: number): string {
  return value.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

export default function BBBEECalculator() {
  const [budget, setBudget] = useState<string>('')
  const [bbeeLevel, setBbeeLevel] = useState<BbeeLevel>('1')
  const [procurementElement, setProcurementElement] = useState<ProcurementElement>('general')

  const calculation = useMemo(() => {
    const budgetNum = parseFloat(budget.replace(/[^0-9.]/g, '')) || 0

    const selectedElement = PROCUREMENT_ELEMENTS.find((e) => e.value === procurementElement)!
    const baseMultiplier = selectedElement.multiplier

    // Level-based multiplier adjustment
    // Level 1 = full multiplier, Level 2 = 75%, Level 3 = 55%, etc.
    const levelMultipliers: Record<string, number> = {
      '1': 1.0,
      '2': 0.75,
      '3': 0.55,
      '4': 0.4,
      '5': 0.3,
      '6': 0.2,
      '7': 0.1,
      '8': 0.05,
      'non-compliant': 0,
    }

    const levelMultiplier = levelMultipliers[bbeeLevel] ?? 0

    // Carter Digitals is Level 1, so we always apply the full Level 1 supplier multiplier
    // The user's own level is informational context
    const qualifyingSpend = budgetNum * baseMultiplier
    const effectiveMultiplierPercent = Math.round(baseMultiplier * 100)

    return {
      budgetNum,
      qualifyingSpend,
      baseMultiplier,
      effectiveMultiplierPercent,
      levelMultiplier,
      selectedElement,
      isCalculated: budgetNum > 0,
    }
  }, [budget, bbeeLevel, procurementElement])

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setBudget(raw)
  }

  return (
    <section id="bbbee-calc" className="py-20 md:py-28 bg-[var(--cd-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <span className="section-label inline-block">B-BBEE Tool</span>
          <h2 className="section-heading text-[var(--text-h2)] text-[var(--cd-text)] font-bold leading-tight">
            B-BBEE Supplier Score Estimator
          </h2>
          <p className="text-[var(--cd-text-muted)] text-lg max-w-3xl leading-relaxed mt-3">
            Under South Africa&apos;s B-BBEE framework, procuring from a Level 1 supplier like
            Carter Digitals earns your company{' '}
            <span className="text-[var(--cd-gold)] font-semibold">135%</span> of the procurement
            value toward your enterprise development and supplier development scorecard targets.
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
            {/* Project Budget */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[rgba(201,168,76,0.08)]">
                  <TrendingUp className="w-4 h-4 text-[var(--cd-gold)]" strokeWidth={1.8} />
                </div>
                <Label className="text-[var(--cd-text)] font-display font-semibold text-base cursor-default">
                  Project Budget
                </Label>
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--cd-gold)] font-mono font-bold text-sm">
                  R
                </span>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 50000"
                  value={budget ? formatCurrency(Number(budget)) : ''}
                  onChange={handleBudgetChange}
                  className="
                    pl-9 h-12 text-lg font-mono tabular-nums
                    bg-[rgba(255,255,255,0.03)] border-[var(--cd-border)]
                    text-[var(--cd-text)] placeholder:text-[var(--cd-text-dim)]
                    focus-visible:border-[var(--cd-gold)] focus-visible:ring-[var(--cd-gold)]/20
                    focus-visible:ring-[3px]
                    rounded-lg
                  "
                />
              </div>

              <p className="text-[var(--cd-text-dim)] text-xs mt-3 font-sans">
                Enter your total project budget in ZAR. No commas needed.
              </p>
            </div>

            {/* B-BBEE Level */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[rgba(201,168,76,0.08)]">
                  <Building2 className="w-4 h-4 text-[var(--cd-gold)]" strokeWidth={1.8} />
                </div>
                <Label className="text-[var(--cd-text)] font-display font-semibold text-base cursor-default">
                  Your Company&apos;s B-BBEE Level
                </Label>
              </div>

              <Select value={bbeeLevel} onValueChange={(val) => setBbeeLevel(val as BbeeLevel)}>
                <SelectTrigger
                  className="
                    w-full h-11 font-sans text-sm
                    bg-[rgba(255,255,255,0.03)] border-[var(--cd-border)]
                    text-[var(--cd-text)]
                    focus:ring-[var(--cd-gold)]/20 focus:ring-[3px]
                    [&[data-state=open]]:border-[var(--cd-gold)]
                  "
                  aria-label="Select your company's B-BBEE level"
                >
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent
                  className="
                    bg-[var(--cd-surface)] border-[var(--cd-border)]
                    text-[var(--cd-text)]
                  "
                >
                  {BBEE_LEVELS.map((level) => (
                    <SelectItem
                      key={level.value}
                      value={level.value}
                      className="
                        focus:bg-[rgba(201,168,76,0.08)] focus:text-[var(--cd-text)]
                        font-sans text-sm
                      "
                    >
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <p className="text-[var(--cd-text-dim)] text-xs mt-3 font-sans">
                Your own company&apos;s level — helps contextualise the benefit.
              </p>
            </div>

            {/* Procurement Element */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[rgba(201,168,76,0.08)]">
                  <ShieldCheck className="w-4 h-4 text-[var(--cd-gold)]" strokeWidth={1.8} />
                </div>
                <Label className="text-[var(--cd-text)] font-display font-semibold text-base cursor-default">
                  Procurement Element
                </Label>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                {PROCUREMENT_ELEMENTS.map((element) => (
                  <button
                    key={element.value}
                    type="button"
                    onClick={() => setProcurementElement(element.value)}
                    className={`
                      rounded-lg px-4 py-3.5 text-left cursor-pointer
                      transition-all duration-200 border
                      ${
                        procurementElement === element.value
                          ? 'bg-[rgba(201,168,76,0.06)] border-[var(--cd-gold-dim)]'
                          : 'bg-[rgba(255,255,255,0.02)] border-[var(--cd-border)] hover:border-[var(--cd-border-glow)]'
                      }
                    `}
                  >
                    <div className="text-[var(--cd-text)] text-sm font-sans font-medium mb-0.5">
                      {element.label}
                    </div>
                    <div className="text-[var(--cd-gold)] font-mono text-xs font-bold">
                      {element.description}
                    </div>
                  </button>
                ))}
              </div>
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
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[rgba(201,168,76,0.08)]">
                  <Award className="w-4 h-4 text-[var(--cd-gold)]" strokeWidth={1.8} />
                </div>
                <span className="text-[var(--cd-text-muted)] font-mono text-sm tracking-wider uppercase">
                  Qualifying Spend
                </span>
              </div>

              {/* Qualifying Spend Value */}
              <div className="text-center py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${calculation.qualifyingSpend}-${calculation.effectiveMultiplierPercent}`}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {calculation.isCalculated ? (
                      <>
                        <div className="font-mono text-sm text-[var(--cd-text-dim)] mb-2 tracking-wide">
                          Your qualifying spend value
                        </div>
                        <div className="font-mono text-3xl md:text-4xl font-bold text-[var(--cd-gold)] tabular-nums">
                          R{formatCurrency(calculation.qualifyingSpend)}
                        </div>
                        <div className="text-[var(--cd-text-dim)] text-xs font-mono mt-2">
                          R{formatCurrency(calculation.budgetNum)} × {calculation.effectiveMultiplierPercent}% = R{formatCurrency(calculation.qualifyingSpend)}
                        </div>
                      </>
                    ) : (
                      <div>
                        <div className="font-mono text-sm text-[var(--cd-text-dim)] mb-2 tracking-wide">
                          Enter a budget to calculate
                        </div>
                        <div className="font-mono text-3xl md:text-4xl font-bold text-[var(--cd-text-dim)] tabular-nums">
                          R —
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Divider */}
              <div className="h-px bg-[var(--cd-border)]" />

              {/* Multiplier Applied */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--cd-text-muted)] font-sans">Multiplier Applied</span>
                  <span className="text-[var(--cd-gold)] font-mono font-bold tabular-nums">
                    {calculation.effectiveMultiplierPercent}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--cd-text-muted)] font-sans">Procurement Element</span>
                  <span className="text-[var(--cd-text)] font-sans text-sm">
                    {calculation.selectedElement.label}
                  </span>
                </div>
                {calculation.isCalculated && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-[var(--cd-text-muted)] font-sans">Additional Value</span>
                    <span className="text-emerald-400/80 font-mono font-bold tabular-nums">
                      +R{formatCurrency(calculation.qualifyingSpend - calculation.budgetNum)}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-[var(--cd-border)]" />

              {/* Carter Digitals Status */}
              <div className="rounded-lg bg-[rgba(201,168,76,0.04)] border border-[var(--cd-gold-dim)]/40 p-4 space-y-2.5">
                <div className="text-[var(--cd-text-muted)] text-xs font-mono tracking-wider uppercase mb-3">
                  Carter Digitals&apos; Status
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--cd-gold)]" strokeWidth={2} />
                  <span className="text-[var(--cd-text)] text-sm font-sans font-medium">
                    Level 1 B-BBEE Contributor
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--cd-gold)]" strokeWidth={2} />
                  <span className="text-[var(--cd-text)] text-sm font-sans font-medium">
                    100% Black-Owned
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--cd-gold)]" strokeWidth={2} />
                  <span className="text-[var(--cd-text)] text-sm font-sans font-medium">
                    Qualifying Supplier
                  </span>
                </div>
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className="group flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-lg
                  bg-[var(--cd-gold)] text-[var(--cd-bg)] font-display font-semibold text-sm
                  hover:bg-[var(--cd-gold-light)] transition-all duration-300
                  shadow-[0_0_20px_rgba(201,168,76,0.15)] hover:shadow-[0_0_30px_rgba(201,168,76,0.25)]"
              >
                Start a project with a qualifying supplier
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
