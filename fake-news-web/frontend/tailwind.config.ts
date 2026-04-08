import type { Config } from "tailwindcss";

const config: Config = {
  // REMOVED: darkMode: ["class"] — single light theme now
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── Fonts ────────────────────────────────────────────── */
      fontFamily: {
        // BEFORE: Syne + DM Sans + JetBrains
        // AFTER:  Playfair Display + IBM Plex Sans + IBM Plex Mono
        display: ["Playfair Display", "Georgia", "serif"],
        body:    ["IBM Plex Sans", "Helvetica", "sans-serif"],
        mono:    ["IBM Plex Mono", "Courier New", "monospace"],
      },

      /* ── Colors ───────────────────────────────────────────── */
      colors: {
        // BEFORE: cyan-400, violet-500, neon palette
        // AFTER:  warm editorial neutrals
        paper:   "#f5f4f0",
        "paper-dark": "#eeede8",
        ink:     "#1a1a18",
        "ink-light": "#4a4a46",
        sidebar: "#0a0a0a",
        rule:    "#d8d4ce",
        "rule-dark": "#c0bbb4",
        muted:   "#7a766f",
        accent:  "#c8b89a",

        // Semantic result colors — muted, not neon
        real: {
          fg:     "#1e4d36",
          bg:     "#eaf2ec",
          border: "#a3c4ab",
        },
        fake: {
          fg:     "#8b2318",
          bg:     "#f5ecea",
          border: "#d4a09a",
        },
      },

      /* ── Spacing additions ─────────────────────────────────── */
      spacing: {
        "sidebar": "260px",
        "18": "4.5rem",
        "22": "5.5rem",
      },

      /* ── Border radius ─────────────────────────────────────── */
      // BEFORE: rounded-full, rounded-2xl, rounded-3xl
      // AFTER:  mostly 0 (sharp), max rounded-sm for subtle softening
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "2px",
        md: "4px",
      },

      /* ── Shadows ───────────────────────────────────────────── */
      // BEFORE: glow-cyan, glow-violet, glow-green, glow-red, glass
      // AFTER:  one subtle elevation shadow
      boxShadow: {
        // REMOVED: shadow-glow-cyan, shadow-glow-green, etc.
        card: "0 1px 3px rgba(26,26,24,0.06), 0 1px 8px rgba(26,26,24,0.04)",
        // Very subtle lift, no color, no bloom
        lift: "0 4px 16px rgba(26,26,24,0.08)",
      },

      /* ── Typography ────────────────────────────────────────── */
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "1.4" }],
        "label": ["0.7rem", { lineHeight: "1.4", letterSpacing: "0.1em" }],
      },

      /* ── Animations ────────────────────────────────────────── */
      // BEFORE: aurora, float, glow-pulse, shimmer, slide-up
      // AFTER:  fade-up, fade-in, shake (only what's meaningful)
      animation: {
        "fade-up":  "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in":  "fade-in 0.5s ease-out both",
        "shake":    "shake 0.45s cubic-bezier(.36,.07,.19,.97) both",
        // REMOVED: aurora, float, glow-pulse, shimmer, slide-up
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "shake": {
          "10%, 90%":       { transform: "translate3d(-1px,0,0)" },
          "20%, 80%":       { transform: "translate3d(2px,0,0)" },
          "30%, 50%, 70%":  { transform: "translate3d(-3px,0,0)" },
          "40%, 60%":       { transform: "translate3d(3px,0,0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
