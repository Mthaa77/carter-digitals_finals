'use client'

import { motion } from 'framer-motion'
import { Shield, Cloud, LayoutDashboard, MapPin } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface WhyCard {
  icon: LucideIcon
  title: string
  body: string
  tag: string
  number: string
  accent: 'emerald' | 'cyan' | 'violet' | 'gold'
  cardClass: string
  shadowClass: string
  borderColor: string
  iconBg: string
  iconColor: string
  tagColor: string
  dotColor: string
  hoverShadow: string
  gradientFrom: string
  gradientTo: string
}

const cards: WhyCard[] = [
  {
    icon: Shield,
    title: 'Your Procurement Spend Qualifies',
    body: "We're 100% Black-owned and B-BBEE Level 1. Your supplier development spend works here. We're on the right list.",
    tag: 'B-BBEE Level 1',
    number: '01',
    accent: 'emerald',
    cardClass: 'glass-card-emerald',
    shadowClass: 'card-shadow-emerald',
    borderColor: 'border-l-[var(--cd-emerald)]',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    tagColor: 'text-emerald-400/80',
    dotColor: 'bg-emerald-400',
    hoverShadow: '0 8px 40px rgba(52,211,153,0.12), 0 0 60px rgba(52,211,153,0.06), 0 0 20px rgba(52,211,153,0.08)',
    gradientFrom: 'rgba(52,211,153,0.5)',
    gradientTo: 'rgba(34,211,238,0.3)',
  },
  {
    icon: Cloud,
    title: 'Not WordPress. Not Guesswork.',
    body: 'Next.js, React, Python/FastAPI, PostgreSQL, GCP/Vertex AI, Vercel. We build for speed, scale, and the future — not whatever a theme builder allows.',
    tag: 'Enterprise Stack',
    number: '02',
    accent: 'cyan',
    cardClass: 'glass-card-cyan',
    shadowClass: 'card-shadow-cyan',
    borderColor: 'border-l-[var(--cd-cyan)]',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
    tagColor: 'text-cyan-400/80',
    dotColor: 'bg-cyan-400',
    hoverShadow: '0 8px 40px rgba(34,211,238,0.12), 0 0 60px rgba(34,211,238,0.06), 0 0 20px rgba(34,211,238,0.08)',
    gradientFrom: 'rgba(34,211,238,0.5)',
    gradientTo: 'rgba(167,139,250,0.3)',
  },
  {
    icon: LayoutDashboard,
    title: 'Beyond Websites',
    body: 'Booking systems. Stock trackers. Staff portals. Quote generators. We build the internal tools that actually run your business.',
    tag: 'Business Tools',
    number: '03',
    accent: 'violet',
    cardClass: 'glass-card-violet',
    shadowClass: 'card-shadow-violet',
    borderColor: 'border-l-[var(--cd-violet)]',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    tagColor: 'text-violet-400/80',
    dotColor: 'bg-violet-400',
    hoverShadow: '0 8px 40px rgba(167,139,250,0.12), 0 0 60px rgba(167,139,250,0.06), 0 0 20px rgba(167,139,250,0.08)',
    gradientFrom: 'rgba(167,139,250,0.5)',
    gradientTo: 'rgba(251,113,133,0.3)',
  },
  {
    icon: MapPin,
    title: 'From Soshanguve. For You.',
    body: "We didn't fly in from Cape Town. We built Carter Digitals in Block L. We know what Pretoria SMEs actually need — because we are one.",
    tag: 'Pretoria Roots',
    number: '04',
    accent: 'gold',
    cardClass: 'glass-card-gold',
    shadowClass: 'card-shadow-gold',
    borderColor: 'border-l-[var(--cd-gold)]',
    iconBg: 'bg-cd-gold/10',
    iconColor: 'text-cd-gold',
    tagColor: 'text-cd-gold/80',
    dotColor: 'bg-cd-gold',
    hoverShadow: '0 8px 40px rgba(201,168,76,0.12), 0 0 60px rgba(201,168,76,0.06), 0 0 20px rgba(201,168,76,0.08)',
    gradientFrom: 'rgba(201,168,76,0.5)',
    gradientTo: 'rgba(52,211,153,0.3)',
  },
]

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function WhyCarter() {
  return (
    <section id="why-carter" className="aurora-bg relative py-20 md:py-28 overflow-hidden">
      {/* Floating ambient orbs */}
      <div
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-emerald-500/[0.04] blur-[100px] pointer-events-none"
        style={{ animation: 'float-orb-1 12s ease-in-out infinite' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-violet-500/[0.04] blur-[100px] pointer-events-none"
        style={{ animation: 'float-orb-2 15s ease-in-out infinite' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/[0.03] blur-[120px] pointer-events-none"
        style={{ animation: 'float-orb-1 18s ease-in-out infinite reverse' }}
        aria-hidden="true"
      />

      {/* Mesh gradient pattern overlay — diagonal lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(201,168,76,0.3) 40px,
            rgba(201,168,76,0.3) 41px
          ), repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            rgba(34,211,238,0.2) 40px,
            rgba(34,211,238,0.2) 41px
          )`,
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2
            className="gold-gradient-text heading-shadow font-display font-bold tracking-tight"
            style={{ fontSize: 'var(--text-h2)' }}
          >
            Why Carter Digitals
          </h2>
          {/* Multi-color gradient accent line */}
          <div
            className="mt-4 mx-auto w-24 h-1 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #C9A84C, #34D399, #22D3EE, #A78BFA, #FB7185)',
            }}
          />
          <p className="mt-4 text-cd-text-muted text-lg max-w-2xl mx-auto">
            Four reasons South African businesses choose us — from compliance to cutting-edge tech.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                className={`glass-card ${card.cardClass} rounded-xl p-6 group border-l-[3px] ${card.borderColor} cursor-default relative overflow-hidden transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1`}
                style={{
                  transition: 'border-color 0.5s, box-shadow 0.5s, transform 0.5s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = card.hoverShadow
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = ''
                }}
              >
                {/* Numbered indicator */}
                <span className="absolute top-4 right-4 font-mono text-xs text-cd-text-dim/40 select-none">
                  {card.number}
                </span>

                {/* Hover gradient overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: card.accent === 'emerald'
                      ? 'linear-gradient(to top, rgba(52,211,153,0.05), transparent)'
                      : card.accent === 'cyan'
                        ? 'linear-gradient(to top, rgba(34,211,238,0.05), transparent)'
                        : card.accent === 'violet'
                          ? 'linear-gradient(to top, rgba(167,139,250,0.05), transparent)'
                          : 'linear-gradient(to top, rgba(201,168,76,0.05), transparent)',
                  }}
                />

                {/* Animated gradient border on hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${card.gradientFrom}, ${card.gradientTo})`,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    padding: '2px',
                    borderRadius: '0.75rem',
                  }}
                />

                {/* Tag */}
                <span className={`inline-block text-xs font-mono font-medium ${card.tagColor} uppercase tracking-wider mb-4 relative z-10`}>
                  {card.tag}
                </span>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg ${card.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-semibold text-cd-text mb-3 group-hover:text-cd-gold-light transition-colors duration-300 relative z-10 flex items-center gap-2">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${card.dotColor} shrink-0`} />
                  {card.title}
                </h3>

                {/* Body */}
                <p className="text-cd-text-muted text-sm leading-relaxed font-sans relative z-10">
                  {card.body}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
