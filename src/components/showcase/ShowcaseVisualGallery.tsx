import React, { useState } from 'react';
import { 
  Building2, 
  Cpu, 
  Anchor, 
  Layers, 
  Zap,
  Maximize2, 
  CheckCircle2, 
  Sparkles,
  X
} from 'lucide-react';
import { InView, Spotlight, BorderBeam } from '../motion-primitives';
import { getAssetUrl } from '../../utils/assets';

interface GalleryItem {
  id: string;
  category: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  icon: React.ElementType;
  specs: { label: string; value: string }[];
  highlight: string;
}

export const ShowcaseVisualGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('trace-hybrid');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'trace-hybrid',
      category: 'HYBRID ARCHITECTURE',
      badge: 'TRACE-HYBRID SCHEMATIC',
      badgeColor: 'bg-[#FF8A24]/10 text-[#FF8A24] border-[#FF8A24]/30',
      title: 'Advanced Trace-Hybrid Energy Generation System',
      subtitle: 'Integrated multi-source schematic combining O-Wind generator coils (orange), bifacial solar panels with front/back reflection sensors, TPV integrated core, C-SPR concentrators, and MPPT controller.',
      imageSrc: getAssetUrl('images/trace_hybrid_architecture.png'),
      icon: Zap,
      highlight: 'O-Wind Coils · Bifacial Solar · TPV Core · MPPT · BMS · C-SPR Array',
      specs: [
        { label: 'Primary Generation', value: 'O-Wind Coils + Bifacial Solar' },
        { label: 'Thermal Harvesting', value: 'TPV Core Heat/Temp Sensors' },
        { label: 'Optical Concentrator', value: 'C-SPR Array Light Pathway' },
        { label: 'Power & Storage', value: 'MPPT Multi-Input & BMS' },
      ],
    },
    {
      id: 'dual-deployment',
      category: 'FIELD DEPLOYMENT',
      badge: 'DUAL FIELD BENCHMARK',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      title: 'Marine Floating & Urban Dhaka Rooftop Deployment',
      subtitle: 'Side-by-side photographic engineering comparison: Offshore marine floating platform with coral seabed mooring, and Dhaka urban high-rise rooftop parapet installation with IP67 microcontroller.',
      imageSrc: getAssetUrl('images/turbine_rooftop_installation.jpg'),
      icon: Building2,
      highlight: 'Coastal Floating Mooring · Dhaka High-Rise Rooftop · ESP32 IP67 Control',
      specs: [
        { label: 'Marine Deployment', value: 'Submerged Coral Reef Anchor Mooring' },
        { label: 'Urban Deployment', value: 'High-Rise Rooftop Flange Clamped' },
        { label: 'Embedded Controller', value: 'IP67-Rated ESP32 Hub' },
        { label: 'Photovoltaic Array', value: 'Dual Tilting Bifacial Solar Panels' },
      ],
    },
    {
      id: 'urban-schematic',
      category: 'ROOFTOP BLUEPRINT',
      badge: 'URBAN CROSS-SECTION',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      title: 'Urban High-Rise Rooftop Cutaway Blueprint',
      subtitle: 'Detailed mechanical cross-section showing mounting flange anchored into reinforced concrete building slab, conduit access, vibration monitoring, and ESP32 IoT telemetry.',
      imageSrc: getAssetUrl('images/rooftop_engineering_schematic.png'),
      icon: Cpu,
      highlight: 'Concrete Slab Anchored · Vibration Dampened · IoT Telemetry',
      specs: [
        { label: 'Structural Anchoring', value: 'Reinforced Concrete Slab Flange' },
        { label: 'Sensory Array', value: 'TPV Heat, Vibration Sensor, RPM' },
        { label: 'Power & Data Trunk', value: 'Central Building Service Conduit' },
        { label: 'Smart IoT Hub', value: 'WiFi/GSM IoT Module (ESP32)' },
      ],
    },
    {
      id: 'marine-schematic',
      category: 'OFFSHORE BLUEPRINT',
      badge: 'MARINE CUTAWAY',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      title: 'Offshore Floating Platform & Submerged Power Station',
      subtitle: 'Detailed cutaway schematic of the floating hexagonal pontoon, underwater central mooring tension sensors, water-leak detection, and submerged LiFePO4 battery storage.',
      imageSrc: getAssetUrl('images/floating_marine_schematic.png'),
      icon: Anchor,
      highlight: 'Floating Pontoon · Underwater Tension Rig · LiFePO4 Pack',
      specs: [
        { label: 'Floating Pontoon', value: 'Hexagonal Hull with Leak Sensors' },
        { label: 'Mooring Rig', value: 'Central Underwater Tension Sensors' },
        { label: 'Battery Storage', value: 'Submerged LiFePO4 Battery Pack' },
        { label: 'Control Unit', value: 'Translucent ESP32 Control Hub' },
      ],
    },
    {
      id: 'cad-rotor',
      category: 'VENTURI ROTOR CAD',
      badge: 'MECHANICAL ASSEMBLY',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      title: '1:1 Venturi Rotor & Internal Generator Cutaway',
      subtitle: 'High-precision mechanical cutaway showing the spherical aerodynamic Venturi shell, multi-directional rotor blades, permanent magnet stator/rotor assembly, and dual bearing block.',
      imageSrc: getAssetUrl('images/rotor_generator_blueprint.png'),
      icon: Layers,
      highlight: 'Venturi Shell · 360° Omnidirectional · Direct-Drive PMG',
      specs: [
        { label: 'Aerodynamic Shell', value: 'Venturi Spherical Outer Shell' },
        { label: 'Internal Rotor', value: 'Multi-Directional Blades' },
        { label: 'Generator Type', value: 'Permanent Magnet Stator Assembly' },
        { label: 'Instrumentation', value: 'Hall Effect RPM & Torque Sensor' },
      ],
    },
  ];

  const currentItem = galleryItems.find((item) => item.id === activeTab) || galleryItems[0];

  return (
    <section id="gallery" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <InView>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22262C] border border-[#2E343D] text-[#FF8A24] text-[11px] font-mono font-bold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8A24]" />
            <span>PROJECT & AI VISUAL EVIDENCE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#F5F5F2] tracking-tight font-display leading-[1.16]">
            Turbine Hardware &{' '}
            <span className="text-gradient-orange inline-block pb-1">
              Field Deployments.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#A7ADB5] font-sans leading-relaxed max-w-2xl mx-auto">
            Explore physical rooftop installations, neural CFD aerodynamic airflow modeling, and wind tunnel laser validation.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {galleryItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                id={`tab-gallery-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                type="button"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer select-none border ${
                  isActive
                    ? 'bg-[#FF8A24]/15 text-[#FF8A24] border-[#FF8A24] shadow-md scale-[1.02]'
                    : 'bg-[#22262C] text-[#A7ADB5] border-[#2E343D] hover:border-[#FF8A24]/40 hover:text-[#F5F5F2]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FF8A24]' : 'text-[#A7ADB5]'}`} />
                <span>{item.category}</span>
              </button>
            );
          })}
        </div>

        {/* Main Visual Showcase Display Card */}
        <div className="bg-[#22262C]/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-[#2E343D] p-3 sm:p-6 shadow-xl relative overflow-hidden">
          <BorderBeam size={260} duration={14} colorFrom="#FF8A24" colorTo="#FFA959" />
          <Spotlight fill="rgba(255, 138, 36, 0.08)" size={240} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
            {/* Visual Image Viewport with Hover Zoom and Fullscreen Button */}
            <div className="lg:col-span-7 relative group rounded-xl sm:rounded-2xl overflow-hidden border border-[#2E343D] bg-[#14161A] shadow-inner flex items-center justify-center min-h-[260px] sm:min-h-[380px]">
              <img
                src={currentItem.imageSrc}
                alt={currentItem.title}
                className="w-full h-[260px] sm:h-[360px] md:h-[420px] object-contain p-2 sm:p-4 transition-transform duration-700 group-hover:scale-[1.02]"
                loading="lazy"
              />

              {/* Top Image Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border shadow-md backdrop-blur-md ${currentItem.badgeColor}`}>
                  {currentItem.badge}
                </span>
              </div>

              {/* Fullscreen Zoom Trigger */}
              <button
                id="btn-expand-image"
                onClick={() => setLightboxImage(currentItem)}
                type="button"
                className="absolute top-3 right-3 p-2 rounded-xl bg-black/70 hover:bg-black/90 text-white backdrop-blur-md transition-all border border-white/20 shadow-md cursor-pointer group-hover:scale-105"
                title="Expand Full Resolution"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Bottom Quick Spec Pill */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 rounded-lg bg-[#17191D]/90 backdrop-blur-md border border-white/10 text-white flex items-center justify-between text-[11px] font-sans">
                <div className="flex items-center gap-1.5 truncate">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF8A24] shrink-0" />
                  <span className="font-semibold truncate text-[11px]">{currentItem.highlight}</span>
                </div>
                <span className="text-[10px] text-[#A7ADB5] shrink-0 font-mono hidden sm:inline-block">
                  Click to Expand ↗
                </span>
              </div>
            </div>

            {/* Right Information & Telemetry Specs */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <span className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full border uppercase ${currentItem.badgeColor}`}>
                  {currentItem.category}
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-[#F5F5F2] font-display mt-2 mb-1.5 leading-tight">
                  {currentItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A7ADB5] font-sans leading-relaxed">
                  {currentItem.subtitle}
                </p>
              </div>

              {/* 4 Quantitative Specifications */}
              <div className="grid grid-cols-2 gap-2">
                {currentItem.specs.map((spec, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-[#1C2026] border border-[#2E343D] text-xs">
                    <span className="text-[10px] text-[#A7ADB5] font-mono font-semibold uppercase tracking-wider block mb-0.5">
                      {spec.label}
                    </span>
                    <span className="text-xs font-bold text-[#F5F5F2] block font-mono">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Technical Verification Status */}
              <div className="p-3 rounded-xl bg-[#1C2026] border border-[#2E343D] text-xs font-sans text-[#A7ADB5] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF8A24] animate-pulse" />
                  <span className="font-bold text-[#F5F5F2]">Hardware Status:</span>
                </div>
                <span className="font-mono font-bold text-[#FF8A24]">100% Calibrated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-5">
          {galleryItems.map((item) => {
            const isSelected = item.id === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                type="button"
                className={`p-1.5 rounded-xl border transition-all text-left group cursor-pointer ${
                  isSelected
                    ? 'border-[#FF8A24] ring-1 ring-[#FF8A24]/40 bg-[#22262C] shadow-md'
                    : 'border-[#2E343D] bg-[#1C2026] hover:border-[#FF8A24]/40'
                }`}
              >
                <div className="relative rounded-lg overflow-hidden h-16 sm:h-20 mb-1.5 bg-[#14161A]">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="px-1">
                  <span className="text-[9px] font-mono font-bold text-[#A7ADB5] uppercase block truncate">
                    {item.badge}
                  </span>
                  <span className="text-[11px] font-bold text-[#F5F5F2] truncate block font-sans">
                    {item.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </InView>

      {/* High-Resolution Fullscreen Modal / Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-[#17191D] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#2E343D] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxImage(null)}
              type="button"
              className="absolute top-3.5 right-3.5 z-10 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <img
              src={lightboxImage.imageSrc}
              alt={lightboxImage.title}
              className="w-full max-h-[75vh] object-contain bg-[#14161A]"
            />

            {/* Modal Footer Specs */}
            <div className="p-4 sm:p-5 bg-[#22262C] border-t border-[#2E343D] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full border uppercase ${lightboxImage.badgeColor}`}>
                  {lightboxImage.badge}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-[#F5F5F2] font-display mt-1">
                  {lightboxImage.title}
                </h4>
                <p className="text-xs text-[#A7ADB5] font-sans mt-0.5">
                  {lightboxImage.highlight}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLightboxImage(null)}
                  type="button"
                  className="px-3.5 py-1.5 rounded-xl bg-[#FF8A24] text-white text-xs font-bold hover:bg-[#FFA959] transition-colors cursor-pointer"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
