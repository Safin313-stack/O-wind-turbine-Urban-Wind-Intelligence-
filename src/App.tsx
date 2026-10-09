import React from 'react';
import { TelemetryProvider, useTelemetry } from './context/TelemetryContext';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

// Showcase (Public Editorial Website)
import { ShowcaseNavbar } from './components/showcase/ShowcaseNavbar';
import { ShowcaseHero } from './components/showcase/ShowcaseHero';
import { Showcase3DStage } from './components/showcase/Showcase3DStage';
import { ShowcaseProblemSolution } from './components/showcase/ShowcaseProblemSolution';
import { ShowcaseBentoGrid } from './components/showcase/ShowcaseBentoGrid';
import { ShowcaseSimulator } from './components/showcase/ShowcaseSimulator';
import { ShowcaseSpecifications } from './components/showcase/ShowcaseSpecifications';
import { ShowcaseAbout } from './components/showcase/ShowcaseAbout';
import { ShowcaseFooter } from './components/showcase/ShowcaseFooter';
import { ScrollProgress } from './components/motion-primitives';

// Platform (AI Smart-City Command Center Desktop App)
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
import { WebsiteModeToggle } from './components/common/WebsiteModeToggle';
import { AuroraBackground } from './components/common/AuroraBackground';

const AppContent: React.FC = () => {
  const { activePage, viewMode } = useTelemetry();

  // Register global shortcuts: C (Competition Demo), Space (Pause/Resume), L (Toggle Website/Platform), M (Mute), 1-9 (Quick Switch)
  useKeyboardShortcuts();

  if (viewMode === 'landing') {
    return (
      <div className="min-h-screen bg-[#FAFAF9] text-stone-900 flex flex-col antialiased selection:bg-cyan-500/25 selection:text-cyan-950 relative overflow-x-hidden animate-fade-in font-sans">
        {/* Precision Architectural Engineering Background */}
        <AuroraBackground />

        {/* Motion Primitives Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Modern Glassmorphic Top Navbar */}
        <ShowcaseNavbar />

        {/* Clean Showcase Content */}
        <main className="flex-1">
          {/* 1. Hero Section with Motion Primitives Radial Lights */}
          <ShowcaseHero />

          {/* 2. Interactive SolidWorks 3D CAD Twin Showcase */}
          <Showcase3DStage />

          {/* 3. Aerodynamics: Why Traditional Turbines Fail vs O-Wind Solution */}
          <ShowcaseProblemSolution />

          {/* 4. Motion Primitives Bento Grid: 5 Core Technological Pillars */}
          <ShowcaseBentoGrid />

          {/* 5. Interactive Physics & Edge Microgrid Simulator */}
          <ShowcaseSimulator />

          {/* 6. High-Fidelity Engineering Specifications */}
          <ShowcaseSpecifications />

          {/* 7. Project Background, Vision & Research Rationale */}
          <ShowcaseAbout />
        </main>

        {/* Clean Minimalist Footer */}
        <ShowcaseFooter />

        {/* 5-Minute Competition Presentation Modal (Press C) */}
        <CompetitionModeModal />

        {/* Persistent Floating Mode Switcher */}
        <WebsiteModeToggle variant="floating" />
      </div>
    );
  }

  // Smart-City Command Center Platform
  return (
    <div className="min-h-screen bg-space-950 text-slate-100 flex flex-col antialiased animate-fade-in relative font-sans">
      {/* Ambient Deep Space Glows */}
      <div className="fixed top-0 right-1/4 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-1/3 w-[500px] h-[300px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Permanent Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
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

export const App: React.FC = () => {
  return (
    <TelemetryProvider>
      <AppContent />
    </TelemetryProvider>
  );
};

export default App;
