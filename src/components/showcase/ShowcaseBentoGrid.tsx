import React from 'react';
import { Wind, Zap, Cpu, CloudSun, ShieldCheck, Sparkles, Compass, Radio } from 'lucide-react';
import { InView, Tilt, Spotlight, BorderBeam } from '../motion-primitives';

export const ShowcaseBentoGrid: React.FC = () => {
  return (
    <section id="technology" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <InView>
        {/* Section Header: Minimal & Data-Driven */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs font-sans font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>SYSTEM ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight font-display leading-[1.16]">
            Five Technological{' '}
            <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent inline-block pb-1">
              Vectors.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed max-w-2xl mx-auto">
            From fluid dynamics to neural edge siting and autonomous microgrids.
          </p>
        </div>

        {/* Bento Grid: Highly Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* ============================================================ */}
          {/* PILLAR 1: AERODYNAMICS (Large 7 cols with Radial Flow Visual) */}
          {/* ============================================================ */}
          <div className="md:col-span-7">
            <Tilt rotationFactor={3} className="h-full">
              <div className="bg-white/95 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border-2 border-cyan-200/90 hover:border-cyan-400 transition-all shadow-sm flex flex-col justify-between h-full relative overflow-hidden group">
                <BorderBeam size={220} duration={14} colorFrom="#0284c7" colorTo="#38bdf8" />
                <Spotlight fill="rgba(2, 132, 199, 0.12)" size={240} />

                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700">
                        <Wind className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-sans font-bold text-cyan-800 uppercase tracking-wider block">
                          01 · FLUID DYNAMICS
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-stone-900">
                          360° Omnidirectional Venturi Rotor
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200">
                      1.48 m/s Cut-in
                    </span>
                  </div>

                  {/* VISUAL 1: Interactive Radial 360° Airflow Diagram */}
                  <div className="my-3 p-3.5 rounded-2xl bg-gradient-to-b from-cyan-50/40 to-sky-50/20 border border-cyan-100 flex flex-col sm:flex-row items-center gap-4">
                    <svg className="w-32 h-32 shrink-0" viewBox="0 0 120 120" fill="none">
                      {/* Outer Compass Guide */}
                      <circle cx="60" cy="60" r="54" stroke="#bae6fd" strokeWidth="1" strokeDasharray="3 3" />
                      
                      {/* 8 Omnidirectional Flow Arrows Converging Inward */}
                      <path d="M 60 12 L 60 38" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
                      <polygon points="60,42 56,34 64,34" fill="#0284c7" />

                      <path d="M 60 108 L 60 82" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
                      <polygon points="60,78 56,86 64,86" fill="#0284c7" />

                      <path d="M 12 60 L 38 60" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
                      <polygon points="42,60 34,56 34,64" fill="#0284c7" />

                      <path d="M 108 60 L 82 60" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
                      <polygon points="78,60 86,56 86,64" fill="#0284c7" />

                      {/* Diagonal Vectors */}
                      <path d="M 26 26 L 44 44" stroke="#38bdf8" strokeWidth="1.5" />
                      <polygon points="47,47 39,43 43,39" fill="#38bdf8" />

                      <path d="M 94 94 L 76 76" stroke="#38bdf8" strokeWidth="1.5" />
                      <polygon points="73,73 81,77 77,81" fill="#38bdf8" />

                      <path d="M 26 94 L 44 76" stroke="#38bdf8" strokeWidth="1.5" />
                      <polygon points="47,73 43,81 39,77" fill="#38bdf8" />

                      <path d="M 94 26 L 76 44" stroke="#38bdf8" strokeWidth="1.5" />
                      <polygon points="73,47 77,39 81,43" fill="#38bdf8" />

                      {/* Center Turbine Hub */}
                      <circle cx="60" cy="60" r="18" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
                      <circle cx="60" cy="60" r="6" fill="#0369a1" />
                      <text x="60" y="63" textAnchor="middle" fill="#0369a1" fontSize="7" fontWeight="bold">360°</text>
                    </svg>

                    <div className="flex-1 space-y-2 text-xs">
                      <div className="flex items-center justify-between pb-1.5 border-b border-cyan-100">
                        <span className="text-stone-500 font-sans">Horizontal Ingestion:</span>
                        <span className="font-bold text-stone-900 font-mono">Any Azimuth (0°–360°)</span>
                      </div>
                      <div className="flex items-center justify-between pb-1.5 border-b border-cyan-100">
                        <span className="text-stone-500 font-sans">Vertical Ingestion:</span>
                        <span className="font-bold text-stone-900 font-mono">45°–90° Facade Updrafts</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-500 font-sans">Bernoulli Boost:</span>
                        <span className="font-bold text-cyan-700 font-mono">+1.4x Flow Velocity</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 text-xs font-sans">
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                    <span className="text-[10px] text-stone-500 font-bold uppercase block">ROTATION AXIS</span>
                    <span className="font-extrabold text-stone-900">Fixed Static Spindle</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                    <span className="text-[10px] text-stone-500 font-bold uppercase block">STEERING MOTORS</span>
                    <span className="font-extrabold text-emerald-700">0 (Zero Yaw Needed)</span>
                  </div>
                </div>
              </div>
            </Tilt>
          </div>

          {/* ============================================================ */}
          {/* PILLAR 2: ENERGY (5 cols with Diurnal Solar/Wind Waveform)    */}
          {/* ============================================================ */}
          <div className="md:col-span-5">
            <Tilt rotationFactor={3} className="h-full">
              <div className="bg-white/95 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border-2 border-emerald-200/90 hover:border-emerald-400 transition-all shadow-sm flex flex-col justify-between h-full relative overflow-hidden group">
                <BorderBeam size={180} duration={12} colorFrom="#059669" colorTo="#10b981" />
                <Spotlight fill="rgba(16, 185, 129, 0.12)" size={220} />

                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-sans font-bold text-emerald-800 uppercase tracking-wider block">
                          02 · MICROGRID
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-stone-900">
                          24/7 Diurnal Power Balancing
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* VISUAL 2: Diurnal Solar vs Night Wind Waveform SVG */}
                  <div className="my-3 p-3.5 rounded-2xl bg-emerald-50/40 border border-emerald-100">
                    <div className="flex items-center justify-between text-[11px] font-sans font-bold text-stone-700 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Solar PV (Day)
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> O-Wind (Night Updrafts)
                      </span>
                    </div>

                    <svg className="w-full h-24" viewBox="0 0 280 80" fill="none">
                      {/* Timeline Axis */}
                      <line x1="10" y1="65" x2="270" y2="65" stroke="#cbd5e1" strokeWidth="1" />
                      <text x="15" y="76" fill="#64748b" fontSize="8" fontWeight="bold">6 AM</text>
                      <text x="135" y="76" fill="#64748b" fontSize="8" fontWeight="bold">12 PM</text>
                      <text x="215" y="76" fill="#047857" fontSize="8" fontWeight="bold">7–11 PM (OUTAGE)</text>

                      {/* Solar PV Curve (Midday bell curve) */}
                      <path
                        d="M 20 65 Q 130 15 200 65"
                        stroke="#f59e0b"
                        strokeWidth="2.5"
                        fill="rgba(245, 158, 11, 0.12)"
                      />

                      {/* O-Wind Curve (Evening Thermal Peak) */}
                      <path
                        d="M 180 65 Q 225 18 265 45"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        fill="rgba(16, 185, 129, 0.15)"
                      />

                      {/* Highlighted Outage Gap Filled Tag */}
                      <rect x="200" y="8" width="65" height="18" rx="4" fill="#059669" />
                      <text x="206" y="20" fill="#ffffff" fontSize="8" fontWeight="bold">WIND PEAK</text>
                    </svg>

                    <div className="text-[10px] font-sans text-stone-500 text-center mt-1">
                      Solar powers daytime; O-Wind powers 7–11 PM evening grid blackouts.
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between text-xs font-sans">
                  <span className="text-stone-500">Powertrain Efficiency:</span>
                  <span className="font-extrabold text-emerald-700 font-mono">81.8% Synchronous MPPT</span>
                </div>
              </div>
            </Tilt>
          </div>

          {/* ============================================================ */}
          {/* PILLAR 3: AI SITING (4 cols with Parapet Updraft Vector Diagram)*/}
          {/* ============================================================ */}
          <div className="md:col-span-4">
            <Tilt rotationFactor={4} className="h-full">
              <div className="bg-white/95 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl border-2 border-purple-200/90 hover:border-purple-400 transition-all shadow-sm flex flex-col justify-between h-full relative overflow-hidden group">
                <Spotlight fill="rgba(168, 85, 247, 0.12)" size={180} />

                <div>
                  <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-700">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-black text-stone-900">
                        Neural Parapet Siting
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                      +40% Lift
                    </span>
                  </div>

                  {/* VISUAL 3: Real AI-CFD Simulation Snapshot */}
                  <div className="my-2.5 relative rounded-2xl overflow-hidden h-28 border border-purple-200/90 bg-stone-900 shadow-inner group-hover:border-purple-400 transition-colors">
                    <img 
                      src="/images/ai_cfd_simulation.jpg" 
                      alt="AI CFD Airflow Simulation" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-[9px] font-mono font-bold text-white bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-xs border border-white/10">
                        AI-CFD NEURAL MESH
                      </span>
                    </div>
                    <div className="absolute bottom-1.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-cyan-300 font-semibold">V_max: 18.7 m/s</span>
                      <span className="text-purple-300 font-bold bg-purple-950/80 px-2 py-0.5 rounded border border-purple-400/30">+40% LIFT</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 font-sans mt-2">
                    Edge AI locates high-velocity acceleration zones at the building lip, avoiding stagnant roof centers.
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-stone-100 text-[11px] font-sans font-bold text-purple-700">
                  ✦ Edge-CFD Neural Placement
                </div>
              </div>
            </Tilt>
          </div>

          {/* ============================================================ */}
          {/* PILLAR 4: AIR SENTINEL (4 cols with PM2.5 Live Telemetry Bar)  */}
          {/* ============================================================ */}
          <div className="md:col-span-4">
            <Tilt rotationFactor={4} className="h-full">
              <div className="bg-white/95 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl border-2 border-sky-200/90 hover:border-sky-400 transition-all shadow-sm flex flex-col justify-between h-full relative overflow-hidden group">
                <Spotlight fill="rgba(2, 132, 199, 0.12)" size={180} />

                <div>
                  <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-700">
                        <CloudSun className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-black text-stone-900">
                        Autonomous Air Sentinel
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                      Zero Grid
                    </span>
                  </div>

                  {/* VISUAL 4: Laser Sensor Telemetry Visual Bar */}
                  <div className="my-2 p-3 rounded-xl bg-sky-50/40 border border-sky-100 space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-xs font-sans mb-1">
                        <span className="text-stone-500 font-semibold">Dhaka PM2.5 Laser:</span>
                        <span className="font-extrabold text-amber-600 font-mono">162 µg/m³</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden flex">
                        <div className="w-[65%] bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 rounded-full" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1 text-stone-600 font-sans">
                      <span className="flex items-center gap-1">
                        <Radio className="w-3 h-3 text-sky-600" /> LoRa Mesh:
                      </span>
                      <span className="font-mono font-bold text-stone-900">10 km Range</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 font-sans mt-2">
                    Self-powered laser sensors continuously log urban pollution patterns during grid power cuts.
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-stone-100 text-[11px] font-sans font-bold text-sky-700">
                  ✦ Plantower Optical + BME680
                </div>
              </div>
            </Tilt>
          </div>

          {/* ============================================================ */}
          {/* PILLAR 5: URBAN SAFETY (4 cols with Acoustic Decibel Scale)    */}
          {/* ============================================================ */}
          <div className="md:col-span-4">
            <Tilt rotationFactor={4} className="h-full">
              <div className="bg-white/95 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl border-2 border-amber-200/90 hover:border-amber-400 transition-all shadow-sm flex flex-col justify-between h-full relative overflow-hidden group">
                <Spotlight fill="rgba(245, 158, 11, 0.12)" size={180} />

                <div>
                  <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-black text-stone-900">
                        Rooftop Safety & Sound
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      &lt; 24 dB
                    </span>
                  </div>

                  {/* VISUAL 5: Acoustic Noise Bar Chart Comparison */}
                  <div className="my-2 p-3 rounded-xl bg-amber-50/40 border border-amber-100 space-y-1.5 text-xs font-sans">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-stone-500">City Traffic:</span>
                      <span className="font-mono text-stone-700">75 dB</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-stone-500">Bladed Turbine:</span>
                      <span className="font-mono text-red-600 font-bold">55 dB</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-emerald-800 bg-emerald-50/80 p-1 rounded-md border border-emerald-200">
                      <span>O-Wind Rotor:</span>
                      <span className="font-mono">&lt; 24 dB (Library Whisper)</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 font-sans mt-2">
                    Enclosed sphere with zero exposed blades. Bird-safe, vibration-free, and clamped onto parapets.
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-stone-100 text-[11px] font-sans font-bold text-amber-700">
                  ✦ IP65 Waterproof Enclosure
                </div>
              </div>
            </Tilt>
          </div>

        </div>
      </InView>
    </section>
  );
};
