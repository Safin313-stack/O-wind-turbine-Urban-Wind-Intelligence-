import React from 'react';
import { Wind, X, Check, Compass, RefreshCw } from 'lucide-react';
import { InView, Tilt, Spotlight, BorderBeam } from '../motion-primitives';

export const ShowcaseProblemSolution: React.FC = () => {
  return (
    <section id="aerodynamics" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <InView>
        {/* Section Header: Punchy & Informative */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22262C] border border-[#2E343D] text-[#FF8A24] text-[11px] font-mono font-bold tracking-wide">
            <Wind className="w-3.5 h-3.5 text-[#FF8A24]" />
            <span>AERODYNAMIC VECTOR COMPARISON</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#F5F5F2] tracking-tight font-display leading-[1.16]">
            Why Traditional Turbines{' '}
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent inline-block pb-1">
              Fail in Cities
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#A7ADB5] font-sans leading-relaxed max-w-2xl mx-auto">
            Dense skyscraper canyons transform steady laminar wind into chaotic 3D turbulent vortexes and vertical updrafts.
          </p>
        </div>

        {/* Side-by-Side Visual Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          
          {/* ============================================================ */}
          {/* LEFT: CONVENTIONAL TURBINES (Visual Problem Breakdown)       */}
          {/* ============================================================ */}
          <Tilt rotationFactor={3} className="h-full">
            <div className="bg-[#22262C]/95 backdrop-blur-2xl p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-red-500/30 hover:border-red-500/50 transition-all shadow-xl flex flex-col justify-between h-full relative overflow-hidden group">
              <Spotlight fill="rgba(239, 68, 68, 0.06)" size={220} />

              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2E343D]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-black">
                      <X className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-[#F5F5F2] leading-tight">Conventional Turbines</h3>
                      <span className="text-[10px] font-mono font-semibold text-red-400 uppercase tracking-wider">
                        Bladed Horizontal & Vertical (HAWT / VAWT)
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-[10px] font-mono font-bold text-red-400 uppercase tracking-wide">
                    Unsuitable
                  </span>
                </div>

                {/* Visual Flow Schematic 1: Stalling Flow in Urban Turbulence */}
                <div className="my-3 p-3.5 rounded-xl bg-[#1C2026] border border-[#2E343D] relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-red-400 mb-2">
                    <span className="flex items-center gap-1.5 text-[11px]">
                      <RefreshCw className="w-3.5 h-3.5 text-red-400" />
                      TURBULENT AIRFLOW VECTOR LOSS
                    </span>
                    <span className="text-red-400 text-[11px]">0% Updraft Capture</span>
                  </div>

                  {/* Visual SVG Aerodynamic Stalling Diagram */}
                  <svg className="w-full h-24 sm:h-28" viewBox="0 0 340 100" fill="none">
                    {/* Background Grid */}
                    <path d="M 0 50 L 340 50" stroke="#333842" strokeWidth="1" strokeDasharray="4 4" />
                    
                    {/* Deflected Horizontal Wind Vector */}
                    <path d="M 10 30 Q 100 30 140 18" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                    <polygon points="145,17 135,13 138,22" fill="#ef4444" />
                    <text x="15" y="22" fill="#f87171" fontSize="9" fontWeight="bold">Horizontal Gust</text>

                    {/* Deflected Updraft Vector */}
                    <path d="M 10 80 Q 90 80 140 90" stroke="#f87171" strokeWidth="2" strokeDasharray="3 3" />
                    <polygon points="145,91 135,86 137,95" fill="#f87171" />
                    <text x="15" y="93" fill="#fca5a5" fontSize="9" fontWeight="bold">Rooftop Updraft (Missed)</text>

                    {/* Blade Obstacle (Stall Indicator) */}
                    <circle cx="230" cy="50" r="26" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" fill="rgba(239,68,68,0.1)" />
                    <line x1="230" y1="24" x2="230" y2="76" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                    <line x1="206" y1="40" x2="254" y2="60" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="230" cy="50" r="4" fill="#ef4444" />

                    {/* Warning Callout */}
                    <rect x="268" y="38" width="62" height="24" rx="5" fill="#ef4444" />
                    <text x="274" y="53" fill="#ffffff" fontSize="9" fontWeight="bold">BLADE STALL</text>
                  </svg>

                  <div className="flex items-center justify-between text-[11px] font-sans text-[#A7ADB5] mt-1 pt-2 border-t border-[#2E343D]/60">
                    <span>Yaw Gearbox Hunting: <strong className="text-red-400">High Wear</strong></span>
                    <span>Cut-in Speed: <strong className="text-red-400">3.5 – 4.0 m/s</strong></span>
                  </div>
                </div>

                {/* 3 Crisp Technical Metric Rows */}
                <div className="space-y-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-[#1C2026] border border-[#2E343D] flex items-center justify-between">
                    <span className="text-xs font-sans text-[#A7ADB5]">Directional Flexibility</span>
                    <span className="text-xs font-bold text-red-400 font-mono">1 Axis (Unidirectional)</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#1C2026] border border-[#2E343D] flex items-center justify-between">
                    <span className="text-xs font-sans text-[#A7ADB5]">Vertical Updraft Capture</span>
                    <span className="text-xs font-bold text-red-400 font-mono">0% (Completely Missed)</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#1C2026] border border-[#2E343D] flex items-center justify-between">
                    <span className="text-xs font-sans text-[#A7ADB5]">Rooftop Acoustics</span>
                    <span className="text-xs font-bold text-red-400 font-mono">45 – 65 dB (Vibrations)</span>
                  </div>
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="pt-3 mt-3 border-t border-[#2E343D] flex items-center justify-between text-[11px] font-mono text-red-400">
                <span>MECHANICAL BOTTLENECK</span>
                <span className="font-bold">Frequent Yaw Failure</span>
              </div>
            </div>
          </Tilt>

          {/* ============================================================ */}
          {/* RIGHT: O-WIND AI ARCHITECTURE (Visual Solution)             */}
          {/* ============================================================ */}
          <Tilt rotationFactor={3} className="h-full">
            <div className="bg-[#22262C]/95 backdrop-blur-2xl p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-[#FF8A24]/40 hover:border-[#FF8A24]/70 transition-all shadow-xl flex flex-col justify-between h-full relative overflow-hidden group">
              <BorderBeam size={220} duration={12} colorFrom="#FF8A24" colorTo="#FFA959" />
              <Spotlight fill="rgba(255, 138, 36, 0.08)" size={220} />

              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2E343D]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FF8A24]/10 border border-[#FF8A24]/30 flex items-center justify-center text-[#FF8A24] font-black">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-[#F5F5F2] leading-tight">O-WIND Rotor</h3>
                      <span className="text-[10px] font-mono font-semibold text-[#FF8A24] uppercase tracking-wider">
                        Omnidirectional Venturi Sphere
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FF8A24]/10 border border-[#FF8A24]/30 text-[10px] font-mono font-bold text-[#FF8A24] uppercase tracking-wide">
                    City Optimized
                  </span>
                </div>

                {/* Visual Flow Schematic 2: 360° Omnidirectional Intake + Venturi Boost */}
                <div className="my-3 p-3.5 rounded-xl bg-[#1C2026] border border-[#2E343D] relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-[#FF8A24] mb-2">
                    <span className="flex items-center gap-1.5 text-[11px]">
                      <Compass className="w-3.5 h-3.5 text-[#FF8A24]" />
                      360° DUAL-AXIS INTAKE + VENTURI
                    </span>
                    <span className="text-emerald-400 font-mono font-bold text-[11px]">+1.4x Bernoulli Boost</span>
                  </div>

                  {/* Visual SVG Aerodynamic Venturi Acceleration Diagram */}
                  <svg className="w-full h-24 sm:h-28" viewBox="0 0 340 100" fill="none">
                    {/* Background Grid */}
                    <path d="M 0 50 L 340 50" stroke="#333842" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Horizontal Wind Vector Converging */}
                    <path d="M 10 32 Q 110 35 185 46" stroke="#FF8A24" strokeWidth="2.5" strokeLinecap="round" />
                    <polygon points="190,47 179,43 182,51" fill="#FF8A24" />
                    <text x="15" y="24" fill="#FFA959" fontSize="9" fontWeight="bold">Horizontal Gust (360°)</text>

                    {/* Rooftop Vertical Updraft Converging */}
                    <path d="M 10 78 Q 110 75 185 54" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                    <polygon points="190,53 182,49 179,57" fill="#38bdf8" />
                    <text x="15" y="93" fill="#7dd3fc" fontSize="9" fontWeight="bold">Vertical Rooftop Updraft</text>

                    {/* Geodesic Venturi Core (Spins in 1 Fixed Axis) */}
                    <circle cx="230" cy="50" r="28" stroke="#FF8A24" strokeWidth="2" fill="rgba(255,138,36,0.12)" />
                    {/* Internal Venturi Vane Curvature */}
                    <path d="M 212 50 Q 230 36 248 50" stroke="#FFA959" strokeWidth="1.8" fill="none" />
                    <path d="M 212 50 Q 230 64 248 50" stroke="#FFA959" strokeWidth="1.8" fill="none" />
                    <circle cx="230" cy="50" r="5" fill="#FF8A24" />

                    {/* Rotation Vector Arrow */}
                    <path d="M 246 32 A 18 18 0 0 1 246 68" stroke="#10b981" strokeWidth="2" strokeDasharray="2 2" />
                    <polygon points="244,72 249,66 242,65" fill="#10b981" />

                    {/* Success Badge */}
                    <rect x="268" y="38" width="66" height="24" rx="5" fill="#10b981" />
                    <text x="273" y="53" fill="#ffffff" fontSize="9" fontWeight="bold">1.48 m/s CUT-IN</text>
                  </svg>

                  <div className="flex items-center justify-between text-[11px] font-sans text-[#A7ADB5] mt-1 pt-2 border-t border-[#2E343D]/60">
                    <span>Static Axis: <strong className="text-emerald-400">Zero Motors Needed</strong></span>
                    <span>Enclosure: <strong className="text-[#FF8A24]">100% Bird Safe</strong></span>
                  </div>
                </div>

                {/* 3 Crisp Technical Metric Rows */}
                <div className="space-y-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-[#1C2026] border border-[#2E343D] flex items-center justify-between">
                    <span className="text-xs font-sans text-[#A7ADB5]">Directional Flexibility</span>
                    <span className="text-xs font-bold text-[#FF8A24] font-mono">360° Omnidirectional</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#1C2026] border border-[#2E343D] flex items-center justify-between">
                    <span className="text-xs font-sans text-[#A7ADB5]">Vertical Updraft Capture</span>
                    <span className="text-xs font-bold text-emerald-400 font-mono">100% (Funneled Through Core)</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#1C2026] border border-[#2E343D] flex items-center justify-between">
                    <span className="text-xs font-sans text-[#A7ADB5]">Rooftop Acoustics</span>
                    <span className="text-xs font-bold text-[#FF8A24] font-mono">&lt; 24 dB (Whisper Silent)</span>
                  </div>
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="pt-3 mt-3 border-t border-[#2E343D] flex items-center justify-between text-[11px] font-mono text-[#FF8A24]">
                <span>AERODYNAMIC ADVANTAGE</span>
                <span className="font-bold text-emerald-400">Continuous Fixed-Axis Power</span>
              </div>
            </div>
          </Tilt>

        </div>
      </InView>
    </section>
  );
};
