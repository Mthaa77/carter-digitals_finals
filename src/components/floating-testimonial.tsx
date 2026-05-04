'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, X } from 'lucide-react'

const testimonials = [
  {
    name: 'Thabo M.',
    business: 'Soshanguve SOS',
    quote: "They gave us a tool that brings in leads every week.",
    stars: 5,
  },
  {
    name: 'Lerato K.',
    business: 'Direla Bakgatla',
    quote: 'Our dashboard saves us 3 hours a day.',
    stars: 5,
  },
  {
    name: 'Dineo R.',
    business: 'Block L Traders',
    quote: 'Professional, fast, and genuinely committed.',
    stars: 5,
  },
  {
    name: 'Kagiso T.',
    business: 'Tshwane SMEs',
    quote: 'Best investment we made for our online presence.',
    stars: 5,
  },
  {
    name: 'Nomsa M.',
    business: 'Gauteng Businesses',
    quote: 'Finally a web team that understands South African SMEs.',
    stars: 5,
  },
]

const STORAGE_KEY = 'cd-floating-testimonial-shown'

export default function FloatingTestimonial() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Pick a random testimonial at component creation time using useMemo
  const testimonial = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * testimonials.length)
    return testimonials[randomIndex]
  }, [])

  const dismiss = useCallback(() => {
    setDismissed(true)
    setVisible(false)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // localStorage unavailable
    }
  }, [])

  useEffect(() => {
    // Check if already shown this session
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') return
    } catch {
      // localStorage unavailable, continue
    }

    // Show after 8 seconds
    const showTimer = setTimeout(() => {
      setVisible(true)
    }, 8000)

    // Auto-dismiss after 5 seconds of being visible (13s total)
    const hideTimer = setTimeout(() => {
      setVisible(false)
      try {
        localStorage.setItem(STORAGE_KEY, '1')
      } catch {
        // localStorage unavailable
      }
    }, 13000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 40, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-6 left-6 z-40 max-w-[300px] sm:max-w-[320px] max-sm:left-4 max-sm:right-4 max-sm:max-w-none"
        >
          <div className="glass-card rounded-xl p-4 border-l-[3px] border-l-[#C9A84C] relative">
            {/* Close button */}
            <button
              onClick={dismiss}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full text-[#9A9A92] hover:text-[#F0EFE8] hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-200"
              aria-label="Dismiss testimonial"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Stars */}
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: testimonial.stars }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]"
                />
              ))}
            </div>

            {/* Quote */}
            <p className="text-[#F0EFE8] text-sm leading-relaxed mb-3 font-sans italic">
              &ldquo;{testimonial.quote}&rdquo;
            </p>

            {/* Attribution */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#C9A84C] text-xs font-semibold font-display">
                  {testimonial.name}
                </p>
                <p className="text-[#9A9A92] text-[11px] font-sans">
                  {testimonial.business}
                </p>
              </div>
              <a
                href="#testimonials"
                onClick={() => dismiss()}
                className="text-[#C9A84C] text-[11px] font-medium hover:text-[#E8CA7A] transition-colors duration-200 whitespace-nowrap"
              >
                View All →
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
