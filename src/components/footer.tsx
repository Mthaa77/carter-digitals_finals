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
  { label: 'Website Development', href: '#services' },
  { label: 'Web Applications', href: '#services' },
  { label: 'Internal Business Tools', href: '#services' },
  { label: 'Logo & Brand Identity', href: '#services' },
  { label: 'Print Media', href: '#services' },
  { label: 'Pitch Decks', href: '#services' },
]

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'X / Twitter', href: '#' },
]

const contactItems = [
  { icon: MapPin, label: 'Soshanguve, Pretoria, Gauteng', href: null, color: 'text-[#C9A84C]' },
  { icon: Phone, label: '072 402 6893', href: 'tel:0724026893', color: 'text-cd-emerald' },
  { icon: Mail, label: 'kadiakakabelo4@gmail.com', href: 'mailto:kadiakakabelo4@gmail.com', color: 'text-cd-cyan' },
  { icon: Clock, label: 'We reply within 4 business hours', href: null, color: 'text-cd-violet' },
]

export default function Footer() {
  return (
    <footer className="relative">
      {/* Footer CTA Section — Aurora Background */}
      <section className="aurora-bg relative py-20 md:py-28 overflow-hidden">
        {/* Additional subtle glow layer */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#C9A84C] blur-[150px] opacity-[0.07]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="gold-gradient-text heading-shadow-lg font-display font-bold mb-8"
            style={{ fontSize: 'var(--text-h2)' }}
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
              className="btn-press btn-glow-gold inline-flex items-center justify-center px-8 py-3.5 text-[#080808] font-display font-semibold text-sm tracking-wide rounded-lg transition-all duration-300 shadow-lg shadow-cd-gold/15 hover:shadow-cd-gold/30"
              style={{
                background: 'linear-gradient(135deg, #C9A84C, #E8CA7A)',
              }}
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

      {/* Neon gradient top border */}
      <div className="neon-line" />

      {/* Footer Main */}
      <div className="bg-[#0A0A0A] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Column 1 - Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <Image
                  src="/carter-digitals-logo.png"
                  alt="Carter Digitals Logo"
                  width={40}
                  height={30}
                  className="shrink-0"
                />
                <span className="font-display text-xl font-bold">
                  <span className="text-[#F0EFE8]">Carter</span>{' '}
                  <span className="gold-gradient-text">Digitals</span>
                </span>
              </div>
              <p className="text-[#C8C8C0] font-sans text-base leading-relaxed max-w-xs">
                High-agility digital infrastructure &amp; AI-enabled solutions for South Africa&apos;s forward-thinking institutions.
              </p>

              {/* Social media links — gradient hover effects */}
              <div className="flex items-center gap-3 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="group flex items-center justify-center w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#242424] text-[#C8C8C0] transition-all duration-300 hover:border-cd-gold/30 hover:text-cd-gold hover:bg-cd-gold/5 hover:shadow-[0_0_12px_rgba(201,168,76,0.15)]"
                    style={{
                      // On hover, the text color transitions gold→emerald via CSS
                    }}
                  >
                    <social.icon className="w-4 h-4 transition-colors duration-300 group-hover:text-cd-emerald" />
                  </a>
                ))}
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

            {/* Column 4 - Contact — colored icons */}
            <div>
              <h3 className="font-display text-sm font-bold text-[#F0EFE8] uppercase tracking-wider mb-5">
                Contact
              </h3>
              <ul className="space-y-4">
                {contactItems.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <item.icon className={`w-4 h-4 mt-0.5 shrink-0 ${item.color}`} />
                    {item.href ? (
                      <a
                        href={item.href}
                        className="link-underline text-[#C8C8C0] hover:text-[#C9A84C] font-sans text-base transition-colors duration-200"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-[#C8C8C0] font-sans text-base">
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar — neon-line style top border */}
      <div className="neon-line" />
      <div className="bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <p className="text-cd-text-dim font-sans text-sm">
              &copy; 2026 Carter Digitals (Pty) Ltd
            </p>
            <span className="text-cd-gold-dim text-xs" aria-hidden="true">●</span>
            <span className="text-[#C8C8C0] font-sans text-xs">
              CIPC: 2025/907839/07 · B-BBEE Level 1 — 135% Procurement · POPIA Compliant · CSD Registered · 100% Black-Owned · 100% Youth-Owned
            </span>
          </div>
          <p className="text-cd-text-dim font-sans text-xs">
            Designed &amp; built in Soshanguve, South Africa 🇿🇦
          </p>
        </div>
      </div>
    </footer>
  )
}
