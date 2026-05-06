'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const PHRASES = ['Make Money.', 'Get Found.', 'Close Deals.', 'Stand Out.']

interface HeroTypingProps {
  phrases?: string[]
  typeSpeed?: number
  deleteSpeed?: number
  pauseDuration?: number
  initialDelay?: number
}

type Phase = 'waiting' | 'typing' | 'pausing' | 'deleting'

export default function HeroTyping({
  phrases = PHRASES,
  typeSpeed = 70,
  deleteSpeed = 40,
  pauseDuration = 2000,
  initialDelay = 800,
}: HeroTypingProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [phase, setPhase] = useState<Phase>('waiting')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)

  const phaseRef = useRef<Phase>('waiting')
  const phraseIndexRef = useRef(0)
  const displayedLenRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimeout_ = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const scheduleNext = useCallback((fn: () => void, ms: number) => {
    clearTimeout_()
    timerRef.current = setTimeout(fn, ms)
  }, [clearTimeout_])

  useEffect(() => {
    // Start after initial delay
    scheduleNext(() => {
      phaseRef.current = 'typing'
      setPhase('typing')
    }, initialDelay)

    return clearTimeout_
  }, [initialDelay, scheduleNext, clearTimeout_])

  // Core typing/deleting state machine
  useEffect(() => {
    if (phase === 'waiting') return

    if (phase === 'typing') {
      const phrase = phrases[phraseIndexRef.current]
      if (displayedLenRef.current < phrase.length) {
        displayedLenRef.current += 1
        setDisplayedText(phrase.slice(0, displayedLenRef.current))
        scheduleNext(() => {
          // Re-trigger by staying in typing phase
          setPhase('typing')
        }, typeSpeed + Math.random() * 30)
      } else {
        // Done typing, pause
        phaseRef.current = 'pausing'
        setPhase('pausing')
      }
    } else if (phase === 'pausing') {
      scheduleNext(() => {
        phaseRef.current = 'deleting'
        setPhase('deleting')
      }, pauseDuration)
    } else if (phase === 'deleting') {
      if (displayedLenRef.current > 0) {
        displayedLenRef.current -= 1
        setDisplayedText(phrases[phraseIndexRef.current].slice(0, displayedLenRef.current))
        scheduleNext(() => {
          setPhase('deleting')
        }, deleteSpeed)
      } else {
        // Move to next phrase
        const nextIndex = (phraseIndexRef.current + 1) % phrases.length
        phraseIndexRef.current = nextIndex
        setPhraseIndex(nextIndex)
        phaseRef.current = 'typing'
        setPhase('typing')
      }
    }
  }, [phase, phrases, typeSpeed, deleteSpeed, pauseDuration, scheduleNext])

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline">
      <span className="gold-gradient-text text-glow-gold inline">
        {displayedText}
      </span>
      <motion.span
        className="inline-block w-[3px] ml-1 align-middle rounded-[1px]"
        style={{
          height: '0.85em',
          backgroundColor: '#C9A84C',
          opacity: cursorVisible && phase !== 'waiting' ? 1 : 0,
        }}
        animate={{
          opacity: cursorVisible && phase !== 'waiting' ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
      />
    </span>
  )
}
