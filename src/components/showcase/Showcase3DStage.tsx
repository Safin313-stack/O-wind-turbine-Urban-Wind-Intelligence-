import React from 'react';
import { Turbine3DViewer } from '../turbine3d/Turbine3DViewer';
import { RotateCw, Wind, Shield } from 'lucide-react';
import { InView, BorderBeam, Spotlight, Tilt } from '../motion-primitives';

export const Showcase3DStage: React.FC = () => {
  return (
    <section id="prototype" className="relative py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Engineering Glow Horizon */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[600px] h-[240px] bg-[#FF8A24]/[0.04] blur-[100px] pointer-events-none rounded-full -z-10" />

      <InView>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 space-y-2.5 px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22262C] border border-[#2E343D] text-[#FF8A24] text-[11px] font-mono font-bold tracking-wide shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#FF8A24] animate-ping" />
            <span>SOLIDWORKS TWIN · 1:1 CAD BLUEPRINT & FLUX</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#F5F5F2] tracking-tight font-display leading-[1.15]">
            Kinetic Aerodynamics,{' '}
            <span className="text-gradient-orange inline-block pb-1">
              Unmasked.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#A7ADB5] font-sans leading-relaxed max-w-2xl mx-auto">
            Inspect the 1:1 SolidWorks CAD twin or toggle <span className="font-semibold text-[#FF8A24] bg-[#22262C] px-2 py-0.5 rounded-md border border-[#2E343D]">X-Ray View</span> to examine the internal 12-pole PMG generator and power flux.
          </p>
        </div>

        {/* Main 3D Canvas Container */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#22262C]/90 backdrop-blur-xl p-2 sm:p-4 md:p-5 border border-[#2E343D] shadow-2xl overflow-hidden">
          <BorderBeam size={240} duration={14} colorFrom="#FF8A24" colorTo="#FFA959" />

          {/* 3D Model Viewer Component */}
          <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-inner border border-[#2E343D]/60">
            <Turbine3DViewer height="520px" showControls={true} />
          </div>

          {/* Aerodynamic Engineering Hotspots */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#2E343D] font-sans text-xs">
            <Tilt rotationFactor={4}>
              <div className="bg-[#1C2026] p-4 rounded-xl border border-[#2E343D] flex flex-col justify-between gap-3 group hover:border-[#FF8A24]/50 relative overflow-hidden h-full transition-colors">
                <Spotlight fill="rgba(255, 138, 36, 0.08)" size={140} />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-wide text-[#FF8A24] bg-[#FF8A24]/10 px-2.5 py-0.5 rounded-full border border-[#FF8A24]/30">
                      01 · VENTURI SUCTION
                    </span>
                    <div className="p-1.5 rounded-lg bg-[#22262C] border border-[#2E343D] text-[#FF8A24] group-hover:scale-110 transition-transform">
                      <Wind className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <h4 className="font-bold text-[#F5F5F2] text-sm font-display">Zero Yaw Steering</h4>
                  <p className="text-[11px] sm:text-xs text-[#A7ADB5] font-sans leading-relaxed">
                    Tapered ducts accelerate flow by +1.4x, spinning the sphere from any horizontal or rooftop upward gust.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#2E343D]/60 text-[10px] text-[#FF8A24] font-semibold font-mono">
                  ✦ +1.4x Airspeed Acceleration
                </div>
              </div>
            </Tilt>

            <Tilt rotationFactor={4}>
              <div className="bg-[#1C2026] p-4 rounded-xl border border-[#2E343D] flex flex-col justify-between gap-3 group hover:border-emerald-500/50 relative overflow-hidden h-full transition-colors">
                <Spotlight fill="rgba(16, 185, 129, 0.08)" size={140} />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-wide text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      02 · DIRECT-DRIVE PMG
                    </span>
                    <div className="p-1.5 rounded-lg bg-[#22262C] border border-[#2E343D] text-emerald-400 group-hover:scale-110 transition-transform">
                      <RotateCw className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <h4 className="font-bold text-[#F5F5F2] text-sm font-display">Axial Induction</h4>
                  <p className="text-[11px] sm:text-xs text-[#A7ADB5] font-sans leading-relaxed">
                    12 neodymium magnets sandwich copper coils to generate 3-phase AC directly into a 3.7V LiFePO4 bus.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#2E343D]/60 text-[10px] text-emerald-400 font-semibold font-mono">
                  ✦ 81.8% Synchronous MPPT
                </div>
              </div>
            </Tilt>

            <Tilt rotationFactor={4}>
              <div className="bg-[#1C2026] p-4 rounded-xl border border-[#2E343D] flex flex-col justify-between gap-3 group hover:border-cyan-500/50 relative overflow-hidden h-full transition-colors">
                <Spotlight fill="rgba(6, 182, 212, 0.08)" size={140} />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-wide text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                      03 · ENCLOSED SHELL
                    </span>
                    <div className="p-1.5 rounded-lg bg-[#22262C] border border-[#2E343D] text-cyan-400 group-hover:scale-110 transition-transform">
                      <Shield className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <h4 className="font-bold text-[#F5F5F2] text-sm font-display">Rooftop Safety</h4>
                  <p className="text-[11px] sm:text-xs text-[#A7ADB5] font-sans leading-relaxed">
                    Zero exposed blades. Smooth protective shell operating below 24 dB—silent and bird-safe on parapets.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#2E343D]/60 text-[10px] text-cyan-400 font-semibold font-mono">
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
