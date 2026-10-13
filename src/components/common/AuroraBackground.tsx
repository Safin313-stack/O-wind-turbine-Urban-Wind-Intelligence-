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
      {/* 1. Base Charcoal / Deep Graphite Industrial Canvas (#17191D) */}
      <div className="absolute inset-0 bg-[#17191D]" />

      {/* 2. Soft Ambient Engineering Glow (Restrained Orange & Cyan Horizon) */}
      <div
        className="absolute top-0 left-0 right-0 h-[640px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255, 138, 36, 0.05) 0%, rgba(6, 182, 212, 0.03) 50%, transparent 100%)',
        }}
      />

      {/* 3. Precision Engineering CAD Hairline Grid (36px x 36px) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #F5F5F2 1px, transparent 1px),
            linear-gradient(to bottom, #F5F5F2 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
        }}
      />

      {/* 4. Fine Blueprint Intersection Micro-Dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle at 18px 18px, #FF8A24 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* 5. Clean Edge Fade-Out Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 95% 90% at 50% 50%, transparent 65%, rgba(23, 25, 29, 0.8) 100%)',
        }}
      />
    </div>
  );
};
