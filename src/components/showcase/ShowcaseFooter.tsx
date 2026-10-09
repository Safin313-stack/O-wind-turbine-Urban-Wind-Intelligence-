import React from 'react';
import { ArrowUp, Wind } from 'lucide-react';
import { Magnetic } from '../motion-primitives';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const ShowcaseFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-200/80 bg-[#F8FAFC]/90 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Tagline */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 p-[1px]">
              <div className="w-full h-full bg-white rounded-[7px] flex items-center justify-center">
                <Wind className="w-3.5 h-3.5 text-cyan-600" />
              </div>
            </div>
            <span className="font-display font-black text-base text-stone-900 tracking-tight">
              O-WIND <span className="text-cyan-600">AI</span>
            </span>
          </div>
          <p className="text-xs text-stone-500 font-sans max-w-sm">
            AI-Assisted O-Wind Turbine Placement & Clean Energy Optimization for High-Density Urban Buildings.
          </p>
        </div>

        {/* Center: Clean Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-sans font-semibold text-stone-600">
          <a href="#overview" className="hover:text-stone-950 transition-colors">Overview</a>
          <a href="#prototype" className="hover:text-stone-950 transition-colors">3D Prototype</a>
          <a href="#aerodynamics" className="hover:text-stone-950 transition-colors">Aerodynamics</a>
          <a href="#technology" className="hover:text-stone-950 transition-colors">Pillars</a>
          <a href="#simulation" className="hover:text-stone-950 transition-colors">Simulation</a>
          <a href="#specs" className="hover:text-stone-950 transition-colors">Specs</a>
          <a href="#about" className="hover:text-stone-950 transition-colors">About</a>
        </div>

        {/* Right: GitHub & Back to top with Motion Primitives Magnetic */}
        <div className="flex items-center gap-3">
          <Magnetic intensity={0.25}>
            <a
              href="https://github.com/Safin313-stack/O-wind-turbine-Urban-Wind-Intelligence-"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-xs font-sans font-bold text-stone-700 hover:text-stone-950 transition shadow-sm"
            >
              <GithubIcon className="w-3.5 h-3.5 text-stone-900" />
              <span>GitHub Repository</span>
            </a>
          </Magnetic>

          <Magnetic intensity={0.3}>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 hover:text-stone-900 transition shadow-sm cursor-pointer"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </Magnetic>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-stone-200/60 text-center text-[11px] font-sans text-stone-500">
        <p>© 2026 O-WIND AI Project · Urban Clean Energy & Environmental Intelligence.</p>
      </div>
    </footer>
  );
};
