import React, { useState } from 'react';
import { 
  Wind, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  Layers, 
  Gauge, 
  ArrowUpRight,
  Activity
} from 'lucide-react';
import { InView, Tilt, Spotlight, BorderBeam } from '../motion-primitives';
import { HOW_IT_WORKS_STAGES, EXPERIMENTAL_DATA_RECORDS } from '../../data/researchData';

export const ShowcaseBentoGrid: React.FC = () => {
  const [activeWorkflowStage, setActiveWorkflowStage] = useState<number>(1);
  const currentStage = HOW_IT_WORKS_STAGES.find((s) => s.step === activeWorkflowStage) || HOW_IT_WORKS_STAGES[0];

  return (
    <section id="technology" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <InView>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22262C] border border-[#2E343D] text-[#FF8A24] text-[10px] sm:text-xs font-mono font-bold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8A24]" />
            <span>CORE ARCHITECTURE · MOBILE BENTO GRID</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#F5F5F2] tracking-tight font-display leading-[1.15]">
            Engineering Anatomy,{' '}
            <span className="text-gradient-orange inline-block pb-1">
              Deconstructed.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#A7ADB5] font-sans leading-relaxed max-w-2xl mx-auto px-2">
            Explore the fluid physics, omnidirectional aerodynamics, mechanical components, 8-stage energy flow, and verified test results.
          </p>
        </div>

        {/* Master Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-5">
          
          {/* ============================================================ */}
          {/* CARD 1: HOW THE TURBINE WORKS (Large 8 cols, Bernoulli Duct) */}
          {/* ============================================================ */}
          <div className="md:col-span-8">
            <Tilt rotationFactor={2} className="h-full">
              <div className="bg-[#22262C] border border-[#2E343D] hover:border-[#FF8A24]/40 p-4 sm:p-7 rounded-2xl sm:rounded-3xl flex flex-col justify-between h-full relative overflow-hidden group shadow-lg transition-all duration-300">
                <BorderBeam size={220} duration={14} colorFrom="#FF8A24" colorTo="#06b6d4" />
                <Spotlight fill="rgba(255, 138, 36, 0.08)" size={240} />

                <div>
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#2E343D]">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#17191D] border border-[#2E343D] text-[#FF8A24]">
                        <Wind className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#FF8A24] uppercase tracking-wider block">
                          01 · FLUID DYNAMICS
                        </span>
                        <h3 className="text-sm sm:text-lg font-bold text-[#F5F5F2] font-display">
                          How the Turbine Works: Bernoulli Pressure Lift
                        </h3>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-[#FF8A24] bg-[#17191D] px-2.5 py-1 rounded-full border border-[#2E343D]">
                      +1.4x Airspeed Boost
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#A7ADB5] font-sans leading-relaxed mb-3">
                    Unlike flat blades that stall when wind shifts, the spherical O-Wind rotor features cross-ducted helical apertures. Air entering the windward duct accelerates through contracted internal channels, producing a localized Bernoulli low-pressure zone on the leeward face. This geometry ensures the resultant torque always acts in a uniform direction on the central shaft.
                  </p>

                  {/* Visual Bernoulli Diagram with Flow Vectors */}
                  <div className="p-3.5 rounded-xl sm:rounded-2xl bg-[#17191D] border border-[#2E343D] flex flex-col sm:flex-row items-center gap-4 my-2">
                    <svg className="w-32 h-32 shrink-0" viewBox="0 0 120 120" fill="none">
                      <circle cx="60" cy="60" r="54" stroke="#2E343D" strokeWidth="1" strokeDasharray="3 3" />
                      
                      {/* Flow Vectors Inward */}
                      <path d="M 60 12 L 60 38" stroke="#FF8A24" strokeWidth="2.5" strokeLinecap="round" />
                      <polygon points="60,42 56,34 64,34" fill="#FF8A24" />

                      <path d="M 60 108 L 60 82" stroke="#FF8A24" strokeWidth="2.5" strokeLinecap="round" />
                      <polygon points="60,78 56,86 64,86" fill="#FF8A24" />

                      <path d="M 12 60 L 38 60" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
                      <polygon points="42,60 34,56 34,64" fill="#06b6d4" />

                      <path d="M 108 60 L 82 60" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
                      <polygon points="78,60 86,56 86,64" fill="#06b6d4" />

                      {/* Diagonal Vectors */}
                      <path d="M 26 26 L 44 44" stroke="#FF8A24" strokeWidth="1.5" strokeDasharray="2 2" />
                      <path d="M 94 94 L 76 76" stroke="#FF8A24" strokeWidth="1.5" strokeDasharray="2 2" />

                      {/* Center Turbine Spindle */}
                      <circle cx="60" cy="60" r="18" fill="#22262C" stroke="#FF8A24" strokeWidth="2" />
                      <circle cx="60" cy="60" r="6" fill="#FF8A24" />
                      <text x="60" y="63" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">360°</text>
                    </svg>

                    <div className="flex-1 space-y-1.5 text-xs w-full">
                      <div className="flex items-center justify-between pb-1 border-b border-[#2E343D]">
                        <span className="text-[#A7ADB5]">Governing Equation:</span>
                        <span className="font-mono font-bold text-[#FF8A24]">P₁ + ½ρv₁² = P₂ + ½ρv₂²</span>
                      </div>
                      <div className="flex items-center justify-between pb-1 border-b border-[#2E343D]">
                        <span className="text-[#A7ADB5]">Horizontal Capture:</span>
                        <span className="font-mono text-[#F5F5F2]">Any Azimuth (0°–360°)</span>
                      </div>
                      <div className="flex items-center justify-between pb-1 border-b border-[#2E343D]">
                        <span className="text-[#A7ADB5]">Vertical Capture:</span>
                        <span className="font-mono text-[#F5F5F2]">45°–90° Facade Updrafts</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#A7ADB5]">Torque Direction:</span>
                        <span className="font-mono text-emerald-400 font-bold">Unidirectional CW</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#2E343D] text-xs font-sans">
                  <div className="p-2.5 rounded-xl bg-[#17191D] border border-[#2E343D]">
                    <span className="text-[10px] text-[#A7ADB5] font-mono uppercase block">CUT-IN THRESHOLD</span>
                    <span className="font-bold text-[#F5F5F2] font-mono">1.48 m/s Ambient Flow</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#17191D] border border-[#2E343D]">
                    <span className="text-[10px] text-[#A7ADB5] font-mono uppercase block">STEERING MOTORS</span>
                    <span className="font-bold text-emerald-400 font-mono">0 (Zero Yaw Wear)</span>
                  </div>
                </div>
              </div>
            </Tilt>
          </div>

          {/* ============================================================ */}
          {/* CARD 2: OMNIDIRECTIONAL CAPTURE (4 cols, 3D Vector Inflow)   */}
          {/* ============================================================ */}
          <div className="md:col-span-4">
            <Tilt rotationFactor={2} className="h-full">
              <div className="bg-[#22262C] border border-[#2E343D] hover:border-cyan-500/40 p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between h-full relative overflow-hidden group shadow-lg transition-all duration-300">
                <Spotlight fill="rgba(6, 182, 212, 0.08)" size={180} />

                <div>
                  <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#2E343D]">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-[#17191D] border border-[#2E343D] text-cyan-400">
                        <Compass className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-[#F5F5F2] font-display">
                        Omnidirectional Wind Capture
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-cyan-400 bg-[#17191D] px-2 py-0.5 rounded-full border border-[#2E343D]">
                      Dual-Axis
                    </span>
                  </div>

                  <p className="text-xs text-[#A7ADB5] font-sans leading-relaxed mb-3">
                    Urban street canyons generate unpredictable winds with rapid directional shifts and strong thermal updrafts along building faces.
                  </p>

                  <div className="space-y-2 text-xs font-sans">
                    <div className="p-2.5 rounded-xl bg-[#17191D] border border-[#2E343D] space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#F5F5F2] font-semibold">Horizontal Cross-Gales</span>
                        <span className="text-cyan-400 font-mono font-bold">100% Ingested</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#22262C] rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 rounded-full w-full" />
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#17191D] border border-[#2E343D] space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#F5F5F2] font-semibold">Vertical Facade Updrafts</span>
                        <span className="text-[#FF8A24] font-mono font-bold">+40% Lift</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#22262C] rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF8A24] rounded-full w-[85%]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-[#2E343D] text-[11px] font-mono text-[#A7ADB5] flex items-center justify-between">
                  <span>Traditional HAWT Loss:</span>
                  <span className="text-red-400 font-bold">Stalls on shifts</span>
                </div>
              </div>
            </Tilt>
          </div>

          {/* ============================================================ */}
          {/* CARD 3: TURBINE COMPONENTS & ANATOMY (6 cols)                */}
          {/* ============================================================ */}
          <div className="md:col-span-6">
            <Tilt rotationFactor={2} className="h-full">
              <div className="bg-[#22262C] border border-[#2E343D] hover:border-emerald-500/40 p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between h-full relative overflow-hidden group shadow-lg transition-all duration-300">
                <Spotlight fill="rgba(16, 185, 129, 0.08)" size={180} />

                <div>
                  <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#2E343D]">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-[#17191D] border border-[#2E343D] text-emerald-400">
                        <Layers className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#F5F5F2] font-display">
                        Turbine Components & Precision Materials
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-[#17191D] px-2 py-0.5 rounded-full border border-[#2E343D]">
                      SolidWorks CAD
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-sans mb-3">
                    <div className="p-2.5 rounded-xl bg-[#17191D] border border-[#2E343D]">
                      <span className="text-[10px] text-[#A7ADB5] font-mono uppercase block">Rotor Shell</span>
                      <strong className="text-[#F5F5F2] block mt-0.5">260mm PETG Shell</strong>
                      <span className="text-[10px] text-[#A7ADB5] block">340g Gyroid core</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#17191D] border border-[#2E343D]">
                      <span className="text-[10px] text-[#A7ADB5] font-mono uppercase block">Bearings</span>
                      <strong className="text-[#F5F5F2] block mt-0.5">Si3N4 Ceramic Hybrid</strong>
                      <span className="text-[10px] text-[#A7ADB5] block">Flanged, low friction</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#17191D] border border-[#2E343D]">
                      <span className="text-[10px] text-[#A7ADB5] font-mono uppercase block">Central Spindle</span>
                      <strong className="text-[#F5F5F2] block mt-0.5">8mm Stainless Steel</strong>
                      <span className="text-[10px] text-[#A7ADB5] block">Ground, vibration isolated</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#17191D] border border-[#2E343D]">
                      <span className="text-[10px] text-[#A7ADB5] font-mono uppercase block">Generator</span>
                      <strong className="text-[#F5F5F2] block mt-0.5">Direct-Drive PMG</strong>
                      <span className="text-[10px] text-[#A7ADB5] block">12 NdFeB magnets, coreless</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#2E343D] flex items-center justify-between text-[11px] font-sans">
                  <span className="text-[#A7ADB5]">CAD Model:</span>
                  <a href="#prototype" className="text-[#FF8A24] font-bold hover:underline flex items-center gap-1">
                    <span>Inspect 3D Twin</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </Tilt>
          </div>

          {/* ============================================================ */}
          {/* CARD 4: ADVANTAGES VS LIMITATIONS (6 cols)                   */}
          {/* ============================================================ */}
          <div className="md:col-span-6">
            <Tilt rotationFactor={2} className="h-full">
              <div className="bg-[#22262C] border border-[#2E343D] hover:border-amber-500/40 p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between h-full relative overflow-hidden group shadow-lg transition-all duration-300">
                <Spotlight fill="rgba(245, 158, 11, 0.08)" size={180} />

                <div>
                  <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#2E343D]">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-[#17191D] border border-[#2E343D] text-amber-400">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#F5F5F2] font-display">
                        Engineering Advantages & Limitations
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-amber-400 bg-[#17191D] px-2 py-0.5 rounded-full border border-[#2E343D]">
                      Trade-Offs
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans mb-3">
                    {/* Advantages */}
                    <div className="p-3 rounded-xl bg-[#17191D] border border-emerald-500/20 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Key Advantages</span>
                      </div>
                      <ul className="space-y-1 text-[11px] text-[#A7ADB5]">
                        <li>• Operates at &lt;28 dBA (residential whisper)</li>
                        <li>• Enclosed sphere—bird-safe, zero exposed blades</li>
                        <li>• Harvests 360° horizontal + vertical facade gusts</li>
                        <li>• Low 1.48 m/s startup threshold</li>
                      </ul>
                    </div>

                    {/* Limitations */}
                    <div className="p-3 rounded-xl bg-[#17191D] border border-amber-500/20 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px]">
                        <Activity className="w-3.5 h-3.5 shrink-0" />
                        <span>Engineering Boundaries</span>
                      </div>
                      <ul className="space-y-1 text-[11px] text-[#A7ADB5]">
                        <li>• Lower peak swept area than large utility blades</li>
                        <li>• 18 m/s cut-out brake limit for storm protection</li>
                        <li>• Sited specifically for rooftop parapets & lips</li>
                        <li>• Generates mW–W scale for edge IoT & batteries</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#2E343D] text-[11px] font-mono text-[#A7ADB5]">
                  Optimized for dense urban buildings, not open flat plains.
                </div>
              </div>
            </Tilt>
          </div>

          {/* ============================================================ */}
          {/* CARD 5: 8-STAGE WORKING-FLOW PIPELINE (Full Width 12 cols)   */}
          {/* ============================================================ */}
          <div className="md:col-span-12">
            <div className="bg-[#22262C] border border-[#2E343D] p-4 sm:p-7 rounded-2xl sm:rounded-3xl relative overflow-hidden shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[#2E343D] gap-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#FF8A24] uppercase tracking-wider block">
                    WORKING FLOW EXPLANATION
                  </span>
                  <h3 className="text-base sm:text-xl font-bold text-[#F5F5F2] font-display">
                    From Inflow Aerodynamics to LiFePO4 Energy Storage
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#A7ADB5] bg-[#17191D] px-3 py-1 rounded-full border border-[#2E343D] self-start sm:self-auto">
                  8-Stage Pipeline
                </span>
              </div>

              {/* Stepper Tabs (Touch Scrollable on Mobile) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 no-scrollbar">
                {HOW_IT_WORKS_STAGES.map((stage) => {
                  const isSelected = stage.step === activeWorkflowStage;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setActiveWorkflowStage(stage.step)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 ${
                        isSelected
                          ? 'bg-[#FF8A24] text-white shadow-md shadow-[#FF8A24]/30'
                          : 'bg-[#17191D] text-[#A7ADB5] hover:text-[#F5F5F2] border border-[#2E343D]'
                      }`}
                    >
                      <span className="opacity-75">0{stage.step}</span>
                      <span>{stage.shortTitle}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Deep Dive */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#17191D] border border-[#2E343D] grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-8 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#FF8A24]/20 text-[#FF8A24] border border-[#FF8A24]/30">
                      STAGE {currentStage.step} OF 8
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-[#F5F5F2] font-display">
                      {currentStage.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#A7ADB5] font-sans leading-relaxed">
                    {currentStage.scientificDetail}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentStage.keyComponents.map((comp, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-[#22262C] text-[#F5F5F2] border border-[#2E343D] text-[10px] font-mono">
                        ✦ {comp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 p-3 rounded-xl bg-[#22262C] border border-[#2E343D] space-y-2 text-xs font-mono">
                  {currentStage.equations && (
                    <div>
                      <span className="text-[10px] text-[#A7ADB5] block uppercase">Physics Formulation</span>
                      <span className="text-xs font-bold text-[#FF8A24]">{currentStage.equations}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] text-[#A7ADB5] block uppercase">Stage Efficiency Loss</span>
                    <span className="text-xs font-bold text-emerald-400">{currentStage.efficiencyLoss}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CARD 6: ACTUAL EXPERIMENTAL RESULTS (Full Width 12 cols)     */}
          {/* ============================================================ */}
          <div className="md:col-span-12">
            <div className="bg-[#22262C] border border-[#2E343D] p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-[#2E343D] gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#17191D] border border-[#2E343D] text-emerald-400">
                    <Gauge className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-[#F5F5F2] font-display">
                    Actual Experimental Prototype Records & Instrumentation
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-[#17191D] px-2.5 py-1 rounded-full border border-[#2E343D] self-start sm:self-auto">
                  Yokogawa WT310 Calibrated
                </span>
              </div>

              {/* Experimental Records Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-sans">
                {EXPERIMENTAL_DATA_RECORDS.slice(0, 3).map((record, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#17191D] border border-[#2E343D] flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#A7ADB5] mb-1">
                        <span>{record.trustLevel}</span>
                        <span className="text-emerald-400">{record.condition}</span>
                      </div>
                      <strong className="text-sm font-bold text-[#F5F5F2] block">{record.metric}</strong>
                      <div className="text-lg font-black text-[#FF8A24] font-mono mt-0.5">{record.value}</div>
                    </div>
                    <p className="text-[11px] text-[#A7ADB5] pt-2 border-t border-[#2E343D]">
                      {record.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </InView>
    </section>
  );
};
