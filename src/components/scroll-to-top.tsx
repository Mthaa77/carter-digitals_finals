'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0

      setScrollProgress(progress)
      setIsVisible(scrollTop > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // SVG circle properties
  const size = 48
  const strokeWidth = 2.5
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - scrollProgress * circumference

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-5 sm:bottom-6 left-5 sm:left-6 z-[9998] group cursor-pointer"
        >
          {/* Progress ring SVG */}
          <svg
            width={size}
            height={size}
            className="rotate-[-90deg]"
            style={{ filter: 'drop-shadow(0 0 6px rgba(201, 168, 76, 0.2))' }}
          >
            {/* Background track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgba(201, 168, 76, 0.12)"
              strokeWidth={strokeWidth}
            />
            {/* Progress arc */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#C9A84C"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.15s ease-out' }}
            />
          </svg>

          {/* Arrow icon centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-cd-gold flex items-center justify-center group-hover:bg-cd-gold-light transition-colors duration-200">
              <ArrowUp className="h-4 w-4 text-cd-bg" />
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
