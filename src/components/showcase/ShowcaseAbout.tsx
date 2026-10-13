import React from 'react';
import { BookOpen, ShieldCheck, CheckCircle2, Cpu, Layers, Gauge, BatteryCharging } from 'lucide-react';
import { InView, Disclosure } from '../motion-primitives';
import { getAssetUrl } from '../../utils/assets';

export const ShowcaseAbout: React.FC = () => {
  const pipelineStages = [
    {
      step: '01',
      title: 'Trace-Hybrid Architecture',
      metric: 'Wind + Solar + TPV Core',
      icon: Layers,
      image: getAssetUrl('images/trace_hybrid_architecture.png'),
      desc: 'Integrated system combining O-Wind generator coils, dual bifacial PV panels, TPV thermal core, and C-SPR concentrators.',
      tag: 'Integrated Schematic',
    },
    {
      step: '02',
      title: '1:1 Venturi CAD Blueprint',
      metric: '1:1 Mechanical Twin',
      icon: Cpu,
      image: getAssetUrl('images/rotor_generator_blueprint.png'),
      desc: 'Precision spherical Venturi shell with multi-directional rotor blades, 12-pole PMG stator, and dual ceramic bearings.',
      tag: '0.48m Outer Radius',
    },
    {
      step: '03',
      title: 'Urban Parapet Cutaway',
      metric: '+40% Facade Updraft',
      icon: Gauge,
      image: getAssetUrl('images/rooftop_engineering_schematic.png'),
      desc: 'Reinforced concrete parapet flange mounting, vibration damping base, and IoT telemetry trunk conduit.',
      tag: 'Dhaka Rooftop Cutaway',
    },
    {
      step: '04',
      title: 'Field Deployment Validation',
      metric: '24/7 LiFePO4 Buffer',
      icon: BatteryCharging,
      image: getAssetUrl('images/turbine_rooftop_installation.jpg'),
      desc: 'Photographic field validation across coastal marine floating moorings and high-rise Dhaka rooftop installations.',
      tag: 'Marine & Urban Tested',
    },
  ];

  const quickFaqs = [
    {
      id: 'omni-faq',
      category: 'AERODYNAMICS',
      categoryBadgeClass: 'bg-[#FF8A24]/10 text-[#FF8A24] border-[#FF8A24]/30',
      title: 'How does O-Wind capture 360° wind without rotating to face it?',
      content: (
        <div className="space-y-2 text-xs font-sans text-[#A7ADB5]">
          <p>
            Spherical Venturi ducts funnel wind from any angle into differential internal suction, driving a static central spindle without yaw motors.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2 py-0.5 rounded-full bg-[#FF8A24]/10 border border-[#FF8A24]/30 text-[#FF8A24] font-bold text-[10px]">360° Intake</span>
            <span className="px-2 py-0.5 rounded-full bg-[#1C2026] border border-[#2E343D] text-[#A7ADB5] font-bold text-[10px]">Zero Yaw Motors</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[10px]">1.48 m/s Cut-in</span>
          </div>
        </div>
      ),
    },
    {
      id: 'parapet-faq',
      category: 'AI SITING',
      categoryBadgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      title: 'Why mount turbines on rooftop parapet edges instead of open roofs?',
      content: (
        <div className="space-y-2 text-xs font-sans text-[#A7ADB5]">
          <p>
            Building facades deflect wind upward; air speeds up by +35% to +50% at the parapet lip. Edge AI clamps turbines exactly in this accelerated flow.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-[10px]">+40% Updraft Lift</span>
            <span className="px-2 py-0.5 rounded-full bg-[#1C2026] border border-[#2E343D] text-[#A7ADB5] font-bold text-[10px]">Edge-CFD Neural Model</span>
          </div>
        </div>
      ),
    },
    {
      id: 'diurnal-faq',
      category: 'MICROGRID',
      categoryBadgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      title: 'How does solar + wind guarantee continuous 24/7 off-grid power?',
      content: (
        <div className="space-y-2 text-xs font-sans text-[#A7ADB5]">
          <p>
            Solar PV handles daylight, while convective updrafts peak at night (7 PM – 11 PM) during city power cuts, keeping LiFePO4 batteries full.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2 py-0.5 rounded-full bg-[#FF8A24]/10 border border-[#FF8A24]/30 text-[#FF8A24] font-bold text-[10px]">Day: Solar PV</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[10px]">Night: Wind Updrafts</span>
            <span className="px-2 py-0.5 rounded-full bg-[#1C2026] border border-[#2E343D] text-[#A7ADB5] font-bold text-[10px]">24/7 Sensor Telemetry</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <InView>
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22262C] border border-[#2E343D] text-[#FF8A24] text-[11px] font-mono font-bold tracking-wide">
            <BookOpen className="w-3.5 h-3.5 text-[#FF8A24]" />
            <span>RESEARCH & ENGINEERING VERIFICATION</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#F5F5F2] tracking-tight font-display leading-[1.16]">
            From Simulation to{' '}
            <span className="text-gradient-orange inline-block pb-1">
              Physical Prototype.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#A7ADB5] font-sans leading-relaxed max-w-2xl mx-auto">
            A 4-stage engineering pipeline calibrated for dense urban street canyons.
          </p>
        </div>

        {/* VISUAL PIPELINE: 4 HORIZONTAL STAGE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {pipelineStages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className="bg-[#22262C]/95 backdrop-blur-2xl p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#2E343D] hover:border-[#FF8A24]/60 transition-all shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2E343D]">
                    <div className="p-2 rounded-xl bg-[#1C2026] border border-[#2E343D] text-[#FF8A24] group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#A7ADB5] bg-[#1C2026] px-2 py-0.5 rounded-md border border-[#2E343D]">
                      STAGE {stage.step}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-xs sm:text-sm text-[#F5F5F2] mb-1 leading-tight">
                    {stage.title}
                  </h3>

                  {/* Visual Stage Snapshot */}
                  <div className="relative rounded-xl overflow-hidden h-28 my-2 border border-[#2E343D] bg-[#14161A] shadow-inner group-hover:border-[#FF8A24]/40 transition-colors">
                    <img 
                      src={stage.image} 
                      alt={stage.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-1.5 left-2 text-[10px] font-mono font-bold text-white/95">
                      {stage.tag}
                    </span>
                  </div>

                  <div className="text-sm sm:text-base font-extrabold text-[#FF8A24] font-mono my-1">
                    {stage.metric}
                  </div>

                  <p className="text-xs text-[#A7ADB5] font-sans leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#2E343D] flex items-center justify-between text-[10px] font-mono text-[#A7ADB5] font-bold uppercase tracking-wider">
                  <span className="text-[#FF8A24]">Verified</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact Quick Technical Q&A Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="text-center pb-1">
            <span className="text-xs font-mono font-bold tracking-wider text-[#A7ADB5] uppercase">
              FREQUENTLY ASKED TECHNICAL QUESTIONS
            </span>
          </div>

          <div className="space-y-2.5">
            <Disclosure items={quickFaqs} />
          </div>

          {/* Minimal Academic Attribution */}
          <div className="p-3.5 rounded-2xl bg-[#1C2026] border border-[#2E343D] text-[11px] font-sans text-[#A7ADB5] flex items-center justify-between gap-3 mt-6">
            <div className="flex items-center gap-2 text-[#F5F5F2] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#FF8A24] shrink-0" />
              <span>Academic Engineering Scope</span>
            </div>
            <span className="text-[#A7ADB5]">
              O-Wind omnidirectional aerodynamics adapted for urban edge microgrid telemetry in Bangladesh.
            </span>
          </div>
        </div>
      </InView>
    </section>
  );
};
