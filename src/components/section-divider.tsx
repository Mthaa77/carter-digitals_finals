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
    <div ref={ref} className={`w-full flex items-center px-4 sm:px-6 lg:px-8 ${className}`}>
      <motion.div
        initial={{ opacity: 0, scaleX: 0.3 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex-1 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(122, 99, 48, 0.4), rgba(34, 211, 238, 0.2))',
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
        className="mx-3 w-2 h-2 rotate-45 shrink-0"
        style={{
          background: 'linear-gradient(135deg, #C9A84C, #22D3EE)',
          boxShadow: '0 0 8px rgba(201, 168, 76, 0.2), 0 0 16px rgba(34, 211, 238, 0.1)',
        }}
      />
      <motion.div
        initial={{ opacity: 0, scaleX: 0.3 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex-1 h-px"
        style={{
          background: 'linear-gradient(90deg, rgba(34, 211, 238, 0.2), rgba(167, 139, 250, 0.15), transparent)',
        }}
      />
    </div>
  );
}
