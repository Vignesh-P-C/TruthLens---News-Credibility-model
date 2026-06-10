'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  /**
   * forceDark — pass true when the toggle sits on the always-black sidebar.
   * It keeps the icon/border in the sidebar's cream palette regardless of
   * whatever theme the main content is currently rendering.
   */
  forceDark?: boolean;
}

export default function ThemeToggle({ className, forceDark }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render a same-size placeholder before mount to avoid layout shift
  if (!mounted) {
    return (
      <div
        className={className}
        style={{
          width: 28,
          height: 28,
          border: "1px solid #1e1e1e",
          flexShrink: 0,
        }}
      />
    );
  }

  const isDark = theme === 'dark';

  // Colour tokens — sidebar context always uses the cream-on-black palette.
  // Main content context uses ink-on-paper when in light mode.
  const borderColor = forceDark
    ? "rgba(240,237,232,0.2)"
    : isDark
    ? "rgba(240,237,232,0.2)"
    : "rgba(26,26,24,0.25)";

  const borderHover = forceDark
    ? "rgba(240,237,232,0.7)"
    : isDark
    ? "rgba(240,237,232,0.7)"
    : "rgba(26,26,24,0.8)";

  const iconColor = forceDark
    ? "rgba(240,237,232,0.55)"
    : isDark
    ? "rgba(240,237,232,0.55)"
    : "rgba(26,26,24,0.6)";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={className}
      style={{
        position: "relative",
        width: 28,
        height: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        border: `1px solid ${borderColor}`,
        borderRadius: 0,            // editorial — no rounded corners
        cursor: "pointer",
        flexShrink: 0,
        padding: 0,
        transition: "border-color 0.15s ease",
      }}
      whileHover={{ borderColor: borderHover }}
      whileTap={{ scale: 0.92 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {isDark ? (
            <Moon size={12} style={{ color: iconColor }} />
          ) : (
            <Sun size={12} style={{ color: iconColor }} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}