import React, { useState } from 'react';
import { 
  Building2, 
  Cpu, 
  Activity, 
  Layers, 
  Maximize2, 
  CheckCircle2, 
  ArrowUpRight,
  Sparkles,
  X
} from 'lucide-react';
import { InView, Spotlight, BorderBeam, Tilt } from '../motion-primitives';

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
  const [activeTab, setActiveTab] = useState<string>('turbine-mount');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'turbine-mount',
      category: 'PHYSICAL DEPLOYMENT',
      badge: 'FIELD BENCHMARK',
      badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      title: 'Rooftop Parapet Clamped Installation',
      subtitle: 'Real-world high-altitude installation on a modern high-rise parapet lip, harvesting 360° omnidirectional air currents and building facade updrafts.',
      imageSrc: '/images/turbine_rooftop_installation.jpg',
      icon: Building2,
      highlight: '360° Omni Intake · Zero Yaw Motors · <24 dB Silent',
      specs: [
        { label: 'Deployment Location', value: 'Skyscraper Parapet Lip' },
        { label: 'Intake Mechanism', value: 'Spherical Bernoulli Venturi' },
        { label: 'Yaw Motors Required', value: 'Zero (Static Spindle)' },
        { label: 'Acoustic Level', value: '<24 dB (Whisper Silent)' },
      ],
    },
    {
      id: 'ai-cfd',
      category: 'AI NEURAL SITING',
      badge: 'AI CFD SIMULATION',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
      title: 'Facade Updraft Neural Flow Modeling',
      subtitle: 'Deep-learning accelerated computational fluid dynamics (CFD) revealing wind streamlines rising vertically up the building facade and accelerating over the parapet.',
      imageSrc: '/images/ai_cfd_simulation.jpg',
      icon: Cpu,
      highlight: '+40% Acceleration at Lip · 18,750 Neural Iterations',
      specs: [
        { label: 'Max Accelerated Flow', value: '18.7 m/s @ Lip' },
        { label: 'Optimization Engine', value: 'Physics-Informed Neural Net' },
        { label: 'Pressure Contours', value: 'Bernoulli Differential' },
        { label: 'Placement Lift', value: '+40% Wind Velocity Gain' },
      ],
    },
    {
      id: 'wind-tunnel',
      category: 'LAB BENCHMARK',
      badge: 'WIND TUNNEL TESTING',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      title: 'Laser Velocimetry & Smoke Stream Validation',
      subtitle: 'Physical scale prototype evaluated under controlled aerodynamic flow; precision smoke tracer streams confirm internal Venturi suction and ultra-low cut-in speed.',
      imageSrc: '/images/wind_tunnel_testing.jpg',
      icon: Activity,
      highlight: '1.48 m/s Cut-in Breeze · 0.496 W Initial Power',
      specs: [
        { label: 'Cut-in Wind Speed', value: '1.48 m/s (Light Breeze)' },
        { label: 'Flow Visualization', value: 'Smoke Stream Tracers' },
        { label: 'Particle Tracking', value: 'Laser Doppler Velocimetry' },
        { label: 'Output @ 1.48 m/s', value: '0.496 W Baseline' },
      ],
    },
    {
      id: 'cad-twin',
      category: 'SOLIDWORKS CAD TWIN',
      badge: 'MECHANICAL ASSEMBLY',
      badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
      title: '1:1 Internal Generator & Rotor Assembly',
      subtitle: 'Precision mechanical assembly showing internal 12-pole permanent magnet generator (PMG), dual ceramic low-friction bearings, and enclosed safety geometry.',
      imageSrc: '/images/prototype_cad_reference.png',
      icon: Layers,
      highlight: '12-Pole Direct PMG · Dual Ceramic Bearings · 0.48m Radius',
      specs: [
        { label: 'Outer Diameter', value: '0.48 m Compact Envelope' },
        { label: 'Generator Type', value: '12-Pole Direct-Drive PMG' },
        { label: 'Bearing Assembly', value: 'Dual Ceramic Low-Friction' },
        { label: 'Safety Enclosure', value: '100% Bird-Safe Enclosed' },
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
            <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden border border-stone-200/80 bg-stone-950 shadow-inner">
              <img
                src={currentItem.imageSrc}
                alt={currentItem.title}
                className="w-full h-[280px] sm:h-[380px] md:h-[440px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
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
