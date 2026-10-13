import React, { useState } from 'react';
import { 
  ArrowRight, 
  Compass, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Box, 
  Globe2, 
  CheckCircle2, 
  Sparkles,
  Leaf
} from 'lucide-react';
import { InView, Magnetic, Tilt, Spotlight, BorderBeam } from '../motion-primitives';
import { getAssetUrl } from '../../utils/assets';

interface SdgItem {
  id: number;
  number: string;
  name: string;
  category: string;
  image: string;
  color: string;
  bgColor: string;
  borderColor: string;
  headline: string;
  contribution: string;
  metric: string;
}

const SDG_GOALS: SdgItem[] = [
  {
    id: 7,
    number: '07',
    name: 'Affordable & Clean Energy',
    category: 'PRIMARY DRIVER',
    image: getAssetUrl('images/sdg/sdg_7.png'),
    color: '#FCC30B',
    bgColor: 'bg-[#FCC30B]/10',
    borderColor: 'border-[#FCC30B]/50',
    headline: 'Decentralized Urban Power',
    contribution: 'Extracts kinetic power from low-velocity (1.48 m/s) urban turbulence to deliver continuous 24/7 off-grid electricity.',
    metric: '1.48 m/s Cut-in · 24/7 Energy',
  },
  {
    id: 11,
    number: '11',
    name: 'Sustainable Cities & Communities',
    category: 'URBAN RESILIENCE',
    image: getAssetUrl('images/sdg/sdg_11.png'),
    color: '#FD9D24',
    bgColor: 'bg-[#FD9D24]/10',
    borderColor: 'border-[#FD9D24]/50',
    headline: 'High-Rise Rooftop Integration',
    contribution: 'Utilizes building parapet updrafts to power smart sensors and microgrids without altering city aesthetics.',
    metric: '+40% Facade Updraft Lift',
  },
  {
    id: 13,
    number: '13',
    name: 'Climate Action',
    category: 'EMISSIONS REDUCTION',
    image: getAssetUrl('images/sdg/sdg_13.png'),
    color: '#3F7E44',
    bgColor: 'bg-[#3F7E44]/10',
    borderColor: 'border-[#3F7E44]/50',
    headline: 'Zero-Carbon Distributed Generation',
    contribution: 'Displaces grid fossil fuels at the point of consumption, reducing peak urban demand and carbon footprint.',
    metric: 'Zero Fuel · 100% Clean',
  },
  {
    id: 9,
    number: '09',
    name: 'Industry, Innovation & Infrastructure',
    category: 'AERODYNAMIC INNOVATION',
    image: getAssetUrl('images/sdg/sdg_9.png'),
    color: '#F36D25',
    bgColor: 'bg-[#F36D25]/10',
    borderColor: 'border-[#F36D25]/50',
    headline: 'Patented Dual-Axis Venturi',
    contribution: 'Pioneers omnidirectional flow capture funneling multi-directional winds into a static direct-drive PMG.',
    metric: '360° Capture · Zero Yaw Motors',
  },
  {
    id: 12,
    number: '12',
    name: 'Responsible Consumption & Production',
    category: 'CIRCULAR DESIGN',
    image: getAssetUrl('images/sdg/sdg_12.png'),
    color: '#CF8D2A',
    bgColor: 'bg-[#CF8D2A]/10',
    borderColor: 'border-[#CF8D2A]/50',
    headline: 'Sustainable & Durable Materials',
    contribution: 'Crafted with recyclable PETG spherical shells, Si3N4 ceramic bearings, and high-lifespan LiFePO4 cells.',
    metric: 'Long Life · Recyclable PETG',
  },
  {
    id: 3,
    number: '03',
    name: 'Good Health & Well-Being',
    category: 'HEALTH & ENVIRONMENT',
    image: getAssetUrl('images/sdg/sdg_3.png'),
    color: '#4C9F38',
    bgColor: 'bg-[#4C9F38]/10',
    borderColor: 'border-[#4C9F38]/50',
    headline: 'Whisper Silent & Clean Air',
    contribution: 'Operates below 28 dBA while powering real-time PM2.5/CO2 optical sensors to combat urban respiratory hazards.',
    metric: '< 28 dBA Silent · PM2.5 Monitored',
  },
];

export const ShowcaseHero: React.FC = () => {
  const [activeSdg, setActiveSdg] = useState<SdgItem>(SDG_GOALS[0]);

  return (
    <section id="overview" className="relative pt-12 sm:pt-20 pb-8 sm:pb-14 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Subtle Engineering Illumination */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[250px] sm:h-[350px] bg-[#FF8A24]/[0.05] blur-[90px] rounded-full pointer-events-none -z-10" />

      <InView>
        {/* Main Two-Column First Screen Layout: Left Headline & CTAs, Right Interactive 6 SDGs Hover Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: Main Innovation Headline, Purpose, & Action CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            {/* Sleek Engineering Pill Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#22262C] border border-[#2E343D] text-[#A7ADB5] text-[10px] sm:text-xs font-mono font-semibold shadow-xs">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF8A24] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF8A24]" />
              </span>
              <span className="text-[#F5F5F2] font-bold">O-WIND INNOVATION</span>
              <span className="text-[#3D4551]">·</span>
              <span className="text-[#FF8A24] font-bold">360° Urban Aerodynamics</span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-[#F5F5F2] tracking-tight leading-[1.14] font-display">
              Omnidirectional Wind Turbine
              <span className="block mt-1 sm:mt-1.5 text-gradient-orange pb-1">
                Intelligent Clean Energy
              </span>
            </h1>

            {/* Short Purpose Explanation */}
            <p className="text-xs sm:text-base text-[#A7ADB5] font-sans leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Capturing 360° chaotic city wind and vertical building updrafts on a single axis to power autonomous edge microgrids and environmental sensors.
            </p>

            {/* Prominent Action CTAs: Touch-Friendly 44px Min Height */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1 max-w-xs sm:max-w-none mx-auto lg:mx-0 w-full">
              <Magnetic intensity={0.25} className="w-full sm:w-auto">
                <a
                  href="#technology"
                  className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-[#FF8A24] hover:bg-[#FFA14E] text-white font-sans text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg shadow-[#FF8A24]/20 hover:shadow-xl active:scale-[0.98] w-full cursor-pointer"
                >
                  <span>Explore How It Works</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Magnetic>

              <Magnetic intensity={0.25} className="w-full sm:w-auto">
                <a
                  href="#prototype"
                  className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-[#22262C] hover:bg-[#282D35] border border-[#2E343D] hover:border-[#FF8A24]/40 text-[#F5F5F2] hover:text-white font-sans text-xs sm:text-sm font-bold tracking-wide transition-all shadow-sm active:scale-[0.98] w-full cursor-pointer"
                >
                  <Box className="w-4 h-4 text-[#FF8A24]" />
                  <span>Explore the Design</span>
                </a>
              </Magnetic>
            </div>

            {/* Quick Validation Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2 text-[11px] font-mono text-[#A7ADB5]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1C2026] border border-[#2E343D]">
                <Sparkles className="w-3 h-3 text-[#FF8A24]" />
                James Dyson Winner
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1C2026] border border-[#2E343D]">
                <Leaf className="w-3 h-3 text-emerald-400" />
                Zero-Carbon Urban Grid
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1C2026] border border-[#2E343D]">
                <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                1:1 SolidWorks CAD Twin
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive 6 SDGs Bento Card with Hover Effects */}
          <div className="lg:col-span-5">
            <Tilt rotationFactor={4} className="h-full">
              <div 
                className="bg-[#22262C]/95 backdrop-blur-2xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#2E343D] hover:border-[#FF8A24]/60 transition-all duration-300 shadow-xl relative overflow-hidden group"
              >
                <BorderBeam size={220} duration={14} colorFrom="#FF8A24" colorTo="#FCC30B" />
                <Spotlight fill="rgba(255, 138, 36, 0.08)" size={200} />

                {/* Card Top: UN Agenda Header */}
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#2E343D]">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#FF8A24]/10 border border-[#FF8A24]/30 text-[#FF8A24]">
                      <Globe2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF8A24] block">
                        UN AGENDA 2030 ALIGNED
                      </span>
                      <h3 className="font-display font-black text-sm sm:text-base text-[#F5F5F2] leading-tight">
                        Fulfills 6 UN Global Goals
                      </h3>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-[#FCC30B]/10 border border-[#FCC30B]/30 text-[10px] font-mono font-bold text-[#FCC30B] uppercase">
                    Core: SDG 7
                  </span>
                </div>

                {/* 6 SDGs Interactive Logo Grid (Hover over each goal) */}
                <div className="space-y-1.5 mb-3.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#A7ADB5]">
                    <span>Hover or tap any goal:</span>
                    <span className="text-[#FF8A24] font-bold">6 Goals Covered</span>
                  </div>

                  <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                    {SDG_GOALS.map((goal) => {
                      const isSelected = activeSdg.id === goal.id;
                      return (
                        <button
                          key={goal.id}
                          type="button"
                          onMouseEnter={() => setActiveSdg(goal)}
                          onClick={() => setActiveSdg(goal)}
                          className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all duration-300 cursor-pointer group/btn ${
                            isSelected
                              ? 'scale-110 shadow-lg ring-2 z-10'
                              : 'opacity-85 hover:opacity-100 hover:scale-105 border-transparent'
                          }`}
                          style={{
                            borderColor: isSelected ? goal.color : 'transparent',
                            boxShadow: isSelected ? `0 0 16px ${goal.color}40` : undefined,
                          }}
                          title={`SDG ${goal.id}: ${goal.name}`}
                          aria-label={`SDG ${goal.id}: ${goal.name}`}
                        >
                          <img
                            src={goal.image}
                            alt={goal.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover/btn:scale-105"
                            loading="lazy"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic Active SDG Inspector Panel with Hover Transition */}
                <div 
                  className="p-3.5 rounded-xl border transition-all duration-300 bg-[#1C2026] relative overflow-hidden"
                  style={{ borderColor: `${activeSdg.color}60` }}
                >
                  {/* Subtle Accent Glow */}
                  <div 
                    className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-20"
                    style={{ backgroundColor: activeSdg.color }}
                  />

                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span 
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md text-black"
                        style={{ backgroundColor: activeSdg.color }}
                      >
                        SDG {activeSdg.id}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#A7ADB5] uppercase tracking-wider">
                        {activeSdg.category}
                      </span>
                    </div>

                    <span 
                      className="text-[10px] font-mono font-bold tracking-tight"
                      style={{ color: activeSdg.color }}
                    >
                      {activeSdg.metric}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-xs sm:text-sm text-[#F5F5F2] mb-1 leading-snug">
                    {activeSdg.name}
                  </h4>

                  <p className="text-[11px] sm:text-xs text-[#A7ADB5] font-sans leading-relaxed">
                    {activeSdg.contribution}
                  </p>
                </div>

                {/* Bottom Verification Footer */}
                <div className="pt-3 mt-3 border-t border-[#2E343D] flex items-center justify-between text-[10px] font-mono text-[#A7ADB5]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                    <span>6 SDGs Fully Completed</span>
                  </span>
                  <span className="text-[#FCC30B] font-bold">Goal 7 + 11, 13, 9, 12, 3</span>
                </div>
              </div>
            </Tilt>
          </div>

        </div>

        {/* Compact Mobile-First Bento Stat Cards (2x2 on Mobile, 4x1 on Desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5 pt-6 sm:pt-10 font-sans text-left">
          {/* Card 1: 360° Aerodynamics */}
          <Tilt rotationFactor={3} className="h-full">
            <div className="bg-[#22262C] border border-[#2E343D] hover:border-[#FF8A24]/40 p-3.5 sm:p-5 rounded-2xl relative overflow-hidden group h-full flex flex-col justify-between shadow-md transition-all duration-300">
              <Spotlight fill="rgba(255, 138, 36, 0.08)" size={140} />
              <div>
                <div className="flex items-center justify-between text-[#A7ADB5] mb-2">
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-[#A7ADB5] font-mono">AERODYNAMICS</span>
                  <div className="p-1 sm:p-1.5 rounded-lg bg-[#17191D] border border-[#2E343D] text-[#FF8A24]">
                    <Compass className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-xl sm:text-3xl font-black text-[#F5F5F2] tracking-tight font-display leading-tight">
                  360°
                </div>
                <div className="my-2 h-1.5 w-full bg-[#17191D] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#FF8A24] to-[#FFA14E] rounded-full w-full" />
                </div>
              </div>
              <p className="text-[10px] sm:text-xs text-[#A7ADB5] font-sans pt-1 border-t border-[#2E343D]/60 leading-tight">
                Dual-axis horizontal & vertical capture
              </p>
            </div>
          </Tilt>

          {/* Card 2: Cut-in Velocity */}
          <Tilt rotationFactor={3} className="h-full">
            <div className="bg-[#22262C] border border-[#2E343D] hover:border-emerald-500/40 p-3.5 sm:p-5 rounded-2xl relative overflow-hidden group h-full flex flex-col justify-between shadow-md transition-all duration-300">
              <Spotlight fill="rgba(16, 185, 129, 0.08)" size={140} />
              <div>
                <div className="flex items-center justify-between text-[#A7ADB5] mb-2">
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-[#A7ADB5] font-mono">CUT-IN SPEED</span>
                  <div className="p-1 sm:p-1.5 rounded-lg bg-[#17191D] border border-[#2E343D] text-emerald-400">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-xl sm:text-3xl font-black text-emerald-400 tracking-tight font-display leading-tight">
                  1.48 m/s
                </div>
                <div className="my-2 h-1.5 w-full bg-[#17191D] rounded-full overflow-hidden flex">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[42%]" />
                </div>
              </div>
              <p className="text-[10px] sm:text-xs text-[#A7ADB5] font-sans pt-1 border-t border-[#2E343D]/60 leading-tight">
                Generates in gentle rooftop breezes
              </p>
            </div>
          </Tilt>

          {/* Card 3: Ref. Benchmark */}
          <Tilt rotationFactor={3} className="h-full">
            <div className="bg-[#22262C] border border-[#2E343D] hover:border-cyan-500/40 p-3.5 sm:p-5 rounded-2xl relative overflow-hidden group h-full flex flex-col justify-between shadow-md transition-all duration-300">
              <Spotlight fill="rgba(6, 182, 212, 0.08)" size={140} />
              <div>
                <div className="flex items-center justify-between text-[#A7ADB5] mb-2">
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-[#A7ADB5] font-mono">PEAK POWER</span>
                  <div className="p-1 sm:p-1.5 rounded-lg bg-[#17191D] border border-[#2E343D] text-cyan-400">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-xl sm:text-3xl font-black text-cyan-400 tracking-tight font-display leading-tight">
                  0.496 W
                </div>
                <div className="my-2 h-1.5 w-full bg-[#17191D] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full w-[65%]" />
                </div>
              </div>
              <p className="text-[10px] sm:text-xs text-[#A7ADB5] font-sans pt-1 border-t border-[#2E343D]/60 leading-tight">
                Yokogawa WT310 lab benchmark baseline
              </p>
            </div>
          </Tilt>

          {/* Card 4: Rooftop Safety */}
          <Tilt rotationFactor={3} className="h-full">
            <div className="bg-[#22262C] border border-[#2E343D] hover:border-[#FF8A24]/40 p-3.5 sm:p-5 rounded-2xl relative overflow-hidden group h-full flex flex-col justify-between shadow-md transition-all duration-300">
              <Spotlight fill="rgba(255, 138, 36, 0.08)" size={140} />
              <div>
                <div className="flex items-center justify-between text-[#A7ADB5] mb-2">
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-[#A7ADB5] font-mono">ACOUSTICS</span>
                  <div className="p-1 sm:p-1.5 rounded-lg bg-[#17191D] border border-[#2E343D] text-[#FF8A24]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-xl sm:text-3xl font-black text-[#F5F5F2] tracking-tight font-display leading-tight">
                  &lt; 28 dBA
                </div>
                <div className="my-2 h-1.5 w-full bg-[#17191D] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#FF8A24] to-[#FFA14E] rounded-full w-[25%]" />
                </div>
              </div>
              <p className="text-[10px] sm:text-xs text-[#A7ADB5] font-sans pt-1 border-t border-[#2E343D]/60 leading-tight">
                Whisper silent & bird-safe on parapets
              </p>
            </div>
          </Tilt>
        </div>
      </InView>
    </section>
  );
};
