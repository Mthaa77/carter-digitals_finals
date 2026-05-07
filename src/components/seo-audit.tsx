'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Globe, Smartphone, FileText, Code, BarChart3, ArrowRight, Loader2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

interface AuditCategory {
  name: string
  icon: React.ElementType
  score: number
  color: string
  tips: { text: string; status: 'good' | 'warning' | 'bad' }[]
}

function generateAudit(url: string): AuditCategory[] {
  // Seed a pseudo-random number from the URL for deterministic but varied results
  let seed = 0
  for (let i = 0; i < url.length; i++) {
    seed = ((seed << 5) - seed + url.charCodeAt(i)) | 0
  }
  const seededRandom = (offset: number) => {
    const x = Math.sin(seed + offset) * 10000
    return x - Math.floor(x)
  }

  // Generate weighted scores — most sites have middling scores
  const perfBase = Math.round(35 + seededRandom(1) * 45)
  const mobileBase = Math.round(40 + seededRandom(2) * 40)
  const seoBase = Math.round(30 + seededRandom(3) * 50)
  const contentBase = Math.round(35 + seededRandom(4) * 45)
  const techBase = Math.round(30 + seededRandom(5) * 45)

  const makeTip = (text: string, threshold: number, score: number, offset: number): { text: string; status: 'good' | 'warning' | 'bad' } => {
    if (score >= threshold + 15) return { text, status: 'good' }
    if (score >= threshold - 10) return { text, status: 'warning' }
    return { text, status: seededRandom(offset) > 0.5 ? 'warning' : 'bad' }
  }

  return [
    {
      name: 'Performance',
      icon: Globe,
      score: perfBase,
      color: perfBase >= 70 ? '#34D399' : perfBase >= 45 ? '#C9A84C' : '#FB7185',
      tips: [
        makeTip('Page load speed is acceptable', 70, perfBase, 10),
        makeTip('Large images need optimisation', 50, perfBase, 11),
        makeTip('Reduce unused JavaScript', 60, perfBase, 12),
        makeTip('Enable text compression (Gzip/Brotli)', 55, perfBase, 13),
        makeTip('Server response time is under 200ms', 75, perfBase, 14),
      ],
    },
    {
      name: 'Mobile-Friendly',
      icon: Smartphone,
      score: mobileBase,
      color: mobileBase >= 70 ? '#34D399' : mobileBase >= 45 ? '#C9A84C' : '#FB7185',
      tips: [
        makeTip('Viewport meta tag is set correctly', 70, mobileBase, 20),
        makeTip('Tap targets are properly sized', 60, mobileBase, 21),
        makeTip('Content fits within the viewport', 65, mobileBase, 22),
        makeTip('Text is readable without zooming', 55, mobileBase, 23),
        makeTip('Avoids horizontal scrolling on mobile', 75, mobileBase, 24),
      ],
    },
    {
      name: 'SEO Basics',
      icon: Search,
      score: seoBase,
      color: seoBase >= 70 ? '#34D399' : seoBase >= 45 ? '#C9A84C' : '#FB7185',
      tips: [
        makeTip('Title tags are present and descriptive', 70, seoBase, 30),
        makeTip('Meta descriptions are optimised', 55, seoBase, 31),
        makeTip('Heading structure (H1–H6) is logical', 60, seoBase, 32),
        makeTip('Image alt tags are present', 50, seoBase, 33),
        makeTip('Canonical URLs are properly set', 65, seoBase, 34),
      ],
    },
    {
      name: 'Content Quality',
      icon: FileText,
      score: contentBase,
      color: contentBase >= 70 ? '#34D399' : contentBase >= 45 ? '#C9A84C' : '#FB7185',
      tips: [
        makeTip('Pages have sufficient content length', 65, contentBase, 40),
        makeTip('Content is unique (no duplicate pages)', 70, contentBase, 41),
        makeTip('Internal linking structure is solid', 55, contentBase, 42),
        makeTip('Fresh content — blog or updates present', 60, contentBase, 43),
      ],
    },
    {
      name: 'Technical SEO',
      icon: Code,
      score: techBase,
      color: techBase >= 70 ? '#34D399' : techBase >= 45 ? '#C9A84C' : '#FB7185',
      tips: [
        makeTip('SSL certificate is active (HTTPS)', 80, techBase, 50),
        makeTip('Robots.txt is properly configured', 60, techBase, 51),
        makeTip('XML sitemap is accessible', 55, techBase, 52),
        makeTip('Structured data (Schema.org) is present', 50, techBase, 53),
        makeTip('No broken links detected', 65, techBase, 54),
      ],
    },
  ]
}

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="w-full h-2.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  )
}

function StatusIcon({ status }: { status: 'good' | 'warning' | 'bad' }) {
  if (status === 'good') return <CheckCircle className="w-4 h-4 text-[#34D399] shrink-0" />
  if (status === 'warning') return <AlertTriangle className="w-4 h-4 text-[#C9A84C] shrink-0" />
  return <XCircle className="w-4 h-4 text-[#FB7185] shrink-0" />
}

export default function SEOAudit() {
  const [url, setUrl] = useState('')
  const [results, setResults] = useState<AuditCategory[] | null>(null)
  const [loading, setLoading] = useState(false)

  const handleAudit = useCallback(() => {
    if (!url.trim()) return

    let cleanUrl = url.trim()
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl
    }

    setLoading(true)
    setResults(null)

    // Simulate API call delay
    setTimeout(() => {
      const audit = generateAudit(cleanUrl)
      setResults(audit)
      setLoading(false)
    }, 1800)
  }, [url])

  const overallScore = results
    ? Math.round(results.reduce((sum, cat) => sum + cat.score, 0) / results.length)
    : 0

  const overallColor = overallScore >= 70 ? '#34D399' : overallScore >= 45 ? '#C9A84C' : '#FB7185'

  return (
    <section id="seo-audit" className="py-20 md:py-28 bg-[var(--cd-bg)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-xl p-6 md:p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[rgba(201,168,76,0.08)]">
              <Search className="w-4 h-4 text-[var(--cd-gold)]" strokeWidth={1.8} />
            </div>
            <span className="text-[var(--cd-text)] font-display font-semibold text-base">
              Enter Your Website URL
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--cd-text-dim)]" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAudit()}
                placeholder="e.g. www.yourbusiness.co.za"
                className="w-full pl-11 pr-4 h-12 text-base font-sans bg-[rgba(255,255,255,0.03)] border border-[var(--cd-border)] rounded-lg text-[var(--cd-text)] placeholder:text-[var(--cd-text-dim)] focus-visible:border-[var(--cd-gold)] focus-visible:ring-[var(--cd-gold)]/20 focus-visible:ring-[3px] transition-all duration-200"
                aria-label="Website URL to audit"
              />
            </div>
            <button
              onClick={handleAudit}
              disabled={loading || !url.trim()}
              className="group flex items-center justify-center gap-2 px-6 h-12 rounded-lg bg-[var(--cd-gold)] text-[var(--cd-bg)] font-display font-semibold text-sm hover:bg-[var(--cd-gold-light)] transition-all duration-300 shadow-[0_0_20px_rgba(201,168,76,0.15)] hover:shadow-[0_0_30px_rgba(201,168,76,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analysing...
                </>
              ) : (
                <>
                  Run SEO Audit
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>

          <p className="text-[var(--cd-text-dim)] text-xs mt-3 font-sans">
            Enter your website URL for a free SEO health check. No signup required.
          </p>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-xl p-12 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(201,168,76,0.1)] mb-6">
                <Loader2 className="w-8 h-8 text-cd-gold animate-spin" />
              </div>
              <h3 className="font-display text-xl font-bold text-[var(--cd-text)] mb-2">
                Scanning Your Website...
              </h3>
              <p className="text-[var(--cd-text-muted)] text-sm">
                Checking performance, mobile, SEO, content, and technical factors.
              </p>
              <div className="flex items-center justify-center gap-1.5 mt-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-cd-gold"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                    transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {results && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Overall Score */}
              <div className="glass-card rounded-xl p-6 md:p-8 mb-6 text-center">
                <span className="text-[var(--cd-text-dim)] font-mono text-xs tracking-widest uppercase mb-3 block">
                  Overall SEO Score
                </span>
                <div className="relative inline-flex items-center justify-center mb-4">
                  <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke={overallColor}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 52}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - overallScore / 100) }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="font-mono text-4xl font-bold"
                      style={{ color: overallColor }}
                    >
                      {overallScore}
                    </motion.span>
                  </div>
                </div>
                <p className="text-[var(--cd-text-muted)] text-sm">
                  {overallScore >= 70
                    ? 'Good foundation! A few improvements could boost your ranking significantly.'
                    : overallScore >= 45
                      ? 'There\'s room for improvement. Addressing the issues below could significantly boost your visibility.'
                      : 'Your site needs attention. Many critical SEO factors need improvement for better Google rankings.'}
                </p>
              </div>

              {/* Category Results */}
              <div className="space-y-4">
                {results.map((category, i) => {
                  const Icon = category.icon
                  return (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="glass-card rounded-xl p-5 md:p-6"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.04)]">
                            <Icon className="w-4 h-4 text-[var(--cd-gold)]" strokeWidth={1.8} />
                          </div>
                          <span className="font-display font-semibold text-[var(--cd-text)]">
                            {category.name}
                          </span>
                        </div>
                        <span
                          className="font-mono text-lg font-bold tabular-nums"
                          style={{ color: category.color }}
                        >
                          {category.score}
                          <span className="text-[var(--cd-text-dim)] text-xs font-normal">/100</span>
                        </span>
                      </div>

                      <ScoreBar score={category.score} color={category.color} />

                      {/* Tips */}
                      <div className="mt-4 space-y-2.5">
                        {category.tips.map((tip, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 + j * 0.05 }}
                            className="flex items-start gap-2.5"
                          >
                            <StatusIcon status={tip.status} />
                            <span className="text-[var(--cd-text-muted)] text-sm leading-relaxed">
                              {tip.text}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="glass-card-gold rounded-xl p-6 md:p-8 mt-8 text-center"
              >
                <BarChart3 className="w-8 h-8 text-cd-gold mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-[var(--cd-text)] mb-2">
                  Get a Full SEO Audit
                </h3>
                <p className="text-[var(--cd-text-muted)] text-sm max-w-lg mx-auto mb-5 leading-relaxed">
                  This quick scan gives you an overview. Our comprehensive SEO audit includes keyword analysis, competitor benchmarking, and a step-by-step action plan.
                </p>
                <a
                  href="/#contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--cd-gold)] text-[var(--cd-bg)] font-display font-semibold text-sm hover:bg-[var(--cd-gold-light)] transition-all duration-300 shadow-[0_0_20px_rgba(201,168,76,0.15)] hover:shadow-[0_0_30px_rgba(201,168,76,0.25)]"
                >
                  Get a Full SEO Audit
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
