'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface HeroTypingProps {
  text?: string
  speed?: number
  delay?: number
}

export default function HeroTyping({
  text = 'Make Money.',
  speed = 80,
  delay = 1500,
}: HeroTypingProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [delay])

  useEffect(() => {
    if (!isTyping) return

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(interval)
        setIsDone(true)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [isTyping, text, speed])

  return (
    <span className="inline">
      <span className="gold-gradient-text text-glow-gold">{displayedText}</span>
      <AnimatePresence>
        {isTyping && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{
              opacity: isDone ? [1, 0, 1, 0, 1] : 1,
            }}
            transition={
              isDone
                ? {
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                  }
                : { duration: 0 }
            }
            className="inline-block w-[3px] h-[0.85em] bg-cd-gold ml-1 align-middle"
            style={{
              borderRadius: '1px',
            }}
          />
        )}
      </AnimatePresence>
    </span>
  )
}
