import React from 'react';
import { Wind, Zap, Cpu, CloudSun, Globe, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

export const ShowcaseBentoGrid: React.FC = () => {
  return (
    <section id="technology" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-medium">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>FIVE CORE PILLARS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
          The Architecture of Urban Wind Intelligence
        </h2>
        <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed">
          Five synergistic vectors engineered to turn chaotic city breezes into predictable clean electricity and real-time environmental data.
        </p>
      </div>

      {/* Motion Primitives Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Pillar 1: WIND (Large Feature Card - 7 cols) */}
        <div className="md:col-span-7 glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden group border border-cyan-500/20 hover:border-cyan-400/40">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Wind className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              01 · AERODYNAMICS
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            360° Omnidirectional Aerodynamic Rotor
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
            Unlike directional wind turbines that require steady one-way airflow, the O-Wind turbine is a geometric sphere with cross-sectional Venturi vents. As urban wind hits the outer surface from any azimuth, it passes through aerodynamic ducts of decreasing volume, creating a powerful Bernoulli pressure differential that drives rotation around a central axis.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/[0.08] font-mono text-xs">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-slate-400 text-[10px] block">VENTURI COMPRESSION</span>
              <span className="text-cyan-300 font-bold text-sm">+1.4x Air Acceleration</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-slate-400 text-[10px] block">DIRECTIONAL SENSITIVITY</span>
              <span className="text-emerald-300 font-bold text-sm">Zero Yaw Tracking Needed</span>
            </div>
          </div>
        </div>

        {/* Pillar 2: ENERGY (5 cols) */}
        <div className="md:col-span-5 glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden group border border-emerald-500/20 hover:border-emerald-400/40">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none" />

          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              02 · MICROGRID
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Diurnal Solar-Wind Balancing
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
            Rooftop solar generates zero electricity after dark, exactly when Dhaka experiences peak load-shedding (7 PM - 11 PM). O-Wind provides continuous power during nighttime thermal updrafts, buffering LiFePO4 batteries to keep sensors and building micro-loads online 24/7.
          </p>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] font-mono text-xs">
            <span className="text-slate-400 text-[10px] block">MICRO-MPPT CONDITIONING</span>
            <span className="text-emerald-300 font-bold text-sm">Synchronous Rectification (3.7V Bus)</span>
          </div>
        </div>

        {/* Pillar 3: AI SITING (4 cols) */}
        <div className="md:col-span-4 glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden group border border-purple-500/20 hover:border-purple-400/40">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
              03 · AI SITING
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            Neural CFD Siting Engine
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Edge neural networks compute building height, aspect ratio, and surrounding street canyon widths to calculate exact parapet coordinates where rooftop wind acceleration peaks (+40% velocity lift).
          </p>
        </div>

        {/* Pillar 4: AIR SENSING (4 cols) */}
        <div className="md:col-span-4 glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden group border border-sky-500/20 hover:border-sky-400/40">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <CloudSun className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
              04 · AIR SENTINEL
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            Self-Powered Environmental Sensing
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Dhaka faces severe seasonal PM2.5 smog. The turbine powers integrated optical particle counters and CO2 sensors, transmitting real-time micro-climate telemetry without grid dependency.
          </p>
        </div>

        {/* Pillar 5: BANGLADESH / URBAN RESILIENCE (4 cols) */}
        <div className="md:col-span-4 glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden group border border-amber-500/20 hover:border-amber-400/40">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Globe className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
              05 · URBAN IMPACT
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            Engineered for Dense Megacities
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Tested for the architectural street canyons of Gulshan, Motijheel, and Old Dhaka. Low-vibration, silent, modular rooftop parapet installation for scalable municipal adoption.
          </p>
        </div>
      </div>
    </section>
  );
};
