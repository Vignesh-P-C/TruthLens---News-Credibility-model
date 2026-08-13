'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Staged copy — the longer we wait, the more honest we get about *why*.
const STAGES = [
  { at: 0,  text: "Reading between the lines…" },
  { at: 4,  text: "Weighing the evidence…" },
  { at: 10, text: "Server may be waking up from a nap…" },
  { at: 22, text: "First request after idle time can take up to 60s" },
  { at: 40, text: "Almost there — cold starts are the worst…" },
];

export default function ColdStartLoader() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 500);
    return () => clearInterval(id);
  }, []);

  const stage = [...STAGES].reverse().find((s) => elapsed >= s.at) ?? STAGES[0];
  const isColdStart = elapsed >= 10;

  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      {/* Track */}
      <div
        style={{
          position: "relative",
          height: "30px",
          width: "100%",
          maxWidth: "200px",
          margin: "0 auto 20px",
          borderBottom: "1px solid var(--rule-dark)",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{ position: "absolute", bottom: "-3px", fontSize: "1.25rem", lineHeight: 1 }}
          animate={{ left: ["0%", "86%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            animate={{ rotate: [0, -6, 6, -6, 0], y: [0, -2, 0, -1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            🕵️
          </motion.span>
        </motion.div>
      </div>

      <motion.p
        key={stage.text}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--muted)",
          minHeight: "14px",
        }}
      >
        {stage.text}
      </motion.p>

      {isColdStart && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "0.72rem",
            color: "var(--muted)",
            marginTop: "12px",
            lineHeight: 1.5,
          }}
        >
          The backend runs on a free tier that sleeps when idle —
          <br />
          it's spinning back up, thanks for hanging on.
        </motion.p>
      )}
    </div>
  );
}   