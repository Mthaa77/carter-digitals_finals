'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, Globe, LayoutDashboard, TrendingUp } from 'lucide-react'
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
  'sme-websites': {
    id: 'sme-websites',
    title: 'SME Websites',
    icon: Globe,
    tagline: 'Fast, beautiful, built to rank.',
    description: [
      'Your website is your hardest-working salesperson — it never sleeps, never takes leave, and never misses a lead. We build mobile-first, SEO-optimised websites that load in under 3 seconds and convert visitors into paying customers.',
      'Every site we build comes with a WhatsApp CTA, contact form, Google Analytics, and a structure designed to rank on Google from day one. No templates, no shortcuts — custom code tailored to your business.',
      'Whether you\'re starting from zero or upgrading from a Facebook page, we\'ll give you a professional online presence that reflects the quality of your work.',
    ],
    features: [
      'Custom responsive design',
      'Mobile-first development',
      'SEO foundations (meta tags, schema, sitemap)',
      'WhatsApp CTA integration',
      'Contact form with validation',
      'Google Analytics setup',
      '3 months free hosting',
      'SSL certificate included',
      'Speed optimised (< 3s load)',
    ],
    price: 'From R7,950',
  },
  'dashboards': {
    id: 'dashboards',
    title: 'Dashboards & Internal Tools',
    icon: LayoutDashboard,
    tagline: 'Run your business, not just a page.',
    description: [
      'Spreadsheets were fine when you had 5 clients. Now you need systems that scale with you. We build custom dashboards, staff portals, booking systems, and stock trackers that run your operations from one place.',
      'Our tools are built on modern, secure infrastructure with role-based access, real-time data, and interfaces your team will actually enjoy using. No more "I can\'t find that file" or "the spreadsheet broke."',
      'From quote generators to inventory management, every tool is designed around your unique workflow — because your business isn\'t generic, and your software shouldn\'t be either.',
    ],
    features: [
      'Staff portals with role-based access',
      'Booking & scheduling systems',
      'Stock & inventory trackers',
      'Quote & invoice generators',
      'Real-time data dashboards',
      'Custom reporting tools',
      'Secure authentication',
      'Mobile-responsive admin',
      'Ongoing support & updates',
    ],
    price: 'From R15,000',
  },
  'seo-growth': {
    id: 'seo-growth',
    title: 'SEO & Growth',
    icon: TrendingUp,
    tagline: 'Get found. Stay found.',
    description: [
      'A beautiful website that nobody finds is like a billboard in the desert. Our SEO & Growth service makes sure your business shows up when your customers are searching — on Google, on maps, and in local directories.',
      'We don\'t just stuff keywords and hope. We build data-driven strategies: technical SEO audits, content that answers real questions, Google My Business optimisation, and monthly reports that show exactly what\'s working.',
      'Combined with targeted Google Ads management, you get both the long-term power of organic search and the immediate impact of paid advertising. Real results, transparent reporting, no vanity metrics.',
    ],
    features: [
      'Technical SEO audit & fixes',
      'Google My Business optimisation',
      'Local SEO for Pretoria & Gauteng',
      'SEO content writing (5+ pages)',
      'Google Ads management',
      'Keyword research & strategy',
      'Monthly performance reports',
      'Competitor analysis',
      'Backlink strategy',
    ],
    price: 'From R3,500/month',
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
