import React from 'react';
import { XCircle, CheckCircle2, Wind } from 'lucide-react';
import { InView, Tilt, Spotlight, BorderBeam } from '../motion-primitives';

export const ShowcaseProblemSolution: React.FC = () => {
  return (
    <section id="aerodynamics" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <InView>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/90 text-indigo-800 text-xs font-sans font-bold tracking-wide">
            <Wind className="w-3.5 h-3.5 text-indigo-600" />
            <span>URBAN FLUID DYNAMICS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight font-display">
            Why Cities Have Wind, But No Wind Turbines
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Dense skyscraper canyons break laminar air into turbulent, swirling vortices. Here is why conventional turbines fail, and how O-Wind solves the urban aerodynamic challenge.
          </p>
        </div>

        {/* Comparison Grid with Motion Primitives Tilt & Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Traditional Wind Turbines (The Problem) */}
          <Tilt rotationFactor={5}>
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-red-200/80 bg-red-50/30 hover:border-red-300 relative overflow-hidden group h-full shadow-sm">
              <Spotlight fill="rgba(239, 68, 68, 0.08)" size={200} />
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-red-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center text-red-600 font-bold">
                    ✕
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">Conventional Turbines</h3>
                    <span className="text-xs font-sans font-medium text-red-600">Horizontal & Vertical Axis (HAWT / VAWT)</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-red-100/80 border border-red-200 text-[11px] font-sans text-red-700 font-bold">
                  Unsuitable for Cities
                </span>
              </div>

              <ul className="space-y-3 text-sm text-stone-700 font-sans">
                <li className="flex items-start gap-2.5 p-2 rounded-xl bg-red-50/50 border border-red-100">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-900 font-bold block text-xs">Unidirectional Bladed Design</span>
                    <p className="text-[11px] text-stone-600">Stalls and vibrates in turbulent, multi-angle city winds.</p>
                  </div>
                </li>

                <li className="flex items-start gap-2.5 p-2 rounded-xl bg-red-50/50 border border-red-100">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-900 font-bold block text-xs">Heavy Yaw Gearbox Fatigue</span>
                    <p className="text-[11px] text-stone-600">Constantly hunting shifting wind directions wears out mechanical motors.</p>
                  </div>
                </li>

                <li className="flex items-start gap-2.5 p-2 rounded-xl bg-red-50/50 border border-red-100">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-900 font-bold block text-xs">Misses Vertical Rooftop Updrafts</span>
                    <p className="text-[11px] text-stone-600">Cannot capture the 45°–90° upward draft deflected by building facades.</p>
                  </div>
                </li>

                <li className="flex items-start gap-2.5 p-2 rounded-xl bg-red-50/50 border border-red-100">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-900 font-bold block text-xs">Blade Hazard & Acoustic Hum</span>
                    <p className="text-[11px] text-stone-600">Exposed rotating blades pose bird strike risk and building vibration.</p>
                  </div>
                </li>
              </ul>
            </div>
          </Tilt>

          {/* Right: O-WIND AI Solution */}
          <Tilt rotationFactor={5}>
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-cyan-300/90 bg-cyan-50/30 hover:border-cyan-400 relative overflow-hidden group shadow-md shadow-cyan-950/5 h-full">
              <BorderBeam size={220} duration={10} colorFrom="#059669" colorTo="#06b6d4" />
              <Spotlight fill="rgba(6, 182, 212, 0.12)" size={200} />
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-cyan-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-cyan-700 font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">O-WIND AI Architecture</h3>
                    <span className="text-xs font-sans font-medium text-cyan-700">Omnidirectional Venturi Turbine</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-100/90 border border-cyan-300 text-[11px] font-sans text-cyan-800 font-bold">
                  Optimal for Buildings
                </span>
              </div>

              <ul className="space-y-3 text-sm text-stone-700 font-sans">
                <li className="flex items-start gap-2.5 p-2 rounded-xl bg-cyan-50/60 border border-cyan-100">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-900 font-bold block text-xs">360° Omnidirectional Intake</span>
                    <p className="text-[11px] text-stone-600">Simultaneously captures horizontal drafts and vertical rooftop updrafts.</p>
                  </div>
                </li>

                <li className="flex items-start gap-2.5 p-2 rounded-xl bg-cyan-50/60 border border-cyan-100">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-900 font-bold block text-xs">Zero Yaw Motors (Fixed Axis)</span>
                    <p className="text-[11px] text-stone-600">Rotates reliably on a single fixed axis without mechanical steering.</p>
                  </div>
                </li>

                <li className="flex items-start gap-2.5 p-2 rounded-xl bg-cyan-50/60 border border-cyan-100">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-900 font-bold block text-xs">Bernoulli Venturi Acceleration</span>
                    <p className="text-[11px] text-stone-600">Internal tapered ducts accelerate airflow to start generating at 1.48 m/s.</p>
                  </div>
                </li>

                <li className="flex items-start gap-2.5 p-2 rounded-xl bg-cyan-50/60 border border-cyan-100">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-900 font-bold block text-xs">Enclosed Geodesic & Silent (&lt;24 dB)</span>
                    <p className="text-[11px] text-stone-600">Zero exposed blades: completely bird-friendly and silent on rooftop parapets.</p>
                  </div>
                </li>
              </ul>
            </div>
          </Tilt>
        </div>
      </InView>
    </section>
  );
};
