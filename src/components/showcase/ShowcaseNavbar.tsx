import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, Sparkles } from 'lucide-react';
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

export const ShowcaseNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: '3D Prototype', href: '#prototype' },
    { name: 'Aerodynamics', href: '#aerodynamics' },
    { name: 'Pillars', href: '#technology' },
    { name: 'Simulation', href: '#simulation' },
    { name: 'Specifications', href: '#specs' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF9F6]/85 backdrop-blur-2xl border-b border-stone-200/80 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#overview" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-indigo-600 p-[1.5px] shadow-sm group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#FAF9F6] rounded-[10px] flex items-center justify-center overflow-hidden">
              <div className="w-4 h-4 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-sans font-extrabold text-base tracking-tight text-stone-900 group-hover:text-cyan-700 transition-colors">
                O-WIND
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-cyan-100/80 text-cyan-800 border border-cyan-300/80">
                AI
              </span>
            </div>
            <span className="text-[10px] text-stone-500 font-mono hidden sm:block tracking-wider">
              URBAN WIND INTELLIGENCE
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links with animated hover pill */}
        <div className="hidden lg:flex items-center gap-1 bg-white/80 backdrop-blur-xl border border-stone-200/80 px-3 py-1.5 rounded-full shadow-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-stone-600 hover:text-stone-950 transition-colors duration-200 group"
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute inset-0 rounded-full bg-stone-100 opacity-0 group-hover:opacity-100 transition-opacity -z-0" />
            </a>
          ))}
        </div>

        {/* Right CTA: GitHub Repository & Explore Button with Magnetic Attraction */}
        <div className="hidden sm:flex items-center gap-3">
          <Magnetic intensity={0.25}>
            <a
              href="https://github.com/Safin313-stack/O-wind-turbine-Urban-Wind-Intelligence-"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-xs font-mono text-stone-700 hover:text-stone-950 transition-all shadow-sm group active:scale-[0.98]"
            >
              <GithubIcon className="w-3.5 h-3.5 text-stone-800 group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>
          </Magnetic>

          <Magnetic intensity={0.28}>
            <a
              href="#prototype"
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-stone-900 hover:bg-black text-white text-xs font-mono font-bold shadow-md hover:shadow-lg transition-all"
            >
              <span>Explore 3D</span>
              <ExternalLink className="w-3 h-3 text-cyan-300" />
            </a>
          </Magnetic>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-stone-950 transition"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-600" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 rounded-2xl bg-[#FAF9F6]/95 backdrop-blur-2xl border border-stone-200 p-5 shadow-xl animate-fade-in space-y-4">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-mono text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-3">
            <a
              href="https://github.com/Safin313-stack/O-wind-turbine-Urban-Wind-Intelligence-"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-stone-200 text-xs font-mono text-stone-800 hover:text-stone-950 transition"
            >
              <GithubIcon className="w-4 h-4 text-stone-800" />
              <span>GitHub</span>
            </a>
            <a
              href="#prototype"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-mono font-bold transition"
            >
              <span>Explore 3D</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
