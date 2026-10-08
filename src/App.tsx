import React from 'react';
import { TelemetryProvider } from './context/TelemetryContext';
import { ShowcaseNavbar } from './components/showcase/ShowcaseNavbar';
import { ShowcaseHero } from './components/showcase/ShowcaseHero';
import { Showcase3DStage } from './components/showcase/Showcase3DStage';
import { ShowcaseProblemSolution } from './components/showcase/ShowcaseProblemSolution';
import { ShowcaseBentoGrid } from './components/showcase/ShowcaseBentoGrid';
import { ShowcaseSimulator } from './components/showcase/ShowcaseSimulator';
import { ShowcaseSpecifications } from './components/showcase/ShowcaseSpecifications';
import { ShowcaseAbout } from './components/showcase/ShowcaseAbout';
import { ShowcaseFooter } from './components/showcase/ShowcaseFooter';

export const App: React.FC = () => {
  return (
    <TelemetryProvider>
      <div className="min-h-screen bg-[#FAF9F6] text-stone-900 flex flex-col antialiased selection:bg-cyan-500/20 selection:text-cyan-900 relative overflow-x-hidden">
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
      </div>
    </TelemetryProvider>
  );
};

export default App;
