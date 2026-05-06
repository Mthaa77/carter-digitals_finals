'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Shield,
  Sparkles,
  ChevronDown,
  MessageCircle,
  Check,
} from 'lucide-react'
import Navigation from '@/components/navigation'
import Pricing from '@/components/pricing'
import Footer from '@/components/footer'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

/* ── Deterministic seeded random (no hydration mismatch) ── */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}
function r4(n: number): number {
  return Math.round(n * 10000) / 10000
}

/* ── Floating Sparkle Particles (deterministic) ──────────── */
const sparkleData = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${r4(seededRandom(i * 4 + 1) * 100)}%`,
  top: `${r4(seededRandom(i * 4 + 2) * 100)}%`,
  size: r4(1.5 + seededRandom(i * 4 + 3) * 3),
  duration: r4(4 + seededRandom(i * 4 + 4) * 4),
  delay: r4(seededRandom(i * 4 + 5) * 5),
  opacity: r4(0.15 + seededRandom(i * 4 + 6) * 0.4),
}))

function FloatingSparkles() {

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {sparkleData.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-[#C9A84C]"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
          }}
          animate={{
            opacity: [0, s.opacity, 0],
            y: [0, -30, -60],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ── Animated Gradient Orbs ──────────────────────────────── */
function GradientOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Gold orb — top left */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-[#C9A84C] blur-[160px] opacity-[0.06]"
        style={{ top: '-15%', left: '-10%' }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Cyan orb — top right */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-[#22D3EE] blur-[140px] opacity-[0.04]"
        style={{ top: '10%', right: '-5%' }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 25, -15, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Violet orb — bottom center */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full bg-[#A78BFA] blur-[130px] opacity-[0.04]"
        style={{ bottom: '5%', left: '30%' }}
        animate={{
          x: [0, 25, -15, 0],
          y: [0, -20, 10, 0],
          scale: [1, 1.05, 0.97, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Emerald orb — mid left */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-[#34D399] blur-[120px] opacity-[0.03]"
        style={{ top: '50%', left: '5%' }}
        animate={{
          x: [0, -20, 30, 0],
          y: [0, 15, -25, 0],
          scale: [1, 1.03, 0.96, 1],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* ── Scan Lines ──────────────────────────────────────────── */
function ScanLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[2] opacity-[0.03]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
      }}
    />
  )
}

/* ── Grain Overlay ───────────────────────────────────────── */
function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[3] opacity-[0.035]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        backgroundSize: '200px 200px',
      }}
    />
  )
}

/* ── Pricing FAQ Data ────────────────────────────────────── */
const pricingFaqs = [
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept EFT, credit/debit cards (Visa, Mastercard), and SnapScan. For once-off projects, we require a 50% deposit before work begins and the remaining 50% upon delivery. Monthly retainers are billed at the start of each month.',
  },
  {
    question: 'Can I switch from once-off to monthly retainer later?',
    answer:
      'Absolutely. If you start with a once-off package and later decide you need ongoing support, we can transition you to a monthly retainer. The retainer pricing remains the same as listed, and we will prorate the first month.',
  },
  {
    question: 'What happens after the first year of free hosting?',
    answer:
      'After the first year, hosting and domain management is R1,990/year (or R199/month). This includes SSL certificates, security updates, daily backups, and uptime monitoring. You are also free to move to your own hosting at any time.',
  },
  {
    question: 'Do you offer discounts for NGOs or NPOs?',
    answer:
      'Yes! We offer a 10–15% discount for registered NGOs, NPOs, and community organisations. Contact us with your NPO registration number and we will put together a custom quote.',
  },
  {
    question: 'How long does it take to build a website?',
    answer:
      'Our Vula package takes 5–7 business days. Khula is typically 10–14 business days. Elevate projects take 3–4 weeks depending on complexity. School packages follow similar timelines. We always agree on a deadline before starting.',
  },
  {
    question: 'Is there a money-back guarantee?',
    answer:
      'Yes. If you are not satisfied with the initial design concepts after the first revision round, we will refund your deposit in full — no questions asked. We are confident in our work and want you to feel completely secure.',
  },
  {
    question: 'What does "B-BBEE Level 1 — 135% Procurement" mean for my company?',
    answer:
      'When your company procures services from Carter Digitals, you earn 135% of the spend value toward your B-BBEE scorecard under the Preferential Procurement element. This is because we are 100% Black-Owned and 100% Youth-Owned, verified at Level 1.',
  },
  {
    question: 'Can I add features from a higher-tier package to a lower one?',
    answer:
      'Yes, you can add individual features as add-ons. For example, you can start with Vula and add an AI chatbot (R4,999 once-off) or SEO setup (R999 once-off). However, upgrading to a full higher-tier package is usually better value.',
  },
]

/* ── Comparison Table Data ───────────────────────────────── */
interface CompareRow {
  feature: string
  vula: string | boolean
  khula: string | boolean
  elevate: string | boolean
}

const businessCompareRows: CompareRow[] = [
  { feature: 'Pages', vula: 'Up to 4', khula: 'Up to 8', elevate: 'Unlimited' },
  { feature: 'Hosting & Domain (Year 1)', vula: true, khula: true, elevate: true },
  { feature: 'Lead Form + WhatsApp', vula: true, khula: true, elevate: true },
  { feature: 'Google Business Profile', vula: true, khula: true, elevate: true },
  { feature: 'Mobile-First Design', vula: true, khula: true, elevate: true },
  { feature: 'Basic SEO', vula: true, khula: true, elevate: true },
  { feature: 'Portfolio / Blog Pages', vula: false, khula: true, elevate: true },
  { feature: 'AI WhatsApp Chatbot', vula: false, khula: '24/7', elevate: '24/7 Sales & Support' },
  { feature: 'Quote / Booking System', vula: false, khula: true, elevate: true },
  { feature: 'SEO Keyword Targeting', vula: false, khula: '3 keywords', elevate: 'Advanced + Monthly Report' },
  { feature: 'Google Analytics + Search Console', vula: false, khula: true, elevate: true },
  { feature: 'Sanity CMS', vula: false, khula: false, elevate: true },
  { feature: 'E-Commerce Ready', vula: false, khula: false, elevate: true },
  { feature: 'Custom Integrations (CRM, Payments)', vula: false, khula: false, elevate: true },
  { feature: 'Delivery Time', vula: '5–7 days', khula: '10–14 days', elevate: '3–4 weeks' },
]

interface SchoolCompareRow {
  feature: string
  presenca: string | boolean
  ikredibo: string | boolean
  mastery: string | boolean
}

const schoolCompareRows: SchoolCompareRow[] = [
  { feature: 'Pages', presenca: '5', ikredibo: '10', mastery: 'Unlimited' },
  { feature: 'Hosting & Domain (Year 1)', presenca: true, ikredibo: true, mastery: true },
  { feature: 'Mobile-First Fast Design', presenca: true, ikredibo: true, mastery: true },
  { feature: 'WhatsApp Click-to-Chat', presenca: true, ikredibo: true, mastery: true },
  { feature: 'Google Maps + Contact Form', presenca: true, ikredibo: true, mastery: true },
  { feature: 'Basic SEO', presenca: true, ikredibo: true, mastery: true },
  { feature: 'News & Announcements', presenca: false, ikredibo: true, mastery: true },
  { feature: 'Parent Enquiry / Enrolment Form', presenca: false, ikredibo: true, mastery: true },
  { feature: 'Google Analytics Dashboard', presenca: false, ikredibo: true, mastery: true },
  { feature: 'Branded School Email', presenca: false, ikredibo: true, mastery: true },
  { feature: 'Sanity CMS', presenca: false, ikredibo: false, mastery: true },
  { feature: 'AI Chatbot', presenca: false, ikredibo: false, mastery: '24/7 Admissions & FAQ' },
  { feature: 'Downloads Portal', presenca: false, ikredibo: false, mastery: true },
  { feature: 'Staff / SGB Portal with Login', presenca: false, ikredibo: false, mastery: true },
  { feature: 'Advanced SEO + Search Console', presenca: false, ikredibo: false, mastery: true },
]

/* ── Cell renderer ───────────────────────────────────────── */
function CellValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return <Check className="w-4 h-4 text-[#34D399] mx-auto" />
  }
  if (value === false) {
    return <span className="text-[var(--cd-text-dim)] mx-auto">—</span>
  }
  return <span className="text-[var(--cd-text-muted)] text-sm">{value}</span>
}

/* ── Main Page Component ─────────────────────────────────── */
export default function PricingPageClient() {
  const [billingMode, setBillingMode] = useState<'onceoff' | 'retainer'>('onceoff')
  const [showBusinessCompare, setShowBusinessCompare] = useState(false)
  const [showSchoolCompare, setShowSchoolCompare] = useState(false)

  const cinematicEasing = [0.16, 1, 0.3, 1] as const

  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen flex flex-col bg-[#080808]">
        {/* ─── HERO BANNER ──────────────────────────────── */}
        <section className="aurora-bg relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
          {/* Gradient orbs */}
          <GradientOrbs />
          {/* Scan lines */}
          <ScanLines />
          {/* Grain overlay */}
          <GrainOverlay />
          {/* Floating sparkles */}
          <FloatingSparkles />

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

            {/* Section label */}
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: cinematicEasing }}
              className="section-label inline-block mb-4"
            >
              Pricing
            </motion.span>

            {/* Gradient heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24, scale: 0.96, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.1, ease: cinematicEasing }}
              className="gold-gradient-text heading-shadow-lg font-display font-bold leading-tight mb-5"
              style={{ fontSize: 'var(--text-h1)' }}
            >
              Our Pricing
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: cinematicEasing }}
              className="text-[var(--cd-text-muted)] text-lg md:text-xl max-w-2xl mx-auto mb-10"
            >
              Real prices. Real work. No hidden fees.
              <br className="hidden sm:block" />
              Choose the package that fits your needs.
            </motion.p>

            {/* ── Pricing Toggle ──────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: cinematicEasing }}
              className="inline-flex items-center gap-4 rounded-full glass-card px-2 py-2"
            >
              <button
                onClick={() => setBillingMode('onceoff')}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  billingMode === 'onceoff'
                    ? 'text-[#080808]'
                    : 'text-[var(--cd-text-muted)] hover:text-[var(--cd-text)]'
                }`}
              >
                {billingMode === 'onceoff' && (
                  <motion.div
                    layoutId="billingToggle"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, #E8CA7A)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">Once-off</span>
              </button>
              <button
                onClick={() => setBillingMode('retainer')}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  billingMode === 'retainer'
                    ? 'text-[#080808]'
                    : 'text-[var(--cd-text-muted)] hover:text-[var(--cd-text)]'
                }`}
              >
                {billingMode === 'retainer' && (
                  <motion.div
                    layoutId="billingToggle"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, #E8CA7A)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">Monthly Retainer</span>
              </button>
            </motion.div>

            {/* Small note under toggle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-[var(--cd-text-dim)] text-xs mt-3 font-mono tracking-wide"
            >
              {billingMode === 'onceoff'
                ? 'Pay once — own your website forever'
                : 'Monthly retainer — ongoing support & maintenance included'}
            </motion.p>
          </div>
        </section>

        {/* ─── PRICING COMPONENT ────────────────────────── */}
        <Pricing billingMode={billingMode} />

        {/* ─── COMPARISON TABLE SECTION ─────────────────── */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#C9A84C] blur-[200px] opacity-[0.03]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: cinematicEasing }}
              className="text-center mb-12"
            >
              <span className="section-label inline-block mb-4">Compare</span>
              <h2
                className="gold-gradient-text heading-shadow font-display font-bold leading-tight mb-3"
                style={{ fontSize: 'var(--text-h2)' }}
              >
                Side-by-Side Comparison
              </h2>
              <p className="text-[var(--cd-text-muted)] text-lg max-w-xl mx-auto">
                See exactly what each package includes at a glance.
              </p>
            </motion.div>

            {/* Business Compare Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: cinematicEasing }}
              className="mb-6"
            >
              <button
                onClick={() => setShowBusinessCompare(!showBusinessCompare)}
                className="inline-flex items-center gap-2 text-[var(--cd-text)] font-display font-semibold text-lg hover:text-[#C9A84C] transition-colors group"
              >
                <Sparkles className="w-5 h-5 text-[#C9A84C]" />
                Small Business Packages
                <ChevronDown
                  className={`w-5 h-5 text-[var(--cd-text-dim)] transition-transform duration-300 ${
                    showBusinessCompare ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </motion.div>

            <AnimatePresence>
              {showBusinessCompare && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: cinematicEasing }}
                  className="overflow-hidden mb-16"
                >
                  <div className="glass-card rounded-xl overflow-hidden">
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full min-w-[600px]">
                        <thead>
                          <tr className="border-b border-[var(--cd-border)]">
                            <th className="text-left py-4 px-5 text-[var(--cd-text-dim)] text-xs font-mono uppercase tracking-wider">
                              Feature
                            </th>
                            <th className="text-center py-4 px-4">
                              <span className="gold-gradient-text font-display font-bold">Vula</span>
                            </th>
                            <th className="text-center py-4 px-4 bg-[rgba(52,211,153,0.03)]">
                              <span className="emerald-gradient-text font-display font-bold">Khula</span>
                            </th>
                            <th className="text-center py-4 px-4">
                              <span className="cyan-gradient-text font-display font-bold">Elevate</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {businessCompareRows.map((row, i) => (
                            <tr
                              key={row.feature}
                              className={`border-b border-[var(--cd-border)]/50 transition-colors hover:bg-[rgba(255,255,255,0.015)] ${
                                i % 2 === 0 ? 'bg-transparent' : 'bg-[rgba(255,255,255,0.01)]'
                              }`}
                            >
                              <td className="py-3 px-5 text-[var(--cd-text-muted)] text-sm">
                                {row.feature}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <CellValue value={row.vula} />
                              </td>
                              <td className="py-3 px-4 text-center bg-[rgba(52,211,153,0.015)]">
                                <CellValue value={row.khula} />
                              </td>
                              <td className="py-3 px-4 text-center">
                                <CellValue value={row.elevate} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* School Compare Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: cinematicEasing }}
              className="mb-6"
            >
              <button
                onClick={() => setShowSchoolCompare(!showSchoolCompare)}
                className="inline-flex items-center gap-2 text-[var(--cd-text)] font-display font-semibold text-lg hover:text-[#C9A84C] transition-colors group"
              >
                <Sparkles className="w-5 h-5 text-[#34D399]" />
                School Website Packages
                <ChevronDown
                  className={`w-5 h-5 text-[var(--cd-text-dim)] transition-transform duration-300 ${
                    showSchoolCompare ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </motion.div>

            <AnimatePresence>
              {showSchoolCompare && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: cinematicEasing }}
                  className="overflow-hidden mb-8"
                >
                  <div className="glass-card rounded-xl overflow-hidden">
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full min-w-[600px]">
                        <thead>
                          <tr className="border-b border-[var(--cd-border)]">
                            <th className="text-left py-4 px-5 text-[var(--cd-text-dim)] text-xs font-mono uppercase tracking-wider">
                              Feature
                            </th>
                            <th className="text-center py-4 px-4">
                              <span className="gold-gradient-text font-display font-bold">Presença</span>
                            </th>
                            <th className="text-center py-4 px-4 bg-[rgba(52,211,153,0.03)]">
                              <span className="emerald-gradient-text font-display font-bold">Ikredibo</span>
                            </th>
                            <th className="text-center py-4 px-4">
                              <span className="cyan-gradient-text font-display font-bold">Mastery</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {schoolCompareRows.map((row, i) => (
                            <tr
                              key={row.feature}
                              className={`border-b border-[var(--cd-border)]/50 transition-colors hover:bg-[rgba(255,255,255,0.015)] ${
                                i % 2 === 0 ? 'bg-transparent' : 'bg-[rgba(255,255,255,0.01)]'
                              }`}
                            >
                              <td className="py-3 px-5 text-[var(--cd-text-muted)] text-sm">
                                {row.feature}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <CellValue value={row.presenca} />
                              </td>
                              <td className="py-3 px-4 text-center bg-[rgba(52,211,153,0.015)]">
                                <CellValue value={row.ikredibo} />
                              </td>
                              <td className="py-3 px-4 text-center">
                                <CellValue value={row.mastery} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ─── MONEY-BACK GUARANTEE ─────────────────────── */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 aurora-bg" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: cinematicEasing }}
              className="glass-card-gold rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
            >
              {/* Shimmer sweep */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(105deg, transparent 40%, rgba(201,168,76,0.06) 50%, transparent 60%)',
                  backgroundSize: '200% 100%',
                  animation: 'gold-shimmer 6s linear infinite',
                }}
              />

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: cinematicEasing }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] mb-6"
                >
                  <Shield className="w-8 h-8 text-[#C9A84C]" />
                </motion.div>

                <h3 className="gold-gradient-text font-display font-bold text-2xl md:text-3xl mb-4">
                  Money-Back Guarantee
                </h3>
                <p className="text-[var(--cd-text-muted)] text-base md:text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
                  If you are not satisfied with the initial design concepts after the first revision round, we will refund your deposit in full — <span className="text-[#C9A84C] font-semibold">no questions asked</span>. We stand behind every pixel we deliver.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--cd-text-dim)]">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#34D399]" />
                    Full deposit refund
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#34D399]" />
                    No questions asked
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#34D399]" />
                    Zero risk to you
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── FAQ SECTION ──────────────────────────────── */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-[#A78BFA] blur-[180px] opacity-[0.03]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: cinematicEasing }}
              className="text-center mb-12"
            >
              <span className="section-label inline-block mb-4">FAQ</span>
              <h2
                className="gold-gradient-text heading-shadow font-display font-bold leading-tight mb-3"
                style={{ fontSize: 'var(--text-h2)' }}
              >
                Pricing Questions
              </h2>
              <p className="text-[var(--cd-text-muted)] text-lg">
                Everything you need to know about our pricing and process.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: cinematicEasing }}
            >
              <Accordion type="single" collapsible className="space-y-3">
                {pricingFaqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="glass-card rounded-xl px-5 md:px-6 border-b-0 data-[state=open]:border-[rgba(201,168,76,0.2)] data-[state=open]:shadow-[0_0_20px_rgba(201,168,76,0.06)] transition-all duration-300"
                  >
                    <AccordionTrigger className="text-[var(--cd-text)] hover:text-[#C9A84C] font-display font-semibold text-sm md:text-base py-5 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[var(--cd-text-muted)] text-sm leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* ─── CTA SECTION ──────────────────────────────── */}
        <section className="aurora-bg relative py-20 md:py-28 overflow-hidden">
          {/* Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#C9A84C] blur-[180px] opacity-[0.06]" />
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
                className="gold-gradient-text heading-shadow-lg font-display font-bold mb-6"
                style={{ fontSize: 'var(--text-h2)' }}
              >
                Ready to Get Started?
              </h2>
              <p className="text-[var(--cd-text-muted)] text-lg md:text-xl max-w-xl mx-auto mb-10">
                Let&apos;s build something that works for your business. No hidden costs, no surprises — just real results.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <a
                  href="#contact"
                  className="btn-press btn-glow-gold inline-flex items-center justify-center px-8 py-4 text-[#080808] font-display font-bold text-sm tracking-wide rounded-xl transition-all duration-300 shadow-lg shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/35"
                  style={{
                    background: 'linear-gradient(135deg, #C9A84C, #E8CA7A)',
                  }}
                >
                  Start Your Project
                </a>
                <a
                  href="https://wa.me/27724026893?text=Hi%20Carter%20Digitals%2C%20I%27d%20like%20to%20discuss%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-2 text-[#C8C8C0] hover:text-[#C9A84C] font-sans text-base transition-colors duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  Prefer to chat? Message us on WhatsApp.
                </a>
              </div>
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
