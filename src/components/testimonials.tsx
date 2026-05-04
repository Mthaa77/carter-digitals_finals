'use client'

import { motion } from 'framer-motion'
import TestimonialCarousel from '@/components/testimonial-carousel'

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-20"
        >
          <h2 className="font-display text-[var(--text-h2)] font-semibold text-[#F0EFE8] tracking-tight">
            What Our Clients Say
          </h2>
          <div className="mt-4 mx-auto w-16 h-[3px] bg-gradient-to-r from-[#7A6330] via-[#C9A84C] to-[#E8CA7A] rounded-full" />
        </motion.div>

        {/* Testimonial Carousel */}
        <TestimonialCarousel />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg text-sm font-medium text-[#C9A84C] border border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[rgba(201,168,76,0.08)] transition-all duration-300 font-sans"
          >
            See All Reviews →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
