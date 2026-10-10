import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Zap, Cpu, Box } from 'lucide-react';
import { InView, Magnetic, Tilt, Spotlight, BorderBeam } from '../motion-primitives';

export const ShowcaseHero: React.FC = () => {
  return (
    <section id="overview" className="relative pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Subtle Architectural Illumination */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-sky-400/[0.035] blur-[80px] rounded-full pointer-events-none -z-10" />

      <InView className="text-center max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Sleek Light Pill Badge with Motion Primitives Border Beam */}
          <div className="relative inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 border border-stone-200/90 text-stone-700 text-xs font-semibold shadow-xs hover:border-cyan-300 transition-colors max-w-full">
            <BorderBeam size={100} duration={8} colorFrom="#0284c7" colorTo="#06b6d4" />
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="font-semibold text-stone-800 tracking-tight">
              Next-Gen Urban Renewable Energy
            </span>
            <span className="text-stone-300 hidden sm:inline">·</span>
            <span className="text-cyan-700 font-bold hidden sm:inline tracking-tight">
              O-Wind Aerodynamics
            </span>
          </div>

          {/* Hero Title with Distinctive Display Typography & Uncut Descenders */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-stone-900 tracking-tight leading-[1.15] sm:leading-[1.18] font-display max-w-4xl mx-auto">
            Turning Urban Wind Into
            <span className="block mt-1 sm:mt-2 pb-2 sm:pb-3.5 bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
              Intelligent Clean Energy
            </span>
          </h1>

          {/* Concise Value Proposition */}
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Capturing 360° chaotic city wind and vertical rooftop updrafts to power autonomous edge microgrids.
          </p>

          {/* User-Friendly Feature Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pb-1">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200/90 text-cyan-800 text-xs font-semibold shadow-xs">
              <span className="text-cyan-600 font-bold">✦</span> 360° Venturi Rotor
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-800 text-xs font-semibold shadow-xs">
              <span className="text-emerald-600 font-bold">✦</span> LiFePO4 Microgrid
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200/90 text-purple-800 text-xs font-semibold shadow-xs">
              <span className="text-purple-600 font-bold">✦</span> Real-Time Air Sentinel
            </span>
          </div>

          {/* Motion Primitives Magnetic Action Pill Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2 max-w-sm sm:max-w-none mx-auto w-full px-4 sm:px-0">
            <Magnetic intensity={0.25} className="w-full sm:w-auto">
              <a
                href="#prototype"
                className="flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-stone-900 hover:bg-black text-white font-sans text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg shadow-stone-900/10 hover:shadow-xl active:scale-[0.98] w-full"
              >
                <Box className="w-4 h-4 text-cyan-300" />
                <span>INSPECT 3D CAD PROTOTYPE</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </Magnetic>

            <Magnetic intensity={0.25} className="w-full sm:w-auto">
              <a
                href="#specs"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300/80 hover:border-stone-400 text-stone-800 font-sans text-xs sm:text-sm font-bold tracking-wide transition-all shadow-sm active:scale-[0.98] w-full"
              >
                <span>TECHNICAL SPECIFICATIONS</span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Key Benchmark Stat Cards (Enlarged, Wider, and More Spacious) */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 pt-10 sm:pt-14 font-sans text-left">
          {/* Card 1: Aerodynamics */}
          <Tilt rotationFactor={5} className="h-full">
            <div className="bg-white/95 backdrop-blur-2xl p-6 sm:p-7 rounded-3xl relative overflow-hidden group h-full border-2 border-stone-200/90 hover:border-cyan-400/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[220px] sm:min-h-[240px]">
              <Spotlight fill="rgba(2, 132, 199, 0.12)" size={220} />
              <div>
                <div className="flex items-center justify-between text-stone-500 mb-3 sm:mb-4">
                  <span className="text-xs sm:text-[13px] uppercase tracking-wider font-bold text-stone-700 font-mono">AERODYNAMICS</span>
                  <div className="p-2 sm:p-2.5 rounded-xl bg-cyan-50 border border-cyan-200/80 text-cyan-700 group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300">
                    <Compass className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl lg:text-[42px] font-black text-stone-900 tracking-tight font-display my-1 leading-none">
                  360°
                </div>
                
                {/* Micro Visual: 360° Compass Radar */}
                <div className="my-3.5 h-2 sm:h-2.5 w-full bg-cyan-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-sky-500 rounded-full w-full" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed pt-2.5 border-t border-stone-100">
                Dual-axis horizontal & vertical capture
              </p>
            </div>
          </Tilt>

          {/* Card 2: Cut-in Velocity */}
          <Tilt rotationFactor={5} className="h-full">
            <div className="bg-white/95 backdrop-blur-2xl p-6 sm:p-7 rounded-3xl relative overflow-hidden group h-full border-2 border-stone-200/90 hover:border-emerald-400/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[220px] sm:min-h-[240px]">
              <Spotlight fill="rgba(16, 185, 129, 0.12)" size={220} />
              <div>
                <div className="flex items-center justify-between text-stone-500 mb-3 sm:mb-4">
                  <span className="text-xs sm:text-[13px] uppercase tracking-wider font-bold text-stone-700 font-mono">CUT-IN VELOCITY</span>
                  <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl lg:text-[42px] font-black text-emerald-600 tracking-tight font-display my-1 leading-none">
                  1.48 m/s
                </div>
                
                {/* Micro Visual: Low Velocity Progress Bar */}
                <div className="my-3.5 h-2 sm:h-2.5 w-full bg-emerald-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-[38%]" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed pt-2.5 border-t border-stone-100">
                Generates in gentle rooftop breezes
              </p>
            </div>
          </Tilt>

          {/* Card 3: Ref. Benchmark */}
          <Tilt rotationFactor={5} className="h-full">
            <div className="bg-white/95 backdrop-blur-2xl p-6 sm:p-7 rounded-3xl relative overflow-hidden group h-full border-2 border-stone-200/90 hover:border-purple-400/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[220px] sm:min-h-[240px]">
              <Spotlight fill="rgba(168, 85, 247, 0.12)" size={220} />
              <div>
                <div className="flex items-center justify-between text-stone-500 mb-3 sm:mb-4">
                  <span className="text-xs sm:text-[13px] uppercase tracking-wider font-bold text-stone-700 font-mono">REF. BENCHMARK</span>
                  <div className="p-2 sm:p-2.5 rounded-xl bg-purple-50 border border-purple-200/80 text-purple-700 group-hover:scale-110 transition-transform duration-300">
                    <Cpu className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl lg:text-[42px] font-black text-purple-700 tracking-tight font-display my-1 leading-none">
                  0.496 W
                </div>

                {/* Micro Visual: Power Output Pulse Bar */}
                <div className="my-3.5 h-2 sm:h-2.5 w-full bg-purple-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-[65%]" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed pt-2.5 border-t border-stone-100">
                Laboratory reference prototype test
              </p>
            </div>
          </Tilt>

          {/* Card 4: Rooftop Safety */}
          <Tilt rotationFactor={5} className="h-full">
            <div className="bg-white/95 backdrop-blur-2xl p-6 sm:p-7 rounded-3xl relative overflow-hidden group h-full border-2 border-stone-200/90 hover:border-sky-400/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[220px] sm:min-h-[240px]">
              <Spotlight fill="rgba(2, 132, 199, 0.12)" size={220} />
              <div>
                <div className="flex items-center justify-between text-stone-500 mb-3 sm:mb-4">
                  <span className="text-xs sm:text-[13px] uppercase tracking-wider font-bold text-stone-700 font-mono">ROOFTOP SAFETY</span>
                  <div className="p-2 sm:p-2.5 rounded-xl bg-sky-50 border border-sky-200/80 text-sky-700 group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl lg:text-[42px] font-black text-sky-700 tracking-tight font-display my-1 leading-none">
                  Enclosed
                </div>

                {/* Micro Visual: Low Decibel Sound Bar */}
                <div className="my-3.5 h-2 sm:h-2.5 w-full bg-sky-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full w-[28%]" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed pt-2.5 border-t border-stone-100">
                &lt; 24 dB whisper silent & bird-safe
              </p>
            </div>
          </Tilt>
        </div>
      </InView>
    </section>
  );
};
