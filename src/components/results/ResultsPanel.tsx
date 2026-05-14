'use client';

import React, { useState, useId } from 'react';
import { QueryResponse } from '@/types/query.types';
import { ChartType } from '@/types/chart.types';
import { useChartType } from '@/hooks/useChartType';
import { ResultsToolbar } from './ResultsToolbar';
import { DataTable } from './DataTable';
import { ChartRenderer } from './ChartRenderer';

interface ResultsPanelProps {
  result: QueryResponse;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
  const chartId = useId();
  const safeChartId = `chart-${chartId.replace(/:/g, '')}`;

  // Allow user to switch between chart and table regardless of agent suggestion
  const [viewType, setViewType] = useState<'chart' | 'table'>(
    result.output_type
  );

  const resolvedChartType = useChartType(
    result.chart_type as ChartType | null,
    result.columns,
    result.data
  );

  const canToggle = result.data.length > 0;

  return (
    <div className="w-full">
      <ResultsToolbar
        outputType={viewType}
        onToggle={setViewType}
        canToggle={canToggle}
        rowCount={result.row_count}
        chartId={safeChartId}
        data={result.data}
        columns={result.columns}
      />

      {viewType === 'chart' ? (
        <ChartRenderer
          data={result.data}
          columns={result.columns}
          chartType={resolvedChartType}
          height={320}
          id={safeChartId}
        />
      ) : (
        <DataTable
          data={result.data}
          columns={result.columns}
          maxHeight={420}
        />
      )}
    </div>
  );
};