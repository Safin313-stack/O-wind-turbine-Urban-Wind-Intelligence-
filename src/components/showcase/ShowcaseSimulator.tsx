import React, { useState } from 'react';
import { Zap, Wind, BatteryCharging, Radio, Cpu, Lightbulb, Activity } from 'lucide-react';
import { InView, AnimatedNumber, Spotlight, BorderBeam } from '../motion-primitives';

interface SimulatorLoad {
  id: string;
  name: string;
  power: number;
  icon: React.ElementType;
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
      <InView>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans font-bold tracking-wide">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>INTERACTIVE PHYSICS & MICROGRID DISPATCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight font-display">
            Simulate Real-Time Urban Energy Harvest
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Adjust the wind speed slider below to observe how the O-Wind rotor responds, generates clean wattage, and autonomously dispatches energy to edge IoT loads and battery storage.
          </p>
        </div>

        {/* Main Glassmorphic Interactive Simulator Card */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-stone-200/90 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.05)] relative overflow-hidden">
          <BorderBeam size={240} duration={14} colorFrom="#10b981" colorTo="#06b6d4" />
          <Spotlight fill="rgba(16, 185, 129, 0.08)" size={260} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Interactive Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-stone-800 font-bold uppercase flex items-center gap-2">
                    <Wind className="w-4 h-4 text-cyan-600" />
                    Canyon Wind Speed
                  </span>
                  <span className="text-xl font-extrabold text-stone-900 bg-stone-100 px-3.5 py-1 rounded-xl border border-stone-200 shadow-sm flex items-center gap-1.5 font-display">
                    <AnimatedNumber value={windSpeed} decimals={1} />
                    <span className="text-xs text-stone-500 font-normal">m/s</span>
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
                  className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                />

                <div className="flex justify-between text-[10px] font-sans font-medium text-stone-500">
                  <span>0.5 m/s (Calm)</span>
                  <span className="text-cyan-700 font-bold">1.48 m/s Cut-in</span>
                  <span>5.0 m/s (Moderate)</span>
                  <span>10.0 m/s (Strong Gust)</span>
                </div>
              </div>

              {/* Smart Micro-Loads Toggles */}
              <div className="space-y-2 pt-4 border-t border-stone-200/80">
                <span className="text-xs font-sans font-bold text-stone-800 uppercase tracking-wide block mb-3">
                  Toggle Edge Micro-Loads:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {loads.map((load) => {
                    const Icon = load.icon;
                    return (
                      <button
                        key={load.id}
                        onClick={() => toggleLoad(load.id)}
                        className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          load.enabled
                            ? 'bg-cyan-50/80 border-cyan-300 text-stone-900 shadow-sm'
                            : 'bg-white border-stone-200 text-stone-500 hover:text-stone-900 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${load.enabled ? 'text-cyan-600' : 'text-stone-400'}`} />
                          <span className="text-xs font-sans font-semibold truncate">{load.name}</span>
                        </div>
                        <span className="text-[11px] font-sans font-bold shrink-0 ml-2">
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
              {/* 4 Output Metrics with Motion Primitives Animated Numbers */}
              <div className="grid grid-cols-2 gap-3.5 font-sans">
                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
                  <span className="text-[10px] text-stone-500 uppercase block font-bold tracking-wide">Rotor Velocity</span>
                  <div className="text-2xl font-black text-stone-900 mt-1 flex items-baseline gap-1 font-display">
                    <AnimatedNumber value={rpm} />
                    <span className="text-xs text-stone-500 font-normal">RPM</span>
                  </div>
                  <span className="text-[10px] text-cyan-700 block mt-1 font-semibold">
                    {isOperating ? 'Active Kinetic Spin' : 'Below Cut-in Threshold'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
                  <span className="text-[10px] text-stone-500 uppercase block font-bold tracking-wide">Generated Output</span>
                  <div className="text-2xl font-black text-emerald-600 mt-1 flex items-baseline gap-1 font-display">
                    <AnimatedNumber value={powerWatts} decimals={2} />
                    <span className="text-xs text-stone-500 font-normal">Watts</span>
                  </div>
                  <span className="text-[10px] text-stone-500 block mt-1 font-medium">
                    Micro-MPPT Conditioned
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
                  <span className="text-[10px] text-stone-500 uppercase block font-bold tracking-wide">Bernoulli Suction</span>
                  <div className="text-2xl font-black text-sky-700 mt-1 flex items-baseline gap-1 font-display">
                    <AnimatedNumber value={pressureDeltaPa} decimals={1} />
                    <span className="text-xs text-stone-500 font-normal">Pa (ΔP)</span>
                  </div>
                  <span className="text-[10px] text-stone-500 block mt-1 font-medium">
                    Internal Venturi Pressure
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
                  <span className="text-[10px] text-stone-500 uppercase block font-bold tracking-wide">Active Edge Loads</span>
                  <div className="text-2xl font-black text-purple-700 mt-1 flex items-baseline gap-1 font-display">
                    <AnimatedNumber value={totalLoadWatts} decimals={2} />
                    <span className="text-xs text-stone-500 font-normal">Watts</span>
                  </div>
                  <span className="text-[10px] text-stone-500 block mt-1 font-medium">
                    {loads.filter(l => l.enabled).length} Components Powered
                  </span>
                </div>
              </div>

              {/* Microgrid Net Balance Card */}
              <div className={`p-4 rounded-2xl border font-sans flex items-center justify-between ${
                isSurplus
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900'
                  : 'bg-amber-50/80 border-amber-300 text-amber-900'
              }`}>
                <div className="flex items-center gap-3">
                  <BatteryCharging className={`w-5 h-5 ${isSurplus ? 'text-emerald-600' : 'text-amber-600'} animate-pulse`} />
                  <div>
                    <span className="text-xs font-bold block tracking-wide">
                      {isSurplus ? 'ENERGY SURPLUS (CHARGING BATTERY)' : 'ENERGY DEFICIT (BUFFER DRAW)'}
                    </span>
                    <span className="text-[11px] opacity-80 font-sans">
                      {isSurplus
                        ? `Generation exceeds loads by +${netWatts}W. Excess buffered in 3.7V LiFePO4 cells.`
                        : `Loads exceed generation by ${netWatts}W. Drawing from LiFePO4 reserve buffer.`}
                    </span>
                  </div>
                </div>
                <span className="text-lg font-black shrink-0 ml-3 flex items-baseline gap-0.5 font-display">
                  <span>{isSurplus ? '+' : ''}</span>
                  <AnimatedNumber value={netWatts} decimals={2} />
                  <span className="text-xs ml-1">W</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </InView>
    </section>
  );
};
