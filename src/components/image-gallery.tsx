'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Eye, ExternalLink } from 'lucide-react'

const galleryItems = [
  {
    title: 'Cinematic Hero Banner',
    category: 'Website',
    image: '/hero-banner.png',
    accent: 'gold',
  },
  {
    title: 'Email Marketing Campaign',
    category: 'Marketing',
    image: '/email-marketing-banner.png',
    accent: 'emerald',
  },
  {
    title: 'Social Media Advertising',
    category: 'Social Media',
    image: '/social-media-ad.png',
    accent: 'cyan',
  },
  {
    title: 'Sales Pitch Deck',
    category: 'Pitch Deck',
    image: '/pitch-deck-cover.png',
    accent: 'violet',
  },
  {
    title: 'Our Team',
    category: 'About Us',
    image: '/team-photo.png',
    accent: 'rose',
  },
  {
    title: 'Soshanguve SOS Website',
    category: 'Website',
    image: null,
    gradient: 'linear-gradient(135deg, #1a1408 0%, #2a1f0a 30%, #1a1408 60%, #0d0d0d 100%)',
    accent: 'gold',
  },
]

const accentColors: Record<string, { border: string; text: string; bg: string; badge: string }> = {
  gold: { border: 'border-cd-gold/40', text: 'text-cd-gold', bg: 'bg-cd-gold/8', badge: 'border-cd-gold/30 text-cd-gold' },
  emerald: { border: 'border-cd-emerald/40', text: 'text-cd-emerald', bg: 'bg-cd-emerald/8', badge: 'border-cd-emerald/30 text-cd-emerald' },
  cyan: { border: 'border-cd-cyan/40', text: 'text-cd-cyan', bg: 'bg-cd-cyan/8', badge: 'border-cd-cyan/30 text-cd-cyan' },
  violet: { border: 'border-cd-violet/40', text: 'text-cd-violet', bg: 'bg-cd-violet/8', badge: 'border-cd-violet/30 text-cd-violet' },
  rose: { border: 'border-cd-rose/40', text: 'text-cd-rose', bg: 'bg-cd-rose/8', badge: 'border-cd-rose/30 text-cd-rose' },
}

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
    <section id="gallery" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 aurora-bg" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="section-label inline-block gold-gradient-text">Our Work</span>
          <h2 className="section-heading heading-shadow" style={{ fontSize: 'var(--text-h2)' }}>
            Project <span className="gold-gradient-text">Gallery</span>
          </h2>
          <div className="mt-4 mx-auto w-16 h-[3px] bg-gradient-to-r from-[#7A6330] via-[#C9A84C] to-[#22D3EE] rounded-full" />
          <p className="mt-5 text-cd-text-muted text-lg max-w-xl mx-auto font-sans">
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
          {galleryItems.map((item, i) => {
            const accent = accentColors[item.accent] || accentColors.gold
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                className={`glass-card group rounded-xl overflow-hidden cursor-pointer transition-[border-color,box-shadow,transform] duration-300 hover:${accent.border} hover:shadow-[0_0_24px_rgba(201,168,76,0.1)]`}
              >
                {/* Image or Gradient Placeholder */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  {item.image ? (
                    <>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/95 via-[#080808]/30 to-transparent" />
                    </>
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{ background: item.gradient }}
                    >
                      {/* Grid pattern overlay for gradient placeholders */}
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
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080808]/95 to-transparent" />
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${accent.badge} ${accent.bg} font-sans transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(201,168,76,0.2)]`}>
                      {item.category}
                    </span>
                  </div>

                  {/* Title at bottom */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className={`font-display text-lg font-bold text-cd-text group-hover:${accent.text} transition-colors duration-300`}>
                      {item.title}
                    </h3>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#080808]/70 backdrop-blur-sm flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-cd-gold text-cd-bg font-semibold text-sm font-sans">
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-cd-gold/50 text-cd-gold text-sm font-sans">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Details
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
