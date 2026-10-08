import React from 'react';
import { Turbine3DViewer } from '../turbine3d/Turbine3DViewer';
import { Box, RotateCw, Wind, Shield, CheckCircle2 } from 'lucide-react';

export const Showcase3DStage: React.FC = () => {
  return (
    <section id="prototype" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/90 text-cyan-800 text-xs font-mono font-medium">
          <Box className="w-3.5 h-3.5 text-cyan-600" />
          <span>INTERACTIVE CAD TWIN</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight font-sans">
          The Omnidirectional O-Wind Prototype
        </h2>
        <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
          Directly rendered from the physical SolidWorks CAD model (<code className="text-cyan-800 bg-cyan-50 px-1.5 py-0.5 rounded font-mono text-xs">omni-directional-wind-turbine-1</code>). Drag to rotate 360°, inspect the internal aerodynamic Venturi ducts, and test rotational velocity.
        </p>
      </div>

      {/* Main 3D Canvas Container */}
      <div className="relative rounded-3xl glass-panel p-4 sm:p-7 border border-stone-200/90 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Top CAD Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-2 border-b border-stone-200/80 text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping" />
            <span className="text-stone-900 font-bold tracking-wide">SOLIDWORKS CAD GEOMETRY</span>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <span className="text-cyan-700 font-semibold hidden sm:inline">17,503 Polygons</span>
          </div>

          <div className="flex items-center gap-2 text-stone-500">
            <span className="px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-[11px] font-medium text-stone-700">
              Drag to Orbit · Scroll to Zoom
            </span>
            <span className="px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-[11px] font-medium text-stone-700 hidden md:inline">
              Touch Enabled
            </span>
          </div>
        </div>

        {/* 3D Model Viewer Component */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-inner">
          <Turbine3DViewer height="520px" showControls={true} />
        </div>

        {/* Aerodynamic Engineering Hotspots / Deep-Dive Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-5 pt-5 border-t border-stone-200/80 font-mono text-xs">
          <div className="glass-card p-4 rounded-2xl border border-stone-200/80 flex items-start gap-3.5 group hover:border-cyan-400/40">
            <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200/80 text-cyan-600 shrink-0 group-hover:scale-110 transition-transform">
              <Wind className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-stone-900 block text-xs">Bernoulli Venturi Ducts</span>
              <p className="text-[11px] text-stone-500 font-sans mt-0.5 leading-relaxed">
                Internal cross-sectional taper accelerates airflow, creating low-pressure suction that drives rotation regardless of incoming wind direction.
              </p>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-stone-200/80 flex items-start gap-3.5 group hover:border-emerald-400/40">
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform">
              <RotateCw className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-stone-900 block text-xs">Unidirectional Shaft Torque</span>
              <p className="text-[11px] text-stone-500 font-sans mt-0.5 leading-relaxed">
                No matter where gusts strike (north, south, east, or rooftop updraft), internal geometry converts all kinetic vectors into rotation about a single fixed axis.
              </p>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-stone-200/80 flex items-start gap-3.5 group hover:border-purple-400/40">
            <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200/80 text-purple-600 shrink-0 group-hover:scale-110 transition-transform">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-stone-900 block text-xs">Safe Spherical Housing</span>
              <p className="text-[11px] text-stone-500 font-sans mt-0.5 leading-relaxed">
                Enclosed geodesic structure prevents bird strikes, eliminates high-tip-speed acoustic noise, and safely mounts on urban parapet lips.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
