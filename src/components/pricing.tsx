'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Plan {
  name: string
  onceOffPrice: string
  retainer: string
  bestFor: string
  features: string[]
  cta: string
  highlighted: boolean
  badge: string | null
}

const smallBusinessPlans: Plan[] = [
  {
    name: 'Vula',
    onceOffPrice: 'R3,999',
    retainer: 'R399/mo',
    bestFor: 'Get online and start getting calls',
    features: [
      'Up to 4 pages',
      'Hosting & domain — Year 1 free',
      'Lead form + WhatsApp',
      'Google Business Profile',
      'Mobile-first branded design',
      'Basic SEO',
      '5–7 day delivery',
    ],
    cta: 'Get Started',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Khula',
    onceOffPrice: 'R7,999',
    retainer: 'R799/mo',
    bestFor: 'Convert visitors into paying clients',
    features: [
      'Up to 8 pages incl. Portfolio, Blog',
      'Hosting & domain — Year 1 free',
      'AI WhatsApp chatbot — 24/7',
      'Quote / booking request system',
      'SEO keyword targeting (3 keywords)',
      'Google Analytics + Search Console',
      'Everything in Vula included',
    ],
    cta: 'Get Started',
    highlighted: true,
    badge: 'MOST POPULAR',
  },
  {
    name: 'Elevate',
    onceOffPrice: 'R14,999',
    retainer: 'R1,199/mo',
    bestFor: 'A fully managed digital engine',
    features: [
      'Sanity CMS — full content management',
      'Hosting & domain — Year 1 free',
      'AI chatbot — 24/7 sales & support',
      'E-commerce ready',
      'Advanced SEO + monthly ranking report',
      'Custom integrations (CRM, payments)',
      'Everything in Khula included',
    ],
    cta: 'Get Started',
    highlighted: false,
    badge: null,
  },
]

const schoolPlans: Plan[] = [
  {
    name: 'Presença',
    onceOffPrice: 'R4,999',
    retainer: 'R499/mo',
    bestFor: 'Be found and trusted online',
    features: [
      '5 pages (Home, About, Grades, News, Contact)',
      'Hosting & domain — Year 1 free',
      'Mobile-first fast design',
      'WhatsApp click-to-chat',
      'Google Maps + contact form',
      'Basic SEO',
    ],
    cta: 'Get Started',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Ikredibo',
    onceOffPrice: 'R9,999',
    retainer: 'R899/mo',
    bestFor: 'Build community trust & enrolment',
    features: [
      '10 pages (Staff, Gallery, Admissions+)',
      'Hosting & domain — Year 1 free',
      'News & announcements system',
      'Parent enquiry / enrolment form',
      'Google Analytics dashboard',
      'Branded school email',
    ],
    cta: 'Get Started',
    highlighted: true,
    badge: 'MOST POPULAR',
  },
  {
    name: 'Mastery',
    onceOffPrice: 'R18,999',
    retainer: 'R1,499/mo',
    bestFor: 'Full content control + 24/7 AI',
    features: [
      'Sanity CMS — full content management',
      'Hosting & domain — Year 1 free',
      'AI chatbot — 24/7 admissions & FAQ',
      'Unlimited pages + downloads portal',
      'Staff / SGB portal with login',
      'Advanced SEO + Search Console',
    ],
    cta: 'Get Started',
    highlighted: false,
    badge: null,
  },
]

const addOns = [
  { label: 'AI Chatbot & WhatsApp Automation', price: 'R4,999 once-off | R499/mo' },
  { label: 'SEO & Google Setup', price: 'R999 once-off' },
  { label: 'Company Profile & Pitch Deck', price: 'R1,999 once-off' },
  { label: 'Hosting & Domain Management', price: 'R1,990/yr | R199/mo' },
  { label: 'Sanity CMS Setup & Training', price: 'R3,499 once-off | R349/mo' },
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

function PricingCard({ plan }: { plan: Plan }) {
  return (
    <motion.div
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
      {plan.highlighted && plan.badge && (
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

      {/* Once-off Price */}
      <div className="mb-1 min-h-[40px] flex items-baseline">
        <span className="font-display text-[var(--cd-text)] font-bold text-3xl">
          {plan.onceOffPrice}
        </span>
        <span className="ml-2 text-[var(--cd-text-dim)] text-xs uppercase tracking-wider font-mono">
          once-off
        </span>
      </div>

      {/* Optional Retainer */}
      <p className="text-[#C9A84C] text-sm font-medium mb-2 flex items-center gap-1.5">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
        Optional retainer: {plan.retainer}
      </p>

      {/* Best Value note for highlighted plan */}
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
    </motion.div>
  )
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

        {/* Small Business Packages */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <h3 className="font-display text-[#F0EFE8] text-xl font-semibold mb-1">
            Small Business Packages
          </h3>
          <p className="text-[var(--cd-text-muted)] text-sm">
            Once-off pricing with optional monthly retainers for ongoing support.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-16 items-start"
        >
          {smallBusinessPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </motion.div>

        {/* School Website Packages */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <h3 className="font-display text-[#F0EFE8] text-xl font-semibold mb-1">
            School Website Packages
          </h3>
          <p className="text-[var(--cd-text-muted)] text-sm">
            Purpose-built websites for schools — from foundation to full CMS control.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-12 items-start"
        >
          {schoolPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
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
            Add-on Services
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
