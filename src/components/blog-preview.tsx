'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'

const posts = [
  {
    category: 'Pricing',
    title: 'How Much Does a Website Cost in Pretoria in 2026?',
    excerpt:
      'A complete breakdown of web design pricing in Pretoria and Tshwane — from starter sites to enterprise platforms.',
    readTime: '5 min read',
    cta: 'Read →',
  },
  {
    category: 'B-BBEE',
    title: 'What is a B-BBEE Level 1 Web Design Agency — and Why It Matters',
    excerpt:
      'Understanding how procuring from a Level 1 supplier benefits your B-BBEE scorecard and procurement targets.',
    readTime: '6 min read',
    cta: 'Read →',
  },
  {
    category: 'Tech',
    title: 'WordPress vs Next.js: The Honest Answer for South African SMEs',
    excerpt:
      "We've built on both. Here's the real comparison — no bias, no fluff, just what works for businesses like yours.",
    readTime: '7 min read',
    cta: 'Read →',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export default function BlogPreview() {
  return (
    <section id="blog" className="py-20 md:py-28 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-[var(--cd-gold)]" />
            <span className="text-[var(--cd-gold)] font-mono text-sm tracking-widest uppercase">
              Blog
            </span>
          </div>
          <h2 className="font-display text-[var(--text-h2)] text-[var(--cd-text)] font-bold leading-tight mb-3">
            Latest Insights
          </h2>
          <p className="text-[var(--cd-text-muted)] text-lg">
            What we&apos;ve learned building for South African businesses.
          </p>
        </motion.div>

        {/* Blog Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {posts.map((post) => (
            <motion.article
              key={post.title}
              variants={cardVariants}
              className="group glass-card rounded-xl p-6 flex flex-col border-l-2 border-l-cd-gold/30 transition-[border-color,box-shadow,transform] duration-300 hover:border-[#3A3A3A] hover:border-l-cd-gold hover:rotate-1 hover:shadow-[0_0_20px_rgba(201,168,76,0.06)]"
            >
              {/* Category Badge */}
              <span className="inline-flex self-start items-center rounded-md bg-[var(--cd-gold-bg)] border border-[var(--cd-gold-dim)] text-[var(--cd-gold-dim)] font-mono text-[11px] tracking-wider px-2.5 py-1 mb-4">
                {post.category}
              </span>

              {/* Title */}
              <h3 className="font-display text-[var(--cd-text)] font-semibold text-lg leading-snug mb-3 group-hover:text-[var(--cd-gold-light)] transition-colors duration-300">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-[var(--cd-text-muted)] text-sm leading-relaxed mb-5 flex-1">
                {post.excerpt}
              </p>

              {/* Footer: read time + CTA */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1.5 text-[var(--cd-text-dim)] text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-[var(--cd-gold)] text-sm font-medium group-hover:gap-2.5 transition-all duration-300"
                >
                  {post.cta}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
