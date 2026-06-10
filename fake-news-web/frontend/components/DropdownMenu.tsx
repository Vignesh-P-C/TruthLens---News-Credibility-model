'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface DropdownMenuProps {
  onClear: () => void;
  onLoadReal: () => void;
  onLoadFake: () => void;
}

const items = [
  { id: "clear", label: "Clear text",              sub: "Remove all content"        },
  { id: "real",  label: "Load — credible example", sub: "Factual journalism sample"  },
  { id: "fake",  label: "Load — false example",    sub: "Misinformation sample"      },
] as const;

export default function DropdownMenu({ onClear, onLoadReal, onLoadFake }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handle = (id: typeof items[number]["id"]) => {
    setOpen(false);
    if (id === "clear") onClear();
    if (id === "real")  onLoadReal();
    if (id === "fake")  onLoadFake();
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 12px",
          background: "transparent",
          border: `1px solid ${open ? "var(--ink)" : "var(--rule)"}`,
          borderRadius: 0,
          cursor: "pointer",
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: open ? "var(--ink)" : "var(--muted)",
          transition: "border-color 0.15s, color 0.15s",
        }}
      >
        <span>Examples</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.15 }}>
          <ChevronDown size={11} />
        </motion.div>
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
              right: 0,
              top: "calc(100% + 4px)",
              width: "260px",
              background: "var(--surface)",
              border: "1px solid var(--rule)",
              borderRadius: 0,
              zIndex: 50,
              overflow: "hidden",
            }}
          >
            {items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => handle(item.id)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 16px",
                  background: "transparent",
                  border: "none",
                  borderBottom: i < items.length - 1 ? "1px solid var(--rule)" : "none",
                  cursor: "pointer",
                  display: "block",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--paper-dark)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    fontSize: "0.85rem",
                    color: "var(--ink)",
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.06em",
                    color: "var(--muted)",
                    marginTop: "2px",
                  }}
                >
                  {item.sub}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}