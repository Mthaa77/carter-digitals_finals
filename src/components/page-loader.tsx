'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 2200
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const p = Math.min(elapsed / duration, 1)
      // Ease out quad
      const eased = 1 - (1 - p) * (1 - p)
      setProgress(Math.round(eased * 100))

      if (p < 1) {
        requestAnimationFrame(animate)
      } else {
        setTimeout(() => setLoading(false), 300)
      }
    }

    requestAnimationFrame(animate)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080808]"
        >
          {/* Gold pulse glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.15, 0.3, 0.15],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-64 h-64 rounded-full bg-[#C9A84C] blur-[80px]"
          />

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-10 font-display text-3xl sm:text-4xl font-bold tracking-tight"
          >
            <span className="text-[#F0EFE8]">Carter</span>{' '}
            <span className="text-[#C9A84C]">Digitals</span>
          </motion.div>

          {/* Loading bar */}
          <div className="mt-10 w-48 h-[3px] bg-[#242424] rounded-full overflow-hidden relative z-10">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background:
                  'linear-gradient(90deg, #7A6330, #C9A84C, #E8CA7A)',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
