import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        /* BEFORE: Syne (geometric sans) + DM Sans + JetBrains Mono
           AFTER:  Playfair Display (editorial serif) + IBM Plex Sans + IBM Plex Mono */
        display: ["Playfair Display", "Georgia", "'Times New Roman'", "serif"],
        body:    ["IBM Plex Sans", "Helvetica", "sans-serif"],
        mono:    ["IBM Plex Mono", "'Courier New'", "monospace"],
      },

      colors: {
        /* All token names preserved — values replaced with editorial palette */
        background:   "hsl(var(--background))",
        foreground:   "hsl(var(--foreground))",
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT:    "hsl(var(--primary))",    /* was: cyan-400. now: near-black ink */
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",  /* was: violet-500. now: warm light gray */
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))", /* was: cool blue-gray. now: warm gray #7a766f */
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",     /* was: cyan. now: sand #c8b89a */
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",           /* was: dark blue-gray. now: warm #d8d4ce */
        input:  "hsl(var(--input))",
        ring:   "hsl(var(--ring))",

        /* BEFORE: cyan and violet neon tokens
           AFTER:  removed — use primary/accent instead */

        /* Result semantics — kept as named tokens, values de-neonized */
        real: {
          fg:     "#1e4d36",  /* was: green-400 #4ade80. now: forest */
          bg:     "#eaf2ec",
          border: "#a3c4ab",
        },
        fake: {
          fg:     "#8b2318",  /* was: red-400 #f87171. now: muted red */
          bg:     "#f5ecea",
          border: "#d4a09a",
        },
      },

      animation: {
        /* BEFORE: aurora, float, glow-pulse, shimmer, shake, slide-up, fade-in, progress-fill
           AFTER:  only fade-up + fade-in + shake (the rest were decorative) */
        "fade-up":   "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in":   "fade-in 0.5s ease-out both",
        "shake":     "shake 0.45s cubic-bezier(.36,.07,.19,.97) both",
        "slide-up":  "fade-up 0.6s cubic-bezier(0.16,1,0.3,1)",  /* alias kept */

        /* These remain defined but no component should reference them anymore */
        "aurora":       "none",
        "float":        "none",
        "glow-pulse":   "none",
        "shimmer":      "none",
        "progress-fill":"none",
      },

      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "shake": {
          "10%, 90%":      { transform: "translate3d(-1px,0,0)" },
          "20%, 80%":      { transform: "translate3d(2px,0,0)"  },
          "30%, 50%, 70%": { transform: "translate3d(-3px,0,0)" },
          "40%, 60%":      { transform: "translate3d(3px,0,0)"  },
        },

        /* Kept so existing references don't throw build errors, but effectively no-op */
        "aurora":       { "0%,100%": {} },
        "float":        { "0%,100%": {} },
        "glow-pulse":   { "0%,100%": {} },
        "shimmer":      { "0%,100%": {} },
        "progress-fill":{ "0%,100%": {} },
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "cyber-grid": `
          linear-gradient(hsl(var(--border) / 0.5) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--border) / 0.5) 1px, transparent 1px)
        `,
      },

      backgroundSize: {
        "cyber-grid": "60px 60px",
      },

      boxShadow: {
        /* BEFORE: glowing neon shadows
           AFTER:  one subtle lift shadow — no color, no bloom */
        "glow-cyan":   "0 1px 3px hsl(var(--border))",           /* neutered */
        "glow-violet": "0 1px 3px hsl(var(--border))",           /* neutered */
        "glow-green":  "0 1px 3px hsl(var(--real-border, #a3c4ab))", /* neutered */
        "glow-red":    "0 1px 3px hsl(var(--fake-border, #d4a09a))", /* neutered */
        "glass":       "0 1px 3px hsl(var(--border) / 0.4), 0 1px 8px hsl(var(--border) / 0.2)",
        /* New — subtle editorial card lift */
        "card":        "0 1px 3px hsl(var(--foreground) / 0.06), 0 1px 8px hsl(var(--foreground) / 0.04)",
      },

      borderRadius: {
        /* BEFORE: rounded-full (pill), rounded-2xl, rounded-3xl everywhere
           AFTER:  sharp by default — a 2px max for mild softening */
        none:    "0px",
        sm:      "2px",
        DEFAULT: "2px",   /* global default now sharp */
        md:      "4px",
        lg:      "4px",
        xl:      "4px",
        "2xl":   "4px",   /* components using rounded-2xl get 4px, not 16px */
        "3xl":   "4px",
        full:    "2px",   /* pill buttons become sharp */
      },

      backdropBlur: {
        xs: "0px",        /* BEFORE: 2px blur. AFTER: none */
      },
    },
  },
  plugins: [],
};

export default config;