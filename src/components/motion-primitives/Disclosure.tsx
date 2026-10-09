import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface DisclosureItem {
  id: string;
  title: string;
  content: React.ReactNode;
  category?: string;
  categoryBadgeClass?: string;
}

interface DisclosureProps {
  items: DisclosureItem[];
  defaultOpenId?: string;
  className?: string;
}

export function Disclosure({ items, defaultOpenId, className = '' }: DisclosureProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={`space-y-3.5 ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'border-cyan-400/60 shadow-md shadow-cyan-950/5 ring-1 ring-cyan-400/20 bg-white/95'
                : 'border-stone-200/80 hover:border-stone-300 bg-white/70'
            }`}
          >
            <button
              onClick={() => toggle(item.id)}
              type="button"
              className="w-full p-4 sm:p-5 text-left flex items-start sm:items-center justify-between gap-3 sm:gap-4 transition-colors group select-none cursor-pointer"
            >
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                {item.category && (
                  <span
                    className={`inline-flex items-center justify-center shrink-0 whitespace-nowrap text-[11px] font-mono font-bold px-3 py-1 rounded-full border shadow-2xs tracking-wide uppercase ${
                      item.categoryBadgeClass || 'bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    {item.category}
                  </span>
                )}
                <h4 className="font-sans font-bold text-sm sm:text-base text-stone-900 group-hover:text-cyan-700 transition-colors leading-snug">
                  {item.title}
                </h4>
              </div>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`p-1.5 rounded-full shrink-0 transition-colors mt-0.5 sm:mt-0 ${
                  isOpen ? 'bg-cyan-100 text-cyan-800' : 'bg-stone-100 text-stone-600 group-hover:bg-stone-200'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 24,
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-sm text-stone-600 font-sans leading-relaxed border-t border-stone-100/90">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
