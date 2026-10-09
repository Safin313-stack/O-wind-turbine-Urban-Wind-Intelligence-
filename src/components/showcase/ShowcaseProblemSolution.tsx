import React from 'react';
import { Wind, X, Check, ShieldCheck, Volume2, Compass, ArrowUp, RefreshCw } from 'lucide-react';
import { InView, Tilt, Spotlight, BorderBeam } from '../motion-primitives';

export const ShowcaseProblemSolution: React.FC = () => {
  return (
    <section id="aerodynamics" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <InView>
        {/* Section Header: Punchy & Informative */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/90 text-cyan-900 text-xs font-sans font-bold tracking-wide">
            <Wind className="w-3.5 h-3.5 text-cyan-600" />
            <span>AERODYNAMIC COMPARISON</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight font-display leading-[1.16]">
            Why Traditional Wind Turbines{' '}
            <span className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 bg-clip-text text-transparent inline-block pb-1">
              Fail in Cities
            </span>
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed max-w-2xl mx-auto">
            Dense skyscraper canyons transform steady wind into multi-directional, turbulent vortexes.
          </p>
        </div>

        {/* Side-by-Side Visual Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* ============================================================ */}
          {/* LEFT: CONVENTIONAL TURBINES (Visual Problem Breakdown)       */}
          {/* ============================================================ */}
          <Tilt rotationFactor={4} className="h-full">
            <div className="bg-white/95 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border-2 border-red-200/80 hover:border-red-300 transition-all shadow-sm flex flex-col justify-between h-full relative overflow-hidden group">
              <Spotlight fill="rgba(239, 68, 68, 0.08)" size={220} />

              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-red-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 font-black">
                      <X className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-stone-900 leading-tight">Conventional Turbines</h3>
                      <span className="text-[11px] font-sans font-semibold text-red-600 uppercase tracking-wider">
                        Bladed Horizontal & Vertical (HAWT / VAWT)
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-[10px] font-sans font-bold text-red-700 uppercase tracking-wide">
                    Unsuitable
                  </span>
                </div>

                {/* Visual Flow Schematic 1: Stalling Flow in Urban Turbulence */}
                <div className="my-4 p-4 rounded-2xl bg-red-50/40 border border-red-100 relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs font-sans font-bold text-red-900 mb-2">
                    <span className="flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 text-red-500" />
                      TURBULENT AIRFLOW VECTOR LOSS
                    </span>
                    <span className="text-red-600 font-mono">0% Vertical Capture</span>
                  </div>

                  {/* Visual SVG Aerodynamic Stalling Diagram */}
                  <svg className="w-full h-28" viewBox="0 0 340 100" fill="none">
                    {/* Background Grid */}
                    <path d="M 0 50 L 340 50" stroke="#fecaca" strokeWidth="1" strokeDasharray="4 4" />
                    
                    {/* Deflected Horizontal Wind Vector */}
                    <path d="M 10 30 Q 100 30 140 18" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                    <polygon points="145,17 135,13 138,22" fill="#ef4444" />
                    <text x="15" y="22" fill="#991b1b" fontSize="9" fontWeight="bold">Horizontal Gust</text>

                    {/* Deflected Updraft Vector */}
                    <path d="M 10 80 Q 90 80 140 90" stroke="#f87171" strokeWidth="2" strokeDasharray="3 3" />
                    <polygon points="145,91 135,86 137,95" fill="#f87171" />
                    <text x="15" y="93" fill="#991b1b" fontSize="9" fontWeight="bold">Rooftop Updraft (Missed)</text>

                    {/* Blade Obstacle (Stall Indicator) */}
                    <circle cx="230" cy="50" r="26" stroke="#fca5a5" strokeWidth="2" strokeDasharray="4 2" fill="#fee2e2" />
                    <line x1="230" y1="24" x2="230" y2="76" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" />
                    <line x1="206" y1="40" x2="254" y2="60" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" />
                    <circle cx="230" cy="50" r="5" fill="#dc2626" />

                    {/* Warning Callout */}
                    <rect x="268" y="38" width="62" height="24" rx="6" fill="#ef4444" />
                    <text x="274" y="53" fill="#ffffff" fontSize="9" fontWeight="bold">BLADE STALL</text>
                  </svg>

                  <div className="flex items-center justify-between text-[11px] font-sans text-stone-600 mt-1 pt-2 border-t border-red-200/60">
                    <span>Yaw Gearbox Hunting: <strong className="text-red-700">High Wear</strong></span>
                    <span>Cut-in Speed: <strong className="text-red-700">3.5 – 4.0 m/s</strong></span>
                  </div>
                </div>

                {/* 3 Crisp Technical Metric Rows */}
                <div className="space-y-2.5 pt-2">
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
                    <span className="text-xs font-sans font-medium text-stone-600">Directional Flexibility</span>
                    <span className="text-xs font-bold text-red-700 font-mono">1 Axis Only (Unidirectional)</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
                    <span className="text-xs font-sans font-medium text-stone-600">Vertical Updraft Capture</span>
                    <span className="text-xs font-bold text-red-700 font-mono">0% (Completely Missed)</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
                    <span className="text-xs font-sans font-medium text-stone-600">Rooftop Acoustics</span>
                    <span className="text-xs font-bold text-red-700 font-mono">45 – 65 dB (Humming / Vibrate)</span>
                  </div>
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="pt-4 mt-4 border-t border-red-100 flex items-center justify-between text-[11px] font-sans text-red-600">
                <span>MECHANICAL BOTTLENECK</span>
                <span className="font-bold">Frequent Yaw Breakdown</span>
              </div>
            </div>
          </Tilt>

          {/* ============================================================ */}
          {/* RIGHT: O-WIND AI ARCHITECTURE (Visual Solution)             */}
          {/* ============================================================ */}
          <Tilt rotationFactor={4} className="h-full">
            <div className="bg-white/95 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border-2 border-cyan-300/90 hover:border-cyan-400 transition-all shadow-md shadow-cyan-950/5 flex flex-col justify-between h-full relative overflow-hidden group">
              <BorderBeam size={220} duration={10} colorFrom="#0284c7" colorTo="#06b6d4" />
              <Spotlight fill="rgba(6, 182, 212, 0.12)" size={220} />

              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-cyan-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 font-black">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-stone-900 leading-tight">O-WIND AI Rotor</h3>
                      <span className="text-[11px] font-sans font-semibold text-cyan-700 uppercase tracking-wider">
                        Omnidirectional Venturi Sphere
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[10px] font-sans font-bold text-cyan-800 uppercase tracking-wide">
                    City Optimized
                  </span>
                </div>

                {/* Visual Flow Schematic 2: 360° Omnidirectional Intake + Venturi Boost */}
                <div className="my-4 p-4 rounded-2xl bg-cyan-50/50 border border-cyan-200/90 relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs font-sans font-bold text-cyan-950 mb-2">
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-cyan-600" />
                      360° DUAL-AXIS INTAKE + VENTURI
                    </span>
                    <span className="text-cyan-700 font-mono font-bold">+1.4x Bernoulli Boost</span>
                  </div>

                  {/* Visual SVG Aerodynamic Venturi Acceleration Diagram */}
                  <svg className="w-full h-28" viewBox="0 0 340 100" fill="none">
                    {/* Background Grid */}
                    <path d="M 0 50 L 340 50" stroke="#bae6fd" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Horizontal Wind Vector Converging */}
                    <path d="M 10 32 Q 110 35 185 46" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
                    <polygon points="190,47 179,43 182,51" fill="#0284c7" />
                    <text x="15" y="24" fill="#0369a1" fontSize="9" fontWeight="bold">Horizontal Gust (360°)</text>

                    {/* Rooftop Vertical Updraft Converging */}
                    <path d="M 10 78 Q 110 75 185 54" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
                    <polygon points="190,53 182,49 179,57" fill="#06b6d4" />
                    <text x="15" y="93" fill="#0e7490" fontSize="9" fontWeight="bold">Vertical Rooftop Updraft</text>

                    {/* Geodesic Venturi Core (Spins in 1 Fixed Axis) */}
                    <circle cx="230" cy="50" r="28" stroke="#0284c7" strokeWidth="2.5" fill="#e0f2fe" />
                    {/* Internal Venturi Vane Curvature */}
                    <path d="M 212 50 Q 230 36 248 50" stroke="#0369a1" strokeWidth="2" fill="none" />
                    <path d="M 212 50 Q 230 64 248 50" stroke="#0369a1" strokeWidth="2" fill="none" />
                    <circle cx="230" cy="50" r="6" fill="#0284c7" />

                    {/* Rotation Vector Arrow */}
                    <path d="M 246 32 A 18 18 0 0 1 246 68" stroke="#10b981" strokeWidth="2" strokeDasharray="2 2" />
                    <polygon points="244,72 249,66 242,65" fill="#10b981" />

                    {/* Success Badge */}
                    <rect x="268" y="38" width="64" height="24" rx="6" fill="#059669" />
                    <text x="274" y="53" fill="#ffffff" fontSize="9" fontWeight="bold">1.48 m/s CUT-IN</text>
                  </svg>

                  <div className="flex items-center justify-between text-[11px] font-sans text-stone-700 mt-1 pt-2 border-t border-cyan-200">
                    <span>Static Axis: <strong className="text-emerald-700">Zero Motors Needed</strong></span>
                    <span>Enclosure: <strong className="text-cyan-800">100% Bird Safe</strong></span>
                  </div>
                </div>

                {/* 3 Crisp Technical Metric Rows */}
                <div className="space-y-2.5 pt-2">
                  <div className="p-3 rounded-2xl bg-cyan-50/60 border border-cyan-200/90 flex items-center justify-between">
                    <span className="text-xs font-sans font-medium text-stone-700">Directional Flexibility</span>
                    <span className="text-xs font-bold text-cyan-800 font-mono">360° Omnidirectional Intake</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-cyan-50/60 border border-cyan-200/90 flex items-center justify-between">
                    <span className="text-xs font-sans font-medium text-stone-700">Vertical Updraft Capture</span>
                    <span className="text-xs font-bold text-emerald-700 font-mono">100% (Funneled Through Core)</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-cyan-50/60 border border-cyan-200/90 flex items-center justify-between">
                    <span className="text-xs font-sans font-medium text-stone-700">Rooftop Acoustics</span>
                    <span className="text-xs font-bold text-cyan-800 font-mono">&lt; 24 dB (Whisper Silent)</span>
                  </div>
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="pt-4 mt-4 border-t border-cyan-200/80 flex items-center justify-between text-[11px] font-sans text-cyan-800">
                <span>AERODYNAMIC ADVANTAGE</span>
                <span className="font-bold">Continuous Fixed-Axis Power</span>
              </div>
            </div>
          </Tilt>

        </div>
      </InView>
    </section>
  );
};
