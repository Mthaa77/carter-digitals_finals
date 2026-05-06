'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Eye, Sparkles } from 'lucide-react'
import PortfolioModal, { type PortfolioProject } from '@/components/portfolio-modal'

const projects: PortfolioProject[] = [
  {
    client: 'Soshanguve Automotive School of Specialisation',
    industry: 'Education',
    services: ['Website', 'SEO'],
    keyResult: 'Delivered in 11 days',
    description:
      'A fast, professional web presence for one of Soshanguve\'s leading educational institutions.',
    expandedDescription:
      'Designed and developed a comprehensive web presence for one of Soshanguve\'s leading educational institutions. Features include a custom CMS, event calendar, and online application portal. Delivered with full SEO optimisation and mobile-first responsive design.',
    isComingSoon: false,
  },
  {
    client: 'Direla Bakgatla Trading Projects (Pty) Ltd',
    industry: 'Corporate / CCTV',
    services: ['Website', 'Business Tools'],
    keyResult: 'Now ranked on Google',
    description:
      'Corporate web infrastructure for a growing security and trading company.',
    expandedDescription:
      'Built a professional corporate website for a growing security and trading company. Features include a service catalogue, quote request system, and B-BBEE compliance documentation portal. Now ranking on Google for key industry terms.',
    isComingSoon: false,
  },
  {
    client: 'Your Business Here',
    industry: 'Coming Soon',
    services: ['—'],
    keyResult: 'Could be yours',
    description:
      "We're building new projects every month. Your success story could be next.",
    expandedDescription:
      "We're building new projects every month. Your success story could be next. Get in touch to discuss how we can help your business stand out online.",
    isComingSoon: true,
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

function GridPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="grid-pattern"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 32 0 L 0 0 0 32"
            fill="none"
            stroke="rgba(36,36,36,0.5)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  )
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (project: PortfolioProject) => {
    if (project.isComingSoon) return
    setSelectedProject(project)
    setModalOpen(true)
  }

  return (
    <>
      <section id="portfolio" className="aurora-bg py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14 md:mb-20"
          >
            <span className="section-label inline-block">Portfolio</span>
            <h2
              className="gold-gradient-text heading-shadow font-display tracking-tight"
              style={{ fontSize: 'var(--text-h2)' }}
            >
              Work That Speaks for Itself.
            </h2>
            <div className="mt-4 mx-auto w-16 h-[3px] bg-gradient-to-r from-[#7A6330] via-[#C9A84C] to-[#E8CA7A] rounded-full" />
            <p className="mt-5 text-[#C8C8C0] text-lg max-w-xl mx-auto font-sans">
              Real projects. Real results. No stock photos.
            </p>
          </motion.div>

          {/* Project Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {projects.map((project, idx) => (
              <motion.div
                key={project.client}
                variants={cardVariants}
                className={`group rounded-xl overflow-hidden transition-all duration-300 max-w-full ${
                  project.isComingSoon
                    ? 'gradient-border cursor-default'
                    : 'bg-gradient-to-br from-[#131313] to-[#1A1A1A] border border-[#242424] hover:border-[#3A3A3A] cursor-pointer card-shadow-gold hover-lift'
                }`}
                onClick={() => openModal(project)}
              >
                {/* Image Placeholder */}
                <div className="relative h-44 md:h-52 bg-[#0D0D0D] overflow-hidden image-overlay-gradient">
                  <GridPattern />
                  {/* Dark overlay gradient at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#131313] to-transparent" />
                  {/* Industry badge */}
                  <div className="absolute top-3 left-3 z-10">
                    {project.isComingSoon ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#C9A84C] border border-[#C9A84C]/30 rounded-md bg-[rgba(201,168,76,0.08)] font-sans">
                        <Sparkles className="w-3 h-3" />
                        {project.industry}
                      </span>
                    ) : (
                      <span className="inline-block px-2.5 py-1 text-xs font-medium text-[#7A6330] border border-[#7A6330]/30 rounded-md bg-[rgba(122,99,48,0.08)] font-sans">
                        {project.industry}
                      </span>
                    )}
                  </div>

                  {/* Shimmering gradient border overlay for coming soon card */}
                  {project.isComingSoon && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/5 via-[#22D3EE]/5 to-[#A78BFA]/5 animate-pulse pointer-events-none" />
                  )}

                  {/* Hover overlay with project name and View button */}
                  {!project.isComingSoon && (
                    <div className="absolute inset-0 bg-[#080808]/80 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <p className="text-[#F0EFE8] font-display font-semibold text-sm text-center px-4 mb-3 line-clamp-2">
                        {project.client}
                      </p>
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#C9A84C] text-[#080808] font-semibold text-xs">
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 md:p-6">
                  {/* Client Name */}
                  <h3 className="font-display text-base md:text-lg font-semibold text-[#F0EFE8] mb-3 leading-snug">
                    {project.client}
                  </h3>

                  {/* Service Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="inline-block px-2.5 py-0.5 text-xs font-medium text-[#C8C8C0] border border-[#242424] rounded-full bg-[#111111] font-sans"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-[#C8C8C0] text-sm leading-relaxed mb-4 font-sans">
                    {project.description}
                  </p>

                  {/* Key Result */}
                  <div className="mb-4">
                    {project.isComingSoon ? (
                      <span className="rainbow-gradient-text font-display font-semibold text-sm">
                        {project.keyResult}
                      </span>
                    ) : (
                      <span className="text-[#C9A84C] font-display font-semibold text-sm">
                        {project.keyResult}
                      </span>
                    )}
                  </div>

                  {/* View Case Study Link */}
                  {!project.isComingSoon && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        openModal(project)
                      }}
                      className="link-underline inline-flex items-center text-sm font-semibold text-[#C9A84C] hover:text-[#E8CA7A] transition-colors duration-200 font-sans group/link py-1"
                    >
                      View Case Study
                      <ArrowUpRight className="ml-1.5 w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </button>
                  )}

                  {/* Coming Soon CTA */}
                  {project.isComingSoon && (
                    <a
                      href="#contact"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center text-sm font-semibold text-[#C9A84C] hover:text-[#E8CA7A] transition-colors duration-200 font-sans py-1 link-underline"
                    >
                      Be Our Next Success Story
                      <ArrowUpRight className="ml-1.5 w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <a
              href="#"
              className="btn-secondary inline-flex items-center justify-center px-8 py-3 rounded-lg text-sm font-medium text-[#C9A84C] border border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[rgba(201,168,76,0.08)] transition-all duration-300 font-sans btn-press"
            >
              View All Work →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Detail Modal */}
      <PortfolioModal
        project={selectedProject}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  )
}
