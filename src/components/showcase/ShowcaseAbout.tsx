import React from 'react';
import { BookOpen, ShieldCheck, HelpCircle } from 'lucide-react';
import { InView, BorderBeam, Spotlight, Magnetic, Disclosure } from '../motion-primitives';

export const ShowcaseAbout: React.FC = () => {
  const faqItems = [
    {
      id: 'aerodynamics-faq',
      category: 'Aerodynamics',
      categoryBadgeClass: 'bg-cyan-50 text-cyan-800 border-cyan-200/80',
      title: 'How does O-Wind capture 360° wind without rotating?',
      content: (
        <div className="space-y-3">
          <p>
            Unlike flat bladed turbines requiring yaw motors to face the wind, O-Wind uses a geometric sphere with internal Bernoulli Venturi nozzles. Wind from any horizontal azimuth or vertical updraft creates differential suction that continuously spins the rotor on a fixed central axis.
          </p>
          <div className="flex flex-wrap gap-2 pt-1 font-sans text-[11px]">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 font-semibold">
              ✦ 360° Omnidirectional
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700">
              ✦ No Yaw Motors Needed
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700">
              ✦ Bernoulli Venturi Flow
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'siting-faq',
      category: 'AI Siting',
      categoryBadgeClass: 'bg-purple-50 text-purple-800 border-purple-200/80',
      title: 'Why install turbines on rooftop edges instead of centers?',
      content: (
        <div className="space-y-3">
          <p>
            Urban winds striking a tall building facade are forced straight upward. As drafts spill over the parapet boundary lip, Bernoulli constriction accelerates local wind velocity by +35% to +50%. Our Edge-CFD neural model targets this high-speed parapet layer rather than the stagnant rooftop center.
          </p>
          <div className="flex flex-wrap gap-2 pt-1 font-sans text-[11px]">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-800 font-semibold">
              ✦ +40% Edge Draft Boost
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700">
              ✦ Street Canyon Dynamics
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700">
              ✦ Edge-CFD Neural Placement
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'power-faq',
      category: 'Microgrid',
      categoryBadgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      title: 'How does solar + wind maintain 24/7 continuous power?',
      content: (
        <div className="space-y-3">
          <p>
            Solar PV handles daytime power, while O-Wind harvests strong convective thermal updrafts during Dhaka's peak evening outages (7 PM – 11 PM). Combined with LiFePO4 battery storage, this diurnal balance keeps environmental sensors running without grid dependence.
          </p>
          <div className="flex flex-wrap gap-2 pt-1 font-sans text-[11px]">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 font-semibold">
              ✦ Daylight Solar + Night Wind
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700">
              ✦ Peak Outage Buffer (7–11 PM)
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700">
              ✦ Autonomous LiFePO4 Storage
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'safety-faq',
      category: 'Safety',
      categoryBadgeClass: 'bg-amber-50 text-amber-800 border-amber-200/80',
      title: 'Why is an enclosed sphere safer than traditional bladed turbines?',
      content: (
        <div className="space-y-3">
          <p>
            Traditional blades create dangerous tip speeds, throw hazards in storms, and low-frequency vibration. O-Wind encloses all motion within a smooth, bird-safe polycarbonate sphere operating at under 24 dB—quieter than a library whisper, making it safe for urban residential roofs.
          </p>
          <div className="flex flex-wrap gap-2 pt-1 font-sans text-[11px]">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 font-semibold">
              ✦ &lt; 24 dB Whisper Quiet
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700">
              ✦ 100% Bird-Safe Enclosure
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700">
              ✦ Zero Exposed Blades
            </span>
          </div>
        </div>
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-sans font-bold tracking-wide">
              <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
              <span>PROJECT BACKGROUND & VISION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight font-display">
              Built for the Rooftops of Modern Megacities
            </h2>

            <div className="space-y-3 text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
              <p>
                Skyscrapers create artificial wind canyons where kinetic drafts rush over rooftop parapets unharvested. <strong>O-WIND AI</strong> converts this chaotic urban air into continuous clean electricity, powering autonomous edge microgrids and distributed air quality sentinels during peak evening outages.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 font-sans text-xs">
                <span className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 font-medium">
                  ✦ Urban Canyon Siting
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium">
                  ✦ 24/7 Off-Grid Power
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 font-medium">
                  ✦ Real-Time PM2.5 Telemetry
                </span>
              </div>
            </div>

            {/* Academic & Engineering Attribution Boundary */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/90 text-xs font-sans space-y-1.5 mt-5">
              <div className="flex items-center gap-2 text-cyan-800 font-bold">
                <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>Academic & Engineering Scope</span>
              </div>
              <p className="text-stone-600 font-sans leading-relaxed text-xs">
                Mechanical turbine concept inspired by Dyson Award laureates N. Orellana & Y. Noorani. <strong>O-WIND AI</strong> builds the smart-city deployment layer: Edge-CFD neural siting, synchronous MPPT conditioning, LiFePO4 microgrid balancing, and live air sensing.
              </p>
            </div>

            {/* Quick links & GitHub action with Magnetic */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Magnetic intensity={0.25}>
                <a
                  href="https://github.com/Safin313-stack/O-wind-turbine-Urban-Wind-Intelligence-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3 rounded-full bg-stone-900 hover:bg-black text-white font-sans text-xs font-bold tracking-wide transition-all shadow-md hover:shadow-lg inline-block"
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-sans font-bold tracking-wide">
              <HelpCircle className="w-3.5 h-3.5 text-stone-500" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-display">
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
