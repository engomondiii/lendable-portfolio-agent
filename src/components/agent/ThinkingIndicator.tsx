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

// ── FIX: Separate components for each dot so we can set animationDelay
// as a prop without mixing animation shorthand + animationDelay on the same element.
// The root cause of the warning was using both `animation: 'pulseDot ...'` (shorthand)
// AND `animationDelay: '...'` in the same style object on the same element.
// Solution: use animationName + animationDuration + animationDelay separately — no shorthand.

interface PulseDotProps {
  active: boolean;
  filled: boolean;
  delayMs: number;
}

const PulseDot: React.FC<PulseDotProps> = ({ active, filled, delayMs }) => {
  const baseStyle: React.CSSProperties = filled
    ? { width: '8px', height: '8px' }
    : { width: '6px', height: '6px' };

  const animStyle: React.CSSProperties = active
    ? {
        // Use individual animation properties — no shorthand — to avoid the warning
        animationName: 'pulseDot',
        animationDuration: '1.4s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        animationDelay: `${delayMs}ms`,
        animationFillMode: 'none',
      }
    : {};

  return (
    <span
      className={clsx(
        'rounded-full transition-all duration-300 inline-block',
        filled ? 'bg-brand-primary' : 'bg-text-muted'
      )}
      style={{ ...baseStyle, ...animStyle }}
    />
  );
};

export const ThinkingIndicator: React.FC<ThinkingIndicatorProps> = ({ stage }) => {
  if (!stage) return null;

  const currentIndex = stageIndex[stage];

  return (
    <div
      className={clsx('flex flex-col gap-4 py-6 px-4', 'animate-fade-in-up')}
      role="status"
      aria-live="polite"
      aria-label={stageLabels[stage]}
    >
      {/* Animated dots row */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <PulseDot
              key={i}
              active={i === currentIndex}
              filled={i <= currentIndex}
              delayMs={i * 160}
            />
          ))}
        </div>
        <span className="font-mono-data text-text-secondary text-sm">
          {stageLabels[stage]}
        </span>
      </div>

      {/* Stage progress pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {THINKING_STAGES.map((s, i) => (
          <React.Fragment key={s.key}>
            <div
              className={clsx(
                'flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono-data',
                'border transition-all duration-300',
                i < currentIndex
                  ? 'bg-brand-subtle border-brand-primary/30 text-brand-primary'
                  : i === currentIndex
                  ? 'bg-brand-subtle border-brand-primary text-brand-primary shadow-brand-glow-sm'
                  : 'bg-transparent border-border-subtle text-text-muted'
              )}
            >
              {/* Stage icon */}
              {i < currentIndex ? (
                // Checkmark for completed stages
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <polyline
                    points="1.5,5 4,7.5 8.5,2.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : i === currentIndex ? (
                // Active pulse dot — using individual animation props, no shorthand
                <span
                  className="w-1.5 h-1.5 rounded-full bg-brand-primary inline-block"
                  style={{
                    animationName: 'pulseDot',
                    animationDuration: '1.4s',
                    animationTimingFunction: 'ease-in-out',
                    animationIterationCount: 'infinite',
                    animationDelay: '0ms',
                    animationFillMode: 'none',
                  }}
                />
              ) : (
                // Inactive dot
                <span className="w-1.5 h-1.5 rounded-full bg-text-muted/40 inline-block" />
              )}
              {/* Label without the trailing '...' */}
              {s.label.replace('...', '')}
            </div>

            {/* Arrow between stages */}
            {i < THINKING_STAGES.length - 1 && (
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                className={clsx(
                  'flex-shrink-0 transition-colors duration-300',
                  i < currentIndex ? 'text-brand-primary/50' : 'text-text-muted/25'
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