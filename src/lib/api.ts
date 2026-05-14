import axios, { AxiosError } from 'axios';
import { QueryRequest, QueryResponse, APIError } from '@/types/query.types';
import { PortfolioMetrics } from '@/types/portfolio.types';
import { API_ENDPOINTS, ENABLE_MOCK } from './constants';

// ─── Axios Instance ──────────────────────────────────────────────────────────
const apiClient = axios.create({
  baseURL: '/api',
  timeout: 60_000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; detail?: string; sql?: string }>) => {
    const apiError: APIError = {
      message:
        error.response?.data?.message ||
        error.response?.data?.detail ||
        error.message ||
        'An unexpected error occurred',
      detail: error.response?.data?.detail,
      sql: error.response?.data?.sql,
    };
    return Promise.reject(apiError);
  }
);

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_RESPONSE: QueryResponse = {
  sql: `SELECT
  h.record_date,
  COUNT(CASE WHEN h.days_late > 0 THEN 1 END) * 100.0 / COUNT(*) as par0_rate,
  COUNT(CASE WHEN h.days_late >= 30 THEN 1 END) * 100.0 / COUNT(*) as par30_rate,
  COUNT(CASE WHEN h.days_late >= 60 THEN 1 END) * 100.0 / COUNT(*) as par60_rate
FROM history h
INNER JOIN (
  SELECT loan_id, MAX(month_on_book) as max_mob
  FROM history GROUP BY loan_id
) latest ON h.loan_id = latest.loan_id
  AND h.month_on_book = latest.max_mob
WHERE h.status NOT IN ('Paid-off', 'Write-off')
GROUP BY h.record_date
ORDER BY h.record_date`,
  data: [
    { record_date: '2024-03-01', par0_rate: 8.2,  par30_rate: 3.1,  par60_rate: 1.2 },
    { record_date: '2024-06-01', par0_rate: 11.4, par30_rate: 5.2,  par60_rate: 2.1 },
    { record_date: '2024-09-01', par0_rate: 14.7, par30_rate: 7.8,  par60_rate: 3.4 },
    { record_date: '2024-12-01', par0_rate: 18.3, par30_rate: 9.1,  par60_rate: 4.8 },
    { record_date: '2025-03-01', par0_rate: 22.1, par30_rate: 12.3, par60_rate: 6.2 },
    { record_date: '2025-06-01', par0_rate: 25.6, par30_rate: 14.7, par60_rate: 8.1 },
  ],
  columns: ['record_date', 'par0_rate', 'par30_rate', 'par60_rate'],
  output_type: 'chart',
  chart_type: 'line',
  explanation:
    'PAR has been increasing steadily across all thresholds. PAR0+ has risen from 8.2% to 25.6%, with PAR30+ tripling from 3.1% to 14.7%. This suggests systemic repayment deterioration rather than isolated defaults.',
  row_count: 6,
  execution_time_ms: 42,
};

// All fields match the updated PortfolioMetrics interface
const MOCK_METRICS: PortfolioMetrics = {
  total_loans: 994,
  active_loans: 72,
  par0_rate: 0.256,
  par30_rate: 0.18,
  par60_rate: 0.09,
  writeoff_rate: 0.585,
  writeoff_count: 582,
  total_principal_kes: 142_800_000,
  rescheduled_count: 202,
};

// ─── API Functions ────────────────────────────────────────────────────────────

export async function sendQuery(question: string): Promise<QueryResponse> {
  if (ENABLE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 3400));
    return { ...MOCK_RESPONSE };
  }
  const payload: QueryRequest = { question };
  const response = await apiClient.post<QueryResponse>(API_ENDPOINTS.query, payload);
  return response.data;
}

export async function fetchPortfolioMetrics(): Promise<PortfolioMetrics> {
  if (ENABLE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return MOCK_METRICS;
  }
  const response = await apiClient.get<PortfolioMetrics>(API_ENDPOINTS.metrics);
  return response.data;
}

export default apiClient;