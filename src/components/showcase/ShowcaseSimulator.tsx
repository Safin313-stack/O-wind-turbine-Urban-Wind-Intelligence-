import React, { useState } from 'react';
import { Sliders, Zap, Wind, RotateCw, BatteryCharging, Radio, Cpu, Lightbulb, ShieldCheck, Activity } from 'lucide-react';

interface SimulatorLoad {
  id: string;
  name: string;
  power: number;
  icon: any;
  enabled: boolean;
}

export const ShowcaseSimulator: React.FC = () => {
  const [windSpeed, setWindSpeed] = useState<number>(3.8); // 3.8 m/s default
  const [loads, setLoads] = useState<SimulatorLoad[]>([
    { id: 'sensors', name: 'Environmental Sensor Suite (PM2.5/CO2)', power: 0.08, icon: Radio, enabled: true },
    { id: 'gateway', name: 'Edge AI ESP32 IoT Gateway', power: 0.12, icon: Cpu, enabled: true },
    { id: 'lora', name: 'LoRaWAN Long-Range Transceiver', power: 0.06, icon: Activity, enabled: true },
    { id: 'beacon', name: 'Night Architectural LED Beacon', power: 0.15, icon: Lightbulb, enabled: false },
  ]);

  // Physics calculations
  const cutInSpeed = 1.48;
  const isOperating = windSpeed >= cutInSpeed;
  const rpm = isOperating ? Math.round(windSpeed * 52) : 0;
  const powerWatts = isOperating
    ? Number((Math.pow(windSpeed / 3.4, 2.3) * 0.42).toFixed(2))
    : 0.00;
  
  // Bernoulli differential pressure (Pa = 0.5 * rho * v^2 * delta_coeff)
  const pressureDeltaPa = isOperating
    ? Number((0.5 * 1.225 * Math.pow(windSpeed, 2) * 0.48).toFixed(1))
    : 0.0;

  const totalLoadWatts = loads
    .filter((l) => l.enabled)
    .reduce((sum, l) => sum + l.power, 0);

  const netWatts = Number((powerWatts - totalLoadWatts).toFixed(2));
  const isSurplus = netWatts >= 0;

  const toggleLoad = (id: string) => {
    setLoads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l))
    );
  };

  return (
    <section id="simulation" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono font-medium">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>INTERACTIVE PHYSICS & MICROGRID DISPATCH</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
          Simulate Real-Time Urban Energy Harvest
        </h2>
        <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed">
          Adjust the wind speed slider below to observe how the O-Wind rotor responds, generates clean wattage, and autonomously dispatches energy to edge IoT loads and battery storage.
        </p>
      </div>

      {/* Main Glassmorphic Interactive Simulator Card */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/[0.1] relative overflow-hidden shadow-2xl">
        {/* Ambient lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-bold uppercase flex items-center gap-2">
                  <Wind className="w-4 h-4 text-cyan-400" />
                  Canyon Wind Speed
                </span>
                <span className="text-xl font-bold text-cyan-300 bg-white/[0.04] px-3 py-1 rounded-lg border border-white/[0.08]">
                  {windSpeed.toFixed(1)} <span className="text-xs text-slate-400">m/s</span>
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="0.5"
                max="10.0"
                step="0.1"
                value={windSpeed}
                onChange={(e) => setWindSpeed(parseFloat(e.target.value))}
                className="w-full h-2.5 bg-space-850 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-white/[0.08]"
              />

              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0.5 m/s (Calm)</span>
                <span className="text-cyan-400 font-bold">1.48 m/s Cut-in</span>
                <span>5.0 m/s (Moderate)</span>
                <span>10.0 m/s (Strong Gust)</span>
              </div>
            </div>

            {/* Smart Micro-Loads Toggles */}
            <div className="space-y-2 pt-4 border-t border-white/[0.08]">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase block mb-3">
                Toggle Edge Micro-Loads:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {loads.map((load) => {
                  const Icon = load.icon;
                  return (
                    <button
                      key={load.id}
                      onClick={() => toggleLoad(load.id)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        load.enabled
                          ? 'bg-cyan-500/10 border-cyan-500/40 text-white shadow-sm'
                          : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${load.enabled ? 'text-cyan-400' : 'text-slate-500'}`} />
                        <span className="text-xs font-mono truncate">{load.name}</span>
                      </div>
                      <span className="text-[11px] font-mono font-bold shrink-0 ml-2">
                        {load.power}W
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Real-Time Telemetry & Energy Dispatch Status */}
          <div className="lg:col-span-6 space-y-4">
            {/* 4 Output Metrics */}
            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 uppercase block">Rotor Velocity</span>
                <div className="text-2xl font-bold text-white mt-1">
                  {rpm} <span className="text-xs text-slate-400 font-normal">RPM</span>
                </div>
                <span className="text-[10px] text-cyan-400 block mt-1">
                  {isOperating ? 'Active Kinetic Spin' : 'Below Cut-in Threshold'}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 uppercase block">Generated Output</span>
                <div className="text-2xl font-bold text-emerald-400 mt-1">
                  {powerWatts} <span className="text-xs text-slate-400 font-normal">Watts</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Micro-MPPT Conditioned
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 uppercase block">Bernoulli Suction</span>
                <div className="text-2xl font-bold text-sky-400 mt-1">
                  {pressureDeltaPa} <span className="text-xs text-slate-400 font-normal">Pa (ΔP)</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Internal Venturi Pressure
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 uppercase block">Active Edge Loads</span>
                <div className="text-2xl font-bold text-purple-400 mt-1">
                  {totalLoadWatts.toFixed(2)} <span className="text-xs text-slate-400 font-normal">Watts</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">
                  {loads.filter(l => l.enabled).length} Components Powered
                </span>
              </div>
            </div>

            {/* Microgrid Net Balance Card */}
            <div className={`p-4 rounded-2xl border font-mono flex items-center justify-between ${
              isSurplus
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}>
              <div className="flex items-center gap-3">
                <BatteryCharging className={`w-5 h-5 ${isSurplus ? 'text-emerald-400' : 'text-amber-400'} animate-pulse`} />
                <div>
                  <span className="text-xs font-bold block">
                    {isSurplus ? 'ENERGY SURPLUS (CHARGING BATTERY)' : 'ENERGY DEFICIT (BUFFER DRAW)'}
                  </span>
                  <span className="text-[11px] opacity-80 font-sans">
                    {isSurplus
                      ? `Generation exceeds loads by +${netWatts}W. Excess buffered in 3.7V LiFePO4 cells.`
                      : `Loads exceed generation by ${netWatts}W. Drawing from LiFePO4 reserve buffer.`}
                  </span>
                </div>
              </div>
              <span className="text-lg font-extrabold shrink-0 ml-3">
                {isSurplus ? `+${netWatts} W` : `${netWatts} W`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
