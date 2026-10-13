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
    <section id="simulation" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <InView>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22262C] border border-[#2E343D] text-[#FF8A24] text-[11px] font-mono font-bold tracking-wide">
            <Zap className="w-3.5 h-3.5 text-[#FF8A24]" />
            <span>INTERACTIVE PHYSICS & MICROGRID DISPATCH</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#F5F5F2] tracking-tight font-display">
            Real-Time Microgrid Dispatch
          </h2>
          <p className="text-xs sm:text-sm text-[#A7ADB5] font-sans leading-relaxed">
            Live aerodynamic response, Bernoulli rotor RPM, and autonomous load balancing.
          </p>
        </div>

        {/* Main Glassmorphic Interactive Simulator Card */}
        <div className="bg-[#22262C]/95 backdrop-blur-2xl p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#2E343D] shadow-2xl relative overflow-hidden">
          <BorderBeam size={240} duration={14} colorFrom="#FF8A24" colorTo="#10b981" />
          <Spotlight fill="rgba(255, 138, 36, 0.08)" size={260} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: Interactive Controls */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-[#F5F5F2] font-bold uppercase flex items-center gap-2 font-mono">
                    <Wind className="w-4 h-4 text-[#FF8A24]" />
                    Canyon Wind Speed
                  </span>
                  <span className="text-lg font-black text-[#FF8A24] bg-[#1C2026] px-3 py-1 rounded-xl border border-[#2E343D] shadow-sm flex items-center gap-1.5 font-mono">
                    <AnimatedNumber value={windSpeed} decimals={1} />
                    <span className="text-xs text-[#A7ADB5] font-normal">m/s</span>
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
                  className="w-full h-2.5 bg-[#1C2026] rounded-lg appearance-none cursor-pointer accent-[#FF8A24] border border-[#2E343D]"
                />

                <div className="flex justify-between text-[10px] font-mono text-[#A7ADB5]">
                  <span>0.5 m/s (Calm)</span>
                  <span className="text-[#FF8A24] font-bold">1.48 m/s Cut-in</span>
                  <span>5.0 m/s (Moderate)</span>
                  <span>10.0 m/s (Gust)</span>
                </div>
              </div>

              {/* Smart Micro-Loads Toggles */}
              <div className="space-y-2 pt-4 border-t border-[#2E343D]">
                <span className="text-xs font-mono font-bold text-[#F5F5F2] uppercase tracking-wide block mb-2">
                  Toggle Edge Micro-Loads:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {loads.map((load) => {
                    const Icon = load.icon;
                    return (
                      <button
                        key={load.id}
                        onClick={() => toggleLoad(load.id)}
                        type="button"
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          load.enabled
                            ? 'bg-[#FF8A24]/10 border-[#FF8A24] text-[#F5F5F2] shadow-sm'
                            : 'bg-[#1C2026] border-[#2E343D] text-[#A7ADB5] hover:text-[#F5F5F2] hover:border-[#FF8A24]/40'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${load.enabled ? 'text-[#FF8A24]' : 'text-[#A7ADB5]'}`} />
                          <span className="text-xs font-sans font-semibold truncate">{load.name}</span>
                        </div>
                        <span className="text-[11px] font-mono font-bold shrink-0 ml-1.5">
                          {load.power}W
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Real-Time Telemetry & Energy Dispatch Status */}
            <div className="lg:col-span-6 space-y-3.5">
              {/* 4 Output Metrics with Motion Primitives Animated Numbers */}
              <div className="grid grid-cols-2 gap-2.5 font-sans">
                <div className="p-3.5 rounded-xl bg-[#1C2026] border border-[#2E343D] shadow-sm">
                  <span className="text-[10px] text-[#A7ADB5] font-mono uppercase block font-bold tracking-wide">Rotor Velocity</span>
                  <div className="text-xl sm:text-2xl font-black text-[#F5F5F2] mt-0.5 flex items-baseline gap-1 font-mono">
                    <AnimatedNumber value={rpm} />
                    <span className="text-xs text-[#A7ADB5] font-normal">RPM</span>
                  </div>
                  <span className="text-[10px] text-[#FF8A24] block mt-1 font-semibold">
                    {isOperating ? 'Active Kinetic Spin' : 'Below Cut-in Threshold'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1C2026] border border-[#2E343D] shadow-sm">
                  <span className="text-[10px] text-[#A7ADB5] font-mono uppercase block font-bold tracking-wide">Generated Output</span>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5 flex items-baseline gap-1 font-mono">
                    <AnimatedNumber value={powerWatts} decimals={2} />
                    <span className="text-xs text-[#A7ADB5] font-normal">Watts</span>
                  </div>
                  <span className="text-[10px] text-[#A7ADB5] block mt-1 font-medium">
                    Micro-MPPT Conditioned
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1C2026] border border-[#2E343D] shadow-sm">
                  <span className="text-[10px] text-[#A7ADB5] font-mono uppercase block font-bold tracking-wide">Bernoulli Suction</span>
                  <div className="text-xl sm:text-2xl font-black text-cyan-400 mt-0.5 flex items-baseline gap-1 font-mono">
                    <AnimatedNumber value={pressureDeltaPa} decimals={1} />
                    <span className="text-xs text-[#A7ADB5] font-normal">Pa (ΔP)</span>
                  </div>
                  <span className="text-[10px] text-[#A7ADB5] block mt-1 font-medium">
                    Internal Venturi Pressure
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1C2026] border border-[#2E343D] shadow-sm">
                  <span className="text-[10px] text-[#A7ADB5] font-mono uppercase block font-bold tracking-wide">Active Edge Loads</span>
                  <div className="text-xl sm:text-2xl font-black text-[#FF8A24] mt-0.5 flex items-baseline gap-1 font-mono">
                    <AnimatedNumber value={totalLoadWatts} decimals={2} />
                    <span className="text-xs text-[#A7ADB5] font-normal">Watts</span>
                  </div>
                  <span className="text-[10px] text-[#A7ADB5] block mt-1 font-medium">
                    {loads.filter(l => l.enabled).length} Components Powered
                  </span>
                </div>
              </div>

              {/* Microgrid Net Balance Card */}
              <div className={`p-3.5 rounded-xl border font-sans flex items-center justify-between ${
                isSurplus
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                  : 'bg-[#FF8A24]/10 border-[#FF8A24]/40 text-[#FF8A24]'
              }`}>
                <div className="flex items-center gap-2.5 min-w-0">
                  <BatteryCharging className={`w-5 h-5 shrink-0 ${isSurplus ? 'text-emerald-400' : 'text-[#FF8A24]'} animate-pulse`} />
                  <div className="min-w-0">
                    <span className="text-xs font-mono font-bold block tracking-wide truncate">
                      {isSurplus ? 'ENERGY SURPLUS (CHARGING BATTERY)' : 'ENERGY DEFICIT (BUFFER DRAW)'}
                    </span>
                    <span className="text-[11px] opacity-80 font-sans block truncate">
                      {isSurplus
                        ? `Generation exceeds loads by +${netWatts}W. Excess buffered in 3.7V LiFePO4.`
                        : `Loads exceed generation by ${netWatts}W. Drawing from LiFePO4 reserve.`}
                    </span>
                  </div>
                </div>
                <span className="text-base sm:text-lg font-black shrink-0 ml-3 flex items-baseline gap-0.5 font-mono">
                  <span>{isSurplus ? '+' : ''}</span>
                  <AnimatedNumber value={netWatts} decimals={2} />
                  <span className="text-xs ml-0.5">W</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </InView>
    </section>
  );
};
