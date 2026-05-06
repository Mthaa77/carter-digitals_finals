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
  accent: 'gold' | 'emerald' | 'cyan'
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
    accent: 'gold',
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
    accent: 'emerald',
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
    accent: 'cyan',
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
    accent: 'gold',
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
    accent: 'emerald',
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
    accent: 'cyan',
  },
]

const addOns = [
  { label: 'AI Chatbot & WhatsApp Automation', price: 'R4,999 once-off | R499/mo', accent: 'gold' as const },
  { label: 'SEO & Google Setup', price: 'R999 once-off', accent: 'emerald' as const },
  { label: 'Company Profile & Pitch Deck', price: 'R1,999 once-off', accent: 'cyan' as const },
  { label: 'Hosting & Domain Management', price: 'R1,990/yr | R199/mo', accent: 'gold' as const },
  { label: 'Sanity CMS Setup & Training', price: 'R3,499 once-off | R349/mo', accent: 'emerald' as const },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

function getAccentClasses(accent: 'gold' | 'emerald' | 'cyan') {
  switch (accent) {
    case 'emerald':
      return {
        borderClass: 'border-l-[var(--cd-emerald)]',
        badgeBg: 'bg-[var(--cd-emerald)]',
        priceGradient: 'emerald-gradient-text',
        cardShadow: 'card-shadow-emerald',
        glassCard: 'glass-card-emerald',
        checkColor: 'text-[var(--cd-emerald)]',
        dotColor: 'bg-[var(--cd-emerald)]',
        borderColor: 'border-[var(--cd-emerald)]/20 hover:border-[var(--cd-emerald)]/40',
        glowBorder: 'border-[var(--cd-emerald)]/30',
        glowShadow: 'shadow-[0_0_40px_rgba(52,211,153,0.08)]',
        glowRing: 'ring-1 ring-[var(--cd-emerald)]/20',
      }
    case 'cyan':
      return {
        borderClass: 'border-l-[var(--cd-cyan)]',
        badgeBg: 'bg-[var(--cd-cyan)]',
        priceGradient: 'cyan-gradient-text',
        cardShadow: 'card-shadow-cyan',
        glassCard: 'glass-card-cyan',
        checkColor: 'text-[var(--cd-cyan)]',
        dotColor: 'bg-[var(--cd-cyan)]',
        borderColor: 'border-[var(--cd-cyan)]/20 hover:border-[var(--cd-cyan)]/40',
        glowBorder: 'border-[var(--cd-cyan)]/30',
        glowShadow: 'shadow-[0_0_40px_rgba(34,211,238,0.08)]',
        glowRing: 'ring-1 ring-[var(--cd-cyan)]/20',
      }
    default:
      return {
        borderClass: 'border-l-[var(--cd-gold)]',
        badgeBg: 'bg-[var(--cd-gold)]',
        priceGradient: 'gold-gradient-text',
        cardShadow: 'card-shadow-gold',
        glassCard: '',
        checkColor: 'text-[var(--cd-gold)]',
        dotColor: 'bg-[var(--cd-gold)]',
        borderColor: 'hover:border-[var(--cd-gold)]/20',
        glowBorder: '',
        glowShadow: '',
        glowRing: '',
      }
  }
}

function PricingCard({ plan }: { plan: Plan }) {
  const accent = getAccentClasses(plan.accent)

  return (
    <motion.div
      variants={cardVariants}
      className={`
        glass-card rounded-xl p-5 md:p-6 flex flex-col relative transition-all duration-300
        border-l-[3px] ${accent.borderClass}
        ${plan.highlighted
          ? `${accent.glowBorder} ${accent.glowShadow} ${accent.glowRing} md:scale-105 md:-mt-3 md:mb-[-12px]`
          : accent.borderColor
        }
        ${accent.cardShadow}
      `}
    >
      {/* Badge */}
      {plan.highlighted && plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className={`${accent.badgeBg} text-[#080808] font-mono text-[10px] tracking-wider px-3 py-1 border-none font-bold`}>
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

      {/* Once-off Price with gradient text */}
      <div className="mb-1 min-h-[44px] md:min-h-[48px] flex items-baseline">
        <span className={`font-display font-bold text-3xl md:text-4xl ${accent.priceGradient}`}>
          {plan.onceOffPrice}
        </span>
        <span className="ml-2 text-[var(--cd-text-dim)] text-xs uppercase tracking-wider font-mono">
          once-off
        </span>
      </div>

      {/* Optional Retainer */}
      <p className="text-[#C9A84C] text-sm font-medium mb-2 flex items-center gap-1.5">
        <span className={`inline-block w-1.5 h-1.5 rounded-full ${accent.dotColor}`} />
        Optional retainer: {plan.retainer}
      </p>

      {/* Best Value note for highlighted plan */}
      {plan.highlighted && (
        <p className="text-[#34D399] text-xs font-medium mb-4 flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#34D399]" />
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
            <Check className={`w-4 h-4 ${accent.checkColor} shrink-0 mt-0.5`} />
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
          inline-flex items-center justify-center gap-2 rounded-lg text-[#080808] font-medium text-sm transition-all duration-300 btn-press
          ${plan.highlighted
            ? `h-12 px-6 ${accent.badgeBg} hover:brightness-110`
            : 'h-10 px-4 bg-[var(--cd-gold)] hover:bg-[var(--cd-gold-light)]'
          }
        `}
      >
        {plan.cta}
        <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  )
}

const addOnAccentMap: Record<string, { border: string; dot: string; priceColor: string }> = {
  gold: {
    border: 'border-[#C9A84C]/10 hover:border-[#C9A84C]/30',
    dot: 'bg-[#C9A84C]/60',
    priceColor: 'text-[#C9A84C]',
  },
  emerald: {
    border: 'border-[#34D399]/10 hover:border-[#34D399]/30',
    dot: 'bg-[#34D399]/60',
    priceColor: 'text-[#34D399]',
  },
  cyan: {
    border: 'border-[#22D3EE]/10 hover:border-[#22D3EE]/30',
    dot: 'bg-[#22D3EE]/60',
    priceColor: 'text-[#22D3EE]',
  },
}

export default function Pricing() {
  return (
    <section id="pricing" className="aurora-bg py-20 md:py-28">
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
          <h2
            className="gold-gradient-text heading-shadow font-display font-bold leading-tight"
            style={{ fontSize: 'var(--text-h2)' }}
          >
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
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 mb-16 items-start"
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
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 mb-12 items-start"
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
          className="glass-card-emerald rounded-xl p-6 md:p-8 border-l-[3px] border-l-[var(--cd-emerald)] card-shadow-emerald mb-12"
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
                <span className="emerald-gradient-text font-semibold">
                  135% of the spend value
                </span>{' '}
                toward your B-BBEE scorecard.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-[var(--cd-emerald)] text-sm font-medium whitespace-nowrap group hover:gap-2.5 transition-all duration-300"
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
            {addOns.map((addon) => {
              const colors = addOnAccentMap[addon.accent]
              return (
                <div
                  key={addon.label}
                  className={`flex items-center justify-between rounded-lg bg-[rgba(255,255,255,0.02)] border ${colors.border} px-4 py-3 transition-colors duration-200`}
                >
                  <span className="text-[var(--cd-text-muted)] text-sm flex items-center gap-2">
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                    {addon.label}
                  </span>
                  <span className={`${colors.priceColor} font-mono text-sm font-medium`}>
                    {addon.price}
                  </span>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
