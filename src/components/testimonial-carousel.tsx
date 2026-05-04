'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    quote:
      "Carter Digitals didn't just build us a website — they gave us a tool that brings in leads every week.",
    name: 'Thabo M.',
    company: 'Soshanguve SOS',
    stars: 5,
  },
  {
    quote:
      'Our dashboard saves us 3 hours a day. No more spreadsheets, no more guessing.',
    name: 'Lerato K.',
    company: 'Direla Bakgatla',
    stars: 5,
  },
  {
    quote:
      'Professional, fast, and genuinely committed to seeing our business grow.',
    name: 'Dineo R.',
    company: 'Block L Traders',
    stars: 5,
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next])

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  }

  const testimonial = testimonials[current]

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Main carousel area */}
      <div className="glass-card rounded-2xl p-8 md:p-12 min-h-[280px] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Decorative quote mark */}
        <span
          className="absolute top-4 right-6 text-[#C9A84C]/20 font-serif text-7xl leading-none select-none pointer-events-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center text-center"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonial.stars }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-[#C9A84C] text-[#C9A84C]"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-[#F0EFE8] text-lg md:text-xl lg:text-2xl italic leading-relaxed mb-8 font-sans max-w-2xl">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {/* Attribution */}
            <div className="text-center">
              <p className="text-[#C9A84C] font-display font-semibold text-base">
                {testimonial.name}
              </p>
              <p className="text-[#C8C8C0] text-sm mt-1 font-sans">
                {testimonial.company}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-5 w-12 h-12 rounded-full bg-cd-surface/80 border border-cd-border flex items-center justify-center text-[#C8C8C0] hover:text-[#C9A84C] hover:bg-cd-gold/10 hover:border-cd-gold/30 transition-all duration-300 z-10"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-5 w-12 h-12 rounded-full bg-cd-surface/80 border border-cd-border flex items-center justify-center text-[#C8C8C0] hover:text-[#C9A84C] hover:bg-cd-gold/10 hover:border-cd-gold/30 transition-all duration-300 z-10"
        aria-label="Next testimonial"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1)
              setCurrent(i)
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current
                ? 'bg-[#C9A84C] w-8'
                : 'bg-[#9A9A92] hover:bg-[#C8C8C0]'
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
