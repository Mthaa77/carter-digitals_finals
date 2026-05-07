'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle, Mail } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })

      const data = await res.json()

      if (data.success) {
        setIsSuccess(true)
        setEmail('')
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section
      id="newsletter"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      ref={sectionRef}
    >
      {/* Vibrant multi-color mesh gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 30%, rgba(201,168,76,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 20%, rgba(34,211,238,0.05) 0%, transparent 50%), radial-gradient(ellipse at 50% 70%, rgba(52,211,153,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 60%, rgba(201,168,76,0.04) 0%, transparent 50%)',
        }}
      />

      {/* Floating gradient orb — left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%',
          left: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float-orb-1 20s ease-in-out infinite',
        }}
      />

      {/* Floating gradient orb — right */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '10%',
          right: '-5%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float-orb-2 25s ease-in-out infinite',
        }}
      />

      {/* Floating gradient orb — center */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float-orb-3 18s ease-in-out infinite',
        }}
      />

      <div className="relative max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          {/* Header with animated mail icon + heading-shadow-lg */}
          <h2 className="font-display font-bold tracking-tight text-[#F0EFE8] mb-4 pb-3 heading-shadow-lg" style={{ fontSize: 'var(--text-h2)' }}>
            <span className="inline-flex items-center gap-3">
              <motion.span
                animate={isInView ? { y: [0, -6, 0] } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease: 'easeInOut' }}
                className="inline-flex"
              >
                <Mail className="w-7 h-7 text-cd-gold" />
              </motion.span>
              <span className="gold-gradient-text">Stay Ahead</span>
            </span>
            {/* Gold border-bottom accent */}
            <span className="block mx-auto mt-3 w-16 h-[3px] rounded-full bg-gradient-to-r from-[#7A6330] via-[#C9A84C] to-[#22D3EE]" />
          </h2>

          {/* Subtext */}
          <p className="text-[#C8C8C0] text-lg max-w-lg mx-auto font-sans mb-10">
            Get business tips, web design insights, and South African SME
            resources. No spam. Unsubscribe anytime.
          </p>

          {/* Form / Success */}
          {!isSuccess ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
            >
              <div className="relative flex-1 w-full">
                {/* Gradient border wrapper for input */}
                <div
                  className="absolute -inset-[1px] rounded-lg opacity-0 focus-within:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #C9A84C, #22D3EE)',
                  }}
                />
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666] pointer-events-none z-10" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    placeholder="your@email.com"
                    className="w-full h-12 bg-[#131313] border border-[#242424] rounded-lg pl-10 pr-4 text-sm text-[#F0EFE8] placeholder:text-[#666] focus:outline-none focus:border-transparent transition-colors duration-200 font-sans relative z-[1]"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-6 py-3 text-[#080808] font-bold text-sm rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-sans btn-press hover:shadow-[0_0_30px_rgba(201,168,76,0.35)] shadow-[0_0_20px_rgba(201,168,76,0.2)]"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C, #FBBF24)',
                }}
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-3"
            >
              <CheckCircle className="w-10 h-10 text-cd-gold" />
              <p className="text-[#F0EFE8] font-display font-semibold text-lg">
                You&apos;re in! 🎉
              </p>
              <p className="text-[#C8C8C0] text-sm font-sans">
                Welcome aboard. We&apos;ll send you the good stuff.
              </p>
            </motion.div>
          )}

          {/* Error message */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-red-400 text-sm font-sans"
            >
              {error}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
