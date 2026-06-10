'use client';

import { motion } from "framer-motion";

export default function HeroSection() {
  const scrollToDetector = () => {
    document.getElementById("detector")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex flex-col justify-end overflow-hidden"
      style={{
        background: "var(--hero-bg)",
        minHeight: "100vh",
        backgroundImage: `
          radial-gradient(ellipse 120% 60% at 70% 0%, rgba(200,184,154,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 80% 80% at 20% 80%, rgba(30,77,54,0.04) 0%, transparent 50%)
        `,
      }}
    >
      {/* Grain texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
        }}
      />

      {/* Top bar — dateline */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center px-16 py-8"
        style={{ borderBottom: "1px solid rgba(240,237,232,0.08)" }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(240,237,232,0.35)",
          }}
        >
          Credibility Research — Est. 2024
        </motion.span>
      </div>

      {/* Hero body */}
      <div className="relative z-10 px-16 pb-24 max-w-3xl">

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(3.5rem, 7vw, 6.5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            /* Hero text is always on dark bg — use fixed light colour */
            color: "#f0ede8",
            marginBottom: "28px",
          }}
        >
          AI-Powered<br />
          <em style={{ fontStyle: "italic", color: "#e8e0d4" }}>
            News Credibility
          </em>
          <br />
          Detection
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "0.95rem",
            lineHeight: 1.75,
            color: "rgba(240,237,232,0.5)",
            maxWidth: "520px",
            marginBottom: "40px",
          }}
        >
          TruthLens runs DistilBERT against a 44,000-article corpus of verified
          and flagged news sources — returning a credibility verdict in under
          a second. Paste any text below.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Primary CTA — always on dark hero */}
          <button
            onClick={scrollToDetector}
            style={{
              background: "#f0ede8",
              color: "#0a0a0a",
              padding: "14px 32px",
              border: "1px solid #f0ede8",
              borderRadius: 0,
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#f0ede8";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#f0ede8";
              (e.currentTarget as HTMLElement).style.color = "#0a0a0a";
            }}
          >
            Analyze Article
          </button>

          <button
            onClick={scrollToAbout}
            style={{
              background: "transparent",
              color: "#f0ede8",
              padding: "14px 32px",
              border: "1px solid rgba(240,237,232,0.3)",
              borderRadius: 0,
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,237,232,0.7)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,237,232,0.3)";
            }}
          >
            Read Methodology
          </button>
        </motion.div>
      </div>

      {/* Stats — always on dark hero, fixed colours */}
      <motion.div
        className="absolute bottom-8 right-16 flex items-center gap-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {[
          { value: "44K+",  label: "Articles"  },
          { value: "94.2%", label: "F1 Score"  },
          { value: "<1s",   label: "Inference" },
        ].map(({ value, label }) => (
          <div key={label} className="text-right">
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.6rem",
                fontWeight: 400,
                color: "#f0ede8",
                lineHeight: 1,
              }}
            >
              {value}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(240,237,232,0.3)",
                marginTop: "4px",
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}