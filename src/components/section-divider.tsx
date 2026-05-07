'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className = '' }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className={`w-full py-2 ${className}`}>
      {/* Secondary thin line above */}
      <div className="flex items-center px-4 sm:px-6 lg:px-8 mb-1.5">
        <motion.div
          initial={{ opacity: 0, scaleX: 0.2 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.2 }}
          transition={{ duration: 1.0, ease: 'easeOut', delay: 0.1 }}
          className="flex-1 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(251,113,133,0.15), rgba(167,139,250,0.12), transparent)',
          }}
        />
      </div>

      {/* Main divider line */}
      <div className="flex items-center px-4 sm:px-6 lg:px-8 relative">
        {/* Left line with shimmer */}
        <div className="flex-1 relative h-px overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scaleX: 0.3 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), rgba(34,211,238,0.25))',
            }}
          />
          {/* Animated shimmer overlay */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={isInView ? { x: '200%' } : { x: '-100%' }}
            transition={{ duration: 3, ease: 'easeInOut', delay: 1.2, repeat: Infinity, repeatDelay: 5 }}
            className="absolute inset-0 w-1/3"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)',
            }}
          />
        </div>

        {/* Center diamond — larger with pulsing glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          className="mx-3 relative shrink-0"
        >
          {/* Pulsing glow ring behind diamond */}
          <motion.div
            animate={isInView ? {
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.4, 1],
            } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-[-6px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(201,168,76,0.25) 0%, rgba(34,211,238,0.1) 50%, transparent 70%)',
            }}
          />
          {/* Diamond shape */}
          <div
            className="w-3.5 h-3.5 rotate-45 relative"
            style={{
              background: 'linear-gradient(135deg, #C9A84C, #22D3EE, #A78BFA)',
              boxShadow: '0 0 12px rgba(201,168,76,0.3), 0 0 24px rgba(34,211,238,0.15), 0 0 8px rgba(167,139,250,0.1)',
            }}
          />
        </motion.div>

        {/* Right line with shimmer */}
        <div className="flex-1 relative h-px overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scaleX: 0.3 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, rgba(34,211,238,0.25), rgba(167,139,250,0.2), transparent)',
            }}
          />
          {/* Animated shimmer overlay */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={isInView ? { x: '200%' } : { x: '-100%' }}
            transition={{ duration: 3, ease: 'easeInOut', delay: 1.5, repeat: Infinity, repeatDelay: 5 }}
            className="absolute inset-0 w-1/3"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.25), transparent)',
            }}
          />
        </div>
      </div>

      {/* Secondary thin line below */}
      <div className="flex items-center px-4 sm:px-6 lg:px-8 mt-1.5">
        <motion.div
          initial={{ opacity: 0, scaleX: 0.2 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.2 }}
          transition={{ duration: 1.0, ease: 'easeOut', delay: 0.2 }}
          className="flex-1 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.12), rgba(201,168,76,0.15), transparent)',
          }}
        />
      </div>
    </div>
  );
}
