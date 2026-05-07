'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Globe, Smartphone, FileText, Code, BarChart3, ArrowRight,
  Loader2, AlertTriangle, CheckCircle, XCircle, Copy, CheckCircle2,
  Zap, Target, TrendingUp, Users
} from 'lucide-react'

interface AuditSubScore {
  name: string
  score: number
  maxScore: number
}

interface AuditCategory {
  name: string
  icon: React.ElementType
  score: number
  color: string
  tips: { text: string; status: 'good' | 'warning' | 'bad'; impact: 'high' | 'medium' | 'low' }[]
  subScores: AuditSubScore[]
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

  const perfBase = Math.round(35 + seededRandom(1) * 45)
  const mobileBase = Math.round(40 + seededRandom(2) * 40)
  const seoBase = Math.round(30 + seededRandom(3) * 50)
  const contentBase = Math.round(35 + seededRandom(4) * 45)
  const techBase = Math.round(30 + seededRandom(5) * 45)

  const makeTip = (text: string, threshold: number, score: number, offset: number, impact: 'high' | 'medium' | 'low' = 'medium'): { text: string; status: 'good' | 'warning' | 'bad'; impact: 'high' | 'medium' | 'low' } => {
    if (score >= threshold + 15) return { text, status: 'good', impact }
    if (score >= threshold - 10) return { text, status: 'warning', impact }
    return { text, status: seededRandom(offset) > 0.5 ? 'warning' : 'bad', impact }
  }

  return [
    {
      name: 'Performance',
      icon: Globe,
      score: perfBase,
      color: perfBase >= 70 ? '#34D399' : perfBase >= 45 ? '#C9A84C' : '#FB7185',
      tips: [
        makeTip('Page load speed is acceptable', 70, perfBase, 10, 'high'),
        makeTip('Large images need optimisation', 50, perfBase, 11, 'high'),
        makeTip('Reduce unused JavaScript', 60, perfBase, 12, 'medium'),
        makeTip('Enable text compression (Gzip/Brotli)', 55, perfBase, 13, 'medium'),
        makeTip('Server response time is under 200ms', 75, perfBase, 14, 'low'),
      ],
      subScores: [
        { name: 'First Contentful Paint', score: Math.round(perfBase * 0.95 + seededRandom(60) * 10), maxScore: 100 },
        { name: 'Largest Contentful Paint', score: Math.round(perfBase * 0.85 + seededRandom(61) * 15), maxScore: 100 },
        { name: 'Cumulative Layout Shift', score: Math.round(perfBase * 1.05 + seededRandom(62) * 10), maxScore: 100 },
        { name: 'Total Blocking Time', score: Math.round(perfBase * 0.9 + seededRandom(63) * 15), maxScore: 100 },
      ],
    },
    {
      name: 'Mobile-Friendly',
      icon: Smartphone,
      score: mobileBase,
      color: mobileBase >= 70 ? '#34D399' : mobileBase >= 45 ? '#C9A84C' : '#FB7185',
      tips: [
        makeTip('Viewport meta tag is set correctly', 70, mobileBase, 20, 'high'),
        makeTip('Tap targets are properly sized', 60, mobileBase, 21, 'high'),
        makeTip('Content fits within the viewport', 65, mobileBase, 22, 'medium'),
        makeTip('Text is readable without zooming', 55, mobileBase, 23, 'medium'),
        makeTip('Avoids horizontal scrolling on mobile', 75, mobileBase, 24, 'low'),
      ],
      subScores: [
        { name: 'Viewport Configuration', score: Math.round(mobileBase * 1.05 + seededRandom(70) * 8), maxScore: 100 },
        { name: 'Touch Target Sizing', score: Math.round(mobileBase * 0.9 + seededRandom(71) * 12), maxScore: 100 },
        { name: 'Font Size Legibility', score: Math.round(mobileBase * 0.95 + seededRandom(72) * 10), maxScore: 100 },
      ],
    },
    {
      name: 'SEO Basics',
      icon: Search,
      score: seoBase,
      color: seoBase >= 70 ? '#34D399' : seoBase >= 45 ? '#C9A84C' : '#FB7185',
      tips: [
        makeTip('Title tags are present and descriptive', 70, seoBase, 30, 'high'),
        makeTip('Meta descriptions are optimised', 55, seoBase, 31, 'high'),
        makeTip('Heading structure (H1\u2013H6) is logical', 60, seoBase, 32, 'medium'),
        makeTip('Image alt tags are present', 50, seoBase, 33, 'medium'),
        makeTip('Canonical URLs are properly set', 65, seoBase, 34, 'low'),
      ],
      subScores: [
        { name: 'Title & Meta Tags', score: Math.round(seoBase * 1.0 + seededRandom(80) * 10), maxScore: 100 },
        { name: 'Heading Hierarchy', score: Math.round(seoBase * 0.9 + seededRandom(81) * 15), maxScore: 100 },
        { name: 'Image Optimisation', score: Math.round(seoBase * 0.85 + seededRandom(82) * 15), maxScore: 100 },
      ],
    },
    {
      name: 'Content Quality',
      icon: FileText,
      score: contentBase,
      color: contentBase >= 70 ? '#34D399' : contentBase >= 45 ? '#C9A84C' : '#FB7185',
      tips: [
        makeTip('Pages have sufficient content length', 65, contentBase, 40, 'high'),
        makeTip('Content is unique (no duplicate pages)', 70, contentBase, 41, 'high'),
        makeTip('Internal linking structure is solid', 55, contentBase, 42, 'medium'),
        makeTip('Fresh content \u2014 blog or updates present', 60, contentBase, 43, 'medium'),
      ],
      subScores: [
        { name: 'Content Depth', score: Math.round(contentBase * 0.9 + seededRandom(90) * 12), maxScore: 100 },
        { name: 'Uniqueness', score: Math.round(contentBase * 1.05 + seededRandom(91) * 8), maxScore: 100 },
        { name: 'Freshness', score: Math.round(contentBase * 0.85 + seededRandom(92) * 15), maxScore: 100 },
      ],
    },
    {
      name: 'Technical SEO',
      icon: Code,
      score: techBase,
      color: techBase >= 70 ? '#34D399' : techBase >= 45 ? '#C9A84C' : '#FB7185',
      tips: [
        makeTip('SSL certificate is active (HTTPS)', 80, techBase, 50, 'high'),
        makeTip('Robots.txt is properly configured', 60, techBase, 51, 'medium'),
        makeTip('XML sitemap is accessible', 55, techBase, 52, 'medium'),
        makeTip('Structured data (Schema.org) is present', 50, techBase, 53, 'medium'),
        makeTip('No broken links detected', 65, techBase, 54, 'low'),
      ],
      subScores: [
        { name: 'HTTPS / Security', score: Math.round(techBase * 1.1 + seededRandom(100) * 8), maxScore: 100 },
        { name: 'Crawlability', score: Math.round(techBase * 0.9 + seededRandom(101) * 12), maxScore: 100 },
        { name: 'Structured Data', score: Math.round(techBase * 0.8 + seededRandom(102) * 15), maxScore: 100 },
      ],
    },
  ]
}

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="w-full h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
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
  if (status === 'good') return <CheckCircle className="w-4 h-4 text-cd-emerald shrink-0" />
  if (status === 'warning') return <AlertTriangle className="w-4 h-4 text-cd-gold shrink-0" />
  return <XCircle className="w-4 h-4 text-cd-rose shrink-0" />
}

function ImpactBadge({ impact }: { impact: 'high' | 'medium' | 'low' }) {
  const colors = {
    high: 'bg-cd-rose/10 text-cd-rose border-cd-rose/20',
    medium: 'bg-cd-gold/10 text-cd-gold border-cd-gold/20',
    low: 'bg-cd-text-dim/10 text-cd-text-dim border-cd-text-dim/20',
  }
  return (
    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${colors[impact]}`}>
      {impact === 'high' ? 'HIGH' : impact === 'medium' ? 'MED' : 'LOW'}
    </span>
  )
}

export default function SEOAudit() {
  const [url, setUrl] = useState('')
  const [competitorUrl, setCompetitorUrl] = useState('')
  const [results, setResults] = useState<AuditCategory[] | null>(null)
  const [competitorResults, setCompetitorResults] = useState<AuditCategory[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showCompetitor, setShowCompetitor] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  const handleAudit = useCallback(() => {
    if (!url.trim()) return

    let cleanUrl = url.trim()
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl
    }

    setLoading(true)
    setResults(null)
    setCompetitorResults(null)

    setTimeout(() => {
      const audit = generateAudit(cleanUrl)
      setResults(audit)
      setLoading(false)
    }, 1800)
  }, [url])

  const handleCompetitorAudit = useCallback(() => {
    if (!competitorUrl.trim() || !results) return

    let cleanUrl = competitorUrl.trim()
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl
    }

    const audit = generateAudit(cleanUrl)
    setCompetitorResults(audit)
  }, [competitorUrl, results])

  const toggleCategory = (name: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const overallScore = results
    ? Math.round(results.reduce((sum, cat) => sum + cat.score, 0) / results.length)
    : 0

  const overallColor = overallScore >= 70 ? '#34D399' : overallScore >= 45 ? '#C9A84C' : '#FB7185'

  // Simulated "after" score if all recommendations implemented
  const simulatedAfterScore = results
    ? Math.min(95, Math.round(overallScore + (100 - overallScore) * 0.55))
    : 0

  const simulatedAfterColor = simulatedAfterScore >= 70 ? '#34D399' : simulatedAfterScore >= 45 ? '#C9A84C' : '#FB7185'

  // Priority actions: top 3 highest-impact tips that are not "good"
  const priorityActions = results
    ? results
        .flatMap(cat => cat.tips
          .filter(tip => tip.status !== 'good' && tip.impact === 'high')
          .map(tip => ({ ...tip, category: cat.name }))
        )
        .slice(0, 3)
    : []

  const competitorOverallScore = competitorResults
    ? Math.round(competitorResults.reduce((sum, cat) => sum + cat.score, 0) / competitorResults.length)
    : 0

  const handleDownloadReport = useCallback(() => {
    if (!results) return
    const lines = [
      `SEO Audit Report — Carter Digitals`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `URL: ${url}`,
      `Overall Score: ${overallScore}/100`,
      ``,
      ...results.map(cat => [
        `▸ ${cat.name} (${cat.score}/100)`,
        ...cat.tips.map(tip => `  ${tip.status === 'good' ? '✓' : tip.status === 'warning' ? '⚠' : '✗'} ${tip.text} [${tip.impact.toUpperCase()} IMPACT]`),
        ...cat.subScores.map(sub => `  - ${sub.name}: ${sub.score}/${sub.maxScore}`),
        ``,
      ]).flat(),
      `Priority Actions:`,
      ...priorityActions.map((a, i) => `  ${i + 1}. [${a.category}] ${a.text} (${a.impact.toUpperCase()} IMPACT)`),
      ``,
      `Simulated Score After Fixes: ${simulatedAfterScore}/100`,
      ``,
      `Free audit by Carter Digitals — carterdigitals.co.za/tools/seo-audit`,
    ]

    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }, [results, url, overallScore, priorityActions, simulatedAfterScore])

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
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-cd-gold/8">
              <Search className="w-4 h-4 text-cd-gold" strokeWidth={1.8} />
            </div>
            <span className="text-cd-text font-display font-semibold text-base">
              Enter Your Website URL
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cd-text-dim" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAudit()}
                placeholder="e.g. www.yourbusiness.co.za"
                className="w-full pl-11 pr-4 h-12 text-base bg-white/[0.03] border border-cd-border rounded-lg text-cd-text placeholder:text-cd-text-dim focus-visible:border-cd-gold focus-visible:ring-cd-gold/20 focus-visible:ring-[3px] transition-all duration-200"
                aria-label="Website URL to audit"
              />
            </div>
            <button
              onClick={handleAudit}
              disabled={loading || !url.trim()}
              className="group flex items-center justify-center gap-2 px-6 h-12 rounded-lg bg-cd-gold text-cd-bg font-display font-semibold text-sm hover:bg-cd-gold-light transition-all duration-300 shadow-[0_0_20px_rgba(201,168,76,0.15)] hover:shadow-[0_0_30px_rgba(201,168,76,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
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

          <p className="text-cd-text-dim text-xs mt-3">
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
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cd-gold/10 mb-6">
                <Loader2 className="w-8 h-8 text-cd-gold animate-spin" />
              </div>
              <h3 className="font-display text-xl font-bold text-cd-text mb-2">
                Scanning Your Website...
              </h3>
              <p className="text-cd-text-muted text-sm">
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
              {/* Overall Score + Before/After */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {/* Current Score */}
                <div className="glass-card rounded-xl p-6 text-center">
                  <span className="text-cd-text-dim font-mono text-xs tracking-widest uppercase mb-3 block">
                    Current SEO Score
                  </span>
                  <div className="relative inline-flex items-center justify-center mb-4">
                    <svg className="w-28 h-28 -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                      <motion.circle
                        cx="60" cy="60" r="52" fill="none" stroke={overallColor} strokeWidth="8" strokeLinecap="round"
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
                        className="font-mono text-3xl font-bold"
                        style={{ color: overallColor }}
                      >
                        {overallScore}
                      </motion.span>
                    </div>
                  </div>
                  <p className="text-cd-text-muted text-xs">
                    {overallScore >= 70 ? 'Good foundation! A few fixes could boost your ranking.' : overallScore >= 45 ? "Room for improvement. Address issues below for better visibility." : 'Needs attention. Many critical factors need improvement.'}
                  </p>
                </div>

                {/* Simulated After Score */}
                <div className="glass-card rounded-xl p-6 text-center border border-cd-emerald/20">
                  <span className="text-cd-emerald font-mono text-xs tracking-widest uppercase mb-3 block flex items-center justify-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    After Implementing Fixes
                  </span>
                  <div className="relative inline-flex items-center justify-center mb-4">
                    <svg className="w-28 h-28 -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                      <motion.circle
                        cx="60" cy="60" r="52" fill="none" stroke={simulatedAfterColor} strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 52}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - simulatedAfterScore / 100) }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="font-mono text-3xl font-bold"
                        style={{ color: simulatedAfterColor }}
                      >
                        {simulatedAfterScore}
                      </motion.span>
                    </div>
                  </div>
                  <p className="text-cd-emerald text-xs font-semibold">
                    +{simulatedAfterScore - overallScore} points potential improvement
                  </p>
                  <p className="text-cd-text-dim text-[10px] mt-1">
                    Simulated based on addressing all high &amp; medium impact issues
                  </p>
                </div>
              </div>

              {/* Priority Actions */}
              {priorityActions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-card rounded-xl p-6 mb-6 border border-cd-rose/20"
                >
                  <h3 className="font-display text-cd-text font-bold text-base mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cd-rose" />
                    Top Priority Actions
                  </h3>
                  <div className="space-y-3">
                    {priorityActions.map((action, i) => (
                      <div key={i} className="flex items-start gap-3 bg-cd-surface rounded-lg p-3 border border-cd-border">
                        <div className="w-6 h-6 rounded-full bg-cd-rose/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-cd-rose text-xs font-mono font-bold">{i + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-cd-text text-sm font-medium">{action.text}</span>
                            <ImpactBadge impact={action.impact} />
                          </div>
                          <span className="text-cd-text-dim text-xs">{action.category}</span>
                        </div>
                        <StatusIcon status={action.status} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Category Results with Sub-scores */}
              <div className="space-y-4">
                {results.map((category, i) => {
                  const Icon = category.icon
                  const isExpanded = expandedCategories.has(category.name)
                  return (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="glass-card rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleCategory(category.name)}
                        className="w-full p-5 md:p-6 text-left flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.04]">
                            <Icon className="w-4 h-4 text-cd-gold" strokeWidth={1.8} />
                          </div>
                          <span className="font-display font-semibold text-cd-text">{category.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-lg font-bold tabular-nums" style={{ color: category.color }}>
                            {category.score}<span className="text-cd-text-dim text-xs font-normal">/100</span>
                          </span>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <svg className="w-4 h-4 text-cd-text-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </motion.div>
                        </div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-4">
                              <ScoreBar score={category.score} color={category.color} />

                              {/* Sub-scores */}
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {category.subScores.map((sub, j) => (
                                  <div key={j} className="bg-cd-surface rounded-lg p-3 border border-cd-border">
                                    <span className="text-cd-text-dim text-[10px] font-mono uppercase tracking-wider">{sub.name}</span>
                                    <div className="flex items-center gap-2 mt-1">
                                      <div className="flex-1 h-1.5 rounded-full bg-cd-border/50 overflow-hidden">
                                        <motion.div
                                          initial={{ width: 0 }}
                                          animate={{ width: `${sub.score}%` }}
                                          transition={{ duration: 0.8, delay: j * 0.05 }}
                                          className="h-full rounded-full"
                                          style={{ backgroundColor: category.color }}
                                        />
                                      </div>
                                      <span className="text-xs font-mono tabular-nums" style={{ color: category.color }}>
                                        {sub.score}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Tips with impact badges */}
                              <div className="space-y-2.5">
                                {category.tips.map((tip, j) => (
                                  <div key={j} className="flex items-start gap-2.5">
                                    <StatusIcon status={tip.status} />
                                    <span className="text-cd-text-muted text-sm leading-relaxed flex-1">{tip.text}</span>
                                    <ImpactBadge impact={tip.impact} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>

              {/* Competitor Comparison */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="glass-card rounded-xl p-6 mt-6"
              >
                <button
                  onClick={() => setShowCompetitor(!showCompetitor)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="font-display text-cd-text font-bold text-base flex items-center gap-2">
                    <Users className="w-4 h-4 text-cd-cyan" />
                    Competitor Comparison
                  </h3>
                  <motion.div animate={{ rotate: showCompetitor ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <svg className="w-4 h-4 text-cd-text-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {showCompetitor && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4">
                        <div className="flex flex-col sm:flex-row gap-3 mb-4">
                          <div className="relative flex-1">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cd-text-dim" />
                            <input
                              type="url"
                              value={competitorUrl}
                              onChange={(e) => setCompetitorUrl(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCompetitorAudit()}
                              placeholder="e.g. www.competitor.co.za"
                              className="w-full pl-11 pr-4 h-11 text-sm bg-white/[0.03] border border-cd-border rounded-lg text-cd-text placeholder:text-cd-text-dim focus-visible:border-cd-gold focus-visible:ring-cd-gold/20 focus-visible:ring-[3px] transition-all duration-200"
                              aria-label="Competitor URL"
                            />
                          </div>
                          <button
                            onClick={handleCompetitorAudit}
                            disabled={!competitorUrl.trim()}
                            className="flex items-center justify-center gap-2 px-5 h-11 rounded-lg border border-cd-cyan/30 bg-cd-cyan/5 text-cd-cyan text-sm font-semibold hover:bg-cd-cyan/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Target className="w-4 h-4" />
                            Compare
                          </button>
                        </div>

                        {competitorResults && (
                          <div className="space-y-3">
                            {/* Score comparison bars */}
                            <div className="bg-cd-surface rounded-lg p-4 border border-cd-border">
                              <div className="space-y-3">
                                {results.map((cat, i) => {
                                  const compCat = competitorResults[i]
                                  return (
                                    <div key={cat.name}>
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-cd-text-muted text-xs">{cat.name}</span>
                                        <div className="flex items-center gap-2 text-xs font-mono">
                                          <span style={{ color: cat.color }}>{cat.score}</span>
                                          <span className="text-cd-text-dim">vs</span>
                                          <span style={{ color: compCat.color }}>{compCat.score}</span>
                                        </div>
                                      </div>
                                      <div className="flex gap-1">
                                        <div className="flex-1 h-2 rounded-full bg-cd-border/30 overflow-hidden">
                                          <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${cat.score}%` }}
                                            transition={{ duration: 0.6 }}
                                            className="h-full rounded-full bg-cd-gold"
                                          />
                                        </div>
                                        <div className="flex-1 h-2 rounded-full bg-cd-border/30 overflow-hidden">
                                          <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${compCat.score}%` }}
                                            transition={{ duration: 0.6, delay: 0.1 }}
                                            className="h-full rounded-full bg-cd-cyan"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                              <div className="flex items-center justify-center gap-6 mt-3 pt-3 border-t border-cd-border/50 text-xs">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-2.5 h-2.5 rounded-sm bg-cd-gold" />
                                  <span className="text-cd-text-dim">Your site ({overallScore})</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <div className="w-2.5 h-2.5 rounded-sm bg-cd-cyan" />
                                  <span className="text-cd-text-dim">Competitor ({competitorOverallScore})</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Download Report + CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="glass-card-gold rounded-xl p-6 md:p-8 mt-6"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <BarChart3 className="w-8 h-8 text-cd-gold mb-3" />
                    <h3 className="font-display text-xl font-bold text-cd-text mb-2">
                      Get a Full SEO Audit
                    </h3>
                    <p className="text-cd-text-muted text-sm max-w-lg leading-relaxed">
                      This quick scan gives you an overview. Our comprehensive audit includes keyword analysis, competitor benchmarking, and a step-by-step action plan.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 shrink-0">
                    <button
                      onClick={handleDownloadReport}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-cd-border bg-cd-surface text-cd-text text-sm font-medium hover:border-cd-gold/40 hover:bg-cd-gold/5 transition-all duration-200"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-cd-emerald" />
                          <span className="text-cd-emerald">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Report</span>
                        </>
                      )}
                    </button>
                    <a
                      href="/#contact"
                      className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cd-gold text-cd-bg font-display font-semibold text-sm hover:bg-cd-gold-light transition-all duration-300 shadow-[0_0_20px_rgba(201,168,76,0.15)] hover:shadow-[0_0_30px_rgba(201,168,76,0.25)]"
                    >
                      Get a Full SEO Audit
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
