'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const galleryItems = [
  {
    title: 'Soshanguve SOS Website',
    category: 'Website',
    gradient: 'linear-gradient(135deg, #1a1408 0%, #2a1f0a 30%, #1a1408 60%, #0d0d0d 100%)',
  },
  {
    title: 'Direla Bakgatla Portal',
    category: 'Dashboard',
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a1408 40%, #2a2010 70%, #0d0d0d 100%)',
  },
  {
    title: 'Block L Dashboard',
    category: 'Internal Tool',
    gradient: 'linear-gradient(135deg, #1a1508 0%, #0d0d0d 40%, #1a1408 70%, #2a1f10 100%)',
  },
  {
    title: 'Tshwane SME Landing',
    category: 'Landing Page',
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #2a1f0a 25%, #1a1408 55%, #0d0d0d 100%)',
  },
  {
    title: 'Gauteng Business App',
    category: 'Web App',
    gradient: 'linear-gradient(135deg, #1a1408 0%, #0d0d0d 35%, #2a1f10 65%, #1a1408 100%)',
  },
  {
    title: 'Custom Analytics',
    category: 'Dashboard',
    gradient: 'linear-gradient(135deg, #2a1f10 0%, #1a1408 30%, #0d0d0d 60%, #1a1508 100%)',
  },
]

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
    y: 50,
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

export default function ImageGallery() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="gallery" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="section-label inline-block">Our Work</span>
          <h2 className="section-heading text-[var(--text-h2)]">
            Project <span className="gold-gradient-text">Gallery</span>
          </h2>
          <p className="mt-4 text-cd-text-muted text-lg max-w-xl mx-auto font-sans">
            A snapshot of the digital experiences we&apos;ve crafted for South African businesses.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="glass-card group rounded-xl overflow-hidden cursor-pointer transition-[border-color,box-shadow,transform] duration-300 hover:border-cd-gold/40 hover:shadow-[0_0_24px_rgba(201,168,76,0.1)]"
            >
              {/* Gradient Placeholder */}
              <div
                className="relative h-56 sm:h-64 overflow-hidden"
                style={{ background: item.gradient }}
              >
                {/* Grid pattern overlay */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id={`gallery-grid-${i}`}
                      width="28"
                      height="28"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 28 0 L 0 0 0 28"
                        fill="none"
                        stroke="rgba(201,168,76,0.12)"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#gallery-grid-${i})`} />
                </svg>

                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080808]/95 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full border border-cd-gold/30 text-cd-gold bg-cd-gold/8 font-sans transition-all duration-300 group-hover:border-cd-gold/70 group-hover:bg-cd-gold/15 group-hover:text-cd-gold-light group-hover:shadow-[0_0_12px_rgba(201,168,76,0.2)]">
                    {item.category}
                  </span>
                </div>

                {/* Title at bottom */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <h3 className="font-display text-lg font-bold text-cd-text group-hover:text-cd-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#080808]/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-cd-gold text-cd-bg font-semibold text-sm font-sans">
                    View Project
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
