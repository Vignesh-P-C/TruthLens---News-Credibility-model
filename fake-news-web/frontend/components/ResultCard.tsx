'use client';

import { motion } from "framer-motion";
import type { PredictionResult } from "@/lib/api";

interface ResultCardProps {
  result: PredictionResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const isReal = result.label === "REAL";
  const confidence = result.confidence;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={
        isReal
          ? { opacity: 1, y: 0 }
          : { opacity: 1, y: 0, x: [0, -6, 6, -4, 4, -2, 2, 0] }
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
        background: isReal ? "var(--real-bg)" : "var(--fake-bg)",
        border: `1px solid ${isReal ? "var(--real-border)" : "var(--fake-border)"}`,
        borderRadius: 0,
        overflow: "hidden",
      }}
    >
      {/* Top accent rule */}
      <div style={{ height: "2px", background: isReal ? "var(--real-fg)" : "var(--fake-fg)" }} />

      <div style={{ padding: "28px" }}>
        {/* Verdict header */}
        <div className="flex items-start justify-between" style={{ marginBottom: "24px" }}>
          <div>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "8px",
              }}
            >
              Verdict
            </span>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "2.8rem",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: isReal ? "var(--real-fg)" : "var(--fake-fg)",
              }}
            >
              {isReal ? "Real" : "Fake"}
            </h3>
          </div>

          {/* Stamp badge */}
          <div
            style={{
              padding: "6px 12px",
              background: isReal ? "var(--real-fg)" : "var(--fake-fg)",
              color: "#f5f4f0",
              fontFamily: "var(--font-mono)",
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

        {/* Confidence */}
        <div style={{ marginBottom: "20px" }}>
          <div className="flex items-center justify-between" style={{ marginBottom: "10px" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              Model confidence
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.6rem",
                fontWeight: 400,
                color: isReal ? "var(--real-fg)" : "var(--fake-fg)",
                lineHeight: 1,
              }}
            >
              {confidence.toFixed(1)}%
            </motion.span>
          </div>

          {/* Progress track */}
          <div style={{ height: "2px", background: "var(--rule)", width: "100%" }}>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${confidence}%` }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: "100%",
                background: isReal ? "var(--real-fg)" : "var(--fake-fg)",
              }}
            />
          </div>
        </div>

        {/* Interpretation */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "0.82rem",
            lineHeight: 1.65,
            color: "var(--ink-light)",
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

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: isReal ? "var(--real-border)" : "var(--fake-border)",
            margin: "20px 0",
          }}
        />

        {/* Contextual note */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.05em",
            color: "var(--muted)",
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