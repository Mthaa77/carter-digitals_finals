'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { toast } from 'sonner'

const videoTestimonials = [
  {
    name: 'Thabo M.',
    company: 'Soshanguve SOS',
    gradient: 'from-cd-gold/20 via-cd-surface to-cd-bg',
  },
  {
    name: 'Lerato K.',
    company: 'Direla Bakgatla',
    gradient: 'from-cd-bg via-cd-surface to-cd-gold/15',
  },
]

export default function TestimonialVideo() {
  const handlePlay = () => {
    toast('Video coming soon', {
      description: 'We\'re working on bringing you video testimonials. Stay tuned!',
    })
  }

  return (
    <section id="video-testimonials" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="section-label inline-block">Client Stories</span>
          <h2 className="section-heading text-[var(--text-h2)]">
            Hear From Our <span className="gold-gradient-text">Clients</span>
          </h2>
          <p className="mt-4 text-cd-text-muted text-lg max-w-lg mx-auto font-sans">
            Real stories from real South African businesses
          </p>
        </motion.div>

        {/* Video Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {videoTestimonials.map((video, index) => (
            <motion.div
              key={video.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <motion.button
                onClick={handlePlay}
                className="relative w-full aspect-video rounded-xl overflow-hidden border border-cd-border group cursor-pointer"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                aria-label={`Play video testimonial from ${video.name}, ${video.company}`}
              >
                {/* Placeholder background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${video.gradient}`}
                />

                {/* Subtle pattern overlay */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                  }}
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cd-bg/90 via-cd-bg/30 to-transparent" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cd-gold/15 border-2 border-cd-gold/60 flex items-center justify-center backdrop-blur-sm group-hover:bg-cd-gold/25 group-hover:border-cd-gold group-hover:shadow-lg group-hover:shadow-cd-gold/20 transition-all duration-500"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 text-cd-gold ml-1" />
                  </motion.div>
                </div>

                {/* Client info at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <p className="font-display text-base sm:text-lg font-bold text-cd-text">
                    {video.name}
                  </p>
                  <p className="text-cd-text-muted text-xs sm:text-sm font-sans">
                    {video.company}
                  </p>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
