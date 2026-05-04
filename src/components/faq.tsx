'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'How much does a website cost in Pretoria?',
    answer:
      'Our websites start from R7,950 for a 5-page starter site. Business sites with more features range from R14,500. Every project is scoped individually — no hidden fees.',
  },
  {
    question: 'What is B-BBEE Level 1 and why does it matter?',
    answer:
      "B-BBEE Level 1 means we're 100% Black-owned. When your company procures from us, you earn 135% of the spend value toward your own B-BBEE scorecard. It's a procurement win.",
  },
  {
    question: 'How long does it take to build a website?',
    answer:
      'Most sites are delivered in 2–3 weeks. Urgent projects can be turned around in 1 week with a rush fee. Complex dashboards take 4–6 weeks depending on scope.',
  },
  {
    question: 'Do you use WordPress?',
    answer:
      "No. We build on Next.js with Google Cloud Platform. It's faster, more secure, and built for the future — not limited by what a theme allows.",
  },
  {
    question: "What's included in the hosting?",
    answer:
      '3–6 months of free hosting depending on your package. After that, hosting is R350/month which includes security updates, backups, and uptime monitoring.',
  },
  {
    question: 'Can I make changes after launch?',
    answer:
      'Absolutely. We offer maintenance packages from R1,200/month, or you can request one-off updates anytime.',
  },
]

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="faq" className="relative py-20 sm:py-28 overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.03) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block text-cd-gold text-sm font-medium tracking-widest uppercase mb-4">
            FAQ
          </span>
          <div className="w-12 h-0.5 bg-cd-gold mx-auto mb-6" />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cd-text">
            Got <span className="gold-gradient-text">Questions?</span>
          </h2>
          <p className="mt-4 text-cd-text-muted text-lg max-w-xl mx-auto font-sans">
            Straight answers to the things our clients ask most.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl border-0 px-6 data-[state=open]:border-l-[3px] data-[state=open]:border-l-cd-gold data-[state=open]:bg-[rgba(201,168,76,0.04)] transition-all duration-300 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-display font-semibold text-cd-text hover:text-cd-gold hover:no-underline py-5 transition-colors duration-300 [&[data-state=open]>svg]:text-cd-gold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-cd-text-muted text-sm sm:text-base leading-relaxed font-sans pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
