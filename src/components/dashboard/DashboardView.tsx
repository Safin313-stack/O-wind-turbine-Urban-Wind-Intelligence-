import React from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { Turbine3DViewer } from '../turbine3d/Turbine3DViewer';
import { EnergyFlowPipeline } from './EnergyFlowPipeline';
import { DashboardCharts } from './DashboardCharts';
import { MetricCard } from '../common/MetricCard';
import { DataSourceBadge } from '../common/DataSourceBadge';
import { WebsiteModeToggle } from '../common/WebsiteModeToggle';
import { 
  Wind, 
  Compass, 
  RotateCw, 
  Zap, 
  BatteryCharging, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { telemetry, history, isLiveMode, setActivePage } = useTelemetry();

  // Extract recent sparklines for the KPI cards
  const windHistory = history.map(h => h.windSpeed);
  const rpmHistory = history.map(h => h.rpm);
  const powerHistory = history.map(h => h.power);
  const batteryHistory = history.map(h => h.batteryPct);
  const pm25History = history.map(h => h.pm25);

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM ONLINE
            </span>
            <DataSourceBadge isLive={isLiveMode} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Urban Wind Intelligence
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time O-Wind energy harvesting and environmental monitoring for dense urban buildings
          </p>
        </div>

        {/* Mode Switcher & Quick Siting Action */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <WebsiteModeToggle variant="standard" />

          <button
            onClick={() => setActivePage('optimizer')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-200 text-xs font-mono font-semibold transition shadow-glow-purple"
          >
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Open AI Site Optimizer</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-purple-300" />
          </button>
        </div>
      </div>

      {/* 2. Main Hero Area: 3D Omnidirectional Turbine + Live Energy Conversion Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 3D Interactive Turbine View */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <div className="relative">
            <Turbine3DViewer height="450px" showControls={true} />
          </div>

          {/* Energy Conversion Pipeline below turbine */}
          <EnergyFlowPipeline />
        </div>

        {/* Right Column: AI Insight Panel & Quick Environmental Card */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          {/* AI Insight Card */}
          <div className="bg-gradient-to-b from-space-900 to-space-950 rounded-xl p-5 border border-purple-500/30 shadow-glow-purple relative overflow-hidden flex-1">
            <div className="absolute top-0 right-0 w-36 h-36 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300">
                  <Sparkles className="w-4 h-4 text-ai-purple" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-200">
                  AI Edge Insights
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                Confidence: 94%
              </span>
            </div>

            <div className="space-y-3.5">
              <div className="p-3 rounded-lg bg-space-850/80 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-wind-cyan mb-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Directional Aerodynamic Peak</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  South-East airflow (137°) is currently producing the strongest rotational response on the internal Bernoulli cross-vents.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-space-850/80 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-energy-green mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Recommended Action</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Prioritize LiFePO4 battery charging. Steady breeze exceeding 3.4 m/s generates sufficient surplus over sensor baseline load.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-space-850/80 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-400 mb-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Urban Micro-Climate Siting</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Gulshan high-rise corridor creates localized +1.4x Bernoulli compression at the building roof lip.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-purple-500/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Model: Edge-CFD v3.1</span>
              <button 
                onClick={() => setActivePage('optimizer')}
                className="text-purple-300 hover:text-white font-semibold flex items-center gap-1"
              >
                <span>Run Siting Analysis</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Environmental Node Quick Snapshot */}
          <div className="bg-space-900/80 backdrop-blur-md rounded-xl p-4 border border-slate-800/80">
            <div className="flex items-center justify-between mb-3">
              <span className="stat-label">Air Particulate Node (Dhaka)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                AQI Moderate
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 rounded-lg bg-space-950/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400">PM2.5 Ambient</span>
                <div className="text-xl font-mono font-bold text-white mt-0.5">
                  {telemetry.pm25} <span className="text-xs text-slate-400">µg/m³</span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-space-950/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400">Temperature</span>
                <div className="text-xl font-mono font-bold text-white mt-0.5">
                  {telemetry.temperature} <span className="text-xs text-slate-400">°C</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main KPI Cards (Exact Metrics from Prompt) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {/* Wind Speed */}
        <MetricCard
          label="Wind Speed"
          value={telemetry.windSpeed}
          unit="m/s"
          icon={<Wind className="w-4 h-4 text-wind-cyan" />}
          accentColor="cyan"
          sparklineData={windHistory}
          trend={{ value: '0.4 m/s', isPositive: true, text: 'Gust 4.1' }}
          badgeType={isLiveMode ? 'live' : 'demo'}
        />

        {/* Wind Direction */}
        <MetricCard
          label="Wind Direction"
          value={`${telemetry.windDirection}°`}
          unit="SE"
          icon={<Compass className="w-4 h-4 text-wind-cyan" />}
          accentColor="cyan"
          subtitle="Multi-directional capture"
          badgeType={isLiveMode ? 'live' : 'demo'}
        />

        {/* Turbine RPM */}
        <MetricCard
          label="Turbine RPM"
          value={telemetry.rpm}
          unit="RPM"
          icon={<RotateCw className="w-4 h-4 text-emerald-400" />}
          accentColor="green"
          sparklineData={rpmHistory}
          trend={{ value: '18 RPM', isPositive: true, text: 'Smooth' }}
          badgeType={isLiveMode ? 'live' : 'demo'}
        />

        {/* Generated Power */}
        <MetricCard
          label="Power"
          value={telemetry.power}
          unit="W"
          icon={<Zap className="w-4 h-4 text-amber-400" />}
          accentColor="amber"
          sparklineData={powerHistory}
          trend={{ value: '+0.04W', isPositive: true, text: 'Peak 0.49' }}
          badgeType={isLiveMode ? 'live' : 'demo'}
        />

        {/* Energy Generated (Prompt rule 21: Label Reference Prototype Result) */}
        <MetricCard
          label="Energy Generated"
          value={telemetry.energyGenerated}
          unit="J"
          icon={<Zap className="w-4 h-4 text-purple-400" />}
          accentColor="purple"
          subtitle="5-Min Test Block"
          badgeType="reference"
        />

        {/* Battery */}
        <MetricCard
          label="Battery Level"
          value={telemetry.batteryPct}
          unit="%"
          icon={<BatteryCharging className="w-4 h-4 text-purple-400" />}
          accentColor="purple"
          sparklineData={batteryHistory}
          trend={{ value: '+42 mA', isPositive: true, text: 'Charging' }}
          badgeType={isLiveMode ? 'live' : 'demo'}
        />

        {/* PM2.5 */}
        <MetricCard
          label="PM2.5 Ambient"
          value={telemetry.pm25}
          unit="µg/m³"
          icon={<ShieldAlert className="w-4 h-4 text-sky-400" />}
          accentColor="cyan"
          sparklineData={pm25History}
          trend={{ value: '-2.1', isPositive: true, text: 'Dispersing' }}
          badgeType={isLiveMode ? 'live' : 'demo'}
        />
      </div>

      {/* 4. Live Charts Section: Power, Wind Speed, RPM, Battery, PM2.5 */}
      <DashboardCharts />
    </div>
  );
};
