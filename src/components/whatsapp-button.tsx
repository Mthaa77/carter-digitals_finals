'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <a
        href="https://wa.me/27724026893?text=Hi%20Carter%20Digitals%2C%20I%27d%20like%20to%20discuss%20a%20project"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative block"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full whatsapp-pulse" />

        {/* Button */}
        <motion.span
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/20"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <MessageCircle className="w-6 h-6 text-white" fill="white" strokeWidth={0} />
        </motion.span>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, x: 8, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.9 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap rounded-lg bg-[#1A1A1A] border border-[#242424] px-3 py-1.5 text-xs font-sans text-[#F0EFE8] shadow-xl pointer-events-none"
            >
              Chat on WhatsApp
              {/* Tooltip arrow */}
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-4 border-transparent border-l-[#1A1A1A]" />
            </motion.span>
          )}
        </AnimatePresence>
      </a>
    </div>
  )
}
