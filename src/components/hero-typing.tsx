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
  const [lastCharIndex, setLastCharIndex] = useState(-1)

  // Tick counter to force re-renders when re-entering the same phase
  const [tick, setTick] = useState(0)

  const phaseRef = useRef<Phase>('waiting')
  const phraseIndexRef = useRef(0)
  const displayedLenRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mountedRef = useRef(true)

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

  // Mount/unmount tracking
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      clearTimeout_()
    }
  }, [clearTimeout_])

  // Start typing after initial delay
  useEffect(() => {
    scheduleNext(() => {
      if (!mountedRef.current) return
      phaseRef.current = 'typing'
      setPhase('typing')
      setTick(t => t + 1)
    }, initialDelay)

    return clearTimeout_
  }, [initialDelay, scheduleNext, clearTimeout_])

  // Core typing/deleting state machine — runs whenever phase or tick changes
  useEffect(() => {
    if (phase === 'waiting') return

    if (phase === 'typing') {
      const phrase = phrases[phraseIndexRef.current]
      if (displayedLenRef.current < phrase.length) {
        displayedLenRef.current += 1
        const newLen = displayedLenRef.current
        setDisplayedText(phrase.slice(0, newLen))
        setLastCharIndex(newLen - 1)
        scheduleNext(() => {
          if (!mountedRef.current) return
          // Use tick to force re-trigger even though phase stays 'typing'
          setTick(t => t + 1)
        }, typeSpeed + Math.random() * 20)
      } else {
        // Done typing — pause
        phaseRef.current = 'pausing'
        setPhase('pausing')
      }
    } else if (phase === 'pausing') {
      scheduleNext(() => {
        if (!mountedRef.current) return
        phaseRef.current = 'deleting'
        setPhase('deleting')
      }, pauseDuration)
    } else if (phase === 'deleting') {
      if (displayedLenRef.current > 0) {
        displayedLenRef.current -= 1
        const newLen = displayedLenRef.current
        setDisplayedText(phrases[phraseIndexRef.current].slice(0, newLen))
        scheduleNext(() => {
          if (!mountedRef.current) return
          setTick(t => t + 1)
        }, deleteSpeed)
      } else {
        // Move to next phrase
        const nextIndex = (phraseIndexRef.current + 1) % phrases.length
        phraseIndexRef.current = nextIndex
        setPhraseIndex(nextIndex)
        phaseRef.current = 'typing'
        setPhase('typing')
        setTick(t => t + 1)
      }
    }
  }, [phase, tick, phrases, typeSpeed, deleteSpeed, pauseDuration, scheduleNext])

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline">
      <span className="text-cd-gold-light text-glow-gold inline">
        {displayedText.split('').map((char, i) => (
          <motion.span
            key={`${phraseIndex}-${i}`}
            className="inline-block"
            initial={i === lastCharIndex && phase === 'typing' ? { scale: 1.12 } : undefined}
            animate={{ scale: 1 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              textShadow: i === lastCharIndex && phase === 'typing'
                ? '0 0 30px rgba(201, 168, 76, 0.5), 0 0 60px rgba(201, 168, 76, 0.25)'
                : undefined,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
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
