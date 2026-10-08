import React from 'react';
import { Globe, Award, Sparkles, BookOpen, Layers, HeartHandshake, ShieldCheck } from 'lucide-react';

export const ShowcaseAbout: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/[0.1] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-medium">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>PROJECT BACKGROUND & VISION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
            Built for the Rooftops of Modern Megacities
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            <p>
              In dense global megacities like Dhaka, skyscrapers create severe artificial wind canyons. While traditional bladed turbines stall and vibrate violently in this turbulence, hundreds of megawatts of kinetic wind energy rush over rooftop parapets unharvested every day.
            </p>
            <p>
              Meanwhile, these same cities endure chronic evening load-shedding and catastrophic winter PM2.5 air pollution. <strong>O-WIND AI</strong> was conceived to solve both challenges simultaneously: harvesting chaotic 360° omnidirectional urban air to power self-sustaining edge microgrids and distributed air quality sentinels.
            </p>
          </div>

          {/* Academic & Engineering Attribution Boundary */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-xs font-mono space-y-2 mt-6">
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Engineering & Academic Attribution Boundary</span>
            </div>
            <p className="text-slate-400 font-sans leading-relaxed text-xs">
              The foundational mechanical concept of the omnidirectional geometric wind turbine was created by Dyson Award laureates Nicolas Orellana and Yaseen Noorani. The <strong>O-WIND AI</strong> project builds upon this mechanical foundation by designing the complete smart-city system: Edge-CFD neural siting optimization for rooftop parapet acceleration, active synchronous MPPT power conditioning, LiFePO4 diurnal solar-wind balancing, and real-time hyper-local air quality intelligence.
            </p>
          </div>

          {/* Quick links & GitHub action */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/Safin313-stack/O-wind-turbine-Urban-Wind-Intelligence-"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-white font-mono text-xs font-bold transition-all shadow-md"
            >
              Explore Open Source Repository →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
