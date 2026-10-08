import React, { useState } from 'react';
import { BANGLADESH_SITES, DHAKA_MICRO_DISTRICTS } from '../../data/bangladeshSites';
import { BangladeshLocation } from '../../types';
import {
  MapPin,
  Layers,
  Wind,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Info,
  CheckCircle2,
  Sparkles,
  Building2,
  Compass,
  ArrowRight
} from 'lucide-react';

export const BangladeshMapView: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<BangladeshLocation>(BANGLADESH_SITES[0]);
  const [isDhakaZoom, setIsDhakaZoom] = useState<boolean>(false);
  const [activeLayer, setActiveLayer] = useState<'speed' | 'density' | 'potential' | 'prototype'>('speed');

  return (
    <div className="space-y-6">
      {/* 1. Header with Zoom and Layer Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono font-semibold">
              NATIONAL GIS MESH
            </span>
            <span className="text-xs font-mono text-slate-400">Bangladesh Renewable Atlas</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Bangladesh Wind Intelligence & Siting Map
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Geographic distribution of urban canyon wind density, coastal wind corridors, and prototype deployments
          </p>
        </div>

        {/* Layer and Zoom Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layer Selector */}
          <div className="flex items-center bg-space-900 border border-slate-800 p-1 rounded-lg text-xs font-mono">
            <button
              onClick={() => setActiveLayer('speed')}
              className={`px-2.5 py-1 rounded transition ${activeLayer === 'speed' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'}`}
            >
              Wind Speed
            </button>
            <button
              onClick={() => setActiveLayer('density')}
              className={`px-2.5 py-1 rounded transition ${activeLayer === 'density' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'}`}
            >
              Power Density
            </button>
            <button
              onClick={() => setActiveLayer('potential')}
              className={`px-2.5 py-1 rounded transition ${activeLayer === 'potential' ? 'bg-purple-500/20 text-purple-300 font-bold' : 'text-slate-400'}`}
            >
              AI Potential
            </button>
          </div>

          {/* Dhaka Zoom Toggle */}
          <button
            onClick={() => setIsDhakaZoom(!isDhakaZoom)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition ${
              isDhakaZoom
                ? 'bg-purple-600/30 text-purple-200 border-purple-500/50 shadow-glow-purple font-bold'
                : 'bg-space-900 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{isDhakaZoom ? 'VIEW BANGLADESH' : 'ZOOM DHAKA METRO'}</span>
          </button>
        </div>
      </div>

      {/* 2. Main Map Workspace: Interactive Map on Left | Site Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Stylized Vector Map */}
        <div className="lg:col-span-8 bg-space-900/90 rounded-xl p-5 border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[500px]">
          {/* Map Status Header */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-white font-bold">
                {isDhakaZoom ? 'DHAKA METROPOLITAN MICRO-CORRIDORS' : 'BANGLADESH NATIONAL OVERVIEW'}
              </span>
            </div>

            {/* Data Source Trust Badges for Map */}
            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                Reference Wind Data (National)
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Prototype Sensor Data (Local)
              </span>
            </div>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full h-96 my-2 flex items-center justify-center overflow-hidden bg-space-950/80 rounded-xl border border-slate-800">
            {!isDhakaZoom ? (
              /* Bangladesh National Geographic SVG */
              <svg viewBox="0 0 500 500" className="w-full h-full max-h-[460px]">
                {/* Bay of Bengal Background */}
                <rect width="500" height="500" fill="#040814" />

                {/* Stylized Bangladesh Boundary Polygon */}
                <path
                  d="M 170 50 L 250 40 L 320 60 L 350 110 L 410 130 L 430 180 L 390 230 L 410 320 L 430 420 L 370 450 L 330 380 L 290 400 L 240 430 L 200 370 L 170 340 L 140 310 L 120 220 L 110 160 L 150 100 Z"
                  fill="#0c1730"
                  stroke="#1e3a8a"
                  strokeWidth="2"
                />

                {/* Major River Lines (Padma, Meghna, Jamuna) */}
                <path d="M 130 180 Q 220 240 260 270 T 310 400" fill="none" stroke="#0284c7" strokeWidth="1.5" opacity="0.6" />
                <path d="M 230 40 Q 240 160 260 270" fill="none" stroke="#0284c7" strokeWidth="1.5" opacity="0.6" />

                {/* Heatmap Rings for Coastal & Dhaka Corridors */}
                {activeLayer === 'speed' && (
                  <g>
                    {/* Coastal High Wind Zone */}
                    <circle cx="390" cy="410" r="50" fill="#00E5FF" opacity="0.15" />
                    <circle cx="390" cy="410" r="30" fill="#00E5FF" opacity="0.25" />
                    {/* Dhaka Urban Venturi Zone */}
                    <circle cx="260" cy="240" r="35" fill="#10B981" opacity="0.2" />
                  </g>
                )}

                {/* Interactive Location Markers */}
                {BANGLADESH_SITES.map((site) => {
                  const isSelected = selectedSite.id === site.id;
                  const x = (site.svgPos.x / 100) * 500;
                  const y = (site.svgPos.y / 100) * 500;

                  return (
                    <g
                      key={site.id}
                      onClick={() => setSelectedSite(site)}
                      className="cursor-pointer transition-transform hover:scale-125"
                    >
                      {/* Outer pulse */}
                      <circle
                        cx={x}
                        cy={y}
                        r={site.isPrototypeSite ? "12" : "8"}
                        fill={site.isPrototypeSite ? "#10B981" : "#00E5FF"}
                        opacity={isSelected ? "0.4" : "0.2"}
                        className="animate-ping"
                      />
                      {/* Main node pin */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? "7" : "5"}
                        fill={site.isPrototypeSite ? "#10B981" : "#00E5FF"}
                        stroke="#FFFFFF"
                        strokeWidth={isSelected ? "2.5" : "1"}
                      />
                      {/* Text label */}
                      <text
                        x={x + 10}
                        y={y + 4}
                        fill={isSelected ? "#FFFFFF" : "#94a3b8"}
                        fontSize={isSelected ? "11" : "9"}
                        fontFamily="monospace"
                        fontWeight={isSelected ? "bold" : "normal"}
                      >
                        {site.name.split('—')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            ) : (
              /* Dhaka Metro Zoomed Grid SVG */
              <div className="w-full h-full p-4 flex flex-col justify-between font-mono">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span className="text-white font-bold">DHAKA URBAN WIND CANYONS</span>
                  <span className="text-cyan-400">Venturi Amplification Active</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-2">
                  {DHAKA_MICRO_DISTRICTS.map((d) => (
                    <div
                      key={d.id}
                      className="p-3 rounded-lg bg-space-900 border border-slate-800 hover:border-cyan-500/50 transition cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">{d.name}</span>
                        <span className="text-emerald-400 font-bold">{d.potential}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-2 space-y-0.5">
                        <div>Avg Speed: <strong className="text-cyan-300">{d.avgSpeed}</strong></div>
                        <div>Density: {d.buildingDensity} High-Rise</div>
                        <div>AQI: {d.aqi} Moderate-Unhealthy</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] text-slate-500 text-center">
                  Click any district to view aerodynamic building exposure profiles
                </div>
              </div>
            )}
          </div>

          {/* Bottom Quick Selector Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-800 z-10 scrollbar-thin">
            {BANGLADESH_SITES.map((site) => {
              const isSelected = selectedSite.id === site.id;
              return (
                <button
                  key={site.id}
                  onClick={() => setSelectedSite(site)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono whitespace-nowrap border transition ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                      : 'bg-space-950/60 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {site.name.split('—')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Siting Inspector Panel */}
        <div className="lg:col-span-4 bg-space-900/90 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div>
                <span className="stat-label text-wind-cyan">
                  <MapPin className="w-3.5 h-3.5" />
                  Site Inspector
                </span>
                <h3 className="text-base font-mono font-bold text-white mt-1">
                  {selectedSite.name}
                </h3>
              </div>
              <div className="text-right font-mono">
                <span className="text-[10px] text-slate-400 block">AI SCORE</span>
                <span className="text-2xl font-extrabold text-emerald-400">
                  {selectedSite.potentialScore}%
                </span>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-space-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Average Wind Speed:</span>
                <strong className="text-wind-cyan text-sm">{selectedSite.avgWindSpeed} m/s</strong>
              </div>

              <div className="p-2.5 rounded-lg bg-space-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Wind Power Density:</span>
                <strong className="text-white text-sm">{selectedSite.windPowerDensity} W/m²</strong>
              </div>

              <div className="p-2.5 rounded-lg bg-space-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Recommended Units:</span>
                <strong className="text-emerald-400 text-sm">{selectedSite.recommendedTurbines} O-Wind Nodes</strong>
              </div>

              <div className="p-2.5 rounded-lg bg-space-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Urban Typology:</span>
                <span className="text-purple-300 font-semibold">{selectedSite.urbanDensity}</span>
              </div>
            </div>

            {/* AI Recommendation Box */}
            <div className="mt-4 p-4 rounded-xl bg-purple-950/30 border border-purple-500/30">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-300 mb-1.5 uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Regional Recommendation</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {selectedSite.notes}
              </p>
            </div>
          </div>

          {/* Footer with Data Attribution Notice */}
          <div className="pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex items-center justify-between mt-4">
            <span>
              {selectedSite.isPrototypeSite ? '● Prototype Sensor Data' : '○ Reference Wind Data'}
            </span>
            <span>Coord: {selectedSite.coordinates.lat}°N, {selectedSite.coordinates.lng}°E</span>
          </div>
        </div>
      </div>
    </div>
  );
};
