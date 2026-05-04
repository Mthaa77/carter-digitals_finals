'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setProgress((scrollTop / docHeight) * 100)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Set initial value

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 h-[3px] bg-cd-gold z-[60] origin-left"
      style={{ width: `${progress}%` }}
      transition={{ duration: 0.1, ease: 'linear' }}
    />
  )
}
