'use client'

import { motion } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ArrowRight } from 'lucide-react'

export interface PortfolioProject {
  client: string
  industry: string
  services: string[]
  keyResult: string
  description: string
  expandedDescription: string
  isComingSoon: boolean
}

interface PortfolioModalProps {
  project: PortfolioProject | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function PortfolioModal({
  project,
  open,
  onOpenChange,
}: PortfolioModalProps) {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg border-[#242424] bg-[#111111]/95 backdrop-blur-xl text-[#F0EFE8]"
        showCloseButton
      >
        <DialogHeader>
          {/* Industry Badge */}
          <div className="mb-2">
            <span className="inline-block px-2.5 py-1 text-xs font-medium text-cd-gold border border-cd-gold/30 rounded-md bg-cd-gold/5 font-sans">
              {project.industry}
            </span>
          </div>
          <DialogTitle className="font-display text-xl font-semibold text-[#F0EFE8] leading-tight">
            {project.client}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Case study details for {project.client}
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-5 mt-2"
        >
          {/* Service Tags */}
          <div className="flex flex-wrap gap-2">
            {project.services.map((service) => (
              <span
                key={service}
                className="inline-block px-3 py-1 text-xs font-medium text-[#B8B8B0] border border-[#242424] rounded-full bg-[#0D0D0D] font-sans"
              >
                {service}
              </span>
            ))}
          </div>

          {/* Key Result */}
          <div className="bg-cd-gold/5 border border-cd-gold/20 rounded-lg px-4 py-3">
            <span className="text-xs text-[#B8B8B0] font-sans uppercase tracking-wider">
              Key Result
            </span>
            <p className="text-cd-gold font-display font-semibold text-lg mt-1">
              {project.keyResult}
            </p>
          </div>

          {/* Expanded Description */}
          <p className="text-[#A0A098] text-sm leading-relaxed font-sans">
            {project.expandedDescription}
          </p>

          {/* CTA */}
          <a
            href="#contact"
            onClick={() => onOpenChange(false)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cd-gold text-[#080808] font-bold text-sm rounded-lg hover:bg-cd-gold-light transition-colors duration-300 font-sans"
          >
            Request Similar Project
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
