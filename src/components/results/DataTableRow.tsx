'use client';

import React from 'react';
import { clsx } from 'clsx';
import { RiskBadge } from '@/components/metrics/RiskBadge';
import { autoFormatCell } from '@/lib/tableHelpers';
import { getStatusColor } from '@/lib/riskColors';

interface DataTableRowProps {
  row: Record<string, unknown>;
  columns: string[];
  index: number;
}

// Detect if a value is a loan status string
const LOAN_STATUSES = new Set([
  'Current',
  'PAR',
  'PAR30',
  'PAR60',
  'Write-off',
  'Paid-off',
]);

const isStatusValue = (val: unknown): val is string =>
  typeof val === 'string' && LOAN_STATUSES.has(val);

// Detect if a column holds numeric risk data (PAR rates, etc.)
const isRiskColumn = (col: string): boolean => {
  const c = col.toLowerCase();
  return (
    c.includes('par') ||
    c.includes('writeoff') ||
    c.includes('write_off') ||
    c.includes('days_late')
  );
};

const getRiskColorForValue = (col: string, val: unknown): string | null => {
  if (!isRiskColumn(col)) return null;
  const num = Number(val);
  if (isNaN(num)) return null;
  if (col.toLowerCase().includes('days_late')) {
    if (num >= 60) return 'var(--color-risk-danger)';
    if (num >= 30) return 'var(--color-risk-caution)';
    if (num > 0) return 'var(--color-risk-warning)';
    return 'var(--color-risk-safe)';
  }
  // PAR rate — assume 0-1 or 0-100
  const rate = num > 1 ? num / 100 : num;
  if (rate > 0.2) return 'var(--color-risk-danger)';
  if (rate > 0.1) return 'var(--color-risk-caution)';
  if (rate > 0.05) return 'var(--color-risk-warning)';
  return null;
};

export const DataTableRow: React.FC<DataTableRowProps> = ({
  row,
  columns,
  index,
}) => (
  <tr
    className={clsx(
      'border-b border-border-subtle',
      'hover:bg-bg-elevated transition-colors duration-100 group',
      index % 2 === 0 ? 'bg-transparent' : 'bg-bg-surface/30'
    )}
  >
    {columns.map((col) => {
      const val = row[col];
      const isStatus = isStatusValue(val);
      const riskColor = getRiskColorForValue(col, val);

      return (
        <td
          key={col}
          className="px-3 py-2 text-xs font-mono-data whitespace-nowrap"
          style={riskColor ? { color: riskColor } : undefined}
        >
          {val == null ? (
            <span className="text-text-muted">—</span>
          ) : isStatus ? (
            <RiskBadge status={val} size="xs" showTooltip />
          ) : (
            <span
              className={clsx(
                riskColor ? '' : 'text-text-secondary',
                'group-hover:text-text-primary transition-colors duration-100'
              )}
            >
              {autoFormatCell(col, val)}
            </span>
          )}
        </td>
      );
    })}
  </tr>
);