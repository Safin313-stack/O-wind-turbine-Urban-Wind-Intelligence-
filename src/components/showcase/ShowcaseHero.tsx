import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Zap, Cpu, Box } from 'lucide-react';
import { InView, Magnetic, Tilt, Spotlight } from '../motion-primitives';

export const ShowcaseHero: React.FC = () => {
  return (
    <section id="overview" className="relative pt-16 sm:pt-24 pb-10 sm:pb-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Subtle Engineering Illumination */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[600px] sm:w-[850px] h-[250px] sm:h-[350px] bg-[#FF8A24]/[0.04] blur-[80px] rounded-full pointer-events-none -z-10" />

      <InView className="text-center max-w-5xl mx-auto space-y-4 sm:space-y-6">
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

        {/* Hero Headline: Concise, Impactful & Proportionate for Smartphone Screens */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[58px] font-black text-[#F5F5F2] tracking-tight leading-[1.15] font-display max-w-3xl mx-auto">
          Omnidirectional Wind Turbine
          <span className="block mt-1 sm:mt-1.5 text-gradient-orange pb-1">
            Intelligent Clean Energy
          </span>
        </h1>

        {/* Short Purpose Explanation */}
        <p className="text-xs sm:text-base text-[#A7ADB5] font-sans leading-relaxed max-w-2xl mx-auto px-1 sm:px-2">
          Capturing 360° chaotic city wind and vertical building updrafts on a single axis to power autonomous edge microgrids and environmental sensors.
        </p>

        {/* Prominent Action CTAs: Touch-Friendly 44px Min Height */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 pt-1 max-w-xs sm:max-w-none mx-auto w-full">
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
