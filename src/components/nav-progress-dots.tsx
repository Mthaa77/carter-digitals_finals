'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface NavSection {
  id: string
  label: string
}

const sections: NavSection[] = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contact', label: 'Contact' },
]

export default function NavProgressDots() {
  const [activeSection, setActiveSection] = useState('home')
  const [hoveredDot, setHoveredDot] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center">
      <div className="flex flex-col items-center gap-3 bg-[rgba(17,17,17,0.6)] backdrop-blur-md rounded-full px-2 py-4 border border-[#242424]/50">
        {sections.map((section) => {
          const isActive = activeSection === section.id
          const isHovered = hoveredDot === section.id

          return (
            <div
              key={section.id}
              className="relative flex items-center"
              onMouseEnter={() => setHoveredDot(section.id)}
              onMouseLeave={() => setHoveredDot(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  className="absolute right-full mr-3 whitespace-nowrap bg-cd-surface/95 backdrop-blur-sm border border-cd-border rounded-md px-3 py-1.5 text-xs font-sans text-cd-text shadow-lg pointer-events-none"
                >
                  {section.label}
                </motion.div>
              )}

              {/* Dot */}
              <button
                onClick={() => scrollToSection(section.id)}
                className="relative flex items-center justify-center focus-visible:outline-2 focus-visible:outline-cd-gold focus-visible:outline-offset-2 rounded-full"
                aria-label={`Navigate to ${section.label} section`}
              >
                <motion.div
                  animate={{
                    width: isActive ? 12 : 8,
                    height: isActive ? 12 : 8,
                    backgroundColor: isActive ? '#C9A84C' : '#3A3A3A',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                  }}
                  className="rounded-full cursor-pointer hover:bg-cd-gold/60 transition-colors duration-200"
                />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
