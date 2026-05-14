'use client';

import React, { useState } from 'react';
import { clsx } from 'clsx';

interface ErrorBannerProps {
  message: string;
  sql?: string | null;
  onDismiss?: () => void;
  onRetry?: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  message,
  sql,
  onDismiss,
  onRetry,
}) => {
  const [showSql, setShowSql] = useState(false);

  return (
    <div
      className={clsx(
        'rounded-lg border border-risk-danger/20 bg-risk-danger-bg',
        'p-4 animate-fade-in-up'
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="text-risk-danger"
            fill="currentColor"
          >
            <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm8-3.5a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 4.5zm0 7a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-risk-danger text-sm font-body font-medium">
            Query failed
          </p>
          <p className="text-text-secondary text-xs font-body mt-1 leading-relaxed">
            {message}
          </p>

          {/* Failed SQL toggle */}
          {sql && (
            <div className="mt-3">
              <button
                onClick={() => setShowSql(!showSql)}
                className={clsx(
                  'text-[11px] font-mono-data text-text-muted',
                  'hover:text-text-secondary transition-colors',
                  'flex items-center gap-1'
                )}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  className={clsx(
                    'transition-transform duration-200',
                    showSql && 'rotate-90'
                  )}
                >
                  <path d="M3 2l4 3-4 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {showSql ? 'Hide' : 'Show'} failed SQL
              </button>

              {showSql && (
                <pre
                  className={clsx(
                    'mt-2 p-3 rounded bg-bg-base border border-risk-danger/10',
                    'text-[11px] font-mono-data text-text-secondary',
                    'overflow-x-auto whitespace-pre-wrap'
                  )}
                >
                  {sql}
                </pre>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 mt-3">
            {onRetry && (
              <button
                onClick={onRetry}
                className={clsx(
                  'text-xs font-body px-2.5 py-1 rounded',
                  'bg-risk-danger/10 text-risk-danger border border-risk-danger/20',
                  'hover:bg-risk-danger/20 transition-colors'
                )}
              >
                Try again
              </button>
            )}
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-xs font-body text-text-muted hover:text-text-secondary transition-colors"
              >
                Dismiss
              </button>
            )}
          </div>
        </div>

        {/* Dismiss X */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-text-muted hover:text-text-secondary transition-colors p-0.5"
            aria-label="Dismiss error"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M3.293 3.293a1 1 0 011.414 0L7 5.586l2.293-2.293a1 1 0 111.414 1.414L8.414 7l2.293 2.293a1 1 0 01-1.414 1.414L7 8.414l-2.293 2.293a1 1 0 01-1.414-1.414L5.586 7 3.293 4.707a1 1 0 010-1.414z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};