'use client'

import { useState, useCallback, useSyncExternalStore } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

type Theme = 'dark' | 'midnight-gold'

const emptySubscribe = () => () => {}

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark')
  const mounted = useIsMounted()

  // Apply saved theme after hydration
  if (mounted && theme === 'dark') {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('cd-theme') as Theme | null : null
    if (saved === 'midnight-gold') {
      // Schedule state update and class toggle outside render
      queueMicrotask(() => {
        document.documentElement.classList.add('midnight-gold')
        setTheme('midnight-gold')
      })
    }
  }

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'midnight-gold' : 'dark'
      localStorage.setItem('cd-theme', next)

      if (next === 'midnight-gold') {
        document.documentElement.classList.add('midnight-gold')
      } else {
        document.documentElement.classList.remove('midnight-gold')
      }

      return next
    })
  }, [])

  if (!mounted) {
    return (
      <div className="w-9 h-9" aria-hidden="true" />
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-cd-border hover:border-cd-gold/30 bg-transparent hover:bg-cd-gold/5 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-cd-gold focus-visible:outline-offset-2"
      aria-label={theme === 'dark' ? 'Switch to Midnight Gold theme' : 'Switch to Dark theme'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <Sun size={16} className="text-cd-gold" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <Moon size={16} className="text-cd-gold" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
