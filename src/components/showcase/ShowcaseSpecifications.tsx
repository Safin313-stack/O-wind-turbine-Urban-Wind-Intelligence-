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
    },
  ];

  const getCardTheme = (accent: SpecCardItem['accent']) => {
    switch (accent) {
      case 'cyan':
        return {
          border: 'border-[#2E343D] hover:border-[#FF8A24]/60',
          badgeBg: 'bg-[#FF8A24]/10 text-[#FF8A24] border-[#FF8A24]/30',
          iconBg: 'bg-[#1C2026] text-[#FF8A24] border-[#2E343D]',
          statColor: 'text-[#FF8A24]',
          beamFrom: '#FF8A24',
          beamTo: '#FFA959',
          spotlight: 'rgba(255, 138, 36, 0.08)',
        };
      case 'emerald':
        return {
          border: 'border-[#2E343D] hover:border-emerald-500/60',
          badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          iconBg: 'bg-[#1C2026] text-emerald-400 border-[#2E343D]',
          statColor: 'text-emerald-400',
          beamFrom: '#059669',
          beamTo: '#10b981',
          spotlight: 'rgba(16, 185, 129, 0.08)',
        };
      case 'purple':
        return {
          border: 'border-[#2E343D] hover:border-purple-500/60',
          badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
          iconBg: 'bg-[#1C2026] text-purple-400 border-[#2E343D]',
          statColor: 'text-purple-400',
          beamFrom: '#7c3aed',
          beamTo: '#a855f7',
          spotlight: 'rgba(168, 85, 247, 0.08)',
        };
      case 'sky':
        return {
          border: 'border-[#2E343D] hover:border-cyan-500/60',
          badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
          iconBg: 'bg-[#1C2026] text-cyan-400 border-[#2E343D]',
          statColor: 'text-cyan-400',
          beamFrom: '#0284c7',
          beamTo: '#38bdf8',
          spotlight: 'rgba(6, 182, 212, 0.08)',
        };
    }
  };

  return (
    <section id="specs" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <InView>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22262C] border border-[#2E343D] text-[#FF8A24] text-[11px] font-mono font-bold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8A24]" />
            <span>ENGINEERING ARCHITECTURE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#F5F5F2] tracking-tight font-display leading-[1.15]">
            Technical Blueprint,{' '}
            <span className="text-gradient-orange inline-block pb-1">
              Validated.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#A7ADB5] font-sans leading-relaxed">
            Four physical engineering benchmarks calibrated for high-density megacity deployment.
          </p>
        </div>

        {/* SIDE BY SIDE CARDS: 4 IN A ROW ON DESKTOP, 2X2 ON TABLET */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, index) => {
            const theme = getCardTheme(card.accent);
            const Icon = card.icon;

            return (
              <Tilt key={card.id} rotationFactor={4} className="h-full">
                <div
                  className={`bg-[#22262C]/95 backdrop-blur-2xl p-5 rounded-2xl sm:rounded-3xl border transition-all duration-300 hover:shadow-2xl relative overflow-hidden flex flex-col justify-between h-full shadow-lg group ${theme.border}`}
                  style={{ minHeight: '300px' }}
                >
                  <BorderBeam size={160} duration={12} colorFrom={theme.beamFrom} colorTo={theme.beamTo} />
                  <Spotlight fill={theme.spotlight} size={180} />

                  <div>
                    {/* Top Row: Icon, Badge, and Index Number */}
                    <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-[#2E343D]">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl border ${theme.iconBg} group-hover:scale-105 transition-transform`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className={`text-[10px] font-mono font-bold tracking-wide px-2 py-0.5 rounded-full border ${theme.badgeBg}`}>
                            {card.badge}
                          </span>
                          <h3 className="font-sans font-bold text-xs sm:text-sm text-[#F5F5F2] mt-1 leading-tight">
                            {card.title}
                          </h3>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold text-[#A7ADB5] bg-[#1C2026] px-2 py-0.5 rounded-md border border-[#2E343D]">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Big Bold Hero Stat */}
                    <div className="my-2.5 py-1">
                      <div className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${theme.statColor}`}>
                        {card.heroStat}
                      </div>
                      <p className="text-xs font-semibold text-[#A7ADB5] mt-0.5">
                        {card.heroLabel}
                      </p>
                    </div>

                    {/* 2 Clean Sub-Metric Pills */}
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#2E343D] text-xs">
                      <div className="p-2 rounded-xl bg-[#1C2026] border border-[#2E343D]">
                        <span className="text-[10px] text-[#A7ADB5] block font-mono font-semibold uppercase tracking-wider leading-none mb-1">
                          {card.sub1.label}
                        </span>
                        <span className="text-xs font-bold text-[#F5F5F2] block truncate font-mono">
                          {card.sub1.value}
                        </span>
                      </div>

                      <div className="p-2 rounded-xl bg-[#1C2026] border border-[#2E343D]">
                        <span className="text-[10px] text-[#A7ADB5] block font-mono font-semibold uppercase tracking-wider leading-none mb-1">
                          {card.sub2.label}
                        </span>
                        <span className="text-xs font-bold text-[#F5F5F2] block truncate font-mono">
                          {card.sub2.value}
                        </span>
                      </div>
                    </div>
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
