'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  Github, Linkedin, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { label: 'Analysis',   href: '#detector', sectionId: 'detector' },
  { label: 'Technology', href: '#about',    sectionId: 'about'    },
];

const SOCIAL_LINKS = [
  { icon: Github,  href: 'https://github.com/Vignesh-P-C',  label: 'GitHub'  },
  { icon: Linkedin,  href: 'https://linkedin.com/in/vignesh-p-c',  label: 'LinkedIn'  },
  { icon: Instagram,  href: 'https://www.instagram.com/justv1gnesh?igsh=cDYwOGJ5bzZkdWh4',  label: 'Instagram'  },  
];

/* ─── Tokens ─────────────────────────────────────────────────────────────── */
const CREAM        = '#f5f0e8';
const CREAM_STRONG = 'rgba(245,240,232,0.95)';
const CREAM_MID    = 'rgba(245,240,232,0.72)';
const CREAM_MUTED  = 'rgba(245,240,232,0.50)';
const CREAM_DIM    = 'rgba(245,240,232,0.14)';
const AMBER        = '#c8a06a';

const COLLAPSED_W = 68;   // px — narrow icon rail
const EXPANDED_W  = 260;  // px — full sidebar

/* ─── Logo SVG (reused in both states) ──────────────────────────────────── */
function LogoMark({ size = 44, onClick }: { size?: number; onClick?: () => void }) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 36 36" fill="none"
      style={{ flexShrink: 0, cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
      whileHover={{ scale: 1.07 }}
      transition={{ duration: 0.2 }}
    >
      <rect width="36" height="36" fill="#f5f0e8" />
      <rect x="6"  y="6"  width="10" height="24" fill="var(--sidebar-bg)" />
      <rect x="20" y="6"  width="10" height="10" fill="var(--sidebar-bg)" />
      <rect x="20" y="22" width="10" height="8"  fill="var(--sidebar-bg)" />
    </motion.svg>
  );
}

/* ─── Sidebar ────────────────────────────────────────────────────────────── */
export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('Analysis');
  const [mounted,    setMounted]    = useState(false);
  const [collapsed,  setCollapsed]  = useState(false);

  /* Entrance */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  /* Keep --sidebar-w in sync so .main-content margin tracks width */
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-w',
      collapsed ? `${COLLAPSED_W}px` : `${EXPANDED_W}px`
    );
    /* Inject transition once so the content area slides smoothly */
    if (!document.getElementById('__sidebar-t')) {
      const s    = document.createElement('style');
      s.id       = '__sidebar-t';
      s.textContent =
        `.main-content{transition:margin-left .4s cubic-bezier(.16,1,.3,1),width .4s cubic-bezier(.16,1,.3,1);}`;
      document.head.appendChild(s);
    }
  }, [collapsed]);

  /* Scroll-spy — auto-highlight active section */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const item = NAV_ITEMS.find((n) => n.sectionId === e.target.id);
            if (item) setActiveItem(item.label);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );
    NAV_ITEMS.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    if (href.startsWith('#') && href.length > 1)
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ─── Shared sidebar shell ─────────────────────────────────────────────── */
  return (
    <>
      <motion.aside
        className="hidden md:flex flex-col fixed top-0 left-0 h-screen z-50"
        style={{
          background:  'var(--sidebar-bg)',
          borderRight: `1px solid ${CREAM_DIM}`,
          overflow:    'hidden',
        }}
        /* Entrance: slide in from left */
        initial={{ x: -30, opacity: 0, width: EXPANDED_W }}
        animate={{
          x:      mounted ? 0 : -30,
          opacity: mounted ? 1 : 0,
          width:   collapsed ? COLLAPSED_W : EXPANDED_W,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="wait" initial={false}>

          {/* ════════════════════════════════════════════════════
              COLLAPSED STATE — narrow rail
              Just the logo mark + "TruthLens" written vertically
              + a ▶ expand button at the bottom
          ════════════════════════════════════════════════════ */}
          {collapsed && (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, delay: 0.1 }}
              style={{
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                height:         '100%',
                padding:        '28px 0 24px',
                gap:            0,
              }}
            >
              {/* Logo — click to expand */}
              <LogoMark size={40} onClick={() => { setCollapsed(false); scrollToHome(); }} />

              {/* Amber hairline */}
              <div
                style={{
                  width:      '22px',
                  height:     '1.5px',
                  background: AMBER,
                  opacity:    0.65,
                  margin:     '14px 0',
                }}
              />

              {/* "TruthLens" written vertically — fills remaining space */}
              <div
                style={{
                  flex:         1,
                  display:      'flex',
                  alignItems:   'center',
                  justifyContent: 'center',
                  /* CSS vertical text — flows top → bottom */
                  writingMode:  'vertical-lr',
                  fontFamily:   'var(--font-display)',
                  fontSize:     '1rem',
                  fontWeight:   400,
                  letterSpacing: '0.06em',
                  lineHeight:   1,
                  color:        CREAM,
                  userSelect:   'none',
                  cursor:       'pointer',
                }}
                onClick={() => setCollapsed(false)}
                title="Expand sidebar"
              >
                <span>Truth</span>
                <span style={{ fontStyle: 'italic', color: AMBER }}>Lens</span>
              </div>

              {/* Expand button */}
              <motion.button
                onClick={() => setCollapsed(false)}
                aria-label="Expand sidebar"
                style={{
                  width:          '38px',
                  height:         '38px',
                  borderRadius:   '8px',
                  border:         `1px solid ${CREAM_DIM}`,
                  background:     'transparent',
                  cursor:         'pointer',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  color:          CREAM_MUTED,
                  marginTop:      '8px',
                }}
                whileHover={{
                  background:   'rgba(245,240,232,0.08)',
                  borderColor:  CREAM_MID,
                  color:        CREAM,
                }}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.15 }}
              >
                <ChevronRight size={15} strokeWidth={2} />
              </motion.button>
            </motion.div>
          )}

          {/* ════════════════════════════════════════════════════
              EXPANDED STATE — full sidebar
          ════════════════════════════════════════════════════ */}
          {!collapsed && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, delay: 0.15 }}
              style={{
                display:       'flex',
                flexDirection: 'column',
                height:        '100%',
                width:         `${EXPANDED_W}px`,
              }}
            >
              {/* ── Logo block ──────────────────────────────── */}
              <motion.div
                style={{
                  padding:      '24px 28px 20px',
                  borderBottom: `1px solid ${CREAM_DIM}`,
                  display:      'flex',
                  alignItems:   'center',
                  gap:          '14px',
                }}
                initial={{ opacity: 0, y: -8 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                <LogoMark size={44} onClick={scrollToHome} />

                <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {/* Wordmark — 1.55rem, clear and bold */}
                  <div
                    style={{
                      fontFamily:    'var(--font-display)',
                      fontWeight:    400,
                      fontSize:      '1.55rem',
                      letterSpacing: '-0.01em',
                      lineHeight:    1,
                      color:         CREAM,
                    }}
                  >
                    Truth
                    <em style={{ fontStyle: 'italic', color: AMBER }}>Lens</em>
                  </div>

                  {/* Amber accent rule under the name */}
                  <div
                    style={{
                      width:      '32px',
                      height:     '1.5px',
                      background: AMBER,
                      margin:     '5px 0 4px',
                      opacity:    0.7,
                    }}
                  />

                  <div
                    style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.6rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color:         CREAM_MUTED,
                    }}
                  >
                    News Analysis Engine
                  </div>
                </div>
              </motion.div>

              {/* ── Nav links ───────────────────────────────── */}
              <nav
                style={{
                  flex:          1,
                  display:       'flex',
                  flexDirection: 'column',
                  paddingTop:    '8px',
                  overflow:      'hidden',
                }}
              >
                {NAV_ITEMS.map((item, i) => {
                  const isActive = activeItem === item.label;
                  return (
                    <motion.button
                      key={item.label}
                      onClick={() => { setActiveItem(item.label); scrollTo(item.href); }}
                      className="relative text-left w-full"
                      style={{
                        display:       'flex',
                        alignItems:    'center',
                        padding:       '13px 32px',
                        paddingLeft:   isActive ? '30px' : '32px',
                        borderLeft:    isActive ? `2px solid ${AMBER}` : '2px solid transparent',
                        borderBottom:  `1px solid ${CREAM_DIM}`,
                        color:         isActive ? CREAM_STRONG : CREAM_MID,
                        fontFamily:    'var(--font-body)',
                        fontWeight:    isActive ? 400 : 300,
                        fontSize:      '0.95rem',
                        letterSpacing: '0.01em',
                        cursor:        'pointer',
                        background:    isActive ? 'rgba(200,160,106,0.08)' : 'transparent',
                        transition:    'color 0.2s, background 0.2s',
                        whiteSpace:    'nowrap',
                      }}
                      whileHover={{
                        color:           CREAM,
                        backgroundColor: 'rgba(200,160,106,0.05)',
                      }}
                      initial={{ opacity: 0, x: -14 }}
                      animate={mounted ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.2 + i * 0.08, duration: 0.45 }}
                    >
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
                              background:   AMBER,
                              marginRight:  '10px',
                              flexShrink:   0,
                            }}
                          />
                        )}
                      </AnimatePresence>
                      {item.label}
                    </motion.button>
                  );
                })}

                {/* Tech stack */}
                <motion.div
                  style={{
                    padding:      '18px 32px',
                    borderBottom: `1px solid ${CREAM_DIM}`,
                    marginTop:    '8px',
                  }}
                  initial={{ opacity: 0 }}
                  animate={mounted ? { opacity: 1 } : {}}
                  transition={{ delay: 0.45, duration: 0.5 }}
                >
                  <div
                    style={{
                      width:        '20px',
                      height:       '1px',
                      background:   CREAM_DIM,
                      marginBottom: '10px',
                    }}
                  />
                  <p
                    style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.56rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color:         CREAM_MUTED,
                      lineHeight:    2,
                    }}
                  >
                    DistilBERT · FastAPI
                    <br />
                    Next.js · Vercel · Hugging Face
                  </p>
                </motion.div>
              </nav>

              {/* ── Bottom — social + theme + collapse button ── */}
              <motion.div
                style={{
                  padding:       '18px 28px',
                  borderTop:     `1px solid ${CREAM_DIM}`,
                  display:       'flex',
                  flexDirection: 'column',
                  gap:           '14px',
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.55, duration: 0.45 }}
              >
                {/* Social icons + theme toggle */}
                <div
                  style={{
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', gap: '18px' }}>
                    {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        style={{ color: CREAM_MUTED, display: 'flex' }}
                        whileHover={{ color: CREAM_STRONG, scale: 1.2, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.18 }}
                      >
                        <Icon size={14} />
                      </motion.a>
                    ))}
                  </div>
                  <ThemeToggle forceDark />
                </div>

                {/* Collapse button — full width, pill style */}
                <motion.button
                  onClick={() => setCollapsed(true)}
                  aria-label="Collapse sidebar"
                  style={{
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    gap:            '7px',
                    width:          '100%',
                    padding:        '8px 0',
                    background:     'transparent',
                    border:         `1px solid ${CREAM_DIM}`,
                    borderRadius:   '6px',
                    cursor:         'pointer',
                    color:          CREAM_MUTED,
                    fontFamily:     'var(--font-mono)',
                    fontSize:       '0.58rem',
                    letterSpacing:  '0.1em',
                    textTransform:  'uppercase',
                  }}
                  whileHover={{
                    borderColor: CREAM_MID,
                    color:       CREAM,
                    background:  'rgba(245,240,232,0.05)',
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  <ChevronLeft size={12} strokeWidth={2} />
                  Collapse
                </motion.button>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.aside>

      {/* ── Mobile top bar ───────────────────────────────────── */}
      <motion.header
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background:   'var(--sidebar-bg)',
          borderBottom: `1px solid ${CREAM_DIM}`,
        }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: CREAM }}>
          Truth<em style={{ fontStyle: 'italic', color: AMBER }}>Lens</em>
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
              color:         CREAM,
              padding:       '8px 16px',
              border:        `1px solid ${CREAM_DIM}`,
              background:    'transparent',
              cursor:        'pointer',
            }}
          >
            Analyze
          </motion.button>
        </div>
      </motion.header>
    </>
  );
}