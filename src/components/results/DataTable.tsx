'use client';

import React, { useState, useMemo } from 'react';
import { clsx } from 'clsx';
import { DataTableHeader } from './DataTableHeader';
import { DataTableRow } from './DataTableRow';
import { ScrollArea } from '@/components/ui/ScrollArea';

interface DataTableProps {
  data: Record<string, unknown>[];
  columns: string[];
  maxHeight?: number;
  pageSize?: number;
}

export const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  maxHeight = 420,
  pageSize = 50,
}) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);

  const handleSort = (col: string) => {
    if (sortKey === col) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(col);
      setSortDir('asc');
    }
    setPage(0);
  };

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av == null) return 1;
      if (bv == null) return -1;
      const aNum = Number(av);
      const bNum = Number(bv);
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortDir === 'asc' ? aNum - bNum : bNum - aNum;
      }
      const aStr = String(av).toLowerCase();
      const bStr = String(bv).toLowerCase();
      return sortDir === 'asc'
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div
      className={clsx(
        'rounded-lg border border-border bg-bg-surface overflow-hidden',
        'animate-fade-in'
      )}
    >
      <ScrollArea maxHeight={`${maxHeight}px`} orientation="both">
        <table className="w-full border-collapse">
          <DataTableHeader
            columns={columns}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={handleSort}
          />
          <tbody>
            {paginated.map((row, i) => (
              <DataTableRow
                key={i}
                row={row}
                columns={columns}
                index={i}
              />
            ))}
          </tbody>
        </table>
      </ScrollArea>

      {/* Footer — row count + pagination */}
      <div
        className={clsx(
          'flex items-center justify-between px-3 py-2',
          'border-t border-border bg-bg-elevated'
        )}
      >
        <span className="text-text-muted text-[10px] font-mono-data">
          {data.length.toLocaleString()} row{data.length !== 1 ? 's' : ''}
          {sortKey && (
            <span className="ml-2 text-brand-primary">
              sorted by {sortKey.replace(/_/g, ' ')} {sortDir === 'asc' ? '↑' : '↓'}
            </span>
          )}
        </span>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className={clsx(
                'text-[10px] font-mono-data px-2 py-1 rounded border',
                'transition-all duration-100',
                page === 0
                  ? 'text-text-muted border-border-subtle cursor-not-allowed'
                  : 'text-text-secondary border-border hover:border-border-strong hover:text-text-primary'
              )}
            >
              ← Prev
            </button>
            <span className="text-text-muted text-[10px] font-mono-data">
              {page + 1} / {totalPages}
            </span>
            <button
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
              className={clsx(
                'text-[10px] font-mono-data px-2 py-1 rounded border',
                'transition-all duration-100',
                page >= totalPages - 1
                  ? 'text-text-muted border-border-subtle cursor-not-allowed'
                  : 'text-text-secondary border-border hover:border-border-strong hover:text-text-primary'
              )}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};