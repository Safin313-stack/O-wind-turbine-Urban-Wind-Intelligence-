import React, { useState } from 'react';
import { Cpu, Zap, Wind, Database } from 'lucide-react';
import { InView, AnimatedTabs, Tilt, Spotlight, BorderBeam } from '../motion-primitives';

export const ShowcaseSpecifications: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const tabs = [
    { id: 'all', label: 'All Specifications' },
    { id: 'physical', label: 'Aerodynamics & CAD', icon: Wind },
    { id: 'electrical', label: 'Microgrid Powertrain', icon: Zap },
    { id: 'iot', label: 'Edge AI & Sensors', icon: Cpu },
  ];

  const specs = [
    {
      id: 'physical',
      category: 'Physical & Aerodynamics',
      icon: Wind,
      badgeColor: 'bg-cyan-50 border-cyan-200 text-cyan-700',
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
      id: 'electrical',
      category: 'Electrical & Power Train',
      icon: Zap,
      badgeColor: 'bg-emerald-50 border-emerald-200 text-emerald-700',
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
      id: 'iot',
      category: 'IoT Sensing & Edge AI',
      icon: Cpu,
      badgeColor: 'bg-purple-50 border-purple-200 text-purple-700',
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

  const filteredSpecs = activeCategory === 'all' ? specs : specs.filter((s) => s.id === activeCategory);

  return (
    <section id="specs" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <InView>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono font-medium">
            <Database className="w-3.5 h-3.5 text-cyan-600" />
            <span>ENGINEERING DATA SHEET</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight font-sans">
            Technical Specifications
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Comprehensive physical, electrical, and IoT parameters validated for high-density urban deployment.
          </p>

          {/* Motion Primitives Animated Tabs */}
          <div className="pt-4 flex justify-center">
            <AnimatedTabs
              tabs={tabs}
              activeTab={activeCategory}
              onChange={setActiveCategory}
              layoutId="specs-tab-pill"
            />
          </div>
        </div>

        {/* Filtered Spec Cards with Tilt & Spotlight */}
        <div className={`grid grid-cols-1 ${filteredSpecs.length > 1 ? 'lg:grid-cols-3' : 'max-w-2xl mx-auto'} gap-6`}>
          {filteredSpecs.map((group) => {
            const Icon = group.icon;
            return (
              <Tilt key={group.category} rotationFactor={5} className="h-full">
                <div className="glass-card p-6 sm:p-8 rounded-3xl border border-stone-200/90 relative overflow-hidden flex flex-col justify-between group h-full shadow-sm">
                  <Spotlight fill="rgba(2, 132, 199, 0.10)" size={220} />

                  <div>
                    <div className="flex items-center gap-3 pb-4 mb-5 border-b border-stone-200/80">
                      <div className={`p-2.5 rounded-2xl border ${group.badgeColor} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-extrabold text-base text-stone-900 tracking-wide font-sans">
                        {group.category}
                      </h3>
                    </div>

                    <div className="space-y-3.5">
                      {group.items.map((item) => (
                        <div key={item.label} className="text-xs font-mono">
                          <span className="text-stone-500 block text-[11px]">{item.label}</span>
                          <span className="text-stone-900 font-semibold mt-0.5 block">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-200/80 text-[10px] font-mono text-stone-500 flex items-center justify-between">
                    <span>VERIFIED BENCHMARK</span>
                    <span className="text-cyan-700 font-bold">CAD v1.4</span>
                  </div>
                </div>
              </Tilt>
            );
          })}
        </div>
      </InView>
    </section>
  );
};
