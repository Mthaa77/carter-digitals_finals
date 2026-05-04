'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type BillingPeriod = 'monthly' | 'annual'

interface Plan {
  name: string
  monthlyPrice: string
  annualPrice: string
  monthlyNumeric: number | null
  annualNumeric: number | null
  bestFor: string
  features: string[]
  cta: string
  highlighted: boolean
  badge: string | null
  isOutline?: boolean
}

const plans: Plan[] = [
  {
    name: 'Starter',
    monthlyPrice: 'R7,950',
    annualPrice: 'R6,758',
    monthlyNumeric: 7950,
    annualNumeric: 6758,
    bestFor: 'First website',
    features: [
      'Up to 5 pages',
      'Mobile-responsive',
      'SEO foundations',
      'WhatsApp CTA',
      'Contact form',
      '3 months free hosting',
    ],
    cta: 'Get Started',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Business',
    monthlyPrice: 'R14,500',
    annualPrice: 'R12,325',
    monthlyNumeric: 14500,
    annualNumeric: 12325,
    bestFor: 'Established SME',
    features: [
      'Up to 10 pages',
      'Everything in Starter +',
      'Google Analytics',
      'Blog setup',
      'Google My Business',
      '6 months free hosting',
    ],
    cta: 'Get Started',
    highlighted: true,
    badge: 'MOST POPULAR',
  },
  {
    name: 'Growth',
    monthlyPrice: 'R22,000',
    annualPrice: 'R18,700',
    monthlyNumeric: 22000,
    annualNumeric: 18700,
    bestFor: 'Lead generation',
    features: [
      'Up to 15 pages',
      'Everything in Business +',
      'Booking/quote tool',
      'SEO content (5 pages)',
      '6 months free hosting',
    ],
    cta: 'Get Started',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Dashboard',
    monthlyPrice: 'From R15,000',
    annualPrice: 'From R12,750',
    monthlyNumeric: null,
    annualNumeric: null,
    bestFor: 'Internal tools',
    features: [
      'Custom scope',
      'Staff portals',
      'Booking systems',
      'Stock trackers',
      'Quote generators',
      'Ongoing support',
    ],
    cta: 'Discuss Your Project',
    highlighted: false,
    badge: null,
    isOutline: true,
  },
]

const addOns = [
  { label: 'Google Ads management', price: 'R3,500/month' },
  { label: 'SEO content', price: 'R2,500/month' },
  { label: 'Maintenance & updates', price: 'R1,200/month' },
  { label: 'Additional pages', price: 'R800/page' },
  { label: 'Logo design', price: 'R2,500 once-off' },
  { label: 'WhatsApp chatbot', price: 'R3,000 once-off' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

function AnimatedPrice({ monthly, annual, isAnnual }: { monthly: string; annual: string; isAnnual: boolean }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={isAnnual ? 'annual' : 'monthly'}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="inline-block font-display text-[var(--cd-text)] font-bold text-3xl"
      >
        {isAnnual ? annual : monthly}
      </motion.span>
    </AnimatePresence>
  )
}

export default function Pricing() {
  const [billing, setBilling] = useState<BillingPeriod>('monthly')
  const isAnnual = billing === 'annual'

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <span className="section-label inline-block">Pricing</span>
          <h2 className="section-heading text-[var(--text-h2)] text-[var(--cd-text)] font-bold leading-tight">
            Transparent Pricing. No Surprises.
          </h2>
          <p className="text-[var(--cd-text-muted)] text-lg mt-3">
            Real prices. Real work. No hidden fees.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-12 md:mb-16"
        >
          <span
            className={`text-sm font-medium transition-colors duration-200 ${
              !isAnnual ? 'text-[#F0EFE8]' : 'text-[#9A9A92]'
            }`}
          >
            Monthly
          </span>

          {/* Toggle Switch */}
          <button
            onClick={() => setBilling(isAnnual ? 'monthly' : 'annual')}
            className="relative w-14 h-7 rounded-full bg-[#1A1A1A] border border-[#242424] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/40"
            role="switch"
            aria-checked={isAnnual}
            aria-label="Toggle annual billing"
          >
            <motion.div
              className="absolute top-[3px] w-[20px] h-[20px] rounded-full bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.3)]"
              animate={{ left: isAnnual ? '31px' : '3px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>

          <span
            className={`text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
              isAnnual ? 'text-[#F0EFE8]' : 'text-[#9A9A92]'
            }`}
          >
            Annual
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[rgba(201,168,76,0.12)] text-[#C9A84C] text-[10px] font-bold tracking-wider border border-[#C9A84C]/20">
              SAVE 15%
            </span>
          </span>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10 items-start"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`
                glass-card rounded-xl p-6 flex flex-col relative transition-all duration-300
                ${plan.highlighted
                  ? 'animated-border-gold border-cd-gold/30 shadow-[0_0_40px_rgba(201,168,76,0.08)] ring-1 ring-cd-gold/20 md:scale-105 md:-mt-3 md:mb-[-12px]'
                  : 'hover:border-cd-gold/20'
                }
              `}
            >
              {/* Most Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[var(--cd-gold)] text-[#080808] font-mono text-[10px] tracking-wider px-3 py-1 border-none font-bold">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="font-display text-[var(--cd-text)] font-semibold text-lg mb-1">
                {plan.name}
              </h3>

              {/* Best For */}
              <p className="text-[var(--cd-text-dim)] text-sm mb-4">
                {plan.bestFor}
              </p>

              {/* Price */}
              <div className="mb-2 min-h-[40px] flex items-baseline">
                <AnimatedPrice
                  monthly={plan.monthlyPrice}
                  annual={plan.annualPrice}
                  isAnnual={isAnnual}
                />
                {isAnnual && plan.monthlyNumeric !== null && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="ml-2 text-[#9A9A92] text-sm line-through font-sans"
                  >
                    {plan.monthlyPrice}
                  </motion.span>
                )}
              </div>

              {/* Best Value note for Business plan */}
              {plan.highlighted && (
                <p className="text-[#C9A84C] text-xs font-medium mb-4 flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                  Best Value — most features per rand
                </p>
              )}

              {!plan.highlighted && <div className="mb-4" />}

              {/* Features */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm"
                  >
                    <Check className="w-4 h-4 text-[var(--cd-gold)] shrink-0 mt-0.5" />
                    <span className="text-[var(--cd-text-muted)]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {plan.isOutline ? (
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 h-10 rounded-lg border border-[var(--cd-gold)] text-[var(--cd-gold)] font-medium text-sm transition-all duration-300 hover:bg-[var(--cd-gold-bg)]"
                >
                  {plan.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <a
                  href="#contact"
                  className={`
                    inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--cd-gold)] text-[#080808] font-medium text-sm transition-all duration-300 hover:bg-[var(--cd-gold-light)]
                    ${plan.highlighted ? 'h-11 px-6' : 'h-10 px-4'}
                  `}
                >
                  {plan.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* B-BBEE Procurement Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-xl p-6 md:p-8 border-l-[3px] border-l-[var(--cd-gold)] mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">🏅</span>
                <h3 className="font-display text-[var(--cd-text)] font-bold text-lg">
                  B-BBEE Level 1 — 100% Black-Owned
                </h3>
              </div>
              <p className="text-[var(--cd-text-muted)] text-sm leading-relaxed max-w-2xl">
                Procuring from Carter Digitals earns your company{' '}
                <span className="text-[var(--cd-gold)] font-semibold">
                  135% of the spend value
                </span>{' '}
                toward your B-BBEE scorecard.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-[var(--cd-gold)] text-sm font-medium whitespace-nowrap group hover:gap-2.5 transition-all duration-300"
            >
              Use our B-BBEE Score Estimator
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>

        {/* Add-ons Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h4 className="font-display text-[var(--cd-text-muted)] text-sm font-medium tracking-wider uppercase mb-4">
            Add-ons
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {addOns.map((addon) => (
              <div
                key={addon.label}
                className="flex items-center justify-between rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--cd-border)] px-4 py-3 transition-colors duration-200 hover:border-[#3A3A3A]"
              >
                <span className="text-[var(--cd-text-muted)] text-sm">
                  {addon.label}
                </span>
                <span className="text-[var(--cd-gold)] font-mono text-sm font-medium">
                  {addon.price}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
