'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, Globe, LayoutDashboard, Settings, Palette, FileImage, Presentation } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

const serviceDetails: Record<string, {
  id: string
  title: string
  icon: React.ElementType
  tagline: string
  description: string[]
  features: string[]
  price: string
}> = {
  'website-development': {
    id: 'website-development',
    title: 'Website Development',
    icon: Globe,
    tagline: 'Custom, mobile-first websites for every industry.',
    description: [
      'Your website is your hardest-working salesperson — it never sleeps, never takes leave, and never misses a lead. We build mobile-first, SEO-optimised websites that load in under 3 seconds and convert visitors into paying customers.',
      'Custom-built for schools, SMEs, law firms, medical practices, guesthouses, and institutions. Every site is built on Next.js with Vercel global hosting and built-in SEO from day one. No templates, no shortcuts — custom code tailored to your business.',
      'Whether you\'re starting from zero or upgrading from a Facebook page, we\'ll give you a professional online presence that reflects the quality of your work — delivered in 5–7 working days.',
    ],
    features: [
      'Next.js — cutting-edge framework',
      'Vercel global hosting & CDN',
      'Built-in SEO from day one',
      'Mobile-first responsive design',
      '5–7 working day delivery',
      'WhatsApp CTA integration',
      'Contact form with validation',
      'Google Analytics setup',
      'SSL certificate included',
    ],
    price: 'From R3,999',
  },
  'bespoke-web-apps': {
    id: 'bespoke-web-apps',
    title: 'Bespoke Web Applications',
    icon: LayoutDashboard,
    tagline: 'Custom-built apps for any business challenge.',
    description: [
      'Spreadsheets were fine when you had 5 clients. Now you need systems that scale with you. We build custom web apps for any business challenge — client portals, booking systems, inventory management, quoting tools, and interactive dashboards.',
      'If your team does it manually, we can automate it. Our apps are built on modern, secure infrastructure with role-based access, real-time data, and interfaces your team will actually enjoy using.',
      'From quote generators to inventory management, every tool is designed around your unique workflow — because your business isn\'t generic, and your software shouldn\'t be either.',
    ],
    features: [
      'React & Next.js front-end',
      'FastAPI Python back-end',
      'PostgreSQL database',
      'Custom business logic',
      'Client portals',
      'Booking & scheduling systems',
      'Inventory management',
      'Quoting tools',
      'Interactive dashboards',
    ],
    price: 'From R15,000',
  },
  'internal-tools': {
    id: 'internal-tools',
    title: 'Internal Business Tools',
    icon: Settings,
    tagline: 'Built around your exact workflows.',
    description: [
      'Staff dashboards, invoice trackers, pipeline managers, HR systems, operations consoles, and any internal process that deserves better than a spreadsheet.',
      'We build tools that fit your exact workflows — not the other way around. Every tool is designed around how your team actually works, with intuitive interfaces that require minimal training.',
      'From operations consoles to HR systems, we replace fragmented spreadsheets and manual processes with streamlined, automated solutions your whole team will adopt.',
    ],
    features: [
      'Operations dashboards',
      'Invoice & payment tracking',
      'Pipeline management',
      'HR & staff management',
      'Automated workflows',
      'Secure role-based access',
      'Real-time data & reporting',
      'Mobile-responsive admin',
    ],
    price: 'From R15,000',
  },
  'logo-brand-identity': {
    id: 'logo-brand-identity',
    title: 'Logo & Brand Identity',
    icon: Palette,
    tagline: 'Every element built for digital and print.',
    description: [
      'Your brand is more than a logo — it\'s the feeling people get when they encounter your business. We create professional brand identities that communicate trust, quality, and purpose.',
      'From logo design to complete identity packages, every element is built for digital and print use from the start. Brand colour systems, typography guides, and style guides ensure consistency across every touchpoint.',
      'Whether you\'re launching a new business or rebranding an existing one, we\'ll create an identity that stands out in your market and resonates with your audience.',
    ],
    features: [
      'Professional logo design',
      'Brand colour system',
      'Typography guide',
      'Complete identity package',
      'Print-ready files',
      'Digital asset formats',
      'Style guide document',
      'Social media templates',
    ],
    price: 'From R2,500',
  },
  'flyers-posters-print': {
    id: 'flyers-posters-print',
    title: 'Flyers, Posters & Print Media',
    icon: FileImage,
    tagline: 'High-impact promotional materials.',
    description: [
      'High-impact promotional materials that get attention and drive action. From event flyers to service posters, we create designs that stand out in any medium.',
      'Event flyers, A5/A4 service posters, promotional banners, and social media graphics — all designed to grab attention and communicate your message clearly.',
      'Print-ready PDF files delivered with every order. Whether it\'s for a community event, business promotion, or marketing campaign, your materials will look professional and polished.',
    ],
    features: [
      'Event flyers',
      'A5/A4 service posters',
      'Promotional banners',
      'Social media graphics',
      'Print-ready PDF delivery',
      'Multiple format exports',
      'Revision rounds included',
      'Fast turnaround',
    ],
    price: 'From R500',
  },
  'pitch-decks-profiles': {
    id: 'pitch-decks-profiles',
    title: 'Pitch Decks & Company Profiles',
    icon: Presentation,
    tagline: 'Investor-ready. Tender-ready.',
    description: [
      'Investor-ready pitch decks and corporate company profiles that open doors. Designed for tenders, funding applications, enterprise meetings, and government procurement.',
      'We understand what decision-makers look for. Our pitch decks present your business case with clarity and impact — combining professional design with persuasive storytelling.',
      'Company profiles that establish credibility and build trust. From NEF applications to government tenders, we create documents that position your business as the obvious choice.',
    ],
    features: [
      'Investor pitch decks',
      'Company profiles',
      'Tender proposals',
      'Funding applications',
      'Professional slide design',
      'Print & digital formats',
      'Custom infographics',
      'Brand-aligned styling',
    ],
    price: 'From R1,999',
  },
}

export function useServiceDetail() {
  const [open, setOpen] = useState(false)
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null)

  const openService = useCallback((serviceId: string) => {
    setActiveServiceId(serviceId)
    setOpen(true)
  }, [])

  return { openService, open, setOpen, activeServiceId }
}

interface ServiceDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  serviceId: string | null
}

export function ServiceDetailModal({ open, onOpenChange, serviceId }: ServiceDetailModalProps) {
  const service = serviceId ? serviceDetails[serviceId] : null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-[#0D0D0D] border-[#242424] text-[#F0EFE8] max-w-2xl sm:max-w-2xl p-0 overflow-hidden"
        showCloseButton={true}
      >
        <AnimatePresence mode="wait">
          {service && (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Header with gradient accent */}
              <div className="relative px-6 pt-6 pb-4 sm:px-8 sm:pt-8 border-b border-[#1A1A1A]">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7A6330] via-[#C9A84C] to-[#E8CA7A]" />

                <DialogHeader className="text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[rgba(201,168,76,0.1)] border border-[#242424]">
                      <service.icon className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <DialogTitle className="text-xl sm:text-2xl font-display font-bold bg-gradient-to-r from-[#C9A84C] via-[#E8CA7A] to-[#C9A84C] bg-clip-text text-transparent">
                      {service.title}
                    </DialogTitle>
                  </div>
                  <DialogDescription className="text-[#C9A84C] text-sm font-medium">
                    {service.tagline}
                  </DialogDescription>
                </DialogHeader>
              </div>

              {/* Content */}
              <div className="px-6 py-5 sm:px-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {/* Description */}
                <div className="space-y-4 mb-8">
                  {service.description.map((paragraph, i) => (
                    <p key={i} className="text-[#C8C8C0] text-sm leading-relaxed font-sans">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-[#F0EFE8] font-display font-semibold text-sm mb-4 uppercase tracking-wider">
                    What&apos;s Included
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm"
                      >
                        <Check className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                        <span className="text-[#C8C8C0] font-sans">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price */}
                <div className="mb-6 p-4 rounded-lg bg-[rgba(201,168,76,0.06)] border border-[#C9A84C]/20">
                  <span className="text-[#9A9A92] text-xs uppercase tracking-wider font-mono">
                    Starting from
                  </span>
                  <p className="text-[#C9A84C] font-display text-2xl font-bold mt-1">
                    {service.price}
                  </p>
                </div>
              </div>

              {/* Footer CTAs */}
              <div className="px-6 pb-6 sm:px-8 flex flex-col sm:flex-row gap-3 border-t border-[#1A1A1A] pt-5">
                <a
                  href="#contact"
                  onClick={() => onOpenChange(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#C9A84C] text-[#080808] font-medium text-sm px-6 py-3 hover:bg-[#E8CA7A] transition-colors duration-300 btn-press"
                >
                  Get a Quote
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#portfolio"
                  onClick={() => onOpenChange(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#C9A84C]/40 text-[#C9A84C] font-medium text-sm px-6 py-3 hover:bg-[rgba(201,168,76,0.08)] hover:border-[#C9A84C] transition-all duration-300 btn-press"
                >
                  See Examples
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
