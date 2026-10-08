import React, { useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { NavPage } from '../../types';
import { WebsiteModeToggle } from './WebsiteModeToggle';
import {
  LayoutDashboard,
  Gauge,
  Cpu,
  Wind,
  Zap,
  CloudSun,
  LineChart,
  MapPin,
  FlaskConical,
  BookOpen,
  Settings,
  Sparkles,
  ChevronRight,
  Menu,
  X,
  Trophy,
  Globe
} from 'lucide-react';

interface NavItem {
  id: NavPage;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    isLiveMode, 
    setIsCompetitionModeOpen, 
    isMobileMenuOpen, 
    setIsMobileMenuOpen 
  } = useTelemetry();

  const NAV_ITEMS: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'live-turbine', label: 'Live Turbine', icon: <Gauge className="w-4 h-4" />, badge: '3D', badgeColor: 'bg-cyan-500/20 text-cyan-300' },
    { id: 'optimizer', label: 'AI Site Optimizer', icon: <Cpu className="w-4 h-4" />, badge: 'AI', badgeColor: 'bg-purple-500/20 text-purple-300' },
    { id: 'urban-wind', label: 'Urban Wind', icon: <Wind className="w-4 h-4" /> },
    { id: 'energy', label: 'Energy Management', icon: <Zap className="w-4 h-4" /> },
    { id: 'air', label: 'Air Intelligence', icon: <CloudSun className="w-4 h-4" />, badge: 'AQI', badgeColor: 'bg-emerald-500/20 text-emerald-300' },
    { id: 'pollution-forecast', label: 'Pollution Forecast', icon: <Sparkles className="w-4 h-4" />, badge: 'ML', badgeColor: 'bg-purple-500/20 text-purple-300' },
    { id: 'analytics', label: 'Analytics', icon: <LineChart className="w-4 h-4" /> },
    { id: 'bangladesh-map', label: 'Bangladesh Map', icon: <MapPin className="w-4 h-4" /> },
    { id: 'research-lab', label: 'Research Lab', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'project', label: 'Project & SDGs', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleNavClick = (id: NavPage) => {
    setActivePage(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Backdrop for mobile drawer */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Permanent Desktop Sidebar & Mobile Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-space-950 border-r border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0 shadow-2xl shadow-cyan-950/60" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Spinning Aerodynamic Emblem */}
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-purple-600 p-[1.5px] shadow-glow-cyan">
              <div className="w-full h-full bg-space-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-emerald-400 border-b-transparent rounded-full animate-spin-slow" />
                <div className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-extrabold text-base tracking-wider text-white">
                  O-WIND
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  AI
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest truncate">
                Urban Clean Energy
              </span>
            </div>
          </div>

          {/* Close button for mobile inside drawer */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-md"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Animated Website / Platform Mode Switcher on Left Side */}
        <div className="px-3 pt-3 pb-2.5 border-b border-slate-800/80 bg-space-900/40">
          <div className="flex items-center justify-between text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-1.5 px-1">
            <span>Toggle View Mode</span>
            <span className="text-wind-cyan font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              LIVE
            </span>
          </div>
          <WebsiteModeToggle variant="standard" className="w-full" />
        </div>

        {/* Navigation Link List */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1 scrollbar-thin">
          <div className="px-3 pb-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
            Navigation
          </div>

          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-cyan-500/10 text-white border border-cyan-500/30 shadow-[0_0_15px_-3px_rgba(0,229,255,0.15)] font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-space-900/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`transition-colors ${isActive ? 'text-wind-cyan' : 'text-slate-400 group-hover:text-slate-300'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border border-white/5 font-semibold ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-wind-cyan" />}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Quick Competition Launcher inside Sidebar */}
        <div className="p-3 mx-3 mb-2 rounded-xl bg-gradient-to-b from-purple-950/40 to-space-900 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-1.5">
            <Trophy className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono font-bold text-white">5-Min Judge Demo</span>
          </div>
          <p className="text-[11px] text-slate-400 mb-2 leading-tight">
            Launch guided 8-stage interactive visual sequence.
          </p>
          <button
            onClick={() => {
              setIsCompetitionModeOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full py-1.5 px-2.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/40 border border-purple-500/40 text-purple-200 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition"
          >
            <span>Start Judge Mode</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom System Status */}
        <div className="p-4 border-t border-slate-800/80 bg-space-950/80">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">System Status</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isLiveMode ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400 animate-ping'}`} />
              <span className={`font-semibold ${isLiveMode ? 'text-emerald-400' : 'text-cyan-400'}`}>
                {isLiveMode ? 'LIVE' : 'DEMO MODE'}
              </span>
            </div>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center justify-between">
            <span>Turbine Rev: v2.4</span>
            <span>Dhaka Node 01</span>
          </div>
        </div>
      </aside>
    </>
  );
};
