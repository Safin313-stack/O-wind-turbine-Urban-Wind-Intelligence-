import React from 'react';
import { Turbine3DViewer } from '../turbine3d/Turbine3DViewer';
import { RotateCw, Wind, Shield } from 'lucide-react';
import { InView, BorderBeam, Spotlight, Tilt } from '../motion-primitives';

export const Showcase3DStage: React.FC = () => {
  return (
    <section id="prototype" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Quiet Architectural Stage Illumination */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-sky-500/[0.03] blur-[90px] pointer-events-none rounded-full -z-10" />

      <InView>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3.5 px-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50/90 border border-cyan-300/80 text-cyan-900 text-xs font-sans font-bold tracking-wide shadow-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            <span>SOLIDWORKS TWIN · X-RAY FLUX TELEMETRY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-stone-900 tracking-tight font-display leading-[1.15] sm:leading-[1.18]">
            Kinetic Aerodynamics,{' '}
            <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent inline-block pb-1.5">
              Unmasked.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed max-w-2xl mx-auto">
            Streamed live from our physical SolidWorks CAD assembly. Inspect the geodetic titanium rotor, or toggle <span className="font-semibold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-200">X-Ray View</span> to expose the internal 12-pole PMG induction, ceramic bearings, and real-time power flux.
          </p>
        </div>

        {/* Main 3D Canvas Container with Motion Primitives Border Beam */}
        <div className="relative rounded-2xl sm:rounded-3xl glass-panel p-2.5 sm:p-5 md:p-6 border border-stone-200/90 shadow-[0_16px_48px_-6px_rgba(2,132,199,0.08)] overflow-hidden">
          <BorderBeam size={260} duration={12} colorFrom="#0284c7" colorTo="#38bdf8" />

          {/* 3D Model Viewer Component */}
          <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-inner">
            <Turbine3DViewer height="640px" showControls={true} />
          </div>

          {/* Aerodynamic Engineering Hotspots with Tilt and Spotlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-stone-200/80 font-sans text-xs">
            <Tilt rotationFactor={5}>
              <div className="glass-card p-4 sm:p-5 rounded-2xl border border-stone-200/80 flex flex-col justify-between gap-3 group hover:border-cyan-400/40 relative overflow-hidden h-full shadow-sm">
                <Spotlight fill="rgba(2, 132, 199, 0.10)" size={150} />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-sans font-bold tracking-wide text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">
                      01 · BERNOULLI VENTURI
                    </span>
                    <div className="p-1.5 rounded-lg bg-cyan-50 border border-cyan-200/80 text-cyan-600 group-hover:scale-110 transition-transform">
                      <Wind className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm font-display">Zero Yaw Steering</h4>
                  <p className="text-[11px] sm:text-xs text-stone-500 font-sans leading-relaxed">
                    Tapered cross-ducts generate low-pressure suction, spinning the sphere whether breezes strike horizontally or rush upward from building facades.
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-100 text-[10px] text-cyan-800 font-semibold font-mono">
                  ✦ +1.4x Airspeed Acceleration
                </div>
              </div>
            </Tilt>

            <Tilt rotationFactor={5}>
              <div className="glass-card p-4 sm:p-5 rounded-2xl border border-stone-200/80 flex flex-col justify-between gap-3 group hover:border-emerald-400/40 relative overflow-hidden h-full shadow-sm">
                <Spotlight fill="rgba(16, 185, 129, 0.10)" size={150} />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-sans font-bold tracking-wide text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      02 · 12-POLE AXIAL PMG
                    </span>
                    <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-600 group-hover:scale-110 transition-transform">
                      <RotateCw className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm font-display">Direct-Drive Induction</h4>
                  <p className="text-[11px] sm:text-xs text-stone-500 font-sans leading-relaxed">
                    Dual neodymium rotor discs sandwich 12 stationary copper coils to produce 3-phase AC, feeding an active 81.8% synchronous step-down bus.
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-100 text-[10px] text-emerald-800 font-semibold font-mono">
                  ✦ 3.7V LiFePO4 Native Bus
                </div>
              </div>
            </Tilt>

            <Tilt rotationFactor={5}>
              <div className="glass-card p-4 sm:p-5 rounded-2xl border border-stone-200/80 flex flex-col justify-between gap-3 group hover:border-purple-400/40 relative overflow-hidden h-full shadow-sm">
                <Spotlight fill="rgba(168, 85, 247, 0.10)" size={150} />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-sans font-bold tracking-wide text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                      03 · GEODETIC CASING
                    </span>
                    <div className="p-1.5 rounded-lg bg-purple-50 border border-purple-200/80 text-purple-600 group-hover:scale-110 transition-transform">
                      <Shield className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm font-display">Silent Parapet Sentinel</h4>
                  <p className="text-[11px] sm:text-xs text-stone-500 font-sans leading-relaxed">
                    Zero exposed blades. Smooth geodetic carbon-polycarbonate shell operates below 24 dB—silent enough for rooftop balconies and hospitals.
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-100 text-[10px] text-purple-800 font-semibold font-mono">
                  ✦ &lt; 24 dB Whisper Quiet
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </InView>
    </section>
  );
};
