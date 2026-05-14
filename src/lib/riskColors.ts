import { LoanStatus } from '@/types/portfolio.types';
import { BadgeVariant } from '@/components/ui/Badge';

export function getStatusBadgeVariant(status: string): BadgeVariant {
  switch (status) {
    case 'Current':
      return 'safe';
    case 'PAR':
      return 'warning';
    case 'PAR30':
      return 'caution';
    case 'PAR60':
    case 'Write-off':
      return 'danger';
    case 'Paid-off':
      return 'neutral';
    default:
      return 'default';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Current':
      return 'var(--color-risk-safe)';
    case 'PAR':
      return 'var(--color-risk-warning)';
    case 'PAR30':
      return 'var(--color-risk-caution)';
    case 'PAR60':
    case 'Write-off':
      return 'var(--color-risk-danger)';
    case 'Paid-off':
      return 'var(--color-risk-neutral)';
    default:
      return 'var(--color-text-muted)';
  }
}

export function getPARColor(parType: 'par0' | 'par30' | 'par60'): string {
  switch (parType) {
    case 'par0':
      return 'var(--color-risk-warning)';
    case 'par30':
      return 'var(--color-risk-caution)';
    case 'par60':
      return 'var(--color-risk-danger)';
  }
}