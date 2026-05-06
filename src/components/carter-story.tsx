'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function CarterStory() {
  return (
    <section id="story" className="aurora-bg relative py-20 md:py-28 overflow-hidden">
      {/* Floating gradient orbs */}
      <div
        className="absolute top-10 right-20 w-72 h-72 rounded-full bg-violet-500/[0.05] blur-[100px] pointer-events-none"
        style={{ animation: 'float-orb-1 14s ease-in-out infinite' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-cd-gold/[0.06] blur-[120px] pointer-events-none"
        style={{ animation: 'float-orb-2 16s ease-in-out infinite' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-cyan-500/[0.04] blur-[100px] pointer-events-none"
        style={{ animation: 'float-orb-1 20s ease-in-out infinite reverse' }}
        aria-hidden="true"
      />
      {/* Animated ambient candle glow */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] rounded-full bg-cd-gold/5 blur-[80px] pointer-events-none"
        style={{ animation: 'candle-glow 4s ease-in-out infinite' }}
        aria-hidden="true"
      />

      {/* Subtle gold divider above */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--cd-gold-dim)] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mobile: Image above text */}
        <div className="block lg:hidden mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="image-overlay-gradient rounded-2xl overflow-hidden shadow-2xl shadow-cd-gold/10"
          >
            <Image
              src="/team-photo.png"
              alt="Carter Digitals team"
              width={800}
              height={500}
              className="w-full h-64 sm:h-80 object-cover"
              priority
            />
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="gold-accent-left max-w-3xl lg:flex-1"
          >
            {/* Heading */}
            <h2 className="gold-gradient-text heading-shadow-lg font-display font-bold leading-tight mb-4 flex items-center gap-3 flex-wrap" style={{ fontSize: 'var(--text-h2)' }}>
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

            {/* Since badge */}
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--cd-gold-bg)] border border-[var(--cd-gold-dim)]/30 text-[var(--cd-gold)] font-mono text-xs tracking-wider">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--cd-gold)]" />
                Since 2021
              </span>
            </div>

            {/* Story Copy with gold highlighted keywords */}
            <div className="space-y-5 mb-10">
              <p className="text-[var(--cd-text)] text-lg leading-relaxed">
                In <span className="text-[var(--cd-gold)] font-semibold">April 2021</span>, we lost a close friend.{' '}
                <span className="text-[var(--cd-gold)]">Carter</span> was someone who
                believed in <span className="text-[var(--cd-gold)] font-semibold">building something real</span> from nothing.
              </p>
              <p className="text-[var(--cd-text)] text-lg leading-relaxed">
                <span className="text-[var(--cd-gold)]">Carter Digitals</span> is named
                in tribute to a close friend who passed away in <span className="text-[var(--cd-gold)] font-semibold">April 2021</span>. The company
                exists as a <span className="text-emerald-400 font-semibold">living monument</span> to that friendship — and as proof that the
                dream of <span className="text-cyan-400 font-semibold">building something real</span> from nothing is still possible.
              </p>
              <p className="text-[var(--cd-text)] text-lg leading-relaxed">
                <span className="text-[var(--cd-gold)]">Carter Digitals</span>{' '}
                isn&apos;t just a company name. It&apos;s a <span className="text-violet-400 font-semibold">promise kept</span>.
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

          {/* Desktop: Image on the right side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="hidden lg:block lg:flex-1 max-w-lg"
          >
            <div className="image-overlay-gradient rounded-2xl overflow-hidden shadow-2xl shadow-cd-gold/10 relative group">
              <Image
                src="/team-photo.png"
                alt="Carter Digitals team"
                width={800}
                height={500}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              {/* Gold shimmer overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cd-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
