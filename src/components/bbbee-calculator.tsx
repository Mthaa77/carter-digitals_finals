'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Award, ArrowRight, ShieldCheck, Building2, TrendingUp, CheckCircle2,
  Copy, ChevronDown, ChevronUp, Lightbulb, HelpCircle, Calendar
} from 'lucide-react'
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
  { value: 'general', label: 'General Procurement', multiplier: 1.35, description: '135% recognition' },
  { value: 'supplier', label: 'Supplier Development', multiplier: 1.25, description: '125% recognition' },
  { value: 'enterprise', label: 'Enterprise Development', multiplier: 1.10, description: '110% recognition' },
] as const

type ProcurementElement = (typeof PROCUREMENT_ELEMENTS)[number]['value']

// B-BBEE Scorecard Elements (simplified for the estimator)
const SCORECARD_ELEMENTS = [
  { name: 'Ownership', weight: 25, maxPoints: 25, color: 'bg-cd-gold' },
  { name: 'Management Control', weight: 19, maxPoints: 19, color: 'bg-cd-emerald' },
  { name: 'Skills Development', weight: 20, maxPoints: 20, color: 'bg-cd-cyan' },
  { name: 'Enterprise & Supplier Development', weight: 40, maxPoints: 44, color: 'bg-cd-violet', isProcurement: true },
  { name: 'Socio-Economic Development', weight: 15, maxPoints: 15, color: 'bg-cd-rose' },
]

const PROCUREMENT_TIPS = [
  {
    title: 'Prioritise Level 1 Suppliers',
    description: 'Spending with Level 1 B-BBEE contributors earns you 135% recognition — the highest possible procurement claim per rand spent.',
    icon: '🏆',
  },
  {
    title: 'Document All Spend Carefully',
    description: 'Ensure invoices and B-BBEE certificates are valid and on file. Expired or invalid certificates cannot be claimed on your scorecard.',
    icon: '📋',
  },
  {
    title: 'Split Between Procurement Categories',
    description: 'Maximise points by allocating spend across General Procurement, Supplier Development, and Enterprise Development categories.',
    icon: '📊',
  },
  {
    title: 'Plan Spend Before Financial Year-End',
    description: 'Structure your procurement early. Late-year spending may not be processed in time for your verification audit.',
    icon: '⏰',
  },
  {
    title: 'Use ESD Beneficiaries',
    description: 'Enterprise & Supplier Development spend with qualifying black-owned SMEs earns bonus points on top of procurement recognition.',
    icon: '🤝',
  },
]

const FAQ_ITEMS = [
  {
    question: 'What is B-BBEE procurement recognition?',
    answer: 'When you procure goods or services from a B-BBEE compliant supplier, you can claim a percentage of that spend on your own B-BBEE scorecard. A Level 1 supplier like Carter Digitals earns you 135% — meaning for every R100 spent, you claim R135 on your procurement scorecard.',
  },
  {
    question: 'Why does Carter Digitals qualify for 135%?',
    answer: 'Carter Digitals is a 100% Black-Owned, B-BBEE Level 1, Youth-Owned enterprise. Under the B-BBEE Codes of Good Practice, Level 1 contributors receive the highest procurement recognition multiplier of 135%.',
  },
  {
    question: 'What is the difference between General Procurement and Supplier Development?',
    answer: 'General Procurement (135%) is standard spend on goods/services. Supplier Development (125%) involves active investment in developing a supplier\'s capacity. Enterprise Development (110%) supports the growth of black-owned businesses through monetary or non-monetary contributions.',
  },
  {
    question: 'How does this affect my company\'s B-BBEE score?',
    answer: 'The Enterprise & Supplier Development element carries 44 points on the revised scorecard (the largest single element). Procuring from Level 1 suppliers directly impacts up to 25 of those points in the Preferential Procurement sub-element.',
  },
  {
    question: 'Can I claim spend from previous years?',
    answer: 'B-BBEE verification typically looks at the most recent 12-month period. However, Supplier and Enterprise Development contributions can sometimes be averaged over the measurement period. Consult your verification agency for specific guidance.',
  },
  {
    question: 'Is Carter Digitals on the CSD (Central Supplier Database)?',
    answer: 'Yes, Carter Digitals is registered on the South African government\'s Central Supplier Database (CSD), making it easy to work with government entities and SOEs that require CSD-registered suppliers.',
  },
]

function formatCurrency(value: number): string {
  return value.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

export default function BBBEECalculator() {
  const [budget, setBudget] = useState<string>('')
  const [bbeeLevel, setBbeeLevel] = useState<BbeeLevel>('1')
  const [procurementElement, setProcurementElement] = useState<ProcurementElement>('general')
  const [copied, setCopied] = useState(false)
  const [showTips, setShowTips] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const calculation = useMemo(() => {
    const budgetNum = parseFloat(budget.replace(/[^0-9.]/g, '')) || 0
    const selectedElement = PROCUREMENT_ELEMENTS.find((e) => e.value === procurementElement)!
    const baseMultiplier = selectedElement.multiplier
    const qualifyingSpend = budgetNum * baseMultiplier
    const effectiveMultiplierPercent = Math.round(baseMultiplier * 100)

    // Level-based multiplier
    const levelMultipliers: Record<string, number> = {
      '1': 1.0, '2': 0.75, '3': 0.55, '4': 0.4, '5': 0.3,
      '6': 0.2, '7': 0.1, '8': 0.05, 'non-compliant': 0,
    }
    const levelMultiplier = levelMultipliers[bbeeLevel] ?? 0

    // Multi-year projection
    const yearProjections = [1, 2, 3].map(year => {
      const annualSpend = budgetNum * year
      const projectedQualifying = annualSpend * baseMultiplier
      // Simplified scorecard impact: procurement points earned
      const procurementPointsEarned = Math.min(25, (projectedQualifying / 1000000) * 25)
      return {
        year,
        totalSpend: annualSpend,
        qualifyingSpend: Math.round(projectedQualifying),
        procurementPoints: Math.round(procurementPointsEarned * 10) / 10,
      }
    })

    return {
      budgetNum,
      qualifyingSpend,
      baseMultiplier,
      effectiveMultiplierPercent,
      levelMultiplier,
      selectedElement,
      isCalculated: budgetNum > 0,
      yearProjections,
    }
  }, [budget, bbeeLevel, procurementElement])

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setBudget(raw)
  }

  const handleShare = useCallback(() => {
    if (!calculation.isCalculated) return
    const text = [
      `B-BBEE Supplier Score Estimate — Carter Digitals`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Project Budget: R${formatCurrency(calculation.budgetNum)}`,
      `Procurement Element: ${calculation.selectedElement.label}`,
      `Multiplier: ${calculation.effectiveMultiplierPercent}%`,
      ``,
      `Qualifying Spend: R${formatCurrency(calculation.qualifyingSpend)}`,
      `Additional Value: +R${formatCurrency(calculation.qualifyingSpend - calculation.budgetNum)}`,
      ``,
      `Multi-Year Projection:`,
      ...calculation.yearProjections.map(y =>
        `  Year ${y.year}: R${formatCurrency(y.totalSpend)} spend → R${formatCurrency(y.qualifyingSpend)} qualifying (${y.procurementPoints}/25 pts)`
      ),
      ``,
      `Carter Digitals: 100% Black-Owned, B-BBEE Level 1, Youth-Owned`,
      `Estimate yours: carterdigitals.co.za/tools/bbbee-calculator`,
    ].join('\n')

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }, [calculation])

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
          <h2 className="section-heading text-[var(--text-h2)] text-cd-text font-bold leading-tight">
            B-BBEE Supplier Score Estimator
          </h2>
          <p className="text-cd-text-muted text-lg max-w-3xl leading-relaxed mt-3">
            Under South Africa&apos;s B-BBEE framework, procuring from a Level 1 supplier like
            Carter Digitals earns your company{' '}
            <span className="text-cd-gold font-semibold">135%</span> of the procurement
            value toward your scorecard targets.
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
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-cd-gold/8">
                  <TrendingUp className="w-4 h-4 text-cd-gold" strokeWidth={1.8} />
                </div>
                <Label className="text-cd-text font-display font-semibold text-base cursor-default">
                  Project Budget
                </Label>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cd-gold font-mono font-bold text-sm">R</span>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 50000"
                  value={budget ? formatCurrency(Number(budget)) : ''}
                  onChange={handleBudgetChange}
                  className="pl-9 h-12 text-lg font-mono tabular-nums bg-white/[0.03] border-cd-border text-cd-text placeholder:text-cd-text-dim focus-visible:border-cd-gold focus-visible:ring-cd-gold/20 focus-visible:ring-[3px] rounded-lg"
                />
              </div>
              <p className="text-cd-text-dim text-xs mt-3">
                Enter your total project budget in ZAR. No commas needed.
              </p>
            </div>

            {/* B-BBEE Level */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-cd-gold/8">
                  <Building2 className="w-4 h-4 text-cd-gold" strokeWidth={1.8} />
                </div>
                <Label className="text-cd-text font-display font-semibold text-base cursor-default">
                  Your Company&apos;s B-BBEE Level
                </Label>
              </div>
              <Select value={bbeeLevel} onValueChange={(val) => setBbeeLevel(val as BbeeLevel)}>
                <SelectTrigger
                  className="w-full h-11 text-sm bg-white/[0.03] border-cd-border text-cd-text focus:ring-cd-gold/20 focus:ring-[3px] [&[data-state=open]]:border-cd-gold"
                  aria-label="Select your company's B-BBEE level"
                >
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent className="bg-cd-surface border-cd-border text-cd-text">
                  {BBEE_LEVELS.map((level) => (
                    <SelectItem key={level.value} value={level.value} className="focus:bg-cd-gold/8 focus:text-cd-text text-sm">
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-cd-text-dim text-xs mt-3">
                Your own company&apos;s level — helps contextualise the benefit.
              </p>
            </div>

            {/* Procurement Element */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-cd-gold/8">
                  <ShieldCheck className="w-4 h-4 text-cd-gold" strokeWidth={1.8} />
                </div>
                <Label className="text-cd-text font-display font-semibold text-base cursor-default">
                  Procurement Element
                </Label>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {PROCUREMENT_ELEMENTS.map((element) => (
                  <button
                    key={element.value}
                    type="button"
                    onClick={() => setProcurementElement(element.value)}
                    className={`rounded-lg px-4 py-3.5 text-left cursor-pointer transition-all duration-200 border ${
                      procurementElement === element.value
                        ? 'bg-cd-gold/6 border-cd-gold-dim'
                        : 'bg-white/[0.02] border-cd-border hover:border-cd-border-glow'
                    }`}
                  >
                    <div className="text-cd-text text-sm font-medium mb-0.5">{element.label}</div>
                    <div className="text-cd-gold font-mono text-xs font-bold">{element.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Visual B-BBEE Scorecard */}
            {calculation.isCalculated && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="glass-card rounded-xl p-6">
                  <h3 className="font-display text-cd-text font-semibold text-base mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-cd-gold" />
                    B-BBEE Scorecard Impact
                  </h3>
                  <div className="space-y-3">
                    {SCORECARD_ELEMENTS.map((element) => {
                      const isProcurement = element.isProcurement
                      const pointsEarned = isProcurement
                        ? Math.min(element.maxPoints, (calculation.qualifyingSpend / 1000000) * 25)
                        : 0
                      return (
                        <div key={element.name}>
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-sm ${isProcurement ? 'text-cd-gold font-semibold' : 'text-cd-text-muted'}`}>
                              {element.name}
                              {isProcurement && <span className="text-cd-gold-light text-xs ml-1">(your spend)</span>}
                            </span>
                            <span className="text-xs font-mono text-cd-text-dim">
                              {isProcurement ? `${Math.round(pointsEarned * 10) / 10}/${element.maxPoints}` : `—/${element.maxPoints}`}
                            </span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-cd-border/50 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: isProcurement
                                  ? `${Math.min((pointsEarned / element.maxPoints) * 100, 100)}%`
                                  : '0%'
                              }}
                              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                              className={`h-full rounded-full ${element.color}`}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <p className="text-cd-text-dim text-xs mt-3">
                    Shows procurement contribution to your ESD element. Other elements depend on your company&apos;s own B-BBEE initiatives.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Multi-Year Projection */}
            {calculation.isCalculated && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="glass-card rounded-xl p-6">
                  <h3 className="font-display text-cd-text font-semibold text-base mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cd-gold" />
                    Multi-Year Projection
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {calculation.yearProjections.map((proj) => (
                      <div key={proj.year} className="bg-cd-surface rounded-lg p-4 border border-cd-border">
                        <div className="text-cd-text-dim text-xs font-mono uppercase tracking-wider mb-2">Year {proj.year}</div>
                        <div className="text-cd-gold font-display text-xl font-bold">
                          R{formatCurrency(proj.qualifyingSpend)}
                        </div>
                        <div className="text-cd-text-dim text-xs mt-1">
                          From R{formatCurrency(proj.totalSpend)} spend
                        </div>
                        <div className="mt-2">
                          <div className="w-full h-1.5 rounded-full bg-cd-border/50 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min((proj.procurementPoints / 25) * 100, 100)}%` }}
                              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full rounded-full bg-cd-violet"
                            />
                          </div>
                          <span className="text-[10px] text-cd-violet font-mono mt-0.5 block">
                            {proj.procurementPoints}/25 procurement pts
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-cd-text-dim text-xs mt-3">
                    Assumes consistent annual spend at the same level. Points shown are for the Preferential Procurement sub-element only.
                  </p>
                </div>
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
            <div className="glass-card rounded-xl p-6 lg:sticky lg:top-24 space-y-6">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-cd-gold/8">
                  <Award className="w-4 h-4 text-cd-gold" strokeWidth={1.8} />
                </div>
                <span className="text-cd-text-muted font-mono text-sm tracking-wider uppercase">
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
                        <div className="font-mono text-sm text-cd-text-dim mb-2 tracking-wide">
                          Your qualifying spend value
                        </div>
                        <div className="font-mono text-3xl md:text-4xl font-bold text-cd-gold tabular-nums">
                          R{formatCurrency(calculation.qualifyingSpend)}
                        </div>
                        <div className="text-cd-text-dim text-xs font-mono mt-2">
                          R{formatCurrency(calculation.budgetNum)} &times; {calculation.effectiveMultiplierPercent}% = R{formatCurrency(calculation.qualifyingSpend)}
                        </div>
                      </>
                    ) : (
                      <div>
                        <div className="font-mono text-sm text-cd-text-dim mb-2 tracking-wide">
                          Enter a budget to calculate
                        </div>
                        <div className="font-mono text-3xl md:text-4xl font-bold text-cd-text-dim tabular-nums">
                          R &mdash;
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Divider */}
              <div className="h-px bg-cd-border" />

              {/* Multiplier Applied */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-cd-text-muted">Multiplier Applied</span>
                  <span className="text-cd-gold font-mono font-bold tabular-nums">
                    {calculation.effectiveMultiplierPercent}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cd-text-muted">Procurement Element</span>
                  <span className="text-cd-text text-sm">{calculation.selectedElement.label}</span>
                </div>
                {calculation.isCalculated && (
                  <div className="flex justify-between text-sm">
                    <span className="text-cd-text-muted">Additional Value</span>
                    <span className="text-emerald-400/80 font-mono font-bold tabular-nums">
                      +R{formatCurrency(calculation.qualifyingSpend - calculation.budgetNum)}
                    </span>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-cd-border" />

              {/* Carter Digitals Status */}
              <div className="rounded-lg bg-cd-gold/4 border border-cd-gold-dim/40 p-4 space-y-2.5">
                <div className="text-cd-text-muted text-xs font-mono tracking-wider uppercase mb-3">
                  Carter Digitals&apos; Status
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cd-gold" strokeWidth={2} />
                  <span className="text-cd-text text-sm font-medium">Level 1 B-BBEE Contributor</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cd-gold" strokeWidth={2} />
                  <span className="text-cd-text text-sm font-medium">100% Black-Owned</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cd-gold" strokeWidth={2} />
                  <span className="text-cd-text text-sm font-medium">Qualifying Supplier</span>
                </div>
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                disabled={!calculation.isCalculated}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg border border-cd-border bg-cd-surface text-cd-text text-sm font-medium hover:border-cd-gold/40 hover:bg-cd-gold/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-cd-emerald" />
                    <span className="text-cd-emerald">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Results</span>
                  </>
                )}
              </button>

              {/* CTA */}
              <a
                href="#contact"
                className="group flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-lg
                  bg-cd-gold text-cd-bg font-display font-semibold text-sm
                  hover:bg-cd-gold-light transition-all duration-300
                  shadow-[0_0_20px_rgba(201,168,76,0.15)] hover:shadow-[0_0_30px_rgba(201,168,76,0.25)]"
              >
                Start a project with a qualifying supplier
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Procurement Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <button
            onClick={() => setShowTips(!showTips)}
            className="flex items-center gap-2 text-cd-text text-lg font-display font-semibold hover:text-cd-gold transition-colors duration-200 w-full"
          >
            <Lightbulb className="w-5 h-5 text-cd-gold" />
            Procurement Tips for Maximising B-BBEE Points
            {showTips ? <ChevronUp className="w-5 h-5 ml-auto text-cd-text-dim" /> : <ChevronDown className="w-5 h-5 ml-auto text-cd-text-dim" />}
          </button>

          <AnimatePresence>
            {showTips && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PROCUREMENT_TIPS.map((tip, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass-card rounded-xl p-5"
                    >
                      <div className="text-2xl mb-2">{tip.icon}</div>
                      <h4 className="text-cd-text font-display font-semibold text-sm mb-1">{tip.title}</h4>
                      <p className="text-cd-text-muted text-xs leading-relaxed">{tip.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16"
        >
          <h3 className="font-display text-cd-text font-bold text-xl mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cd-gold" />
            Frequently Asked Questions
          </h3>
          <div className="space-y-3 max-w-3xl">
            {FAQ_ITEMS.map((faq, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-cd-text text-sm font-medium pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: expandedFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-cd-text-dim shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 text-cd-text-muted text-sm leading-relaxed border-t border-cd-border/50 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
