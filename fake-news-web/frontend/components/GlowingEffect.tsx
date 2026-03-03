'use client';

import { useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface GlowingEffectProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'violet' | 'green' | 'red';
  disabled?: boolean;
}

const glowStyles = {
  cyan: 'hover:shadow-glow-cyan hover:border-cyan-400/40',
  violet: 'hover:shadow-glow-violet hover:border-violet-500/40',
  green: 'hover:shadow-glow-green hover:border-green-400/40',
  red: 'hover:shadow-glow-red hover:border-red-400/40',
};

export default function GlowingEffect({
  children,
  className,
  glowColor = 'cyan',
  disabled = false,
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  }, [disabled]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        'relative transition-all duration-300',
        !disabled && [
          glowStyles[glowColor],
          'group',
        ],
        className
      )}
    >
      {!disabled && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${
              glowColor === 'cyan' ? 'rgba(34,211,238,0.06)' :
              glowColor === 'violet' ? 'rgba(139,92,246,0.06)' :
              glowColor === 'green' ? 'rgba(34,197,94,0.06)' :
              'rgba(239,68,68,0.06)'
            }, transparent 70%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
