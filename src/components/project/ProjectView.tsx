import React, { useState } from 'react';
import { SDG_DATA, SdgCardData } from '../../data/sdgData';
import {
  BookOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Lightbulb,
  Building2,
  Cpu,
  Zap,
  CloudSun,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ProjectView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'sdgs' | 'vision'>('overview');

  return (
    <div className="space-y-6">
      {/* 1. Header with Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-mono font-semibold">
              SDG COMPETITION 2026
            </span>
            <span className="text-xs font-mono text-slate-400">Bangladesh Sustainable Technology Project</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Project Proposal & UN SDG Alignment
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            System-level integration of omnidirectional aerodynamic harvesting with AI spatial siting and edge air intelligence
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-space-900 border border-slate-800 p-1 rounded-lg text-xs font-mono">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded transition ${
              activeTab === 'overview' ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40 font-bold' : 'text-slate-400'
            }`}
          >
            Project Dossier
          </button>
          <button
            onClick={() => setActiveTab('sdgs')}
            className={`px-3 py-1.5 rounded transition ${
              activeTab === 'sdgs' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold' : 'text-slate-400'
            }`}
          >
            UN SDGs Impact (6 Goals)
          </button>
          <button
            onClick={() => setActiveTab('vision')}
            className={`px-3 py-1.5 rounded transition ${
              activeTab === 'vision' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-400'
            }`}
          >
            Future City Vision
          </button>
        </div>
      </div>

      {/* 2. TAB 1: Project Dossier (Problem, Solution, Innovation, Novelty, Sustainability) */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Hero Statement */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-space-900 via-space-850 to-space-900 border border-cyan-500/30 shadow-glow-cyan text-center max-w-4xl mx-auto">
            <span className="text-xs font-mono text-wind-cyan uppercase tracking-widest block mb-2 font-bold">
              CENTRAL RESEARCH INQUIRY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight font-sans">
              “Can Bangladesh harvest the wind already moving through its cities?”
            </h2>
            <p className="text-sm text-slate-300 mt-3 max-w-2xl mx-auto leading-relaxed">
              Megacities like Dhaka possess millions of square meters of vertical facades and rooftop parapets where air speeds accelerate naturally, yet 99.9% of this kinetic energy dissipates unharvested.
            </p>
          </div>

          {/* 4 Pillars Grid: Problem, Solution, Innovation, Novelty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* The Problem */}
            <div className="p-5 rounded-xl bg-space-900/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                The Urban Problem
              </div>
              <h3 className="text-base font-bold text-white">
                Severe Density, Chaotic Rooftop Turbulence & Zero Land Footprint
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Dense urban centers like Dhaka have complex, swirling, multi-directional airflow and virtually no available ground footprint for conventional solar or horizontal wind farms. Conventional 3-blade turbines fail because their yaw mechanisms cannot respond to rapid directional turbulence.
              </p>
            </div>

            {/* The Solution */}
            <div className="p-5 rounded-xl bg-space-900/80 border border-cyan-500/30 space-y-2.5 shadow-glow-cyan">
              <div className="flex items-center gap-2 text-wind-cyan font-mono text-xs font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                The Technical Solution
              </div>
              <h3 className="text-base font-bold text-white">
                Compact O-Wind Micro-Generation on Rooftop Parapets
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                A compact omnidirectional spherical rotor with internal Bernoulli cross-vents that extracts rotational kinetic energy from all 360° horizontal winds and 3D upward thermal drafts without yawing, operating down to 1.48 m/s gentle breezes.
              </p>
            </div>

            {/* The Innovation */}
            <div className="p-5 rounded-xl bg-space-900/80 border border-purple-500/30 space-y-2.5 shadow-glow-purple">
              <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                Our Integrated Innovations
              </div>
              <h3 className="text-base font-bold text-white">
                5-in-1 Smart City Environmental Energy Node
              </h3>
              <ul className="text-xs text-slate-300 space-y-1.5 font-sans">
                <li>• <strong>AI-Assisted Placement:</strong> Computational fluid dynamics neural model finds peak generation spots on building parapets.</li>
                <li>• <strong>IoT Smart Monitoring:</strong> Real-time mechanical and electrical telemetry via low-power LoRaWAN.</li>
                <li>• <strong>Smart Energy Routing:</strong> Micro-MPPT conditioning with intelligent building load-shedding.</li>
                <li>• <strong>Air Quality Sentinel:</strong> Integrated laser particle counter measuring PM2.5, PM10, and CO2.</li>
                <li>• <strong>Pollution Forecasting:</strong> Temporal LSTM model forecasting air quality +1 to +5 hours ahead.</li>
              </ul>
            </div>

            {/* Academic Novelty & Attribution */}
            <div className="p-5 rounded-xl bg-space-900/80 border border-emerald-500/30 space-y-2.5 shadow-glow-green">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Novelty & Scientific Attribution
              </div>
              <h3 className="text-base font-bold text-white">
                System-Level Bangladesh Integration
              </h3>
              <div className="p-3 rounded-lg bg-space-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
                <p className="mb-2">
                  <strong>Important Ethical Attribution:</strong> The foundational mechanical concept of the omnidirectional spherical turbine was originally demonstrated by Nicolas Orellana and Yaseen Noorani (James Dyson Award 2018).
                </p>
                <p>
                  <strong>Our Project Novelty:</strong> We pioneer the first <em>Bangladesh-focused system-level ecosystem</em>: engineering the physical micro-prototype, coupling it with neural building siting algorithms, smart microgrid power electronics, and transforming it into a self-powered urban air quality monitoring sentinel for Dhaka.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. TAB 2: UN Sustainable Development Goals (SDG Impact Section) */}
      {activeTab === 'sdgs' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-space-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="font-mono font-bold text-white text-sm">
                United Nations Sustainable Development Goals (2030 Agenda)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Detailed contributions across Primary, Secondary, and Additional humanitarian dimensions
              </p>
            </div>
            <span className="text-xs font-mono text-amber-400 font-bold">
              6 Active SDG Alignments
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SDG_DATA.map((sdg) => (
              <div
                key={sdg.number}
                className={`p-5 rounded-2xl bg-space-900/90 border ${sdg.borderColor} flex flex-col justify-between shadow-lg relative overflow-hidden`}
              >
                {/* Top Badge */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${sdg.badgeBg}`}>
                      {sdg.code}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      {sdg.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-sans mb-1">
                    {sdg.title}
                  </h3>
                  <div className="text-xs font-mono font-semibold text-wind-cyan mb-3">
                    {sdg.contribution}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                    {sdg.impactExplanation}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <div className="text-[11px] font-mono text-emerald-400 font-semibold mb-2">
                    Impact Metric: {sdg.metrics}
                  </div>
                  <div className="space-y-1">
                    {sdg.targets.map((tgt, i) => (
                      <span key={i} className="text-[10px] text-slate-400 font-mono block truncate">
                        • {tgt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. TAB 3: Future Vision (Cinematic Smart-City Microgrid Progression) */}
      {activeTab === 'vision' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-space-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold uppercase">
                Future Deployment Vision
              </span>
              <h2 className="text-base font-mono font-bold text-white mt-1">
                Urban Renewable Energy Intelligence Network (Dhaka 2030)
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Not currently deployed · Research Roadmap
            </span>
          </div>

          {/* Cinematic Progression Step Cards:
              1 Turbine → 1 Smart Building → Multiple Turbines → Multiple Buildings → Urban Network */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              {
                step: 'Phase 1',
                title: 'Single Prototype',
                desc: '260mm O-Wind physical unit validating 1.48 m/s cut-in speed and sensor power stability.',
                icon: <Zap className="w-5 h-5 text-wind-cyan" />,
                scale: '1x Node',
              },
              {
                step: 'Phase 2',
                title: 'Smart Building',
                desc: 'Cluster of 6 O-Wind units + rooftop solar pergola powering building IoT & architectural lighting.',
                icon: <Building2 className="w-5 h-5 text-emerald-400" />,
                scale: '6x Nodes',
              },
              {
                step: 'Phase 3',
                title: 'Building Cluster',
                desc: 'Commercial district array across 5 adjacent Gulshan high-rises trading surplus energy.',
                icon: <Layers className="w-5 h-5 text-purple-400" />,
                scale: '30x Nodes',
              },
              {
                step: 'Phase 4',
                title: 'Urban Micro-Grid',
                desc: 'Coordinated edge AI dispatch balancing city load-shedding events and buffering grid shocks.',
                icon: <Cpu className="w-5 h-5 text-amber-400" />,
                scale: '150x Nodes',
              },
              {
                step: 'Phase 5',
                title: 'National Mesh',
                desc: 'Nationwide atmospheric intelligence network predicting smog and generating clean city power.',
                icon: <Globe className="w-5 h-5 text-cyan-300" />,
                scale: '500+ Nodes',
              },
            ].map((p, idx) => (
              <div
                key={p.step}
                className="p-4 rounded-xl bg-space-900/90 border border-slate-800 flex flex-col justify-between hover:border-cyan-500/50 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-purple-400 font-bold">{p.step}</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">{p.scale}</span>
                  </div>
                  <div className="my-2">{p.icon}</div>
                  <h4 className="text-sm font-mono font-bold text-white mb-1.5">{p.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Integration Matrix: O-Wind + Solar + Battery + IoT + AI */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-space-950 via-space-900 to-space-950 border border-cyan-500/30">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-wind-cyan mb-3 text-center">
              The 5-Vector Urban Synergy Architecture
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center font-mono text-xs">
              <div className="p-3 rounded-lg bg-space-900 border border-cyan-500/30">
                <span className="text-wind-cyan font-bold block">1. O-WIND</span>
                <span className="text-[11px] text-slate-300 mt-1 block">24/7 Wind Kinetic</span>
              </div>
              <div className="p-3 rounded-lg bg-space-900 border border-amber-500/30">
                <span className="text-amber-300 font-bold block">2. SOLAR PV</span>
                <span className="text-[11px] text-slate-300 mt-1 block">Daytime Solar Peak</span>
              </div>
              <div className="p-3 rounded-lg bg-space-900 border border-purple-500/30">
                <span className="text-purple-300 font-bold block">3. LiFePO4</span>
                <span className="text-[11px] text-slate-300 mt-1 block">Buffer Energy Storage</span>
              </div>
              <div className="p-3 rounded-lg bg-space-900 border border-emerald-500/30">
                <span className="text-emerald-400 font-bold block">4. IoT AIR</span>
                <span className="text-[11px] text-slate-300 mt-1 block">PM2.5 Sensor Mesh</span>
              </div>
              <div className="p-3 rounded-lg bg-space-900 border border-indigo-500/30">
                <span className="text-indigo-300 font-bold block">5. EDGE AI</span>
                <span className="text-[11px] text-slate-300 mt-1 block">Siting & Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
