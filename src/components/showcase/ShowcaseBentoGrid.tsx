import React from 'react';
import { Wind, Zap, Cpu, CloudSun, Globe, Sparkles } from 'lucide-react';
import { InView, Tilt, Spotlight, BorderBeam } from '../motion-primitives';

export const ShowcaseBentoGrid: React.FC = () => {
  return (
    <section id="technology" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <InView>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-sans font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>FIVE CORE PILLARS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight font-display">
            The Architecture of Urban Wind Intelligence
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Five synergistic vectors engineered to turn chaotic city breezes into predictable clean electricity and real-time environmental data.
          </p>
        </div>

        {/* Motion Primitives Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Pillar 1: WIND (Large Feature Card - 7 cols) */}
          <div className="md:col-span-7">
            <Tilt rotationFactor={4} className="h-full">
              <div className="glass-card p-7 sm:p-9 rounded-3xl relative overflow-hidden group hover:border-cyan-400/50 h-full border border-stone-200/90 shadow-sm flex flex-col justify-between">
                <BorderBeam size={220} duration={14} colorFrom="#0284c7" colorTo="#38bdf8" />
                <Spotlight fill="rgba(2, 132, 199, 0.12)" size={240} />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 group-hover:scale-110 transition-transform">
                      <Wind className="w-6 h-6" />
                    </div>
                    <span className="shrink-0 whitespace-nowrap text-xs font-sans font-bold tracking-wide px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200">
                      01 · AERODYNAMICS
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-2.5 tracking-tight font-display">
                    360° Omnidirectional Aerodynamic Rotor
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans mb-5">
                    Spherical Venturi ducts convert 360° chaotic city breezes into continuous single-axis rotation without complex yaw steering.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-stone-200/80 font-sans text-xs">
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
                    <span className="text-stone-500 text-[10px] block font-bold uppercase tracking-wider">VENTURI EFFECT</span>
                    <span className="text-cyan-800 font-bold text-xs sm:text-sm">+1.4x Wind Boost</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
                    <span className="text-stone-500 text-[10px] block font-bold uppercase tracking-wider">YAW MOTORS</span>
                    <span className="text-emerald-800 font-bold text-xs sm:text-sm">Zero Maintenance</span>
                  </div>
                </div>
              </div>
            </Tilt>
          </div>

          {/* Pillar 2: ENERGY (5 cols) */}
          <div className="md:col-span-5">
            <Tilt rotationFactor={4} className="h-full">
              <div className="glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-400/50 h-full border border-stone-200/90 shadow-sm flex flex-col justify-between">
                <BorderBeam size={180} duration={12} colorFrom="#059669" colorTo="#10b981" />
                <Spotlight fill="rgba(16, 185, 129, 0.12)" size={220} />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform">
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="shrink-0 whitespace-nowrap text-xs font-sans font-bold tracking-wide px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      02 · MICROGRID
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 mb-2.5 tracking-tight font-display">
                    Diurnal Solar-Wind Balancing
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans mb-5">
                    Captures evening thermal building updrafts to keep LiFePO4 batteries charged during peak load-shedding hours (7 PM – 11 PM).
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 font-sans text-xs">
                  <span className="text-stone-500 text-[10px] block font-bold uppercase tracking-wider">POWERTRAIN EFFICIENCY</span>
                  <span className="text-emerald-800 font-bold text-xs sm:text-sm">81.8% Synchronous MPPT (3.7V)</span>
                </div>
              </div>
            </Tilt>
          </div>

          {/* Pillar 3: AI SITING (4 cols) */}
          <div className="md:col-span-4">
            <Tilt rotationFactor={5} className="h-full">
              <div className="glass-card p-5 sm:p-7 rounded-3xl relative overflow-hidden group hover:border-purple-400/50 h-full border border-stone-200/90 shadow-sm flex flex-col justify-between">
                <Spotlight fill="rgba(168, 85, 247, 0.12)" size={180} />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 group-hover:scale-110 transition-transform">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <span className="shrink-0 whitespace-nowrap text-xs font-sans font-bold tracking-wide px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
                      03 · AI SITING
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-2 font-display">
                    Neural Parapet CFD Siting
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    Edge AI analyzes urban canyon aerodynamics to target rooftop parapet lips where updrafts naturally accelerate (+40% lift).
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/70 text-[11px] font-sans text-purple-700 font-bold">
                  ✦ Edge-CFD v3.1 Inference
                </div>
              </div>
            </Tilt>
          </div>

          {/* Pillar 4: AIR SENSING (4 cols) */}
          <div className="md:col-span-4">
            <Tilt rotationFactor={5} className="h-full">
              <div className="glass-card p-5 sm:p-7 rounded-3xl relative overflow-hidden group hover:border-sky-400/50 h-full border border-stone-200/90 shadow-sm flex flex-col justify-between">
                <Spotlight fill="rgba(2, 132, 199, 0.12)" size={180} />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 group-hover:scale-110 transition-transform">
                      <CloudSun className="w-5 h-5" />
                    </div>
                    <span className="shrink-0 whitespace-nowrap text-xs font-sans font-bold tracking-wide px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                      04 · AIR SENTINEL
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-2 font-display">
                    Autonomous Air Quality Sentinel
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    Self-powered laser optical sensors track Dhaka's PM2.5 and CO2 micro-climate telemetry without grid infrastructure.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/70 text-[11px] font-sans text-sky-700 font-bold">
                  ✦ Plantower Laser + BME680
                </div>
              </div>
            </Tilt>
          </div>

          {/* Pillar 5: URBAN RESILIENCE (4 cols) */}
          <div className="md:col-span-4">
            <Tilt rotationFactor={5} className="h-full">
              <div className="glass-card p-5 sm:p-7 rounded-3xl relative overflow-hidden group hover:border-amber-400/50 h-full border border-stone-200/90 shadow-sm flex flex-col justify-between">
                <Spotlight fill="rgba(245, 158, 11, 0.12)" size={180} />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 group-hover:scale-110 transition-transform">
                      <Globe className="w-5 h-5" />
                    </div>
                    <span className="shrink-0 whitespace-nowrap text-xs font-sans font-bold tracking-wide px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      05 · URBAN IMPACT
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-2 font-display">
                    Engineered for Dense Cities
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    Tested for Gulshan & Motijheel street canyons. Silent (&lt;24 dB), enclosed zero-blade hazards, and simple parapet lip clamping.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/70 text-[11px] font-sans text-amber-700 font-bold">
                  ✦ IP65 · Safe Parapet Clamp
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </InView>
    </section>
  );
};
