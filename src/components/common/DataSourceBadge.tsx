import React from 'react';

export type DataSourceType = 'demo' | 'live' | 'reference';

interface DataSourceBadgeProps {
  type?: DataSourceType;
  className?: string;
  isLive?: boolean;
}

export const DataSourceBadge: React.FC<DataSourceBadgeProps> = ({
  type,
  className = '',
  isLive = false,
}) => {
  // If type is not explicitly provided, infer from isLive
  const currentType: DataSourceType = type || (isLive ? 'live' : 'demo');

  if (currentType === 'live') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        LIVE SENSOR DATA
      </span>
    );
  }

  if (currentType === 'reference') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/30 ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
        REFERENCE PROTOTYPE RESULT
      </span>
    );
  }

  // Demo / simulation default
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
      DEMO DATA
    </span>
  );
};
