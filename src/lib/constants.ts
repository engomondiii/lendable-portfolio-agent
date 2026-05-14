// ─── API ────────────────────────────────────────────────────────────────────
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  query: '/api/query/',
  metrics: '/api/portfolio/metrics/',
  health: '/api/health/',
} as const;

// ─── Suggested Questions ────────────────────────────────────────────────────
export interface SuggestedQuestion {
  id: string;
  label: string;
  question: string;
  category: 'par' | 'risk' | 'originator' | 'comparison';
  icon: string;
}

export const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  {
    id: 'par-trend',
    label: 'Is PAR going up?',
    question: 'Is PAR going up? Show me PAR0+, PAR30+, and PAR60+ over time on the active portfolio.',
    category: 'par',
    icon: '📈',
  },
  {
    id: 'par-drivers',
    label: 'What is driving PAR?',
    question: 'What is driving PAR up? Break it down by originator, product type, and origination cohort.',
    category: 'par',
    icon: '🔍',
  },
  {
    id: 'rescheduled-par',
    label: 'PAR from rescheduled loans?',
    question: 'How much of PAR is driven by rescheduled loans? What percentage of currently late loans were rescheduled?',
    category: 'risk',
    icon: '🔄',
  },
  {
    id: 'reschedule-comparison',
    label: 'Rescheduled vs normal loans',
    question: 'Do rescheduled loans perform differently? Compare repayment behaviour, write-off rates, and amount paid vs due for rescheduled vs non-rescheduled loans.',
    category: 'comparison',
    icon: '⚖️',
  },
  {
    id: 'par-rescheduled-method',
    label: 'Does PAR include rescheduled lateness?',
    question: 'Does PAR include the lateness from rescheduled loans? Check whether days late are calculated from the original begin date or rescheduled date.',
    category: 'risk',
    icon: '📋',
  },
  {
    id: 'originator-breakdown',
    label: 'Originator performance',
    question: 'Show me a breakdown of loan performance by originator. Include PAR rates and write-off rates for each.',
    category: 'originator',
    icon: '🏦',
  },
];

// ─── Risk Status Config ──────────────────────────────────────────────────────
export const RISK_STATUS_CONFIG = {
  Current: {
    label: 'Current',
    color: 'var(--color-risk-safe)',
    bg: 'var(--color-risk-safe-bg)',
    variant: 'safe' as const,
    description: '0 days late',
  },
  PAR: {
    label: 'PAR',
    color: 'var(--color-risk-warning)',
    bg: 'var(--color-risk-warning-bg)',
    variant: 'warning' as const,
    description: '1–29 days late',
  },
  PAR30: {
    label: 'PAR30',
    color: 'var(--color-risk-caution)',
    bg: 'var(--color-risk-caution-bg)',
    variant: 'caution' as const,
    description: '30–59 days late',
  },
  PAR60: {
    label: 'PAR60',
    color: 'var(--color-risk-danger)',
    bg: 'var(--color-risk-danger-bg)',
    variant: 'danger' as const,
    description: '60–89 days late',
  },
  'Write-off': {
    label: 'Write-off',
    color: 'var(--color-risk-danger)',
    bg: 'var(--color-risk-danger-bg)',
    variant: 'danger' as const,
    description: '90+ days late',
  },
  'Paid-off': {
    label: 'Paid-off',
    color: 'var(--color-risk-neutral)',
    bg: 'var(--color-risk-neutral-bg)',
    variant: 'neutral' as const,
    description: 'Completed',
  },
} as const;

// ─── Chart Colors ────────────────────────────────────────────────────────────
export const CHART_COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
];

// ─── Mock mode ───────────────────────────────────────────────────────────────
export const ENABLE_MOCK = process.env.NEXT_PUBLIC_ENABLE_MOCK === 'true';

// ─── Thinking stages ─────────────────────────────────────────────────────────
export const THINKING_STAGES = [
  { key: 'generating', label: 'Generating SQL...', duration: 1800 },
  { key: 'executing', label: 'Running query...', duration: 1000 },
  { key: 'rendering', label: 'Rendering results...', duration: 600 },
] as const;