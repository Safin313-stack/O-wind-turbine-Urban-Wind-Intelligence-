import React from 'react';
import { Layers, ShieldCheck, Cpu, Zap, Wind, Radio, Database } from 'lucide-react';

export const ShowcaseSpecifications: React.FC = () => {
  const specs = [
    {
      category: 'Physical & Aerodynamics',
      icon: Wind,
      items: [
        { label: 'Rotor Geometry', value: 'Omnidirectional Geodesic Sphere' },
        { label: 'CAD File Source', value: 'omni-directional-wind-turbine-1 (SolidWorks)' },
        { label: 'CAD Mesh Polygon Count', value: '17,503 Polygons (High-Fidelity STL)' },
        { label: 'Rotor Diameter', value: '0.25 m (Prototype Scale) / 0.80 m (Commercial)' },
        { label: 'Aerodynamic Working Principle', value: 'Internal Bernoulli Venturi Pressure Differential' },
        { label: 'Operational Wind Angles', value: '360° Horizontal Azimuth & -45° to +90° Vertical Elevation' },
        { label: 'Cut-in Wind Speed', value: '1.48 m/s' },
        { label: 'Rated Wind Speed', value: '8.50 m/s' },
      ],
    },
    {
      category: 'Electrical & Power Train',
      icon: Zap,
      items: [
        { label: 'Generator Type', value: 'Coreless 3-Phase Low-Cogging Permanent Magnet Brushless' },
        { label: 'Power Conditioning', value: 'Active Synchronous Rectification & Micro-MPPT Tracker' },
        { label: 'Nominal Bus Voltage', value: '3.70 V DC' },
        { label: 'Peak Power Output (Ref. Test)', value: '0.496 W @ 3.42 m/s (Physical Reference Result)' },
        { label: 'Tested Energy Buffer', value: '148.8 Joules (5-minute laboratory run)' },
        { label: 'System Energy Efficiency', value: '81.8% Electrical Conversion & Conditioning' },
        { label: 'Battery Storage Chemistry', value: 'Lithium Iron Phosphate (LiFePO4) 3.2V / 2500 mAh' },
        { label: 'Battery Cycle Life', value: '> 3,500 Full Charge/Discharge Cycles' },
      ],
    },
    {
      category: 'IoT Sensing & Edge AI',
      icon: Cpu,
      items: [
        { label: 'Edge Microcontroller', value: 'Espressif ESP32-S3 Dual-Core 240MHz + ULP Coprocessor' },
        { label: 'Particulate Matter Sensor', value: 'Plantower PMS5003 Laser Optical Particle Counter (PM2.5/PM10)' },
        { label: 'Gas & Air Quality Sensor', value: 'Bosch Sensortec BME680 (CO2 equivalent, VOC, Barometer, Temp)' },
        { label: 'Telemetry Telecommunication', value: 'Long-Range LoRaWAN (868/915 MHz) + Bluetooth LE 5.0' },
        { label: 'Edge CFD Siting Model', value: 'Edge-CFD v3.1 Lightweight Neural Parapet Boundary Model' },
        { label: 'Telemetry Update Interval', value: 'Dynamic 1.2s – 10s Adaptive Sleep Interval' },
        { label: 'Housing Material', value: 'Carbon-Fiber Reinforced Recycled Polycarbonate (UV-Stabilized)' },
        { label: 'Acoustic Noise Emission', value: '< 24 dB (Virtually Inaudible at 1m Distance)' },
      ],
    },
  ];

  return (
    <section id="specs" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-medium">
          <Database className="w-3.5 h-3.5 text-cyan-400" />
          <span>ENGINEERING DATA SHEET</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
          Technical Specifications
        </h2>
        <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed">
          Comprehensive physical, electrical, and IoT parameters validated for high-density urban deployment.
        </p>
      </div>

      {/* 3 Detailed Spec Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {specs.map((group) => {
          const Icon = group.icon;
          return (
            <div
              key={group.category}
              className="glass-card p-6 sm:p-7 rounded-3xl border border-white/[0.08] relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/[0.08]">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-white tracking-wide font-sans">
                    {group.category}
                  </h3>
                </div>

                <div className="space-y-3">
                  {group.items.map((item) => (
                    <div key={item.label} className="text-xs font-mono">
                      <span className="text-slate-400 block text-[11px]">{item.label}</span>
                      <span className="text-slate-100 font-semibold mt-0.5 block">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] text-[10px] font-mono text-slate-500 flex items-center justify-between">
                <span>VERIFIED METRIC</span>
                <span className="text-cyan-400">CAD v1.4</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
