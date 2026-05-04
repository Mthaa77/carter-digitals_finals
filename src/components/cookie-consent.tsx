'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie } from 'lucide-react'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 2000)
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
          className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-4 overflow-hidden"
        >
          {/* Ultra-compact on mobile, standard on desktop */}
          <div
            className="relative max-w-[calc(100vw-1rem)] sm:max-w-3xl mx-auto rounded-lg backdrop-blur-xl overflow-hidden"
            style={{
              background: 'rgba(20, 18, 14, 0.96)',
              border: '1px solid rgba(201, 168, 76, 0.15)',
              borderTop: '2px solid rgba(201, 168, 76, 0.5)',
              boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.3), 0 0 40px rgba(201, 168, 76, 0.05)',
            }}
          >
            {/* Mobile: single row with all elements */}
            <div className="flex sm:hidden items-center gap-2 px-3 py-2.5">
              <Cookie className="w-3.5 h-3.5 text-cd-gold shrink-0" />
              <p className="text-cd-text-muted text-[11px] leading-tight font-sans flex-1 min-w-0">
                We use cookies.{' '}
                <a href="#" className="text-cd-gold hover:text-cd-gold-light underline underline-offset-1">
                  Privacy
                </a>
              </p>
              <button
                onClick={handleDecline}
                className="px-3 py-1.5 text-[11px] font-medium text-cd-text-muted border border-cd-border rounded hover:border-cd-text-muted transition-colors duration-200 shrink-0"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-3 py-1.5 text-[11px] font-bold bg-cd-gold text-cd-bg rounded hover:bg-cd-gold-light transition-colors duration-200 shrink-0"
              >
                Accept
              </button>
              <button
                onClick={handleDismiss}
                className="text-cd-text-dim hover:text-cd-gold transition-colors duration-200 p-0.5 shrink-0"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </div>

            {/* Desktop: standard layout */}
            <div className="hidden sm:flex items-center gap-5 px-6 py-4">
              <Cookie className="w-4 h-4 text-cd-gold shrink-0" />
              <p className="text-cd-text-muted text-sm leading-relaxed font-sans flex-1">
                We use cookies to improve your experience. By continuing, you agree to our{' '}
                <a href="#" className="text-cd-gold hover:text-cd-gold-light underline underline-offset-2 transition-colors duration-200">
                  privacy policy
                </a>.
              </p>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleDecline}
                  className="px-5 py-2 text-sm font-medium text-cd-text-muted border border-cd-border rounded-lg hover:border-cd-text-muted hover:text-cd-text transition-all duration-300"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2.5 text-sm font-bold bg-cd-gold text-cd-bg rounded-lg hover:bg-cd-gold-light transition-all duration-300 shadow-lg shadow-cd-gold/15"
                >
                  Accept
                </button>
              </div>
              <button
                onClick={handleDismiss}
                className="text-cd-text-muted hover:text-cd-gold transition-colors duration-200 p-1"
                aria-label="Dismiss cookie banner"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
