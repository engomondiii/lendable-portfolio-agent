'use client';

import React from 'react';
import { clsx } from 'clsx';
import { useQueryHistory } from '@/hooks/useQueryHistory';
import { QueryHistoryItem } from './QueryHistoryItem';
import { HistoryClearButton } from './HistoryClearButton';
import { ScrollArea } from '@/components/ui/ScrollArea';

export const QueryHistory: React.FC = () => {
  const { history, clearHistory, removeFromHistory, reaskQuestion } =
    useQueryHistory();

  const reversed = [...history].reverse();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 flex-shrink-0">
        <div className="flex items-center gap-2">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            className="text-text-muted"
          >
            <circle cx="6" cy="6" r="5"/>
            <path d="M6 3.5v3l2 1.5" strokeLinecap="round"/>
          </svg>
          <span className="text-text-muted text-[10px] font-mono-data uppercase tracking-wider">
            History
          </span>
          {history.length > 0 && (
            <span className="text-text-muted text-[10px] font-mono-data opacity-60">
              ({history.length})
            </span>
          )}
        </div>
        <HistoryClearButton onClear={clearHistory} count={history.length} />
      </div>

      {/* List */}
      <ScrollArea className="flex-1 px-2 pb-2">
        {history.length === 0 ? (
          <div className="px-3 py-8 text-center">
            <p className="text-text-muted text-xs font-body">No queries yet</p>
            <p className="text-text-muted text-[10px] font-mono-data mt-1 opacity-50">
              Your questions will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-0.5">
            {reversed.map((item, i) => (
              <div
                key={item.id}
                className={clsx(
                  'stagger-item opacity-0 animate-fade-in-up'
                )}
                style={{
                  animationDelay: `${i * 0.04}s`,
                  animationFillMode: 'forwards',
                }}
              >
                <QueryHistoryItem
                  item={item}
                  onReask={reaskQuestion}
                  onRemove={removeFromHistory}
                />
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};