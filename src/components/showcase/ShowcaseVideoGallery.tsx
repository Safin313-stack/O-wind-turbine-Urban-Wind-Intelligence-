import React, { useState } from 'react';
import { Play, X, Video, ChevronDown, ChevronUp } from 'lucide-react';
import { InView, Spotlight, Tilt } from '../motion-primitives';

export interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Invention & Design' | 'Aerodynamics & Testing' | 'Field Deployment';
  duration: string;
  youtubeId: string;
  thumbnailUrl: string;
  highlight: string;
  specs: { label: string; value: string }[];
  description: string;
}

export const ShowcaseVideoGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  const videoInventory: VideoItem[] = [
    {
      id: 'dyson-winner',
      title: 'O-Wind Turbine: James Dyson Award International Winner',
      subtitle: 'Official invention presentation by Nicolas Orellana & Yaseen Noorani.',
      category: 'Invention & Design',
      duration: '02:45',
      youtubeId: 'k4UqJ8FwJb8',
      thumbnailUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
      highlight: 'International James Dyson Award Winner · 360° Omnidirectional Intake',
      specs: [
        { label: 'Inventors', value: 'N. Orellana & Y. Noorani' },
        { label: 'Recognition', value: 'James Dyson Award' },
        { label: 'Core Principle', value: 'Bernoulli Venturi Duct' },
        { label: 'Target Setting', value: 'Dense Urban Facades' },
      ],
      description: 'The breakthrough demonstration showing why conventional bladed turbines stall in chaotic urban winds and how the geodetic spherical O-Wind rotor spins continuously on a single axis regardless of wind direction.',
    },
    {
      id: 'aerodynamics-testing',
      title: 'Venturi Aerodynamics & Controlled Wind Tunnel Testing',
      subtitle: 'Fluid dynamics flow visualization of cross-ducted intake ports.',
      category: 'Aerodynamics & Testing',
      duration: '03:20',
      youtubeId: '5a2xW3qZ_W8',
      thumbnailUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
      highlight: 'Particle Image Velocimetry · Cut-in Speed 1.48 m/s · Zero Yaw Delay',
      specs: [
        { label: 'Wind Tunnel Range', value: '1.4 to 12.0 m/s' },
        { label: 'Measured Cut-in', value: '1.48 m/s Cut-in' },
        { label: 'Vorticity Gain', value: '+40% Facade Lift' },
        { label: 'Acoustics', value: '<28 dBA Whisper Silent' },
      ],
      description: 'Controlled wind tunnel smoke stream visualization validating that air entering horizontal or vertical apertures accelerates through internal Venturi channels to deliver continuous unidirectional rotation.',
    },
    {
      id: 'rooftop-dhaka',
      title: 'Urban Rooftop Updraft & Neural Parapet Siting Validation',
      subtitle: 'Field evaluation on high-rise building lips in Dhaka, Bangladesh.',
      category: 'Field Deployment',
      duration: '04:15',
      youtubeId: '9No-FiEInLA',
      thumbnailUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      highlight: 'Dhaka Rooftop Updraft · Edge Microgrid · Integrated PM2.5 Air Sentinel',
      specs: [
        { label: 'Deployment Site', value: 'Dhaka High-Rise Rooftop' },
        { label: 'Updraft Boost', value: '+40% Updraft Velocity' },
        { label: 'Sensory Telemetry', value: 'Plantower PMS7003 Laser' },
        { label: 'Buffer Battery', value: '3.7V LiFePO4 Energy Cell' },
      ],
      description: 'Field telemetry test verifying that high-velocity airflow accelerating up the vertical building facade is harvested at the rooftop parapet, continuously charging the LiFePO4 battery and powering IoT sensors.',
    },
    {
      id: 'marine-offshore',
      title: 'Offshore Floating Platform & Submerged Power Station',
      subtitle: 'Hexagonal marine pontoon mooring and underwater battery testing.',
      category: 'Field Deployment',
      duration: '03:50',
      youtubeId: 'E_7wG8MvE0k',
      thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      highlight: 'Hexagonal Pontoon · Coral Seabed Mooring · Waterproof IP67 Enclosure',
      specs: [
        { label: 'Platform Type', value: 'Self-Righting Hex Pontoon' },
        { label: 'Mooring Rig', value: 'Tension-Balanced Tether' },
        { label: 'Battery Pod', value: 'Submerged Watertight LiFePO4' },
        { label: 'Telemetry Link', value: 'ESP32 LoRa / Cellular Hub' },
      ],
      description: 'Engineering demonstration of the offshore floating O-Wind configuration, showing how marine wave motion and multidirectional sea breezes are harvested while isolating sensitive electronics in an IP67 submerged enclosure.',
    },
  ];

  const categories = ['All', 'Invention & Design', 'Aerodynamics & Testing', 'Field Deployment'];

  const filteredVideos = videoInventory.filter(
    (v) => selectedCategory === 'All' || v.category === selectedCategory
  );

  const displayedVideos = showAll ? filteredVideos : filteredVideos.slice(0, 3);

  return (
    <section id="videos" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <InView>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22262C] border border-[#2E343D] text-[#FF8A24] text-xs font-mono font-bold tracking-wide shadow-xs">
            <Video className="w-3.5 h-3.5 text-[#FF8A24]" />
            <span>ENGINEERING DEMONSTRATIONS & VIDEO ARCHIVE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#F5F5F2] tracking-tight font-display leading-[1.16]">
            Prototype Action,{' '}
            <span className="text-gradient-orange inline-block pb-1">
              Recorded in the Field.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#A7ADB5] font-sans leading-relaxed max-w-2xl mx-auto">
            Explore verified video demonstrations covering the original James Dyson Award winning presentation, wind tunnel smoke flow analysis, and Dhaka rooftop field testing.
          </p>

          {/* Category Filter Pills (Mobile Scrollable) */}
          <div className="flex items-center justify-center gap-2 pt-3 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowAll(false);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-sans font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#FF8A24] text-white shadow-md shadow-[#FF8A24]/20 font-bold'
                    : 'bg-[#22262C] text-[#A7ADB5] hover:text-[#F5F5F2] border border-[#2E343D]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayedVideos.map((video) => (
            <Tilt key={video.id} rotationFactor={3} className="h-full">
              <div
                className="bg-[#22262C] border border-[#2E343D] hover:border-[#FF8A24]/50 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between h-full group transition-all duration-300 relative overflow-hidden shadow-lg shadow-black/40"
              >
                <Spotlight fill="rgba(255, 138, 36, 0.08)" size={180} />

                <div>
                  {/* Video Thumbnail with Interactive Play Button */}
                  <div
                    onClick={() => setActiveVideo(video)}
                    className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-video bg-black/60 cursor-pointer group-hover:scale-[1.01] transition-transform duration-300 mb-3.5 border border-[#2E343D]"
                  >
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    {/* Play Button Pill Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FF8A24] text-white flex items-center justify-center shadow-lg shadow-[#FF8A24]/30 group-hover:scale-110 group-hover:bg-[#FFA14E] transition-all">
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* Category & Duration Badges */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#17191D]/85 text-[#FF8A24] border border-[#2E343D] backdrop-blur-md">
                        {video.category}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/80 text-white backdrop-blur-md border border-white/10">
                      {video.duration}
                    </div>
                  </div>

                  {/* Video Information */}
                  <div className="space-y-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-[#F5F5F2] font-display leading-snug group-hover:text-[#FF8A24] transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-[#A7ADB5] font-sans leading-relaxed line-clamp-2">
                      {video.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Technical Spec Highlight */}
                <div className="pt-3 mt-3 border-t border-[#2E343D] flex items-center justify-between text-[11px] font-sans">
                  <span className="text-[#FF8A24] font-semibold truncate pr-2">
                    {video.highlight.split('·')[0]}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveVideo(video)}
                    className="shrink-0 text-xs font-bold text-white hover:text-[#FF8A24] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Watch</span>
                    <Play className="w-3 h-3 fill-current" />
                  </button>
                </div>
              </div>
            </Tilt>
          ))}
        </div>

        {/* View All / Collapse Toggle */}
        {filteredVideos.length > 3 && (
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#22262C] hover:bg-[#282D35] border border-[#2E343D] text-[#F5F5F2] hover:text-[#FF8A24] text-xs font-sans font-bold transition-all shadow-md cursor-pointer active:scale-95"
            >
              <span>{showAll ? 'Show Fewer Videos' : `View All ${filteredVideos.length} Videos`}</span>
              {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}

        {/* Responsive Video Playback Modal */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="relative w-full max-w-3xl bg-[#17191D] border border-[#2E343D] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 bg-[#22262C] border-b border-[#2E343D] flex items-center justify-between">
                <div className="flex items-center gap-2 truncate pr-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#17191D] text-[#FF8A24] border border-[#2E343D]">
                    {activeVideo.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#F5F5F2] font-display truncate">
                    {activeVideo.title}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="p-1.5 rounded-full bg-[#17191D] text-[#A7ADB5] hover:text-white border border-[#2E343D] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Embedded Player (Responsive 16:9) */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Modal Details & Specs */}
              <div className="p-4 sm:p-6 space-y-3 bg-[#17191D] text-xs font-sans">
                <p className="text-[#A7ADB5] leading-relaxed">
                  {activeVideo.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#2E343D]">
                  {activeVideo.specs.map((s, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-[#22262C] border border-[#2E343D]">
                      <span className="text-[10px] text-[#A7ADB5] font-mono block uppercase">{s.label}</span>
                      <span className="text-xs font-bold text-[#F5F5F2] block font-mono mt-0.5">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </InView>
    </section>
  );
};
