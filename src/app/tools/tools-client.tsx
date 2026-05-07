'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Calculator, BarChart3, Search, Award, Layers,
  ArrowRight, Zap, ShieldCheck, Globe, Star, Clock,
  ChevronRight, Sparkles, TrendingUp, CheckCircle2,
  Users, Target, Lightbulb, ArrowLeft, Filter
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

type ToolCategory = 'all' | 'calculator' | 'audit' | 'compliance'

interface ToolFeature {
  icon: React.ElementType
  text: string
}

interface ToolData {
  icon: React.ElementType
  name: string
  tagline: string
  description: string
  detailedDescription: string
  features: ToolFeature[]
  cta: string
  href: string
  badge: string | null
  badgeColor: string
  accentColor: string
  stats: string
  category: ToolCategory
  timeToUse: string
  preview: string
}

const tools: ToolData[] = [
  {
    icon: Calculator,
    name: 'Website Cost Calculator',
    tagline: 'Know exactly what your website will cost — before you commit',
    description:
      'Get an instant estimate based on pages, features, and timeline. See exactly what your website will cost — no surprises.',
    detailedDescription:
      'Our Website Cost Calculator gives you a transparent, instant estimate tailored to South African businesses. Simply select the number of pages, choose the features you need (e-commerce, booking systems, CMS, etc.), and pick your delivery timeline. You\'ll get a detailed breakdown with no hidden costs. Share your quote via email or download it as a PDF — perfect for budget planning and procurement approval.',
    features: [
      { icon: Target, text: 'Page-based pricing with feature add-ons' },
      { icon: Clock, text: 'Timeline-adjusted estimates (standard to rush)' },
      { icon: CheckCircle2, text: 'Share & email your quote instantly' },
      { icon: Lightbulb, text: 'Smart package recommendation based on your needs' },
      { icon: BarChart3, text: 'Side-by-side package comparison view' },
    ],
    cta: 'Use Calculator',
    href: '/tools/website-cost-calculator',
    badge: 'MOST POPULAR',
    badgeColor: 'text-cd-gold border-cd-gold-dim bg-cd-gold/5',
    accentColor: 'gold',
    stats: '2,400+ estimates generated',
    category: 'calculator',
    timeToUse: '~2 min',
    preview: 'Pages, features & timeline estimator with share & email quote',
  },
  {
    icon: TrendingUp,
    name: 'ROI Calculator',
    tagline: 'See how a professional website pays for itself',
    description:
      'See how a professional website pays for itself with conversion rate improvements and increased revenue.',
    detailedDescription:
      'The ROI Calculator helps you project the return on investment from a professional website or redesign. Enter your current monthly revenue, traffic, and conversion rate — then see how improvements in design, speed, and SEO translate to real Rand value. Includes a 12-month revenue projection chart, industry benchmarks for South African businesses, and a detailed breakdown of where your investment goes.',
    features: [
      { icon: TrendingUp, text: '12-month revenue projection chart' },
      { icon: BarChart3, text: 'Industry benchmarks for SA businesses' },
      { icon: Target, text: 'Conversion rate impact analysis' },
      { icon: CheckCircle2, text: 'Side-by-side before/after comparison' },
      { icon: Lightbulb, text: 'Actionable insights for growth' },
    ],
    cta: 'Calculate ROI',
    href: '/tools/roi-calculator',
    badge: null,
    badgeColor: '',
    accentColor: 'emerald',
    stats: 'Average ROI: +347%',
    category: 'calculator',
    timeToUse: '~1 min',
    preview: 'Revenue projection with 12-month chart & industry benchmarks',
  },
  {
    icon: Search,
    name: 'Free SEO Audit',
    tagline: 'Find out why your website isn\'t ranking — and how to fix it',
    description:
      'Get a comprehensive SEO health check for your website. See your score across 5 categories with actionable tips.',
    detailedDescription:
      'Our Free SEO Audit tool analyzes your website across 5 critical categories: Technical SEO, On-Page Content, Mobile & Performance, Local SEO, and Backlinks & Authority. Each category gets a detailed score with specific, actionable recommendations. Includes priority actions sorted by impact, a competitor comparison feature, and a downloadable checklist you can hand to your developer. Built specifically with South African search patterns and Google.co.za in mind.',
    features: [
      { icon: Search, text: '5-category deep scoring (Technical, Content, Mobile, Local, Authority)' },
      { icon: Zap, text: 'Priority actions sorted by impact' },
      { icon: Users, text: 'Competitor comparison analysis' },
      { icon: CheckCircle2, text: 'Downloadable action checklist' },
      { icon: Globe, text: 'Google.co.za focused recommendations' },
    ],
    cta: 'Run Audit',
    href: '/tools/seo-audit',
    badge: 'NEW',
    badgeColor: 'text-cd-violet border-cd-violet-dim bg-cd-violet/5',
    accentColor: 'violet',
    stats: '5-category deep analysis',
    category: 'audit',
    timeToUse: '~3 min',
    preview: '5-category scoring with priority actions & competitor comparison',
  },
  {
    icon: Award,
    name: 'B-BBEE Score Estimator',
    tagline: 'South Africa\'s only B-BBEE supplier score estimator',
    description:
      "South Africa's only B-BBEE supplier score estimator. See how your spend with Carter Digitals boosts your scorecard.",
    detailedDescription:
      'This unique tool helps procurement managers and business owners understand the B-BBEE impact of working with Carter Digitals. As a 100% Black-owned, B-BBEE Level 1 contributor with 135% procurement recognition, your spend with us directly boosts your own scorecard. Enter your annual digital services budget and see the exact point contribution across all 5 B-BBEE elements. Includes a multi-year projection showing how sustained spend compounds your score, plus procurement tips for maximizing your points.',
    features: [
      { icon: Award, text: '135% procurement recognition calculation' },
      { icon: BarChart3, text: 'Multi-year score projection chart' },
      { icon: ShieldCheck, text: 'All 5 B-BBEE element breakdowns' },
      { icon: CheckCircle2, text: 'Procurement optimization tips' },
      { icon: Lightbulb, text: 'FAQ for common B-BBEE questions' },
    ],
    cta: 'Estimate Score',
    href: '/tools/bbbee-calculator',
    badge: 'UNIQUE',
    badgeColor: 'text-cd-gold border-cd-gold-dim bg-cd-gold/5',
    accentColor: 'gold',
    stats: '135% procurement recognition',
    category: 'compliance',
    timeToUse: '~1 min',
    preview: 'Scorecard impact, multi-year projection & procurement tips',
  },
  {
    icon: Layers,
    name: 'Project Estimator',
    tagline: 'Get a project estimate in 3 simple steps',
    description:
      'Select your service type, choose features, and get an instant project estimate with timeline — all in 3 steps.',
    detailedDescription:
      'The Project Estimator is a 3-step wizard that gives you a complete project estimate in minutes. Step 1: Choose your service type (Website, Web App, E-commerce, Brand Design). Step 2: Select the features you need from our curated list. Step 3: Get your instant estimate with a detailed timeline Gantt chart showing each phase from kick-off to launch. Perfect for project planning, budget proposals, and understanding what goes into building your digital presence.',
    features: [
      { icon: Layers, text: '3-step guided wizard (Service → Features → Estimate)' },
      { icon: Clock, text: 'Visual timeline Gantt chart' },
      { icon: CheckCircle2, text: 'Share estimate with your team' },
      { icon: Target, text: 'Feature-specific cost breakdowns' },
      { icon: Sparkles, text: 'Smart feature recommendations' },
    ],
    cta: 'Estimate Project',
    href: '/tools/project-estimator',
    badge: null,
    badgeColor: '',
    accentColor: 'cyan',
    stats: '3-step instant estimate',
    category: 'calculator',
    timeToUse: '~2 min',
    preview: '3-step wizard with timeline Gantt chart & share estimate',
  },
]

const CATEGORIES: { value: ToolCategory; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'All Tools', icon: Filter },
  { value: 'calculator', label: 'Calculators', icon: Calculator },
  { value: 'audit', label: 'Audits', icon: Search },
  { value: 'compliance', label: 'Compliance', icon: ShieldCheck },
]

function getAccentClasses(color: string) {
  switch (color) {
    case 'gold':
      return {
        iconBg: 'bg-cd-gold/10 group-hover:bg-cd-gold/20',
        iconColor: 'text-cd-gold',
        borderAccent: 'border-l-cd-gold',
        glowBg: 'bg-cd-gold/5',
        dotColor: 'bg-cd-gold/40',
      }
    case 'emerald':
      return {
        iconBg: 'bg-cd-emerald/10 group-hover:bg-cd-emerald/20',
        iconColor: 'text-cd-emerald',
        borderAccent: 'border-l-cd-emerald',
        glowBg: 'bg-cd-emerald/5',
        dotColor: 'bg-cd-emerald/40',
      }
    case 'cyan':
      return {
        iconBg: 'bg-cd-cyan/10 group-hover:bg-cd-cyan/20',
        iconColor: 'text-cd-cyan',
        borderAccent: 'border-l-cd-cyan',
        glowBg: 'bg-cd-cyan/5',
        dotColor: 'bg-cd-cyan/40',
      }
    case 'violet':
      return {
        iconBg: 'bg-cd-violet/10 group-hover:bg-cd-violet/20',
        iconColor: 'text-cd-violet',
        borderAccent: 'border-l-cd-violet',
        glowBg: 'bg-cd-violet/5',
        dotColor: 'bg-cd-violet/40',
      }
    default:
      return {
        iconBg: 'bg-cd-gold/10 group-hover:bg-cd-gold/20',
        iconColor: 'text-cd-gold',
        borderAccent: 'border-l-cd-gold',
        glowBg: 'bg-cd-gold/5',
        dotColor: 'bg-cd-gold/40',
      }
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function ToolsPageClient() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('all')

  const filteredTools = activeCategory === 'all'
    ? tools
    : tools.filter(t => t.category === activeCategory)

  return (
    <div className="min-h-screen flex flex-col bg-[#080808]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at 20% 40%, rgba(201,168,76,0.06) 0%, transparent 55%), radial-gradient(ellipse at 80% 60%, rgba(34,211,238,0.04) 0%, transparent 50%)',
          }} />
          <div className="absolute inset-0 grid-lines" />
          <div className="absolute inset-0 grain-overlay" />
        </div>

        {/* Neon line at top */}
        <div className="absolute top-0 left-0 right-0">
          <div className="neon-line h-[1px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-cd-text-dim hover:text-cd-gold transition-colors duration-300 text-sm group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Homepage
            </Link>
          </motion.div>

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <div className="h-px w-10 bg-cd-gold/50" />
            <span className="text-cd-gold font-mono text-sm tracking-[0.2em] uppercase flex items-center gap-1.5">
              <Zap size={12} className="opacity-60" />
              Free Premium Tools
            </span>
            <div className="h-px w-10 bg-cd-gold/50" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display text-cd-text font-bold leading-tight mb-5 heading-shadow-lg"
            style={{ fontSize: 'clamp(2rem, 5vw + 0.5rem, 3.5rem)' }}
          >
            Free Tools for{' '}
            <span className="text-cd-gold">South African</span>{' '}
            Businesses
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-cd-text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-8"
          >
            No signup. No email. No catch. Just premium tools built to help you
            make smarter decisions for your business.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap"
          >
            <div className="flex items-center gap-2 text-sm text-cd-text-dim">
              <ShieldCheck size={14} className="text-cd-emerald" />
              <span>100% Free</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-cd-border" />
            <div className="flex items-center gap-2 text-sm text-cd-text-dim">
              <Globe size={14} className="text-cd-cyan" />
              <span>No Signup Required</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-cd-border" />
            <div className="flex items-center gap-2 text-sm text-cd-text-dim">
              <Star size={14} className="text-cd-gold" />
              <span>Instant Results</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-cd-border" />
            <div className="flex items-center gap-2 text-sm text-cd-text-dim">
              <Clock size={14} className="text-cd-violet" />
              <span>Under 3 Minutes</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="relative -mt-4 mb-8 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 flex-wrap"
          >
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.value
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`
                    flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium
                    transition-all duration-300 border
                    ${isActive
                      ? 'bg-cd-gold/10 border-cd-gold/30 text-cd-gold'
                      : 'bg-cd-surface border-cd-border text-cd-text-dim hover:border-cd-border-glow hover:text-cd-text'}
                  `}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                  {cat.value !== 'all' && (
                    <span className="text-[10px] font-mono ml-1 opacity-60">
                      ({tools.filter(t => t.category === cat.value).length})
                    </span>
                  )}
                </button>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Tools Grid - Detailed Cards */}
      <section className="relative py-8 md:py-12">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.03) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(34,211,238,0.02) 0%, transparent 50%)',
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-8"
            >
              {filteredTools.map((tool) => {
                const Icon = tool.icon
                const accents = getAccentClasses(tool.accentColor)
                const isHighlighted = tool.badge === 'UNIQUE' || tool.badge === 'MOST POPULAR'

                return (
                  <motion.div
                    key={tool.name}
                    variants={cardVariants}
                    className="group"
                  >
                    <Link
                      href={tool.href}
                      className={`
                        glass-card rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row gap-6 lg:gap-10
                        transition-all duration-500 cursor-pointer relative overflow-hidden block
                        premium-card-hover
                        ${isHighlighted
                          ? `border-l-[3px] ${accents.borderAccent} shadow-[0_0_24px_rgba(201,168,76,0.06)]`
                          : ''}
                      `}
                    >
                      {/* Gold accent bar on hover */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cd-gold to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

                      {/* Shimmer sweep on hover */}
                      <div className="absolute inset-0 pointer-events-none shimmer-sweep" />

                      {/* Left: Icon + Info */}
                      <div className="flex-1 min-w-0">
                        {/* Top row: Icon + Badge */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-4">
                            <div className={`flex items-center justify-center w-14 h-14 rounded-xl ${accents.iconBg} transition-all duration-300 shrink-0`}>
                              <Icon className={`w-6 h-6 ${accents.iconColor} group-hover:scale-110 transition-transform duration-300`} strokeWidth={1.8} />
                            </div>
                            <div>
                              <h3 className="font-display text-cd-text font-semibold text-lg sm:text-xl leading-snug group-hover:text-cd-gold transition-colors duration-300">
                                {tool.name}
                              </h3>
                              <p className="text-cd-text-dim text-sm mt-0.5">{tool.tagline}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {tool.badge && (
                              <Badge
                                variant="outline"
                                className={`${tool.badgeColor} text-[10px] font-mono tracking-wider px-2.5 py-0.5`}
                              >
                                {tool.badge}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Detailed description */}
                        <p className="text-cd-text-muted text-sm sm:text-base leading-relaxed mb-5">
                          {tool.detailedDescription}
                        </p>

                        {/* Features list */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                          {tool.features.map((feature, i) => {
                            const FeatureIcon = feature.icon
                            return (
                              <div
                                key={i}
                                className="flex items-center gap-2.5 text-sm text-cd-text-dim group-hover:text-cd-text-muted transition-colors duration-300"
                              >
                                <FeatureIcon className={`w-4 h-4 ${accents.iconColor} opacity-60 shrink-0`} />
                                <span>{feature.text}</span>
                              </div>
                            )
                          })}
                        </div>

                        {/* Stats + Time */}
                        <div className="flex items-center gap-4 text-xs text-cd-text-dim font-mono">
                          <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${accents.dotColor}`} />
                            {tool.stats}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {tool.timeToUse}
                          </div>
                        </div>
                      </div>

                      {/* Right: CTA card */}
                      <div className="flex flex-col items-center justify-center gap-4 lg:w-56 shrink-0">
                        <div className={`${accents.glowBg} rounded-xl p-6 text-center border border-cd-border/50 group-hover:border-cd-gold/20 transition-all duration-300`}>
                          <Icon className={`w-8 h-8 ${accents.iconColor} mx-auto mb-3`} strokeWidth={1.5} />
                          <div className="inline-flex items-center gap-2 text-cd-gold text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                            {tool.cta}
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </div>
                        <span className="text-cd-text-dim text-[11px] font-mono">Free · No signup</span>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="relative py-16 md:py-20">
        <div className="absolute inset-0 pointer-events-none aurora-bg" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-[var(--text-h2)] text-cd-text font-bold leading-tight mb-4 heading-shadow">
              All Tools Are{' '}
              <span className="text-cd-gold">100% Free</span>
            </h2>
            <p className="text-cd-text-muted text-lg max-w-xl mx-auto mb-8">
              No hidden costs. No email walls. No signups. Just premium tools built
              by Carter Digitals to help South African businesses thrive.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/tools/website-cost-calculator"
                className="btn-press btn-glow-gold inline-flex items-center gap-2.5 px-8 py-4 bg-cd-gold text-cd-bg font-bold rounded-xl hover:bg-cd-gold-light hover:shadow-[0_0_50px_rgba(201,168,76,0.4)] transition-all duration-300 shadow-lg shadow-cd-gold/25 text-sm"
              >
                Try Our Most Popular Tool
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#contact"
                className="btn-press inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm border border-cd-border text-cd-gold hover:border-cd-gold/40 hover:bg-cd-gold/5 transition-all duration-300"
              >
                Get a Custom Quote
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Free Section */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8 sm:p-10"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cd-gold/10 shrink-0">
                <Sparkles className="w-5 h-5 text-cd-gold" />
              </div>
              <div>
                <h3 className="font-display text-cd-text font-semibold text-xl mb-2">
                  Why Are These Tools Free?
                </h3>
                <p className="text-cd-text-muted text-sm sm:text-base leading-relaxed">
                  We believe in adding value before asking for anything. These tools are built
                  from real experience working with hundreds of South African businesses. They
                  reflect the actual pricing, timelines, and challenges we see every day. Use them
                  to plan, budget, and make informed decisions — whether you work with us or not.
                  When you&apos;re ready for a partner who understands your market,{' '}
                  <Link href="/#contact" className="text-cd-gold hover:text-cd-gold-light transition-colors underline underline-offset-4">
                    we&apos;re here
                  </Link>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}
