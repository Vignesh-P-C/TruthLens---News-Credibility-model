'use client';

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: "var(--about-bg)",
        borderTop: "1px solid var(--about-border)",
      }}
    >
      {/* Section header */}
      <div
        className="flex items-center"
        style={{
          borderBottom: "1px solid var(--about-border)",
          padding: "20px 64px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--about-muted)",
          }}
        >
          §03 — Technology
        </span>
      </div>

      {/* Two-column body */}
      <div
        className="grid"
        style={{ gridTemplateColumns: "1fr 1fr", gap: 0, padding: "80px 64px" }}
      >
        {/* Left: heading + stats */}
        <motion.div
          style={{ paddingRight: "64px", borderRight: "1px solid var(--about-border)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              lineHeight: 1.05,
              color: "var(--about-text)",
              letterSpacing: "-0.02em",
              marginBottom: "32px",
            }}
          >
            How the model{" "}
            <em style={{ fontStyle: "italic", color: "var(--about-accent)" }}>
              works
            </em>
          </h2>

          <div style={{ borderTop: "1px solid var(--about-border)", paddingTop: "32px" }}>
            {[
              { label: "Architecture",  value: "DistilBERT-Base Uncased" },
              { label: "Training data", value: "LIAR + WELFake combined" },
              { label: "Articles",      value: "44,000+"                 },
              { label: "F1 Score",      value: "0.942 weighted avg"       },
              { label: "Inference",     value: "< 1 second"               },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between"
                style={{
                  padding: "14px 0",
                  borderBottom: "1px solid var(--about-border)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--about-muted)",
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "0.85rem",
                    color: "var(--about-text)",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: body text */}
        <motion.div
          style={{ paddingLeft: "64px" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {[
            {
              title: "Fine-tuned Classification",
              body:  "The model is a DistilBERT-Base Uncased transformer pre-trained on BookCorpus and Wikipedia, fine-tuned on a balanced dataset of verified and fabricated news articles. The classification head outputs a binary label with a softmax confidence score.",
            },
            {
              title: "Dataset Composition",
              body:  "Training data combines LIAR (politifact.com, 12K statements) and WELFake (Kaggle, 72K articles fused to 44K after deduplication). Both REAL and FAKE classes are balanced at approximately 50/50 to prevent label bias.",
            },
            {
              title: "Limitations",
              body:  "The model performs best on English-language political and social news. It has reduced sensitivity to satire, opinion pieces, and highly technical domains. AI analysis is a signal, not a verdict — human editorial judgment remains essential.",
            },
          ].map(({ title, body }) => (
            <div key={title} style={{ marginBottom: "36px" }}>
              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "1rem",
                  color: "var(--about-text)",
                  marginBottom: "12px",
                  fontStyle: "italic",
                }}
              >
                {title}
              </h4>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "0.9rem",
                  lineHeight: 1.8,
                  color: "var(--about-dim)",
                }}
              >
                {body}
              </p>
            </div>
          ))}

          <div
            style={{
              borderTop: "1px solid var(--about-border)",
              paddingTop: "24px",
              marginTop: "8px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.06em",
                color: "var(--about-muted)",
                lineHeight: 1.7,
              }}
            >
              Open source · Apache 2.0 License · Model weights available on HuggingFace
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid var(--about-border)",
          padding: "24px 64px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "0.9rem",
            color: "var(--about-footer)",
          }}
        >
          TruthLens · News Credibility Analysis
        </span>
        <a
          href="https://github.com/Vignesh-P-C"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--about-footer)",
            textDecoration: "none",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--about-text)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--about-footer)")
          }
        >
          GitHub ↗
        </a>
      </div>
    </section>
  );
}