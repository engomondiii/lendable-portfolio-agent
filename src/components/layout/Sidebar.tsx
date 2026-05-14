'use client';

import React from 'react';
import { clsx } from 'clsx';
import { useHistoryStore } from '@/store/historyStore';
import { useQueryStore } from '@/store/queryStore';
import { ScrollArea } from '@/components/ui/ScrollArea';

const HistoryIcon = () => (
  <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="7.5" cy="7.5" r="6"/>
    <path d="M7.5 4.5v3.5l2.5 1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M1.5 3.5h10M4.5 3.5V2.5h4v1M2.5 3.5l.8 7.5h6.4l.8-7.5"/>
  </svg>
);

const ReaskIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M6 1l4 4-4 4M1 5h9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Sidebar: React.FC = () => {
  const { history, clearHistory } = useHistoryStore();
  const { setCurrentQuestion } = useQueryStore();

  const handleReask = (question: string) => {
    setCurrentQuestion(question);
    const input = document.getElementById('query-input') as HTMLTextAreaElement | null;
    if (input) {
      input.value = question;
      input.focus();
      // Trigger React's synthetic onChange
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype, 'value'
      )?.set;
      nativeInputValueSetter?.call(input, question);
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  return (
    <div className="flex flex-col h-full w-[260px]">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <HistoryIcon />
          <span className="text-text-secondary text-sm font-body font-semibold">
            Query History
          </span>
          {history.length > 0 && (
            <span className="text-text-muted text-xs font-mono-data bg-bg-elevated border border-border px-1.5 py-0.5 rounded-full">
              {history.length}
            </span>
          )}
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="p-1.5 rounded text-text-muted hover:text-risk-danger hover:bg-risk-danger-bg transition-all duration-150"
            aria-label="Clear all history"
          >
            <TrashIcon />
          </button>
        )}
      </div>

      {/* History list */}
      <ScrollArea className="flex-1">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 px-4 text-center">
            <div className="w-10 h-10 rounded-full bg-bg-elevated border border-border flex items-center justify-center mb-3">
              <HistoryIcon />
            </div>
            <p className="text-text-secondary text-sm font-body">No queries yet</p>
            <p className="text-text-muted text-xs font-mono-data mt-1">
              Your questions will appear here
            </p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {[...history].reverse().map((item, i) => (
              <div
                key={item.id}
                className={clsx(
                  'group px-3 py-2.5 rounded-lg border border-transparent',
                  'hover:bg-bg-elevated hover:border-border',
                  'transition-all duration-150 cursor-pointer',
                  'opacity-0 animate-fade-in-up'
                )}
                style={{ animationDelay: `${i * 0.04}s`, animationFillMode: 'forwards' }}
                onClick={() => handleReask(item.question)}
              >
                {/* Type badge + re-ask button */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className={clsx(
                    'text-[10px] font-mono-data px-1.5 py-0.5 rounded',
                    item.outputType === 'chart'
                      ? 'bg-accent-subtle text-accent border border-accent/20'
                      : 'bg-bg-card text-text-muted border border-border'
                  )}>
                    {item.outputType === 'chart' ? '📈 Chart' : '⊞ Table'}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleReask(item.question); }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded text-text-muted hover:text-accent transition-all duration-150"
                    aria-label="Re-ask this question"
                  >
                    <ReaskIcon />
                  </button>
                </div>

                {/* Question text */}
                <p className="text-text-secondary text-xs font-body leading-relaxed line-clamp-2">
                  {item.question}
                </p>

                {/* Metadata */}
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-text-muted text-[10px] font-mono-data">
                    {new Date(item.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
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
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Footer — DB info */}
      <div className="flex-shrink-0 p-3 border-t border-border">
        <div className="bg-bg-elevated border border-border rounded-lg px-3 py-2.5">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-risk-safe inline-block" />
            <span className="text-text-secondary text-xs font-mono-data font-medium">
              lendable_portfolio.db
            </span>
          </div>
          <p className="text-text-muted text-[10px] font-mono-data">
            994 loans · 4 originators · KES
          </p>
          <p className="text-text-muted text-[10px] font-mono-data">
            Jan 2024 – Dec 2025
          </p>
        </div>
      </div>
    </div>
  );
};