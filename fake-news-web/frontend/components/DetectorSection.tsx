'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, AlertCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { checkNews, EXAMPLE_TEXTS, type PredictionResult } from '@/lib/api';
import ResultCard from './ResultCard';
import LoadingSpinner from './LoadingSpinner';
import GlowingEffect from './GlowingEffect';
import DropdownMenu from './DropdownMenu';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function DetectorSection() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleSubmit = useCallback(async () => {
    if (!text.trim() || status === 'loading') return;

    setStatus('loading');
    setResult(null);
    setErrorMsg('');

    const response = await checkNews(text);

    if (response.success) {
      setResult(response.data);
      setStatus('success');
    } else {
      setErrorMsg(response.error.message);
      setStatus('error');
    }
  }, [text, status]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleClear = () => {
    setText('');
    setCharCount(0);
    setStatus('idle');
    setResult(null);
    setErrorMsg('');
  };

  const handleLoadReal = () => {
    setText(EXAMPLE_TEXTS.real);
    setCharCount(EXAMPLE_TEXTS.real.length);
    setStatus('idle');
    setResult(null);
  };

  const handleLoadFake = () => {
    setText(EXAMPLE_TEXTS.fake);
    setCharCount(EXAMPLE_TEXTS.fake.length);
    setStatus('idle');
    setResult(null);
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const isReady = text.trim().length >= 20;

  return (
    <section
      id="detector"
      className="relative py-32 px-4 min-h-screen flex items-start justify-center"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Ambient orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        {/* Section heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-xs font-mono text-violet-300 uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            Real-time Inference
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-800 tracking-tight mb-4">
            Credibility{' '}
            <span className="gradient-text">Analyzer</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
            Paste any news article, tweet, or online content below. Our BERT-based model
            returns a verdict in under a second.
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <GlowingEffect
            glowColor="cyan"
            className="rounded-3xl border border-border glass shadow-glass"
          >
            <div className="p-6 md:p-8">
              {/* Textarea header */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-mono text-muted-foreground">
                  news_content.txt
                </div>
                <DropdownMenu
                  onClear={handleClear}
                  onLoadReal={handleLoadReal}
                  onLoadFake={handleLoadFake}
                />
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={text}
                  onChange={handleTextChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Paste news content here for analysis...&#10;&#10;You can enter an article headline, body text, or social media post.&#10;Press Ctrl+Enter to submit."
                  className={cn(
                    'w-full min-h-52 resize-none rounded-2xl p-5',
                    'bg-background/40 border text-foreground',
                    'font-body text-base leading-relaxed placeholder:text-muted-foreground/40',
                    'focus:outline-none focus:ring-0 transition-all duration-300',
                    'scrollbar-thin',
                    status === 'loading' && 'opacity-60 pointer-events-none',
                    isReady
                      ? 'border-cyan-400/20 focus:border-cyan-400/40'
                      : 'border-border focus:border-border/80'
                  )}
                  disabled={status === 'loading'}
                />

                {/* Character/word counter */}
                <div className="absolute bottom-3 right-3 flex items-center gap-3 text-xs font-mono text-muted-foreground/50 pointer-events-none">
                  <span>{wordCount}w</span>
                  <span>{charCount}c</span>
                </div>
              </div>

              {/* Footer: tip + submit */}
              <div className="flex items-center justify-between mt-4 gap-4 flex-wrap">
                <p className="text-xs font-mono text-muted-foreground/60">
                  {isReady ? (
                    <span className="text-cyan-400/70">✓ Ready to analyze</span>
                  ) : (
                    <span>Min. 20 characters required</span>
                  )}
                  <span className="ml-2 hidden sm:inline">· ⌘+Enter to submit</span>
                </p>

                <motion.button
                  onClick={handleSubmit}
                  disabled={!isReady || status === 'loading'}
                  className={cn(
                    'relative flex items-center gap-2.5 px-6 py-3 rounded-full',
                    'font-body font-medium text-sm overflow-hidden',
                    'transition-all duration-200',
                    isReady && status !== 'loading'
                      ? 'cursor-pointer'
                      : 'cursor-not-allowed opacity-50'
                  )}
                  whileHover={isReady && status !== 'loading' ? { scale: 1.02 } : {}}
                  whileTap={isReady && status !== 'loading' ? { scale: 0.97 } : {}}
                >
                  {/* Button background */}
                  <div
                    className={cn(
                      'absolute inset-0 transition-opacity duration-300',
                      isReady && status !== 'loading'
                        ? 'opacity-100'
                        : 'opacity-40',
                      'bg-gradient-to-r from-cyan-400 to-violet-500'
                    )}
                  />
                  {/* Shine */}
                  {isReady && status !== 'loading' && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                  <span className="relative text-background flex items-center gap-2">
                    {status === 'loading' ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Analyze
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </div>
          </GlowingEffect>
        </motion.div>

        {/* Results area */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {status === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="glass border border-border rounded-3xl">
                  <LoadingSpinner />
                </div>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex items-start gap-3 p-5 rounded-2xl glass border border-red-400/20 bg-red-400/5"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-300 mb-0.5">Analysis Failed</p>
                  <p className="text-sm text-muted-foreground font-mono">{errorMsg}</p>
                </div>
              </motion.div>
            )}

            {status === 'success' && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ResultCard result={result} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info cards row */}
        <motion.div
          className="grid grid-cols-3 gap-4 mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { label: 'Model', value: 'BERT-Base', sub: 'Uncased' },
            { label: 'Dataset', value: 'LIAR + WELFake', sub: '44K articles' },
            { label: 'F1 Score', value: '0.941', sub: 'Weighted avg' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass border border-border rounded-2xl p-4 text-center"
            >
              <div className="text-xs font-mono text-muted-foreground mb-1">{stat.label}</div>
              <div className="font-display font-700 text-base gradient-text">{stat.value}</div>
              <div className="text-xs font-mono text-muted-foreground/60 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
