'use client';

import React from 'react';
import { clsx } from 'clsx';
import { QueryHistoryItem as HistoryItemType } from '@/types/query.types';

interface QueryHistoryItemProps {
  item: HistoryItemType;
  onReask: (question: string) => void;
  onRemove: (id: string) => void;
}

const ReaskIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M5 1l4 4-4 4M1 5h8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M1 3h8M3.5 3V2h3v1M2 3l.5 6h5l.5-6"/>
  </svg>
);

export const QueryHistoryItem: React.FC<QueryHistoryItemProps> = ({
  item,
  onReask,
  onRemove,
}) => {
  const timeAgo = (() => {
    const diff = Date.now() - item.timestamp;
    const mins = Math.floor(diff / 60_000);
    const hours = Math.floor(diff / 3_600_000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(item.timestamp).toLocaleDateString('en-KE', {
      month: 'short',
      day: 'numeric',
    });
  })();

  return (
    <div
      className={clsx(
        'group px-3 py-2.5 rounded border border-transparent',
        'hover:bg-bg-elevated hover:border-border',
        'transition-all duration-150 cursor-pointer'
      )}
      onClick={() => onReask(item.question)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onReask(item.question);
      }}
    >
      <div className="flex items-start gap-2">
        {/* Type icon */}
        <span className="text-text-muted mt-0.5 flex-shrink-0 text-[11px]">
          {item.outputType === 'chart' ? '📈' : '⊞'}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-text-secondary text-xs font-body leading-relaxed line-clamp-2">
            {item.question}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-text-muted text-[10px] font-mono-data">{timeAgo}</span>
            {item.rowCount !== undefined && (
              <>
                <span className="text-text-muted text-[10px]">·</span>
                <span className="text-text-muted text-[10px] font-mono-data">
                  {item.rowCount} rows
                </span>
              </>
            )}
          </div>
        </div>

        {/* Actions — visible on hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReask(item.question);
            }}
            className="p-1 rounded text-text-muted hover:text-brand-primary transition-colors"
            aria-label="Re-ask this question"
          >
            <ReaskIcon />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item.id);
            }}
            className="p-1 rounded text-text-muted hover:text-risk-danger transition-colors"
            aria-label="Remove from history"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
};