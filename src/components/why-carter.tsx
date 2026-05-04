'use client'

import { motion } from 'framer-motion'
import { Shield, Cloud, LayoutDashboard, MapPin } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface WhyCard {
  icon: LucideIcon
  title: string
  body: string
  tag: string
}

const cards: WhyCard[] = [
  {
    icon: Shield,
    title: 'Your Procurement Spend Qualifies',
    body: "We're 100% Black-owned and B-BBEE Level 1. Your supplier development spend works here. We're on the right list.",
    tag: 'B-BBEE Level 1',
  },
  {
    icon: Cloud,
    title: 'Not WordPress. Not Guesswork.',
    body: 'Next.js, Firebase, Vertex AI, Google Cloud. We build for speed, scale, and the future — not whatever a theme builder allows.',
    tag: 'GCP-Powered Stack',
  },
  {
    icon: LayoutDashboard,
    title: 'Beyond Websites',
    body: 'Booking systems. Stock trackers. Staff portals. Quote generators. We build the internal tools that actually run your business.',
    tag: 'Business Tools',
  },
  {
    icon: MapPin,
    title: 'From Soshanguve. For You.',
    body: "We didn't fly in from Cape Town. We built Carter Digitals in Block L. We know what Pretoria SMEs actually need — because we are one.",
    tag: 'Pretoria Roots',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export default function WhyCarter() {
  return (
    <section id="why-carter" className="relative py-24 sm:py-32 bg-cd-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="font-display text-cd-text font-bold tracking-tight" style={{ fontSize: 'var(--text-h2)' }}>
            Why Carter Digitals
          </h2>
          {/* Gold accent line */}
          <div className="mt-4 mx-auto w-20 h-1 bg-cd-gold rounded-full" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="glass-card rounded-xl p-6 group hover:border-l-[3px] hover:border-l-cd-gold transition-all duration-500 cursor-default"
              >
                {/* Tag */}
                <span className="inline-block text-xs font-mono font-medium text-cd-gold-dim uppercase tracking-wider mb-4">
                  {card.tag}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-cd-gold/10 flex items-center justify-center mb-5 group-hover:bg-cd-gold/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-cd-gold" />
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-semibold text-cd-text mb-3 group-hover:text-cd-gold-light transition-colors duration-300">
                  {card.title}
                </h3>

                {/* Body */}
                <p className="text-cd-text-muted text-sm leading-relaxed font-sans">
                  {card.body}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
