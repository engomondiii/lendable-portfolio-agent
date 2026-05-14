/**
 * Format a number as KES currency
 */
export function formatKES(value: number | null | undefined): string {
  if (value == null) return '—';
  if (Math.abs(value) >= 1_000_000) {
    return `KES ${(value / 1_000_000).toFixed(2)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `KES ${value.toLocaleString('en-KE', { maximumFractionDigits: 0 })}`;
  }
  return `KES ${value.toFixed(2)}`;
}

/**
 * Format a percentage value
 */
export function formatPercent(value: number | null | undefined, decimals = 1): string {
  if (value == null) return '—';
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format a plain number with commas
 */
export function formatNumber(value: number | null | undefined): string {
  if (value == null) return '—';
  return value.toLocaleString('en-KE');
}

/**
 * Format a date string to display format
 */
export function formatDate(value: string | null | undefined): string {
  if (!value) return '—';
  try {
    const d = new Date(value);
    return d.toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return value;
  }
}

/**
 * Format a date as month/year (for chart axes)
 */
export function formatMonthYear(value: string | null | undefined): string {
  if (!value) return '';
  try {
    const d = new Date(value);
    return d.toLocaleDateString('en-KE', { month: 'short', year: '2-digit' });
  } catch {
    return value ?? '';
  }
}

/**
 * Auto-detect column type and format appropriately
 */
export function autoFormatCell(columnName: string, value: unknown): string {
  if (value == null) return '—';

  const col = columnName.toLowerCase();

  // KES amounts
  if (
    col.includes('principal') ||
    col.includes('amount') ||
    col.includes('paid') ||
    col.includes('due')
  ) {
    return formatKES(Number(value));
  }

  // Percentages / rates
  if (col.includes('rate') || col.includes('par') || col.includes('ratio')) {
    const num = Number(value);
    // If already a percentage (0-100 range)
    if (num > 1) return `${num.toFixed(1)}%`;
    return formatPercent(num);
  }

  // Dates
  if (col.includes('date')) {
    return formatDate(String(value));
  }

  // Numbers
  if (typeof value === 'number') {
    return formatNumber(value);
  }

  return String(value);
}

/**
 * Determine if a column is numeric
 */
export function isNumericColumn(values: unknown[]): boolean {
  const nonNull = values.filter((v) => v != null);
  if (nonNull.length === 0) return false;
  return nonNull.every((v) => typeof v === 'number' || !isNaN(Number(v)));
}

/**
 * Determine if a column is a date column
 */
export function isDateColumn(columnName: string): boolean {
  const col = columnName.toLowerCase();
  return col.includes('date') || col.includes('month') || col.includes('period');
}