// BEFORE: box-shadow glow-green / glow-red, gradient progress bar,
//         rounded-2xl, CheckCircle/XCircle icons with color
//
// AFTER:  flat bordered card, 2px progress line, muted semantic colors,
//         typographic verdict label, shake animation kept (has meaning)

'use client';

import { motion } from "framer-motion";
import type { PredictionResult } from "@/lib/api";

interface ResultCardProps {
  result: PredictionResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const isReal = result.label === "REAL";
  const confidence = result.confidence; // already %

  return (
    <motion.div
      // BEFORE: rounded-2xl glass shadow-glow-green / shadow-glow-red
      // AFTER:  sharp corners, flat border, muted semantic background
      initial={{ opacity: 0, y: 16 }}
      animate={
        isReal
          ? { opacity: 1, y: 0 }
          : {
              opacity: 1,
              y: 0,
              // KEPT: shake animation for FAKE — it's meaningful, not decorative
              x: [0, -6, 6, -4, 4, -2, 2, 0],
            }
      }
      transition={
        isReal
          ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
          : {
              opacity: { duration: 0.3 },
              x: { duration: 0.5, delay: 0.2, ease: "easeInOut" },
            }
      }
      style={{
        // BEFORE: glass background (rgba + blur), glow box-shadow
        // AFTER:  flat, muted semantic palette
        background: isReal ? "#eaf2ec" : "#f5ecea",
        border: `1px solid ${isReal ? "#a3c4ab" : "#d4a09a"}`,
        borderRadius: 0,
        overflow: "hidden",
      }}
    >
      {/* Top accent rule — thin line, not a gradient glow */}
      <div
        style={{
          height: "2px",
          // BEFORE: bg-gradient-to-r from-transparent via-green-400 to-transparent
          // AFTER:  solid flat color strip
          background: isReal ? "#1e4d36" : "#8b2318",
        }}
      />

      <div style={{ padding: "28px" }}>
        {/* Verdict header */}
        <div
          className="flex items-start justify-between"
          style={{ marginBottom: "24px" }}
        >
          <div>
            {/* BEFORE: "Analysis Result" in font-mono text-muted-foreground
                AFTER:  same pattern, editorial placement */}
            <span
              style={{
                display: "block",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#7a766f",
                marginBottom: "8px",
              }}
            >
              Verdict
            </span>
            {/* BEFORE: CheckCircle / XCircle icon + gradient text
                AFTER:  pure serif label — the font weight IS the statement */}
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                fontSize: "2.8rem",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                // BEFORE: text-green-400 / text-red-400 (neon)
                // AFTER:  muted forest green / muted red
                color: isReal ? "#1e4d36" : "#8b2318",
              }}
            >
              {/* BEFORE: just "REAL" or "FAKE" in all-caps
                  AFTER:  more editorial presentation */}
              {isReal ? "Real" : "Fake"}
            </h3>
          </div>

          {/* Status badge — BEFORE: rounded-full colored badge
                           AFTER:  square monospaced stamp */}
          <div
            style={{
              padding: "6px 12px",
              background: isReal ? "#1e4d36" : "#8b2318",
              color: "#f5f4f0",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.6rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              borderRadius: 0,
              alignSelf: "flex-start",
            }}
          >
            {isReal ? "Credible" : "Suspicious"}
          </div>
        </div>

        {/* Confidence section */}
        <div style={{ marginBottom: "20px" }}>
          <div
            className="flex items-center justify-between"
            style={{ marginBottom: "10px" }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#7a766f",
              }}
            >
              {/* BEFORE: TrendingUp icon + "Model confidence" */}
              Model confidence
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.6rem",
                fontWeight: 400,
                color: isReal ? "#1e4d36" : "#8b2318",
                lineHeight: 1,
              }}
            >
              {confidence.toFixed(1)}%
            </motion.span>
          </div>

          {/* Progress bar — BEFORE: h-2.5 rounded-full gradient with shimmer
                           AFTER:  2px rule, flat fill */}
          <div
            style={{
              height: "2px",
              background: "#d8d4ce",
              width: "100%",
            }}
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${confidence}%` }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: "100%",
                // BEFORE: bg-gradient-to-r from-green-500 to-teal-400
                // AFTER:  solid flat semantic color
                background: isReal ? "#1e4d36" : "#8b2318",
              }}
            />
          </div>
        </div>

        {/* Confidence interpretation */}
        <p
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 300,
            fontSize: "0.82rem",
            lineHeight: 1.65,
            color: "#4a4a46",
            fontStyle: "italic",
          }}
        >
          {confidence >= 90
            ? isReal
              ? "High confidence. Cross-referencing with additional sources is still recommended for editorial purposes."
              : "High confidence that this content contains misinformation. Verify any claims before sharing."
            : confidence >= 70
            ? isReal
              ? "Likely credible. Some signals are ambiguous — verify with primary sources."
              : "Likely misleading. Seek corroboration from established outlets."
            : "Low model confidence. Insufficient linguistic signal for a definitive verdict."}
        </p>

        {/* Separator rule */}
        <div
          style={{
            height: "1px",
            background: isReal ? "#a3c4ab" : "#d4a09a",
            margin: "20px 0",
          }}
        />

        {/* Contextual note */}
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.05em",
            color: "#7a766f",
            lineHeight: 1.6,
          }}
        >
          {isReal
            ? "Note — AI analysis augments, not replaces, editorial judgment."
            : "Patterns associated with fabricated or misleading content were detected."}
        </p>
      </div>
    </motion.div>
  );
}
