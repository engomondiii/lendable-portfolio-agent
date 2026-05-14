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
    // Inline chips below the input
    return (
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_QUESTIONS.slice(0, 4).map((q, idx) => (
          <button
            key={q.id}
            onClick={() => onSelect(q.question)}
            className={clsx(
              'inline-flex items-center gap-2 px-3 py-1.5 rounded-full',
              // Larger, brighter text
              'text-sm font-body text-text-secondary',
              'bg-bg-elevated border border-border-strong',
              'hover:border-brand-primary/50 hover:text-text-primary hover:bg-bg-elevated',
              'transition-all duration-150',
              'animate-fade-in-up opacity-0'
            )}
            style={{
              animationDelay: `${idx * 0.08}s`,
              animationFillMode: 'forwards',
            }}
          >
            <span className="text-base">{q.icon}</span>
            <span>{q.label}</span>
          </button>
        ))}
      </div>
    );
  }

  // Full cards for empty state
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
      {SUGGESTED_QUESTIONS.slice(0, 4).map((q, i) => (
        <button
          key={q.id}
          onClick={() => onSelect(q.question)}
          className={clsx(
            'text-left px-4 py-4 rounded-lg',
            'bg-bg-surface border border-border-strong',
            'hover:bg-bg-elevated hover:border-brand-primary/50',
            'hover:shadow-brand-glow-sm',
            'transition-all duration-200 group',
            'animate-fade-in-up opacity-0'
          )}
          style={{
            animationDelay: `${0.3 + i * 0.08}s`,
            animationFillMode: 'forwards',
          }}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl leading-none mt-0.5">{q.icon}</span>
            <div>
              {/* Card label — bright and readable */}
              <p className="text-text-primary text-sm font-body font-semibold group-hover:text-brand-primary transition-colors">
                {q.label}
              </p>
              {/* Card description — secondary but still readable */}
              <p className="text-text-secondary text-xs font-body mt-1 line-clamp-2 leading-relaxed">
                {q.question.slice(0, 90)}...
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};