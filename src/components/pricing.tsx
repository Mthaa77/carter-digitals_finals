'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  ArrowRight,
  Bot,
  Search,
  Presentation,
  Server,
  Database,
  Star,
  Zap,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

/* ──────────────────────────────────────────────────────────── */
/*  Types                                                      */
/* ──────────────────────────────────────────────────────────── */

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

interface PricingProps {
  billingMode: 'onceoff' | 'retainer'
}

/* ──────────────────────────────────────────────────────────── */
/*  Plan Data                                                   */
/* ──────────────────────────────────────────────────────────── */

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
  { label: 'AI Chatbot & WhatsApp Automation', price: 'R4,999 once-off | R499/mo', accent: 'gold' as const, icon: Bot },
  { label: 'SEO & Google Setup', price: 'R999 once-off', accent: 'emerald' as const, icon: Search },
  { label: 'Company Profile & Pitch Deck', price: 'R1,999 once-off', accent: 'cyan' as const, icon: Presentation },
  { label: 'Hosting & Domain Management', price: 'R1,990/yr | R199/mo', accent: 'violet' as const, icon: Server },
  { label: 'Sanity CMS Setup & Training', price: 'R3,499 once-off | R349/mo', accent: 'rose' as const, icon: Database },
]

/* ──────────────────────────────────────────────────────────── */
/*  Animation Variants                                          */
/* ──────────────────────────────────────────────────────────── */

const cinematicEasing = [0.16, 1, 0.3, 1] as const

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
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
      ease: cinematicEasing,
    },
  },
}

const featureVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5 + i * 0.06,
      duration: 0.4,
      ease: cinematicEasing,
    },
  }),
}

/* ──────────────────────────────────────────────────────────── */
/*  Accent Helper                                               */
/* ──────────────────────────────────────────────────────────── */

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
        gradientColors: ['#065F46', '#34D399', '#6EE7B7'],
        hoverBorderGradient: 'linear-gradient(135deg, #34D399, #22D3EE, #34D399)',
        ribbonBg: 'bg-[var(--cd-emerald)]',
        shimmerColor: 'rgba(52,211,153,0.15)',
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
        gradientColors: ['#0E7490', '#22D3EE', '#67E8F9'],
        hoverBorderGradient: 'linear-gradient(135deg, #22D3EE, #A78BFA, #22D3EE)',
        ribbonBg: 'bg-[var(--cd-cyan)]',
        shimmerColor: 'rgba(34,211,238,0.15)',
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
        gradientColors: ['#7A6330', '#C9A84C', '#E8CA7A'],
        hoverBorderGradient: 'linear-gradient(135deg, #C9A84C, #34D399, #C9A84C)',
        ribbonBg: 'bg-[var(--cd-gold)]',
        shimmerColor: 'rgba(201,168,76,0.15)',
      }
  }
}

/* ──────────────────────────────────────────────────────────── */
/*  Animated Price Component                                    */
/* ──────────────────────────────────────────────────────────── */

function AnimatedPrice({
  onceOffPrice,
  retainer,
  billingMode,
  priceGradient,
}: {
  onceOffPrice: string
  retainer: string
  billingMode: 'onceoff' | 'retainer'
  priceGradient: string
}) {
  const displayPrice = billingMode === 'onceoff' ? onceOffPrice : retainer
  const label = billingMode === 'onceoff' ? 'once-off' : '/month'

  return (
    <div className="mb-1 min-h-[52px] md:min-h-[60px] flex items-baseline gap-2">
      <AnimatePresence mode="wait">
        <motion.span
          key={`${displayPrice}-${billingMode}`}
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: cinematicEasing }}
          className={`font-display font-bold text-4xl md:text-5xl ${priceGradient}`}
        >
          {displayPrice}
        </motion.span>
      </AnimatePresence>
      <span className="text-[var(--cd-text-dim)] text-xs uppercase tracking-wider font-mono">
        {label}
      </span>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────── */
/*  Enhanced Pricing Card                                       */
/* ──────────────────────────────────────────────────────────── */

function PricingCard({ plan, billingMode }: { plan: Plan; billingMode: 'onceoff' | 'retainer' }) {
  const accent = getAccentClasses(plan.accent)
  const [isHovered, setIsHovered] = useState(false)
  const [gradientAngle, setGradientAngle] = useState(0)

  // Rotating gradient border angle on hover
  useEffect(() => {
    if (!isHovered) return
    let raf: number
    let angle = gradientAngle
    const animate = () => {
      angle = (angle + 1.5) % 360
      setGradientAngle(angle)
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [isHovered])

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {/* ── Animated Gradient Border (visible on hover) ── */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute -inset-[1px] rounded-xl z-0"
          style={{
            background: `conic-gradient(from ${gradientAngle}deg, ${accent.gradientColors.join(', ')}, ${accent.gradientColors[0]})`,
            opacity: 0.5,
          }}
        />
      )}

      {/* ── Ribbon for highlighted card ── */}
      {plan.highlighted && (
        <div className="absolute -top-0 -right-0 z-20 overflow-hidden rounded-tr-xl">
          <div
            className={`${accent.ribbonBg} text-[#080808] text-[9px] font-mono font-bold tracking-widest px-4 py-1.5 pl-6`}
            style={{
              clipPath: 'polygon(12px 0%, 100% 0%, 100% 100%, 12px 100%, 0% 50%)',
            }}
          >
            BEST VALUE
          </div>
        </div>
      )}

      {/* ── Card Body ── */}
      <div
        className={`
          glass-card rounded-xl p-5 md:p-6 flex flex-col relative z-10 transition-all duration-300
          border-l-[3px] ${accent.borderClass}
          ${plan.highlighted
            ? `${accent.glowBorder} ${accent.glowShadow} ${accent.glowRing} md:scale-105 md:-mt-3 md:mb-[-12px]`
            : accent.borderColor
          }
          ${accent.cardShadow}
        `}
      >
        {/* ── Badge (MOST POPULAR with shimmer) ── */}
        {plan.highlighted && plan.badge && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
            <div className="relative">
              <Badge
                className={`${accent.badgeBg} text-[#080808] font-mono text-[10px] tracking-wider px-4 py-1 border-none font-bold`}
              >
                {plan.badge}
              </Badge>
              {/* Shimmer overlay on badge */}
              <div
                className="absolute inset-0 rounded-md overflow-hidden pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'gold-shimmer 2.5s linear infinite',
                }}
              />
            </div>
          </div>
        )}

        {/* ── Plan Name ── */}
        <h3 className="font-display text-[var(--cd-text)] font-bold text-xl mb-1 flex items-center gap-2">
          {plan.name}
          {plan.highlighted && (
            <Star className="w-4 h-4 text-[var(--cd-emerald)] fill-[var(--cd-emerald)]" />
          )}
        </h3>

        {/* ── Best For ── */}
        <p className="text-[var(--cd-text-dim)] text-sm mb-4">
          {plan.bestFor}
        </p>

        {/* ── Animated Price ── */}
        <AnimatedPrice
          onceOffPrice={plan.onceOffPrice}
          retainer={plan.retainer}
          billingMode={billingMode}
          priceGradient={accent.priceGradient}
        />

        {/* ── Optional Retainer / Once-off note ── */}
        <p className="text-[#C9A84C] text-sm font-medium mb-2 flex items-center gap-1.5">
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${accent.dotColor}`} />
          {billingMode === 'onceoff'
            ? `Optional retainer: ${plan.retainer}`
            : `Once-off alternative: ${plan.onceOffPrice}`
          }
        </p>

        {/* ── Best Value note for highlighted plan ── */}
        {plan.highlighted && (
          <p className="text-[#34D399] text-xs font-medium mb-4 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" />
            Best Value — most features per rand
          </p>
        )}

        {!plan.highlighted && <div className="mb-4" />}

        {/* ── Features with stagger ── */}
        <ul className="space-y-2.5 mb-8 flex-1">
          {plan.features.map((feature, i) => (
            <motion.li
              key={feature}
              custom={i}
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-start gap-2.5 text-sm"
            >
              <Check className={`w-4 h-4 ${accent.checkColor} shrink-0 mt-0.5`} />
              <span className="text-[var(--cd-text-muted)]">
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* ── CTA Button ── */}
        <a
          href="#contact"
          className={`
            inline-flex items-center justify-center gap-2 rounded-lg text-[#080808] font-semibold text-sm transition-all duration-300 btn-press btn-glow-gold
            ${plan.highlighted
              ? `h-12 px-6 ${accent.badgeBg} hover:brightness-110`
              : 'h-10 px-4 bg-[var(--cd-gold)] hover:bg-[var(--cd-gold-light)]'
            }
          `}
        >
          {plan.cta}
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  )
}

/* ──────────────────────────────────────────────────────────── */
/*  Add-on Accent Map                                           */
/* ──────────────────────────────────────────────────────────── */

const addOnAccentMap: Record<string, { border: string; dot: string; priceColor: string; glassCard: string; iconColor: string }> = {
  gold: {
    border: 'border-[#C9A84C]/10 hover:border-[#C9A84C]/30',
    dot: 'bg-[#C9A84C]/60',
    priceColor: 'text-[#C9A84C]',
    glassCard: 'glass-card-gold',
    iconColor: 'text-[#C9A84C]',
  },
  emerald: {
    border: 'border-[#34D399]/10 hover:border-[#34D399]/30',
    dot: 'bg-[#34D399]/60',
    priceColor: 'text-[#34D399]',
    glassCard: 'glass-card-emerald',
    iconColor: 'text-[#34D399]',
  },
  cyan: {
    border: 'border-[#22D3EE]/10 hover:border-[#22D3EE]/30',
    dot: 'bg-[#22D3EE]/60',
    priceColor: 'text-[#22D3EE]',
    glassCard: 'glass-card-cyan',
    iconColor: 'text-[#22D3EE]',
  },
  violet: {
    border: 'border-[#A78BFA]/10 hover:border-[#A78BFA]/30',
    dot: 'bg-[#A78BFA]/60',
    priceColor: 'text-[#A78BFA]',
    glassCard: 'glass-card-violet',
    iconColor: 'text-[#A78BFA]',
  },
  rose: {
    border: 'border-[#FB7185]/10 hover:border-[#FB7185]/30',
    dot: 'bg-[#FB7185]/60',
    priceColor: 'text-[#FB7185]',
    glassCard: 'glass-card-rose',
    iconColor: 'text-[#FB7185]',
  },
}

/* ──────────────────────────────────────────────────────────── */
/*  Main Pricing Component                                      */
/* ──────────────────────────────────────────────────────────── */

export default function Pricing({ billingMode }: PricingProps) {
  return (
    <section id="pricing" className="aurora-bg py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: cinematicEasing }}
          className="mb-8 md:mb-12"
        >
          <span className="section-label inline-block">Packages</span>
          <h2
            className="gold-gradient-text heading-shadow font-display font-bold leading-tight"
            style={{ fontSize: 'var(--text-h2)' }}
          >
            Transparent Pricing. No Surprises.
          </h2>
          <p className="text-[var(--cd-text-muted)] text-lg mt-3">
            Choose your package and start building today.
          </p>
        </motion.div>

        {/* ── Small Business Packages ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: cinematicEasing }}
          className="mb-4"
        >
          <h3 className="font-display text-[#F0EFE8] text-xl font-semibold mb-1 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#C9A84C]" />
            Small Business Packages
          </h3>
          <p className="text-[var(--cd-text-muted)] text-sm">
            {billingMode === 'onceoff'
              ? 'Once-off pricing with optional monthly retainers for ongoing support.'
              : 'Monthly retainer pricing — ongoing support & maintenance included.'}
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
            <PricingCard key={plan.name} plan={plan} billingMode={billingMode} />
          ))}
        </motion.div>

        {/* ── School Website Packages ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: cinematicEasing }}
          className="mb-4"
        >
          <h3 className="font-display text-[#F0EFE8] text-xl font-semibold mb-1 flex items-center gap-2">
            <Star className="w-5 h-5 text-[#34D399]" />
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
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 mb-16 items-start"
        >
          {schoolPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} billingMode={billingMode} />
          ))}
        </motion.div>

        {/* ── B-BBEE Procurement Box ── */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: cinematicEasing }}
          className="glass-card-emerald rounded-xl p-6 md:p-8 border-l-[3px] border-l-[var(--cd-emerald)] card-shadow-emerald mb-16 relative overflow-hidden"
        >
          {/* Shimmer sweep on B-BBEE box */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(105deg, transparent 40%, rgba(52,211,153,0.04) 50%, transparent 60%)',
              backgroundSize: '200% 100%',
              animation: 'gold-shimmer 8s linear infinite',
            }}
          />

          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 relative z-10">
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

        {/* ── Add-ons Section (glass card treatment) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: cinematicEasing }}
        >
          <h4 className="font-display text-[var(--cd-text-muted)] text-sm font-medium tracking-wider uppercase mb-5 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#C9A84C]" />
            Add-on Services
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {addOns.map((addon) => {
              const colors = addOnAccentMap[addon.accent]
              const IconComp = addon.icon
              return (
                <motion.div
                  key={addon.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: cinematicEasing }}
                  className={`
                    flex items-start gap-3 rounded-xl ${colors.glassCard} border ${colors.border}
                    px-4 py-4 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]
                  `}
                >
                  <div className={`shrink-0 w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.04)] flex items-center justify-center ${colors.iconColor}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[var(--cd-text-muted)] text-sm block mb-1">
                      {addon.label}
                    </span>
                    <span className={`${colors.priceColor} font-mono text-xs font-medium`}>
                      {addon.price}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
