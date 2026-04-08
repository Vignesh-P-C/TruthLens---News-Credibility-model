// BEFORE: GlowingEffect wrapper, glassmorphism textarea, gradient submit button,
//         LoadingSpinner with orbital neon rings, rounded-3xl containers
//
// AFTER:  flat white card with 1px border, sharp textarea, monospaced button,
//         typographic loading indicator, no rounded corners

'use client';

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, AlertCircle } from "lucide-react";
import { checkNews, EXAMPLE_TEXTS, type PredictionResult } from "@/lib/api";
import ResultCard from "./ResultCard";
import DropdownMenu from "./DropdownMenu";

type Status = "idle" | "loading" | "success" | "error";

export default function DetectorSection() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const isReady = text.trim().length >= 20;

  const handleSubmit = useCallback(async () => {
    if (!isReady || status === "loading") return;
    setStatus("loading");
    setResult(null);
    setErrorMsg("");

    const response = await checkNews(text);
    if (response.success) {
      setResult(response.data);
      setStatus("success");
    } else {
      setErrorMsg(response.error.message);
      setStatus("error");
    }
  }, [text, status, isReady]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section
      id="detector"
      style={{
        // BEFORE: dark background with cyber-grid overlay
        // AFTER:  pure paper white — the form IS the focus
        background: "#f5f4f0",
        borderTop: "1px solid #d8d4ce",
      }}
    >
      {/* Section header — newspaper-style column layout */}
      <div
        className="flex items-start"
        style={{ borderBottom: "1px solid #d8d4ce" }}
      >
        {/* Left column: section number */}
        <div
          className="flex-none flex flex-col justify-end"
          style={{
            width: "80px",
            borderRight: "1px solid #d8d4ce",
            padding: "40px 24px",
            alignSelf: "stretch",
          }}
        >
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#7a766f",
              writingMode: "vertical-lr",
              transform: "rotate(180deg)",
            }}
          >
            §02
          </span>
        </div>

        {/* Right column: heading */}
        <div className="flex-1 px-16 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              style={{
                display: "block",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#7a766f",
                marginBottom: "16px",
              }}
            >
              {/* BEFORE: <Sparkles> icon + "Real-time Inference" neon badge
                  AFTER:  plain monospaced eyebrow, no icon */}
              Real-time Inference Engine
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: 1.05,
                color: "#1a1a18",
                letterSpacing: "-0.02em",
              }}
            >
              Credibility{" "}
              <em style={{ fontStyle: "italic" }}>Analyzer</em>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Main form area */}
      <div
        className="grid"
        style={{
          // Two-column: form left, result right
          gridTemplateColumns: "1fr 420px",
          minHeight: "70vh",
        }}
      >
        {/* ── Form column ──────────────────────────────── */}
        <div
          style={{
            borderRight: "1px solid #d8d4ce",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Toolbar */}
          <div
            className="flex items-center justify-between px-16 py-4"
            style={{ borderBottom: "1px solid #d8d4ce" }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#7a766f",
              }}
            >
              {/* BEFORE: "news_content.txt" in muted font — fine but kept */}
              Input — Article or excerpt
            </span>
            {/* BEFORE: DropdownMenu with glassmorphism popup
                AFTER:  same dropdown but flat styling (see DropdownMenu.tsx) */}
            <DropdownMenu
              onClear={() => {
                setText("");
                setStatus("idle");
                setResult(null);
              }}
              onLoadReal={() => {
                setText(EXAMPLE_TEXTS.real);
                setStatus("idle");
                setResult(null);
              }}
              onLoadFake={() => {
                setText(EXAMPLE_TEXTS.fake);
                setStatus("idle");
                setResult(null);
              }}
            />
          </div>

          {/* Textarea — BEFORE: glass/blur, rounded-2xl, cyan focus ring
                        AFTER:  plain white, 1px border, sharp, ink focus */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={status === "loading"}
            placeholder="Paste news content here for analysis…&#10;&#10;Any article, headline, or social media post.&#10;Press ⌘+Enter to submit."
            style={{
              flex: 1,
              resize: "none",
              background: "#ffffff",
              border: "none",
              // BEFORE: border border-cyan-400/20 focus:border-cyan-400/40 rounded-2xl
              // AFTER:  no border on textarea itself — container provides it
              outline: "none",
              padding: "40px 64px",
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 300,
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "#1a1a18",
              opacity: status === "loading" ? 0.5 : 1,
            }}
          />

          {/* Footer bar */}
          <div
            className="flex items-center justify-between px-16 py-4"
            style={{ borderTop: "1px solid #d8d4ce" }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.06em",
                color: "#7a766f",
              }}
            >
              {isReady ? (
                <span style={{ color: "#1e4d36" }}>Ready · </span>
              ) : null}
              {wordCount} words · ⌘+Enter to submit
            </span>

            {/* Submit button — BEFORE: gradient pill with glow and shine
                              AFTER: flat solid, sharp, monospaced */}
            <button
              onClick={handleSubmit}
              disabled={!isReady || status === "loading"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 24px",
                // BEFORE: bg-gradient-to-r from-cyan to-violet, rounded-full
                // AFTER:  ink fill, no radius
                background: isReady && status !== "loading" ? "#1a1a18" : "#d8d4ce",
                color: isReady && status !== "loading" ? "#f5f4f0" : "#7a766f",
                border: "none",
                borderRadius: 0,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.68rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: isReady && status !== "loading" ? "pointer" : "not-allowed",
                transition: "background 0.15s",
              }}
            >
              {status === "loading" ? (
                <>
                  {/* BEFORE: orbital neon spinner animation
                      AFTER:  text cursor blink — editorial, typographic */}
                  <span>Analyzing</span>
                  <span
                    style={{
                      display: "inline-block",
                      animation: "blink 1s step-start infinite",
                    }}
                  >
                    ▋
                  </span>
                </>
              ) : (
                <>
                  <span>Analyze</span>
                  <ArrowRight size={12} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Results column ───────────────────────────── */}
        <div
          style={{
            background: "#eeede8",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Column header */}
          <div
            className="px-8 py-4 flex items-center"
            style={{ borderBottom: "1px solid #d8d4ce" }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#7a766f",
              }}
            >
              Verdict
            </span>
          </div>

          {/* Result area */}
          <div className="flex-1 p-8 flex flex-col justify-center">
            <AnimatePresence mode="wait">

              {/* Idle state */}
              {status === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: "center", padding: "40px 20px" }}
                >
                  {/* Decorative element — not a spinner, a rule */}
                  <div
                    style={{
                      width: "40px",
                      height: "1px",
                      background: "#c0bbb4",
                      margin: "0 auto 24px",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                      fontSize: "1rem",
                      color: "#7a766f",
                      lineHeight: 1.6,
                    }}
                  >
                    Awaiting content
                    <br />
                    for analysis
                  </p>
                </motion.div>
              )}

              {/* Loading */}
              {status === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: "center", padding: "40px 20px" }}
                >
                  {/* BEFORE: orbital neon spinner (three rings)
                      AFTER:  a simple animated rule — typographic */}
                  <motion.div
                    style={{
                      width: "0%",
                      height: "1px",
                      background: "#1a1a18",
                      margin: "0 auto 24px",
                    }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                  />
                  <p
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#7a766f",
                    }}
                  >
                    Processing
                  </p>
                </motion.div>
              )}

              {/* Error */}
              {status === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    // BEFORE: glass border-red-400/20 bg-red-400/5 rounded-2xl
                    // AFTER:  flat, 1px border, sharp
                    background: "#f5ecea",
                    border: "1px solid #d4a09a",
                    padding: "24px",
                    borderRadius: 0,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle size={16} color="#8b2318" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <p
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "0.65rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#8b2318",
                          marginBottom: "8px",
                        }}
                      >
                        Analysis Failed
                      </p>
                      <p
                        style={{
                          fontFamily: "'IBM Plex Sans', sans-serif",
                          fontWeight: 300,
                          fontSize: "0.85rem",
                          color: "#4a4a46",
                          lineHeight: 1.6,
                        }}
                      >
                        {errorMsg}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Success */}
              {status === "success" && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <ResultCard result={result} />
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Model stats — BEFORE: three glass cards with gradient bars
                          AFTER:  simple text list, no cards */}
          <div style={{ borderTop: "1px solid #d8d4ce" }}>
            {[
              { label: "Model",    value: "BERT-Base Uncased" },
              { label: "Corpus",   value: "LIAR + WELFake · 44K" },
              { label: "Accuracy", value: "94.2% F1 weighted" },
            ].map(({ label, value }, i) => (
              <div
                key={label}
                className="flex items-center justify-between px-8 py-3"
                style={{
                  borderBottom: i < 2 ? "1px solid #d8d4ce" : "none",
                }}
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
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.8rem",
                    color: "#1a1a18",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive: stack columns on mobile */}
      <style>{`
        @media (max-width: 900px) {
          #detector > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
