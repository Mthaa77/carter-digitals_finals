'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import ThemeToggle from '@/components/theme-toggle'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#story' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Tools', href: '#tools' },
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

  const sectionIds = ['home', 'why-carter', 'trust-badges', 'team', 'clients', 'quick-stats', 'stats', 'achievements', 'services', 'tech-stack', 'compare', 'showcase-gallery', 'gallery', 'portfolio', 'testimonials', 'video-testimonials', 'showcase', 'tools', 'roi-calculator', 'estimator', 'process', 'story', 'timeline', 'pricing', 'faq', 'blog', 'newsletter', 'contact']

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
    // If it's a full page route (starts with /), let the browser handle it natively
    if (href.startsWith('/')) {
      setMobileOpen(false)
      return
    }
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
            ? 'bg-cd-surface/90 backdrop-blur-xl shadow-lg shadow-black/20 shadow-[0_2px_20px_rgba(201,168,76,0.06)]'
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
                height={24}
                className="object-contain"
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
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`link-underline relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md hover:bg-cd-gold/5 focus-visible:outline-2 focus-visible:outline-cd-gold focus-visible:outline-offset-2 ${
                      isActive
                        ? 'text-cd-gold'
                        : 'text-cd-text-muted hover:text-cd-text'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2 right-2 h-[3px] rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, #C9A84C, #22D3EE)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                )
              })}
              <ThemeToggle />
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="btn-press btn-glow-gold ml-4 px-5 py-2.5 text-cd-bg text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-cd-gold/10 hover:shadow-cd-gold/25"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C, #E8CA7A)',
                }}
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

        {/* Scrolled gradient border at bottom (neon-line concept) */}
        {scrolled && (
          <div className="neon-line" />
        )}
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(8,8,8,0.98) 0%, rgba(17,17,17,0.97) 50%, rgba(8,8,8,0.98) 100%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            {/* Gradient overlay accent */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(34,211,238,0.04) 0%, transparent 50%)',
            }} />

            <div className="flex flex-col items-center justify-center h-full gap-2 relative z-10">
              {/* Neon gradient line at top */}
              <div className="absolute top-0 left-0 right-0 neon-line" />

              {/* Gold accent gradient line below top */}
              <div className="absolute top-[1px] left-0 right-0 h-[2px] bg-gradient-to-r from-cd-gold-dim via-cd-gold to-cd-gold-dim opacity-60" />

              {navItems.map((item, i) => {
                const sectionId = item.href.replace('#', '')
                const isActive = activeSection === sectionId
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className={`relative text-xl sm:text-2xl font-display font-semibold py-3 px-8 rounded-lg transition-colors duration-300 ${
                      isActive
                        ? 'text-cd-gold bg-cd-gold/10'
                        : 'text-cd-text-muted hover:text-cd-text hover:bg-cd-gold/5'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        className="absolute bottom-1 left-6 right-6 h-[2px] rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, #C9A84C, #22D3EE)',
                        }}
                      />
                    )}
                  </motion.a>
                )
              })}

              {/* Separator line */}
              <div className="w-24 my-3 neon-line" />

              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navItems.length * 0.06, duration: 0.4 }}
                className="btn-press btn-glow-gold mt-2 px-8 py-3.5 text-cd-bg text-lg font-semibold rounded-lg transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C, #E8CA7A)',
                }}
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
