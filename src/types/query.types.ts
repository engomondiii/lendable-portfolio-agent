// ─── Query Types ────────────────────────────────────────────────────────────

export interface QueryRequest {
  question: string;
}

export interface QueryResponse {
  sql: string;
  data: Record<string, unknown>[];
  columns: string[];
  output_type: 'chart' | 'table';
  chart_type: 'line' | 'bar' | 'pie' | 'area' | null;
  explanation: string;
  row_count: number;
  execution_time_ms?: number;
}

export interface QueryHistoryItem {
  id: string;
  question: string;
  timestamp: number;
  outputType: 'chart' | 'table';
  rowCount?: number;
  sql?: string;
}

export interface APIError {
  message: string;
  detail?: string;
  sql?: string;
}