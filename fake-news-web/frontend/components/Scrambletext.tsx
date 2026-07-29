//Scrambletext==============================

'use client';

import React, { useEffect, useRef, useState } from 'react';

/* ─── Character pool ─────────────────────────────────────────────────────────
   Mix of cases + digits + editorial symbols — feels like a news decoder rather
   than a hacker terminal. The § and — fit the section-label aesthetic. */
const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789—§#@!%?';

const rand = (original: string) =>
  original === ' ' || original === '\u00a0'
    ? original
    : CHARS[Math.floor(Math.random() * CHARS.length)];

/* ─── Types ──────────────────────────────────────────────────────────────── */
type TagName =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'p' | 'span' | 'div';

interface ScrambleTextProps {
  /** The plain-text string to scramble then resolve. */
  text: string;
  /** HTML element to render. Defaults to 'span'. */
  tag?: TagName;
  className?: string;
  style?: React.CSSProperties;
  /** Scramble-to-resolve duration in ms. Defaults to 1000. */
  duration?: number;
  /** Delay before scramble starts (ms) after entering viewport. */
  delay?: number;
  /**
   * Optional JSX rendered once the scramble fully resolves —
   * useful for headings with inline italic / coloured spans.
   * While scrambling, the plain `text` prop is shown as random chars.
   */
  children?: React.ReactNode;
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function ScrambleText({
  text,
  tag = 'span',
  className,
  style,
  duration = 1000,
  delay = 0,
  children,
}: ScrambleTextProps) {
  // SSR: start with real text so the server render is correct.
  const [displayed, setDisplayed] = useState<string>(text);
  const [resolved, setResolved] = useState(false);
  const triggered = useRef(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect user preference — skip animation entirely.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setResolved(true);
      return;
    }

    // Scramble immediately on mount (client-only — below fold is fine).
    setDisplayed(text.split('').map(rand).join(''));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered.current) return;
        triggered.current = true;

        setTimeout(() => {
          const startTime = performance.now();

          const tick = (now: number) => {
            const t = Math.min((now - startTime) / duration, 1);
            // Ease-out quad — first chars resolve quickly, last ones linger.
            const eased       = 1 - Math.pow(1 - t, 2);
            const resolvedN   = Math.floor(eased * text.length);

            setDisplayed(
              text.split('').map((char, i) =>
                i < resolvedN ? char : rand(char)
              ).join('')
            );

            if (t < 1) {
              requestAnimationFrame(tick);
            } else {
              setDisplayed(text); // ensure a clean final state
              setResolved(true);
            }
          };

          requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, duration, delay]);

  // React.createElement avoids the TypeScript polymorphic-ref headache.
  return React.createElement(
    tag,
    { ref, className, style },
    resolved && children ? children : displayed
  );
}