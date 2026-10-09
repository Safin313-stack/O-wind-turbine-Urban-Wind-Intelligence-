import React from 'react';
import { 
  Wind, 
  Zap, 
  Cpu, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { InView, Spotlight, BorderBeam, Tilt } from '../motion-primitives';

interface SubMetric {
  label: string;
  value: string;
}

interface SpecCardItem {
  id: string;
  badge: string;
  title: string;
  heroStat: string;
  heroLabel: string;
  icon: React.ElementType;
  accent: 'cyan' | 'emerald' | 'purple' | 'sky';
  sub1: SubMetric;
  sub2: SubMetric;
  cadRef: string;
}

export const ShowcaseSpecifications: React.FC = () => {
  const cards: SpecCardItem[] = [
    {
      id: 'aerodynamics',
      badge: 'AERODYNAMICS',
      title: '360° Venturi Rotor',
      heroStat: '360°',
      heroLabel: 'All-Direction Wind Intake',
      icon: Wind,
      accent: 'cyan',
      sub1: { label: 'Cut-in Breeze', value: '1.48 m/s' },
      sub2: { label: 'Directional Yaw', value: 'Zero Motors' },
      cadRef: 'CAD Twin v1.4',
    },
    {
      id: 'power',
      badge: 'MICROGRID',
      title: 'Clean Energy & Storage',
      heroStat: '82%',
      heroLabel: 'Powertrain Efficiency',
      icon: Zap,
      accent: 'emerald',
      sub1: { label: 'Battery Buffer', value: 'LiFePO4 24/7' },
      sub2: { label: 'Conditioning', value: '3.7V MPPT' },
      cadRef: 'Synchronous Bus',
    },
    {
      id: 'intelligence',
      badge: 'EDGE AI',
      title: 'Air Quality Sentinel',
      heroStat: 'PM2.5',
      heroLabel: 'Laser Optical Sensor',
      icon: Cpu,
      accent: 'purple',
      sub1: { label: 'Edge Siting AI', value: 'ESP32 Neural' },
      sub2: { label: 'Telemetry Mesh', value: '10 km LoRa' },
      cadRef: 'Edge-CFD v3.1',
    },
    {
      id: 'safety',
      badge: 'ROOFTOP SAFETY',
      title: 'Silent Parapet Mount',
      heroStat: '< 24 dB',
      heroLabel: 'Virtually Inaudible',
      icon: ShieldCheck,
      accent: 'sky',
      sub1: { label: 'Enclosed Rotor', value: '100% Bird-Safe' },
      sub2: { label: 'Rooftop Clamp', value: 'IP65 Weatherproof' },
      cadRef: 'Parapet Mount',
    },
  ];

  const getCardTheme = (accent: SpecCardItem['accent']) => {
    switch (accent) {
      case 'cyan':
        return {
          border: 'border-cyan-200/90 hover:border-cyan-400',
          badgeBg: 'bg-cyan-50 text-cyan-800 border-cyan-200',
          iconBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
          statColor: 'text-cyan-700',
          beamFrom: '#0284c7',
          beamTo: '#06b6d4',
          spotlight: 'rgba(6, 182, 212, 0.12)',
        };
      case 'emerald':
        return {
          border: 'border-emerald-200/90 hover:border-emerald-400',
          badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          statColor: 'text-emerald-700',
          beamFrom: '#059669',
          beamTo: '#10b981',
          spotlight: 'rgba(16, 185, 129, 0.12)',
        };
      case 'purple':
        return {
          border: 'border-purple-200/90 hover:border-purple-400',
          badgeBg: 'bg-purple-50 text-purple-800 border-purple-200',
          iconBg: 'bg-purple-50 text-purple-700 border-purple-200',
          statColor: 'text-purple-700',
          beamFrom: '#7c3aed',
          beamTo: '#a855f7',
          spotlight: 'rgba(168, 85, 247, 0.12)',
        };
      case 'sky':
        return {
          border: 'border-sky-200/90 hover:border-sky-400',
          badgeBg: 'bg-sky-50 text-sky-800 border-sky-200',
          iconBg: 'bg-sky-50 text-sky-700 border-sky-200',
          statColor: 'text-sky-700',
          beamFrom: '#0284c7',
          beamTo: '#38bdf8',
          spotlight: 'rgba(2, 132, 199, 0.12)',
        };
    }
  };

  return (
    <section id="specs" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <InView>
        {/* Section Header: Clean, Simple & Legible */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50/90 border border-cyan-200 text-cyan-900 text-xs font-sans font-bold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>ENGINEERING ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight font-display leading-[1.08]">
            Technical Blueprint,{' '}
            <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent inline-block">
              Validated.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Four physical engineering benchmarks calibrated for high-density megacity deployment.
          </p>
        </div>

        {/* ============================================================ */}
        {/* SIDE BY SIDE CARDS: 4 IN A ROW ON DESKTOP, 2X2 ON TABLET     */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, index) => {
            const theme = getCardTheme(card.accent);
            const Icon = card.icon;

            return (
              <Tilt key={card.id} rotationFactor={5} className="h-full">
                <div
                  className={`bg-white/95 backdrop-blur-2xl p-6 rounded-3xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between h-full shadow-sm group ${theme.border}`}
                  style={{ minHeight: '320px' }}
                >
                  <BorderBeam size={160} duration={12} colorFrom={theme.beamFrom} colorTo={theme.beamTo} />
                  <Spotlight fill={theme.spotlight} size={180} />

                  <div>
                    {/* Top Row: Icon, Badge, and Index Number */}
                    <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-stone-100">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl border ${theme.iconBg} group-hover:scale-105 transition-transform`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className={`text-[10px] font-sans font-bold tracking-wide px-2 py-0.5 rounded-full border ${theme.badgeBg}`}>
                            {card.badge}
                          </span>
                          <h3 className="font-sans font-bold text-sm text-stone-900 mt-1 leading-tight">
                            {card.title}
                          </h3>
                        </div>
                      </div>

                      <span className="text-xs font-sans font-bold text-stone-400 bg-stone-50 px-2 py-0.5 rounded-md border border-stone-200">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Big Bold Hero Stat (High Contrast & Clear Readability) */}
                    <div className="my-3 py-1">
                      <div className={`text-4xl sm:text-5xl font-black font-sans tracking-tight ${theme.statColor}`}>
                        {card.heroStat}
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-stone-600 mt-1">
                        {card.heroLabel}
                      </p>
                    </div>

                    {/* 2 Clean Sub-Metric Pills */}
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-stone-100 text-xs">
                      <div className="p-2.5 rounded-2xl bg-stone-50 border border-stone-200/80">
                        <span className="text-[10px] text-stone-500 block font-sans font-semibold uppercase tracking-wider leading-none mb-1">
                          {card.sub1.label}
                        </span>
                        <span className="text-xs font-bold text-stone-900 block truncate">
                          {card.sub1.value}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-2xl bg-stone-50 border border-stone-200/80">
                        <span className="text-[10px] text-stone-500 block font-sans font-semibold uppercase tracking-wider leading-none mb-1">
                          {card.sub2.label}
                        </span>
                        <span className="text-xs font-bold text-stone-900 block truncate">
                          {card.sub2.value}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Tag */}
                  <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-sans text-stone-500">
                    <span className="text-stone-400 font-medium">BENCHMARK</span>
                    <span className="font-bold text-stone-700">{card.cadRef}</span>
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
