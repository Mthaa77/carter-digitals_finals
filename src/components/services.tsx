'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, LayoutDashboard, TrendingUp, ChevronDown, Check } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'SME Websites',
    tagline: 'Fast, beautiful, built to rank.',
    description:
      'Mobile-first, SEO-optimised websites that load fast and convert visitors into customers. From R7,950.',
    cta: 'Website Packages →',
    href: '#pricing',
    features: ['Custom Design', 'Mobile-First', 'SEO Setup', 'Contact Form', 'WhatsApp CTA', 'Analytics'],
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboards & Internal Tools',
    tagline: 'Run your business, not just a page.',
    description:
      'Booking systems, stock trackers, staff portals, and quote generators. Custom tools built around your workflows. From R15,000.',
    cta: 'See What We Build →',
    href: '#portfolio',
    features: ['Staff Portals', 'Booking Systems', 'Stock Trackers', 'Quote Generators', 'Role-Based Access'],
  },
  {
    icon: TrendingUp,
    title: 'SEO & Growth',
    tagline: 'Get found. Stay found.',
    description:
      "Google Ads management, SEO content, and local search optimisation. We don't just build sites — we make sure people find them.",
    cta: 'Growth Packages →',
    href: '#pricing',
    features: ['Google Ads', 'Local SEO', 'Content Strategy', 'Monthly Reports', 'Keyword Research'],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section id="services" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-20"
        >
          <h2 className="font-display text-[var(--text-h2)] font-semibold text-[#F0EFE8] tracking-tight">
            What We Build
          </h2>
          <div className="mt-4 mx-auto w-16 h-[3px] bg-gradient-to-r from-[#7A6330] via-[#C9A84C] to-[#E8CA7A] rounded-full" />
          <p className="mt-5 text-[#B8B8B0] text-lg max-w-xl mx-auto font-sans">
            From your first website to the internal tools that run your
            business.
          </p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            const isExpanded = expandedIndex === index
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="glass-card rounded-xl p-6 md:p-8 group relative overflow-hidden transition-[border-color,box-shadow,transform] duration-300 hover:border-l-[3px] hover:border-l-[#C9A84C]"
              >
                {/* Icon */}
                <div className="mb-5 flex items-center justify-center w-12 h-12 rounded-lg bg-[rgba(201,168,76,0.08)] border border-[#242424] group-hover:border-[#7A6330] transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#C9A84C]" />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-semibold text-[#F0EFE8] mb-1">
                  {service.title}
                </h3>

                {/* Tagline */}
                <p className="text-[#C9A84C] text-sm font-medium mb-3 font-sans">
                  {service.tagline}
                </p>

                {/* Description */}
                <p className="text-[#B8B8B0] text-sm leading-relaxed mb-6 font-sans">
                  {service.description}
                </p>

                {/* What's Included Toggle */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#B8B8B0] hover:text-[#C9A84C] transition-colors duration-200 mb-3 font-sans"
                  aria-expanded={isExpanded}
                >
                  What&apos;s Included
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2 mb-4">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-[#B8B8B0] font-sans">
                            <Check className="w-3.5 h-3.5 text-[#C9A84C] shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CTA Link */}
                <a
                  href={service.href}
                  className="inline-flex items-center text-sm font-medium text-[#C9A84C] hover:text-[#E8CA7A] transition-colors duration-200 font-sans group/link"
                >
                  {service.cta}
                  <span className="ml-1 transition-transform duration-200 group-hover/link:translate-x-1">
                    &nbsp;
                  </span>
                </a>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
