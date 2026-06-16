'use client';

import { motion } from 'framer-motion';
import ScrambleText from './Scrambletext';

/* ─── Variants ───────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const slideLeft = {
  hidden:  { opacity: 0, x: -12 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const stagger = (delay = 0.05, staggerChildren = 0.08) => ({
  hidden:  {},
  visible: { transition: { staggerChildren, delayChildren: delay } },
});

/* ─── Data ───────────────────────────────────────────────────────────────── */
const STATS = [
  { label: 'Architecture',  value: 'DistilBERT-Base Uncased'  },
  { label: 'Training data', value: 'LIAR + WELFake combined'  },
  { label: 'Articles',      value: '44,000+'                  },
  { label: 'F1 Score',      value: '0.942 weighted avg'        },
  { label: 'Inference',     value: '< 1 second'                },
];

const TEXT_BLOCKS = [
  {
    title: 'Fine-tuned Classification',
    body:  'The model is a DistilBERT-Base Uncased transformer pre-trained on BookCorpus and Wikipedia, fine-tuned on a balanced dataset of verified and fabricated news articles. The classification head outputs a binary label with a softmax confidence score.',
  },
  {
    title: 'Dataset Composition',
    body:  'Training data combines LIAR (politifact.com, 12K statements) and WELFake (Kaggle, 72K articles fused to 44K after deduplication). Both REAL and FAKE classes are balanced at approximately 50/50 to prevent label bias.',
  },
  {
    title: 'Limitations',
    body:  'The model performs best on English-language political and social news. It has reduced sensitivity to satire, opinion pieces, and highly technical domains. AI analysis is a signal, not a verdict — human editorial judgment remains essential.',
  },
];

/* ─── AboutSection ───────────────────────────────────────────────────────── */
export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: 'var(--about-bg)',
        borderTop:  '1px solid var(--about-border)',
      }}
    >
      {/* ── Section header ──────────────────────────────────── */}
      <motion.div
        className="flex items-center"
        style={{
          borderBottom: '1px solid var(--about-border)',
          padding:      '20px 64px',
        }}
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        {/*
          ScrambleText decodes "§03 — Technology" from random characters
          when this section enters the viewport. The mono caps style
          makes the scramble feel like a live data feed resolving.
        */}
        <ScrambleText
          text="§03 — Technology"
          tag="span"
          duration={900}
          delay={100}
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.6rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:         'var(--about-muted)',
          }}
        />
      </motion.div>

      {/* ── Two-column body ─────────────────────────────────── */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: '1fr 1fr',
          gap:     0,
          padding: '80px 64px',
        }}
      >
        {/* ── Left: heading + stats table ──────────────────── */}
        <div
          style={{
            paddingRight: '64px',
            borderRight:  '1px solid var(--about-border)',
          }}
        >
          {/*
            ScrambleText on the section heading. Once resolved it swaps to
            the proper JSX (children prop) — restoring the italic coloured
            "works" without any flash.
          */}
          <ScrambleText
            text="How the model works"
            tag="h2"
            duration={1100}
            delay={200}
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    400,
              fontSize:      'clamp(2rem, 3.5vw, 2.8rem)',
              lineHeight:    1.05,
              color:         'var(--about-text)',
              letterSpacing: '-0.02em',
              marginBottom:  '32px',
              display:       'block',
            }}
          >
            {/* Rendered only after scramble fully resolves */}
            How the model{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--about-accent)' }}>
              works
            </em>
          </ScrambleText>

          {/* Staggered stat rows */}
          <motion.div
            style={{ borderTop: '1px solid var(--about-border)', paddingTop: '32px' }}
            variants={stagger(0.1, 0.075)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {STATS.map(({ label, value }) => (
              <StatRow key={label} label={label} value={value} />
            ))}
          </motion.div>
        </div>

        {/* ── Right: staggered text blocks ─────────────────── */}
        <motion.div
          style={{ paddingLeft: '64px' }}
          variants={stagger(0.1, 0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {TEXT_BLOCKS.map(({ title, body }) => (
            <motion.div key={title} variants={fadeUp} style={{ marginBottom: '36px' }}>
              <h4
                style={{
                  fontFamily:   'var(--font-display)',
                  fontWeight:   400,
                  fontSize:     '1rem',
                  color:        'var(--about-text)',
                  marginBottom: '12px',
                  fontStyle:    'italic',
                }}
              >
                {title}
              </h4>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                  fontSize:   '0.9rem',
                  lineHeight: 1.8,
                  color:      'var(--about-dim)',
                }}
              >
                {body}
              </p>
            </motion.div>
          ))}

          <motion.div
            variants={fadeUp}
            style={{
              borderTop:  '1px solid var(--about-border)',
              paddingTop: '24px',
              marginTop:  '8px',
            }}
          >
            <p
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.6rem',
                letterSpacing: '0.06em',
                color:         'var(--about-muted)',
                lineHeight:    1.7,
              }}
            >
              Open source · Apache 2.0 License · Model weights available on HuggingFace
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Footer ──────────────────────────────────────────── */}
      <motion.div
        style={{
          borderTop:      '1px solid var(--about-border)',
          padding:        '24px 64px',
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle:  'italic',
            fontSize:   '0.9rem',
            color:      'var(--about-footer)',
          }}
        >
          TruthLens · News Credibility Analysis
        </span>
        <FooterLink href="https://github.com/Vignesh-P-C" label="GitHub ↗" />
      </motion.div>
    </section>
  );
}

/* ─── Stat row with hover highlight ─────────────────────────────────────── */
function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      variants={slideLeft}
      style={{
        display:         'flex',
        justifyContent:  'space-between',
        padding:         '14px 8px',
        borderBottom:    '1px solid var(--about-border)',
        borderRadius:    '2px',
        cursor:          'default',
      }}
      whileHover={{
        backgroundColor: 'rgba(200,160,106,0.05)',
        x: 4,
        transition: { duration: 0.2 },
      }}
    >
      <span
        style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.62rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color:         'var(--about-muted)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 300,
          fontSize:   '0.85rem',
          color:      'var(--about-text)',
        }}
      >
        {value}
      </span>
    </motion.div>
  );
}

/* ─── Footer link ────────────────────────────────────────────────────────── */
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position:        'relative',
        fontFamily:      'var(--font-mono)',
        fontSize:        '0.58rem',
        letterSpacing:   '0.1em',
        textTransform:   'uppercase',
        color:           'var(--about-footer)',
        textDecoration:  'none',
      }}
      whileHover={{ color: 'var(--about-text)' }}
      transition={{ duration: 0.15 }}
    >
      {label}
      <motion.span
        style={{
          position:   'absolute',
          bottom:     '-1px',
          left:       0,
          height:     '1px',
          background: 'var(--about-text)',
          width:      0,
        }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.a>
  );
}