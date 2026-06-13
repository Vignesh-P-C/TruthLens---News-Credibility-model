'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Twitter, Github } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { label: 'Analysis',   href: '#detector', sectionId: 'detector'  },
  { label: 'Technology', href: '#about',    sectionId: 'about'     },
];

const SOCIAL_LINKS = [
  { icon: Twitter, href: 'https://twitter.com',            label: 'Twitter' },
  { icon: Github,  href: 'https://github.com/Vignesh-P-C', label: 'GitHub'  },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('Analysis');
  const [mounted,    setMounted]    = useState(false);

  // Trigger entrance animation after mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // ── Scroll-spy: auto-highlight active section ─────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const item = NAV_ITEMS.find((n) => n.sectionId === entry.target.id);
            if (item) setActiveItem(item.label);
          }
        });
      },
      // Fire when section reaches 30% visible; rootMargin pulls threshold up the screen
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );

    NAV_ITEMS.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    if (href.startsWith('#') && href.length > 1) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ── Desktop Sidebar ─────────────────────────────────── */}
      <motion.aside
        className="hidden md:flex flex-col fixed top-0 left-0 h-screen z-50"
        style={{
          width:        '260px',
          background:   'var(--sidebar-bg)',
          borderRight:  '1px solid var(--sidebar-border)',
        }}
        initial={{ x: -30, opacity: 0 }}
        animate={mounted ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ── Logo block ──────────────────────────────────────── */}
        <motion.div
          className="px-8 py-8"
          style={{ borderBottom: '1px solid var(--sidebar-border)' }}
          initial={{ opacity: 0, y: -8 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <motion.svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.2 }}
          >
            <rect width="36" height="36" fill="#f5f0e8" />
            <rect x="6"  y="6"  width="10" height="24" fill="var(--sidebar-bg)" />
            <rect x="20" y="6"  width="10" height="10" fill="var(--sidebar-bg)" />
            <rect x="20" y="22" width="10" height="8"  fill="var(--sidebar-bg)" />
          </motion.svg>

          <div className="mt-4">
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize:   '1.2rem',
                letterSpacing: '-0.01em',
                lineHeight: 1,
                color:      '#f5f0e8',
              }}
            >
              Truth
              <em style={{ fontStyle: 'italic', color: '#c8a06a' }}>Lens</em>
            </div>
            <div
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.58rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color:         'var(--sidebar-muted)',
                marginTop:     '6px',
              }}
            >
              News Analysis Engine
            </div>
          </div>
        </motion.div>

        {/* ── Nav links ────────────────────────────────────────── */}
        <nav className="flex-1 flex flex-col" style={{ paddingTop: '8px' }}>
          {NAV_ITEMS.map((item, i) => {
            const isActive = activeItem === item.label;
            return (
              <motion.button
                key={item.label}
                onClick={() => {
                  setActiveItem(item.label);
                  scrollTo(item.href);
                }}
                className="relative text-left w-full overflow-hidden"
                style={{
                  display:       'flex',
                  alignItems:    'center',
                  padding:       '13px 32px',
                  paddingLeft:   isActive ? '30px' : '32px',
                  borderLeft:    isActive
                    ? '2px solid #c8a06a'
                    : '2px solid transparent',
                  borderBottom:  '1px solid var(--sidebar-nav-border)',
                  color:         isActive ? '#f5f0e8' : 'rgba(240,230,210,0.4)',
                  fontFamily:    'var(--font-body)',
                  fontWeight:    isActive ? 400 : 300,
                  fontSize:      '0.95rem',
                  letterSpacing: '0.01em',
                  cursor:        'pointer',
                  transition:    'color 0.2s, padding-left 0.2s, border-left-color 0.2s',
                  background:    'transparent',
                }}
                whileHover={{
                  color: '#f5f0e8',
                  transition: { duration: 0.15 },
                }}
                initial={{ opacity: 0, x: -14 }}
                animate={mounted ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.45 }}
              >
                {/* Sliding background highlight — layoutId animates between items */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active-bg"
                      className="absolute inset-0"
                      style={{ background: 'rgba(200,160,106,0.07)' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }}
                    />
                  )}
                </AnimatePresence>

                {/* Active dot */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        display:      'inline-block',
                        width:        '4px',
                        height:       '4px',
                        borderRadius: '50%',
                        background:   '#c8a06a',
                        marginRight:  '10px',
                        flexShrink:   0,
                        position:     'relative',
                        zIndex:       1,
                      }}
                    />
                  )}
                </AnimatePresence>

                <span style={{ position: 'relative', zIndex: 1 }}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}

          {/* Tech stack */}
          <motion.div
            style={{
              padding:      '20px 32px',
              borderBottom: '1px solid var(--sidebar-nav-border)',
              marginTop:    '8px',
            }}
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <div
              style={{
                width:        '24px',
                height:       '1px',
                background:   'var(--sidebar-border)',
                marginBottom: '12px',
              }}
            />
            <p
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.56rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color:         'var(--sidebar-stack)',
                lineHeight:    2,
              }}
            >
              DistilBERT · FastAPI
              <br />
              Next.js · Vercel · Render
            </p>
          </motion.div>
        </nav>

        {/* ── Bottom row — social + theme toggle ──────────────── */}
        <motion.div
          style={{
            padding:        '20px 32px',
            borderTop:      '1px solid var(--sidebar-border)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.45 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  color:   'rgba(240,230,210,0.3)',
                  display: 'flex',
                }}
                whileHover={{
                  color: 'rgba(240,230,210,0.85)',
                  scale: 1.2,
                  y: -2,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.18 }}
              >
                <Icon size={14} />
              </motion.a>
            ))}
          </div>
          <ThemeToggle forceDark />
        </motion.div>
      </motion.aside>

      {/* ── Mobile top bar ──────────────────────────────────── */}
      <motion.header
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background:   'var(--sidebar-bg)',
          borderBottom: '1px solid var(--sidebar-border)',
        }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize:   '1.1rem',
            color:      '#f5f0e8',
          }}
        >
          Truth
          <em style={{ fontStyle: 'italic', color: '#c8a06a' }}>Lens</em>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ThemeToggle forceDark />
          <motion.button
            onClick={() => scrollTo('#detector')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         '#f5f0e8',
              padding:       '8px 16px',
              border:        '1px solid rgba(240,230,210,0.25)',
              background:    'transparent',
              cursor:        'pointer',
              transition:    'border-color 0.15s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor =
                'rgba(240,230,210,0.6)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor =
                'rgba(240,230,210,0.25)')
            }
          >
            Analyze
          </motion.button>
        </div>
      </motion.header>
    </>
  );
}