'use client';

import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { MetricCard } from './MetricCard';
import { fetchPortfolioMetrics } from '@/lib/api';
import { PortfolioMetrics } from '@/types/portfolio.types';
import { formatPercent, formatNumber } from '@/lib/tableHelpers';

const LoansIcon = () => (
  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="1" y="3" width="12" height="9" rx="1.5"/>
    <path d="M5 3V2a2 2 0 014 0v1"/>
    <path d="M7 7v2"/>
  </svg>
);

const ActiveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="7" cy="7" r="5.5"/>
    <path d="M7 4.5v3l2 1.5" strokeLinecap="round"/>
  </svg>
);

const PARIcon = () => (
  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M1 11.5L4.5 8l3 3L13 4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WriteOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M2 2l10 10M12 2L2 12" strokeLinecap="round"/>
  </svg>
);

export const MetricsRow: React.FC = () => {
  const [metrics, setMetrics] = useState<PortfolioMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioMetrics()
      .then(setMetrics)
      .catch(() => setMetrics(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 p-6">
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.05s', animationFillMode: 'forwards' }}>
        <MetricCard
          label="Total Loans"
          value={metrics ? formatNumber(metrics.total_loans) : null}
          subLabel="in database"
          loading={loading}
          icon={<LoansIcon />}
        />
      </div>
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.10s', animationFillMode: 'forwards' }}>
        <MetricCard
          label="Active Portfolio"
          value={metrics ? formatNumber(metrics.active_loans) : null}
          subLabel="excl. paid-off & write-offs"
          variant="safe"
          loading={loading}
          icon={<ActiveIcon />}
        />
      </div>
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}>
        <MetricCard
          label="PAR0+ Rate"
          value={metrics ? formatPercent(metrics.par0_rate) : null}
          subLabel="any days late (active)"
          variant={metrics ? (metrics.par0_rate > 0.4 ? 'danger' : metrics.par0_rate > 0.2 ? 'warning' : 'safe') : 'default'}
          trend={metrics && metrics.par0_rate > 0.1 ? 'up' : undefined}
          loading={loading}
          icon={<PARIcon />}
        />
      </div>
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.20s', animationFillMode: 'forwards' }}>
        <MetricCard
          label="Write-off Rate"
          value={metrics ? formatPercent(metrics.writeoff_rate) : null}
          subLabel="of all loans originated"
          variant={metrics ? (metrics.writeoff_rate > 0.3 ? 'danger' : metrics.writeoff_rate > 0.15 ? 'warning' : 'default') : 'default'}
          trend={metrics && metrics.writeoff_rate > 0.15 ? 'up' : undefined}
          loading={loading}
          icon={<WriteOffIcon />}
        />
      </div>
    </div>
  );
};