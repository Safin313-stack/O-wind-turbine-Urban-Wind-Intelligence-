import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface DisclosureItem {
  id: string;
  title: string;
  content: React.ReactNode;
  category?: string;
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
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen ? 'border-cyan-400/60 shadow-md shadow-cyan-950/5' : 'border-stone-200/80 hover:border-stone-300'
            }`}
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors group"
            >
              <div className="flex items-center gap-3">
                {item.category && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                    {item.category}
                  </span>
                )}
                <h4 className="font-sans font-bold text-base text-stone-900 group-hover:text-cyan-700 transition-colors">
                  {item.title}
                </h4>
              </div>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="p-1 rounded-full bg-stone-100 text-stone-600 shrink-0"
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
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-sm text-stone-600 font-sans leading-relaxed border-t border-stone-100">
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
