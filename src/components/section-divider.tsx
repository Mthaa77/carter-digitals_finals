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
    <div ref={ref} className={`w-full flex items-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, scaleX: 0.3 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex-1 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(122, 99, 48, 0.4))',
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
        className="mx-2 w-2 h-2 rotate-45 bg-[#C9A84C] shrink-0"
      />
      <motion.div
        initial={{ opacity: 0, scaleX: 0.3 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex-1 h-px"
        style={{
          background:
            'linear-gradient(90deg, rgba(122, 99, 48, 0.4), transparent)',
        }}
      />
    </div>
  );
}
