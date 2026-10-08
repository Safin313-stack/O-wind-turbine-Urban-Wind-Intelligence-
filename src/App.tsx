import React from 'react';
import { TelemetryProvider, useTelemetry } from './context/TelemetryContext';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { DashboardView } from './components/dashboard/DashboardView';
import { LiveTurbineView } from './components/liveTurbine/LiveTurbineView';
import { AiSiteOptimizerView } from './components/optimizer/AiSiteOptimizerView';
import { UrbanWindView } from './components/urbanWind/UrbanWindView';
import { EnergyManagementView } from './components/energy/EnergyManagementView';
import { AirIntelligenceView } from './components/air/AirIntelligenceView';
import { PollutionForecastView } from './components/forecast/PollutionForecastView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { BangladeshMapView } from './components/bangladeshMap/BangladeshMapView';
import { ResearchLabView } from './components/researchLab/ResearchLabView';
import { ProjectView } from './components/project/ProjectView';
import { SettingsView } from './components/settings/SettingsView';
import { CompetitionModeModal } from './components/competition/CompetitionModeModal';
import { LandingPageView } from './components/landing/LandingPageView';
import { WebsiteModeToggle } from './components/common/WebsiteModeToggle';

const AppContent: React.FC = () => {
  const { activePage, viewMode } = useTelemetry();

  // Register global judge keyboard shortcuts (C, Space, L, M, 1-9)
  useKeyboardShortcuts();

  // If public landing page view is selected
  if (viewMode === 'landing') {
    return (
      <div className="relative animate-fade-in">
        <LandingPageView />
        <CompetitionModeModal />
        <WebsiteModeToggle variant="floating" />
      </div>
    );
  }

  // Smart-City Command Center Desktop App Shell
  return (
    <div className="min-h-screen bg-space-950 text-slate-100 flex flex-col antialiased animate-fade-in relative">
      {/* Permanent Left Sidebar on Desktop */}
      <Sidebar />

      {/* Main Content Area (Offset by 64px on desktop) */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        {/* Sticky Header with Dhaka Location, Audio Toggle, Telemetry Controls */}
        <Header />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {activePage === 'dashboard' && <DashboardView />}
          {activePage === 'live-turbine' && <LiveTurbineView />}
          {activePage === 'optimizer' && <AiSiteOptimizerView />}
          {activePage === 'urban-wind' && <UrbanWindView />}
          {activePage === 'energy' && <EnergyManagementView />}
          {activePage === 'air' && <AirIntelligenceView />}
          {activePage === 'pollution-forecast' && <PollutionForecastView />}
          {activePage === 'analytics' && <AnalyticsView />}
          {activePage === 'bangladesh-map' && <BangladeshMapView />}
          {activePage === 'research-lab' && <ResearchLabView />}
          {activePage === 'project' && <ProjectView />}
          {activePage === 'settings' && <SettingsView />}
        </main>

        {/* Command Center Footer */}
        <footer className="mt-auto border-t border-slate-800/80 bg-space-950/90 py-4 px-6 text-xs font-mono text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>O-WIND AI Platform · Active Microgrid Node: Dhaka, Bangladesh</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-space-900 border border-slate-700 text-slate-300">C</kbd> for Judge Demo</span>
            <span>·</span>
            <span>University Sustainable Technology Competition 2026</span>
          </div>
        </footer>
      </div>

      {/* 5-Minute Guided Judge Competition Presentation Modal */}
      <CompetitionModeModal />

      {/* Persistent Floating Mode Switcher */}
      <WebsiteModeToggle variant="floating" />
    </div>
  );
};

export function App() {
  return (
    <TelemetryProvider>
      <AppContent />
    </TelemetryProvider>
  );
}

export default App;
