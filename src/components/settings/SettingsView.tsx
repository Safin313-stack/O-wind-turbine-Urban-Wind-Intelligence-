import React, { useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import {
  Settings,
  Sliders,
  Cpu,
  Wifi,
  Database,
  RotateCcw,
  CheckCircle2,
  Shield,
  Info
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    isLiveMode,
    setIsLiveMode,
    simSpeed,
    setSimSpeed,
    resetTelemetry,
  } = useTelemetry();

  const [esp32Host, setEsp32Host] = useState('ws://192.168.4.1:81/telemetry');
  const [baudRate, setBaudRate] = useState('115200');
  const [calibOffset, setCalibOffset] = useState('0.0');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* 1. Header */}
      <div className="pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono font-semibold">
            CONFIGURATION
          </span>
          <span className="text-xs font-mono text-slate-400">System Parameters & Hardware Telemetry Link</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          System & Telemetry Settings
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Configure physical prototype telemetry link, simulation rates, edge AI models, and academic calibration
        </p>
      </div>

      {/* 2. Simulation & Mode Settings */}
      <div className="bg-space-900/80 rounded-xl p-5 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Sliders className="w-4 h-4 text-wind-cyan" />
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            Telemetry Simulation Engine
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <label className="text-slate-300 block mb-1.5">Operating Mode</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLiveMode(false)}
                className={`px-3 py-1.5 rounded-lg border transition ${
                  !isLiveMode
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                    : 'bg-space-950 text-slate-400 border-slate-800'
                }`}
              >
                Simulation / Demo Data
              </button>
              <button
                onClick={() => setIsLiveMode(true)}
                className={`px-3 py-1.5 rounded-lg border transition ${
                  isLiveMode
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-space-950 text-slate-400 border-slate-800'
                }`}
              >
                Live Hardware Stream
              </button>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Toggle between stochastic physical model and real ESP32 serial link
            </span>
          </div>

          <div>
            <label className="text-slate-300 block mb-1.5">Simulation Speed Multiplier</label>
            <div className="flex items-center gap-2">
              {[1, 2, 5].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setSimSpeed(spd)}
                  className={`px-3 py-1.5 rounded-lg border transition ${
                    simSpeed === spd
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                      : 'bg-space-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {spd}x Speed
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Physical Hardware & Serial WebSocket Interface */}
      <div className="bg-space-900/80 rounded-xl p-5 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Wifi className="w-4 h-4 text-emerald-400" />
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            Physical Prototype Hardware Interface (ESP32 / LoRaWAN)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <label className="text-slate-300 block mb-1">WebSocket Gateway URL</label>
            <input
              type="text"
              value={esp32Host}
              onChange={(e) => setEsp32Host(e.target.value)}
              className="w-full bg-space-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-slate-300 block mb-1">Serial Port Baud Rate</label>
            <select
              value={baudRate}
              onChange={(e) => setBaudRate(e.target.value)}
              className="w-full bg-space-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value="9600">9600 bps</option>
              <option value="115200">115200 bps (Default ESP32)</option>
              <option value="921600">921600 bps (High-Speed Oscilloscope)</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition flex items-center gap-2"
          >
            {savedSuccess ? <CheckCircle2 className="w-4 h-4 text-white" /> : null}
            <span>{savedSuccess ? 'Configuration Saved!' : 'Save Connection Profile'}</span>
          </button>

          <button
            onClick={resetTelemetry}
            className="px-3 py-2 rounded-lg bg-space-950 hover:bg-space-850 text-slate-300 text-xs font-mono transition flex items-center gap-1.5 border border-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Factory Values</span>
          </button>
        </div>
      </div>

      {/* 4. Project Identity & Build Metadata */}
      <div className="p-4 rounded-xl bg-space-950 border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
        <div className="flex items-center justify-between text-white font-bold">
          <span>O-WIND AI Smart Urban Wind & Environmental Intelligence</span>
          <span>v2.4.0-PROD</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Target Environment: Dhaka High-Rise Urban Micro-grid Corridors, Bangladesh
        </p>
        <p className="text-[10px] text-slate-500 pt-1">
          Developed for University Sustainable Technology Competition 2026.
        </p>
      </div>
    </div>
  );
};
