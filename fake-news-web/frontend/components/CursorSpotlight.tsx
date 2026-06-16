'use client';

import { useEffect, useRef } from 'react';

export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        el.style.background = `radial-gradient(
          280px circle at ${e.clientX}px ${e.clientY}px,
          rgba(200,160,106,0.07) 0%,
          rgba(200,160,106,0.025) 40%,
          transparent 70%
        )`;
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9,
        pointerEvents: 'none',
        transition: 'background 0.06s ease',
      }}
    />
  );
}