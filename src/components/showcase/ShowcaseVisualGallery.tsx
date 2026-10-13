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
      badgeColor: 'bg-amber-50 text-amber-900 border-amber-300',
      title: 'Advanced Trace-Hybrid Energy Generation System',
      subtitle: 'Integrated multi-source schematic combining O-Wind generator coils (orange), bifacial solar panels with front/back reflection sensors, TPV integrated core, C-SPR concentrators, and MPPT controller.',
      imageSrc: getAssetUrl('images/trace_hybrid_architecture.png'),
      icon: Zap,
      highlight: 'O-Wind Coils · Bifacial Solar · TPV Core · MPPT · BMS · C-SPR Array',
      specs: [
        { label: 'Primary Generation', value: 'O-Wind Generator Coils + Bifacial Solar' },
        { label: 'Thermal Harvesting', value: 'TPV Core with Heat/Temp Sensors' },
        { label: 'Optical Concentrator', value: 'C-SPR Concentrator Array Light Pathway' },
        { label: 'Power & Storage', value: 'MPPT Multi-Input & Inverter / BMS' },
      ],
    },
    {
      id: 'dual-deployment',
      category: 'FIELD DEPLOYMENT',
      badge: 'DUAL FIELD BENCHMARK',
      badgeColor: 'bg-cyan-50 text-cyan-900 border-cyan-300',
      title: 'Marine Floating & Urban Dhaka Rooftop Deployment',
      subtitle: 'Side-by-side photographic engineering comparison: Offshore marine floating platform with coral seabed mooring, and Dhaka urban high-rise rooftop parapet installation with IP67 microcontroller.',
      imageSrc: getAssetUrl('images/turbine_rooftop_installation.jpg'),
      icon: Building2,
      highlight: 'Coastal Floating Mooring · Dhaka High-Rise Rooftop · ESP32 IP67 Control',
      specs: [
        { label: 'Marine Deployment', value: 'Submerged Coral Reef Anchor Mooring' },
        { label: 'Urban Deployment', value: 'High-Rise Rooftop Flange Clamped' },
        { label: 'Embedded Controller', value: 'IP67-Rated ESP32 / Arduino Hub' },
        { label: 'Photovoltaic Array', value: 'Dual Tilting Bifacial Solar Panels' },
      ],
    },
    {
      id: 'urban-schematic',
      category: 'ROOFTOP BLUEPRINT',
      badge: 'URBAN CROSS-SECTION',
      badgeColor: 'bg-purple-50 text-purple-900 border-purple-300',
      title: 'Urban High-Rise Rooftop Cutaway Blueprint',
      subtitle: 'Detailed mechanical cross-section showing mounting flange anchored into reinforced concrete building slab, conduit access, vibration monitoring, and ESP32 IoT telemetry.',
      imageSrc: getAssetUrl('images/rooftop_engineering_schematic.png'),
      icon: Cpu,
      highlight: 'Concrete Slab Anchored · Vibration Dampened · IoT Telemetry',
      specs: [
        { label: 'Structural Anchoring', value: 'Reinforced Concrete Building Slab Flange' },
        { label: 'Sensory Array', value: 'TPV Heat, Vibration Sensor, RPM Data' },
        { label: 'Power & Data Trunk', value: 'Central Building Service Access Conduit' },
        { label: 'Smart IoT Hub', value: 'WiFi/GSM IoT Module (ESP32 Integrated)' },
      ],
    },
    {
      id: 'marine-schematic',
      category: 'OFFSHORE BLUEPRINT',
      badge: 'MARINE CUTAWAY',
      badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-300',
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
      badgeColor: 'bg-sky-50 text-sky-900 border-sky-300',
      title: '1:1 Venturi Rotor & Internal Generator Cutaway',
      subtitle: 'High-precision mechanical cutaway showing the spherical aerodynamic Venturi shell, multi-directional rotor blades, permanent magnet stator/rotor assembly, and dual bearing block.',
      imageSrc: getAssetUrl('images/rotor_generator_blueprint.png'),
      icon: Layers,
      highlight: 'Venturi Shell · 360° Omnidirectional · Direct-Drive PMG',
      specs: [
        { label: 'Aerodynamic Shell', value: 'Venturi Effect Outer Spherical Shell' },
        { label: 'Internal Rotor', value: 'Multi-Directional Blades (Translucent Grey)' },
        { label: 'Generator Type', value: 'Permanent Magnet Stator & Rotor Assembly' },
        { label: 'Instrumentation', value: 'Hall Effect RPM Sensor & Shaft Torque Sensor' },
      ],
    },
  ];

  const currentItem = galleryItems.find((item) => item.id === activeTab) || galleryItems[0];

  return (
    <section id="gallery" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <InView>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs font-sans font-bold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>PROJECT & AI VISUAL EVIDENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight font-display leading-[1.16]">
            Turbine Hardware &{' '}
            <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent inline-block pb-1">
              AI Siting in Action.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed max-w-2xl mx-auto">
            Explore physical rooftop installations, neural CFD aerodynamic airflow modeling, and wind tunnel laser validation.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-8">
          {galleryItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                id={`tab-gallery-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                type="button"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-sans font-bold transition-all cursor-pointer select-none border ${
                  isActive
                    ? 'bg-stone-900 text-white border-stone-900 shadow-md scale-[1.02]'
                    : 'bg-white/90 text-stone-600 border-stone-200/90 hover:border-stone-300 hover:text-stone-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-stone-500'}`} />
                <span>{item.category}</span>
              </button>
            );
          })}
        </div>

        {/* Main Visual Showcase Display Card */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border-2 border-stone-200/90 p-4 sm:p-7 shadow-lg relative overflow-hidden">
          <BorderBeam size={260} duration={14} colorFrom="#0284c7" colorTo="#38bdf8" />
          <Spotlight fill="rgba(2, 132, 199, 0.08)" size={240} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Visual Image Viewport with Hover Zoom and Fullscreen Button */}
            <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden border border-stone-200/80 bg-stone-950 shadow-inner flex items-center justify-center min-h-[300px] sm:min-h-[420px]">
              <img
                src={currentItem.imageSrc}
                alt={currentItem.title}
                className="w-full h-[300px] sm:h-[400px] md:h-[460px] object-contain p-2 sm:p-4 transition-transform duration-700 group-hover:scale-[1.02]"
                loading="lazy"
              />

              {/* Top Image Badge */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border shadow-md backdrop-blur-md ${currentItem.badgeColor}`}>
                  {currentItem.badge}
                </span>
              </div>

              {/* Fullscreen Zoom Trigger */}
              <button
                id="btn-expand-image"
                onClick={() => setLightboxImage(currentItem)}
                type="button"
                className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all border border-white/20 shadow-md cursor-pointer group-hover:scale-105"
                title="Expand Full Resolution"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Bottom Quick Spec Pill */}
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-stone-900/85 backdrop-blur-md border border-white/10 text-white flex items-center justify-between text-[11px] font-sans">
                <div className="flex items-center gap-2 truncate">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="font-semibold truncate">{currentItem.highlight}</span>
                </div>
                <span className="text-[10px] text-stone-300 shrink-0 font-mono hidden sm:inline-block">
                  Click to Expand ↗
                </span>
              </div>
            </div>

            {/* Right Information & Telemetry Specs */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full border uppercase ${currentItem.badgeColor}`}>
                  {currentItem.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900 font-display mt-2.5 mb-2 leading-tight">
                  {currentItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                  {currentItem.subtitle}
                </p>
              </div>

              {/* 4 Quantitative Specifications */}
              <div className="grid grid-cols-2 gap-2.5">
                {currentItem.specs.map((spec, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-stone-50 border border-stone-200/90 text-xs">
                    <span className="text-[10px] text-stone-500 font-sans font-semibold uppercase tracking-wider block mb-1">
                      {spec.label}
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-stone-900 block font-mono">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Technical Verification Status */}
              <div className="p-3.5 rounded-2xl bg-cyan-50/60 border border-cyan-200/80 text-xs font-sans text-cyan-950 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse" />
                  <span className="font-bold">Hardware Verification Status:</span>
                </div>
                <span className="font-mono font-bold text-cyan-800">100% Calibrated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
          {galleryItems.map((item) => {
            const isSelected = item.id === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                type="button"
                className={`p-2 rounded-2xl border transition-all text-left group cursor-pointer ${
                  isSelected
                    ? 'border-cyan-500 ring-2 ring-cyan-400/30 bg-cyan-50/20 shadow-md'
                    : 'border-stone-200 bg-white/80 hover:border-stone-300'
                }`}
              >
                <div className="relative rounded-xl overflow-hidden h-20 mb-2 bg-stone-900">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="px-1">
                  <span className="text-[9px] font-mono font-bold text-stone-400 uppercase block">
                    {item.badge}
                  </span>
                  <span className="text-xs font-bold text-stone-900 truncate block font-sans">
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
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-stone-950 rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxImage(null)}
              type="button"
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <img
              src={lightboxImage.imageSrc}
              alt={lightboxImage.title}
              className="w-full max-h-[75vh] object-contain bg-black"
            />

            {/* Modal Footer Specs */}
            <div className="p-5 sm:p-6 bg-stone-900 border-t border-stone-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full border uppercase ${lightboxImage.badgeColor}`}>
                  {lightboxImage.badge}
                </span>
                <h4 className="text-lg font-bold text-white font-display mt-1">
                  {lightboxImage.title}
                </h4>
                <p className="text-xs text-stone-400 font-sans mt-0.5">
                  {lightboxImage.highlight}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLightboxImage(null)}
                  type="button"
                  className="px-4 py-2 rounded-xl bg-white text-stone-900 text-xs font-bold hover:bg-stone-200 transition-colors cursor-pointer"
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
