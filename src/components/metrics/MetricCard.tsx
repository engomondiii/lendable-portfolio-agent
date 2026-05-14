'use client';

import React from 'react';
import { clsx } from 'clsx';

type MetricVariant = 'default' | 'danger' | 'warning' | 'safe';

interface MetricCardProps {
  label: string;
  value: string | number | null;
  subLabel?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: MetricVariant;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<MetricVariant, { border: string; valueCls: string; iconBg: string }> = {
  default: {
    border:   'border-border',
    valueCls: 'text-text-primary',
    iconBg:   'bg-bg-card border-border text-text-muted',
  },
  danger: {
    border:   'border-risk-danger/25',
    valueCls: 'text-risk-danger',
    iconBg:   'bg-risk-danger-bg border-risk-danger/20 text-risk-danger',
  },
  warning: {
    border:   'border-risk-warning/25',
    valueCls: 'text-risk-warning',
    iconBg:   'bg-risk-warning-bg border-risk-warning/20 text-risk-warning',
  },
  safe: {
    border:   'border-risk-safe/25',
    valueCls: 'text-risk-safe',
    iconBg:   'bg-risk-safe-bg border-risk-safe/20 text-risk-safe',
  },
};

const TrendArrow: React.FC<{ trend: 'up' | 'down' | 'neutral'; value?: string }> = ({ trend, value }) => {
  if (trend === 'neutral') return null;
  const isUp = trend === 'up';
  return (
    <div className={clsx('flex items-center gap-1 text-xs font-mono-data', isUp ? 'text-risk-danger' : 'text-risk-safe')}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className={isUp ? '' : 'rotate-180'}>
        <path d="M5 1l4 4H1l4-4z" />
      </svg>
      {value && <span>{value}</span>}
    </div>
  );
};

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subLabel,
  trend,
  trendValue,
  variant = 'default',
  loading = false,
  icon,
  className,
}) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={clsx(
        'bg-bg-elevated border rounded-xl p-5',
        'hover:border-border-strong transition-all duration-200',
        styles.border,
        className
      )}
    >
      {/* Top: icon + trend */}
      <div className="flex items-start justify-between mb-4">
        {icon && (
          <div className={clsx('w-9 h-9 rounded-lg border flex items-center justify-center', styles.iconBg)}>
            {icon}
          </div>
        )}
        {trend && <TrendArrow trend={trend} value={trendValue} />}
      </div>

      {/* Value */}
      {loading ? (
        <div className="skeleton h-9 w-28 rounded mb-2" />
      ) : (
        <div className={clsx('font-mono-data font-bold text-3xl tabular-nums mb-1', styles.valueCls)}>
          {value ?? '—'}
        </div>
      )}

      {/* Labels */}
      {loading ? (
        <div className="skeleton h-4 w-20 rounded" />
      ) : (
        <>
          <p className="text-text-secondary text-sm font-body font-medium">{label}</p>
          {subLabel && (
            <p className="text-text-muted text-xs font-mono-data mt-0.5">{subLabel}</p>
          )}
        </>
      )}
    </div>
  );
};