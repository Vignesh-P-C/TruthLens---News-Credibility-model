'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.8]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: 'hsl(220 20% 5%)',
          opacity: bgOpacity,
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        style={{ opacity: borderOpacity }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2.5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <motion.div
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center"
              animate={{ boxShadow: ['0 0 10px rgba(34,211,238,0.3)', '0 0 20px rgba(139,92,246,0.4)', '0 0 10px rgba(34,211,238,0.3)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Zap className="w-4 h-4 text-white" fill="white" />
            </motion.div>
          </div>
          <span className="font-display font-700 text-lg tracking-tight text-foreground">
            Truth<span className="text-cyan-400">Lens</span>
          </span>
        </motion.div>

        {/* Nav links */}
        <motion.nav
          className="hidden md:flex items-center gap-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {['Technology', 'About', 'API Docs'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </motion.nav>

        {/* Right side */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ThemeToggle />
          <motion.button
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-medium
              bg-gradient-to-r from-cyan-400 to-violet-500 text-background
              hover:from-cyan-300 hover:to-violet-400 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('detector')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Try Free
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  );
}
