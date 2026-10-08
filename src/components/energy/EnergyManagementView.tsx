import React, { useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { soundFx } from '../../utils/audio';
import {
  Zap,
  BatteryCharging,
  BatteryMedium,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  Radio,
  Cpu,
  Lightbulb,
  Smartphone,
  ArrowRight,
  TrendingUp,
  Sun,
  Moon,
  Clock
} from 'lucide-react';

export const EnergyManagementView: React.FC = () => {
  const { telemetry, loads, toggleLoad } = useTelemetry();
  const [simHour, setSimHour] = useState<number>(14); // 14:00 (2 PM) default

  const totalLoadWatts = loads
    .filter((l) => l.isEnabled)
    .reduce((acc, l) => acc + l.powerWatts, 0);

  const netPower = Number((telemetry.power - totalLoadWatts).toFixed(2));
  const isSurplus = netPower >= 0;
  const isCharging = telemetry.batteryCurrent > 0;

  // 24-Hour Hybrid Curve Model (Solar vs O-Wind)
  const isDaytime = simHour >= 6 && simHour <= 18;
  const simulatedSolarWatts = isDaytime
    ? Number((Math.sin(((simHour - 6) / 12) * Math.PI) * 1.2).toFixed(2))
    : 0.00;
  const simulatedOwindWatts = telemetry.power;
  const hybridTotalGen = Number((simulatedSolarWatts + simulatedOwindWatts).toFixed(2));

  const getLoadIcon = (category: string) => {
    switch (category) {
      case 'lighting':
        return <Lightbulb className="w-4 h-4 text-amber-400" />;
      case 'charging':
        return <Smartphone className="w-4 h-4 text-cyan-400" />;
      case 'sensor':
        return <Radio className="w-4 h-4 text-emerald-400" />;
      case 'compute':
        return <Cpu className="w-4 h-4 text-purple-400" />;
      default:
        return <Zap className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-semibold">
              MICROGRID DISPATCH
            </span>
            <span className="text-xs font-mono text-slate-400">Autonomous Edge Energy Routing</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Smart Energy Management & Hybrid Storage
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time power conditioning, MPPT routing, battery storage, and 24-hour solar-wind diurnal balancing
          </p>
        </div>

        {/* Live Net Balance Badge */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono text-xs ${
          isSurplus
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
        }`}>
          <span className={`w-2 h-2 rounded-full ${isSurplus ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
          <span>NET BALANCE: <strong>{isSurplus ? `+${netPower}` : netPower} W</strong></span>
        </div>
      </div>

      {/* 2. Interactive 24-Hour Solar + O-Wind Hybrid Timeline */}
      <div className="bg-space-900/90 rounded-xl p-5 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs">
            {isDaytime ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-400" />}
            <span className="text-white font-bold uppercase">
              24-Hour Hybrid Microgrid Simulation ({simHour}:00 {isDaytime ? 'Day' : 'Night'})
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-slate-400">Time:</span>
            <input
              type="range"
              min="0"
              max="23"
              step="1"
              value={simHour}
              onChange={(e) => setSimHour(parseInt(e.target.value))}
              className="w-36 accent-emerald-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
            />
            <span className="font-bold text-white w-12">{simHour}:00</span>
          </div>
        </div>

        {/* Dynamic Hybrid Generation Output Callouts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3 rounded-lg bg-space-950 border border-amber-500/30">
            <span className="text-[10px] text-slate-400 block">ROOFTOP SOLAR PV</span>
            <div className="text-lg font-bold text-amber-300 mt-0.5">{simulatedSolarWatts} W</div>
            <span className="text-[10px] text-slate-500">{isDaytime ? 'Active Solar Array' : 'Nighttime Dormant (0W)'}</span>
          </div>

          <div className="p-3 rounded-lg bg-space-950 border border-cyan-500/30">
            <span className="text-[10px] text-slate-400 block">O-WIND OMNIDIRECTIONAL</span>
            <div className="text-lg font-bold text-wind-cyan mt-0.5">{simulatedOwindWatts} W</div>
            <span className="text-[10px] text-emerald-400">Continuous 24/7 Harvest</span>
          </div>

          <div className="p-3 rounded-lg bg-space-950 border border-emerald-500/30">
            <span className="text-[10px] text-slate-400 block">COMBINED HYBRID HARVEST</span>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">{hybridTotalGen} W</div>
            <span className="text-[10px] text-slate-400">Supplying Building Bus</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          <strong>Why this solves Dhaka's load-shedding:</strong> Peak residential blackouts in Dhaka occur between 7:00 PM and 11:00 PM when solar PV generates zero. O-Wind continues operating through nighttime urban thermal drafts, ensuring critical communications and air sensors remain powered 100% of the time.
        </p>
      </div>

      {/* 3. Power-Flow Diagram */}
      <div className="bg-space-900/80 backdrop-blur-md rounded-xl p-5 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Complete Power Conditioning & Distribution Chain
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Loss Budget: 18.2% Total Electrical
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 relative">
          {[
            { step: '01', title: 'O-WIND ROTOR', val: `${telemetry.rpm} RPM`, sub: 'Aerodynamic Input', color: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/20' },
            { step: '02', title: 'GENERATOR', val: `${(telemetry.power * 1.15).toFixed(2)} W`, sub: '3-Phase AC Unrectified', color: 'border-sky-500/40 text-sky-300 bg-sky-950/20' },
            { step: '03', title: 'CONDITIONING', val: '3.70 V', sub: 'Synchronous Rectifier', color: 'border-amber-500/40 text-amber-300 bg-amber-950/20' },
            { step: '04', title: 'ENERGY MONITOR', val: `${telemetry.power} W`, sub: 'Micro-MPPT Tracker', color: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/20' },
            { step: '05', title: 'BATTERY (SoC)', val: `${telemetry.batteryPct}%`, sub: isCharging ? 'Buffering Inflow' : 'Discharging', color: 'border-purple-500/40 text-purple-300 bg-purple-950/20' },
            { step: '06', title: 'EDGE LOADS', val: `${totalLoadWatts.toFixed(2)} W`, sub: `${loads.filter(l => l.isEnabled).length} Active Loads`, color: 'border-indigo-500/40 text-indigo-300 bg-indigo-950/20' },
          ].map((item) => (
            <div key={item.step} className={`p-3 rounded-lg border flex flex-col justify-between ${item.color}`}>
              <div className="flex items-center justify-between text-[10px] font-mono opacity-70">
                <span>{item.step}</span>
                <span className="truncate">{item.sub}</span>
              </div>
              <div className="my-2">
                <span className="text-[10px] font-mono font-bold block">{item.title}</span>
                <span className="text-base font-mono font-extrabold text-white">{item.val}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Live Sankey-Style Flow Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-space-900/80 rounded-xl p-5 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="stat-label">Dynamic Power Flow Distribution</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
              Active Routing
            </span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-300">Generated Power (O-Wind PMG)</span>
                <strong className="text-wind-cyan">{telemetry.power} W</strong>
              </div>
              <div className="w-full bg-space-950 rounded-full h-3 overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-sky-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (telemetry.power / 1.0) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-300">
                  {isCharging ? 'Battery Charging Rate' : 'Battery Discharge Contribution'}
                </span>
                <strong className={isCharging ? 'text-purple-300' : 'text-amber-300'}>
                  {Math.abs(telemetry.batteryCurrent)} mA ({Math.abs((telemetry.batteryCurrent * 3.85) / 1000).toFixed(2)} W)
                </strong>
              </div>
              <div className="w-full bg-space-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isCharging ? 'bg-purple-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.min(100, (Math.abs(telemetry.batteryCurrent) / 120) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-300">Total Active Direct Load</span>
                <strong className="text-emerald-400">{totalLoadWatts.toFixed(2)} W</strong>
              </div>
              <div className="w-full bg-space-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (totalLoadWatts / 1.2) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-400">Internal Electrical Loss (MPPT + Rectifier)</span>
                <strong className="text-slate-400">~0.07 W</strong>
              </div>
              <div className="w-full bg-space-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                <div className="bg-slate-700 h-full rounded-full" style={{ width: '18%' }} />
              </div>
            </div>
          </div>

          <div className="mt-5 p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-purple-300 uppercase">
                AI Dispatch Recommendation
              </div>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                {isSurplus
                  ? 'Wind availability is steady (3.42 m/s). System has surplus capacity (+0.14 W). Battery storage charging is prioritized; all critical sensors operational.'
                  : 'Wind velocity briefly dropped below 2.2 m/s. Edge controller recommends delaying non-essential architectural LEDs to preserve battery health.'}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-space-900/80 rounded-xl p-5 border border-purple-500/20 shadow-glow-purple flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BatteryCharging className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                  LiFePO4 Battery Core
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                2000 mAh · 3.7V
              </span>
            </div>

            <div className="p-4 bg-space-950 rounded-xl border border-slate-800 text-center my-2">
              <div className="relative w-40 h-20 mx-auto border-2 border-slate-600 rounded-lg p-1.5 flex items-center">
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-2 h-6 bg-slate-600 rounded-r-sm" />
                <div
                  className={`h-full rounded transition-all duration-700 flex items-center justify-center font-mono font-bold text-xs text-black ${
                    telemetry.batteryPct > 30 ? 'bg-gradient-to-r from-purple-500 to-emerald-400' : 'bg-rose-500'
                  }`}
                  style={{ width: `${telemetry.batteryPct}%` }}
                >
                  {telemetry.batteryPct}%
                </div>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 font-mono text-xs">
                <span className={`w-2 h-2 rounded-full ${isCharging ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                <span className="text-white font-semibold">
                  {isCharging ? 'Active Charging (+42.5 mA)' : 'Discharge Mode'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-space-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400">Terminal Voltage</span>
                <div className="text-sm font-bold text-white mt-0.5">{telemetry.batteryVoltage} V</div>
              </div>
              <div className="p-2.5 rounded-lg bg-space-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400">Remaining Runtime</span>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">28.4 Hours</div>
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-slate-400 pt-3 border-t border-slate-800 mt-4 flex items-center justify-between">
            <span>Cycle Count: 142</span>
            <span>Thermal: 29.4°C Nominal</span>
          </div>
        </div>
      </div>

      {/* 5. Controllable Smart Load Cards */}
      <div className="bg-space-900/80 rounded-xl p-5 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
              Dynamic Edge Micro-Loads
            </h2>
            <p className="text-xs text-slate-400">
              Toggle building rooftop consumers to test microgrid load shedding and autonomous endurance
            </p>
          </div>
          <div className="text-xs font-mono text-slate-300">
            Active Load Sum: <strong className="text-emerald-400">{totalLoadWatts.toFixed(2)} W</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 font-mono">
          {loads.map((load) => (
            <div
              key={load.id}
              className={`p-3.5 rounded-xl border transition-all ${
                load.isEnabled
                  ? 'bg-space-850/90 border-slate-700 shadow-md'
                  : 'bg-space-950/50 border-slate-800/80 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-space-900 border border-slate-800">
                  {getLoadIcon(load.category)}
                </div>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    toggleLoad(load.id);
                  }}
                  className={`text-xs px-2 py-0.5 rounded font-bold transition ${
                    load.isEnabled
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {load.isEnabled ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="text-xs font-bold text-white truncate mb-1">
                {load.name.split('(')[0]}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800">
                <span>Power: <strong className="text-white">{load.powerWatts} W</strong></span>
                <span className={`capitalize ${load.priority === 'critical' ? 'text-amber-400' : 'text-slate-400'}`}>
                  {load.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
