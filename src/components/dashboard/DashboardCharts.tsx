import React, { useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { TelemetryData } from '../../types';

interface ChartTab {
  id: 'power' | 'wind' | 'rpm' | 'battery' | 'pm25';
  title: string;
  unit: string;
  color: string;
  stroke: string;
  fill: string;
  getValue: (d: TelemetryData) => number;
}

export const DashboardCharts: React.FC = () => {
  const { history } = useTelemetry();
  const [activeChart, setActiveChart] = useState<ChartTab['id']>('power');

  const CHARTS: ChartTab[] = [
    {
      id: 'power',
      title: 'Power Output',
      unit: 'W',
      color: 'text-amber-400',
      stroke: '#F59E0B',
      fill: 'rgba(245, 158, 11, 0.15)',
      getValue: (d) => d.power,
    },
    {
      id: 'wind',
      title: 'Wind Speed',
      unit: 'm/s',
      color: 'text-wind-cyan',
      stroke: '#00E5FF',
      fill: 'rgba(0, 229, 255, 0.15)',
      getValue: (d) => d.windSpeed,
    },
    {
      id: 'rpm',
      title: 'Turbine RPM',
      unit: 'RPM',
      color: 'text-emerald-400',
      stroke: '#10B981',
      fill: 'rgba(16, 185, 129, 0.15)',
      getValue: (d) => d.rpm,
    },
    {
      id: 'battery',
      title: 'Battery SoC',
      unit: '%',
      color: 'text-purple-400',
      stroke: '#A855F7',
      fill: 'rgba(168, 85, 247, 0.15)',
      getValue: (d) => d.batteryPct,
    },
    {
      id: 'pm25',
      title: 'PM2.5 Ambient',
      unit: 'µg/m³',
      color: 'text-sky-400',
      stroke: '#38BDF8',
      fill: 'rgba(56, 189, 248, 0.15)',
      getValue: (d) => d.pm25,
    },
  ];

  const currentTab = CHARTS.find((c) => c.id === activeChart) || CHARTS[0];

  // Prepare SVG coordinates
  const width = 640;
  const height = 180;
  const paddingX = 40;
  const paddingY = 24;

  const rawValues = history.map(currentTab.getValue);
  const minVal = Math.min(...rawValues, 0);
  const maxVal = Math.max(...rawValues, 1);
  const range = (maxVal - minVal) || 1;

  const points = history.map((d, index) => {
    const x = paddingX + (index / Math.max(1, history.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((currentTab.getValue(d) - minVal) / range) * (height - paddingY * 2);
    return { x, y, data: d };
  });

  const polylineStr = points.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPathStr = points.length > 0
    ? `M ${points[0].x},${height - paddingY} L ${polylineStr.replace(/ /g, ' L ')} L ${points[points.length - 1].x},${height - paddingY} Z`
    : '';

  const latestVal = history.length > 0 ? currentTab.getValue(history[history.length - 1]) : 0;

  return (
    <div className="bg-space-900/80 backdrop-blur-md rounded-xl p-4 sm:p-5 border border-slate-800/80">
      {/* Header and Chart Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Live Sensor Telemetry Stream
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <p className="text-[11px] font-mono text-slate-400 mt-0.5">
            Rolling real-time 30-sample buffer · 1.2s update interval
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-1 bg-space-950/80 p-1 rounded-lg border border-slate-800">
          {CHARTS.map((tab) => {
            const isActive = activeChart === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveChart(tab.id)}
                className={`px-2.5 py-1 text-xs font-mono rounded font-medium transition-all ${
                  isActive
                    ? 'bg-space-850 text-white border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Metric Callout */}
      <div className="flex items-baseline justify-between mb-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-mono font-bold text-white tracking-tight">
            {latestVal}
          </span>
          <span className={`text-sm font-mono font-semibold ${currentTab.color}`}>
            {currentTab.unit}
          </span>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Peak: <strong className="text-white">{maxVal.toFixed(2)}</strong> {currentTab.unit}
        </div>
      </div>

      {/* SVG Responsive Area Chart */}
      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
          <defs>
            <linearGradient id={`grad-${currentTab.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={currentTab.stroke} stopOpacity="0.35" />
              <stop offset="100%" stopColor={currentTab.stroke} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#1e293b" strokeDasharray="3 3" />
          <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} stroke="#1e293b" strokeDasharray="3 3" />
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#334155" />

          {/* Fill Area */}
          {areaPathStr && (
            <path d={areaPathStr} fill={`url(#grad-${currentTab.id})`} />
          )}

          {/* Stroke Line */}
          {polylineStr && (
            <polyline
              fill="none"
              stroke={currentTab.stroke}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={polylineStr}
            />
          )}

          {/* Live Pulsing Point on newest coordinate */}
          {points.length > 0 && (
            <g>
              <circle
                cx={points[points.length - 1].x}
                cy={points[points.length - 1].y}
                r="6"
                fill={currentTab.stroke}
                opacity="0.3"
                className="animate-ping"
              />
              <circle
                cx={points[points.length - 1].x}
                cy={points[points.length - 1].y}
                r="4"
                fill="#FFFFFF"
                stroke={currentTab.stroke}
                strokeWidth="2"
              />
            </g>
          )}

          {/* Y Axis bounds */}
          <text x={paddingX - 6} y={paddingY + 4} textAnchor="end" fill="#64748b" fontSize="10" fontFamily="monospace">
            {maxVal.toFixed(1)}
          </text>
          <text x={paddingX - 6} y={height - paddingY} textAnchor="end" fill="#64748b" fontSize="10" fontFamily="monospace">
            {minVal.toFixed(1)}
          </text>
        </svg>
      </div>

      {/* Sub-strip of all 5 preview cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 pt-4 border-t border-slate-800/80">
        {CHARTS.map((c) => {
          const isSelected = activeChart === c.id;
          const val = history.length > 0 ? c.getValue(history[history.length - 1]) : 0;
          return (
            <button
              key={c.id}
              onClick={() => setActiveChart(c.id)}
              className={`p-2.5 rounded-lg text-left border transition-all ${
                isSelected
                  ? 'bg-space-850/80 border-cyan-500/40 shadow-sm'
                  : 'bg-space-950/40 border-slate-800/80 hover:bg-space-850/40'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-400 truncate">{c.title}</div>
              <div className="text-sm font-mono font-bold text-white mt-0.5">
                {val} <span className="text-[10px] text-slate-400">{c.unit}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
