import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard, Box } from 'lucide-react';
import { Magnetic } from '../motion-primitives';
import { useTelemetry } from '../../context/TelemetryContext';
import { soundFx } from '../../utils/audio';

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
  const { setViewMode } = useTelemetry();
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
    { name: 'How It Works', href: '#technology' },
    { name: '3D CAD Twin', href: '#prototype' },
    { name: 'Videos', href: '#videos' },
    { name: 'Aerodynamics', href: '#aerodynamics' },
    { name: 'Blueprints', href: '#gallery' },
    { name: 'Simulator', href: '#simulation' },
    { name: 'Specs', href: '#specs' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#17191D]/90 backdrop-blur-xl border-b border-[#2E343D] shadow-lg shadow-black/40 py-2.5 sm:py-3'
          : 'bg-transparent py-3.5 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#overview" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#FF8A24] via-[#FFA14E] to-cyan-500 p-[1.5px] shadow-sm group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#17191D] rounded-[10px] flex items-center justify-center overflow-hidden">
              <div className="w-4 h-4 border-2 border-[#FF8A24] border-t-transparent rounded-full animate-spin-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-base sm:text-lg tracking-tight text-[#F5F5F2] group-hover:text-[#FF8A24] transition-colors">
                O-WIND
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-[#FF8A24]/15 text-[#FF8A24] border border-[#FF8A24]/30">
                AI
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] text-[#A7ADB5] font-mono font-semibold hidden xs:block tracking-wider uppercase">
              URBAN WIND INTELLIGENCE
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links with animated hover pill */}
        <div className="hidden lg:flex items-center gap-0.5 bg-[#22262C]/85 backdrop-blur-xl border border-[#2E343D] px-2.5 py-1 rounded-full shadow-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative px-3 py-1 rounded-full text-xs font-sans font-semibold text-[#A7ADB5] hover:text-[#F5F5F2] transition-colors duration-200 group"
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute inset-0 rounded-full bg-[#2E343D] opacity-0 group-hover:opacity-100 transition-opacity -z-0" />
            </a>
          ))}
        </div>

        {/* Right CTA: GitHub Repository & Command Center Button */}
        <div className="hidden sm:flex items-center gap-2">
          <Magnetic intensity={0.25}>
            <a
              href="https://github.com/Safin313-stack/O-wind-turbine-Urban-Wind-Intelligence-"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#22262C] hover:bg-[#282D35] border border-[#2E343D] text-xs font-sans font-bold text-[#F5F5F2] hover:text-white transition-all shadow-sm group active:scale-[0.98]"
            >
              <GithubIcon className="w-3.5 h-3.5 text-[#A7ADB5] group-hover:text-white group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>
          </Magnetic>

          <Magnetic intensity={0.28}>
            <button
              onClick={() => {
                soundFx.playClick();
                setViewMode('app');
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF8A24] hover:bg-[#FFA14E] text-white text-xs font-sans font-bold shadow-md shadow-[#FF8A24]/20 hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              title="Launch Dhaka Smart-City Command Center"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-white" />
              <span>Command Center</span>
            </button>
          </Magnetic>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-[#22262C] border border-[#2E343D] text-[#F5F5F2] hover:text-[#FF8A24] transition active:scale-95 cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF8A24]" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu with AnimatePresence and Backdrop Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            />

            {/* Slide-down Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              className="lg:hidden fixed inset-x-3 top-16 rounded-2xl bg-[#17191D] border border-[#2E343D] p-4 shadow-2xl z-50 space-y-3 max-h-[calc(100vh-80px)] overflow-y-auto"
            >
              <div className="flex flex-col space-y-0.5">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3.5 py-2.5 rounded-xl text-xs font-sans font-semibold text-[#A7ADB5] hover:text-[#F5F5F2] hover:bg-[#22262C] transition active:bg-[#282D35] flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <span className="text-[#FF8A24] text-xs font-mono">→</span>
                  </a>
                ))}
              </div>

              <div className="pt-2.5 border-t border-[#2E343D] flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    soundFx.playClick();
                    setViewMode('app');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FF8A24] text-white text-xs font-sans font-bold transition active:scale-95 shadow-md shadow-[#FF8A24]/20 cursor-pointer"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-white" />
                  <span>Launch Command Center</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/Safin313-stack/O-wind-turbine-Urban-Wind-Intelligence-"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#22262C] border border-[#2E343D] text-xs font-sans font-bold text-[#F5F5F2] hover:text-white transition active:scale-95"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-[#A7ADB5]" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="#prototype"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#22262C] border border-[#2E343D] text-[#F5F5F2] text-xs font-sans font-bold transition active:scale-95"
                  >
                    <Box className="w-3.5 h-3.5 text-[#FF8A24]" />
                    <span>3D Twin</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
