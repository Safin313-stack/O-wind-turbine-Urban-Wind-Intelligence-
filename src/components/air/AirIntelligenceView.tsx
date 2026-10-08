import React, { useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import {
  CloudSun,
  ShieldAlert,
  Wind,
  Compass,
  Thermometer,
  Droplets,
  Gauge,
  Activity,
  Layers,
  ArrowUpRight,
  TrendingDown,
  Info
} from 'lucide-react';

export const AirIntelligenceView: React.FC = () => {
  const { telemetry, history } = useTelemetry();
  const [activeCorrelation, setActiveCorrelation] = useState<'wind' | 'temp' | 'humidity'>('wind');

  // AQI status determination
  const getAqiStatus = (pm25: number) => {
    if (pm25 <= 12) return { label: 'GOOD', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    if (pm25 <= 35.4) return { label: 'MODERATE', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' };
    if (pm25 <= 55.4) return { label: 'UNHEALTHY FOR SENSITIVE', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
    if (pm25 <= 150.4) return { label: 'UNHEALTHY', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' };
    return { label: 'CRITICAL', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' };
  };

  const aqiStatus = getAqiStatus(telemetry.pm25);

  // SVG Chart points for PM2.5 vs Time
  const chartWidth = 600;
  const chartHeight = 160;
  const paddingX = 40;
  const paddingY = 20;

  const pm25Values = history.map((h) => h.pm25);
  const minPm = Math.min(...pm25Values, 10);
  const maxPm = Math.max(...pm25Values, 50);
  const rangePm = maxPm - minPm || 1;

  const pmPoints = history.map((d, idx) => {
    const x = paddingX + (idx / Math.max(1, history.length - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - ((d.pm25 - minPm) / rangePm) * (chartHeight - paddingY * 2);
    return `${x},${y}`;
  }).join(' ');

  // Synthetic correlation points for scatter/line correlation graph
  const getCorrelationData = () => {
    if (activeCorrelation === 'wind') {
      return {
        title: 'Wind Speed vs PM2.5 (Urban Dispersion Effect)',
        xLabel: 'Wind Speed (m/s)',
        yLabel: 'PM2.5 (µg/m³)',
        note: 'Higher wind velocity accelerates particulate ventilation through Dhaka street canyons, reducing PM2.5.',
        points: [
          { x: 1.5, y: 52 }, { x: 2.0, y: 46 }, { x: 2.5, y: 42 },
          { x: 3.0, y: 38 }, { x: 3.42, y: 34.2 }, { x: 4.0, y: 28 },
          { x: 4.5, y: 24 }, { x: 5.2, y: 19 }
        ],
      };
    }
    if (activeCorrelation === 'temp') {
      return {
        title: 'Temperature vs PM2.5 (Thermal Inversion Effect)',
        xLabel: 'Ambient Temp (°C)',
        yLabel: 'PM2.5 (µg/m³)',
        note: 'Mid-day solar warming generates upward thermal updrafts that assist localized particulate lofting.',
        points: [
          { x: 22, y: 48 }, { x: 24, y: 44 }, { x: 26, y: 39 },
          { x: 28.1, y: 34.2 }, { x: 30, y: 31 }, { x: 32, y: 27 }
        ],
      };
    }
    return {
      title: 'Humidity vs PM2.5 (Hygroscopic Growth Effect)',
      xLabel: 'Relative Humidity (%)',
      yLabel: 'PM2.5 (µg/m³)',
      note: 'High humidity causes water vapor condensation onto aerosol particles, increasing optical mass concentration.',
      points: [
        { x: 45, y: 26 }, { x: 55, y: 30 }, { x: 63.4, y: 34.2 },
        { x: 75, y: 41 }, { x: 85, y: 49 }, { x: 92, y: 56 }
      ],
    };
  };

  const correlation = getCorrelationData();

  return (
    <div className="space-y-6">
      {/* 1. Header with AQI Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-semibold">
              DUAL-DUTY SENSING NODE
            </span>
            <span className="text-xs font-mono text-slate-400">Self-Powered by O-Wind Harvest</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Air Intelligence & Environmental Sentinel
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Turning clean energy micro-turbines into autonomous multi-parameter urban pollution monitoring nodes
          </p>
        </div>

        {/* Big AQI Status Badge */}
        <div className={`px-4 py-2 rounded-xl border font-mono flex items-center gap-3 ${aqiStatus.bg}`}>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Dhaka Air Quality</span>
            <span className={`text-base font-bold ${aqiStatus.color}`}>{aqiStatus.label}</span>
          </div>
          <div className="text-right pl-3 border-l border-slate-800">
            <span className="text-[10px] text-slate-400 block">PM2.5</span>
            <span className="text-xl font-bold text-white">{telemetry.pm25} µg/m³</span>
          </div>
        </div>
      </div>

      {/* 2. 8 Full Sensor Parameters Grid:
          PM2.5, PM10, CO2, Temp, Humidity, Wind Speed, Wind Direction, Pressure */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 font-mono">
        <div className="p-3.5 rounded-xl bg-space-900/80 border border-cyan-500/30">
          <span className="text-[10px] text-slate-400 block">PM2.5 DUST</span>
          <div className="text-xl font-bold text-wind-cyan mt-1">{telemetry.pm25}</div>
          <span className="text-[10px] text-slate-400">µg/m³</span>
        </div>

        <div className="p-3.5 rounded-xl bg-space-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">PM10 COARSE</span>
          <div className="text-xl font-bold text-white mt-1">{telemetry.pm10}</div>
          <span className="text-[10px] text-slate-400">µg/m³</span>
        </div>

        <div className="p-3.5 rounded-xl bg-space-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">CO₂ LEVEL</span>
          <div className="text-xl font-bold text-white mt-1">{telemetry.co2}</div>
          <span className="text-[10px] text-slate-400">ppm Ambient</span>
        </div>

        <div className="p-3.5 rounded-xl bg-space-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">TEMPERATURE</span>
          <div className="text-xl font-bold text-amber-300 mt-1">{telemetry.temperature}°</div>
          <span className="text-[10px] text-slate-400">Celsius</span>
        </div>

        <div className="p-3.5 rounded-xl bg-space-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">HUMIDITY</span>
          <div className="text-xl font-bold text-sky-400 mt-1">{telemetry.humidity}%</div>
          <span className="text-[10px] text-slate-400">Relative (RH)</span>
        </div>

        <div className="p-3.5 rounded-xl bg-space-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">WIND SPEED</span>
          <div className="text-xl font-bold text-wind-cyan mt-1">{telemetry.windSpeed}</div>
          <span className="text-[10px] text-slate-400">m/s Inflow</span>
        </div>

        <div className="p-3.5 rounded-xl bg-space-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">DIRECTION</span>
          <div className="text-xl font-bold text-white mt-1">{telemetry.windDirection}°</div>
          <span className="text-[10px] text-slate-400">Azimuth (SE)</span>
        </div>

        <div className="p-3.5 rounded-xl bg-space-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">PRESSURE</span>
          <div className="text-xl font-bold text-slate-300 mt-1">{telemetry.pressure}</div>
          <span className="text-[10px] text-slate-400">hPa Barometer</span>
        </div>
      </div>

      {/* 3. Graphs: PM2.5 vs Time & Environmental Correlation Plots */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: PM2.5 vs Time */}
        <div className="lg:col-span-7 bg-space-900/80 rounded-xl p-5 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                PM2.5 Ambient Particulate Stream (Rolling Time)
              </h2>
              <span className="text-[11px] font-mono text-slate-400">
                Calibrated Laser Particle Counter (Plantower PMS7003)
              </span>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold">
              Current: {telemetry.pm25} µg/m³
            </span>
          </div>

          <div className="w-full h-48 bg-space-950 rounded-lg p-2 border border-slate-800/80">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full">
              {/* Reference Threshold Lines: WHO guidelines 15 µg/m³ */}
              <line x1={paddingX} y1={chartHeight - 40} x2={chartWidth - paddingX} y2={chartHeight - 40} stroke="#10b981" strokeDasharray="3 3" opacity="0.6" />
              <text x={chartWidth - paddingX + 5} y={chartHeight - 38} fill="#10b981" fontSize="9" fontFamily="monospace">WHO (15)</text>

              {/* Bangladesh National Ambient Standard: 65 µg/m³ */}
              <line x1={paddingX} y1={25} x2={chartWidth - paddingX} y2={25} stroke="#f59e0b" strokeDasharray="3 3" opacity="0.6" />
              <text x={chartWidth - paddingX + 5} y={28} fill="#f59e0b" fontSize="9" fontFamily="monospace">BD Standard</text>

              {/* Data line */}
              <polyline
                fill="none"
                stroke="#00E5FF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={pmPoints}
              />
            </svg>
          </div>
        </div>

        {/* Right: Correlation Engine: Wind vs PM2.5 (Dispersion effect!) */}
        <div className="lg:col-span-5 bg-space-900/80 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
              <span className="stat-label">Correlation Engine</span>
              {/* Correlation selector tabs */}
              <div className="flex items-center gap-1 bg-space-950 p-1 rounded-lg text-[10px] font-mono">
                <button
                  onClick={() => setActiveCorrelation('wind')}
                  className={`px-2 py-0.5 rounded ${activeCorrelation === 'wind' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'}`}
                >
                  Wind vs PM
                </button>
                <button
                  onClick={() => setActiveCorrelation('temp')}
                  className={`px-2 py-0.5 rounded ${activeCorrelation === 'temp' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'}`}
                >
                  Temp vs PM
                </button>
                <button
                  onClick={() => setActiveCorrelation('humidity')}
                  className={`px-2 py-0.5 rounded ${activeCorrelation === 'humidity' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'}`}
                >
                  RH vs PM
                </button>
              </div>
            </div>

            <h3 className="text-xs font-mono font-bold text-white mb-1">
              {correlation.title}
            </h3>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              {correlation.note}
            </p>

            {/* Scatter / Line Graph for correlation */}
            <div className="h-36 bg-space-950 rounded-lg p-3 border border-slate-800 flex items-end justify-between relative">
              {correlation.points.map((p, idx) => {
                const heightPct = ((p.y - 15) / 45) * 100;
                return (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <span className="text-[9px] font-mono text-slate-400">{p.y}</span>
                    <div
                      className="w-4 bg-gradient-to-t from-cyan-600 to-sky-400 rounded-t"
                      style={{ height: `${Math.min(95, Math.max(10, heightPct))}%` }}
                    />
                    <span className="text-[9px] font-mono text-slate-500">{p.x}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 text-[10px] font-mono text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
            <span>Pearson Correlation: r = -0.84</span>
            <span className="text-emerald-400">High Dispersion Coupling</span>
          </div>
        </div>
      </div>
    </div>
  );
};
