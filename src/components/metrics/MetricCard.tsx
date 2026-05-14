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
    border: 'border-border',
    valueCls: 'text-text-primary',
    iconBg: 'bg-bg-elevated border-border',
  },
  danger: {
    border: 'border-risk-danger/20',
    valueCls: 'text-risk-danger',
    iconBg: 'bg-risk-danger-bg border-risk-danger/20',
  },
  warning: {
    border: 'border-risk-warning/20',
    valueCls: 'text-risk-warning',
    iconBg: 'bg-risk-warning-bg border-risk-warning/20',
  },
  safe: {
    border: 'border-risk-safe/20',
    valueCls: 'text-risk-safe',
    iconBg: 'bg-risk-safe-bg border-risk-safe/20',
  },
};

const TrendArrow: React.FC<{ trend: 'up' | 'down' | 'neutral'; value?: string }> = ({
  trend,
  value,
}) => {
  if (trend === 'neutral') return null;
  const isUp = trend === 'up';
  return (
    <div
      className={clsx(
        'flex items-center gap-1 text-[10px] font-mono-data',
        isUp ? 'text-risk-danger' : 'text-risk-safe'
      )}
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="currentColor"
        className={clsx('transition-transform', isUp ? '' : 'rotate-180')}
      >
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
        'card p-4 flex flex-col gap-3',
        'hover:border-border-strong transition-all duration-200',
        styles.border,
        className
      )}
    >
      {/* Top row: icon + trend */}
      <div className="flex items-center justify-between">
        {icon && (
          <div
            className={clsx(
              'w-8 h-8 rounded border flex items-center justify-center text-text-muted',
              styles.iconBg
            )}
          >
            {icon}
          </div>
        )}
        {trend && <TrendArrow trend={trend} value={trendValue} />}
      </div>

      {/* Value */}
      {loading ? (
        <div className="skeleton h-8 w-24 rounded" />
      ) : (
        <div className={clsx('font-mono-data font-medium text-2xl tabular-nums', styles.valueCls)}>
          {value ?? '—'}
        </div>
      )}

      {/* Label */}
      <div>
        {loading ? (
          <div className="skeleton h-3 w-16 rounded" />
        ) : (
          <>
            <p className="text-text-secondary text-xs font-body font-medium">{label}</p>
            {subLabel && (
              <p className="text-text-muted text-[10px] font-mono-data mt-0.5">{subLabel}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};