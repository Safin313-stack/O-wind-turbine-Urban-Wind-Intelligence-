import React from 'react';

interface AuroraBackgroundProps {
  className?: string;
}

/**
 * ArchitecturalBackground: Professional, Swiss-inspired engineering backdrop.
 * Replaces generative AI colorful blobs with precision CAD hairlines,
 * subtle micro-dot grid alignment, and a calm daylight architectural vignette.
 */
export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
    >
      {/* 1. Base Calm Editorial Canvas (#FAFAF9 with soft Slate-50 gradient) */}
      <div className="absolute inset-0 bg-[#FAFAF9]" />

      {/* 2. Soft Ambient Daylight Top Vignette (Subtle Natural Horizon) */}
      <div
        className="absolute top-0 left-0 right-0 h-[640px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(2, 132, 199, 0.045) 0%, rgba(14, 165, 233, 0.015) 50%, transparent 100%)',
        }}
      />

      {/* 3. Precision Engineering CAD Hairline Grid (36px x 36px) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0f172a 1px, transparent 1px),
            linear-gradient(to bottom, #0f172a 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
        }}
      />

      {/* 4. Fine Blueprint Intersection Micro-Dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle at 18px 18px, #0f172a 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* 5. Clean Edge Fade-Out Vignette for Soft Margins */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 95% 90% at 50% 50%, transparent 60%, rgba(250, 249, 246, 0.7) 100%)',
        }}
      />
    </div>
  );
};
