import React from 'react';
import { BookOpen, ShieldCheck, CheckCircle2, ChevronRight, Cpu, Layers, Gauge, BatteryCharging } from 'lucide-react';
import { InView, BorderBeam, Spotlight, Disclosure } from '../motion-primitives';

export const ShowcaseAbout: React.FC = () => {
  const pipelineStages = [
    {
      step: '01',
      title: 'Bernoulli CFD Validation',
      metric: '+1.4x Wind Boost',
      icon: Layers,
      desc: 'Computational fluid dynamics verifying internal suction across 360° horizontal and vertical angles.',
      tag: 'Validated in ANSYS',
    },
    {
      step: '02',
      title: 'SolidWorks CAD Assembly',
      metric: '1:1 CAD Twin',
      icon: Cpu,
      desc: 'Precision 3D titanium rotor with integrated 12-pole PMG stator and dual ceramic low-friction bearings.',
      tag: '0.48m Outer Radius',
    },
    {
      step: '03',
      title: 'Wind Tunnel Benchmark',
      metric: '0.496 W @ 1.48 m/s',
      icon: Gauge,
      desc: 'Physical prototype testing confirming ultra-low cut-in generation in gentle urban air currents.',
      tag: 'Laboratory Tested',
    },
    {
      step: '04',
      title: 'Edge Microgrid & LoRa',
      metric: '24/7 LiFePO4 Buffer',
      icon: BatteryCharging,
      desc: 'Autonomous microgrid powering laser PM2.5 air sentinels during peak Dhaka load-shedding hours.',
      tag: '10 km Mesh Telemetry',
    },
  ];

  const quickFaqs = [
    {
      id: 'omni-faq',
      category: 'AERODYNAMICS',
      categoryBadgeClass: 'bg-cyan-50 text-cyan-800 border-cyan-200/80',
      title: 'How does O-Wind capture 360° wind without rotating to face it?',
      content: (
        <div className="space-y-2 text-xs font-sans text-stone-600">
          <p>
            Spherical Venturi ducts funnel wind from any angle into differential internal suction, driving a static central spindle without yaw motors.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 font-bold text-[10px]">360° Intake</span>
            <span className="px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 font-bold text-[10px]">Zero Yaw Motors</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-[10px]">1.48 m/s Cut-in</span>
          </div>
        </div>
      ),
    },
    {
      id: 'parapet-faq',
      category: 'AI SITING',
      categoryBadgeClass: 'bg-purple-50 text-purple-800 border-purple-200/80',
      title: 'Why mount turbines on rooftop parapet edges instead of open roofs?',
      content: (
        <div className="space-y-2 text-xs font-sans text-stone-600">
          <p>
            Building facades deflect wind upward; air speeds up by +35% to +50% at the parapet lip. Edge AI clamps turbines exactly in this accelerated flow.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 font-bold text-[10px]">+40% Updraft Lift</span>
            <span className="px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 font-bold text-[10px]">Edge-CFD Neural Model</span>
          </div>
        </div>
      ),
    },
    {
      id: 'diurnal-faq',
      category: 'MICROGRID',
      categoryBadgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      title: 'How does solar + wind guarantee continuous 24/7 off-grid power?',
      content: (
        <div className="space-y-2 text-xs font-sans text-stone-600">
          <p>
            Solar PV handles daylight, while convective updrafts peak at night (7 PM – 11 PM) during city power cuts, keeping LiFePO4 batteries full.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-bold text-[10px]">Day: Solar PV</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-[10px]">Night: Wind Updrafts</span>
            <span className="px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 font-bold text-[10px]">24/7 Sensor Telemetry</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <InView>
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs font-sans font-bold tracking-wide">
            <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
            <span>RESEARCH & ENGINEERING VERIFICATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight font-display leading-[1.16]">
            From Simulation to{' '}
            <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent inline-block pb-1">
              Physical Prototype.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed max-w-2xl mx-auto">
            A 4-stage engineering pipeline calibrated for dense urban street canyons.
          </p>
        </div>

        {/* VISUAL PIPELINE: 4 HORIZONTAL STAGE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {pipelineStages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className="bg-white/95 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl border-2 border-stone-200/90 hover:border-cyan-400/80 transition-all shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
                    <div className="p-2 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-stone-400 bg-stone-50 px-2 py-0.5 rounded-md border border-stone-200">
                      STAGE {stage.step}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-sm text-stone-900 mb-1 leading-tight">
                    {stage.title}
                  </h3>

                  <div className="text-base font-extrabold text-cyan-700 font-mono my-2">
                    {stage.metric}
                  </div>

                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-[10px] font-sans text-stone-500 font-bold uppercase tracking-wider">
                  <span className="text-cyan-800">{stage.tag}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact Quick Technical Q&A Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="text-center pb-2">
            <span className="text-xs font-sans font-bold tracking-wider text-stone-500 uppercase">
              FREQUENTLY ASKED TECHNICAL QUESTIONS
            </span>
          </div>

          <div className="space-y-2.5">
            <Disclosure items={quickFaqs} />
          </div>

          {/* Minimal Academic Attribution */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-[11px] font-sans text-stone-600 flex items-center justify-between gap-3 mt-6">
            <div className="flex items-center gap-2 text-stone-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0" />
              <span>Academic Engineering Scope</span>
            </div>
            <span className="text-stone-500">
              O-Wind omnidirectional aerodynamics adapted for urban edge microgrid telemetry in Bangladesh.
            </span>
          </div>
        </div>
      </InView>
    </section>
  );
};
