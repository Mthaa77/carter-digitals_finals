'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Phone, Mail, Clock, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#story' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

const serviceLinks = [
  { label: 'SME Websites', href: '#services' },
  { label: 'Dashboards', href: '#services' },
  { label: 'SEO & Growth', href: '#services' },
  { label: 'Google Ads', href: '#services' },
]

export default function Footer() {
  return (
    <footer className="relative">
      {/* Footer CTA Section */}
      <section className="relative bg-[#080808] py-20 md:py-28 overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(201, 168, 76, 0.03) 0%, transparent 70%), #080808' }}>
        {/* Subtle background glow */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#C9A84C] blur-[150px] opacity-[0.07]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-display text-[var(--text-h2)] font-bold text-[#F0EFE8] mb-8"
          >
            Let&apos;s Build Something That Works.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#C9A84C] hover:bg-[#E8CA7A] text-[#080808] font-display font-semibold text-sm tracking-wide rounded transition-colors duration-200"
            >
              Start Your Project
            </a>
            <a
              href="https://wa.me/27724026893?text=Hi%20Carter%20Digitals%2C%20I%27d%20like%20to%20discuss%20a%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-2 text-[#C8C8C0] hover:text-[#C9A84C] font-sans text-base transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              Prefer to chat? Message us on WhatsApp.
            </a>
          </motion.div>
        </div>
      </section>

      {/* Top border - subtle gold tint */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#7A6330]/40 to-transparent" />

      {/* Footer Main */}
      <div className="bg-[#0A0A0A] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Column 1 - Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <Image
                  src="/carter-digitals-logo.png"
                  alt="Carter Digitals Logo"
                  width={40}
                  height={40}
                  className="shrink-0"
                />
                <span className="font-display text-xl font-bold">
                  <span className="text-[#F0EFE8]">Carter</span>{' '}
                  <span className="text-[#C9A84C]">Digitals</span>
                </span>
              </div>
              <p className="text-[#C8C8C0] font-sans text-base leading-relaxed max-w-xs">
                Built in Soshanguve. For businesses that refuse to be invisible.
              </p>

              {/* Social media links */}
              <div className="flex items-center gap-4 mt-5">
                <a href="#" aria-label="Facebook" className="text-[#C8C8C0] hover:text-[#C9A84C] transition-colors duration-200">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" aria-label="Instagram" className="text-[#C8C8C0] hover:text-[#C9A84C] transition-colors duration-200">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" aria-label="LinkedIn" className="text-[#C8C8C0] hover:text-[#C9A84C] transition-colors duration-200">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" aria-label="X / Twitter" className="text-[#C8C8C0] hover:text-[#C9A84C] transition-colors duration-200">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div>
              <h3 className="font-display text-sm font-bold text-[#F0EFE8] uppercase tracking-wider mb-5">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="link-underline text-[#C8C8C0] hover:text-[#C9A84C] font-sans text-base transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Services */}
            <div>
              <h3 className="font-display text-sm font-bold text-[#F0EFE8] uppercase tracking-wider mb-5">
                Services
              </h3>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="link-underline text-[#C8C8C0] hover:text-[#C9A84C] font-sans text-base transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Contact */}
            <div>
              <h3 className="font-display text-sm font-bold text-[#F0EFE8] uppercase tracking-wider mb-5">
                Contact
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
                  <span className="text-[#C8C8C0] font-sans text-base">
                    Soshanguve, Pretoria, Gauteng
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
                  <a
                    href="tel:0724026893"
                    className="link-underline text-[#C8C8C0] hover:text-[#C9A84C] font-sans text-base transition-colors duration-200"
                  >
                    072 402 6893
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
                  <a
                    href="mailto:info@carterdigitals.co.za"
                    className="link-underline text-[#C8C8C0] hover:text-[#C9A84C] font-sans text-base transition-colors duration-200"
                  >
                    info@carterdigitals.co.za
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
                  <span className="text-[#C8C8C0] font-sans text-base">
                    We reply within 4 business hours
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1A1A1A] bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#9A9A92] font-sans text-sm">
            &copy; 2026 Carter Digitals (Pty) Ltd
          </p>
          <span className="inline-flex items-center gap-1.5 text-[#7A6330] font-mono text-xs font-medium tracking-wide">
            <span className="inline-block w-2 h-2 rounded-full bg-[#7A6330]" />
            B-BBEE Level 1
          </span>
        </div>
      </div>
    </footer>
  )
}
