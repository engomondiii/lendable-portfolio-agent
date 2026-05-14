'use client';

import React from 'react';
import { clsx } from 'clsx';

interface DataTableHeaderProps {
  columns: string[];
  sortKey: string | null;
  sortDir: 'asc' | 'desc';
  onSort: (col: string) => void;
}

const SortIcon: React.FC<{ active: boolean; dir: 'asc' | 'desc' }> = ({
  active,
  dir,
}) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="currentColor"
    className={clsx(
      'transition-all duration-150 flex-shrink-0',
      active ? 'text-brand-primary' : 'text-text-muted opacity-0 group-hover:opacity-60'
    )}
  >
    {active && dir === 'asc' ? (
      <path d="M5 1l4 5H1l4-5z" />
    ) : active && dir === 'desc' ? (
      <path d="M5 9L1 4h8L5 9z" />
    ) : (
      <>
        <path d="M5 1l3 4H2l3-4z" opacity="0.5" />
        <path d="M5 9L2 5h6L5 9z" opacity="0.5" />
      </>
    )}
  </svg>
);

export const DataTableHeader: React.FC<DataTableHeaderProps> = ({
  columns,
  sortKey,
  sortDir,
  onSort,
}) => (
  <thead>
    <tr className="border-b border-border bg-bg-elevated sticky top-0 z-10">
      {columns.map((col) => (
        <th
          key={col}
          className={clsx(
            'group px-3 py-2.5 text-left',
            'text-[10px] font-mono-data font-medium uppercase tracking-wider',
            'text-text-muted select-none cursor-pointer',
            'hover:text-text-secondary transition-colors duration-100',
            'whitespace-nowrap'
          )}
          onClick={() => onSort(col)}
        >
          <div className="flex items-center gap-1.5">
            <span>{col.replace(/_/g, ' ')}</span>
            <SortIcon
              active={sortKey === col}
              dir={sortKey === col ? sortDir : 'asc'}
            />
          </div>
        </th>
      ))}
    </tr>
  </thead>
);