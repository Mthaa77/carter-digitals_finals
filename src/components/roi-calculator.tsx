'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import {
  Calculator, TrendingUp, ArrowRight, DollarSign, Percent, BarChart3,
  Copy, CheckCircle2, Clock, Target, ChevronDown, ChevronUp, Info
} from 'lucide-react'

const WEBSITE_COST = 7950

const INDUSTRY_BENCHMARKS = [
  { industry: 'Retail / E-commerce', avgROI: 320, color: 'bg-cd-gold' },
  { industry: 'Professional Services', avgROI: 280, color: 'bg-cd-emerald' },
  { industry: 'Hospitality', avgROI: 250, color: 'bg-cd-cyan' },
  { industry: 'Construction', avgROI: 200, color: 'bg-cd-violet' },
  { industry: 'Education', avgROI: 180, color: 'bg-cd-rose' },
]

export default function ROICalculator() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [monthlyRevenue, setMonthlyRevenue] = useState(50000)
  const [trafficIncrease, setTrafficIncrease] = useState(50)
  const [copied, setCopied] = useState(false)
  const [showMonthlyBreakdown, setShowMonthlyBreakdown] = useState(false)
  const [showBenchmarks, setShowBenchmarks] = useState(false)

  const results = useMemo(() => {
    const additionalMonthly = monthlyRevenue * (trafficIncrease / 100)
    const additionalAnnual = additionalMonthly * 12
    const annualROI = additionalAnnual - WEBSITE_COST
    const roiPercentage = (annualROI / WEBSITE_COST) * 100
    const breakEvenMonths = additionalMonthly > 0
      ? Math.ceil(WEBSITE_COST / additionalMonthly)
      : Infinity

    // Monthly breakdown with growth curve (deterministic)
    const monthlyBreakdown = Array.from({ length: 12 }, (_, i) => {
      const monthGrowth = 1 + (i * 0.02) // 2% monthly growth
      const monthRevenue = Math.round(monthlyRevenue * (trafficIncrease / 100) * monthGrowth)
      const cumulativeRevenue = Math.round(
        Array.from({ length: i + 1 }, (_, j) => {
          const g = 1 + (j * 0.02)
          return monthlyRevenue * (trafficIncrease / 100) * g
        }).reduce((sum, r) => sum + r, 0)
      )
      return {
        month: i + 1,
        additionalRevenue: monthRevenue,
        cumulativeRevenue,
        investmentRecovered: cumulativeRevenue >= WEBSITE_COST,
      }
    })

    return {
      additionalMonthly: Math.round(additionalMonthly),
      additionalAnnual: Math.round(additionalAnnual),
      annualROI: Math.round(annualROI),
      roiPercentage: Math.round(roiPercentage),
      breakEvenMonths,
      monthlyBreakdown,
    }
  }, [monthlyRevenue, trafficIncrease])

  const formatCurrency = (n: number) =>
    `R${n.toLocaleString('en-ZA')}`

  const handleShare = useCallback(() => {
    const text = [
      `ROI Calculator — Carter Digitals`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Monthly Revenue: ${formatCurrency(monthlyRevenue)}`,
      `Traffic Increase: ${trafficIncrease}%`,
      `Website Investment: ${formatCurrency(WEBSITE_COST)}`,
      ``,
      `Additional Monthly: ${formatCurrency(results.additionalMonthly)}`,
      `Annual ROI: ${results.annualROI >= 0 ? '+' : ''}${formatCurrency(results.annualROI)}`,
      `ROI Percentage: ${results.roiPercentage >= 0 ? '+' : ''}${results.roiPercentage}%`,
      `Break-even: ${results.breakEvenMonths === Infinity ? 'N/A' : `${results.breakEvenMonths} month${results.breakEvenMonths !== 1 ? 's' : ''}`}`,
      ``,
      `Calculate yours: carterdigitals.co.za/tools/roi-calculator`,
    ].join('\n')

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }, [monthlyRevenue, trafficIncrease, results])

  // Max value for chart bars
  const maxMonthlyRevenue = Math.max(...results.monthlyBreakdown.map(m => m.additionalRevenue), 1)

  return (
    <section id="roi-calculator" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 40%, rgba(201,168,76,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="section-label inline-block">ROI Calculator</span>
          <h2 className="section-heading text-[var(--text-h2)]">
            See Your <span className="text-cd-gold">Return on Investment</span>
          </h2>
          <p className="mt-4 text-cd-text-muted text-lg max-w-2xl mx-auto">
            A professional website isn&apos;t an expense &mdash; it&apos;s an investment that pays for itself. Calculate your potential return.
          </p>
        </motion.div>

        {/* Calculator Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="glass-card rounded-2xl p-6 sm:p-8 md:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Inputs Column */}
            <div className="space-y-8">
              {/* Monthly Revenue Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="roi-monthly-revenue" className="text-cd-text font-medium text-sm">
                    Monthly Revenue
                  </label>
                  <span className="font-mono text-cd-gold font-bold text-lg">
                    {formatCurrency(monthlyRevenue)}
                  </span>
                </div>
                <input
                  type="range"
                  id="roi-monthly-revenue"
                  min={5000}
                  max={500000}
                  step={5000}
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  aria-label="Monthly Revenue"
                  style={{
                    background: `linear-gradient(to right, #C9A84C 0%, #C9A84C ${((monthlyRevenue - 5000) / (500000 - 5000)) * 100}%, #242424 ${((monthlyRevenue - 5000) / (500000 - 5000)) * 100}%, #242424 100%)`,
                  }}
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-cd-text-dim text-xs font-mono">R5,000</span>
                  <span className="text-cd-text-dim text-xs font-mono">R500,000</span>
                </div>
              </div>

              {/* Traffic Increase Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="roi-traffic-increase" className="text-cd-text font-medium text-sm">
                    Expected Traffic Increase
                  </label>
                  <span className="font-mono text-cd-gold font-bold text-lg">
                    {trafficIncrease}%
                  </span>
                </div>
                <input
                  type="range"
                  id="roi-traffic-increase"
                  min={10}
                  max={300}
                  step={5}
                  value={trafficIncrease}
                  onChange={(e) => setTrafficIncrease(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  aria-label="Expected Traffic Increase"
                  style={{
                    background: `linear-gradient(to right, #C9A84C 0%, #C9A84C ${((trafficIncrease - 10) / (300 - 10)) * 100}%, #242424 ${((trafficIncrease - 10) / (300 - 10)) * 100}%, #242424 100%)`,
                  }}
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-cd-text-dim text-xs font-mono">10%</span>
                  <span className="text-cd-text-dim text-xs font-mono">300%</span>
                </div>
              </div>

              {/* Website cost note */}
              <div className="bg-cd-surface rounded-lg p-4 border border-cd-border">
                <div className="flex items-center gap-2 text-cd-text-muted text-sm">
                  <Calculator className="w-4 h-4 text-cd-gold shrink-0" />
                  <span>Based on a professional website investment of <strong className="text-cd-gold">{formatCurrency(WEBSITE_COST)}</strong></span>
                </div>
              </div>

              {/* Break-even Timeline */}
              <div className="bg-cd-surface rounded-xl p-5 border border-cd-border">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-cd-emerald/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-cd-emerald" />
                  </div>
                  <span className="text-cd-text-dim text-xs uppercase tracking-widest font-mono">
                    Break-even Timeline
                  </span>
                </div>
                {results.breakEvenMonths !== Infinity ? (
                  <>
                    <div className="font-display text-3xl sm:text-4xl font-bold text-cd-emerald">
                      {results.breakEvenMonths} month{results.breakEvenMonths !== 1 ? 's' : ''}
                    </div>
                    <p className="text-cd-text-dim text-xs mt-1">
                      Until your website investment pays for itself
                    </p>
                    {/* Visual break-even bar */}
                    <div className="mt-3 relative">
                      <div className="w-full h-3 rounded-full bg-cd-border overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((results.breakEvenMonths / 12) * 100, 100)}%` }}
                          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full bg-gradient-to-r from-cd-gold to-cd-emerald"
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-[10px] text-cd-text-dim font-mono">Month 0</span>
                        <span className="text-[10px] text-cd-text-dim font-mono">Month 12</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="font-display text-xl font-bold text-cd-text-dim">
                    Increase traffic to see break-even
                  </div>
                )}
              </div>
            </div>

            {/* Results Column */}
            <div className="space-y-4">
              {/* ROI Percentage — Hero Number */}
              <div className="bg-cd-surface rounded-xl p-5 border border-cd-gold/20 shadow-[0_0_20px_rgba(201,168,76,0.06)]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-cd-gold/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-cd-gold" />
                  </div>
                  <span className="text-cd-text-dim text-xs uppercase tracking-widest font-mono">
                    ROI Percentage
                  </span>
                </div>
                <span className={`font-display text-4xl sm:text-5xl font-bold ${results.roiPercentage >= 0 ? 'text-cd-gold' : 'text-red-400'}`}>
                  {results.roiPercentage >= 0 ? '+' : ''}{results.roiPercentage}%
                </span>

                {/* Visual ROI Bar */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-cd-text-dim font-mono w-8">0%</span>
                    <div className="flex-1 h-6 rounded-md bg-cd-border/50 overflow-hidden relative">
                      {results.roiPercentage >= 0 && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(Math.abs(results.roiPercentage) / 5, 100)}%` }}
                          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-md bg-gradient-to-r from-cd-gold-dim to-cd-gold flex items-center justify-end pr-2"
                        >
                          <span className="text-[10px] font-mono text-cd-bg font-bold">
                            +{results.roiPercentage}%
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  {/* Industry average marker */}
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-cd-text-dim font-mono w-8">Avg</span>
                    <div className="flex-1 h-1 rounded bg-cd-border/30 relative">
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cd-cyan"
                        style={{ left: `${Math.min(280 / 5, 100)}%` }}
                        title="Industry average: ~280%"
                      />
                    </div>
                    <span className="text-[10px] text-cd-cyan font-mono">~280%</span>
                  </div>
                </div>
              </div>

              {/* Additional Monthly Revenue */}
              <div className="bg-cd-surface rounded-xl p-5 border border-cd-border hover:border-cd-gold/30 transition-colors duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-cd-gold/10 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-cd-gold" />
                  </div>
                  <span className="text-cd-text-dim text-xs uppercase tracking-widest font-mono">
                    Additional Monthly Revenue
                  </span>
                </div>
                <span className={`font-display text-3xl sm:text-4xl font-bold ${results.additionalMonthly >= 0 ? 'text-cd-gold' : 'text-red-400'}`}>
                  {formatCurrency(results.additionalMonthly)}
                </span>
                <p className="text-cd-text-dim text-xs mt-1">
                  Revenue &times; Traffic Increase ({formatCurrency(monthlyRevenue)} &times; {trafficIncrease}%)
                </p>
              </div>

              {/* Annual ROI */}
              <div className="bg-cd-surface rounded-xl p-5 border border-cd-border hover:border-cd-gold/30 transition-colors duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-cd-gold/10 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-cd-gold" />
                  </div>
                  <span className="text-cd-text-dim text-xs uppercase tracking-widest font-mono">
                    Annual ROI
                  </span>
                </div>
                <span className={`font-display text-3xl sm:text-4xl font-bold ${results.annualROI >= 0 ? 'text-cd-gold' : 'text-red-400'}`}>
                  {results.annualROI >= 0 ? '+' : ''}{formatCurrency(results.annualROI)}
                </span>
                <p className="text-cd-text-dim text-xs mt-1">
                  (Additional Revenue &times; 12) &minus; Website Cost
                </p>
              </div>
            </div>
          </div>

          {/* Visual ROI Chart — CSS Bar Chart */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold text-cd-text flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cd-gold" />
                12-Month Revenue Projection
              </h3>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm bg-cd-gold" />
                  <span className="text-cd-text-dim">Monthly</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm bg-cd-emerald" />
                  <span className="text-cd-text-dim">Recovered</span>
                </div>
              </div>
            </div>
            <div className="bg-cd-surface rounded-xl p-4 sm:p-6 border border-cd-border">
              <div className="flex items-end gap-1.5 sm:gap-2 h-40">
                {results.monthlyBreakdown.map((m, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(m.additionalRevenue / maxMonthlyRevenue) * 100}%` }}
                      transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className={`w-full rounded-t-sm min-h-[4px] ${
                        m.investmentRecovered ? 'bg-cd-emerald' : 'bg-cd-gold'
                      }`}
                      title={`Month ${m.month}: ${formatCurrency(m.additionalRevenue)}`}
                    />
                    <span className="text-[9px] text-cd-text-dim font-mono">{m.month}</span>
                  </div>
                ))}
              </div>
              {/* Investment line */}
              <div className="relative mt-2">
                <div className="border-t border-dashed border-cd-rose/40 relative">
                  <span className="absolute -top-2.5 right-0 text-[9px] text-cd-rose/60 font-mono bg-cd-surface px-1">
                    Investment: {formatCurrency(WEBSITE_COST)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Breakdown Table */}
          <div className="mt-6">
            <button
              onClick={() => setShowMonthlyBreakdown(!showMonthlyBreakdown)}
              className="flex items-center gap-2 text-cd-text-dim text-sm hover:text-cd-gold transition-colors duration-200"
            >
              {showMonthlyBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {showMonthlyBreakdown ? 'Hide' : 'Show'} monthly breakdown
            </button>

            <AnimatePresence>
              {showMonthlyBreakdown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 max-h-64 overflow-y-auto rounded-xl border border-cd-border">
                    <table className="w-full text-sm">
                      <thead className="bg-cd-surface sticky top-0">
                        <tr>
                          <th className="text-left px-4 py-2.5 text-cd-text-dim text-xs uppercase tracking-wider font-mono">Month</th>
                          <th className="text-right px-4 py-2.5 text-cd-text-dim text-xs uppercase tracking-wider font-mono">Additional</th>
                          <th className="text-right px-4 py-2.5 text-cd-text-dim text-xs uppercase tracking-wider font-mono">Cumulative</th>
                          <th className="text-center px-4 py-2.5 text-cd-text-dim text-xs uppercase tracking-wider font-mono">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.monthlyBreakdown.map((m) => (
                          <tr key={m.month} className="border-t border-cd-border/50">
                            <td className="px-4 py-2 text-cd-text font-mono">{m.month}</td>
                            <td className="px-4 py-2 text-cd-gold font-mono text-right">{formatCurrency(m.additionalRevenue)}</td>
                            <td className="px-4 py-2 text-cd-text font-mono text-right">{formatCurrency(m.cumulativeRevenue)}</td>
                            <td className="px-4 py-2 text-center">
                              {m.investmentRecovered ? (
                                <CheckCircle2 className="w-4 h-4 text-cd-emerald inline" />
                              ) : (
                                <span className="text-cd-text-dim text-xs">&mdash;</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Industry Benchmarks */}
          <div className="mt-6">
            <button
              onClick={() => setShowBenchmarks(!showBenchmarks)}
              className="flex items-center gap-2 text-cd-text-dim text-sm hover:text-cd-gold transition-colors duration-200"
            >
              <Target className="w-4 h-4" />
              {showBenchmarks ? 'Hide' : 'Compare with'} industry benchmarks
              {showBenchmarks ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence>
              {showBenchmarks && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-3">
                    {/* Your ROI marker */}
                    <div className="flex items-center gap-3 bg-cd-gold/5 rounded-lg px-4 py-2 border border-cd-gold/20">
                      <Info className="w-4 h-4 text-cd-gold shrink-0" />
                      <span className="text-cd-gold text-sm font-semibold">
                        Your projected ROI: +{results.roiPercentage}%
                      </span>
                    </div>
                    {INDUSTRY_BENCHMARKS.map((bench) => (
                      <div key={bench.industry} className="flex items-center gap-3">
                        <span className="text-cd-text-muted text-xs w-36 shrink-0">{bench.industry}</span>
                        <div className="flex-1 h-2 rounded-full bg-cd-border/30 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(bench.avgROI / 5, 100)}%` }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className={`h-full rounded-full ${bench.color}`}
                          />
                        </div>
                        <span className="text-cd-text-dim text-xs font-mono w-12 text-right">{bench.avgROI}%</span>
                      </div>
                    ))}
                    <p className="text-cd-text-dim text-xs mt-2">
                      Industry averages based on South African digital marketing benchmarks (2024).
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
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
                  <span>Copy ROI Summary</span>
                </>
              )}
            </button>
            <a
              href="#contact"
              className="btn-press btn-glow-gold inline-flex items-center gap-2 px-8 py-3.5 bg-cd-gold text-cd-bg font-bold rounded-lg hover:bg-cd-gold-light transition-colors duration-300 text-sm"
            >
              Get Your Custom ROI Report
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Custom range slider thumb styles */}
      <style jsx global>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #C9A84C;
          cursor: pointer;
          border: 3px solid #080808;
          box-shadow: 0 0 8px rgba(201, 168, 76, 0.4);
          transition: box-shadow 0.2s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          box-shadow: 0 0 16px rgba(201, 168, 76, 0.6);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #C9A84C;
          cursor: pointer;
          border: 3px solid #080808;
          box-shadow: 0 0 8px rgba(201, 168, 76, 0.4);
          transition: box-shadow 0.2s ease;
        }
        input[type="range"]::-moz-range-thumb:hover {
          box-shadow: 0 0 16px rgba(201, 168, 76, 0.6);
        }
        input[type="range"]:focus {
          outline: none;
        }
      `}</style>
    </section>
  )
}
