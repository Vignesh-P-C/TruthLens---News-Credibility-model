'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Twitter, Github, Rss } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Analysis",    href: "#detector", hasChildren: false },
  { label: "Technology",  href: "#about",    hasChildren: true  },
  { label: "Methodology", href: "#about",    hasChildren: false },
  { label: "Open Data",   href: "#",         hasChildren: false },
  { label: "API Access",  href: "#",         hasChildren: false },
  { label: "Contact",     href: "#",         hasChildren: false },
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github,  href: "#", label: "GitHub"  },
  { icon: Rss,     href: "#", label: "RSS"     },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Analysis");

  const scrollTo = (href: string) => {
    if (href.startsWith("#") && href.length > 1) {
      const el = document.getElementById(href.slice(1));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── Desktop Sidebar ─────────────────────────────────── */}
      <aside
        className="hidden md:flex flex-col fixed top-0 left-0 h-screen z-50"
        style={{
          width: "260px",
          background: "#0a0a0a",
          borderRight: "1px solid #1e1e1e",
        }}
      >
        {/* Logo */}
        <div
          className="px-8 py-8"
          style={{ borderBottom: "1px solid #1e1e1e" }}
        >
          <div className="mb-1">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" fill="#f5f4f0" />
              <rect x="6" y="6" width="10" height="24" fill="#0a0a0a" />
              <rect x="20" y="6" width="10" height="10" fill="#0a0a0a" />
              <rect x="20" y="22" width="10" height="8" fill="#0a0a0a" />
            </svg>
          </div>
          <div className="mt-4">
            <span
              className="block text-lg leading-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                color: "#f0ede8",
                letterSpacing: "-0.01em",
              }}
            >
              Truth
              <span style={{ fontStyle: "italic", color: "#c8b89a" }}>
                Lens
              </span>
            </span>
            <span
              className="block mt-1"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#4a4a46",
              }}
            >
              News Analysis Engine
            </span>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col pt-4">
          {navItems.map((item, i) => (
            <motion.button
              key={item.label}
              onClick={() => {
                setActiveItem(item.label);
                scrollTo(item.href);
              }}
              className="text-left w-full flex items-center justify-between px-8 py-3 transition-colors duration-150"
              style={{
                borderBottom: "1px solid #1e1e1e",
                color:
                  activeItem === item.label
                    ? "#f0ede8"
                    : "rgba(240,237,232,0.4)",
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: activeItem === item.label ? 400 : 300,
                fontSize: "0.95rem",
                letterSpacing: "0.005em",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              whileHover={{ color: "#f0ede8" }}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <span>{item.label}</span>
              {item.hasChildren && (
                <Plus size={12} style={{ color: "rgba(240,237,232,0.3)" }} />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Bottom row — social icons + theme toggle */}
        <div
          className="px-8 py-6 flex items-center justify-between"
          style={{ borderTop: "1px solid #1e1e1e" }}
        >
          <div className="flex items-center gap-5">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="transition-colors duration-150"
                style={{ color: "rgba(240,237,232,0.3)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(240,237,232,0.9)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(240,237,232,0.3)")
                }
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          {/* Theme toggle — flush right, always on dark sidebar bg */}
          <ThemeToggle forceDark />
        </div>
      </aside>

      {/* ── Mobile top bar ─────────────────────────────────── */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "#0a0a0a",
          borderBottom: "1px solid #1e1e1e",
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.1rem",
            color: "#f0ede8",
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
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#f0ede8",
              padding: "8px 16px",
              border: "1px solid rgba(240,237,232,0.3)",
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