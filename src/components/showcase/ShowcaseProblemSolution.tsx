import React from 'react';
import { XCircle, CheckCircle2, AlertTriangle, Compass, Wind, Building2, Zap } from 'lucide-react';

export const ShowcaseProblemSolution: React.FC = () => {
  return (
    <section id="aerodynamics" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-medium">
          <Wind className="w-3.5 h-3.5 text-indigo-400" />
          <span>URBAN FLUID DYNAMICS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
          Why Cities Have Wind, But No Wind Turbines
        </h2>
        <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed">
          Dense skyscraper canyons break laminar air into turbulent, swirling vortices. Here is why conventional turbines fail, and how O-Wind solves the urban aerodynamic challenge.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Traditional Wind Turbines (The Problem) */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-red-500/20 hover:border-red-500/30 relative overflow-hidden group">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-bold">
                ✕
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Conventional Turbines</h3>
                <span className="text-xs font-mono text-red-400">Horizontal & Vertical Axis (HAWT / VAWT)</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[11px] font-mono text-red-300">
              Unsuitable for Cities
            </span>
          </div>

          <ul className="space-y-4 text-sm text-slate-300 font-sans">
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Requires Unidirectional Laminar Wind:</strong>
                <p className="text-xs text-slate-400 mt-0.5">
                  Traditional blades require steady, one-directional airflow. They stall when struck by multi-directional urban gusts.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Mechanical Yaw Fatigue:</strong>
                <p className="text-xs text-slate-400 mt-0.5">
                  Constant wind direction shifts force heavy yaw motors to track changing angles, causing rapid gearbox wear and failure.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Cannot Capture Vertical Updrafts:</strong>
                <p className="text-xs text-slate-400 mt-0.5">
                  Rooftop building facades deflect horizontal winds upward at steep 45°–90° angles—energy completely wasted by flat bladed turbines.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Noise & Blade Hazards:</strong>
                <p className="text-xs text-slate-400 mt-0.5">
                  High-speed spinning blades produce low-frequency vibration and present severe safety hazards in high-density urban areas.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Right: O-WIND AI Solution */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-cyan-500/30 hover:border-cyan-400/50 relative overflow-hidden group shadow-xl shadow-cyan-950/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">O-WIND AI Architecture</h3>
                <span className="text-xs font-mono text-cyan-400">Omnidirectional Venturi Turbine</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-[11px] font-mono text-cyan-200">
              Optimal for Buildings
            </span>
          </div>

          <ul className="space-y-4 text-sm text-slate-300 font-sans">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">360° Omnidirectional Airflow Capture:</strong>
                <p className="text-xs text-slate-400 mt-0.5">
                  Spherical geometry with aerodynamic cross-sectional vents captures horizontal street gusts and vertical rooftop drafts simultaneously.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Zero Moving Yaw Mechanisms:</strong>
                <p className="text-xs text-slate-400 mt-0.5">
                  The turbine rotates on a single fixed axis. Regardless of the wind vector, internal Bernoulli pressure differentials continuously drive rotation.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Bernoulli Venturi Acceleration:</strong>
                <p className="text-xs text-slate-400 mt-0.5">
                  Internal ducts constrict airflow to speed up internal velocity, dropping air pressure and generating high torque even in low 1.48 m/s breezes.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">AI Rooftop Parapet Optimization:</strong>
                <p className="text-xs text-slate-400 mt-0.5">
                  Neural fluid dynamics analyzes rooftop geometry to place turbines exactly on the parapet lip where wind speed is naturally amplified by +1.4x.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
