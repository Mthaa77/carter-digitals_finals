'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const messages = [
  { emoji: '🌟', text: 'Someone in Pretoria just requested a quote' },
  { emoji: '🇿🇦', text: 'A Gauteng SME signed up for the newsletter' },
  { emoji: '⚡', text: '3 businesses viewed our pricing this hour' },
  { emoji: '🏆', text: 'New B-BBEE Level 1 project started' },
]

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [started, setStarted] = useState(false)

  const shuffled = useMemo(() => shuffleArray(messages), [])

  const cycleMessage = useCallback(() => {
    setIsVisible(false)
    // Wait for exit animation, then show next
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % shuffled.length)
      setIsVisible(true)
    }, 500)
  }, [shuffled.length])

  useEffect(() => {
    // 10 second delay before first appearance
    const initialDelay = setTimeout(() => {
      setStarted(true)
      setIsVisible(true)
    }, 10000)

    return () => clearTimeout(initialDelay)
  }, [])

  useEffect(() => {
    if (!started) return

    // Auto-cycle every 8 seconds
    const interval = setInterval(() => {
      cycleMessage()
    }, 8000)

    return () => clearInterval(interval)
  }, [started, cycleMessage])

  // Hide after 5 seconds of being visible
  useEffect(() => {
    if (!isVisible || !started) return

    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    return () => clearTimeout(hideTimer)
  }, [isVisible, started, currentIndex])

  return (
    <div className="hidden md:block fixed bottom-24 left-6 z-40 pointer-events-none">
      <AnimatePresence mode="wait">
        {isVisible && started && (
          <motion.div
            key={currentIndex}
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -120, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass-card rounded-lg px-4 py-3 flex items-center gap-3 min-w-[280px] max-w-[340px] pointer-events-auto"
          >
            <span className="text-lg flex-shrink-0">{shuffled[currentIndex].emoji}</span>
            <div className="flex flex-col min-w-0">
              <p className="text-sm text-[#C8C8C0] leading-snug truncate">
                {shuffled[currentIndex].text}
              </p>
              <span className="text-[10px] text-[#9A9A92] font-mono mt-0.5">
                Just now
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
