'use client';

import React from 'react';
import { clsx } from 'clsx';
import { THINKING_STAGES } from '@/lib/constants';

type ThinkingStage = 'generating' | 'executing' | 'rendering' | null;

interface ThinkingIndicatorProps {
  stage: ThinkingStage;
}

const stageLabels: Record<NonNullable<ThinkingStage>, string> = {
  generating: 'Generating SQL...',
  executing: 'Running query...',
  rendering: 'Rendering results...',
};

const stageIndex: Record<NonNullable<ThinkingStage>, number> = {
  generating: 0,
  executing: 1,
  rendering: 2,
};

export const ThinkingIndicator: React.FC<ThinkingIndicatorProps> = ({ stage }) => {
  if (!stage) return null;

  const currentIndex = stageIndex[stage];

  return (
    <div
      className={clsx(
        'flex flex-col gap-4 py-6 px-4',
        'animate-fade-in-up'
      )}
      role="status"
      aria-live="polite"
      aria-label={stageLabels[stage]}
    >
      {/* Dots */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={clsx(
                'rounded-full transition-all duration-300',
                i <= currentIndex
                  ? 'w-2 h-2 bg-brand-primary'
                  : 'w-1.5 h-1.5 bg-text-muted'
              )}
              style={{
                animation:
                  i === currentIndex
                    ? 'pulseDot 1.4s ease-in-out infinite'
                    : 'none',
                animationDelay: `${i * 0.16}s`,
              }}
            />
          ))}
        </div>

        <span className="font-mono-data text-text-secondary text-xs">
          {stageLabels[stage]}
        </span>
      </div>

      {/* Stage progress */}
      <div className="flex items-center gap-2">
        {THINKING_STAGES.map((s, i) => (
          <React.Fragment key={s.key}>
            <div
              className={clsx(
                'flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono-data',
                'border transition-all duration-300',
                i < currentIndex
                  ? 'bg-brand-subtle border-brand-primary/30 text-brand-primary'
                  : i === currentIndex
                  ? 'bg-brand-subtle border-brand-primary text-brand-primary shadow-brand-glow-sm'
                  : 'bg-transparent border-border-subtle text-text-muted'
              )}
            >
              {i < currentIndex ? (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <polyline
                    points="1.5,5 4,7.5 8.5,2.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : i === currentIndex ? (
                <span
                  className="w-1.5 h-1.5 rounded-full bg-brand-primary"
                  style={{ animation: 'pulseDot 1.4s ease-in-out infinite' }}
                />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-text-muted/40" />
              )}
              {s.label.replace('...', '')}
            </div>
            {i < THINKING_STAGES.length - 1 && (
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                className={clsx(
                  'flex-shrink-0 transition-colors duration-300',
                  i < currentIndex ? 'text-brand-primary/40' : 'text-text-muted/20'
                )}
              >
                <path
                  d="M0 4h10M7 1l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};