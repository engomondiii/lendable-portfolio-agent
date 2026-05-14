import { ChartType } from '@/types/chart.types';
import { isDateColumn, isNumericColumn } from '@/lib/tableHelpers';

export function useChartType(
  suggestedType: ChartType | null,
  columns: string[],
  data: Record<string, unknown>[]
): ChartType {
  if (suggestedType) return suggestedType;

  // Auto-detect: if first non-numeric col is a date → line chart
  if (columns.some((c) => isDateColumn(c))) return 'line';

  // Few rows, categorical x-axis → bar
  if (data.length <= 10) return 'bar';

  // Many rows with date-like strings → line
  return 'bar';
}