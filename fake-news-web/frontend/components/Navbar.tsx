'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Technology', href: '#about' },
  { label: 'API Docs',   href: '#'      },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  // Track scroll state for backdrop blur toggle
  useEffect(() => {
    return scrollY.on('change', (latest) => setScrolled(latest > 60));
  }, [scrollY]);

  const bgOpacity     = useTransform(scrollY, [0, 80], [0,    0.9]);
  const borderOpacity = useTransform(scrollY, [40, 80], [0,   1  ]);

  const scrollTo = (href: string) => {
    if (href.startsWith('#') && href.length > 1) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className="fixed top-0 z-40"
      style={{
        // Sits beside the sidebar on desktop; full-width on mobile
        left:    'var(--sidebar-w, 0)',
        right:   0,
        backdropFilter:         scrolled ? 'blur(18px)' : 'none',
        WebkitBackdropFilter:   scrolled ? 'blur(18px)' : 'none',
        transition: 'backdrop-filter 0.3s ease, -webkit-backdrop-filter 0.3s ease',
      }}
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Scroll-triggered background fill */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'var(--hero-bg)', opacity: bgOpacity }}
      />

      {/* Scroll-triggered bottom border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'var(--hero-border)',
          opacity: borderOpacity,
        }}
      />

      <div className="relative flex items-center justify-between px-12 py-5">

        {/* Section context label — replaces a duplicate logo */}
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.55 }}
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.6rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:         'var(--hero-dateline)',
          }}
        >
          §01 — Analysis
        </motion.span>

        {/* Nav links with animated underline */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={link.label}
              label={link.label}
              delay={0.25 + i * 0.07}
              onClick={() => scrollTo(link.href)}
            />
          ))}
        </nav>

        {/* Right cluster — theme toggle + CTA */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45, duration: 0.55 }}
        >
          <ThemeToggle />

          <motion.button
            onClick={() => scrollTo('#detector')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.62rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         'var(--hero-btn-fg)',
              background:    'var(--hero-btn-bg)',
              padding:       '9px 20px',
              border:        'none',
              cursor:        'pointer',
              transition:    'opacity 0.15s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            Analyze →
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  );
}

/* ─── Animated underline nav link ────────────────────────────────────────── */
function NavLink({
  label,
  delay,
  onClick,
}: {
  label: string;
  delay: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position:      'relative',
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.65rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color:         hovered ? 'var(--hero-text)' : 'var(--hero-dateline)',
        background:    'none',
        border:        'none',
        cursor:        'pointer',
        padding:       '4px 0',
        transition:    'color 0.18s ease',
      }}
    >
      {label}

      {/* Sliding underline */}
      <motion.span
        style={{
          position:   'absolute',
          bottom:     '-1px',
          left:       0,
          height:     '1px',
          background: 'var(--hero-text)',
        }}
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.button>
  );
}