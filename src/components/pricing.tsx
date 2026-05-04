'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const plans = [
  {
    name: 'Starter',
    price: 'R7,950',
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
    price: 'R14,500',
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
    price: 'R22,000',
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
    price: 'From R15,000',
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

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#080808]">
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
              Pricing
            </span>
          </div>
          <h2 className="font-display text-[var(--text-h2)] text-[var(--cd-text)] font-bold leading-tight mb-3">
            Transparent Pricing. No Surprises.
          </h2>
          <p className="text-[var(--cd-text-muted)] text-lg">
            Real prices. Real work. No hidden fees.
          </p>
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
              {/* Badge */}
              {plan.badge && (
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
              <div className="mb-2">
                <span className="font-display text-[var(--cd-text)] font-bold text-3xl">
                  {plan.price}
                </span>
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
