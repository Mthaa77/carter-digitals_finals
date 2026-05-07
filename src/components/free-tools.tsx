'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calculator, BarChart3, Search, Award, ArrowRight, Zap, Globe,
  TrendingUp, ShieldCheck, Layers, Star, Clock, Eye, Filter
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

type ToolCategory = 'all' | 'calculator' | 'audit' | 'compliance'

const tools = [
  {
    icon: Calculator,
    name: 'Website Cost Calculator',
    description:
      'Get an instant estimate based on pages, features, and timeline. See exactly what your website will cost — no surprises.',
    cta: 'Use Calculator',
    href: '/tools/website-cost-calculator',
    badge: 'MOST POPULAR',
    badgeColor: 'text-cd-gold border-cd-gold-dim bg-cd-gold/5',
    accentColor: 'gold',
    stats: '2,400+ estimates generated',
    category: 'calculator' as ToolCategory,
    timeToUse: '~2 min',
    preview: 'Pages, features & timeline estimator with share & email quote',
  },
  {
    icon: TrendingUp,
    name: 'ROI Calculator',
    description:
      'See how a professional website pays for itself with conversion rate improvements and increased revenue.',
    cta: 'Calculate ROI',
    href: '/tools/roi-calculator',
    badge: null,
    badgeColor: '',
    accentColor: 'emerald',
    stats: 'Average ROI: +347%',
    category: 'calculator' as ToolCategory,
    timeToUse: '~1 min',
    preview: 'Revenue projection with 12-month chart & industry benchmarks',
  },
  {
    icon: Search,
    name: 'Free SEO Audit',
    description:
      'Get a comprehensive SEO health check for your website. See your score across 5 categories with actionable tips.',
    cta: 'Run Audit',
    href: '/tools/seo-audit',
    badge: 'NEW',
    badgeColor: 'text-cd-violet border-cd-violet-dim bg-cd-violet/5',
    accentColor: 'violet',
    stats: '5-category deep analysis',
    category: 'audit' as ToolCategory,
    timeToUse: '~3 min',
    preview: '5-category scoring with priority actions & competitor comparison',
  },
  {
    icon: Award,
    name: 'B-BBEE Score Estimator',
    description:
      "South Africa's only B-BBEE supplier score estimator. See how your spend with Carter Digitals boosts your scorecard.",
    cta: 'Estimate Score',
    href: '/tools/bbbee-calculator',
    badge: 'UNIQUE',
    badgeColor: 'text-cd-gold border-cd-gold-dim bg-cd-gold/5',
    accentColor: 'gold',
    stats: '135% procurement recognition',
    category: 'compliance' as ToolCategory,
    timeToUse: '~1 min',
    preview: 'Scorecard impact, multi-year projection & procurement tips',
  },
  {
    icon: Layers,
    name: 'Project Estimator',
    description:
      'Select your service type, choose features, and get an instant project estimate with timeline — all in 3 steps.',
    cta: 'Estimate Project',
    href: '/tools/project-estimator',
    badge: null,
    badgeColor: '',
    accentColor: 'cyan',
    stats: '3-step instant estimate',
    category: 'calculator' as ToolCategory,
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

export default function FreeTools() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('all')
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)

  const filteredTools = activeCategory === 'all'
    ? tools
    : tools.filter(t => t.category === activeCategory)

  return (
    <section id="tools" className="py-20 md:py-28 bg-[#080808] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 30% 20%, rgba(201,168,76,0.04) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(34,211,238,0.03) 0%, transparent 50%)',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-cd-gold/50" />
            <span className="text-cd-gold font-mono text-sm tracking-[0.2em] uppercase flex items-center gap-1.5">
              <Zap size={12} className="opacity-60" />
              Free Premium Tools
            </span>
            <div className="h-px w-10 bg-cd-gold/50" />
          </div>
          <h2 className="font-display text-[var(--text-h2)] text-cd-text font-bold leading-tight mb-3 heading-shadow">
            Free Tools for South African Businesses
          </h2>
          <p className="text-cd-text-muted text-lg max-w-2xl mx-auto">
            No signup. No email. No catch. Just premium tools built to help you make smarter decisions.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
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
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-10 flex-wrap"
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

        {/* Tools Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredTools.map((tool) => {
              const Icon = tool.icon
              const isHighlighted = tool.badge === 'UNIQUE' || tool.badge === 'MOST POPULAR'
              const isHovered = hoveredTool === tool.name

              return (
                <motion.div
                  key={tool.name}
                  variants={cardVariants}
                  className="group"
                  onMouseEnter={() => setHoveredTool(tool.name)}
                  onMouseLeave={() => setHoveredTool(null)}
                >
                  <Link
                    href={tool.href}
                    className={`
                      glass-card rounded-xl p-6 flex flex-col gap-4 transition-all duration-500 cursor-pointer relative overflow-hidden block h-full
                      premium-card-hover
                      ${isHighlighted
                        ? 'border-l-[3px] border-l-cd-gold border-cd-gold-dim/40 shadow-[0_0_24px_rgba(201,168,76,0.06)]'
                        : ''}
                    `}
                  >
                    {/* Gold accent bar on hover */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cd-gold to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

                    {/* Shimmer sweep on hover */}
                    <div className="absolute inset-0 pointer-events-none shimmer-sweep" />

                    {/* Icon + Badge Row */}
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                          isHighlighted
                            ? 'bg-cd-gold/10 group-hover:bg-cd-gold/20'
                            : 'bg-white/[0.04] group-hover:bg-white/[0.06]'
                        }`}
                      >
                        <Icon
                          className="w-5 h-5 text-cd-gold group-hover:scale-110 transition-transform duration-300"
                          strokeWidth={1.8}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Time estimate */}
                        <span className="text-[10px] text-cd-text-dim font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Clock className="w-3 h-3" />
                          {tool.timeToUse}
                        </span>
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

                    {/* Name */}
                    <h3 className="font-display text-cd-text font-semibold text-base leading-snug group-hover:text-cd-gold transition-colors duration-300">
                      {tool.name}
                    </h3>

                    {/* Description */}
                    <p className="text-cd-text-muted text-sm leading-relaxed flex-1">
                      {tool.description}
                    </p>

                    {/* Hover Preview */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="bg-cd-gold/5 rounded-lg px-3 py-2 border border-cd-gold/10 flex items-center gap-2"
                        >
                          <Eye className="w-3.5 h-3.5 text-cd-gold shrink-0" />
                          <span className="text-cd-gold text-xs">{tool.preview}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Stat + Time */}
                    <div className="flex items-center justify-between text-xs text-cd-text-dim font-mono">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-cd-gold/40" />
                        {tool.stats}
                      </div>
                      <span className="flex items-center gap-1 sm:hidden">
                        <Clock className="w-3 h-3" />
                        {tool.timeToUse}
                      </span>
                    </div>

                    {/* CTA */}
                    <div className="inline-flex items-center gap-2 text-cd-gold text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                      {tool.cta}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-cd-text-dim text-sm mb-4">
            All tools are free to use, with no hidden costs or email requirements.
          </p>
          <Link
            href="/tools/website-cost-calculator"
            className="btn-press btn-glow-gold inline-flex items-center gap-2 px-8 py-3.5 bg-cd-gold text-cd-bg font-bold rounded-lg hover:bg-cd-gold-light hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-300 text-sm shadow-lg shadow-cd-gold/15"
          >
            Try Our Most Popular Tool
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
