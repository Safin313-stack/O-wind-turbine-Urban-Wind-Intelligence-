import React from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ShieldAlert,
  Clock,
  CheckCircle2,
  HelpCircle,
  Activity
} from 'lucide-react';

export const PollutionForecastView: React.FC = () => {
  const { telemetry } = useTelemetry();

  // Observed historical data (past 3 hours)
  const observedData = [
    { time: '-3h', pm25: 29.4, type: 'observed' },
    { time: '-2h', pm25: 31.8, type: 'observed' },
    { time: '-1h', pm25: 33.5, type: 'observed' },
    { time: 'Now', pm25: telemetry.pm25, type: 'observed' },
  ];

  // AI Predicted data (+1h to +5h)
  const forecastData = [
    { time: '+1 Hour', pm25: Number((telemetry.pm25 + 5.2).toFixed(1)), low: Number((telemetry.pm25 + 2.1).toFixed(1)), high: Number((telemetry.pm25 + 8.4).toFixed(1)), status: 'Moderate' },
    { time: '+2 Hours', pm25: Number((telemetry.pm25 + 11.4).toFixed(1)), low: Number((telemetry.pm25 + 6.0).toFixed(1)), high: Number((telemetry.pm25 + 16.5).toFixed(1)), status: 'Unhealthy for Sensitive' },
    { time: '+3 Hours', pm25: Number((telemetry.pm25 + 18.2).toFixed(1)), low: Number((telemetry.pm25 + 11.5).toFixed(1)), high: Number((telemetry.pm25 + 24.8).toFixed(1)), status: 'Unhealthy' },
    { time: '+4 Hours', pm25: Number((telemetry.pm25 + 14.0).toFixed(1)), low: Number((telemetry.pm25 + 7.2).toFixed(1)), high: Number((telemetry.pm25 + 21.0).toFixed(1)), status: 'Moderate-High' },
    { time: '+5 Hours', pm25: Number((telemetry.pm25 + 8.5).toFixed(1)), low: Number((telemetry.pm25 + 3.0).toFixed(1)), high: Number((telemetry.pm25 + 15.2).toFixed(1)), status: 'Moderate' },
  ];

  const confidencePct = 84;

  // SVG dimensions for smooth prediction curve
  const width = 720;
  const height = 220;
  const padX = 50;
  const padY = 30;

  // Map observed points (indices 0 to 3)
  const allPoints = [
    ...observedData.map((d, i) => ({ ...d, xIdx: i, isObserved: true })),
    ...forecastData.map((d, i) => ({ ...d, xIdx: i + 3, isObserved: false })),
  ];

  const totalPoints = allPoints.length; // 9 points
  const minVal = 20;
  const maxVal = 70;
  const range = maxVal - minVal;

  const toCoords = (val: number, xIdx: number) => {
    const x = padX + (xIdx / (totalPoints - 1)) * (width - padX * 2);
    const y = height - padY - ((val - minVal) / range) * (height - padY * 2);
    return { x, y };
  };

  const observedPolyline = observedData.map((d, i) => {
    const c = toCoords(d.pm25, i);
    return `${c.x},${c.y}`;
  }).join(' ');

  const forecastPolyline = [
    toCoords(telemetry.pm25, 3), // start connecting from "Now"
    ...forecastData.map((d, i) => toCoords(d.pm25, i + 4)),
  ].map(c => `${c.x},${c.y}`).join(' ');

  // Upper and lower confidence area polygon
  const upperCoords = forecastData.map((d, i) => toCoords(d.high, i + 4));
  const lowerCoords = forecastData.map((d, i) => toCoords(d.low, i + 4)).reverse();
  const startConnect = toCoords(telemetry.pm25, 3);

  const confidenceAreaPath = [
    `M ${startConnect.x},${startConnect.y}`,
    ...upperCoords.map(c => `L ${c.x},${c.y}`),
    ...lowerCoords.map(c => `L ${c.x},${c.y}`),
    'Z'
  ].join(' ');

  return (
    <div className="space-y-6">
      {/* 1. Header with Mandatory AI Disclaimer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-ai-purple" />
              TEMPORAL AI PREDICTION
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-mono font-semibold">
              Prototype AI Model (Demonstration Data)
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            AI Pollution Forecast (+5 Hours)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Recurrent Neural Network model estimating future PM2.5 particulate concentrations based on wind vectors
          </p>
        </div>

        {/* Confidence Badge */}
        <div className="px-3 py-1.5 rounded-xl bg-space-900 border border-purple-500/30 font-mono text-xs text-purple-200 flex items-center gap-2 shadow-glow-purple">
          <Activity className="w-3.5 h-3.5 text-purple-400" />
          <span>Prediction Confidence: <strong className="text-white">{confidencePct}%</strong></span>
        </div>
      </div>

      {/* 2. AI Executive Summary Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-space-900 via-space-850 to-space-900 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
              AI Forecast Advisory
            </span>
            <p className="text-sm font-semibold text-white mt-0.5">
              Air quality is expected to deteriorate during the next 3 hours due to evening traffic peak and reduced canyon wind dispersion.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Building automated HVAC ventilation dampers recommended to switch to HEPA recirculation at +2 Hours.
            </p>
          </div>
        </div>

        <div className="text-right shrink-0 font-mono">
          <span className="text-[10px] text-slate-400 uppercase block">Expected Peak</span>
          <span className="text-2xl font-extrabold text-rose-400">
            {(telemetry.pm25 + 18.2).toFixed(1)} <span className="text-xs text-slate-400 font-normal">µg/m³</span>
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">At +3 Hours (+18.2 Δ)</span>
        </div>
      </div>

      {/* 3. Smooth Prediction Graph (Observed vs Predicted) */}
      <div className="bg-space-900/80 rounded-xl p-5 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Temporal Trajectory: Observed vs AI Forecast
            </h2>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-3 h-0.5 bg-cyan-400 inline-block" /> OBSERVED DATA (Sensor)
            </span>
            <span className="flex items-center gap-1.5 text-purple-400">
              <span className="w-3 h-0.5 border-t-2 border-dashed border-purple-400 inline-block" /> AI PREDICTION (Forecast)
            </span>
            <span className="flex items-center gap-1.5 text-purple-300/60">
              <span className="w-2.5 h-2.5 bg-purple-500/20 rounded inline-block" /> 95% Confidence Band
            </span>
          </div>
        </div>

        {/* SVG Visualization */}
        <div className="w-full bg-space-950 rounded-lg p-2 border border-slate-800/80">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-56">
            <defs>
              <linearGradient id="confidence-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line x1={padX} y1={padY} x2={width - padX} y2={padY} stroke="#1e293b" strokeDasharray="3 3" />
            <line x1={padX} y1={height / 2} x2={width - padX} y2={height / 2} stroke="#1e293b" strokeDasharray="3 3" />
            <line x1={padX} y1={height - padY} x2={width - padX} y2={height - padY} stroke="#334155" />

            {/* Vertical dividing boundary between Observed and Forecast */}
            {(() => {
              const divX = toCoords(0, 3).x;
              return (
                <g>
                  <line x1={divX} y1={padY} x2={divX} y2={height - padY} stroke="#A855F7" strokeDasharray="4 4" strokeWidth="1.5" />
                  <text x={divX - 6} y={padY + 12} textAnchor="end" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">HISTORICAL</text>
                  <text x={divX + 6} y={padY + 12} textAnchor="start" fill="#a855f7" fontSize="10" fontFamily="monospace" fontWeight="bold">FORECAST</text>
                </g>
              );
            })()}

            {/* Confidence Area Polygon */}
            <path d={confidenceAreaPath} fill="url(#confidence-grad)" />

            {/* Observed Solid Line */}
            <polyline
              fill="none"
              stroke="#00E5FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={observedPolyline}
            />

            {/* Predicted Dashed Line */}
            <polyline
              fill="none"
              stroke="#A855F7"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={forecastPolyline}
            />

            {/* Nodes */}
            {observedData.map((d, i) => {
              const c = toCoords(d.pm25, i);
              return (
                <g key={`obs-${i}`}>
                  <circle cx={c.x} cy={c.y} r="4" fill="#00E5FF" stroke="#0B1226" strokeWidth="2" />
                  <text x={c.x} y={c.y - 8} textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">{d.pm25}</text>
                  <text x={c.x} y={height - 10} textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">{d.time}</text>
                </g>
              );
            })}

            {forecastData.map((d, i) => {
              const c = toCoords(d.pm25, i + 4);
              return (
                <g key={`fc-${i}`}>
                  <circle cx={c.x} cy={c.y} r="4" fill="#A855F7" stroke="#0B1226" strokeWidth="2" />
                  <text x={c.x} y={c.y - 8} textAnchor="middle" fill="#c084fc" fontSize="10" fontFamily="monospace">{d.pm25}</text>
                  <text x={c.x} y={height - 10} textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">{d.time}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 4. Individual Time-Step Prediction Cards (+1h to +5h) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
        <div className="p-3.5 rounded-xl bg-space-950/80 border border-cyan-500/40">
          <span className="text-[10px] text-cyan-400 font-bold block uppercase">CURRENT LEVEL</span>
          <div className="text-xl font-bold text-white mt-1">
            {telemetry.pm25} <span className="text-xs text-slate-400">µg/m³</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">Live Measured</span>
        </div>

        {forecastData.map((f) => (
          <div key={f.time} className="p-3.5 rounded-xl bg-space-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="font-bold text-slate-300">{f.time}</span>
              <Clock className="w-3 h-3 text-purple-400" />
            </div>
            <div className="text-xl font-bold text-white mt-1">
              {f.pm25} <span className="text-xs text-purple-400">µg/m³</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
              <span>{f.status}</span>
              <span className="text-purple-300">±{((f.high - f.low) / 2).toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Scientific Disclaimer Note per prompt requirements */}
      <div className="p-3.5 rounded-xl bg-space-950 border border-slate-800 text-xs font-mono text-slate-400 flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed font-sans text-xs">
          <strong>Research Note & Model Attribution:</strong> The temporal prediction utilizes demonstration LSTM parameters trained on synthetic historical Dhaka meteorological and air quality records. While illustrative of future smart-grid capability, this feature is explicitly labeled as a <em>Prototype AI Model</em> for academic presentation purposes and does not assert calibrated regulatory compliance.
        </p>
      </div>
    </div>
  );
};
