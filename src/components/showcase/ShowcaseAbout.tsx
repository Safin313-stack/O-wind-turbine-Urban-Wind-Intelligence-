import React from 'react';
import { BookOpen, ShieldCheck, HelpCircle } from 'lucide-react';
import { InView, BorderBeam, Spotlight, Magnetic, Disclosure } from '../motion-primitives';

export const ShowcaseAbout: React.FC = () => {
  const faqItems = [
    {
      id: 'aerodynamics-faq',
      category: 'AERODYNAMICS',
      title: 'How does the O-Wind rotor generate torque from multi-directional wind without turning?',
      content: (
        <p>
          Unlike traditional bladed turbines that act as lift surfaces requiring a fixed perpendicular angle of attack, the O-Wind turbine is a geometric sphere with tapered internal cross-ducts. When wind hits the outer sphere from any azimuth or vertical inclination, air is forced through narrowing Bernoulli nozzles, causing an internal drop in static pressure. This differential pressure creates tangential drag-and-lift torque that continuously spins the rotor about its central axis.
        </p>
      ),
    },
    {
      id: 'siting-faq',
      category: 'AI SITING',
      title: 'Why does the Edge-CFD neural model target rooftop parapets instead of rooftop centers?',
      content: (
        <p>
          When horizontal street canyon winds encounter a building's vertical facade, the air cannot pass through the concrete structure and is forced violently upward. As this upward draft spills over the rooftop parapet lip, it experiences a dramatic Bernoulli constriction—accelerating local wind velocity by +35% to +50%. Placing omnidirectional turbines on the parapet boundary maximizes this accelerated kinetic flow.
        </p>
      ),
    },
    {
      id: 'power-faq',
      category: 'MICROGRID',
      title: 'How does diurnal solar-wind balancing maintain 24/7 autonomous IoT power?',
      content: (
        <p>
          Solar PV only produces electricity during daylight hours. In dense cities like Dhaka, severe grid load-shedding occurs between 7:00 PM and 11:00 PM—coinciding with strong thermal evening updrafts as concrete buildings release stored daytime heat. O-Wind captures these nighttime convective updrafts, maintaining LiFePO4 battery charge and keeping edge environmental sensors running continuously without grid backup.
        </p>
      ),
    },
    {
      id: 'safety-faq',
      category: 'SAFETY & ACOUSTICS',
      title: 'Why is the enclosed spherical structure safer than bladed turbines for city roofs?',
      content: (
        <p>
          Traditional spinning blades create dangerous tip speeds, catastrophic throw risks during severe storm gusts, and audible low-frequency hums. The O-Wind turbine has zero exposed spinning blades—all kinetic action is enclosed within a smooth, bird-safe, carbon-fiber reinforced polycarbonate sphere operating at &lt; 24 dB, quieter than an ambient library whisper.
        </p>
      ),
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <InView>
        {/* Main Vision Card with BorderBeam & Spotlight */}
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-stone-200/90 relative overflow-hidden shadow-[0_12px_36px_-6px_rgba(0,0,0,0.04)]">
          <BorderBeam size={280} duration={16} colorFrom="#0284c7" colorTo="#8b5cf6" />
          <Spotlight fill="rgba(2, 132, 199, 0.08)" size={320} />

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono font-medium">
              <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
              <span>PROJECT BACKGROUND & VISION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight font-sans">
              Built for the Rooftops of Modern Megacities
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
              <p>
                In dense global megacities like Dhaka, skyscrapers create severe artificial wind canyons. While traditional bladed turbines stall and vibrate violently in this turbulence, hundreds of megawatts of kinetic wind energy rush over rooftop parapets unharvested every day.
              </p>
              <p>
                Meanwhile, these same cities endure chronic evening load-shedding and catastrophic winter PM2.5 air pollution. <strong>O-WIND AI</strong> was conceived to solve both challenges simultaneously: harvesting chaotic 360° omnidirectional urban air to power self-sustaining edge microgrids and distributed air quality sentinels.
              </p>
            </div>

            {/* Academic & Engineering Attribution Boundary */}
            <div className="p-5 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200/90 text-xs font-mono space-y-2 mt-6">
              <div className="flex items-center gap-2 text-cyan-800 font-bold">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                <span>Engineering & Academic Attribution Boundary</span>
              </div>
              <p className="text-stone-600 font-sans leading-relaxed text-xs">
                The foundational mechanical concept of the omnidirectional geometric wind turbine was created by Dyson Award laureates Nicolas Orellana and Yaseen Noorani. The <strong>O-WIND AI</strong> project builds upon this mechanical foundation by designing the complete smart-city system: Edge-CFD neural siting optimization for rooftop parapet acceleration, active synchronous MPPT power conditioning, LiFePO4 diurnal solar-wind balancing, and real-time hyper-local air quality intelligence.
              </p>
            </div>

            {/* Quick links & GitHub action with Magnetic */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Magnetic intensity={0.25}>
                <a
                  href="https://github.com/Safin313-stack/O-wind-turbine-Urban-Wind-Intelligence-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3 rounded-full bg-stone-900 hover:bg-black text-white font-mono text-xs font-bold transition-all shadow-md hover:shadow-lg inline-block"
                >
                  Explore Open Source Repository →
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </InView>

      {/* Engineering FAQ / Technical Deep-Dive Section with Motion Primitives Disclosure */}
      <InView>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-mono font-medium">
              <HelpCircle className="w-3.5 h-3.5 text-stone-500" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-sans">
              Engineering & Operational FAQ
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 font-sans">
              Key aerodynamic, microgrid, and installation details explained.
            </p>
          </div>

          <Disclosure items={faqItems} defaultOpenId="aerodynamics-faq" />
        </div>
      </InView>
    </section>
  );
};
