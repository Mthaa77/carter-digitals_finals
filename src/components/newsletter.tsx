'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Mail } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

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
    >
      {/* Subtle gold gradient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.04]"
          style={{
            background:
              'radial-gradient(ellipse at center, #C9A84C 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          {/* Header */}
          <h2 className="font-display font-bold tracking-tight text-[#F0EFE8] mb-4" style={{ fontSize: 'var(--text-h2)' }}>
            <span className="gold-gradient-text">Stay Ahead</span>
          </h2>

          {/* Subtext */}
          <p className="text-[#B8B8B0] text-lg max-w-lg mx-auto font-sans mb-10">
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
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666] pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  placeholder="your@email.com"
                  className="w-full bg-[#131313] border border-[#242424] rounded-lg pl-10 pr-4 py-3 text-sm text-[#F0EFE8] placeholder:text-[#666] focus:outline-none focus:border-cd-gold/50 transition-colors duration-200 font-sans"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-6 py-3 bg-cd-gold text-[#080808] font-bold text-sm rounded-lg hover:bg-cd-gold-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-sans"
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
              <p className="text-[#B8B8B0] text-sm font-sans">
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
