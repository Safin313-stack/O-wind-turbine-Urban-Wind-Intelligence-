import React from 'react';
import { motion } from 'framer-motion';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface AnimatedTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  layoutId?: string;
}

export function AnimatedTabs({
  tabs,
  activeTab,
  onChange,
  className = '',
  layoutId = 'active-tab-indicator',
}: AnimatedTabsProps) {
  return (
    <div className="max-w-full overflow-x-auto no-scrollbar py-1 flex justify-center">
      <div
        className={`inline-flex items-center p-1.5 rounded-full bg-white/90 border border-stone-200/90 shadow-sm backdrop-blur-md shrink-0 ${className}`}
      >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium transition-colors z-10 ${
              isActive ? 'text-stone-900 font-bold' : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-stone-100 border border-stone-200/90 shadow-sm -z-10"
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}
            {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-600' : 'text-stone-400'}`} />}
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-cyan-100 text-cyan-800' : 'bg-stone-100 text-stone-500'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
      </div>
    </div>
  );
}
