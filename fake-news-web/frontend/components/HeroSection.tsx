//Herosection
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import NewspaperCollage from './Newspapercollage';

/* ─── Count-up hook ──────────────────────────────────────────────────────── */
function useCountUp(target: number, decimals = 0) {
  const [value, setValue] = useState(0);
  const triggered = useRef(false);
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el || target === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const DURATION = 1500;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / DURATION, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(parseFloat((target * eased).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals]);

  return { value, elRef };
}

/* ─── Animated stat item ─────────────────────────────────────────────────── */
function AnimatedStat({
  numeric,
  suffix,
  decimals = 0,
  label,
  isStatic = false,
}: {
  numeric: number;
  suffix: string;
  decimals?: number;
  label: string;
  isStatic?: boolean;
}) {
  const { value, elRef } = useCountUp(isStatic ? 0 : numeric, decimals);

  const displayed = isStatic
    ? suffix
    : `${decimals > 0 ? value.toFixed(decimals) : Math.floor(value)}${suffix}`;

  return (
    <motion.div
      ref={!isStatic ? elRef : undefined}
      className="text-right"
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize:   '1.6rem',
          fontWeight: 400,
          color:      'var(--hero-stat)',
          lineHeight: 1,
        }}
      >
        {displayed}
      </div>
      <div
        style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.6rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color:         'var(--hero-stat-label)',
          marginTop:     '4px',
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

/* ─── HeroSection ────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const { scrollY } = useScroll();
  const orbY  = useTransform(scrollY, [0, 600], [0, -100]);
  const orbY2 = useTransform(scrollY, [0, 600], [0, -60]);

  const scrollToDetector = () =>
    document.getElementById('detector')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToAbout = () =>
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      className="relative flex flex-col justify-end overflow-hidden"
      style={{
        background:  'var(--hero-bg)',
        minHeight:   '100vh',
        backgroundImage: `
          radial-gradient(ellipse 120% 60% at 70% 0%, rgba(200,184,154,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 80% 80% at 20% 80%, rgba(30,77,54,0.04) 0%, transparent 50%)
        `,
      }}
    >
      {/* ── Grain texture ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          opacity:    0.025,
          pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Floating ambient orbs ─────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Warm amber — top right */}
        <motion.div
          style={{
            position:   'absolute',
            width:      '520px', height: '520px',
            top:        '-120px', right: '2%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,184,154,0.10) 0%, transparent 70%)',
            filter:     'blur(70px)',
            y:          orbY,
          }}
          animate={{ x: [0, 28, -18, 0], scale: [1, 1.05, 0.96, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Deep green — bottom left */}
        <motion.div
          style={{
            position:   'absolute',
            width:      '380px', height: '380px',
            bottom:     '12%', left: '4%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(30,77,54,0.08) 0%, transparent 70%)',
            filter:     'blur(90px)',
            y:          orbY2,
          }}
          animate={{ x: [0, -22, 16, 0], y: [0, 18, -12, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        {/* Small warm accent — mid canvas */}
        <motion.div
          style={{
            position:   'absolute',
            width:      '220px', height: '220px',
            top:        '38%', right: '28%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,160,106,0.06) 0%, transparent 70%)',
            filter:     'blur(50px)',
          }}
          animate={{ x: [0, 14, -10, 0], y: [0, -10, 14, 0], scale: [1, 1.08, 0.93, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* ── Newspaper collage (xl+ screens only) ─────────────── */}
      <NewspaperCollage />

      {/* ── Top dateline bar ──────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center px-16 py-8"
        style={{ borderBottom: '1px solid var(--hero-border)' }}
      >
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.68rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         'var(--hero-dateline)',
          }}
        >
          Credibility Research — Est. 2024
        </motion.span>
      </div>

      {/* ── Main copy block ───────────────────────────────────── */}
      <div className="relative z-10 px-16 pb-24 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily:    'var(--font-display)',
            fontWeight:    400,
            fontSize:      'clamp(3.5rem, 7vw, 6.5rem)',
            lineHeight:    0.95,
            letterSpacing: '-0.02em',
            color:         'var(--hero-text)',
            marginBottom:  '28px',
          }}
        >
          AI-Powered
          <br />
          <em className="shimmer-text" style={{ fontStyle: 'italic' }}>
            News Credibility
          </em>
          <br />
          Detection
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.65 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize:   '0.95rem',
            lineHeight: 1.75,
            color:      'var(--hero-subtitle)',
            maxWidth:   '520px',
            marginBottom: '40px',
          }}
        >
          TruthLens runs DistilBERT against a 71,744-article corpus of verified
          and flagged news sources — returning a credibility verdict in under a
          second. Paste any text below.
        </motion.p>

        {/* ── CTAs ─────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.55 }}
        >
          <motion.button
            onClick={scrollToDetector}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background:    'var(--hero-btn-bg)',
              color:         'var(--hero-btn-fg)',
              padding:       '14px 32px',
              border:        '1px solid var(--hero-btn-bg)',
              borderRadius:  0,
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.72rem',
              fontWeight:    500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor:        'pointer',
              transition:    'background 0.18s, color 0.18s, border-color 0.18s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background  = 'transparent';
              el.style.color       = 'var(--hero-btn-bg)';
              el.style.borderColor = 'var(--hero-btn-bg)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background  = 'var(--hero-btn-bg)';
              el.style.color       = 'var(--hero-btn-fg)';
              el.style.borderColor = 'var(--hero-btn-bg)';
            }}
          >
            Analyze Article
          </motion.button>

          <motion.button
            onClick={scrollToAbout}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background:    'transparent',
              color:         'var(--hero-text)',
              padding:       '14px 32px',
              border:        '1px solid var(--hero-btn-outline-border)',
              borderRadius:  0,
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.72rem',
              fontWeight:    400,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor:        'pointer',
              transition:    'border-color 0.18s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = 'var(--hero-btn-outline-hover)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = 'var(--hero-btn-outline-border)')
            }
          >
            Read Methodology
          </motion.button>
        </motion.div>
      </div>

      {/* ── Animated stats ────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 right-16 flex items-center gap-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.6 }}
      >
        <AnimatedStat numeric={71}   suffix="K+" decimals={0} label="Articles"  />
        <AnimatedStat numeric={95.05} suffix="%"  decimals={2} label="F1 Score"  />
        <AnimatedStat numeric={0}    suffix="<1s" label="Inference" isStatic    />
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────────────── */}
      <motion.div
        className="absolute bottom-10 left-16 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <div
          style={{
            position:   'relative',
            width:      '1px',
            height:     '44px',
            overflow:   'hidden',
            background: 'rgba(240,237,232,0.1)',
          }}
        >
          <motion.div
            style={{ position: 'absolute', left: 0, right: 0, background: 'var(--hero-dateline)' }}
            animate={{ top: ['0%', '100%'], height: ['0%', '60%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.55rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:         'var(--hero-dateline)',
          }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}