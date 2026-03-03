'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PredictionResult } from '@/lib/api';

interface ResultCardProps {
  result: PredictionResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const isReal = result.label === 'REAL';
  const confidence = result.confidence; // already percentage

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const shakeVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: {
      opacity: 1,
      x: [0, -6, 6, -4, 4, -2, 2, 0],
      transition: {
        opacity: { duration: 0.3 },
        x: { duration: 0.5, delay: 0.2, ease: 'easeInOut' },
      },
    },
  };

  return (
    <motion.div
      variants={isReal ? cardVariants : shakeVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'relative rounded-2xl border overflow-hidden',
        'glass transition-all duration-500',
        isReal
          ? 'border-green-400/30 shadow-glow-green'
          : 'border-red-400/30 shadow-glow-red'
      )}
    >
      {/* Top gradient bar */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-0.5',
          isReal
            ? 'bg-gradient-to-r from-transparent via-green-400 to-transparent'
            : 'bg-gradient-to-r from-transparent via-red-400 to-transparent'
        )}
      />

      {/* Background glow */}
      <div
        className={cn(
          'absolute inset-0 opacity-5',
          isReal
            ? 'bg-gradient-to-br from-green-400/20 to-transparent'
            : 'bg-gradient-to-br from-red-400/20 to-transparent'
        )}
      />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5">
              Analysis Result
            </div>
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                {isReal ? (
                  <CheckCircle className="w-7 h-7 text-green-400" />
                ) : (
                  <XCircle className="w-7 h-7 text-red-400" />
                )}
              </motion.div>
              <h3
                className={cn(
                  'font-display text-3xl font-800 tracking-tight',
                  isReal ? 'text-green-400' : 'text-red-400'
                )}
              >
                {result.label}
              </h3>
            </div>
          </div>

          {/* Verdict badge */}
          <motion.div
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-mono font-medium border',
              isReal
                ? 'bg-green-400/10 border-green-400/30 text-green-300'
                : 'bg-red-400/10 border-red-400/30 text-red-300'
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            {isReal ? '✓ Credible' : '⚠ Suspicious'}
          </motion.div>
        </div>

        {/* Confidence section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Model confidence</span>
            </div>
            <motion.span
              className={cn(
                'font-display text-2xl font-700',
                isReal ? 'text-green-400' : 'text-red-400'
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {confidence.toFixed(1)}%
            </motion.span>
          </div>

          {/* Animated progress bar */}
          <div className="relative h-2.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className={cn(
                'absolute inset-y-0 left-0 rounded-full',
                isReal
                  ? 'bg-gradient-to-r from-green-500 to-teal-400'
                  : 'bg-gradient-to-r from-red-500 to-orange-400'
              )}
              initial={{ width: '0%' }}
              animate={{ width: `${confidence}%` }}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Shimmer on bar */}
            <motion.div
              className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
              initial={{ left: '-10%' }}
              animate={{ left: '110%' }}
              transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
            />
          </div>

          {/* Confidence interpretation */}
          <p className="text-xs font-mono text-muted-foreground pt-1">
            {confidence >= 90
              ? isReal
                ? '🟢 Very high confidence this content is reliable.'
                : '🔴 Very high confidence this content contains misinformation.'
              : confidence >= 70
              ? isReal
                ? '🟡 Likely reliable, but cross-reference recommended.'
                : '🟡 Likely misleading. Verify with reputable sources.'
              : '⚪ Low confidence — insufficient signal for definitive verdict.'}
          </p>
        </div>

        {/* Disclaimer */}
        {!isReal && (
          <motion.div
            className="mt-5 flex items-start gap-2.5 p-3 rounded-xl bg-red-400/5 border border-red-400/15"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.7 }}
          >
            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-300/80 font-mono leading-relaxed">
              This content shows patterns commonly associated with misinformation.
              Always verify claims with trusted news organizations before sharing.
            </p>
          </motion.div>
        )}

        {isReal && (
          <motion.div
            className="mt-5 flex items-start gap-2.5 p-3 rounded-xl bg-green-400/5 border border-green-400/15"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.7 }}
          >
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-green-300/80 font-mono leading-relaxed">
              Content appears credible. The model identified patterns consistent
              with factual journalism. Note: AI analysis should supplement, not replace, critical reading.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
