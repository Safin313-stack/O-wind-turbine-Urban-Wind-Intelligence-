import React, { useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { Turbine3DViewer } from '../turbine3d/Turbine3DViewer';
import { DataSourceBadge } from '../common/DataSourceBadge';
import {
  Wind,
  Compass,
  RotateCw,
  Zap,
  BatteryCharging,
  Play,
  Pause,
  RotateCcw,
  Gauge,
  Activity,
  ArrowRight,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Flame,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const LiveTurbineView: React.FC = () => {
  const {
    telemetry,
    history,
    isPlaying,
    setIsPlaying,
    resetTelemetry,
    simSpeed,
    setSimSpeed,
    isLiveMode
  } = useTelemetry();

  const [activeTab, setActiveTab] = useState<'realtime' | 'oscilloscope'>('realtime');

  // Mechanical and aerodynamic derived metrics
  const angularVelocity = ((telemetry.rpm * 2 * Math.PI) / 60).toFixed(1); // rad/s
  const tipSpeedRatio = (
    (parseFloat(angularVelocity) * 0.13) / Math.max(0.1, telemetry.windSpeed)
  ).toFixed(2); // R = 0.13m (260mm diameter sphere)
  const isCharging = telemetry.batteryCurrent > 0;

  // Real-time oscilloscope path calculation
  const oscWidth = 600;
  const oscHeight = 110;
  const oscPoints = history.map((d, idx) => {
    const x = (idx / Math.max(1, history.length - 1)) * oscWidth;
    // Map RPM (0 to 300)
    const y = oscHeight - (d.rpm / 300) * (oscHeight - 16) - 8;
    return `${x},${y}`;
  }).join(' ');

  const powerPoints = history.map((d, idx) => {
    const x = (idx / Math.max(1, history.length - 1)) * oscWidth;
    // Map Power (0 to 1.0W)
    const y = oscHeight - (d.power / 1.0) * (oscHeight - 16) - 8;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-6">
      {/* 1. Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono font-semibold">
              TELEMETRY NODE #01
            </span>
            <DataSourceBadge isLive={isLiveMode} />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Live Physical Prototype Telemetry
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time mechanical shaft dynamics, wind aerodynamics, and micro-generator electrical output
          </p>
        </div>

        {/* Start Demo, Pause, Reset Controls */}
        <div className="flex items-center gap-2 bg-space-900/90 border border-slate-800 p-1.5 rounded-xl">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition ${
              isPlaying
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'PAUSE' : 'START DEMO'}</span>
          </button>

          <button
            onClick={resetTelemetry}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-slate-300 hover:text-white bg-space-850 hover:bg-space-800 border border-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET</span>
          </button>

          {/* Speed Multiplier */}
          <div className="hidden sm:flex items-center gap-1 ml-1 pl-2 border-l border-slate-800 text-[10px] font-mono">
            {[1, 2, 5].map((spd) => (
              <button
                key={spd}
                onClick={() => setSimSpeed(spd)}
                className={`px-2 py-1 rounded transition ${
                  simSpeed === spd
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main Monitoring Grid: Left Wind | Center 3D Turbine | Right Mechanical */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Side: Wind Information */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-space-900/80 backdrop-blur-md rounded-xl p-4 border border-cyan-500/20 shadow-glow-cyan">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <span className="stat-label text-wind-cyan">
                <Wind className="w-3.5 h-3.5" />
                Wind Aerodynamics
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>

            <div className="space-y-3 font-mono">
              <div>
                <span className="text-[10px] text-slate-400">Wind Speed</span>
                <div className="text-2xl font-bold text-white flex items-baseline gap-1 mt-0.5">
                  {telemetry.windSpeed} <span className="text-xs text-wind-cyan font-normal">m/s</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-400">Wind Direction</span>
                  <div className="text-base font-bold text-white mt-0.5">
                    {telemetry.windDirection}° <span className="text-[11px] text-slate-400">SE</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">Gust Speed</span>
                  <div className="text-base font-bold text-amber-300 mt-0.5">
                    {telemetry.windGust} <span className="text-[11px] text-slate-400">m/s</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-400">Wind Stability</span>
                  <div className="text-base font-bold text-emerald-400 mt-0.5">
                    {telemetry.windStabilityIndex}%
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">Airflow Status</span>
                  <div className="text-xs font-semibold text-cyan-300 mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Laminar
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-space-950/80 border border-slate-800 text-[11px] text-slate-300 leading-relaxed font-sans">
                Omnidirectional intake captures Bernoulli differential from 360° without mechanical yaw alignment.
              </div>
            </div>
          </div>

          {/* Compass Rose Mini Widget */}
          <div className="bg-space-900/80 rounded-xl p-4 border border-slate-800 text-center">
            <span className="stat-label justify-center mb-2">Vector Compass</span>
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center border border-slate-800 rounded-full bg-space-950">
              <span className="absolute top-1 text-[9px] font-mono text-slate-400">N</span>
              <span className="absolute right-1 text-[9px] font-mono text-slate-400">E</span>
              <span className="absolute bottom-1 text-[9px] font-mono text-slate-400">S</span>
              <span className="absolute left-1 text-[9px] font-mono text-slate-400">W</span>
              {/* Rotating Arrow Needle */}
              <div
                className="w-1 h-20 bg-gradient-to-t from-transparent via-cyan-400 to-rose-500 rounded transition-transform duration-500"
                style={{ transform: `rotate(${telemetry.windDirection}deg)` }}
              />
              <div className="absolute w-3 h-3 rounded-full bg-white border-2 border-cyan-400 shadow-glow-cyan" />
            </div>
            <div className="text-xs font-mono text-slate-300 mt-2">
              Current Inflow: <strong className="text-white">{telemetry.windDirection}° Azimuth</strong>
            </div>
          </div>
        </div>

        {/* Center: Large 3D Turbine Visualizer */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          <Turbine3DViewer height="480px" showControls={true} />

          {/* Animated Physical Chain Arrows:
              wind → aerodynamic force → rotation → shaft → generator → electricity */}
          <div className="bg-space-900/80 rounded-xl p-3 border border-slate-800 flex items-center justify-between overflow-x-auto text-[11px] font-mono">
            {[
              { label: 'Wind Inflow', sub: `${telemetry.windSpeed} m/s`, color: 'text-wind-cyan' },
              { label: 'Aero Force', sub: 'Bernoulli ΔP', color: 'text-sky-400' },
              { label: 'Rotation', sub: `${telemetry.rpm} RPM`, color: 'text-emerald-400' },
              { label: 'Center Shaft', sub: `${telemetry.shaftTorque} mNm`, color: 'text-slate-300' },
              { label: 'Generator', sub: '3-Phase PMG', color: 'text-amber-400' },
              { label: 'Electricity', sub: `${telemetry.power} W`, color: 'text-purple-400' },
            ].map((step, idx, arr) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center shrink-0 px-2 text-center">
                  <span className={`font-bold ${step.color}`}>{step.label}</span>
                  <span className="text-[10px] text-slate-400">{step.sub}</span>
                </div>
                {idx < arr.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Side: Mechanical Information */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-space-900/80 backdrop-blur-md rounded-xl p-4 border border-emerald-500/20 shadow-glow-green">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <span className="stat-label text-energy-green">
                <RotateCw className="w-3.5 h-3.5" />
                Mechanical Dynamics
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="space-y-3 font-mono">
              <div>
                <span className="text-[10px] text-slate-400">Rotor Speed</span>
                <div className="text-2xl font-bold text-white flex items-baseline gap-1 mt-0.5">
                  {telemetry.rpm} <span className="text-xs text-energy-green font-normal">RPM</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-400">Shaft Torque</span>
                  <div className="text-base font-bold text-white mt-0.5">
                    {telemetry.shaftTorque} <span className="text-[11px] text-slate-400">mNm</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">Angular Vel (ω)</span>
                  <div className="text-base font-bold text-white mt-0.5">
                    {angularVelocity} <span className="text-[11px] text-slate-400">rad/s</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-400">Tip Speed Ratio</span>
                  <div className="text-base font-bold text-purple-300 mt-0.5">
                    {tipSpeedRatio} λ
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">Rotation Status</span>
                  <div className="text-xs font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Nominal
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-400">Cut-in Threshold</span>
                  <div className="text-xs font-mono font-semibold text-slate-200 mt-1">
                    1.48 m/s (Passed)
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">Acoustic Noise</span>
                  <div className="text-xs font-mono font-semibold text-emerald-400 mt-1">
                    &lt; 28 dBA
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-space-950/80 border border-slate-800 text-[11px] text-slate-300 leading-relaxed font-sans">
                Ceramic hybrid bearings eliminate mechanical friction; whisper-silent operation for residential balconies.
              </div>
            </div>
          </div>

          {/* Efficiency Gauge Card */}
          <div className="bg-space-900/80 rounded-xl p-4 border border-slate-800">
            <span className="stat-label mb-2">Aerodynamic Betz Ratio</span>
            <div className="flex items-center justify-between font-mono my-2">
              <span className="text-2xl font-bold text-white">28.4%</span>
              <span className="text-xs text-slate-400">Betz Limit: 59.3%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full"
                style={{ width: `${(28.4 / 59.3) * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-2 block">
              Omnidirectional spherical rotor aerodynamic efficiency
            </span>
          </div>
        </div>
      </div>

      {/* 3. Bottom Grid: Electrical Generation & Battery Storage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Electrical Information */}
        <div className="bg-space-900/80 rounded-xl p-5 border border-amber-500/20 shadow-glow-amber">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                Electrical Generation & MPPT
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Synchronous Rectifier: Active
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
            <div className="p-3 rounded-lg bg-space-950/80 border border-slate-800">
              <span className="text-[10px] text-slate-400">Terminal Voltage</span>
              <div className="text-xl font-bold text-white mt-1">
                {telemetry.voltage} <span className="text-xs text-amber-400">V</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-space-950/80 border border-slate-800">
              <span className="text-[10px] text-slate-400">Output Current</span>
              <div className="text-xl font-bold text-white mt-1">
                {telemetry.current} <span className="text-xs text-amber-400">mA</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-space-950/80 border border-slate-800">
              <span className="text-[10px] text-slate-400">Instant Power</span>
              <div className="text-xl font-bold text-white mt-1">
                {telemetry.power} <span className="text-xs text-amber-400">W</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-space-950/80 border border-slate-800">
              <span className="text-[10px] text-slate-400">Energy Generated</span>
              <div className="text-xl font-bold text-purple-300 mt-1">
                {telemetry.energyGenerated} <span className="text-xs text-slate-400">J</span>
              </div>
              <span className="text-[9px] text-slate-400 block mt-0.5 truncate">
                Ref. Result
              </span>
            </div>
          </div>
        </div>

        {/* Battery Information */}
        <div className="bg-space-900/80 rounded-xl p-5 border border-purple-500/20 shadow-glow-purple">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <BatteryCharging className="w-4 h-4 text-purple-400" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                Energy Storage (LiFePO4)
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
              {isCharging ? '● CHARGING' : '○ DISCHARGING'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
            <div className="p-3 rounded-lg bg-space-950/80 border border-slate-800">
              <span className="text-[10px] text-slate-400">State of Charge</span>
              <div className="text-xl font-bold text-white mt-1">
                {telemetry.batteryPct}%
              </div>
            </div>

            <div className="p-3 rounded-lg bg-space-950/80 border border-slate-800">
              <span className="text-[10px] text-slate-400">Cell Voltage</span>
              <div className="text-xl font-bold text-white mt-1">
                {telemetry.batteryVoltage} <span className="text-xs text-purple-400">V</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-space-950/80 border border-slate-800">
              <span className="text-[10px] text-slate-400">Net Current</span>
              <div className={`text-xl font-bold mt-1 ${isCharging ? 'text-emerald-400' : 'text-amber-400'}`}>
                {telemetry.batteryCurrent > 0 ? `+${telemetry.batteryCurrent}` : telemetry.batteryCurrent}{' '}
                <span className="text-xs text-slate-400">mA</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-space-950/80 border border-slate-800">
              <span className="text-[10px] text-slate-400">Battery Health</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">
                {telemetry.batteryHealth}%
              </div>
              <span className="text-[9px] text-slate-400 block mt-0.5 truncate">
                LiFePO4 2000mAh
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Live Oscilloscope Timeline */}
      <div className="bg-space-900/80 rounded-xl p-5 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Real-Time Oscilloscope Trace (RPM & Power)
            </h3>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-0.5 bg-emerald-400 inline-block" /> RPM Trace
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2.5 h-0.5 bg-amber-400 inline-block" /> Power (W)
            </span>
          </div>
        </div>

        <div className="w-full bg-space-950 rounded-lg p-2 border border-slate-800/80">
          <svg viewBox={`0 0 ${oscWidth} ${oscHeight}`} className="w-full h-28 overflow-visible">
            {/* Grid */}
            <line x1="0" y1="20" x2={oscWidth} y2="20" stroke="#1e293b" strokeDasharray="3 3" />
            <line x1="0" y1="55" x2={oscWidth} y2="55" stroke="#1e293b" strokeDasharray="3 3" />
            <line x1="0" y1="90" x2={oscWidth} y2="90" stroke="#1e293b" strokeDasharray="3 3" />

            {/* RPM Line */}
            <polyline
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              strokeLinecap="round"
              points={oscPoints}
            />

            {/* Power Line */}
            <polyline
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2"
              strokeLinecap="round"
              points={powerPoints}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
