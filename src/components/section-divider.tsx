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
    <div ref={ref} className={`w-full ${className}`}>
      <motion.div
        initial={{ opacity: 0, scaleX: 0.3 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mx-auto h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(122, 99, 48, 0.4), transparent)',
        }}
      />
    </div>
  );
}
