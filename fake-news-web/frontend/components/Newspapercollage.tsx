'use client';

import { motion } from 'framer-motion';

/* ─── Body copy ──────────────────────────────────────────────────────────── */
const COL_A = `Recent advances in transformer-based language processing have produced systems capable of detecting fabricated content with unprecedented accuracy. Researchers confirm automated classification now outpaces traditional editorial review in both speed and consistency.`;

const COL_B = `Independent audits confirmed a weighted F1 score of 0.942 across a balanced dataset drawn from verified and disputed sources spanning six years — the highest recorded benchmark for binary credibility classification.`;

const COL_C = `A newly published benchmark places automated credibility systems above experienced journalists in controlled trials, though researchers caution against overreliance on algorithmic verdicts without human editorial oversight.`;

/*
  ─── Two-div pattern (fixes the "y specified twice" TypeScript warning) ──────

  Each clipping uses TWO motion.divs:
    Outer  → entrance only   (opacity 0→1, y 50→0). No rotate, no repeat.
    Inner  → float only      (y + rotate keyframes, infinite). No entrance.

  Since `y` lives on separate elements, there is zero property conflict.
  The float delay is set to start AFTER the entrance completes.
*/

export default function NewspaperCollage() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden hidden xl:block"
    >
      {/* Gradient veil — bleeds hero-bg into left side, fades by 66% width */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, var(--hero-bg) 44%, transparent 66%)',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      />

      {/* ═══════════════════════════════════════════════════════════
          CLIPPING 1 — Front page (largest, top-right)
          Outer: entrance lift  |  Inner: float + rotate
      ═══════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ position: 'absolute', right: '3.5%', top: '6%', zIndex: 2 }}
        initial={{ opacity: 0, y: 52 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          style={{
            rotate:     -2.5,
            background: '#f0e6d3',
            padding:    '0 0 14px',
            boxShadow:  '0 20px 64px rgba(0,0,0,0.55), 0 4px 16px rgba(100,60,20,0.18)',
            filter:     'sepia(0.16) contrast(0.97)',
            overflow:   'hidden',
            width:      '316px',
          }}
          animate={{
            y:      [-2, 3, -1,   2, -2],
            rotate: [-2.5, -2.8, -2.2, -2.6, -2.5],
          }}
          transition={{
            duration:   9,
            repeat:     Infinity,
            ease:       'easeInOut',
            repeatType: 'mirror',
            delay:      1.75,   /* starts after entrance (0.85 + 0.9) */
          }}
        >
          {/* Red breaking banner */}
          <div style={{ background: '#b83020', padding: '4px 16px', marginBottom: '10px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '6.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#f8e8e0', fontWeight: 500 }}>
              Breaking Analysis
            </span>
          </div>

          <div style={{ padding: '0 16px' }}>
            {/* Masthead */}
            <div style={{ borderTop: '3px solid #1a1a18', paddingTop: '6px' }}>
              <div style={{ textAlign: 'center', paddingBottom: '5px', borderBottom: '1.5px solid #1a1a18', marginBottom: '4px', position: 'relative' }}>
                <span style={{ position: 'absolute', right: 0, top: 0, fontFamily: 'var(--font-mono)', fontSize: '6.5px', color: '#6a6660', letterSpacing: '0.06em', border: '0.5px solid #6a6660', padding: '1px 3px' }}>
                  A·1
                </span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600, color: '#1a1a18', letterSpacing: '0.065em', lineHeight: 1 }}>
                  THE TRUTH HERALD
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '5.8px', letterSpacing: '0.09em', textTransform: 'uppercase', color: '#4a4040', marginTop: '3px' }}>
                  Established 1924 · Vol. XCIX · No. 44,012 · Oct. 24, 2024
                </div>
              </div>
              <div style={{ borderTop: '0.5px solid #1a1a18', marginBottom: '8px' }} />
            </div>

            {/* Amber kicker */}
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '6px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#c8a06a', marginBottom: '4px' }}>
              Technology &amp; Society
            </div>

            {/* Headline */}
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '16.5px', fontWeight: 400, lineHeight: 1.08, color: '#1a1a18', marginBottom: '5px', letterSpacing: '-0.015em' }}>
              MACHINE INTELLIGENCE QUESTIONS THE NATURE OF FACT
            </div>

            {/* Deck */}
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '8px', fontStyle: 'italic', color: '#4a4a40', lineHeight: 1.4, marginBottom: '5px' }}>
              DistilBERT system trained on 44,000 articles achieves 94.2% accuracy in independent peer review
            </div>

            {/* Byline */}
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '5.8px', color: '#6a6660', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '7px' }}>
              By Staff Correspondent
            </div>

            <div style={{ borderTop: '1px solid #b8b0a0', marginBottom: '8px' }} />

            {/* Two-column body with divider */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '9px', marginBottom: '9px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '6.5px', lineHeight: 1.68, color: '#2a2826', fontWeight: 300 }}>
                {/* Drop cap */}
                <span style={{ float: 'left', fontFamily: 'var(--font-display)', fontSize: '28px', lineHeight: '0.8', marginRight: '2px', marginTop: '2px', color: '#1a1a18', fontWeight: 400 }}>
                  R
                </span>
                {COL_A.slice(1)}
              </div>
              {/* Column divider */}
              <div style={{ background: '#c0b8a8' }} />
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '6.5px', lineHeight: 1.68, color: '#2a2826', fontWeight: 300 }}>
                {COL_B}
              </div>
            </div>

            {/* Photo placeholder */}
            <div style={{ position: 'relative', width: '100%', height: '72px', background: 'linear-gradient(145deg,#d8ccb8,#c8bca8,#d4c8b4)', overflow: 'hidden', marginBottom: '4px' }}>
              <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.16 }}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={`${(i+1)*10}%`} x2="100%" y2={`${(i+1)*10}%`} stroke="#2a2826" strokeWidth="0.6" />
                ))}
                {Array.from({ length: 14 }).map((_, i) => (
                  <line key={`v${i}`} x1={`${(i+1)*7}%`} y1="0" x2={`${(i+1)*7}%`} y2="100%" stroke="#2a2826" strokeWidth="0.6" />
                ))}
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '6.5px', color: '#3a3630', letterSpacing: '0.07em', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.6 }}>
                  TruthLens Classifier<br />
                  <span style={{ fontSize: '5.5px', opacity: 0.7 }}>DistilBERT · Fine-tuned · 2024</span>
                </div>
              </div>
              {/* Red circular stamp */}
              <div style={{ position: 'absolute', bottom: '6px', right: '10px', width: '46px', height: '46px', borderRadius: '50%', border: '1.5px solid rgba(184,48,32,0.75)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: 'rotate(12deg)', background: 'rgba(248,232,224,0.6)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '4.5px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(184,48,32,0.85)', textAlign: 'center', lineHeight: 1.4, fontWeight: 500 }}>
                  UNDER<br />REVIEW
                </span>
              </div>
            </div>

            {/* Caption */}
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '5.5px', color: '#6a6660', letterSpacing: '0.04em', fontStyle: 'italic', textAlign: 'center', marginBottom: '6px' }}>
              Fig. 1 — Neural classification architecture
            </div>

            {/* Continued */}
            <div style={{ borderTop: '0.5px solid #c0b8a8', paddingTop: '4px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '6px', fontStyle: 'italic', color: '#6a6660' }}>
                Continued on A7 ›
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          CLIPPING 2 — Secondary article (mid-right, tilted right)
          Outer: entrance lift  |  Inner: float + rotate
      ═══════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ position: 'absolute', right: '24%', top: '56%', zIndex: 1 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          style={{
            rotate:     3.5,
            width:      '218px',
            background: '#ece2ce',
            padding:    '0 0 12px',
            boxShadow:  '0 12px 40px rgba(0,0,0,0.46), 0 3px 10px rgba(80,40,10,0.15)',
            filter:     'sepia(0.2) contrast(0.96)',
            overflow:   'hidden',
          }}
          animate={{
            y:      [0,   4,   -2,  3,   0],
            rotate: [3.5, 3.2, 3.8, 3.4, 3.5],
          }}
          transition={{
            duration:   11,
            repeat:     Infinity,
            ease:       'easeInOut',
            repeatType: 'mirror',
            delay:      1.9,
          }}
        >
          {/* Amber top bar */}
          <div style={{ height: '3px', background: '#c8a06a', marginBottom: '10px' }} />

          <div style={{ padding: '0 11px' }}>
            <div style={{ textAlign: 'center', paddingBottom: '5px', marginBottom: '5px', borderBottom: '1.5px solid #1a1a18' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '11.5px', fontWeight: 600, color: '#1a1a18', letterSpacing: '0.09em' }}>
                THE MORNING REGISTER
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '5.5px', color: '#6a6660', letterSpacing: '0.07em', textTransform: 'uppercase', marginTop: '2px' }}>
                Vol. XII · Friday, Oct. 25, 2024
              </div>
            </div>

            {/* Amber kicker */}
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '5.5px', color: '#c8a06a', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '3px' }}>
              Fact-check
            </div>

            <div style={{ fontFamily: 'var(--font-display)', fontSize: '13.5px', fontWeight: 400, lineHeight: 1.1, color: '#1a1a18', marginBottom: '5px' }}>
              AI ACHIEVES 94.2% IN TRUTHFULNESS BENCHMARK
            </div>

            <div style={{ borderTop: '1px solid #b8b0a0', paddingTop: '5px', marginBottom: '8px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '6px', lineHeight: 1.65, color: '#2a2826', fontWeight: 300 }}>
                {COL_C}
              </div>
            </div>

            <div style={{ borderTop: '0.5px solid #c0b8a8', paddingTop: '3px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '5.8px', fontStyle: 'italic', color: '#6a6660' }}>
                Continued on B3 ›
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          CLIPPING 3 — Torn fragment (lower-right)
          Outer: entrance lift  |  Inner: float + rotate
      ═══════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ position: 'absolute', right: '4%', top: '71%', zIndex: 1 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.22, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          style={{
            rotate:     -5,
            width:      '184px',
            background: '#e6dbc6',
            padding:    '13px 10px 10px',
            boxShadow:  '0 8px 26px rgba(0,0,0,0.40), 0 2px 6px rgba(60,30,10,0.12)',
            filter:     'sepia(0.28) contrast(0.95)',
            clipPath:   `polygon(
              0% 5%, 2.5% 0%, 6% 3.5%, 10% 0.5%, 14% 3%,
              19% 0%, 24% 2.5%, 30% 0%, 36% 3%, 42% 0.5%,
              48% 2%, 55% 0%, 61% 3.5%, 68% 0.5%, 74% 2%,
              80% 0%, 86% 2.5%, 92% 0%, 97% 2%, 100% 0.5%,
              100% 100%, 0% 100%
            )`,
          }}
          animate={{
            y:      [0,  -3, 2,  -4, 0],
            rotate: [-5, -4.6, -5.4, -5.1, -5],
          }}
          transition={{
            duration:   7,
            repeat:     Infinity,
            ease:       'easeInOut',
            repeatType: 'mirror',
            delay:      2,
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '5.5px', color: '#c8a06a', letterSpacing: '0.12em', textTransform: 'uppercase', borderBottom: '0.5px solid #b0a890', paddingBottom: '3px', marginBottom: '5px' }}>
            Daily Chronicle
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 400, lineHeight: 1.12, color: '#1a1a18', fontStyle: 'italic' }}>
            "DistilBERT Outperforms Human Review in Speed and Scale"
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '5.2px', color: '#6a6660', letterSpacing: '0.06em', marginTop: '6px' }}>
            — Tech Desk, Oct. 26
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}