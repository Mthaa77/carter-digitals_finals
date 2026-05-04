'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    stars: 5,
    quote:
      "Carter Digitals delivered our school website in record time. The quality exceeded our expectations and we've had nothing but positive feedback from parents and staff.",
    name: 'Representative',
    business: 'Soshanguve Automotive School of Specialisation',
    location: 'Soshanguve, Pretoria',
    tag: 'Source: Client Feedback',
  },
  {
    stars: 5,
    quote:
      "Professional, fast, and they actually understand what a business needs online. Our new site has brought in enquiries we never would have gotten before.",
    name: 'Director',
    business: 'Direla Bakgatla Trading Projects',
    location: 'Pretoria, Gauteng',
    tag: 'Source: Client Feedback',
  },
  {
    stars: 5,
    quote:
      "We needed more than a website — we needed tools that make our daily operations easier. Carter Digitals built exactly what we needed, on budget and on time.",
    name: 'Business Owner',
    business: 'Pretoria SME',
    location: 'Tshwane, Gauteng',
    tag: 'Source: Client Feedback',
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

        {/* Testimonial Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              className="glass-card rounded-xl p-6 md:p-8 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-[#F0EFE8] text-sm leading-relaxed mb-6 flex-1 font-sans">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="border-t border-[#242424] pt-4">
                <p className="text-[#F0EFE8] font-display font-semibold text-sm">
                  {testimonial.name}
                </p>
                <p className="text-[#888880] text-sm mt-0.5 font-sans">
                  {testimonial.business}
                </p>
                <p className="text-[#555550] text-xs mt-1 font-sans">
                  {testimonial.location}
                </p>
                <p className="text-[#555550] text-xs mt-2 italic font-sans">
                  {testimonial.tag}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

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
