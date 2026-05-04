'use client'

import { useState, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calculator, TrendingUp, ArrowRight, DollarSign, Percent, BarChart3 } from 'lucide-react'

const WEBSITE_COST = 7950

export default function ROICalculator() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [monthlyRevenue, setMonthlyRevenue] = useState(50000)
  const [trafficIncrease, setTrafficIncrease] = useState(50)

  const results = useMemo(() => {
    const additionalMonthly = monthlyRevenue * (trafficIncrease / 100)
    const additionalAnnual = additionalMonthly * 12
    const annualROI = additionalAnnual - WEBSITE_COST
    const roiPercentage = (annualROI / WEBSITE_COST) * 100
    return {
      additionalMonthly: Math.round(additionalMonthly),
      additionalAnnual: Math.round(additionalAnnual),
      annualROI: Math.round(annualROI),
      roiPercentage: Math.round(roiPercentage),
    }
  }, [monthlyRevenue, trafficIncrease])

  const formatCurrency = (n: number) =>
    `R${n.toLocaleString('en-ZA')}`

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

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="section-label inline-block">ROI Calculator</span>
          <h2 className="section-heading text-[var(--text-h2)]">
            See Your <span className="gold-gradient-text">Return on Investment</span>
          </h2>
          <p className="mt-4 text-cd-text-muted text-lg max-w-2xl mx-auto font-sans">
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
                  <label htmlFor="roi-monthly-revenue" className="text-cd-text font-medium font-sans text-sm">
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
                  <label htmlFor="roi-traffic-increase" className="text-cd-text font-medium font-sans text-sm">
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
                <div className="flex items-center gap-2 text-cd-text-muted text-sm font-sans">
                  <Calculator className="w-4 h-4 text-cd-gold shrink-0" />
                  <span>Based on a professional website investment of <strong className="text-cd-gold">{formatCurrency(WEBSITE_COST)}</strong></span>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="space-y-4">
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
                <span className="font-display text-3xl sm:text-4xl font-bold gold-gradient-text text-glow-gold">
                  {formatCurrency(results.additionalMonthly)}
                </span>
                <p className="text-cd-text-dim text-xs mt-1 font-sans">
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
                <span className={`font-display text-3xl sm:text-4xl font-bold ${results.annualROI >= 0 ? 'gold-gradient-text text-glow-gold' : 'text-red-400'}`}>
                  {results.annualROI >= 0 ? '+' : ''}{formatCurrency(results.annualROI)}
                </span>
                <p className="text-cd-text-dim text-xs mt-1 font-sans">
                  (Additional Revenue &times; 12) &minus; Website Cost
                </p>
              </div>

              {/* ROI Percentage */}
              <div className="bg-cd-surface rounded-xl p-5 border border-cd-gold/20 shadow-[0_0_20px_rgba(201,168,76,0.06)]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-cd-gold/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-cd-gold" />
                  </div>
                  <span className="text-cd-text-dim text-xs uppercase tracking-widest font-mono">
                    ROI Percentage
                  </span>
                </div>
                <span className={`font-display text-4xl sm:text-5xl font-bold ${results.roiPercentage >= 0 ? 'gold-gradient-text text-glow-gold' : 'text-red-400'}`}>
                  {results.roiPercentage >= 0 ? '+' : ''}{results.roiPercentage}%
                </span>
                <p className="text-cd-text-dim text-xs mt-1 font-sans">
                  (Annual ROI &divide; Website Cost) &times; 100
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8 text-center">
            <a
              href="#contact"
              className="btn-press btn-glow-gold inline-flex items-center gap-2 px-8 py-3.5 bg-cd-gold text-cd-bg font-bold rounded-lg hover:bg-cd-gold-light transition-colors duration-300 font-sans text-sm"
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
