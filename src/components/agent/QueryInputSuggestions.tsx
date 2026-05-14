'use client';

import React from 'react';
import { clsx } from 'clsx';
import { SUGGESTED_QUESTIONS } from '@/lib/constants';

interface QueryInputSuggestionsProps {
  onSelect: (question: string) => void;
  compact?: boolean;
}

export const QueryInputSuggestions: React.FC<QueryInputSuggestionsProps> = ({
  onSelect,
  compact = false,
}) => {
  if (compact) {
    // Inline chips for below the input
    return (
      <div className="flex flex-wrap gap-1.5">
        {SUGGESTED_QUESTIONS.slice(0, 4).map((q) => (
          <button
            key={q.id}
            onClick={() => onSelect(q.question)}
            className={clsx(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full',
              'text-[11px] font-body text-text-muted',
              'bg-bg-elevated border border-border',
              'hover:bg-bg-elevated hover:border-border-strong hover:text-text-secondary',
              'transition-all duration-150',
              'animate-fade-in-up opacity-0'
            )}
            style={{ animationDelay: `${SUGGESTED_QUESTIONS.indexOf(q) * 0.08}s`, animationFillMode: 'forwards' }}
          >
            <span>{q.icon}</span>
            <span>{q.label}</span>
          </button>
        ))}
      </div>
    );
  }

  // Full cards for empty state
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-2xl">
      {SUGGESTED_QUESTIONS.slice(0, 4).map((q, i) => (
        <button
          key={q.id}
          onClick={() => onSelect(q.question)}
          className={clsx(
            'text-left px-4 py-3 rounded-lg',
            'bg-bg-surface border border-border',
            'hover:bg-bg-elevated hover:border-border-strong',
            'hover:shadow-brand-glow-sm',
            'transition-all duration-200 group',
            'animate-fade-in-up opacity-0'
          )}
          style={{ animationDelay: `${0.3 + i * 0.08}s`, animationFillMode: 'forwards' }}
        >
          <div className="flex items-start gap-2.5">
            <span className="text-lg leading-none mt-0.5">{q.icon}</span>
            <div>
              <p className="text-text-secondary text-xs font-body font-medium group-hover:text-text-primary transition-colors">
                {q.label}
              </p>
              <p className="text-text-muted text-[10px] font-body mt-0.5 line-clamp-2 leading-relaxed">
                {q.question.slice(0, 80)}...
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};