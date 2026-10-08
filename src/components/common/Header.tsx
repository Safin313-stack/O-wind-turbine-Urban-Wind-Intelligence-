import React, { useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { soundFx } from '../../utils/audio';
import { WebsiteModeToggle } from './WebsiteModeToggle';
import { 
  MapPin, 
  Activity, 
  Bell, 
  Trophy, 
  Play, 
  Pause, 
  RotateCcw, 
  Globe, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  ChevronDown,
  Sparkles,
  Volume2,
  VolumeX,
  Keyboard,
  X,
  Menu
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    isLiveMode,
    setIsLiveMode,
    isPlaying,
    setIsPlaying,
    resetTelemetry,
    notifications,
    markNotificationAsRead,
    clearNotifications,
    setIsCompetitionModeOpen,
    viewMode,
    setViewMode,
    isMobileMenuOpen,
    toggleMobileMenu,
  } = useTelemetry();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundFx.setMuted(nextMute);
  };

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-space-950/85 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
      {/* Left: Hamburger menu on mobile/split-screen + Location & System Status */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-space-900 border border-slate-800 transition hover:border-slate-700"
          aria-label="Toggle navigation drawer"
          title="Open Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4 text-cyan-400" /> : <Menu className="w-4 h-4" />}
        </button>

        {/* Small Brand Emblem on Mobile */}
        <div className="lg:hidden flex items-center gap-1.5 shrink-0">
          <div className="relative w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px] shadow-glow-cyan">
            <div className="w-full h-full bg-space-950 rounded-[7px] flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin-slow" />
            </div>
          </div>
          <span className="font-mono font-bold text-xs tracking-wider text-white hidden xs:inline">
            O-WIND
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 bg-space-900/90 border border-slate-800 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-mono text-slate-200">
          <MapPin className="w-3.5 h-3.5 text-wind-cyan shrink-0" />
          <span className="font-semibold text-white truncate">Dhaka</span>
          <span className="hidden sm:inline font-semibold text-white">, BD</span>
          <span className="hidden md:inline text-slate-400">·</span>
          <span className="hidden md:inline text-[11px] text-slate-400">Gulshan #1</span>
        </div>

        {/* Live Hardware/Telemetry Heartbeat */}
        <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-semibold tracking-wide">
            {isLiveMode ? 'LIVE TELEMETRY (48ms)' : 'DEMO ENGINE RUNNING'}
          </span>
        </div>
      </div>

      {/* Right: Actions, Simulation Controls, Competition Mode, Audio, Notifications */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Audio Mute/Unmute Toggle */}
        <button
          onClick={toggleMute}
          className={`p-2 rounded-lg border font-mono text-xs transition flex items-center gap-1.5 ${
            !isMuted
              ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-glow-cyan'
              : 'bg-space-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
          title={isMuted ? 'Unmute Acoustic Feedback' : 'Mute Acoustic Feedback'}
          aria-label="Toggle sound"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
          <span className="hidden xl:inline text-[10px]">{isMuted ? 'MUTED' : 'AUDIO ON'}</span>
        </button>

        {/* Play/Pause & Reset Simulation */}
        <div className="hidden sm:flex items-center gap-1 bg-space-900/90 border border-slate-800 rounded-lg p-1">
          <button
            onClick={() => {
              soundFx.playClick();
              setIsPlaying(!isPlaying);
            }}
            className={`p-1.5 rounded transition ${
              isPlaying
                ? 'text-emerald-400 hover:bg-emerald-500/10'
                : 'text-amber-400 hover:bg-amber-500/10'
            }`}
            title={isPlaying ? 'Pause Simulation' : 'Resume Simulation'}
            aria-label={isPlaying ? 'Pause Simulation' : 'Resume Simulation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              resetTelemetry();
            }}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
            title="Reset Telemetry Data"
            aria-label="Reset telemetry data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live vs Demo Mode Toggle with Sliding Animation */}
        <div className="relative flex items-center bg-space-900/90 border border-slate-800 rounded-lg p-0.5 text-[11px] font-mono shadow-inner">
          {/* Animated sliding thumb */}
          <div
            className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-md transition-all duration-300 ease-out ${
              !isLiveMode
                ? 'left-0.5 bg-cyan-500/25 border border-cyan-500/50 shadow-sm'
                : 'left-[calc(50%+2px)] bg-emerald-500/25 border border-emerald-500/50 shadow-sm'
            }`}
          />
          <button
            onClick={() => {
              soundFx.playClick();
              setIsLiveMode(false);
            }}
            className={`relative z-10 px-2.5 py-1 rounded font-semibold transition-all ${
              !isLiveMode
                ? 'text-cyan-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            DEMO
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setIsLiveMode(true);
            }}
            className={`relative z-10 px-2.5 py-1 rounded font-semibold transition-all ${
              isLiveMode
                ? 'text-emerald-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            LIVE
          </button>
        </div>

        {/* Competition Presentation Mode Launch Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            setIsCompetitionModeOpen(true);
          }}
          className="relative group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600/30 to-indigo-600/30 hover:from-purple-600/40 hover:to-indigo-600/40 border border-purple-500/50 text-purple-200 text-xs font-semibold shadow-glow-purple transition-all"
          title="Launch 5-Minute Competition Presentation Sequence"
        >
          <Trophy className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
          <span className="hidden sm:inline">COMPETITION MODE</span>
          <span className="sm:hidden">COMPETE</span>
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
          </span>
        </button>

        {/* Animated Website / Platform Mode Switcher Toggle (Always Visible) */}
        <div className="flex items-center">
          <div className="hidden sm:block">
            <WebsiteModeToggle variant="standard" />
          </div>
          <div className="sm:hidden">
            <WebsiteModeToggle variant="compact" />
          </div>
        </div>

        {/* Keyboard Shortcuts Dialog Button */}
        <button
          onClick={() => setShortcutsOpen(true)}
          className="p-2 rounded-lg bg-space-900/90 border border-slate-800 text-slate-400 hover:text-white transition"
          title="Keyboard Navigation Shortcuts"
          aria-label="Keyboard Shortcuts"
        >
          <Keyboard className="w-4 h-4" />
        </button>

        {/* Notification Center */}
        <div className="relative">
          <button
            onClick={() => {
              soundFx.playClick();
              setIsNotifOpen(!isNotifOpen);
            }}
            className="relative p-2 rounded-lg bg-space-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
            title="Notifications and AI Insights"
            aria-label="Toggle notifications menu"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-[10px] font-mono font-bold text-black flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Drawer */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-space-900/95 backdrop-blur-xl border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-ai-purple" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
                    AI Insights & Telemetry
                  </span>
                </div>
                {notifications.length > 0 && (
                  <button
                    onClick={clearNotifications}
                    className="text-[11px] text-slate-400 hover:text-slate-200 font-mono"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60 p-1">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs font-mono text-slate-400">
                    No active alerts. Grid telemetry is nominal.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-3 hover:bg-space-850/80 cursor-pointer rounded-lg transition ${
                        !n.read ? 'bg-space-850/40' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5">
                          {n.type === 'ai' && <Sparkles className="w-4 h-4 text-ai-purple" />}
                          {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                          {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                          {n.type === 'info' && <Info className="w-4 h-4 text-cyan-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-semibold text-white truncate">
                              {n.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono shrink-0">
                              {n.timestamp}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            {n.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Keyboard Shortcuts Modal */}
      {shortcutsOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-space-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Keyboard className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-white text-sm">Keyboard Shortcuts</h3>
              </div>
              <button
                onClick={() => setShortcutsOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-slate-300">
              <div className="flex items-center justify-between p-2 rounded bg-space-950 border border-slate-800">
                <span>Toggle Competition Mode</span>
                <kbd className="px-2 py-0.5 rounded bg-space-850 text-cyan-300 border border-slate-700">C</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-space-950 border border-slate-800">
                <span>Pause / Resume Telemetry</span>
                <kbd className="px-2 py-0.5 rounded bg-space-850 text-cyan-300 border border-slate-700">Space</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-space-950 border border-slate-800">
                <span>Toggle Landing / Command Center</span>
                <kbd className="px-2 py-0.5 rounded bg-space-850 text-cyan-300 border border-slate-700">L</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-space-950 border border-slate-800">
                <span>Toggle Audio Feedback</span>
                <kbd className="px-2 py-0.5 rounded bg-space-850 text-cyan-300 border border-slate-700">M</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-space-950 border border-slate-800">
                <span>Quick Jump Pages</span>
                <kbd className="px-2 py-0.5 rounded bg-space-850 text-cyan-300 border border-slate-700">1 – 9</kbd>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
