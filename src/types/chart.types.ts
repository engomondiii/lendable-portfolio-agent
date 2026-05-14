export type ChartType = 'line' | 'bar' | 'pie' | 'area';

export interface ChartDataPoint {
  [key: string]: string | number | null;
}

export interface ChartConfig {
  type: ChartType;
  xKey: string;
  yKeys: string[];
  colors: string[];
  data: ChartDataPoint[];
}