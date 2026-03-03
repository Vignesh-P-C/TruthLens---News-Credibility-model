'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Trash2, ShieldCheck, AlertOctagon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EXAMPLE_TEXTS } from '@/lib/api';

interface DropdownMenuProps {
  onClear: () => void;
  onLoadReal: () => void;
  onLoadFake: () => void;
}

const menuItems = [
  {
    id: 'clear',
    icon: Trash2,
    label: 'Clear text',
    description: 'Remove all content',
    color: 'text-muted-foreground hover:text-foreground',
  },
  {
    id: 'real',
    icon: ShieldCheck,
    label: 'Load real news example',
    description: 'Credible journalism sample',
    color: 'text-green-400',
  },
  {
    id: 'fake',
    icon: AlertOctagon,
    label: 'Load fake news example',
    description: 'Misinformation sample',
    color: 'text-red-400',
  },
] as const;

export default function DropdownMenu({ onClear, onLoadReal, onLoadFake }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (id: typeof menuItems[number]['id']) => {
    setOpen(false);
    if (id === 'clear') onClear();
    if (id === 'real') onLoadReal();
    if (id === 'fake') onLoadFake();
  };

  return (
    <div ref={containerRef} className="relative">
      <motion.button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-mono',
          'glass border transition-all duration-200',
          open
            ? 'border-cyan-400/40 text-foreground shadow-glow-cyan'
            : 'border-border text-muted-foreground hover:text-foreground hover:border-border/80'
        )}
        whileTap={{ scale: 0.97 }}
      >
        <span>Examples</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-full mt-2 w-64 rounded-2xl glass border border-border shadow-glass overflow-hidden z-50"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-1.5">
              {menuItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleAction(item.id)}
                  className={cn(
                    'w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left',
                    'hover:bg-muted/50 transition-colors duration-150',
                    item.id !== 'clear' && i > 0 ? 'mt-0.5' : ''
                  )}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <item.icon className={cn('w-4 h-4 mt-0.5 flex-shrink-0', item.color)} />
                  <div>
                    <div className={cn('text-sm font-medium leading-tight', item.color)}>
                      {item.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
