'use client';

import React from 'react';
import { clsx } from 'clsx';
import { ChartType } from '@/types/chart.types';
import { buildChartConfig } from '@/lib/chartHelpers';
import { LineChart } from './charts/LineChart';
import { BarChart } from './charts/BarChart';
import { PieChart } from './charts/PieChart';
import { AreaChart } from './charts/AreaChart';

interface ChartRendererProps {
  data: Record<string, unknown>[];
  columns: string[];
  chartType: ChartType;
  height?: number;
  id?: string;
}

export const ChartRenderer: React.FC<ChartRendererProps> = ({
  data,
  columns,
  chartType,
  height = 320,
  id,
}) => {
  if (!data.length) {
    return (
      <div
        className={clsx(
          'flex items-center justify-center rounded-lg border border-border',
          'bg-bg-surface text-text-muted text-sm font-mono-data'
        )}
        style={{ height }}
      >
        No data to display
      </div>
    );
  }

  const config = buildChartConfig(data, columns, chartType);

  if (!config.xKey || !config.yKeys.length) {
    return (
      <div
        className="flex items-center justify-center rounded-lg border border-border bg-bg-surface text-text-muted text-sm font-mono-data"
        style={{ height }}
      >
        Could not build chart — check data shape
      </div>
    );
  }

  return (
    <div
      id={id}
      className={clsx(
        'rounded-lg border border-border bg-bg-surface p-4',
        'animate-fade-in'
      )}
    >
      {chartType === 'line' && <LineChart config={config} height={height} />}
      {chartType === 'bar' && <BarChart config={config} height={height} />}
      {chartType === 'pie' && <PieChart config={config} height={height} />}
      {chartType === 'area' && <AreaChart config={config} height={height} />}
    </div>
  );
};