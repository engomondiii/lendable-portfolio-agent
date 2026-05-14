import { ChartConfig, ChartDataPoint, ChartType } from '@/types/chart.types';
import { CHART_COLORS } from './constants';
import { isDateColumn, isNumericColumn } from './tableHelpers';

/**
 * Transform raw SQL result rows into a Recharts-compatible ChartConfig
 */
export function buildChartConfig(
  data: Record<string, unknown>[],
  columns: string[],
  chartType: ChartType
): ChartConfig {
  if (!data.length || !columns.length) {
    return { type: chartType, xKey: '', yKeys: [], colors: [], data: [] };
  }

  // Detect x-axis: prefer date columns, then first string column
  const dateCol = columns.find((c) => isDateColumn(c));
  const stringCols = columns.filter(
    (c) => !isNumericColumn(data.map((r) => r[c]))
  );
  const numericCols = columns.filter((c) =>
    isNumericColumn(data.map((r) => r[c]))
  );

  const xKey = dateCol || stringCols[0] || columns[0];
  const yKeys =
    numericCols.length > 0 ? numericCols : columns.filter((c) => c !== xKey);

  const chartData: ChartDataPoint[] = data.map((row) => {
    const point: ChartDataPoint = {};
    columns.forEach((col) => {
      const val = row[col];
      point[col] =
        val == null
          ? null
          : typeof val === 'number'
          ? val
          : isNaN(Number(val))
          ? String(val)
          : Number(val);
    });
    return point;
  });

  return {
    type: chartType,
    xKey,
    yKeys: yKeys.slice(0, 5), // Max 5 series
    colors: CHART_COLORS.slice(0, yKeys.length),
    data: chartData,
  };
}

/**
 * Format axis tick values
 */
export function formatAxisTick(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'number') {
    if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (Math.abs(value) >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
    if (value < 1 && value > 0) return `${(value * 100).toFixed(1)}%`;
    return value.toFixed(1);
  }
  // Shorten date strings
  const str = String(value);
  if (str.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const d = new Date(str);
    return d.toLocaleDateString('en-KE', { month: 'short', year: '2-digit' });
  }
  // Truncate long strings
  return str.length > 12 ? str.slice(0, 12) + '…' : str;
}

/**
 * Format tooltip values
 */
export function formatTooltipValue(
  value: unknown,
  columnName: string
): string {
  if (value == null) return '—';
  const col = columnName.toLowerCase();
  const num = Number(value);

  if (col.includes('amount') || col.includes('principal') || col.includes('paid') || col.includes('due')) {
    if (Math.abs(num) >= 1_000_000) return `KES ${(num / 1_000_000).toFixed(2)}M`;
    return `KES ${num.toLocaleString('en-KE', { maximumFractionDigits: 0 })}`;
  }
  if (col.includes('rate') || col.includes('par') || col.includes('ratio')) {
    if (num <= 1) return `${(num * 100).toFixed(1)}%`;
    return `${num.toFixed(1)}%`;
  }
  if (typeof value === 'number') return value.toLocaleString('en-KE');
  return String(value);
}

/**
 * Custom Recharts tooltip style
 */
export const CHART_TOOLTIP_STYLE = {
  backgroundColor: 'var(--color-bg-elevated)',
  border: '1px solid var(--color-border-strong)',
  borderRadius: '6px',
  fontSize: '12px',
  fontFamily: 'var(--font-dm-mono)',
  color: 'var(--color-text-primary)',
  padding: '8px 12px',
};