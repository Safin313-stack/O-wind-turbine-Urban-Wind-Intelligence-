import React from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { Wind, RotateCw, Cog, Zap, BatteryCharging, ArrowRight, ArrowDown } from 'lucide-react';

export const EnergyFlowPipeline: React.FC = () => {
  const { telemetry } = useTelemetry();

  const stages = [
    {
      id: 'wind',
      label: 'WIND KINETIC',
      value: `${telemetry.windSpeed} m/s`,
      sub: `${telemetry.windDirection}° Azimuth`,
      icon: <Wind className="w-4 h-4 text-wind-cyan animate-pulse" />,
      color: 'border-cyan-500/30 bg-cyan-500/5 text-wind-cyan',
      glow: 'shadow-[0_0_15px_-3px_rgba(0,229,255,0.2)]',
    },
    {
      id: 'owind',
      label: 'O-WIND SHELL',
      value: 'Bernoulli ΔP',
      sub: '3D Omnidirectional',
      icon: <span className="w-4 h-4 rounded-full border-2 border-cyan-400 flex items-center justify-center text-[9px] font-bold text-cyan-300">O</span>,
      color: 'border-sky-500/30 bg-sky-500/5 text-sky-400',
      glow: 'shadow-[0_0_15px_-3px_rgba(56,189,248,0.2)]',
    },
    {
      id: 'rotation',
      label: 'ROTATION',
      value: `${telemetry.rpm} RPM`,
      sub: `${telemetry.shaftTorque} mNm Torque`,
      icon: <RotateCw className="w-4 h-4 text-emerald-400 animate-spin-slow" />,
      color: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
      glow: 'shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]',
    },
    {
      id: 'generator',
      label: 'GENERATOR',
      value: `${telemetry.power} W`,
      sub: `${telemetry.voltage}V · ${telemetry.current}mA`,
      icon: <Cog className="w-4 h-4 text-amber-400 animate-spin-reverse" />,
      color: 'border-amber-500/30 bg-amber-500/5 text-amber-400',
      glow: 'shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]',
    },
    {
      id: 'storage',
      label: 'BATTERY / LOAD',
      value: `${telemetry.batteryPct}% SoC`,
      sub: `${telemetry.energyGenerated} J Stored`,
      icon: <BatteryCharging className="w-4 h-4 text-purple-400" />,
      color: 'border-purple-500/30 bg-purple-500/5 text-purple-400',
      glow: 'shadow-[0_0_15px_-3px_rgba(168,85,247,0.2)]',
    },
  ];

  return (
    <div className="w-full bg-space-900/80 backdrop-blur-md rounded-xl p-4 sm:p-5 border border-slate-800/80">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400" />
          <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
            Real-Time Energy Conversion Flow
          </h2>
        </div>
        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active Transformation · η ≈ 28.4%</span>
        </div>
      </div>

      {/* Responsive Horizontal Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-3 relative">
        {stages.map((stage, idx) => (
          <div key={stage.id} className="relative flex flex-col">
            <div className={`p-3 rounded-lg border transition-all ${stage.color} ${stage.glow} flex flex-col justify-between h-full`}>
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[10px] font-mono font-bold tracking-wider opacity-80 uppercase">
                  {stage.label}
                </span>
                {stage.icon}
              </div>

              <div>
                <div className="text-lg font-mono font-bold text-white tracking-tight">
                  {stage.value}
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                  {stage.sub}
                </div>
              </div>
            </div>

            {/* Connecting Chevron arrow between stages: right on desktop, down on mobile */}
            {idx < stages.length - 1 && (
              <>
                <div className="hidden sm:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                  <ArrowRight className="w-4 h-4 text-cyan-400/80 animate-pulse" />
                </div>
                <div className="flex sm:hidden justify-center my-1 text-slate-600">
                  <ArrowDown className="w-3.5 h-3.5 text-cyan-400/80 animate-pulse" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
