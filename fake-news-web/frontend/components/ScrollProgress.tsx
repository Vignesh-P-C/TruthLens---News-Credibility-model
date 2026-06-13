'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress
 * Drop into layout.tsx. A 2px warm amber line at the very top of the viewport
 * that fills as the user scrolls down. Spring-damped so it doesn't snap.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        // Warm amber gradient matching the editorial accent colour
        background: 'linear-gradient(90deg, var(--accent, #c8b89a), #c8a06a)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 99999,
      }}
    />
  );
}