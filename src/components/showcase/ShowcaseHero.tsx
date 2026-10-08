import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Zap, Cpu, Sparkles, Box } from 'lucide-react';

export const ShowcaseHero: React.FC = () => {
  return (
    <section id="overview" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Motion Primitives Ambient Radial Glow Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-sky-500/10 to-indigo-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="text-center max-w-4xl mx-auto space-y-6">
        {/* Sleek Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium shadow-lg shadow-cyan-950/30 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span>NEXT-GEN URBAN RENEWABLE ENERGY · O-WIND AERODYNAMICS</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] font-sans">
          Turning Urban Wind Into{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Intelligent Clean Energy.
          </span>
        </h1>

        {/* Subtitle / Value Proposition */}
        <p className="text-base sm:text-xl text-slate-300 font-sans font-normal leading-relaxed max-w-2xl mx-auto">
          AI-assisted O-Wind turbine placement and microgrid energy optimization for high-density urban buildings.
        </p>

        <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-2xl mx-auto leading-relaxed">
          Traditional wind turbines fail in cities due to chaotic, turbulent gusts. O-WIND AI captures 360° omnidirectional airflow—both horizontal street drafts and vertical rooftop updrafts—using internal Bernoulli Venturi ducts, powering edge microgrids and urban air sentinels.
        </p>

        {/* Call To Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <a
            href="#prototype"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-black font-mono text-xs sm:text-sm font-bold transition-all shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Box className="w-4 h-4" />
            <span>INSPECT 3D CAD PROTOTYPE</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#specs"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-slate-500 text-slate-200 hover:text-white font-mono text-xs sm:text-sm font-semibold transition-all backdrop-blur-xl"
          >
            <span>TECHNICAL SPECIFICATIONS</span>
          </a>
        </div>

        {/* Key Benchmark Stat Cards (Motion Primitives Bento Row) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-10 font-mono text-left">
          <div className="glass-card p-4 sm:p-5 rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] uppercase tracking-wider">AERODYNAMICS</span>
              <Compass className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">360°</div>
            <p className="text-[11px] text-slate-400 mt-1 font-sans">
              Omnidirectional intake: horizontal & vertical gusts
            </p>
          </div>

          <div className="glass-card p-4 sm:p-5 rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] uppercase tracking-wider">CUT-IN VELOCITY</span>
              <Zap className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">1.48 m/s</div>
            <p className="text-[11px] text-slate-400 mt-1 font-sans">
              Starts generating in gentle urban breezes
            </p>
          </div>

          <div className="glass-card p-4 sm:p-5 rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] uppercase tracking-wider">TESTED BENCHMARK</span>
              <Cpu className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-purple-400 tracking-tight">0.496 W</div>
            <p className="text-[11px] text-slate-400 mt-1 font-sans">
              Physical reference prototype test output
            </p>
          </div>

          <div className="glass-card p-4 sm:p-5 rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] uppercase tracking-wider">ROOFTOP SAFETY</span>
              <ShieldCheck className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-sky-400 tracking-tight">Enclosed</div>
            <p className="text-[11px] text-slate-400 mt-1 font-sans">
              Zero exposed blades, silent & bird-safe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
