'use client';

import { motion } from 'framer-motion';

/* ─── Animation variants ─────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const slideLeft = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.5,  ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = (stagger = 0.08, delay = 0.05) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/* ─── Data ───────────────────────────────────────────────────────────────── */
const STATS = [
  { label: 'Architecture',     value: 'DistilBERT-Base Uncased'          },
  { label: 'Training corpus',  value: 'Fake/True · LIAR · WELFake'       },
  { label: 'Total articles',   value: '71,744 after deduplication'        },
  { label: 'Test accuracy',    value: '95.05%'                            },
  { label: 'Test F1 Score',    value: '0.9505 weighted avg'               },
  { label: 'Precision',        value: '0.9476 FAKE · 0.9535 REAL'         },
  { label: 'Recall',           value: '0.9541 FAKE · 0.9469 REAL'         },
  { label: 'Inference',        value: '< 1 second on warm instance'       },
  { label: 'Backend',          value: 'FastAPI · HuggingFace Spaces'      },
  { label: 'Frontend',         value: 'Next.js 15 · Vercel'               },
];

const TEXT_BLOCKS = [
  {
    title: 'What TruthLens Does',
    body:  'TruthLens is a fine-tuned transformer model that classifies news text as real or fabricated by detecting linguistic patterns associated with misinformation. When you paste an article, the text is tokenised and passed through a DistilBERT encoder pre-trained on BookCorpus and English Wikipedia. A two-class classification head outputs a softmax probability over FAKE and REAL labels. The higher probability becomes the verdict; the gap between the two probabilities determines the confidence score. A narrow gap — anything under roughly 70% — means the model is uncertain and the verdict should be treated as a signal to investigate further, not a definitive conclusion.',
  },
  {
    title: 'Model Architecture',
    body:  'DistilBERT-Base Uncased is a distilled version of BERT that retains 97% of its language understanding capability at 40% fewer parameters and 60% faster inference. It uses 6 transformer layers, 12 attention heads, and a hidden size of 768 — producing contextual token embeddings that capture nuance, tone, and sentence structure simultaneously. The [CLS] token embedding is passed through a dropout layer and a linear classification head during fine-tuning. Training used the AdamW optimiser with a learning rate of 2e-5, weight decay of 0.01, warmup over 10% of steps, gradient clipping at 1.0, and mixed precision (fp16) on a T4 GPU. Early stopping with patience of 2 epochs was used to select the best checkpoint by F1 score.',
  },
  {
    title: 'Training Data & Pipeline',
    body:  'Three datasets were combined into a single corpus. The Fake/True CSV dataset contains approximately 39,000 political news articles from 2016–2017, balanced between fabricated and verified reporting. The LIAR dataset contributes around 8,000 PolitiFact-verified political statements across six credibility labels, filtered and remapped to binary classes. WELFake adds 63,000 deduplicated articles spanning politics, health, science, business, and entertainment from four sources including Reuters and BuzzFeed News. Before training, all text went through a cleaning pipeline that strips Reuters and AP datelines, removes embedded source tags, normalises whitespace, and drops HTML artifacts — this prevents the model from learning publisher identity as a shortcut rather than genuine linguistic signals. All three datasets were deduplicated against each other, class-balanced to 50/50, and shuffled before splitting 80/10/10 into train, validation, and test sets.',
  },
  {
    title: 'What TruthLens Cannot Do',
    body:  'TruthLens detects stylistic and linguistic patterns associated with misinformation — it is not a fact-checker and cannot verify specific claims, statistics, dates, or quotes against external sources. It has no knowledge of events after its training data cutoff and cannot assess whether a named study, person, or organisation actually exists. The model performs best on English-language political and general news in a journalistic style. Performance is reduced on satire, opinion and editorial content, highly technical scientific writing, and content from domains not well-represented in the training data. Professionally written disinformation that closely mimics legitimate journalism may receive high credibility scores. The confidence score is a linguistic signal produced by a statistical model — it should augment editorial judgment, not replace it. Always cross-reference high-stakes claims with primary sources.',
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
        <span
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.6rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:         'var(--about-muted)',
          }}
        >
          §03 — Technology
        </span>
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
        {/* ── Left: heading + stats table ─────────────────── */}
        <div style={{ paddingRight: '64px', borderRight: '1px solid var(--about-border)' }}>
          <motion.h2
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    400,
              fontSize:      'clamp(2rem, 3.5vw, 2.8rem)',
              lineHeight:    1.05,
              color:         'var(--about-text)',
              letterSpacing: '-0.02em',
              marginBottom:  '32px',
            }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            How the model{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--about-accent)' }}>
              works
            </em>
          </motion.h2>

          {/* Staggered stat rows */}
          <motion.div
            style={{ borderTop: '1px solid var(--about-border)', paddingTop: '32px' }}
            variants={staggerContainer(0.075, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {STATS.map(({ label, value }) => (
              <StatRow key={label} label={label} value={value} />
            ))}
          </motion.div>
        </div>

        {/* ── Right: staggered text blocks ────────────────── */}
        <motion.div
          style={{ paddingLeft: '64px' }}
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {TEXT_BLOCKS.map(({ title, body }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              style={{ marginBottom: '36px' }}
            >
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
              Open source · Apache 2.0 License · Model weights available on
              HuggingFace
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
        display:      'flex',
        justifyContent: 'space-between',
        padding:      '14px 8px',
        borderBottom: '1px solid var(--about-border)',
        borderRadius: '2px',
        cursor:       'default',
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

/* ─── Footer link with underline hover ──────────────────────────────────── */
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position:      'relative',
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.58rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color:         'var(--about-footer)',
        textDecoration: 'none',
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