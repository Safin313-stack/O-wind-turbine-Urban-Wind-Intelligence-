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
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'border-[#FF8A24]/60 shadow-lg bg-[#22262C] ring-1 ring-[#FF8A24]/20'
                : 'border-[#2E343D] hover:border-[#FF8A24]/40 bg-[#1C2026]'
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
                    className={`inline-flex items-center justify-center shrink-0 whitespace-nowrap text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border tracking-wide uppercase ${
                      item.categoryBadgeClass || 'bg-[#22262C] text-[#FF8A24] border-[#FF8A24]/30'
                    }`}
                  >
                    {item.category}
                  </span>
                )}
                <h4 className="font-sans font-bold text-sm sm:text-base text-[#F5F5F2] group-hover:text-[#FF8A24] transition-colors leading-snug">
                  {item.title}
                </h4>
              </div>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`p-1.5 rounded-full shrink-0 transition-colors mt-0.5 sm:mt-0 ${
                  isOpen ? 'bg-[#FF8A24]/20 text-[#FF8A24]' : 'bg-[#22262C] text-[#A7ADB5] group-hover:bg-[#2E343D]'
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
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-sm text-[#A7ADB5] font-sans leading-relaxed border-t border-[#2E343D]">
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
