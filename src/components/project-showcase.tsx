'use client'

import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight, Eye } from 'lucide-react'
import PortfolioModal, { type PortfolioProject } from '@/components/portfolio-modal'

const showcaseProjects: PortfolioProject[] = [
  {
    client: 'Soshanguve SOS',
    industry: 'Education',
    services: ['SME Website', 'SEO', 'CMS'],
    keyResult: '+180% Traffic',
    description:
      'Transformed a local school\'s online presence with a blazing-fast website that tripled visitor engagement.',
    expandedDescription:
      'Designed and developed a comprehensive web presence for one of Soshanguve\'s leading educational institutions. Features include a custom CMS, event calendar, and online application portal. Delivered with full SEO optimisation and mobile-first responsive design. Traffic increased by 180% within 3 months of launch.',
    isComingSoon: false,
  },
  {
    client: 'Direla Bakgatla Trading',
    industry: 'Corporate / Security',
    services: ['Dashboard', 'Business Tools'],
    keyResult: '3x Lead Growth',
    description:
      'Built a corporate dashboard and business tools suite that tripled qualified lead generation.',
    expandedDescription:
      'Built a professional corporate website and internal dashboard for a growing security and trading company. Features include a service catalogue, quote request system, and B-BBEE compliance documentation portal. Lead generation increased 3x within the first quarter.',
    isComingSoon: false,
  },
  {
    client: 'Block L Traders',
    industry: 'E-Commerce',
    services: ['E-Commerce', 'SEO & Growth'],
    keyResult: 'R50K+ Revenue',
    description:
      'Launched an e-commerce platform for a local trader that generated R50K+ in the first month.',
    expandedDescription:
      'Created a full e-commerce solution for a Soshanguve-based trader. Features include product catalogue, secure payment integration, inventory management, and automated order notifications. Generated over R50,000 in revenue within the first month of operation.',
    isComingSoon: false,
  },
]

const gradients = [
  'linear-gradient(135deg, #1a1408 0%, #2a1f0a 30%, #1a1408 60%, #0d0d0d 100%)',
  'linear-gradient(135deg, #0d0d0d 0%, #1a1408 40%, #2a2010 70%, #0d0d0d 100%)',
  'linear-gradient(135deg, #1a1508 0%, #0d0d0d 40%, #1a1408 70%, #2a1f10 100%)',
]

const categoryColors: Record<string, string> = {
  'SME Website': 'border-cd-gold/40 text-cd-gold bg-cd-gold/8',
  'Dashboard': 'border-cd-gold-light/40 text-cd-gold-light bg-cd-gold-light/8',
  'E-Commerce': 'border-cd-gold-dim/40 text-cd-gold-dim bg-cd-gold-dim/8',
}

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

export default function ProjectShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (project: PortfolioProject) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  return (
    <>
      <section id="showcase-gallery" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14 md:mb-20"
          >
            <span className="section-label inline-block">Project Showcase</span>
            <h2 className="section-heading text-[var(--text-h2)]">
              Featured <span className="gold-gradient-text">Work</span>
            </h2>
            <p className="mt-4 text-cd-text-muted text-lg max-w-xl mx-auto font-sans">
              Real projects. Real results. Every site we build is designed to drive business growth.
            </p>
          </motion.div>

          {/* Project Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {showcaseProjects.map((project, i) => {
              const primaryCategory = project.services[0]
              const categoryClass = categoryColors[primaryCategory] || 'border-cd-gold/40 text-cd-gold bg-cd-gold/8'

              return (
                <motion.div
                  key={project.client}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  className="card-lift group glass-card rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => openModal(project)}
                >
                  {/* Gradient Image Placeholder */}
                  <div
                    className="relative h-48 sm:h-52 overflow-hidden"
                    style={{ background: gradients[i] }}
                  >
                    {/* Grid pattern overlay */}
                    <svg
                      className="absolute inset-0 w-full h-full opacity-20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <pattern
                          id={`showcase-grid-${i}`}
                          width="32"
                          height="32"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 32 0 L 0 0 0 32"
                            fill="none"
                            stroke="rgba(201,168,76,0.15)"
                            strokeWidth="0.5"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#showcase-grid-${i})`} />
                    </svg>

                    {/* Gold gradient overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#080808]/90 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border font-sans ${categoryClass}`}>
                        {primaryCategory}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#080808]/80 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-cd-gold text-cd-bg font-semibold text-xs">
                        <Eye className="w-3.5 h-3.5" />
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Project Name */}
                    <h3 className="font-display text-lg font-bold text-cd-text mb-2 leading-snug group-hover:text-cd-gold transition-colors duration-300">
                      {project.client}
                    </h3>

                    {/* Description */}
                    <p className="text-cd-text-muted text-sm leading-relaxed mb-4 font-sans">
                      {project.description}
                    </p>

                    {/* Key Result Metric */}
                    <div className="flex items-center justify-between">
                      <span className="text-cd-gold font-display font-bold text-lg text-glow-gold">
                        {project.keyResult}
                      </span>
                      <span className="inline-flex items-center gap-1 text-cd-text-dim text-xs font-sans group-hover:text-cd-gold transition-colors duration-300">
                        View Details
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
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
