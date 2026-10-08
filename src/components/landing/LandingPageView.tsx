import React from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { Turbine3DViewer } from '../turbine3d/Turbine3DViewer';
import { WebsiteModeToggle } from '../common/WebsiteModeToggle';
import { SDG_DATA } from '../../data/sdgData';
import {
  Wind,
  Zap,
  Cpu,
  CloudSun,
  ShieldCheck,
  ArrowRight,
  Globe,
  Sparkles,
  CheckCircle2,
  Trophy,
  Play
} from 'lucide-react';

export const LandingPageView: React.FC = () => {
  const { setViewMode, setActivePage, setIsCompetitionModeOpen } = useTelemetry();

  const handleLaunchApp = (pageId: any = 'dashboard') => {
    setActivePage(pageId);
    setViewMode('app');
  };

  return (
    <div className="min-h-screen bg-space-950 text-slate-100 flex flex-col animate-fade-in">
      {/* 1. Public Top Navigation */}
      <nav className="sticky top-0 z-40 w-full h-16 bg-space-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1.5px] shadow-glow-cyan">
            <div className="w-full h-full bg-space-950 rounded-[7px] flex items-center justify-center">
              <div className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin-slow" />
            </div>
          </div>
          <span className="font-mono font-extrabold text-base tracking-wider text-white">
            O-WIND <span className="text-wind-cyan">AI</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-xs font-mono text-slate-300">
          <a href="#problem" className="hover:text-white transition">The Problem</a>
          <a href="#solution" className="hover:text-white transition">O-Wind Technology</a>
          <a href="#innovation" className="hover:text-white transition">AI Siting</a>
          <a href="#sdgs" className="hover:text-white transition">UN SDGs</a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Animated Website / Platform Toggle Switcher */}
          <WebsiteModeToggle variant="standard" />

          <button
            onClick={() => setIsCompetitionModeOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/20 border border-purple-500/40 text-purple-200 text-xs font-mono font-semibold transition"
          >
            <Trophy className="w-3.5 h-3.5 text-purple-400" />
            <span>Judge Demo</span>
          </button>
        </div>
      </nav>

      {/* 2. Hero Section: "THE WIND BETWEEN THE BUILDINGS" */}
      <section className="relative pt-12 pb-20 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-wind-cyan text-xs font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              UNIVERSITY SUSTAINABLE TECHNOLOGY COMPETITION 2026
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.08] font-sans">
              THE WIND BETWEEN THE BUILDINGS.
            </h1>

            <p className="text-lg sm:text-xl font-medium text-slate-300 leading-relaxed font-sans">
              AI-Assisted O-Wind Turbine Placement and Energy Optimization for Urban Buildings in Bangladesh.
            </p>

            <p className="text-sm text-slate-400 font-sans leading-relaxed max-w-xl">
              Turning chaotic multi-directional urban wind into intelligent, self-powered microgrid energy while providing 24/7 hyper-local air quality monitoring for Dhaka.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => handleLaunchApp('dashboard')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-black font-mono text-sm font-extrabold transition shadow-glow-cyan"
              >
                <span>EXPLORE PLATFORM</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleLaunchApp('live-turbine')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-space-900 border border-slate-700 hover:border-slate-500 text-white font-mono text-sm font-bold transition"
              >
                <span>VIEW 3D PROTOTYPE</span>
              </button>
            </div>

            {/* Micro Benchmark Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 font-mono">
              <div>
                <span className="text-2xl font-bold text-white">1.48 m/s</span>
                <span className="text-xs text-slate-400 block mt-0.5">Ultra-Low Cut-in</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-emerald-400">0.496 W</span>
                <span className="text-xs text-slate-400 block mt-0.5">Peak Output (Ref.)</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-purple-400">92%</span>
                <span className="text-xs text-slate-400 block mt-0.5">AI Siting Accuracy</span>
              </div>
            </div>
          </div>

          {/* Right Hero Graphic: Live 3D Turbine Visualizer */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-space-900/90 p-2">
              <Turbine3DViewer height="460px" showControls={true} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 5 Core Ideas Section: WIND, ENERGY, AI, AIR, BANGLADESH */}
      <section className="py-16 bg-space-900/60 border-y border-slate-800 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono text-wind-cyan uppercase tracking-widest font-bold">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Five Vectors of Urban Clean Energy Intelligence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 font-mono text-xs">
            <div className="p-5 rounded-xl bg-space-950 border border-cyan-500/30 space-y-2">
              <Wind className="w-6 h-6 text-wind-cyan" />
              <h3 className="text-sm font-bold text-white">1. WIND</h3>
              <p className="text-slate-400 font-sans leading-relaxed">
                Captures chaotic 360° horizontal and vertical rooftop wind via internal Bernoulli Venturi vents.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-space-950 border border-emerald-500/30 space-y-2">
              <Zap className="w-6 h-6 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">2. ENERGY</h3>
              <p className="text-slate-400 font-sans leading-relaxed">
                Synchronous rectification & micro-MPPT routing to LiFePO4 storage and building micro-loads.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-space-950 border border-purple-500/30 space-y-2">
              <Cpu className="w-6 h-6 text-purple-400" />
              <h3 className="text-sm font-bold text-white">3. AI</h3>
              <p className="text-slate-400 font-sans leading-relaxed">
                Neural fluid dynamics evaluate building geometry to detect the optimal rooftop parapet lip.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-space-950 border border-sky-500/30 space-y-2">
              <CloudSun className="w-6 h-6 text-sky-400" />
              <h3 className="text-sm font-bold text-white">4. AIR</h3>
              <p className="text-slate-400 font-sans leading-relaxed">
                Autonomous environmental sentinel measuring PM2.5, PM10, and CO2 with wind dispersion modeling.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-space-950 border border-amber-500/30 space-y-2">
              <Globe className="w-6 h-6 text-amber-400" />
              <h3 className="text-sm font-bold text-white">5. BANGLADESH</h3>
              <p className="text-slate-400 font-sans leading-relaxed">
                Engineered specifically for Dhaka’s high-density canyons, tropical monsoon, and urban grid outages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. UN Sustainable Development Goals Showcase */}
      <section id="sdgs" className="py-16 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
              UN SDG IMPACT
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Aligned with 6 UN Sustainable Development Goals
            </h2>
          </div>
          <button
            onClick={() => handleLaunchApp('project')}
            className="text-xs font-mono text-cyan-400 hover:text-white flex items-center gap-1"
          >
            <span>View Full SDG Documentation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SDG_DATA.map((sdg) => (
            <div
              key={sdg.number}
              className={`p-4 rounded-xl bg-space-900 border ${sdg.borderColor} flex flex-col justify-between`}
            >
              <div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${sdg.badgeBg}`}>
                  {sdg.code}
                </span>
                <h3 className="text-sm font-bold text-white font-sans mt-2">{sdg.title}</h3>
                <p className="text-xs text-slate-300 font-sans mt-1 leading-relaxed">
                  {sdg.impactExplanation}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-emerald-400">
                {sdg.metrics}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Final CTA Banner */}
      <section className="py-20 px-6 bg-gradient-to-t from-space-900 to-space-950 border-t border-slate-800 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold">
            READY FOR LIVE INSPECTION
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight">
            Build the Intelligent Urban Energy Network.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-sans leading-relaxed">
            Experience the real-time AI smart-city command center, interact with the physical O-Wind telemetry stream, and run building siting simulations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => handleLaunchApp('dashboard')}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-black font-mono text-sm font-extrabold transition shadow-glow-cyan"
            >
              <span>LAUNCH COMMAND CENTER</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsCompetitionModeOpen(true)}
              className="flex items-center gap-2 px-6 py-4 rounded-xl bg-purple-600/30 hover:bg-purple-600/40 border border-purple-500/50 text-purple-200 font-mono text-sm font-bold transition shadow-glow-purple"
            >
              <Trophy className="w-4 h-4 text-purple-300" />
              <span>START 5-MIN JUDGE PRESENTATION</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-space-950 border-t border-slate-900 text-center text-xs font-mono text-slate-500">
        <p>© 2026 O-WIND AI · University Sustainable Technology Competition · Dhaka, Bangladesh</p>
      </footer>
    </div>
  );
};
