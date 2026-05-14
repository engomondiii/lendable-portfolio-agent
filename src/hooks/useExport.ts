import { useCallback } from 'react';

export function useExport() {
  const exportCSV = useCallback(
    (data: Record<string, unknown>[], columns: string[], filename = 'lendable-export') => {
      if (!data.length) return;

      const header = columns.join(',');
      const rows = data.map((row) =>
        columns
          .map((col) => {
            const val = row[col];
            if (val == null) return '';
            const str = String(val);
            // Quote if contains comma or quote
            if (str.includes(',') || str.includes('"')) {
              return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
          })
          .join(',')
      );

      const csv = [header, ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    },
    []
  );

  const exportChartPNG = useCallback(async (elementId: string, filename = 'lendable-chart') => {
    try {
      const { default: html2canvas } = await import('html2canvas');
      const element = document.getElementById(elementId);
      if (!element) return;

      const canvas = await html2canvas(element, {
        backgroundColor: 'var(--color-bg-surface)',
        scale: 2,
      });

      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}-${Date.now()}.png`;
      a.click();
    } catch (err) {
      console.error('Chart export failed:', err);
    }
  }, []);

  return { exportCSV, exportChartPNG };
}