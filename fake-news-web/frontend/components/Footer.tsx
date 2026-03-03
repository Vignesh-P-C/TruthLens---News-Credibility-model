'use client';

import { motion } from 'framer-motion';
import { Zap, Github, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-border py-12 px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2.5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" fill="white" />
          </div>
          <span className="font-display font-700 text-base">
            Truth<span className="text-cyan-400">Lens</span>
          </span>
        </motion.div>

        {/* Center */}
        <p className="text-xs font-mono text-muted-foreground text-center">
          Built with Next.js · BERT Transformer · FastAPI ·{' '}
          <span className="text-cyan-400">Open Source</span>
        </p>

        {/* Links */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            API Docs
          </a>
        </div>
      </div>
    </footer>
  );
}
