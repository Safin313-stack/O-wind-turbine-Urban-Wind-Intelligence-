import React, { useState, useEffect } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { BUILDING_SITES } from '../../data/buildingModels';
import { BuildingSite, PlacementNode } from '../../types';
import { soundFx } from '../../utils/audio';
import {
  Cpu,
  Sparkles,
  Building2,
  CheckCircle2,
  Play,
  RotateCcw,
  Compass,
  Wind,
  Layers,
  Activity,
  ArrowRight,
  TrendingUp,
  MapPin,
  ShieldCheck,
  Zap,
  Columns
} from 'lucide-react';

const ANALYSIS_STAGES = [
  'Collecting micro-district wind velocity vectors...',
  'Analyzing building geometry & parapet boundary layer...',
  'Evaluating 3D wind azimuth & elevation angles...',
  'Simulating Venturi turbulence & vortex separation...',
  'Computing neural placement suitability score...',
  'Synthesizing final engineering recommendation...',
];

export const AiSiteOptimizerView: React.FC = () => {
  const { selectedBuildingId, setSelectedBuildingId } = useTelemetry();

  const currentBuilding =
    BUILDING_SITES.find((b) => b.id === selectedBuildingId) || BUILDING_SITES[0];

  const [selectedNode, setSelectedNode] = useState<PlacementNode>(currentBuilding.nodes[0]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStageIdx, setAnalysisStageIdx] = useState<number>(-1);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [showCfdVectors, setShowCfdVectors] = useState<boolean>(true);
  const [compareMode, setCompareMode] = useState<boolean>(false);

  useEffect(() => {
    setSelectedNode(currentBuilding.nodes[0]);
    setAnalysisComplete(false);
  }, [selectedBuildingId, currentBuilding]);

  const handleRunAnalysis = () => {
    soundFx.playClick();
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setAnalysisStageIdx(0);

    let stage = 0;
    const interval = setInterval(() => {
      stage += 1;
      if (stage < ANALYSIS_STAGES.length) {
        setAnalysisStageIdx(stage);
        soundFx.playBeep(440 + stage * 60, 0.05, 0.04);
      } else {
        clearInterval(interval);
        setIsAnalyzing(false);
        setAnalysisComplete(true);
        soundFx.playOptimalFound(); // Arpeggio fanfare
        const highestNode = [...currentBuilding.nodes].sort((a, b) => b.aiScore - a.aiScore)[0];
        setSelectedNode(highestNode);
      }
    }, 650);
  };

  const getNodeColor = (score: number) => {
    if (score >= 85) return { bg: 'bg-emerald-500', border: 'border-emerald-400', text: 'text-emerald-400', ring: 'ring-emerald-500/40' };
    if (score >= 70) return { bg: 'bg-amber-500', border: 'border-amber-400', text: 'text-amber-400', ring: 'ring-amber-500/40' };
    return { bg: 'bg-rose-500', border: 'border-rose-400', text: 'text-rose-400', ring: 'ring-rose-500/40' };
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-ai-purple" />
              SIGNATURE FEATURE
            </span>
            <span className="text-xs font-mono text-slate-400">Computational Aerodynamic Siting</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            AI Site Optimizer
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Find where an O-Wind turbine can perform best across complex urban architecture
          </p>
        </div>

        {/* Toolbar: Compare toggle & Building Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition ${
              compareMode
                ? 'bg-purple-600/30 text-purple-200 border-purple-500/50 shadow-glow-purple font-bold'
                : 'bg-space-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>{compareMode ? 'EXIT COMPARE' : 'COMPARE SITES'}</span>
          </button>

          <Building2 className="w-4 h-4 text-slate-400" />
          <select
            value={selectedBuildingId}
            onChange={(e) => {
              soundFx.playClick();
              setSelectedBuildingId(e.target.value);
            }}
            className="bg-space-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-purple-500 shadow-md"
          >
            {BUILDING_SITES.map((b) => (
              <option key={b.id} value={b.id} className="bg-space-950 text-white">
                {b.name} ({b.floors} fl, {b.heightMeters}m)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Main Siting Workspace: Isometric Building Model on Left | AI Analysis on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Stylized Isometric 3D Building Siting View */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="bg-space-900/90 rounded-xl p-5 border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[460px]">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                <span className="font-bold text-white">{currentBuilding.area}</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-400">{currentBuilding.heightMeters}m Elevation</span>
              </div>

              {/* CFD Vectors toggle */}
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <button
                  onClick={() => setShowCfdVectors(!showCfdVectors)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded border transition ${
                    showCfdVectors ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'text-slate-500 border-slate-800'
                  }`}
                >
                  <Wind className="w-3 h-3" />
                  <span>CFD Vectors</span>
                </button>

                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> &gt;85%
                </span>
                <span className="flex items-center gap-1 text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> 70-84%
                </span>
                <span className="flex items-center gap-1 text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> &lt;70%
                </span>
              </div>
            </div>

            {/* Stylized Isometric Building Graphic with Siting Nodes */}
            <div className="relative my-4 flex-1 flex items-center justify-center min-h-[300px]">
              {/* Background CFD Wind Stream Vector Lines */}
              {showCfdVectors && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                  <path d="M 10 120 Q 180 80 340 140 T 600 90" fill="none" stroke="#00E5FF" strokeWidth="2" strokeDasharray="6 6" className="animate-flow" />
                  <path d="M 20 220 Q 220 180 380 230 T 640 180" fill="none" stroke="#00E5FF" strokeWidth="2.5" strokeDasharray="8 8" className="animate-flow" />
                  <path d="M 30 320 Q 260 270 420 310 T 680 260" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" className="animate-flow" />
                </svg>
              )}

              {/* 3D Isometric Stylized Building Rendering */}
              <div className="relative w-72 h-80 flex flex-col items-center justify-end">
                {/* Rooftop Parapet Top Level */}
                <div className="relative w-48 h-20 bg-gradient-to-tr from-slate-800 to-slate-700 rounded-lg transform -skew-x-12 border border-slate-600 shadow-2xl">
                  <div className="absolute top-2 right-4 w-14 h-8 bg-slate-900 border border-slate-700 rounded-sm" />
                  <div className="absolute top-4 left-6 text-[9px] font-mono text-slate-400 opacity-60">
                    ROOF DECK (+{currentBuilding.heightMeters}m)
                  </div>
                </div>

                {/* Building Main Tower Body */}
                <div className="w-56 h-48 bg-gradient-to-r from-space-950 via-slate-900 to-space-900 border-x border-b border-slate-700/80 rounded-b-lg shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-2 grid grid-cols-4 gap-1.5 opacity-25">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className="bg-cyan-400/40 rounded-xs h-3" />
                    ))}
                  </div>

                  <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] font-mono text-wind-cyan">
                    <Wind className="w-3 h-3 animate-pulse" />
                    <span>Inflow: SE 137°</span>
                  </div>
                </div>

                {/* Street Level Podium */}
                <div className="w-72 h-8 bg-space-950/90 border border-slate-800 rounded-md -mt-1 flex items-center justify-center text-[10px] font-mono text-slate-500">
                  Street Level Ground Grade (0.00m)
                </div>

                {/* Interactive Placement Node Pins */}
                {currentBuilding.nodes.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  const colors = getNodeColor(node.aiScore);

                  return (
                    <button
                      key={node.id}
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedNode(node);
                      }}
                      className={`absolute z-20 group transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                      }`}
                      style={{
                        left: `${node.coordinates.x}%`,
                        top: `${node.coordinates.y}%`,
                      }}
                      title={`${node.name} — AI Score: ${node.aiScore}%`}
                    >
                      <div className={`absolute -inset-2 rounded-full opacity-60 animate-ping-slow ${colors.bg}`} />

                      <div
                        className={`relative px-2.5 py-1 rounded-full text-[11px] font-mono font-bold text-white shadow-xl flex items-center gap-1.5 border ${colors.bg} ${colors.border} ${
                          isSelected ? 'ring-4 ' + colors.ring : ''
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        <span>{node.aiScore}%</span>
                      </div>

                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-36 p-1.5 bg-space-950 border border-slate-800 rounded text-[10px] font-mono text-center text-slate-200 pointer-events-none z-30 shadow-2xl">
                        {node.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Siting Candidate Quick Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800 z-10">
              {currentBuilding.nodes.map((node) => {
                const isSelected = selectedNode.id === node.id;
                const colors = getNodeColor(node.aiScore);
                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedNode(node);
                    }}
                    className={`p-2 rounded-lg text-left border transition-all ${
                      isSelected
                        ? 'bg-space-850 border-purple-500/50 shadow-sm'
                        : 'bg-space-950/60 border-slate-800/80 hover:bg-space-850/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400 truncate">
                        {node.name.split('(')[0]}
                      </span>
                      <span className={`text-xs font-mono font-bold ${colors.text}`}>
                        {node.aiScore}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Analysis Trigger Bar */}
          <div className="bg-space-900/90 rounded-xl p-4 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-glow-purple">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-ai-purple" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Neural Fluid Dynamic Siting Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Simulates 3D wind velocity, Bernoulli suction, and rooftop wake turbulence
              </p>
            </div>

            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition shadow-lg ${
                isAnalyzing
                  ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50 cursor-wait'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-900/40'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Computing...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run AI Analysis</span>
                </>
              )}
            </button>
          </div>

          {/* Analysis Progress Steps Notification */}
          {isAnalyzing && (
            <div className="p-3 rounded-lg bg-space-950 border border-purple-500/40 font-mono text-xs text-purple-300 flex items-center gap-2 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span>{ANALYSIS_STAGES[analysisStageIdx] || 'Processing CFD mesh...'}</span>
            </div>
          )}

          {analysisComplete && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs text-emerald-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>✓ Optimal Location Detected: South-East Rooftop Parapet</span>
              </div>
              <span className="text-[10px] text-slate-400">Score: 92%</span>
            </div>
          )}
        </div>

        {/* Right Column: AI Analysis Panel */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="bg-space-900/90 rounded-xl p-5 border border-purple-500/20 shadow-glow-purple flex-1">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div>
                <span className="stat-label text-ai-purple">
                  <Cpu className="w-3.5 h-3.5" />
                  AI Placement Evaluation
                </span>
                <h3 className="text-lg font-mono font-bold text-white mt-1">
                  {selectedNode.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400">OVERALL SCORE</span>
                <div className={`text-3xl font-mono font-extrabold ${getNodeColor(selectedNode.aiScore).text}`}>
                  {selectedNode.aiScore}%
                </div>
              </div>
            </div>

            {/* Siting Breakdown Radar Metrics */}
            <div className="space-y-3 font-mono">
              {[
                { label: 'Wind Potential', val: selectedNode.windPotential, color: 'bg-cyan-500' },
                { label: 'Direction Suitability', val: selectedNode.directionSuitability, color: 'bg-sky-400' },
                { label: 'Building Exposure', val: selectedNode.buildingExposure, color: 'bg-indigo-400' },
                { label: 'Turbulence Suitability', val: selectedNode.turbulenceSuitability, color: 'bg-purple-400' },
                { label: 'Estimated Energy Potential', val: selectedNode.estimatedEnergyPotential, color: 'bg-emerald-400' },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300">{m.label}</span>
                    <span className="font-bold text-white">{m.val}%</span>
                  </div>
                  <div className="w-full bg-space-950 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`${m.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${m.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Estimated Annual Yield */}
            <div className="mt-5 p-3 rounded-lg bg-space-950/80 border border-slate-800 flex items-center justify-between font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block">ESTIMATED ANNUAL HARVEST</span>
                <span className="text-lg font-bold text-white">
                  {selectedNode.annualYieldKwh} <span className="text-xs text-wind-cyan">kWh / yr</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">OFFSET CARBON</span>
                <span className="text-sm font-bold text-emerald-400">
                  ~{(selectedNode.annualYieldKwh * 0.62).toFixed(1)} kg CO₂
                </span>
              </div>
            </div>

            {/* AI Recommendation Box */}
            <div className="mt-4 p-4 rounded-xl bg-purple-950/30 border border-purple-500/30">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-300 mb-1.5 uppercase">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>AI Recommendation</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {selectedNode.recommendation}
              </p>
            </div>

            {/* Siting Guidance Footer */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Structural Safe
              </span>
              <span>Coordinates: Z +{selectedNode.coordinates.z}m</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Site Comparison Drawer (When compareMode is active) */}
      {compareMode && (
        <div className="p-5 rounded-2xl bg-space-900 border border-purple-500/40 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 font-mono text-xs">
            <span className="text-white font-bold uppercase">
              Side-by-Side Siting Comparison: {BUILDING_SITES[0].name} vs {BUILDING_SITES[1].name}
            </span>
            <span className="text-purple-300">CFD Neural Benchmarking</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {BUILDING_SITES.slice(0, 2).map((site) => (
              <div key={site.id} className="p-4 rounded-xl bg-space-950 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-white">{site.name}</h4>
                  <span className="text-emerald-400 font-bold">{site.nodes[0].aiScore}% Peak</span>
                </div>
                <div className="space-y-1.5 text-slate-300">
                  <div className="flex justify-between"><span>Elevation:</span><strong className="text-white">{site.heightMeters}m</strong></div>
                  <div className="flex justify-between"><span>Canyon Venturi:</span><strong className="text-cyan-400">{site.canyonEffectRatio}x</strong></div>
                  <div className="flex justify-between"><span>Best Node:</span><strong className="text-emerald-300">{site.nodes[0].name.split('(')[0]}</strong></div>
                  <div className="flex justify-between"><span>Est. Yield:</span><strong className="text-purple-300">{site.nodes[0].annualYieldKwh} kWh/yr</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
