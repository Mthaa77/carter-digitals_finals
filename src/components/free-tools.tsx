'use client'

import { motion } from 'framer-motion'
import { Calculator, BarChart3, Search, Award, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const tools = [
  {
    icon: Calculator,
    name: 'Website Cost Calculator',
    description:
      'Estimate your website cost based on pages, features, and timeline.',
    cta: 'Use Free Tool →',
    href: '#website-cost-calc',
    badge: null,
  },
  {
    icon: BarChart3,
    name: 'ROI Calculator',
    description:
      'See how a new website pays for itself with conversion rate improvements.',
    cta: 'Use Free Tool →',
    href: '#',
    badge: null,
  },
  {
    icon: Search,
    name: 'Free SEO Audit',
    description:
      'Get a basic SEO health check for your current website. No signup needed.',
    cta: 'Use Free Tool →',
    href: '#',
    badge: null,
  },
  {
    icon: Award,
    name: 'B-BBEE Score Estimator',
    description:
      "South Africa's only B-BBEE supplier score estimator. See what your spend qualifies for.",
    cta: 'Use Free Tool →',
    href: '#bbbee-calc',
    badge: 'UNIQUE',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export default function FreeTools() {
  return (
    <section id="tools" className="py-20 md:py-28 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-[var(--cd-gold)]" />
            <span className="text-[var(--cd-gold)] font-mono text-sm tracking-widest uppercase">
              Free Tools
            </span>
          </div>
          <h2 className="font-display text-[var(--text-h2)] text-[var(--cd-text)] font-bold leading-tight mb-3">
            Free Tools for Pretoria Business Owners
          </h2>
          <p className="text-[var(--cd-text-muted)] text-lg">
            No email required. Just useful.
          </p>
        </motion.div>

        {/* Mobile: horizontal scroll / Desktop: grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex gap-4 overflow-x-auto scroll-snap-x pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 custom-scrollbar"
        >
          {tools.map((tool) => {
            const Icon = tool.icon
            const isHighlighted = tool.badge === 'UNIQUE'

            return (
              <motion.div
                key={tool.name}
                variants={cardVariants}
                className={`
                  glass-card rounded-xl p-6 min-w-[280px] md:min-w-0
                  flex flex-col gap-4 transition-all duration-300 cursor-pointer group
                  ${isHighlighted
                    ? 'border-[var(--cd-gold-dim)] shadow-[0_0_24px_rgba(201,168,76,0.08)] hover:border-[var(--cd-gold)] hover:shadow-[0_0_32px_rgba(201,168,76,0.14)]'
                    : 'hover:border-[#3A3A3A]'
                  }
                `}
              >
                {/* Icon + Badge Row */}
                <div className="flex items-start justify-between">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                      isHighlighted
                        ? 'bg-[var(--cd-gold-bg)]'
                        : 'bg-[rgba(255,255,255,0.04)]'
                    }`}
                  >
                    <Icon
                      className="w-5 h-5 text-[var(--cd-gold)]"
                      strokeWidth={1.8}
                    />
                  </div>
                  {tool.badge && (
                    <Badge
                      variant="outline"
                      className="border-[var(--cd-gold-dim)] text-[var(--cd-gold)] bg-[var(--cd-gold-bg)] text-[10px] font-mono tracking-wider px-2 py-0.5"
                    >
                      {tool.badge}
                    </Badge>
                  )}
                </div>

                {/* Name */}
                <h3 className="font-display text-[var(--cd-text)] font-semibold text-base leading-snug">
                  {tool.name}
                </h3>

                {/* Description */}
                <p className="text-[var(--cd-text-muted)] text-sm leading-relaxed flex-1">
                  {tool.description}
                </p>

                {/* CTA */}
                <a
                  href={tool.href}
                  className="inline-flex items-center gap-1.5 text-[var(--cd-gold)] text-sm font-medium group-hover:gap-2.5 transition-all duration-300"
                >
                  {tool.cta}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
