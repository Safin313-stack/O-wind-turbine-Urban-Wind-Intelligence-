import React, { useState } from 'react';
import { Turbine3DViewer } from '../turbine3d/Turbine3DViewer';
import { Box, Layers, RotateCw, Wind, Cpu, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

export const Showcase3DStage: React.FC = () => {
  return (
    <section id="prototype" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-medium">
          <Box className="w-3.5 h-3.5 text-cyan-400" />
          <span>INTERACTIVE CAD TWIN</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
          The Omnidirectional O-Wind Prototype
        </h2>
        <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed">
          Directly rendered from the physical SolidWorks CAD model (<code className="text-cyan-300 font-mono text-xs">omni-directional-wind-turbine-1</code>). Drag to rotate 360°, inspect the internal aerodynamic Venturi ducts, and test rotational velocity.
        </p>
      </div>

      {/* Main 3D Canvas Container */}
      <div className="relative rounded-3xl glass-panel p-3 sm:p-6 border border-white/[0.1] shadow-2xl shadow-cyan-950/20 overflow-hidden">
        {/* Subtle Ambient Glow inside container */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Top CAD Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-2 border-b border-white/[0.08] text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-white font-bold tracking-wide">SOLIDWORKS CAD GEOMETRY</span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-cyan-300/90 hidden sm:inline">17,503 Polygons</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px]">
              Drag to Orbit · Scroll to Zoom
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] hidden md:inline">
              Touch Enabled
            </span>
          </div>
        </div>

        {/* 3D Model Viewer Component */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-space-950/90 border border-white/[0.06]">
          <Turbine3DViewer height="520px" showControls={true} />
        </div>

        {/* Aerodynamic Engineering Hotspots / Deep-Dive Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/[0.08] font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
              <Wind className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white block">Bernoulli Venturi Ducts</span>
              <p className="text-[11px] text-slate-400 font-sans mt-0.5 leading-relaxed">
                Internal cross-sectional taper accelerates airflow, creating low-pressure suction that drives rotation regardless of incoming wind direction.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <RotateCw className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white block">Unidirectional Shaft Torque</span>
              <p className="text-[11px] text-slate-400 font-sans mt-0.5 leading-relaxed">
                No matter where gusts strike (north, south, east, or rooftop updraft), internal geometry converts all kinetic vectors into rotation about a single fixed axis.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white block">Safe Spherical Housing</span>
              <p className="text-[11px] text-slate-400 font-sans mt-0.5 leading-relaxed">
                Enclosed geodesic structure prevents bird strikes, eliminates high-tip-speed acoustic noise, and safely mounts on urban parapet lips.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
