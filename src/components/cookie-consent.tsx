'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie } from 'lucide-react'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setShowBanner(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowBanner(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShowBanner(false)
  }

  const handleDismiss = () => {
    setShowBanner(false)
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-6 overflow-hidden"
        >
          <div
            className="relative max-w-[calc(100vw-1.5rem)] sm:max-w-4xl mx-auto rounded-xl backdrop-blur-xl px-4 py-3 sm:px-8 sm:py-6"
            style={{
              background: 'rgba(20, 18, 14, 0.95)',
              border: '1px solid rgba(201, 168, 76, 0.15)',
              borderTop: '2px solid rgba(201, 168, 76, 0.5)',
              boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.3), 0 0 40px rgba(201, 168, 76, 0.05)',
            }}
          >
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 text-cd-text-muted hover:text-cd-gold transition-colors duration-200 p-1.5"
              aria-label="Dismiss cookie banner"
            >
              <X size={18} />
            </button>

            {/* Mobile: compact single-line layout */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
              {/* Text */}
              <div className="flex items-start gap-2.5 flex-1 pr-6 sm:pr-0">
                <Cookie className="w-4 h-4 text-cd-gold mt-0.5 shrink-0 hidden sm:block" />
                <p className="text-cd-text-muted text-xs sm:text-base leading-relaxed font-sans">
                  We use cookies to improve your experience.{' '}
                  <a href="#" className="text-cd-gold hover:text-cd-gold-light underline underline-offset-2 transition-colors duration-200">
                    Privacy policy
                  </a>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
                <button
                  onClick={handleDecline}
                  className="flex-1 sm:flex-none px-5 sm:px-6 py-2 text-xs sm:text-sm font-medium text-cd-text-muted border border-cd-border rounded-lg hover:border-cd-text-muted hover:text-cd-text transition-all duration-300"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 sm:flex-none px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-bold bg-cd-gold text-cd-bg rounded-lg hover:bg-cd-gold-light transition-all duration-300 shadow-lg shadow-cd-gold/15"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
