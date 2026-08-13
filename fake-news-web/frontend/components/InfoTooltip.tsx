'use client';

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info } from "lucide-react";

interface InfoTooltipProps {
  title: string;
  children: React.ReactNode;
  align?: "left" | "right";
}

export default function InfoTooltip({ title, children, align = "right" }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const positionStyle: React.CSSProperties =
    align === "right" ? { right: 0 } : { left: 0 };

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-flex" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={title}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "15px",
          height: "15px",
          background: "transparent",
          border: `1px solid ${open ? "var(--ink)" : "var(--muted)"}`,
          borderRadius: "50%",
          cursor: "pointer",
          color: open ? "var(--ink)" : "var(--muted)",
          padding: 0,
          transition: "border-color 0.15s, color 0.15s",
        }}
      >
        <Info size={9} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.14 }}
            style={{
              position: "absolute",
              ...positionStyle,
              top: "calc(100% + 8px)",
              width: "250px",
              background: "var(--surface)",
              border: "1px solid var(--rule)",
              borderRadius: 0,
              zIndex: 50,
              padding: "14px 16px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
            }}
          >
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ink)",
                marginBottom: "8px",
              }}
            >
              {title}
            </span>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "0.76rem",
                lineHeight: 1.6,
                color: "var(--ink-light)",
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}