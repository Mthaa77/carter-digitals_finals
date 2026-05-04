'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#story' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Blog', href: '#blog' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sectionIds = ['home', 'why-carter', 'team', 'clients', 'stats', 'services', 'compare', 'portfolio', 'testimonials', 'video-testimonials', 'showcase', 'tools', 'estimator', 'process', 'story', 'timeline', 'pricing', 'faq', 'blog', 'newsletter', 'contact']

  useEffect(() => {
    const handleSectionScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i])
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleSectionScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleSectionScroll)
  }, [sectionIds])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cd-surface/90 backdrop-blur-xl border-b border-cd-border shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-3 group"
            >
              <Image
                src="/carter-digitals-logo.png"
                alt="Carter Digitals Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                <span className="text-cd-text">Carter</span>{' '}
                <span className="text-cd-gold">Digitals</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const sectionId = item.href.replace('#', '')
                const isActive = activeSection === sectionId
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`link-underline relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md hover:bg-cd-gold/5 ${
                      isActive
                        ? 'text-cd-gold'
                        : 'text-cd-text-muted hover:text-cd-text'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2 right-2 h-[3px] bg-cd-gold rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                )
              })}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="btn-press ml-4 px-5 py-2.5 bg-cd-gold text-cd-bg text-sm font-bold rounded-lg hover:bg-cd-gold-light hover:shadow-cd-gold/25 transition-colors duration-300 shadow-lg shadow-cd-gold/10 shadow-[0_0_15px_rgba(201,168,76,0.15)]"
              >
                Get a Quote
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-3 text-cd-text-muted hover:text-cd-text transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-cd-bg/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-4">
              {/* Gold accent line at top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cd-gold-dim via-cd-gold to-cd-gold-dim" />

              {navItems.map((item, i) => {
                const sectionId = item.href.replace('#', '')
                const isActive = activeSection === sectionId
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className={`text-2xl font-display font-semibold py-3 px-8 rounded-lg transition-colors duration-300 ${
                      isActive
                        ? 'text-cd-gold bg-cd-gold/10'
                        : 'text-cd-text-muted hover:text-cd-text'
                    }`}
                  >
                    {item.label}
                  </motion.a>
                )
              })}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navItems.length * 0.08, duration: 0.4 }}
                className="mt-4 px-8 py-3.5 bg-cd-gold text-cd-bg text-lg font-bold rounded-lg hover:bg-cd-gold-light transition-colors duration-300"
              >
                Get a Quote
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
