// BEFORE: AuroraBackground (Three.js GLSL shader), centered text,
//         gradient headline, floating stat cards with glow,
//         neon CTA buttons (rounded-full + gradient)
//
// AFTER:  Dark full-bleed image section (#1c1c1a),
//         bottom-anchored left-aligned headline (serif),
//         Prev/Next navigation like museum reference,
//         outlined minimal buttons

'use client';

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const scrollToDetector = () => {
    document.getElementById("detector")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex flex-col justify-end overflow-hidden"
      style={{
        // BEFORE: background handled by Three.js AuroraBackground canvas
        // AFTER:  dark neutral — the image is the atmosphere, not a shader
        background: "#1c1c1a",
        minHeight: "100vh",
        // Subtle paper texture via CSS only — no external image dependency
        backgroundImage: `
          radial-gradient(ellipse 120% 60% at 70% 0%, rgba(200,184,154,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 80% 80% at 20% 80%, rgba(30,77,54,0.04) 0%, transparent 50%)
        `,
      }}
    >
      {/* Grain texture — CSS only, not a PNG overlay
          Very subtle — just enough to feel printed, not digital */}
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

      {/* Top row: eyebrow + prev/next */}
      {/* BEFORE: animated badge with cyan dot pulse
          AFTER:  plain monospaced label, no animation */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-16 py-8"
        style={{ borderBottom: "1px solid rgba(240,237,232,0.08)" }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(240,237,232,0.35)",
          }}
        >
          {/* BEFORE: "Powered by Transformer AI" badge with glowing dot
              AFTER:  publication-style dateline */}
          Credibility Research — Est. 2024
        </motion.span>

        {/* Prev / Next — from reference image */}
        <div className="flex items-center gap-8">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 transition-colors duration-150"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(240,237,232,0.35)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            whileHover={{ color: "rgba(240,237,232,0.9)" }}
          >
            <ArrowLeft size={12} />
            <span>Prev</span>
          </motion.button>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex items-center gap-2 transition-colors duration-150"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(240,237,232,0.35)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            whileHover={{ color: "rgba(240,237,232,0.9)" }}
          >
            <span>Next</span>
            <ArrowRight size={12} />
          </motion.button>
        </div>
      </div>

      {/* Hero body — bottom aligned, left-offset
          BEFORE: text-center, max-w-5xl mx-auto
          AFTER:  bottom-left anchor, asymmetric positioning */}
      <div className="relative z-10 px-16 pb-24 max-w-3xl">

        {/* Category tag — museum placard style */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: "24px" }}
        >
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              // BEFORE: text-cyan-400 with glowing dot
              // AFTER:  warm sand, no dot, no glow
              color: "#c8b89a",
            }}
          >
            Enjoy\art<sup>space</sup>
            {/* ^ keeping the reference's quirky notation — it feels human */}
          </span>
        </motion.div>

        {/* Headline — the BIG serif moment
            BEFORE: gradient-text animation, Syne font 700-800 weight
            AFTER:  Playfair Display 400 weight — the serif does the work */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 400,
            // BEFORE: font-size 5rem-8rem, gradient
            // AFTER:  large but not overwhelming, plain off-white
            fontSize: "clamp(3.5rem, 7vw, 6.5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
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

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 300,
            fontSize: "0.95rem",
            lineHeight: 1.75,
            color: "rgba(240,237,232,0.5)",
            maxWidth: "520px",
            marginBottom: "40px",
          }}
        >
          {/* BEFORE: "Leveraging BERT-based transformer..." — marketing speak
              AFTER:  editorial voice, measured and precise */}
          TruthLens runs BERT-base against a 44,000-article corpus of verified
          and flagged news sources — returning a credibility verdict in under
          a second. Paste any text below.
        </motion.p>

        {/* CTAs — BEFORE: gradient pill buttons with glow
                   AFTER:  sharp outlined buttons, monospaced labels */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={scrollToDetector}
            style={{
              // BEFORE: bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full
              // AFTER:  flat #f0ede8 background, sharp corners
              background: "#f0ede8",
              color: "#0a0a0a",
              padding: "14px 32px",
              border: "1px solid #f0ede8",
              borderRadius: 0,
              fontFamily: "'IBM Plex Mono', monospace",
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
            style={{
              background: "transparent",
              color: "#f0ede8",
              padding: "14px 32px",
              border: "1px solid rgba(240,237,232,0.3)",
              borderRadius: 0,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.72rem",
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(240,237,232,0.7)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(240,237,232,0.3)";
            }}
          >
            Read Methodology
          </button>
        </motion.div>
      </div>

      {/* Stats row — bottom right
          BEFORE: floating animated cards with gradient progress bars
          AFTER:  inline text stats, no cards, no animation */}
      <motion.div
        className="absolute bottom-8 right-16 flex items-center gap-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {[
          { value: "44K+", label: "Articles" },
          { value: "94.2%", label: "F1 Score" },
          { value: "<1s", label: "Inference" },
        ].map(({ value, label }) => (
          <div key={label} className="text-right">
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.6rem",
                fontWeight: 400,
                // BEFORE: gradient-text
                // AFTER:  plain off-white
                color: "#f0ede8",
                lineHeight: 1,
              }}
            >
              {value}
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
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
