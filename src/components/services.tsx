'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, LayoutDashboard, Settings, Palette, FileImage, Presentation, ChevronDown, Check } from 'lucide-react'
import { useServiceDetail, ServiceDetailModal } from '@/components/service-detail-modal'

/* ── Accent config per service ─────────────────────────── */
type AccentColor = 'gold' | 'emerald' | 'cyan' | 'violet' | 'rose'

const accentConfig: Record<AccentColor, {
  glassClass: string
  cardShadow: string
  topBorder: string
  iconBg: string
  iconBorder: string
  iconHoverBorder: string
  iconColor: string
  taglineColor: string
  checkColor: string
  expandHoverColor: string
  ctaColor: string
  ctaHover: string
  numberColor: string
  gradientText: string
  bottomGradientFrom: string
  bottomGradientVia: string
  bottomGradientTo: string
}> = {
  gold: {
    glassClass: 'glass-card-gold',
    cardShadow: 'card-shadow-gold',
    topBorder: 'border-t-[#C9A84C]',
    iconBg: 'bg-[rgba(201,168,76,0.08)]',
    iconBorder: 'border-[#242424]',
    iconHoverBorder: 'group-hover:border-[#7A6330]',
    iconColor: 'text-[#C9A84C]',
    taglineColor: 'text-[#C9A84C]',
    checkColor: 'text-[#C9A84C]',
    expandHoverColor: 'hover:text-[#C9A84C]',
    ctaColor: 'text-[#C9A84C]',
    ctaHover: 'hover:text-[#E8CA7A]',
    numberColor: 'text-[#C9A84C]/30',
    gradientText: 'gold-gradient-text',
    bottomGradientFrom: 'from-transparent',
    bottomGradientVia: 'via-[#C9A84C]',
    bottomGradientTo: 'to-transparent',
  },
  emerald: {
    glassClass: 'glass-card-emerald',
    cardShadow: 'card-shadow-emerald',
    topBorder: 'border-t-[#34D399]',
    iconBg: 'bg-[rgba(52,211,153,0.08)]',
    iconBorder: 'border-[#1A3A2A]',
    iconHoverBorder: 'group-hover:border-[#065F46]',
    iconColor: 'text-[#34D399]',
    taglineColor: 'text-[#34D399]',
    checkColor: 'text-[#34D399]',
    expandHoverColor: 'hover:text-[#34D399]',
    ctaColor: 'text-[#34D399]',
    ctaHover: 'hover:text-[#6EE7B7]',
    numberColor: 'text-[#34D399]/30',
    gradientText: 'emerald-gradient-text',
    bottomGradientFrom: 'from-transparent',
    bottomGradientVia: 'via-[#34D399]',
    bottomGradientTo: 'to-transparent',
  },
  cyan: {
    glassClass: 'glass-card-cyan',
    cardShadow: 'card-shadow-cyan',
    topBorder: 'border-t-[#22D3EE]',
    iconBg: 'bg-[rgba(34,211,238,0.08)]',
    iconBorder: 'border-[#1A2A3A]',
    iconHoverBorder: 'group-hover:border-[#0E7490]',
    iconColor: 'text-[#22D3EE]',
    taglineColor: 'text-[#22D3EE]',
    checkColor: 'text-[#22D3EE]',
    expandHoverColor: 'hover:text-[#22D3EE]',
    ctaColor: 'text-[#22D3EE]',
    ctaHover: 'hover:text-[#67E8F9]',
    numberColor: 'text-[#22D3EE]/30',
    gradientText: 'cyan-gradient-text',
    bottomGradientFrom: 'from-transparent',
    bottomGradientVia: 'via-[#22D3EE]',
    bottomGradientTo: 'to-transparent',
  },
  violet: {
    glassClass: 'glass-card-violet',
    cardShadow: 'card-shadow-violet',
    topBorder: 'border-t-[#A78BFA]',
    iconBg: 'bg-[rgba(167,139,250,0.08)]',
    iconBorder: 'border-[#2A1A3A]',
    iconHoverBorder: 'group-hover:border-[#4C1D95]',
    iconColor: 'text-[#A78BFA]',
    taglineColor: 'text-[#A78BFA]',
    checkColor: 'text-[#A78BFA]',
    expandHoverColor: 'hover:text-[#A78BFA]',
    ctaColor: 'text-[#A78BFA]',
    ctaHover: 'hover:text-[#C4B5FD]',
    numberColor: 'text-[#A78BFA]/30',
    gradientText: 'violet-gradient-text',
    bottomGradientFrom: 'from-transparent',
    bottomGradientVia: 'via-[#A78BFA]',
    bottomGradientTo: 'to-transparent',
  },
  rose: {
    glassClass: 'glass-card-rose',
    cardShadow: 'card-shadow-gold', // fallback
    topBorder: 'border-t-[#FB7185]',
    iconBg: 'bg-[rgba(251,113,133,0.08)]',
    iconBorder: 'border-[#3A1A22]',
    iconHoverBorder: 'group-hover:border-[#9F1239]',
    iconColor: 'text-[#FB7185]',
    taglineColor: 'text-[#FB7185]',
    checkColor: 'text-[#FB7185]',
    expandHoverColor: 'hover:text-[#FB7185]',
    ctaColor: 'text-[#FB7185]',
    ctaHover: 'hover:text-[#FECDD3]',
    numberColor: 'text-[#FB7185]/30',
    gradientText: 'rose-gradient-text',
    bottomGradientFrom: 'from-transparent',
    bottomGradientVia: 'via-[#FB7185]',
    bottomGradientTo: 'to-transparent',
  },
}

/* ── Service data ───────────────────────────────────────── */
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
    accent: 'gold' as AccentColor,
    image: null as string | null,
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
    accent: 'emerald' as AccentColor,
    image: '/email-marketing-banner.png',
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
    accent: 'cyan' as AccentColor,
    image: null as string | null,
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
    accent: 'violet' as AccentColor,
    image: '/social-media-ad.png',
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
    accent: 'rose' as AccentColor,
    image: null as string | null,
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
    accent: 'gold' as AccentColor,
    image: '/pitch-deck-cover.png',
  },
]

/* ── Animation variants ─────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
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

/* ── Component ──────────────────────────────────────────── */
export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const { openService, open, setOpen, activeServiceId } = useServiceDetail()

  return (
    <section id="services" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ── Section Header ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="section-label inline-block gold-gradient-text font-semibold">
            Our Services
          </span>
          <h2
            className="heading-shadow-lg gold-gradient-text font-display tracking-tight mt-3"
            style={{ fontSize: 'var(--text-h2)' }}
          >
            What We Build
          </h2>
          <div className="mt-5 mx-auto w-20 h-[3px] bg-gradient-to-r from-[#7A6330] via-[#C9A84C] to-[#E8CA7A] rounded-full" />
          <p className="mt-6 text-[#C8C8C0] text-lg max-w-xl mx-auto font-sans">
            From your first website to the internal tools that run your
            business — and everything in between.
          </p>
        </motion.div>

        {/* ── Service Cards Grid ──────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            const isExpanded = expandedIndex === index
            const accent = accentConfig[service.accent]

            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                onClick={() => openService(service.id)}
                className={`glass-card ${accent.glassClass} ${accent.cardShadow} hover-lift rounded-xl group relative overflow-hidden transition-[border-color,box-shadow,transform] duration-300 cursor-pointer border-t-2 ${accent.topBorder}`}
              >
                {/* ── Image area (only for cards with images) ── */}
                {service.image && (
                  <div className="image-overlay-gradient relative w-full aspect-[16/9] sm:aspect-[2/1]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[rgba(8,8,8,0.5)] to-transparent pointer-events-none" />
                  </div>
                )}

                {/* ── Card content ── */}
                <div className="p-6 md:p-8">
                  {/* Service number indicator */}
                  <span className={`absolute top-4 right-4 font-mono text-xs ${accent.numberColor} select-none`}>
                    0{index + 1}
                  </span>

                  {/* Icon */}
                  <div className={`mb-5 flex items-center justify-center w-12 h-12 rounded-lg ${accent.iconBg} border ${accent.iconBorder} ${accent.iconHoverBorder} transition-colors duration-300`}>
                    <Icon className={`w-6 h-6 ${accent.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className={`font-display text-xl font-semibold text-[#F0EFE8] mb-1 ${accent.gradientText}`}>
                    {service.title}
                  </h3>

                  {/* Tagline */}
                  <p className={`${accent.taglineColor} text-sm font-medium mb-3 font-sans`}>
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
                    className={`flex items-center gap-1.5 text-sm font-medium text-[#C8C8C0] ${accent.expandHoverColor} transition-colors duration-200 mb-3 font-sans`}
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
                              <Check className={`w-3.5 h-3.5 ${accent.checkColor} shrink-0`} />
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
                    className={`inline-flex items-center text-sm font-medium ${accent.ctaColor} ${accent.ctaHover} transition-colors duration-200 font-sans group/link`}
                  >
                    {service.cta}
                    <span className="ml-1 transition-transform duration-200 group-hover/link:translate-x-1">
                      &nbsp;
                    </span>
                  </a>
                </div>

                {/* Bottom gradient border on hover */}
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accent.bottomGradientFrom} ${accent.bottomGradientVia} ${accent.bottomGradientTo} opacity-0 group-hover:opacity-40 transition-opacity duration-300`} />
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
