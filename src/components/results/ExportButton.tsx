'use client';

import React, { useState } from 'react';
import { clsx } from 'clsx';
import { useExport } from '@/hooks/useExport';

interface ExportButtonProps {
  data: Record<string, unknown>[];
  columns: string[];
  chartId?: string;
  outputType: 'chart' | 'table';
}

const DownloadIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M6 1v7M3 6l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 10h10" strokeLinecap="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="1.5,6 4.5,9 10.5,3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ExportButton: React.FC<ExportButtonProps> = ({
  data,
  columns,
  chartId,
  outputType,
}) => {
  const [exported, setExported] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { exportCSV, exportChartPNG } = useExport();

  const handleExport = async (type: 'csv' | 'png') => {
    setMenuOpen(false);
    if (type === 'csv') {
      exportCSV(data, columns, 'lendable-portfolio');
    } else if (type === 'png' && chartId) {
      await exportChartPNG(chartId, 'lendable-chart');
    }
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          // If only one export type is available, do it directly
          if (outputType === 'table') {
            handleExport('csv');
          } else {
            setMenuOpen((o) => !o);
          }
        }}
        className={clsx(
          'flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-body',
          'border transition-all duration-150',
          exported
            ? 'text-brand-primary border-brand-primary/30 bg-brand-subtle'
            : 'text-text-muted border-border hover:text-text-secondary hover:border-border-strong'
        )}
      >
        {exported ? <CheckIcon /> : <DownloadIcon />}
        <span className="font-mono-data text-[10px]">
          {exported ? 'Exported!' : 'Export'}
        </span>
      </button>

      {/* Dropdown for chart — CSV or PNG */}
      {menuOpen && outputType === 'chart' && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className={clsx(
              'absolute right-0 top-full mt-1 z-50',
              'bg-bg-elevated border border-border rounded-lg shadow-elevated',
              'min-w-[130px] overflow-hidden',
              'animate-fade-in-up'
            )}
          >
            <button
              onClick={() => handleExport('csv')}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-body text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors"
            >
              <span className="font-mono-data text-[10px]">CSV</span>
              <span className="text-text-muted">raw data</span>
            </button>
            {chartId && (
              <button
                onClick={() => handleExport('png')}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-body text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors border-t border-border-subtle"
              >
                <span className="font-mono-data text-[10px]">PNG</span>
                <span className="text-text-muted">chart image</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};