'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const notifications = [
  { id: 1, text: '🔒 New project started in Soshanguve' },
  { id: 2, text: '📊 Dashboard deployed for Pretoria SME' },
  { id: 3, text: '🇿🇦 B-BBEE certificate renewed' },
  { id: 4, text: '⚡ Website launched: 2hr turnaround' },
  { id: 5, text: '📈 SEO client hit page 1 on Google' },
  { id: 6, text: '🤝 New partnership with Gauteng SME Hub' },
]

const DISMISS_KEY = 'carter-activity-feed-dismissed'

function getInitialDismissed(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(DISMISS_KEY) === 'true'
  } catch {
    return false
  }
}

export default function ActivityFeed() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isDismissed, setIsDismissed] = useState(getInitialDismissed)

  const handleDismiss = useCallback(() => {
    setIsVisible(false)
    setIsDismissed(true)
    try {
      localStorage.setItem(DISMISS_KEY, 'true')
    } catch {
      // localStorage not available
    }
  }, [])

  // Auto-rotate notifications
  useEffect(() => {
    if (isDismissed) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isDismissed])

  // Don't render if dismissed or on mobile
  if (isDismissed) return null

  return (
    <div className="hidden md:block fixed bottom-16 left-4 z-40 max-w-[280px]">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-lg p-3 pr-9 relative"
          >
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-cd-text-dim hover:text-cd-gold transition-colors duration-200 p-0.5"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>

            {/* Notification content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <p className="text-sm text-cd-text-muted font-sans leading-snug">
                  {notifications[currentIndex].text}
                </p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cd-gold animate-pulse" />
                  <span className="text-[10px] font-mono text-cd-gold/80 uppercase tracking-wider">
                    Recent Activity
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="flex gap-1 mt-2">
              {notifications.map((_, i) => (
                <div
                  key={i}
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'w-4 bg-cd-gold'
                      : 'w-1.5 bg-cd-border'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
