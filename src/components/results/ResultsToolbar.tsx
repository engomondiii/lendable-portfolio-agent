'use client';

import React from 'react';
import { clsx } from 'clsx';
import { ExportButton } from './ExportButton';

interface ResultsToolbarProps {
  outputType: 'chart' | 'table';
  onToggle: (type: 'chart' | 'table') => void;
  canToggle: boolean;
  rowCount: number;
  chartId?: string;
  data: Record<string, unknown>[];
  columns: string[];
}

const TableIcon = () => (
  <svg width="14" height="14" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="1" y="1" width="11" height="11" rx="1.5"/>
    <path d="M1 5h11M1 9h11M5 1v11"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M1 10.5L4.5 7l3 3 4-6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ResultsToolbar: React.FC<ResultsToolbarProps> = ({
  outputType,
  onToggle,
  canToggle,
  rowCount,
  chartId,
  data,
  columns,
}) => (
  <div className="flex items-center justify-between mb-4">
    {/* Row count */}
    <span className="text-text-muted text-sm font-mono-data">
      {rowCount.toLocaleString()} row{rowCount !== 1 ? 's' : ''}
    </span>

    {/* Right: toggle + export */}
    <div className="flex items-center gap-3">
      {canToggle && (
        <div className="flex items-center bg-bg-elevated border border-border rounded-lg p-1 gap-0.5">
          <button
            onClick={() => onToggle('chart')}
            aria-label="Chart view"
            className={clsx(
              'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-mono-data',
              'transition-all duration-150',
              outputType === 'chart'
                ? 'bg-accent-subtle text-accent border border-accent/25 font-medium'
                : 'text-text-muted hover:text-text-secondary'
            )}
          >
            <ChartIcon />
            Chart
          </button>
          <button
            onClick={() => onToggle('table')}
            aria-label="Table view"
            className={clsx(
              'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-mono-data',
              'transition-all duration-150',
              outputType === 'table'
                ? 'bg-accent-subtle text-accent border border-accent/25 font-medium'
                : 'text-text-muted hover:text-text-secondary'
            )}
          >
            <TableIcon />
            Table
          </button>
        </div>
      )}

      <ExportButton
        data={data}
        columns={columns}
        chartId={chartId}
        outputType={outputType}
      />
    </div>
  </div>
);