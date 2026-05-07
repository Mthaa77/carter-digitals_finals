'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Search, Globe, Smartphone, FileText, Code, BarChart3, CheckCircle, Shield, Zap } from 'lucide-react'
import Navigation from '@/components/navigation'
import SEOAudit from '@/components/seo-audit'
import Footer from '@/components/footer'

const cinematicEasing = [0.16, 1, 0.3, 1] as const

const howItWorks = [
  {
    step: 1,
    icon: Globe,
    title: 'Enter Your URL',
    description: 'Type in your website address. We\'ll scan it across 5 key SEO categories automatically.',
    color: 'text-cd-gold',
    bg: 'bg-[rgba(201,168,76,0.1)]',
    border: 'border-[rgba(201,168,76,0.2)]',
  },
  {
    step: 2,
    icon: Search,
    title: 'Get Your Score',
    description: 'Receive an overall SEO score from 0–100, plus individual scores for each category.',
    color: 'text-cd-emerald',
    bg: 'bg-[rgba(52,211,153,0.1)]',
    border: 'border-[rgba(52,211,153,0.2)]',
  },
  {
    step: 3,
    icon: BarChart3,
    title: 'See Actionable Tips',
    description: 'Each category shows specific tips with green, amber, or red indicators so you know what to fix first.',
    color: 'text-cd-cyan',
    bg: 'bg-[rgba(34,211,238,0.1)]',
    border: 'border-[rgba(34,211,238,0.2)]',
  },
]

const whyUseThisTool = [
  {
    icon: Search,
    title: '5 Key Categories',
    description: 'Performance, Mobile-Friendly, SEO Basics, Content Quality, and Technical SEO — all covered.',
    color: 'text-cd-gold',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Focus',
    description: 'Google uses mobile-first indexing. We check how your site performs on mobile devices.',
    color: 'text-cd-emerald',
  },
  {
    icon: Shield,
    title: 'No Signup Required',
    description: 'Free and instant. No email, no account, no follow-up spam. Just honest results.',
    color: 'text-cd-cyan',
  },
  {
    icon: Zap,
    title: 'Actionable Insights',
    description: 'Not just scores — each category includes specific tips with priority indicators.',
    color: 'text-cd-violet',
  },
]

export default function SEOAuditClient() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen flex flex-col bg-[#080808]">
        {/* ─── HERO BANNER ──────────────────────────────── */}
        <section className="aurora-bg relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
          {/* Gradient orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full bg-[#A78BFA] blur-[160px] opacity-[0.06]"
              style={{ top: '-10%', left: '5%' }}
              animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full bg-[#C9A84C] blur-[140px] opacity-[0.05]"
              style={{ bottom: '5%', right: '-5%' }}
              animate={{ x: [0, -30, 20, 0], y: [0, 25, -15, 0], scale: [1, 0.95, 1.05, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute w-[350px] h-[350px] rounded-full bg-[#22D3EE] blur-[130px] opacity-[0.04]"
              style={{ top: '40%', left: '40%' }}
              animate={{ x: [0, 25, -15, 0], y: [0, -20, 10, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Scan lines */}
          <div
            className="absolute inset-0 pointer-events-none z-[2] opacity-[0.03]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            }}
          />

          {/* Neon line at top */}
          <div className="absolute top-0 left-0 right-0 neon-line opacity-50" />

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: cinematicEasing }}
              className="mb-8"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[var(--cd-text-muted)] hover:text-[#C9A84C] text-sm font-medium transition-colors duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Homepage
              </Link>
            </motion.div>

            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: cinematicEasing }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[rgba(167,139,250,0.1)] border border-[rgba(167,139,250,0.2)] mb-6"
            >
              <Search className="w-8 h-8 text-cd-violet" />
            </motion.div>

            {/* Section label */}
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: cinematicEasing }}
              className="section-label inline-block mb-4"
            >
              Free SEO Tool
            </motion.span>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24, scale: 0.96, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.1, ease: cinematicEasing }}
              className="text-cd-violet heading-shadow-lg font-display font-bold leading-tight mb-5"
              style={{ fontSize: 'var(--text-h1)' }}
            >
              Free SEO Audit Tool
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: cinematicEasing }}
              className="text-[var(--cd-text-muted)] text-lg md:text-xl max-w-2xl mx-auto"
            >
              Get a basic SEO health check for your website. No signup needed — just enter your URL and see your score.
            </motion.p>
          </div>
        </section>

        {/* ─── TOOL COMPONENT ──────────────────────────── */}
        <SEOAudit />

        {/* ─── HOW IT WORKS ────────────────────────────── */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#A78BFA] blur-[200px] opacity-[0.03]" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: cinematicEasing }}
              className="text-center mb-14"
            >
              <span className="section-label inline-block mb-4">How It Works</span>
              <h2
                className="text-cd-violet heading-shadow font-display font-bold leading-tight mb-3"
                style={{ fontSize: 'var(--text-h2)' }}
              >
                3 Simple Steps
              </h2>
              <p className="text-[var(--cd-text-muted)] text-lg max-w-xl mx-auto">
                Get your SEO score in seconds. No technical knowledge required.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {howItWorks.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: cinematicEasing }}
                  className="glass-card rounded-xl p-6 md:p-8 text-center relative group"
                >
                  <span className="absolute top-4 right-5 font-mono text-xs text-[var(--cd-text-dim)]">
                    0{item.step}
                  </span>

                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${item.bg} border ${item.border} mb-5`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>

                  <h3 className="font-display text-lg font-bold text-[var(--cd-text)] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[var(--cd-text-muted)] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHY USE THIS TOOL ───────────────────────── */}
        <section className="aurora-bg relative py-20 md:py-28 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 neon-line opacity-40" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: cinematicEasing }}
              className="text-center mb-14"
            >
              <span className="section-label inline-block mb-4">Benefits</span>
              <h2
                className="text-cd-violet heading-shadow font-display font-bold leading-tight mb-3"
                style={{ fontSize: 'var(--text-h2)' }}
              >
                Why Use This SEO Audit
              </h2>
              <p className="text-[var(--cd-text-muted)] text-lg max-w-xl mx-auto">
                Understand your website&apos;s SEO health and take action.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyUseThisTool.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: cinematicEasing }}
                  className="glass-card rounded-xl p-6 text-center hover-lift transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.04)] mb-4">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <h3 className="font-display text-base font-bold text-[var(--cd-text)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[var(--cd-text-muted)] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA SECTION ─────────────────────────────── */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#A78BFA] blur-[180px] opacity-[0.06]" />
          </div>
          <div className="absolute top-0 left-0 right-0 neon-line opacity-40" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: cinematicEasing }}
            >
              <h2
                className="text-cd-gold heading-shadow-lg font-display font-bold mb-6"
                style={{ fontSize: 'var(--text-h2)' }}
              >
                Ready to Start Your Project?
              </h2>
              <p className="text-[var(--cd-text-muted)] text-lg md:text-xl max-w-xl mx-auto mb-10">
                Get a comprehensive SEO audit with keyword analysis, competitor benchmarking, and a step-by-step action plan.
              </p>

              <a
                href="/#contact"
                className="btn-press btn-glow-gold inline-flex items-center justify-center px-8 py-4 text-[#080808] font-display font-bold text-sm tracking-wide rounded-xl transition-all duration-300 shadow-lg shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/35"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C, #E8CA7A)',
                }}
              >
                Get a Full SEO Audit
              </a>
            </motion.div>
          </div>
        </section>

        {/* Footer with mt-auto for sticky footer */}
        <div className="mt-auto">
          <Footer />
        </div>
      </main>
    </>
  )
}
