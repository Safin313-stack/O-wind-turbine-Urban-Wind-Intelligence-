import React from 'react';
import { XCircle, CheckCircle2, Wind } from 'lucide-react';

export const ShowcaseProblemSolution: React.FC = () => {
  return (
    <section id="aerodynamics" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/90 text-indigo-800 text-xs font-mono font-medium">
          <Wind className="w-3.5 h-3.5 text-indigo-600" />
          <span>URBAN FLUID DYNAMICS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight font-sans">
          Why Cities Have Wind, But No Wind Turbines
        </h2>
        <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
          Dense skyscraper canyons break laminar air into turbulent, swirling vortices. Here is why conventional turbines fail, and how O-Wind solves the urban aerodynamic challenge.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Traditional Wind Turbines (The Problem) */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-red-200/80 bg-red-50/30 hover:border-red-300 relative overflow-hidden group">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-red-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center text-red-600 font-bold">
                ✕
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">Conventional Turbines</h3>
                <span className="text-xs font-mono text-red-600">Horizontal & Vertical Axis (HAWT / VAWT)</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-red-100/80 border border-red-200 text-[11px] font-mono text-red-700 font-semibold">
              Unsuitable for Cities
            </span>
          </div>

          <ul className="space-y-4 text-sm text-stone-700 font-sans">
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-semibold">Requires Unidirectional Laminar Wind:</strong>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  Traditional blades require steady, one-directional airflow. They stall when struck by multi-directional urban gusts.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-semibold">Mechanical Yaw Fatigue:</strong>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  Constant wind direction shifts force heavy yaw motors to track changing angles, causing rapid gearbox wear and mechanical failure.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-semibold">Cannot Capture Vertical Updrafts:</strong>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  Rooftop building facades deflect horizontal winds upward at steep 45°–90° angles—energy completely wasted by flat bladed turbines.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-semibold">Noise & Blade Hazards:</strong>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  High-speed spinning blades produce low-frequency vibration and present severe safety hazards in high-density urban areas.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Right: O-WIND AI Solution */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-cyan-300/90 bg-cyan-50/30 hover:border-cyan-400 relative overflow-hidden group shadow-md shadow-cyan-950/5">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-cyan-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-cyan-700 font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">O-WIND AI Architecture</h3>
                <span className="text-xs font-mono text-cyan-700">Omnidirectional Venturi Turbine</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-100/90 border border-cyan-300 text-[11px] font-mono text-cyan-800 font-semibold">
              Optimal for Buildings
            </span>
          </div>

          <ul className="space-y-4 text-sm text-stone-700 font-sans">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-semibold">360° Omnidirectional Airflow Capture:</strong>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  Spherical geometry with aerodynamic cross-sectional vents captures horizontal street gusts and vertical rooftop drafts simultaneously.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-semibold">Zero Moving Yaw Mechanisms:</strong>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  The turbine rotates on a single fixed axis. Regardless of the wind vector, internal Bernoulli pressure differentials continuously drive rotation.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-semibold">Bernoulli Venturi Acceleration:</strong>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  Internal ducts constrict airflow to speed up internal velocity, dropping air pressure and generating high torque even in low 1.48 m/s breezes.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-semibold">AI Rooftop Parapet Optimization:</strong>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
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
