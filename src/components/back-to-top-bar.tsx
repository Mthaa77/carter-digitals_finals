'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

export default function BackToTopBar() {
  const [progress, setProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const ticking = useRef(false)

  const handleScroll = useCallback(() => {
    if (ticking.current) return
    ticking.current = true
    requestAnimationFrame(() => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setProgress((scrollTop / docHeight) * 100)
      }
      ticking.current = false
    })
  }, [])

  useEffect(() => {
    // Initial read via rAF to avoid synchronous setState in effect
    requestAnimationFrame(() => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setProgress((scrollTop / docHeight) * 100)
      }
    })
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 cursor-pointer"
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Scroll back to top"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') scrollToTop()
      }}
      style={{ height: isHovered ? 4 : 2 }}
    >
      {/* Background track */}
      <div className="absolute inset-0 bg-[rgba(255,255,255,0.03)]" />

      {/* Progress fill */}
      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #7A6330, #C9A84C, #E8CA7A)',
        }}
        initial={{ boxShadow: '0 0 0px rgba(201,168,76,0)' }}
        animate={{
          boxShadow:
            progress > 10
              ? `0 0 ${isHovered ? 12 : 6}px rgba(201,168,76,${Math.min(progress / 100, 0.5)})`
              : '0 0 0px rgba(201,168,76,0)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Hover indicator tooltip */}
      {isHovered && progress > 5 && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 rounded bg-[#1A1A1A] border border-[#242424] text-[10px] text-[#C8C8C0] whitespace-nowrap pointer-events-none"
        >
          Back to top ↑
        </motion.div>
      )}
    </motion.div>
  )
}
