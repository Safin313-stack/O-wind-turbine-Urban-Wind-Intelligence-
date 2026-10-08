import React, { useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { 
  Wind, 
  Compass, 
  Building2, 
  Activity, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  Calendar,
  AlertTriangle,
  Info
} from 'lucide-react';

export const UrbanWindView: React.FC = () => {
  const { telemetry } = useTelemetry();
  const [timeFilter, setTimeFilter] = useState<'today' | '7days' | '30days' | 'custom'>('today');

  // 16-point Wind Rose Frequency Distribution (Dhaka Historical Pattern)
  const WIND_ROSE_DATA = [
    { dir: 'N', angle: 0, freq: 8, avgSpeed: 2.4 },
    { dir: 'NNE', angle: 22.5, freq: 6, avgSpeed: 2.6 },
    { dir: 'NE', angle: 45, freq: 7, avgSpeed: 2.8 },
    { dir: 'ENE', angle: 67.5, freq: 9, avgSpeed: 3.1 },
    { dir: 'E', angle: 90, freq: 11, avgSpeed: 3.2 },
    { dir: 'ESE', angle: 112.5, freq: 14, avgSpeed: 3.5 },
    { dir: 'SE', angle: 135, freq: 24, avgSpeed: 3.8 }, // Primary monsoon/summer wind
    { dir: 'SSE', angle: 157.5, freq: 18, avgSpeed: 3.6 },
    { dir: 'S', angle: 180, freq: 16, avgSpeed: 3.4 },
    { dir: 'SSW', angle: 202.5, freq: 12, avgSpeed: 3.1 },
    { dir: 'SW', angle: 225, freq: 9, avgSpeed: 2.9 },
    { dir: 'WSW', angle: 247.5, freq: 5, avgSpeed: 2.4 },
    { dir: 'W', angle: 270, freq: 4, avgSpeed: 2.1 },
    { dir: 'WNW', angle: 292.5, freq: 4, avgSpeed: 2.2 },
    { dir: 'NW', angle: 315, freq: 6, avgSpeed: 2.5 },
    { dir: 'NNW', angle: 337.5, freq: 7, avgSpeed: 2.4 },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header with Time Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono font-semibold">
              URBAN AERODYNAMICS
            </span>
            <span className="text-xs font-mono text-slate-400">Dhaka Canyon Analysis</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Urban Wind & Canyon Turbulence
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Scientific visualization of multi-directional airflow between high-density urban building canyons
          </p>
        </div>

        {/* Time Filters */}
        <div className="flex items-center gap-1 bg-space-900 border border-slate-800 p-1 rounded-lg text-xs font-mono">
          {(['today', '7days', '30days', 'custom'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeFilter(t)}
              className={`px-3 py-1 rounded capitalize transition ${
                timeFilter === t
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t === '7days' ? '7 Days' : t === '30days' ? '30 Days' : t}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="p-4 rounded-xl bg-space-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase">Canyon Wind Speed</span>
          <div className="text-2xl font-bold text-white mt-1">
            {telemetry.windSpeed} <span className="text-xs text-wind-cyan font-normal">m/s</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">+1.4x Bernoulli Venturi</span>
        </div>

        <div className="p-4 rounded-xl bg-space-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase">Vector Azimuth</span>
          <div className="text-2xl font-bold text-white mt-1">
            {telemetry.windDirection}° <span className="text-xs text-slate-400 font-normal">SE</span>
          </div>
          <span className="text-[10px] text-emerald-400 block mt-1">Sustained Prevailing</span>
        </div>

        <div className="p-4 rounded-xl bg-space-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase">Airflow Pattern</span>
          <div className="text-base font-bold text-cyan-300 mt-1 truncate">
            Venturi Channeled
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">Chaotic 3D Swirl</span>
        </div>

        <div className="p-4 rounded-xl bg-space-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase">Turbulence Intensity</span>
          <div className="text-2xl font-bold text-amber-400 mt-1">
            18.2%
          </div>
          <span className="text-[10px] text-amber-400/80 block mt-1">High Roof Shear</span>
        </div>
      </div>

      {/* 3. Scientific Urban Airflow Canyon Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Animated Multi-Building Wind Canyon */}
        <div className="lg:col-span-8 bg-space-900/90 rounded-xl p-5 border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[420px]">
          <div className="flex items-center justify-between mb-2 z-10">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-wind-cyan" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                Gulshan Urban Street Canyon Airflow Simulation
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              Live Particle Mesh: 360° Vectors
            </span>
          </div>

          {/* SVG Urban Canyon Visualization with multiple buildings and streamlines */}
          <div className="relative w-full h-80 my-2 flex items-center justify-center overflow-hidden bg-space-950/70 rounded-lg border border-slate-800/80">
            <svg viewBox="0 0 800 360" className="w-full h-full">
              {/* Sky Background Grid */}
              <defs>
                <pattern id="sky-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#172554" strokeWidth="0.5" />
                </pattern>
                {/* Wind stream gradients */}
                <linearGradient id="wind-stream" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <rect width="800" height="360" fill="url(#sky-grid)" />

              {/* Building 1 (Left Tower - 18 Floors) */}
              <rect x="90" y="90" width="130" height="270" fill="#0c1933" stroke="#1e3a8a" strokeWidth="1.5" />
              {/* Windows */}
              {Array.from({ length: 9 }).map((_, r) => (
                <rect key={`b1-${r}`} x="105" y={110 + r * 25} width="100" height="12" fill="#1e293b" opacity="0.6" />
              ))}
              <text x="155" y="80" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                TOWER A (65m)
              </text>

              {/* Building 2 (Center Highrise - 26 Floors) */}
              <rect x="330" y="40" width="150" height="320" fill="#0f172a" stroke="#334155" strokeWidth="2" />
              {Array.from({ length: 12 }).map((_, r) => (
                <rect key={`b2-${r}`} x="345" y={60 + r * 23} width="120" height="11" fill="#38bdf8" opacity="0.15" />
              ))}
              <text x="405" y="30" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                GULSHAN SUMMIT (92m)
              </text>

              {/* O-Wind Prototype installed on Rooftop of Tower 2 */}
              <g transform="translate(385, 20)">
                <circle cx="15" cy="10" r="10" fill="#00E5FF" opacity="0.3" className="animate-ping" />
                <circle cx="15" cy="10" r="8" fill="#0B1226" stroke="#00E5FF" strokeWidth="2" />
                <circle cx="15" cy="10" r="3" fill="#10B981" />
                <text x="32" y="14" fill="#00E5FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  O-WIND UNIT
                </text>
              </g>

              {/* Building 3 (Right Midrise - 12 Floors) */}
              <rect x="580" y="150" width="140" height="210" fill="#0c1933" stroke="#1e3a8a" strokeWidth="1.5" />
              {Array.from({ length: 7 }).map((_, r) => (
                <rect key={`b3-${r}`} x="595" y={170 + r * 25} width="110" height="12" fill="#1e293b" opacity="0.6" />
              ))}
              <text x="650" y="140" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                COMMERCIAL C (45m)
              </text>

              {/* Street Canyon Label */}
              <text x="275" y="340" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">
                18m Urban Canyon
              </text>
              <text x="535" y="340" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">
                22m Street Gap
              </text>

              {/* Animated Wind Streamlines: Flowing horizontally & vertically around towers */}
              {/* Streamline 1: Over-roof compression into O-Wind */}
              <path
                d="M 10 70 Q 230 45 385 30 T 790 60"
                fill="none"
                stroke="url(#wind-stream)"
                strokeWidth="2.5"
                strokeDasharray="16 8"
                className="animate-flow"
              />
              {/* Streamline 2: Inter-building Venturi channel acceleration */}
              <path
                d="M 10 180 Q 220 160 280 200 Q 330 250 500 220 T 790 190"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="2"
                strokeDasharray="12 6"
                opacity="0.8"
                className="animate-flow"
              />
              {/* Streamline 3: Updraft rising from heated street tarmac */}
              <path
                d="M 270 330 Q 285 220 330 110 Q 360 40 400 30"
                fill="none"
                stroke="#10B981"
                strokeWidth="1.8"
                strokeDasharray="8 6"
                opacity="0.85"
                className="animate-flow"
              />
              {/* Streamline 4: Leeward wake swirl behind building 1 */}
              <path
                d="M 220 100 Q 270 140 240 210 Q 210 240 260 290"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                opacity="0.7"
              />
              {/* Streamline 5: Downward roof vortex */}
              <path
                d="M 480 50 Q 540 110 570 200 T 790 260"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2"
                strokeDasharray="10 5"
                opacity="0.75"
                className="animate-flow"
              />
            </svg>
          </div>

          {/* Bottom Streamline Explanation */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-300 pt-2 border-t border-slate-800">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-3 h-0.5 bg-cyan-400 inline-block" /> High-Velocity Roof Compression
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-3 h-0.5 bg-emerald-400 inline-block" /> Vertical Thermal Updraft (3D)
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-3 h-0.5 bg-amber-400 inline-block" /> Leeward Wake Vortex
            </span>
          </div>
        </div>

        {/* Right: Circular Wind-Rose Diagram */}
        <div className="lg:col-span-4 bg-space-900/90 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-wind-cyan" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                  Dhaka Wind-Rose (360°)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">16 Compass Points</span>
            </div>

            <p className="text-[11px] text-slate-400 font-mono mb-3">
              Directional frequency & mean velocity distribution. Note prevailing South-East dominance (24%).
            </p>

            {/* Circular Polar Compass Chart SVG */}
            <div className="relative w-56 h-56 mx-auto my-2">
              <svg viewBox="-120 -120 240 240" className="w-full h-full">
                {/* Concentric frequency rings */}
                {[30, 60, 90].map((r) => (
                  <circle key={r} cx="0" cy="0" r={r} fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />
                ))}

                {/* Compass radial lines */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const rad = (i * Math.PI) / 4;
                  return (
                    <line
                      key={i}
                      x1="0"
                      y1="0"
                      x2={100 * Math.cos(rad)}
                      y2={100 * Math.sin(rad)}
                      stroke="#1e293b"
                      strokeWidth="0.8"
                    />
                  );
                })}

                {/* 16 Wind Direction Petals */}
                {WIND_ROSE_DATA.map((item) => {
                  const rad = ((item.angle - 90) * Math.PI) / 180;
                  const length = item.freq * 3.8; // Radius proportional to frequency
                  const x = length * Math.cos(rad);
                  const y = length * Math.sin(rad);
                  const isSE = item.dir === 'SE';

                  return (
                    <g key={item.dir}>
                      <line
                        x1="0"
                        y1="0"
                        x2={x}
                        y2={y}
                        stroke={isSE ? '#00E5FF' : '#38BDF8'}
                        strokeWidth={isSE ? '5' : '3'}
                        strokeLinecap="round"
                        opacity={isSE ? 1 : 0.65}
                      />
                    </g>
                  );
                })}

                {/* Cardinal Labels */}
                <text x="0" y="-105" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">N</text>
                <text x="110" y="4" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">E</text>
                <text x="0" y="115" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">S</text>
                <text x="-110" y="4" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">W</text>

                {/* Center Core */}
                <circle cx="0" cy="0" r="5" fill="#00E5FF" />
              </svg>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-space-950/80 border border-slate-800 text-[11px] font-mono text-slate-300">
            <div className="flex items-center justify-between">
              <span>Dominant Angle:</span>
              <strong className="text-wind-cyan">137° (South-East)</strong>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span>Mean Velocity:</span>
              <strong className="text-white">3.42 m/s</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 4. “Urban Wind Profile”: Why Omnidirectional O-Wind vs 3-Blade HAWTs */}
      <div className="bg-space-900/90 rounded-xl p-5 border border-slate-800">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
            Urban Wind Profile: Why Omnidirectional Technology is Essential
          </h2>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-4xl mb-4">
          Urban high-rises disrupt uniform horizontal laminar airflow into three-dimensional chaotic vectors. Traditional 3-blade wind turbines (HAWTs) suffer heavy efficiency losses and structural fatigue in cities because they require steady unidirectional wind and mechanical yaw steering.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* O-Wind Turbine Card */}
          <div className="p-4 rounded-xl bg-space-950/80 border border-emerald-500/30 shadow-glow-green">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                O-Wind Omnidirectional Design
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                Urban Optimized
              </span>
            </div>
            <ul className="space-y-2 text-slate-300 mt-3 font-sans">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-mono mt-0.5">✓</span>
                <span><strong>3D Multidirectional Capture:</strong> Harvests horizontal gusts, upward parapet shears, and downdrafts simultaneously.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-mono mt-0.5">✓</span>
                <span><strong>No Yaw Mechanisms:</strong> Continuous rotation without mechanical motors trying to track erratic wind direction shifts.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-mono mt-0.5">✓</span>
                <span><strong>Acoustic & Wildlife Safety:</strong> Enclosed spherical shell produces zero audible blade whistle (&lt;28 dBA) and poses zero risk to birds.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-mono mt-0.5">✓</span>
                <span><strong>Ultra-Low Cut-In Speed:</strong> Ceramic hybrid bearings allow rotation to commence at gentle 1.48 m/s breezes.</span>
              </li>
            </ul>
          </div>

          {/* Traditional 3-Blade HAWT Card */}
          <div className="p-4 rounded-xl bg-space-950/80 border border-rose-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-rose-400 flex items-center gap-1.5">
                <XCircle className="w-4 h-4" />
                Conventional 3-Blade HAWT
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-300">
                Rural/Open Field Only
              </span>
            </div>
            <ul className="space-y-2 text-slate-300 mt-3 font-sans">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-mono mt-0.5">✕</span>
                <span><strong>Yaw Hunting Stall:</strong> When building turbulence changes wind direction by &gt;30°, blades stall and power drops to zero.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-mono mt-0.5">✕</span>
                <span><strong>Structural Fatigue:</strong> Extreme gyroscopic and turbulent bending moments cause rooftop mounting vibrations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-mono mt-0.5">✕</span>
                <span><strong>Urban Hazards:</strong> High-speed exposed blades present unacceptable safety hazards and loud acoustic hum in residential zones.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-mono mt-0.5">✕</span>
                <span><strong>High Startup Inertia:</strong> Cut-in speed often exceeds 3.5 m/s, remaining stagnant during typical tropical city days.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
