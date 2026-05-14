'use client';

import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { fetchPortfolioMetrics } from '@/lib/api';
import { PortfolioMetrics } from '@/types/portfolio.types';
import { formatPercent, formatNumber } from '@/lib/tableHelpers';

// ── Single metric pill ───────────────────────────────────────────────────────
interface MetricPillProps {
  label: string;
  value: string | null;
  color?: 'default' | 'safe' | 'warning' | 'danger';
  loading?: boolean;
}

const MetricPill: React.FC<MetricPillProps> = ({
  label,
  value,
  color = 'default',
  loading,
}) => {
  const valueColor = {
    default: 'text-text-primary',
    safe:    'text-risk-safe',
    warning: 'text-risk-warning',
    danger:  'text-risk-danger',
  }[color];

  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 flex-shrink-0">
      <span className="text-text-muted text-xs font-mono-data whitespace-nowrap">
        {label}
      </span>
      {loading ? (
        <div className="skeleton h-4 w-12 rounded" />
      ) : (
        <span className={clsx('font-mono-data font-semibold text-sm tabular-nums', valueColor)}>
          {value ?? '—'}
        </span>
      )}
    </div>
  );
};

const StripDivider = () => (
  <div className="w-px h-5 bg-border flex-shrink-0" aria-hidden />
);

// ── Color helpers ────────────────────────────────────────────────────────────
type RateColor = 'default' | 'safe' | 'warning' | 'danger';

function parColor(rate: number | undefined, dangerThreshold: number, warnThreshold: number): RateColor {
  if (rate === undefined) return 'default';
  if (rate > dangerThreshold) return 'danger';
  if (rate > warnThreshold)   return 'warning';
  return 'safe';
}

function getWriteoffColor(rate: number | undefined): RateColor {
  if (rate === undefined) return 'default';
  if (rate > 0.4) return 'danger';
  if (rate > 0.2) return 'warning';
  return 'default';
}

// ── Main component ───────────────────────────────────────────────────────────
export const MetricsStrip: React.FC = () => {
  const [metrics, setMetrics] = useState<PortfolioMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioMetrics()
      .then(setMetrics)
      .catch(() => setMetrics(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className={clsx(
        'flex-shrink-0 flex items-center',
        'border-b border-border bg-bg-surface',
        'overflow-x-auto'
      )}
    >
      {/* Section label */}
      <div className="flex-shrink-0 px-4 py-2.5 border-r border-border">
        <span className="text-text-muted text-[10px] font-mono-data uppercase tracking-widest">
          Portfolio
        </span>
      </div>

      <MetricPill
        label="Total Loans"
        value={metrics ? formatNumber(metrics.total_loans) : null}
        color="default"
        loading={loading}
      />
      <StripDivider />

      <MetricPill
        label="Active"
        value={metrics ? formatNumber(metrics.active_loans) : null}
        color="safe"
        loading={loading}
      />
      <StripDivider />

      <MetricPill
        label="PAR0+"
        value={metrics ? formatPercent(metrics.par0_rate) : null}
        color={parColor(metrics?.par0_rate, 0.4, 0.2)}
        loading={loading}
      />
      <StripDivider />

      <MetricPill
        label="PAR30+"
        value={metrics ? formatPercent(metrics.par30_rate) : null}
        color={parColor(metrics?.par30_rate, 0.3, 0.15)}
        loading={loading}
      />
      <StripDivider />

      <MetricPill
        label="PAR60+"
        value={metrics ? formatPercent(metrics.par60_rate) : null}
        color={parColor(metrics?.par60_rate, 0.2, 0.1)}
        loading={loading}
      />
      <StripDivider />

      <MetricPill
        label="Write-off"
        value={metrics ? formatPercent(metrics.writeoff_rate) : null}
        color={getWriteoffColor(metrics?.writeoff_rate)}
        loading={loading}
      />
      <StripDivider />

      <MetricPill
        label="Rescheduled"
        value={metrics ? formatNumber(metrics.rescheduled_count) : null}
        color="default"
        loading={loading}
      />

      {/* Spacer — pushes total principal to the right */}
      <div className="flex-1 min-w-0" />
      <StripDivider />

      <MetricPill
        label="Total Principal"
        value={
          metrics
            ? `KES ${(metrics.total_principal_kes / 1_000_000).toFixed(1)}M`
            : null
        }
        color="default"
        loading={loading}
      />
    </div>
  );
};