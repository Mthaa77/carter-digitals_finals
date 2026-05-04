'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 left-6 z-[9998] flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-colors duration-200"
          style={{
            backgroundColor: '#C9A84C',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#E8CA7A';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#C9A84C';
          }}
        >
          <ArrowUp className="h-5 w-5" style={{ color: '#080808' }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
