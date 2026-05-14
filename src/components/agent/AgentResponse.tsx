'use client';

import React from 'react';
import { clsx } from 'clsx';
import { ThinkingIndicator } from './ThinkingIndicator';
import { ErrorBanner } from './ErrorBanner';
import { QueryResponse } from '@/types/query.types';

type ThinkingStage = 'generating' | 'executing' | 'rendering' | null;

interface AgentResponseProps {
  question: string;
  isLoading: boolean;
  thinkingStage: ThinkingStage;
  result: QueryResponse | null;
  error: string | null;
  errorSql?: string | null;
  onDismissError?: () => void;
  onRetry?: () => void;
  // Results panel is rendered as children (passed in from parent)
  children?: React.ReactNode;
}

const QuestionBubble: React.FC<{ question: string }> = ({ question }) => (
  <div className="flex items-start gap-3 mb-4 animate-fade-in-up">
    {/* Avatar */}
    <div
      className={clsx(
        'flex-shrink-0 w-7 h-7 rounded-full',
        'bg-bg-elevated border border-border',
        'flex items-center justify-center',
        'text-text-muted text-[11px] font-mono-data font-medium'
      )}
    >
      U
    </div>
    {/* Question */}
    <div className="flex-1 pt-0.5">
      <p className="text-text-primary text-sm font-body leading-relaxed">{question}</p>
    </div>
  </div>
);

const AgentAvatar = () => (
  <div
    className={clsx(
      'flex-shrink-0 w-7 h-7 rounded-full',
      'bg-brand-subtle border border-brand-primary/30',
      'flex items-center justify-center'
    )}
  >
    <svg width="12" height="12" viewBox="0 0 40 40" fill="var(--color-brand-primary)">
      <path d="M20 2L38 20L20 38L2 20L20 2Z" opacity="0.3" />
      <path d="M20 10L30 20L20 30L10 20L20 10Z" />
    </svg>
  </div>
);

export const AgentResponse: React.FC<AgentResponseProps> = ({
  question,
  isLoading,
  thinkingStage,
  result,
  error,
  errorSql,
  onDismissError,
  onRetry,
  children,
}) => {
  return (
    <div className="w-full animate-fade-in-up">
      {/* User question */}
      {question && <QuestionBubble question={question} />}

      {/* Agent response area */}
      <div className="flex items-start gap-3">
        <AgentAvatar />

        <div className="flex-1 min-w-0 pt-0.5">
          {/* Thinking state */}
          {isLoading && thinkingStage && (
            <ThinkingIndicator stage={thinkingStage} />
          )}

          {/* Error state */}
          {!isLoading && error && (
            <ErrorBanner
              message={error}
              sql={errorSql}
              onDismiss={onDismissError}
              onRetry={onRetry}
            />
          )}

          {/* Result state */}
          {!isLoading && result && !error && (
            <div className="animate-fade-in-up">
              {/* Explanation text */}
              {result.explanation && (
                <div
                  className={clsx(
                    'mb-4 px-4 py-3 rounded-lg',
                    'bg-bg-elevated border border-border',
                    'text-text-secondary text-sm font-body leading-relaxed'
                  )}
                >
                  <div className="flex items-start gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      className="text-brand-primary flex-shrink-0 mt-0.5"
                      fill="currentColor"
                    >
                      <path d="M7 0a7 7 0 100 14A7 7 0 007 0zm0 3a1 1 0 110 2 1 1 0 010-2zm0 3.5a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 017 6.5z" />
                    </svg>
                    <p>{result.explanation}</p>
                  </div>
                </div>
              )}

              {/* Result metadata */}
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={clsx(
                    'inline-flex items-center gap-1.5 px-2 py-0.5 rounded',
                    'text-[10px] font-mono-data',
                    'bg-brand-subtle border border-brand-primary/20 text-brand-primary'
                  )}
                >
                  {result.output_type === 'chart' ? '📈' : '⊞'}
                  {result.output_type === 'chart'
                    ? result.chart_type?.toUpperCase() + ' CHART'
                    : 'TABLE'}
                </span>
                <span className="text-text-muted text-[10px] font-mono-data">
                  {result.row_count} row{result.row_count !== 1 ? 's' : ''}
                  {result.execution_time_ms != null &&
                    ` · ${result.execution_time_ms}ms`}
                </span>
              </div>

              {/* The actual results panel (injected as children) */}
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};