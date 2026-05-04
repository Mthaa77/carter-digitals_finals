'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, LayoutDashboard, Settings, Palette, FileImage, Presentation, ChevronDown, Check } from 'lucide-react'
import { useServiceDetail, ServiceDetailModal } from '@/components/service-detail-modal'

const services = [
  {
    id: 'website-development',
    icon: Globe,
    title: 'Website Development',
    tagline: 'Custom, mobile-first websites for every industry.',
    description:
      'Custom, mobile-first websites for schools, SMEs, law firms, medical practices, guesthouses, and institutions. Built on Next.js with Vercel global hosting and built-in SEO from day one.',
    cta: 'Website Packages →',
    href: '#pricing',
    features: ['Next.js', 'Vercel', 'SEO', 'Mobile-First', '5–7 Day Delivery'],
  },
  {
    id: 'bespoke-web-apps',
    icon: LayoutDashboard,
    title: 'Bespoke Web Applications',
    tagline: 'Custom-built apps for any business challenge.',
    description:
      'Custom-built web apps for any business challenge — client portals, booking systems, inventory management, quoting tools, and interactive dashboards. If your team does it manually, we can automate it.',
    cta: 'See What We Build →',
    href: '#portfolio',
    features: ['React', 'FastAPI', 'PostgreSQL', 'Custom Logic'],
  },
  {
    id: 'internal-tools',
    icon: Settings,
    title: 'Internal Business Tools',
    tagline: 'Built around your exact workflows.',
    description:
      'Staff dashboards, invoice trackers, pipeline managers, HR systems, operations consoles, and any internal process that deserves better than a spreadsheet.',
    cta: 'Discuss Your Project →',
    href: '#contact',
    features: ['Operations', 'Dashboards', 'Automation', 'Portals'],
  },
  {
    id: 'logo-brand-identity',
    icon: Palette,
    title: 'Logo & Brand Identity',
    tagline: 'Every element built for digital and print.',
    description:
      'Professional logo design, brand colour systems, typography guides, and complete identity packages. Every element built for digital and print use from the start.',
    cta: 'Get a Quote →',
    href: '#contact',
    features: ['Logo Design', 'Brand Kit', 'Style Guide', 'Print-Ready'],
  },
  {
    id: 'flyers-posters-print',
    icon: FileImage,
    title: 'Flyers, Posters & Print Media',
    tagline: 'High-impact promotional materials.',
    description:
      'High-impact promotional materials — event flyers, A5/A4 service posters, promotional banners, and social media graphics. Print-ready PDF files delivered with every order.',
    cta: 'Get a Quote →',
    href: '#contact',
    features: ['Flyers', 'Posters', 'Banners', 'Social Graphics', 'Print-Ready'],
  },
  {
    id: 'pitch-decks-profiles',
    icon: Presentation,
    title: 'Pitch Decks & Company Profiles',
    tagline: 'Investor-ready. Tender-ready.',
    description:
      'Investor-ready pitch decks and corporate company profiles that open doors. Designed for tenders, funding applications, enterprise meetings, and government procurement.',
    cta: 'Get a Quote →',
    href: '#contact',
    features: ['Pitch Decks', 'Company Profiles', 'Proposals', 'Tenders'],
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
  const { openService, open, setOpen, activeServiceId } = useServiceDetail()

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
          <span className="section-label inline-block">Our Services</span>
          <h2 className="section-heading text-[var(--text-h2)] tracking-tight">
            What We Build
          </h2>
          <div className="mt-4 mx-auto w-16 h-[3px] bg-gradient-to-r from-[#7A6330] via-[#C9A84C] to-[#E8CA7A] rounded-full" />
          <p className="mt-5 text-[#C8C8C0] text-lg max-w-xl mx-auto font-sans">
            From your first website to the internal tools that run your
            business — and everything in between.
          </p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            const isExpanded = expandedIndex === index
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                onClick={() => openService(service.id)}
                className="glass-card hover-lift rounded-xl p-6 md:p-8 group relative overflow-hidden transition-[border-color,box-shadow,transform] duration-300 hover:border-l-[3px] hover:border-l-[#C9A84C] hover:border-t-2 hover:border-t-cd-gold/40 hover:shadow-[0_0_20px_rgba(201,168,76,0.08)] cursor-pointer"
              >
                {/* Gold gradient bottom border on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

                {/* Service number indicator */}
                <span className="absolute top-4 right-4 font-mono text-xs text-cd-text-dim/40 select-none group-hover:animate-pulse">
                  0{index + 1}
                </span>

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
                <p className="text-[#D8D8D0] text-sm leading-relaxed mb-6 font-sans">
                  {service.description}
                </p>

                {/* What's Included Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setExpandedIndex(isExpanded ? null : index)
                  }}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#C8C8C0] hover:text-[#C9A84C] transition-colors duration-200 mb-3 font-sans"
                  aria-expanded={isExpanded}
                  aria-label={`Toggle ${service.title} features list`}
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
                          <li key={feature} className="flex items-center gap-2 text-sm text-[#C8C8C0] font-sans">
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
                  onClick={(e) => e.stopPropagation()}
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

      {/* Service Detail Modal */}
      <ServiceDetailModal open={open} onOpenChange={setOpen} serviceId={activeServiceId} />
    </section>
  )
}
