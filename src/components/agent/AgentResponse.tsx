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
  children?: React.ReactNode;
}

const QuestionBubble: React.FC<{ question: string }> = ({ question }) => (
  <div className="flex items-start gap-3 mb-5 animate-fade-in-up">
    {/* User avatar */}
    <div
      className={clsx(
        'flex-shrink-0 w-8 h-8 rounded-full',
        'bg-bg-elevated border border-border-strong',
        'flex items-center justify-center',
        'text-text-secondary text-xs font-mono-data font-semibold'
      )}
    >
      U
    </div>
    {/* Question text — full brightness, readable size */}
    <div className="flex-1 pt-1">
      <p className="text-text-primary text-base font-body leading-relaxed font-medium">
        {question}
      </p>
    </div>
  </div>
);

const AgentAvatar = () => (
  <div
    className={clsx(
      'flex-shrink-0 w-8 h-8 rounded-full',
      'bg-brand-subtle border border-brand-primary/40',
      'flex items-center justify-center'
    )}
  >
    <svg width="14" height="14" viewBox="0 0 40 40" fill="var(--color-brand-primary)">
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

        <div className="flex-1 min-w-0 pt-1">
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

              {/* Explanation box — bright and readable */}
              {result.explanation && (
                <div
                  className={clsx(
                    'mb-4 px-4 py-3.5 rounded-lg',
                    'bg-bg-elevated border border-border-strong',
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 14 14"
                      className="text-brand-primary flex-shrink-0 mt-0.5"
                      fill="currentColor"
                    >
                      <path d="M7 0a7 7 0 100 14A7 7 0 007 0zm0 3a1 1 0 110 2 1 1 0 010-2zm0 3.5a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 017 6.5z" />
                    </svg>
                    {/* Explanation text — text-primary for maximum readability */}
                    <p className="text-text-primary text-sm font-body leading-relaxed">
                      {result.explanation}
                    </p>
                  </div>
                </div>
              )}

              {/* Result metadata row */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={clsx(
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded',
                    'text-xs font-mono-data font-medium',
                    'bg-brand-subtle border border-brand-primary/30 text-brand-primary'
                  )}
                >
                  {result.output_type === 'chart' ? '📈' : '⊞'}
                  {result.output_type === 'chart'
                    ? (result.chart_type?.toUpperCase() ?? '') + ' CHART'
                    : 'TABLE'}
                </span>
                <span className="text-text-secondary text-xs font-mono-data">
                  {result.row_count} row{result.row_count !== 1 ? 's' : ''}
                  {result.execution_time_ms != null &&
                    ` · ${result.execution_time_ms}ms`}
                </span>
              </div>

              {/* Results panel (chart or table) */}
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};