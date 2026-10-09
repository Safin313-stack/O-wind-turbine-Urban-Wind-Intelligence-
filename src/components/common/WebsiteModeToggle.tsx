import React from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { soundFx } from '../../utils/audio';
import { Globe, LayoutDashboard, Sparkles } from 'lucide-react';

interface WebsiteModeToggleProps {
  variant?: 'compact' | 'standard' | 'floating';
  className?: string;
}

export const WebsiteModeToggle: React.FC<WebsiteModeToggleProps> = ({
  variant = 'standard',
  className = '',
}) => {
  const { viewMode, setViewMode } = useTelemetry();
  const isWebsite = viewMode === 'landing';

  const handleToggle = (targetMode: 'landing' | 'app') => {
    if (viewMode === targetMode) return;
    soundFx.playClick();
    setViewMode(targetMode);
  };

  // 1. Floating Pill Variant (Fixed at bottom right for continuous access across all views)
  if (variant === 'floating') {
    return (
      <aside 
        aria-label="Mode Navigation"
        className={`fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 ${className}`}
      >
        <div className="relative p-1 sm:p-1.5 rounded-full bg-space-900/95 backdrop-blur-2xl border-2 border-cyan-400/60 shadow-2xl shadow-cyan-950 flex items-center transition-all duration-300 hover:border-cyan-300 group hover:scale-105">
          {/* Animated Ambient Pulse Ring */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 opacity-60 blur-md group-hover:opacity-90 animate-pulse pointer-events-none" />

          {/* Sliding Pill Indicator */}
          <div
            className={`absolute top-1 sm:top-1.5 bottom-1 sm:bottom-1.5 w-[calc(50%-4px)] sm:w-[calc(50%-6px)] rounded-full transition-all duration-300 ease-out shadow-lg ${
              isWebsite
                ? 'left-1 sm:left-1.5 bg-gradient-to-r from-cyan-500 to-sky-500 shadow-cyan-500/40'
                : 'left-[50%] bg-gradient-to-r from-blue-600 to-indigo-600 shadow-indigo-500/40'
            }`}
          />

          {/* Website Option */}
          <button
            onClick={() => handleToggle('landing')}
            className={`relative z-10 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-sans font-bold transition-all duration-200 ${
              isWebsite
                ? 'text-black font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Switch to Public Showcase Website (Key: L)"
            aria-pressed={isWebsite}
          >
            <Globe className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isWebsite ? 'animate-spin-slow' : ''}`} />
            <span>Showcase</span>
          </button>

          {/* Platform App Option */}
          <button
            onClick={() => handleToggle('app')}
            className={`relative z-10 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-sans font-bold transition-all duration-200 ${
              !isWebsite
                ? 'text-white font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Switch to AI Command Center Platform (Key: L)"
            aria-pressed={!isWebsite}
          >
            <LayoutDashboard className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${!isWebsite ? 'animate-pulse' : ''}`} />
            <span>Platform</span>
          </button>

          {/* Shortcut Hint */}
          <span className="hidden sm:inline-block pr-2 pl-1 text-[10px] font-sans text-slate-500 border-l border-slate-800 ml-1">
            <kbd className="px-1 py-0.5 rounded bg-space-950 border border-slate-700 text-slate-400 text-[9px] font-mono">L</kbd>
          </span>
        </div>
      </aside>
    );
  }

  // 2. Compact Variant (For small navigation bars or mobile)
  if (variant === 'compact') {
    return (
      <div className={`relative inline-flex items-center p-0.5 rounded-lg bg-space-900/90 border border-slate-800 backdrop-blur-md ${className}`}>
        {/* Sliding background thumb */}
        <div
          className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-md transition-all duration-300 ease-out ${
            isWebsite
              ? 'left-0.5 bg-cyan-500/25 border border-cyan-500/50 shadow-sm'
              : 'left-[calc(50%+2px)] bg-indigo-500/25 border border-indigo-500/50 shadow-sm'
          }`}
        />

        <button
          onClick={() => handleToggle('landing')}
          className={`relative z-10 px-2 py-1 text-[11px] font-mono font-semibold transition-all ${
            isWebsite ? 'text-cyan-300' : 'text-slate-400 hover:text-white'
          }`}
          title="Switch to Website View"
          aria-pressed={isWebsite}
        >
          Website
        </button>

        <button
          onClick={() => handleToggle('app')}
          className={`relative z-10 px-2 py-1 text-[11px] font-mono font-semibold transition-all ${
            !isWebsite ? 'text-indigo-300' : 'text-slate-400 hover:text-white'
          }`}
          title="Switch to Platform View"
          aria-pressed={!isWebsite}
        >
          Platform
        </button>
      </div>
    );
  }

  // 3. Standard Variant (Featured in Header & Website Navigation)
  return (
    <div 
      className={`relative inline-flex items-center p-1 rounded-xl bg-space-900/90 backdrop-blur-md border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-lg ${className}`}
    >
      {/* Sliding Highlight Pill */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg transition-all duration-300 cubic-bezier(0.4,0,0.2,1) ${
          isWebsite
            ? 'left-1 bg-gradient-to-r from-cyan-500/30 to-blue-500/20 border border-cyan-400/50 shadow-glow-cyan'
            : 'left-[50%] bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border border-indigo-400/50 shadow-glow-purple'
        }`}
      />

      {/* Website Button */}
      <button
        onClick={() => handleToggle('landing')}
        className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 ${
          isWebsite
            ? 'text-cyan-200 drop-shadow-sm'
            : 'text-slate-400 hover:text-slate-200'
        }`}
        title="View Public Showcase Website (Key: L)"
        aria-pressed={isWebsite}
      >
        <Globe className={`w-3.5 h-3.5 ${isWebsite ? 'text-cyan-300 animate-spin-slow' : 'text-slate-500'}`} />
        <span>WEBSITE</span>
        {isWebsite && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse ml-0.5" />}
      </button>

      {/* Platform Button */}
      <button
        onClick={() => handleToggle('app')}
        className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 ${
          !isWebsite
            ? 'text-indigo-200 drop-shadow-sm'
            : 'text-slate-400 hover:text-slate-200'
        }`}
        title="View Real-Time AI Command Center & Telemetry Platform (Key: L)"
        aria-pressed={!isWebsite}
      >
        <LayoutDashboard className={`w-3.5 h-3.5 ${!isWebsite ? 'text-indigo-300 animate-pulse' : 'text-slate-500'}`} />
        <span>PLATFORM</span>
        {!isWebsite && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse ml-0.5" />}
      </button>
    </div>
  );
};
