'use client'

import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

export default function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const [isActive, setIsActive] = useState(false)

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current || !isDragging.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPos(percent)
    },
    []
  )

  const handleMouseDown = useCallback(() => {
    isDragging.current = true
    setIsActive(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
    setIsActive(false)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      handleMove(e.clientX)
    },
    [handleMove]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX)
    },
    [handleMove]
  )

  return (
    <section id="showcase" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="section-label inline-block">Before &amp; After</span>
          <h2 className="section-heading section-heading-bar text-[var(--text-h2)]">
            See the <span className="gold-gradient-text">Difference</span>
          </h2>
          <p className="mt-4 text-cd-text-muted text-lg max-w-md mx-auto font-sans">
            From invisible to irresistible
          </p>
        </motion.div>

        {/* Comparison Slider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-3xl mx-auto"
        >
          <div
            ref={containerRef}
            className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-cd-border select-none cursor-col-resize"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            {/* BEFORE (full width, revealed by clip) */}
            <div className="absolute inset-0">
              {/* "Before" placeholder: drab gray */}
              <div className="absolute inset-0 bg-[#2A2A2A]">
                {/* Messy layout indication */}
                <div className="absolute inset-4 sm:inset-6 flex flex-col gap-3">
                  {/* Fake header */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#3A3A3A]" />
                    <div className="flex-1 h-3 rounded bg-[#3A3A3A]" />
                    <div className="w-16 h-6 rounded bg-[#444]" />
                  </div>
                  {/* Fake hero area */}
                  <div className="flex-1 flex flex-col items-center justify-center gap-2 -mt-4">
                    <div className="w-48 sm:w-64 h-4 rounded bg-[#3A3A3A]" />
                    <div className="w-32 sm:w-44 h-4 rounded bg-[#3A3A3A]" />
                    <div className="w-24 h-8 rounded bg-[#555] mt-2" />
                  </div>
                  {/* Fake content blocks */}
                  <div className="flex gap-2">
                    <div className="flex-1 h-16 rounded bg-[#3A3A3A]" />
                    <div className="flex-1 h-16 rounded bg-[#3A3A3A]" />
                    <div className="flex-1 h-16 rounded bg-[#3A3A3A]" />
                  </div>
                  {/* Fake footer */}
                  <div className="flex gap-2">
                    <div className="w-16 h-2 rounded bg-[#3A3A3A]" />
                    <div className="w-20 h-2 rounded bg-[#3A3A3A]" />
                    <div className="w-14 h-2 rounded bg-[#3A3A3A]" />
                  </div>
                </div>
              </div>
              {/* "Before" label */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-md bg-[#2A2A2A]/90 border border-[#444] text-[#888] text-xs font-mono uppercase tracking-wider">
                Old Website
              </div>
            </div>

            {/* AFTER (overlaid, clipped from left) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              {/* "After" placeholder: sleek dark + gold */}
              <div className="absolute inset-0 bg-[#080808]">
                {/* Sleek layout */}
                <div className="absolute inset-4 sm:inset-6 flex flex-col gap-3">
                  {/* Clean header with gold accent */}
                  <div className="flex items-center gap-3 border-b border-cd-border pb-3">
                    <div className="w-8 h-8 rounded bg-cd-gold/20 border border-cd-gold/30 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-sm bg-cd-gold/60" />
                    </div>
                    <div className="flex-1" />
                    <div className="flex gap-3">
                      <div className="w-10 h-2 rounded bg-cd-text/20" />
                      <div className="w-10 h-2 rounded bg-cd-text/20" />
                      <div className="w-10 h-2 rounded bg-cd-text/20" />
                    </div>
                    <div className="px-3 py-1 rounded bg-cd-gold/20 text-[10px] font-mono text-cd-gold">
                      CTA
                    </div>
                  </div>
                  {/* Hero with gold gradient */}
                  <div className="flex-1 flex flex-col items-center justify-center -mt-4">
                    <div className="w-40 sm:w-56 h-4 rounded bg-cd-gold/25" />
                    <div className="w-28 sm:w-36 h-3 rounded bg-cd-text/15 mt-2" />
                    <div className="px-5 py-1.5 rounded bg-cd-gold text-[10px] font-mono font-bold text-cd-bg mt-3">
                      Get Started
                    </div>
                  </div>
                  {/* Clean cards with gold borders */}
                  <div className="flex gap-2">
                    <div className="flex-1 h-16 rounded border border-cd-gold/20 bg-cd-surface/50 p-2">
                      <div className="w-6 h-1.5 rounded bg-cd-gold/30" />
                      <div className="w-12 h-1 rounded bg-cd-text/10 mt-1.5" />
                    </div>
                    <div className="flex-1 h-16 rounded border border-cd-gold/20 bg-cd-surface/50 p-2">
                      <div className="w-6 h-1.5 rounded bg-cd-gold/30" />
                      <div className="w-12 h-1 rounded bg-cd-text/10 mt-1.5" />
                    </div>
                    <div className="flex-1 h-16 rounded border border-cd-gold/20 bg-cd-surface/50 p-2">
                      <div className="w-6 h-1.5 rounded bg-cd-gold/30" />
                      <div className="w-12 h-1 rounded bg-cd-text/10 mt-1.5" />
                    </div>
                  </div>
                </div>
                {/* Subtle gold gradient glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse at 30% 40%, rgba(201,168,76,0.08) 0%, transparent 50%)',
                  }}
                />
              </div>
              {/* "After" label */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-md bg-[#080808]/90 border border-cd-gold/30 text-cd-gold text-xs font-mono uppercase tracking-wider">
                Carter Digitals Redesign
              </div>
            </div>

            {/* Slider Divider */}
            <div
              className="absolute top-0 bottom-0 z-10"
              style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
              {/* Gold vertical line */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-cd-gold/60" />

              {/* Drag handle */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-cd-gold bg-cd-bg/90 backdrop-blur-sm flex items-center justify-center cursor-col-resize touch-none shadow-lg shadow-cd-gold/20 transition-shadow duration-300 ${isActive ? 'shadow-[0_0_20px_rgba(201,168,76,0.4)]' : 'drag-handle-idle'}`}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                role="slider"
                aria-label="Drag to compare before and after"
                aria-valuenow={Math.round(sliderPos)}
                aria-valuemin={0}
                aria-valuemax={100}
                tabIndex={0}
              >
                {/* Arrows */}
                <div className="flex items-center gap-1">
                  <svg
                    className="w-3 h-3 text-cd-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <svg
                    className="w-3 h-3 text-cd-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Instruction */}
          <p className="text-center text-cd-text-dim text-xs font-sans mt-3">
            Drag the slider to compare before &amp; after
          </p>
        </motion.div>
      </div>
    </section>
  )
}
