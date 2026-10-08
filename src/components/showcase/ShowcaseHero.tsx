import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Zap, Cpu, Box, Sparkles } from 'lucide-react';

export const ShowcaseHero: React.FC = () => {
  return (
    <section id="overview" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Subtle Warm Radial Atmosphere Inspired by Elena Voss Template */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-cyan-200/25 via-sky-100/30 to-amber-100/20 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="text-center max-w-4xl mx-auto space-y-7">
        {/* Sleek Light Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-stone-200/90 text-stone-700 text-xs font-mono font-medium shadow-sm hover:border-stone-300 transition-colors animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-600" />
          </span>
          <span>NEXT-GEN URBAN RENEWABLE ENERGY · O-WIND AERODYNAMICS</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-stone-900 tracking-tight leading-[1.08] font-sans">
          Turning Urban Wind Into{' '}
          <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
            Intelligent Clean Energy.
          </span>
        </h1>

        {/* Subtitle / Value Proposition */}
        <p className="text-base sm:text-xl text-stone-600 font-sans font-normal leading-relaxed max-w-2xl mx-auto">
          AI-assisted O-Wind turbine placement and microgrid energy optimization for high-density urban buildings.
        </p>

        <p className="text-xs sm:text-sm text-stone-500 font-sans max-w-2xl mx-auto leading-relaxed">
          Traditional wind turbines fail in cities due to chaotic, turbulent gusts. O-WIND AI captures 360° omnidirectional airflow—both horizontal street drafts and vertical rooftop updrafts—using internal Bernoulli Venturi ducts, powering edge microgrids and urban air sentinels.
        </p>

        {/* Elena Voss Magnetic Action Pill Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <a
            href="#prototype"
            className="btn-magnetic flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-stone-900 hover:bg-black text-white font-mono text-xs sm:text-sm font-bold transition-all shadow-lg shadow-stone-900/10 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            <Box className="w-4 h-4 text-cyan-300" />
            <span>INSPECT 3D CAD PROTOTYPE</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#specs"
            className="btn-magnetic flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300/80 hover:border-stone-400 text-stone-800 font-mono text-xs sm:text-sm font-semibold transition-all shadow-sm"
          >
            <span>TECHNICAL SPECIFICATIONS</span>
          </a>
        </div>

        {/* Key Benchmark Stat Cards (Elena Voss Inspired Bento Row) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 pt-10 font-mono text-left">
          <div className="glass-card p-5 sm:p-6 rounded-3xl relative overflow-hidden group">
            <div className="flex items-center justify-between text-stone-500 mb-2.5">
              <span className="text-[11px] uppercase tracking-wider font-semibold">AERODYNAMICS</span>
              <Compass className="w-4 h-4 text-cyan-600 group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">360°</div>
            <p className="text-xs text-stone-500 mt-1 font-sans">
              Omnidirectional intake: horizontal & vertical gusts
            </p>
          </div>

          <div className="glass-card p-5 sm:p-6 rounded-3xl relative overflow-hidden group">
            <div className="flex items-center justify-between text-stone-500 mb-2.5">
              <span className="text-[11px] uppercase tracking-wider font-semibold">CUT-IN VELOCITY</span>
              <Zap className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight">1.48 m/s</div>
            <p className="text-xs text-stone-500 mt-1 font-sans">
              Starts generating in gentle urban breezes
            </p>
          </div>

          <div className="glass-card p-5 sm:p-6 rounded-3xl relative overflow-hidden group">
            <div className="flex items-center justify-between text-stone-500 mb-2.5">
              <span className="text-[11px] uppercase tracking-wider font-semibold">TESTED BENCHMARK</span>
              <Cpu className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-700 tracking-tight">0.496 W</div>
            <p className="text-xs text-stone-500 mt-1 font-sans">
              Physical reference prototype test output
            </p>
          </div>

          <div className="glass-card p-5 sm:p-6 rounded-3xl relative overflow-hidden group">
            <div className="flex items-center justify-between text-stone-500 mb-2.5">
              <span className="text-[11px] uppercase tracking-wider font-semibold">ROOFTOP SAFETY</span>
              <ShieldCheck className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-700 tracking-tight">Enclosed</div>
            <p className="text-xs text-stone-500 mt-1 font-sans">
              Zero exposed blades, silent & bird-safe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
