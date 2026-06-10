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
  { icon: Twitter, href: "https://twitter.com",             label: "Twitter" },
  { icon: Github,  href: "https://github.com/Vignesh-P-C",  label: "GitHub"  },
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
        {/* Logo */}
        <div
          className="px-8 py-8"
          style={{ borderBottom: "1px solid var(--sidebar-border)" }}
        >
          <div className="mb-1">
            {/* Sigil — fill matches sidebar bg for contrast */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" fill="#f5f4f0" />
              <rect x="6"  y="6"  width="10" height="24" fill="#1a1a18" />
              <rect x="20" y="6"  width="10" height="10" fill="#1a1a18" />
              <rect x="20" y="22" width="10" height="8"  fill="#1a1a18" />
            </svg>
          </div>
          <div className="mt-4">
            <span
              className="block text-lg leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                color: "var(--sidebar-text)",
                letterSpacing: "-0.01em",
              }}
            >
              Truth
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                Lens
              </span>
            </span>
            <span
              className="block mt-1"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--sidebar-muted)",
              }}
            >
              News Analysis Engine
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 flex flex-col pt-4">
          {navItems.map((item, i) => (
            <motion.button
              key={item.label}
              onClick={() => {
                setActiveItem(item.label);
                scrollTo(item.href);
              }}
              className="text-left w-full flex items-center px-8 py-3"
              style={{
                borderBottom: "1px solid var(--sidebar-nav-border)",
                color: activeItem === item.label
                  ? "var(--sidebar-text)"
                  : "var(--sidebar-dim)",
                fontFamily: "var(--font-body)",
                fontWeight: activeItem === item.label ? 400 : 300,
                fontSize: "0.95rem",
                letterSpacing: "0.005em",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              whileHover={{ color: "var(--sidebar-text)" }}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              {item.label}
            </motion.button>
          ))}

          {/* Tech stack note */}
          <div
            className="px-8 py-6"
            style={{ borderBottom: "1px solid var(--sidebar-nav-border)" }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--sidebar-stack)",
                lineHeight: 1.8,
              }}
            >
              DistilBERT · FastAPI<br />
              Next.js · Vercel · Render
            </p>
          </div>
        </nav>

        {/* Bottom row — social + theme toggle */}
        <div
          className="px-8 py-6 flex items-center justify-between"
          style={{ borderTop: "1px solid var(--sidebar-border)" }}
        >
          <div className="flex items-center gap-5">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  color: "var(--sidebar-icon)",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--sidebar-icon-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--sidebar-icon)")
                }
              >
                <Icon size={15} />
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
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.1rem",
            color: "var(--sidebar-text)",
            fontStyle: "italic",
          }}
        >
          TruthLens
        </span>
        <div className="flex items-center gap-3">
          <ThemeToggle forceDark />
          <button
            onClick={() => scrollTo("#detector")}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--sidebar-text)",
              padding: "8px 16px",
              border: "1px solid var(--sidebar-icon)",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            Analyze
          </button>
        </div>
      </header>
    </>
  );
}