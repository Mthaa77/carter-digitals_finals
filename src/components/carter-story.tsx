'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CarterStory() {
  return (
    <section id="story" className="relative bg-[#0A0A0A] py-20 md:py-28 overflow-hidden">
      {/* Animated ambient candle glow */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-cd-gold/5 blur-[80px] pointer-events-none"
        style={{ animation: 'candle-glow 4s ease-in-out infinite' }}
        aria-hidden="true"
      />

      {/* Subtle gold divider above */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--cd-gold-dim)] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="gold-accent-left max-w-3xl mx-auto md:mx-0"
        >
          {/* Heading */}
          <h2 className="font-display text-[var(--text-h2)] text-[var(--cd-text)] font-bold leading-tight mb-4 flex items-center gap-3 flex-wrap">
            <span
              className="inline-block"
              style={{ animation: 'flame 2s ease-in-out infinite' }}
              aria-hidden="true"
            >
              🕯️
            </span>
            Why We&apos;re Called{' '}
            <span className="text-[var(--cd-gold)]">Carter</span> Digitals
          </h2>

          {/* Since 2023 badge */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--cd-gold-bg)] border border-[var(--cd-gold-dim)]/30 text-[var(--cd-gold)] font-mono text-xs tracking-wider">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--cd-gold)]" />
              Since 2023
            </span>
          </div>

          {/* Story Copy */}
          <div className="space-y-5 mb-10">
            <p className="text-[var(--cd-text)] text-lg leading-relaxed">
              In April 2021, we lost a close friend.{' '}
              <span className="text-[var(--cd-gold)]">Carter</span> was someone who
              believed in building something real from nothing.
            </p>
            <p className="text-[var(--cd-text)] text-lg leading-relaxed">
              <span className="text-[var(--cd-gold)]">Carter Digitals</span> is named
              in tribute to a close friend who passed away in April 2021. The company
              exists as a living monument to that friendship — and as proof that the
              dream of building something real from nothing is still possible.
            </p>
            <p className="text-[var(--cd-text)] text-lg leading-relaxed">
              <span className="text-[var(--cd-gold)]">Carter Digitals</span>{' '}
              isn&apos;t just a company name. It&apos;s a promise kept.
            </p>
          </div>

          {/* CTA Button */}
          <motion.a
            href="#"
            whileHover={{ gap: '12px' }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--cd-gold)] text-[var(--cd-gold)] font-medium text-sm transition-all duration-300 hover:bg-[var(--cd-gold-bg)] group"
          >
            Read Our Full Story
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
