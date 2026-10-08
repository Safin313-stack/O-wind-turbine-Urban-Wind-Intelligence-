import React from 'react';
import { DataSourceBadge, DataSourceType } from './DataSourceBadge';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
    text?: string;
  };
  accentColor?: 'cyan' | 'green' | 'purple' | 'amber' | 'red';
  badgeType?: DataSourceType;
  subtitle?: string;
  sparklineData?: number[];
  onClick?: () => void;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  icon,
  trend,
  accentColor = 'cyan',
  badgeType,
  subtitle,
  sparklineData,
  onClick,
  className = '',
}) => {
  const accentStyles = {
    cyan: {
      border: 'hover:border-cyan-500/50',
      glow: 'group-hover:shadow-[0_0_20px_-3px_rgba(0,229,255,0.15)]',
      text: 'text-wind-cyan',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      sparkline: '#00E5FF',
    },
    green: {
      border: 'hover:border-emerald-500/50',
      glow: 'group-hover:shadow-[0_0_20px_-3px_rgba(16,185,129,0.15)]',
      text: 'text-energy-green',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      sparkline: '#10B981',
    },
    purple: {
      border: 'hover:border-purple-500/50',
      glow: 'group-hover:shadow-[0_0_20px_-3px_rgba(168,85,247,0.15)]',
      text: 'text-ai-purple',
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      sparkline: '#A855F7',
    },
    amber: {
      border: 'hover:border-amber-500/50',
      glow: 'group-hover:shadow-[0_0_20px_-3px_rgba(245,158,11,0.15)]',
      text: 'text-amber-400',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      sparkline: '#F59E0B',
    },
    red: {
      border: 'hover:border-red-500/50',
      glow: 'group-hover:shadow-[0_0_20px_-3px_rgba(239,68,68,0.15)]',
      text: 'text-rose-400',
      iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      sparkline: '#EF4444',
    },
  }[accentColor];

  // SVG mini sparkline renderer
  const renderSparkline = () => {
    if (!sparklineData || sparklineData.length < 2) return null;
    const min = Math.min(...sparklineData);
    const max = Math.max(...sparklineData);
    const range = max - min || 1;
    const width = 80;
    const height = 24;

    const points = sparklineData.map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height} className="overflow-visible opacity-70 group-hover:opacity-100 transition-opacity">
        <polyline
          fill="none"
          stroke={accentStyles.sparkline}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div
      onClick={onClick}
      className={`group relative bg-space-900/80 backdrop-blur-md rounded-xl p-4 border border-slate-800/80 transition-all duration-200 ${accentStyles.border} ${accentStyles.glow} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Header: Label & Icon */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="stat-label truncate">{label}</span>
        {icon && (
          <div className={`p-1.5 rounded-lg border ${accentStyles.iconBg}`}>
            {icon}
          </div>
        )}
      </div>

      {/* Main Metric Value */}
      <div className="flex items-baseline justify-between gap-2 my-1">
        <div className="flex items-baseline gap-1.5">
          <span className={`text-2xl sm:text-3xl font-mono font-bold tracking-tight text-white`}>
            {value}
          </span>
          {unit && (
            <span className="text-xs sm:text-sm font-mono text-slate-400 font-medium">
              {unit}
            </span>
          )}
        </div>

        {sparklineData && renderSparkline()}
      </div>

      {/* Footer: Trend, Subtitle or Trust Badge */}
      <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-800/60 text-xs">
        {trend ? (
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className={trend.isPositive ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </span>
            {trend.text && <span className="text-slate-400 truncate">{trend.text}</span>}
          </div>
        ) : subtitle ? (
          <span className="text-[11px] text-slate-400 font-mono truncate">{subtitle}</span>
        ) : (
          <span className="text-[11px] text-slate-400 font-mono">Live Telemetry</span>
        )}

        {badgeType && <DataSourceBadge type={badgeType} />}
      </div>
    </div>
  );
};
