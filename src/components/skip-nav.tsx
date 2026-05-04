'use client'

export default function SkipNav() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-cd-gold focus:text-cd-bg focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:outline-none focus:shadow-lg focus:shadow-cd-gold/30"
    >
      Skip to main content
    </a>
  )
}
