export interface Loan {
  loan_id: string;
  customer_id: string;
  originator_id: string;
  originator_name: string;
  product_type: 'Working Capital' | 'Asset Finance' | 'Agricultural' | 'Consumer';
  begin_date: string;
  original_end_date: string;
  rescheduled_end_date: string | null;
  reschedule_flag: 0 | 1;
  principal: number;
  total_principal_interest: number;
  currency_type: 'KES';
  monthly_rate: number;
}

export interface HistoryRow {
  loan_id: string;
  record_date: string;
  month_on_book: number;
  amount_due: number;
  amount_paid: number;
  days_late: number;
  status: LoanStatus;
}

export type LoanStatus =
  | 'Current'
  | 'PAR'
  | 'PAR30'
  | 'PAR60'
  | 'Write-off'
  | 'Paid-off';

export interface PARMetric {
  date: string;
  par0_rate: number;
  par30_rate: number;
  par60_rate: number;
  active_loans: number;
}

export interface PortfolioMetrics {
  total_loans: number;
  active_loans: number;
  par0_rate: number;
  writeoff_rate: number;
  total_principal_kes: number;
  rescheduled_count: number;
}