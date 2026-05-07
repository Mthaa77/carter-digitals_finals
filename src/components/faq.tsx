'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
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
      'Our Vula package starts at R3,999 once-off for up to 4 pages. The Khula package is R7,999 for up to 8 pages with AI chatbot. Our premium Elevate package is R14,999 with full CMS. School packages start at R4,999. Every project is scoped individually — no hidden fees.',
  },
  {
    question: 'What is B-BBEE Level 1 and why does it matter?',
    answer:
      "B-BBEE Level 1 means we're 100% Black-owned. When your company procures from us, you earn 135% of the spend value toward your own B-BBEE scorecard. It's a procurement win.",
  },
  {
    question: 'How long does it take to build a website?',
    answer:
      'Production-ready websites are delivered in 5–7 business days. Complex web applications and dashboards take 2–4 weeks depending on scope. We move fast without cutting corners.',
  },
  {
    question: 'Do you use WordPress?',
    answer:
      "No. We build on Next.js with Google Cloud Platform. It's faster, more secure, and built for the future — not limited by what a theme allows.",
  },
  {
    question: "What's included in the hosting?",
    answer:
      'Year 1 hosting and domain is free with all website packages. After that, hosting management is R199/month or R1,990/year which includes security updates, backups, and uptime monitoring.',
  },
  {
    question: 'Can I make changes after launch?',
    answer:
      'Absolutely. Optional monthly retainers are available starting from R399/month (Vula), R799/month (Khula), or R1,199/month (Elevate). You can also request one-off updates anytime.',
  },
]

const faqBorderColors = [
  'linear-gradient(180deg, #C9A84C, rgba(201,168,76,0.3))',   // gold
  'linear-gradient(180deg, #34D399, rgba(52,211,153,0.3))',    // emerald
  'linear-gradient(180deg, #22D3EE, rgba(34,211,238,0.3))',    // cyan
  'linear-gradient(180deg, #A78BFA, rgba(167,139,250,0.3))',   // violet
  'linear-gradient(180deg, #FB7185, rgba(251,113,133,0.3))',   // rose
  'linear-gradient(180deg, #C9A84C, rgba(201,168,76,0.3))',    // gold (repeat)
]

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="faq" className="relative py-20 md:py-28 overflow-hidden" ref={ref}>
      {/* Aurora/mesh gradient background with emerald + violet + gold */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 40%, rgba(52,211,153,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(167,139,250,0.04) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, rgba(201,168,76,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.03) 0%, transparent 50%)',
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
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cd-text heading-shadow-lg">
            Got <span className="gold-gradient-text">Questions?</span>
          </h2>
          <p className="mt-4 text-cd-text-muted text-lg max-w-xl mx-auto font-sans">
            Straight answers to the things our clients ask most.
          </p>
        </motion.div>

        {/* Accordion with glass-card-gold container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card-gold glass-card rounded-2xl p-4 sm:p-6"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border-0 px-6 data-[state=open]:bg-[rgba(201,168,76,0.04)] transition-all duration-300 overflow-hidden relative"
                style={{
                  borderLeft: `3px solid transparent`,
                  backgroundClip: 'padding-box',
                }}
              >
                {/* Gradient left border — uses a wrapper approach */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
                  style={{
                    background: faqBorderColors[index % faqBorderColors.length],
                    opacity: 1,
                  }}
                />
                <AccordionTrigger className="text-left text-base sm:text-lg font-display font-semibold text-cd-text hover:text-cd-gold hover:no-underline py-5 transition-colors duration-300 [&[data-state=open]>.faq-chevron]:rotate-180 [&[data-state=open]>.faq-chevron]:text-cd-gold">
                  {faq.question}
                  <ChevronDown className="faq-chevron size-5 shrink-0 text-cd-text-dim transition-transform duration-300" />
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
