'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Shield, Brain, BarChart2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const AuroraBackground = dynamic(() => import('./AuroraBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background" />,
});

const featurePills = [
  { icon: Brain, label: 'Transformer NLP', delay: 0.6 },
  { icon: Shield, label: '94.2% Accuracy', delay: 0.7 },
  { icon: BarChart2, label: 'Real-time Analysis', delay: 0.8 },
];

export default function HeroSection() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);

  const handleScrollToDetector = () => {
    document.getElementById('detector')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js aurora shader background */}
      <div className="absolute inset-0">
        <AuroraBackground className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Cyber grid overlay */}
      <div className="absolute inset-0 cyber-grid-bg opacity-60" />

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent z-10" />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Hero content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass border border-cyan-400/20 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-cyan-400 font-mono text-xs font-medium tracking-wider uppercase">
            Powered by Transformer AI
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-800 leading-[0.95] tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="block text-foreground">AI-Powered</span>
          <span className="block gradient-text">News Credibility</span>
          <span className="block text-foreground">Detection</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          Leveraging BERT-based transformer architecture trained on 44K+ articles to
          detect misinformation with state-of-the-art precision. Paste any news text
          for instant credibility analysis.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          {featurePills.map(({ icon: Icon, label, delay }) => (
            <motion.div
              key={label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border text-sm text-muted-foreground"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay }}
            >
              <Icon className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-mono text-xs">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            onClick={handleScrollToDetector}
            className="group relative px-8 py-4 rounded-full font-body font-medium text-base overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full" />
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-full" />
            <span className="relative text-background flex items-center gap-2">
              Analyze News Now
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </motion.button>

          <motion.button
            className="px-8 py-4 rounded-full font-body font-medium text-base glass border border-border text-muted-foreground hover:text-foreground hover:border-cyan-400/30 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Documentation
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border border-border flex items-start justify-center pt-2 cursor-pointer mx-auto"
            onClick={handleScrollToDetector}
          >
            <motion.div
              className="w-1 h-2.5 rounded-full bg-cyan-400"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 3D floating stat cards */}
      <motion.div
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:block"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <motion.div
          className="glass border border-border rounded-2xl p-4 w-44"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="text-2xl font-display font-800 gradient-text mb-1">44K+</div>
          <div className="text-xs font-mono text-muted-foreground">Training articles</div>
          <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '88%' }}
              transition={{ delay: 1.2, duration: 1.5, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        <motion.div
          className="glass border border-border rounded-2xl p-4 w-44"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <div className="text-2xl font-display font-800 text-green-400 mb-1">94.2%</div>
          <div className="text-xs font-mono text-muted-foreground">Model accuracy</div>
          <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-teal-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '94%' }}
              transition={{ delay: 1.3, duration: 1.5, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
