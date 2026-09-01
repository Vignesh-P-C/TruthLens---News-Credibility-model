//DetectionSection
'use client';

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, AlertCircle } from "lucide-react";
import { checkNews, EXAMPLE_TEXTS, type PredictionResult } from "@/lib/api";
import ResultCard from "./ResultCard";
import DropdownMenu from "./DropdownMenu";
import ColdStartLoader from "./ColdStartLoader";
import InfoTooltip from "./InfoTooltip";

type Status = "idle" | "loading" | "success" | "error";

export default function DetectorSection() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [liveMessage, setLiveMessage] = useState("");

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const isReady = text.trim().length >= 20;

  // Screen-reader announcement text — mirrors `status` (and the data that
  // goes with it) so assistive tech gets the same information sighted users
  // get from the animated result card, without duplicating that markup.
  useEffect(() => {
    if (status === "idle") {
      setLiveMessage("");
    } else if (status === "loading") {
      setLiveMessage("Analyzing article for credibility…");
    } else if (status === "success" && result) {
      const verdict = result.label === "REAL" ? "Real" : "Fake";
      setLiveMessage(
        `Analysis complete. Verdict: ${verdict}, ${Math.round(result.confidence)} percent confidence.`
      );
    } else if (status === "error") {
      setLiveMessage(`Analysis failed. ${errorMsg}`);
    }
  }, [status, result, errorMsg]);

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
        background: "var(--paper)",
        borderTop: "1px solid var(--rule)",
      }}
    >
      {/* Screen-reader-only live announcer — always mounted (not inside
          AnimatePresence, which unmounts/remounts and can eat the update) */}
      <div role="status" aria-live="polite" className="sr-only">
        {liveMessage}
      </div>

      {/* Section header */}
      <div
        className="flex items-start"
        style={{ borderBottom: "1px solid var(--rule)" }}
      >
        {/* Section number */}
        <div
          className="flex-none flex flex-col justify-end"
          style={{
            width: "80px",
            borderRight: "1px solid var(--rule)",
            padding: "40px 24px",
            alignSelf: "stretch",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              writingMode: "vertical-lr",
              transform: "rotate(180deg)",
            }}
          >
            §02
          </span>
        </div>

        {/* Heading */}
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
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "16px",
              }}
            >
              Real-time Inference Engine
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: 1.05,
                color: "var(--ink)",
                letterSpacing: "-0.02em",
              }}
            >
              Credibility{" "}
              <em style={{ fontStyle: "italic" }}>Analyzer</em>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Main two-column layout */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "1fr 420px",
          minHeight: "70vh",
        }}
      >
        {/* ── Form column ──────────────────────────────── */}
        <div
          style={{
            borderRight: "1px solid var(--rule)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Toolbar */}
          <div
            className="flex items-center justify-between px-16 py-4"
            style={{ borderBottom: "1px solid var(--rule)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              Input — Article or excerpt
            </span>
            <DropdownMenu
              onClear={() => { setText(""); setStatus("idle"); setResult(null); }}
              onLoadReal={() => { setText(EXAMPLE_TEXTS.real); setStatus("idle"); setResult(null); }}
              onLoadFake={() => { setText(EXAMPLE_TEXTS.fake); setStatus("idle"); setResult(null); }}
            />
          </div>

          {/* Textarea */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={status === "loading"}
            placeholder={
              "Paste news content here for analysis…\n\nAny news article or excerpt in English.\nPress Ctrl/⌘+Enter to submit."
            }
            style={{
              flex: 1,
              resize: "none",
              background: "var(--surface)",
              border: "none",
              outline: "none",
              padding: "40px 64px",
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "var(--ink)",
              opacity: status === "loading" ? 0.5 : 1,
            }}
          />

          {/* Truncation warning — model only sees the first ~190 words */}
          {wordCount > 190 && (
            <div
              style={{
                padding: "8px 16px",
                background: "var(--fake-bg)",
                borderTop: "1px solid var(--fake-border)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.04em",
                color: "var(--fake-fg)",
              }}
            >
              Only the first ~190 words will be analyzed — trim for best accuracy.
            </div>
          )}

          {/* Footer bar */}
          <div
            className="flex items-center justify-between px-16 py-4"
            style={{ borderTop: "1px solid var(--rule)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.06em",
                color: "var(--muted)",
              }}
            >
              {isReady && (
                <span style={{ color: "var(--real-fg)" }}>Ready · </span>
              )}
              {wordCount} words · Ctrl/⌘+Enter to submit
            </span>

            <button
              onClick={handleSubmit}
              disabled={!isReady || status === "loading"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 24px",
                background: isReady && status !== "loading" ? "var(--ink)" : "var(--rule)",
                color: isReady && status !== "loading" ? "var(--paper)" : "var(--muted)",
                border: "none",
                borderRadius: 0,
                fontFamily: "var(--font-mono)",
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
                  <span>Analyzing</span>
                  <span style={{ display: "inline-block", animation: "blink 1s step-start infinite" }}>
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
            background: "var(--paper-dark)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Column header */}
          <div
            className="px-8 py-4 flex items-center justify-between"
            style={{ borderBottom: "1px solid var(--rule)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              Verdict
            </span>
            <InfoTooltip title="How to read this">
              REAL/FAKE is the model's best guess from language patterns — it's
              not a fact-check. Confidence reflects how sure the model is
              about its own prediction, not how true the article is.
              <br />
              <br />
              90%+ is a strong signal. Under 70% is closer to a coin flip.
              Always verify with primary sources before sharing.
            </InfoTooltip>
          </div>

          {/* Result area */}
          <div className="flex-1 p-8 flex flex-col justify-center">
            <AnimatePresence mode="wait">

              {status === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: "center", padding: "40px 20px" }}
                >
                  <div style={{ width: "40px", height: "1px", background: "var(--rule-dark)", margin: "0 auto 24px" }} />
                  <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1rem", color: "var(--muted)", lineHeight: 1.6 }}>
                    Awaiting content<br />for analysis
                  </p>
                </motion.div>
              )}

              {status === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ColdStartLoader />
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ background: "var(--fake-bg)", border: "1px solid var(--fake-border)", padding: "24px", borderRadius: 0 }}
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle size={16} style={{ color: "var(--fake-fg)", flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fake-fg)", marginBottom: "8px" }}>
                        Analysis Failed
                      </p>
                      <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.85rem", color: "var(--ink-light)", lineHeight: 1.6 }}>
                        {errorMsg}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {status === "success" && result && (
                <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <ResultCard result={result} />
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Model stats */}
          <div style={{ borderTop: "1px solid var(--rule)" }}>
            {[
              { label: "Model",    value: "DistilBERT-Base Uncased" },
              { label: "Corpus",   value: "LIAR + WELFake · 71K"   },
              { label: "Accuracy", value: "95.05% F1 weighted"       },
            ].map(({ label, value }, i) => (
              <div
                key={label}
                className="flex items-center justify-between px-8 py-3"
                style={{ borderBottom: i < 2 ? "1px solid var(--rule)" : "none" }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
                  {label}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.8rem", color: "var(--ink)" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #detector > div:last-child { grid-template-columns: 1fr !important; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  );
}