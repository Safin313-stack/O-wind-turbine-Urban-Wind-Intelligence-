import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, Sparkles } from 'lucide-react';

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
    { name: 'Technology', href: '#technology' },
    { name: 'Simulation', href: '#simulation' },
    { name: 'Specifications', href: '#specs' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-space-950/80 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl shadow-black/50 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#overview" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-shadow">
            <div className="w-full h-full bg-space-950 rounded-[10px] flex items-center justify-center overflow-hidden">
              <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-sans font-extrabold text-base tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                O-WIND
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                AI
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:block tracking-wider">
              URBAN WIND INTELLIGENCE
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] px-3 py-1.5 rounded-full shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 rounded-full text-xs font-mono font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right CTA: GitHub Repository */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://github.com/Safin313-stack/O-wind-turbine-Urban-Wind-Intelligence-"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-cyan-400/40 text-xs font-mono text-slate-200 hover:text-white transition-all shadow-sm group"
          >
            <GithubIcon className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>GitHub</span>
          </a>

          <a
            href="#prototype"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-black text-xs font-mono font-bold transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40"
          >
            <span>Explore 3D</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white transition"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 rounded-2xl bg-space-900/95 backdrop-blur-2xl border border-white/[0.1] p-5 shadow-2xl shadow-black animate-fade-in space-y-4">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-mono text-slate-200 hover:text-white hover:bg-white/[0.06] transition"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
            <a
              href="https://github.com/Safin313-stack/O-wind-turbine-Urban-Wind-Intelligence-"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-slate-200 hover:text-white transition"
            >
              <GithubIcon className="w-4 h-4 text-cyan-400" />
              <span>GitHub</span>
            </a>
            <a
              href="#prototype"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-cyan-400 text-black text-xs font-mono font-bold transition"
            >
              <span>Explore 3D</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
