'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Twitter, Github } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Analysis",   href: "#detector" },
  { label: "Technology", href: "#about"    },
];

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com",            label: "Twitter" },
  { icon: Github,  href: "https://github.com/Vignesh-P-C", label: "GitHub"  },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Analysis");

  const scrollTo = (href: string) => {
    if (href.startsWith("#") && href.length > 1) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── Desktop Sidebar ─────────────────────────────────── */}
      <aside
        className="hidden md:flex flex-col fixed top-0 left-0 h-screen z-50"
        style={{
          width: "260px",
          background: "var(--sidebar-bg)",
          borderRight: "1px solid var(--sidebar-border)",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* ── Logo block ── */}
        <div
          className="px-8 py-8"
          style={{ borderBottom: "1px solid var(--sidebar-border)" }}
        >
          {/* Sigil — cream bg, fill matches sidebar so it feels native */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" fill="#f5f0e8" />
            <rect x="6"  y="6"  width="10" height="24" fill="var(--sidebar-bg)" />
            <rect x="20" y="6"  width="10" height="10" fill="var(--sidebar-bg)" />
            <rect x="20" y="22" width="10" height="8"  fill="var(--sidebar-bg)" />
          </svg>

          <div className="mt-4">
            {/* Wordmark — Truth plain, Lens amber italic */}
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "1.2rem",
                letterSpacing: "-0.01em",
                lineHeight: 1,
                color: "#f5f0e8",
              }}
            >
              Truth
              <em style={{ fontStyle: "italic", color: "#c8a06a" }}>Lens</em>
            </div>

            {/* Subline — eyebrow caps */}
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--sidebar-muted)",
                marginTop: "6px",
              }}
            >
              News Analysis Engine
            </div>
          </div>
        </div>

        {/* ── Nav links ── */}
        <nav className="flex-1 flex flex-col" style={{ paddingTop: "8px" }}>
          {navItems.map((item, i) => {
            const isActive = activeItem === item.label;
            return (
              <motion.button
                key={item.label}
                onClick={() => {
                  setActiveItem(item.label);
                  scrollTo(item.href);
                }}
                className="text-left w-full"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 32px",
                  paddingLeft: isActive ? "30px" : "32px",
                  borderLeft: isActive
                    ? "2px solid #c8a06a"
                    : "2px solid transparent",
                  borderBottom: "1px solid var(--sidebar-nav-border)",
                  color: isActive ? "#f5f0e8" : "rgba(240,230,210,0.4)",
                  fontFamily: "var(--font-body)",
                  fontWeight: isActive ? 400 : 300,
                  fontSize: "0.95rem",
                  letterSpacing: "0.01em",
                  background: isActive
                    ? "rgba(200,160,106,0.06)"
                    : "transparent",
                  cursor: "pointer",
                  transition: "color 0.15s, background 0.15s",
                }}
                whileHover={{
                  color: "#f5f0e8",
                  backgroundColor: "rgba(200,160,106,0.04)",
                }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                {/* Active dot indicator */}
                {isActive && (
                  <span
                    style={{
                      display: "inline-block",
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "#c8a06a",
                      marginRight: "10px",
                      flexShrink: 0,
                    }}
                  />
                )}
                {item.label}
              </motion.button>
            );
          })}

          {/* Tech stack — small print */}
          <div
            style={{
              padding: "20px 32px",
              borderBottom: "1px solid var(--sidebar-nav-border)",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "1px",
                background: "var(--sidebar-border)",
                marginBottom: "12px",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.56rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--sidebar-stack)",
                lineHeight: 2,
              }}
            >
              DistilBERT · FastAPI<br />
              Next.js · Vercel · Render
            </p>
          </div>
        </nav>

        {/* ── Bottom row — social + theme toggle ── */}
        <div
          style={{
            padding: "20px 32px",
            borderTop: "1px solid var(--sidebar-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  color: "rgba(240,230,210,0.3)",
                  transition: "color 0.15s",
                  display: "flex",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(240,230,210,0.85)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(240,230,210,0.3)")
                }
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
          <ThemeToggle forceDark />
        </div>
      </aside>

      {/* ── Mobile top bar ─────────────────────────────────── */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "var(--sidebar-bg)",
          borderBottom: "1px solid var(--sidebar-border)",
          transition: "background 0.3s ease",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.1rem",
            color: "#f5f0e8",
          }}
        >
          Truth<em style={{ fontStyle: "italic", color: "#c8a06a" }}>Lens</em>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <ThemeToggle forceDark />
          <button
            onClick={() => scrollTo("#detector")}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#f5f0e8",
              padding: "8px 16px",
              border: "1px solid rgba(240,230,210,0.25)",
              background: "transparent",
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(240,230,210,0.6)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(240,230,210,0.25)")
            }
          >
            Analyze
          </button>
        </div>
      </header>
    </>
  );
}