'use client';

import React from 'react';
import { clsx } from 'clsx';
import { QueryInputSuggestions } from './QueryInputSuggestions';

interface EmptyStateProps {
  onSelectQuestion: (question: string) => void;
}

const HeroMark = () => (
  <div className="relative flex items-center justify-center w-24 h-24">
    {/* Glow ring */}
    <div
      className="absolute inset-0 rounded-full opacity-25"
      style={{
        background: 'radial-gradient(circle, var(--color-brand-primary) 0%, transparent 70%)',
        animationName: 'glowPulse',
        animationDuration: '3s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        animationFillMode: 'none',
      }}
    />
    <svg
      width="56"
      height="56"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="relative z-10"
    >
      <path
        d="M20 2L38 20L20 38L2 20L20 2Z"
        fill="var(--color-brand-primary)"
        opacity="0.15"
      />
      <path
        d="M20 2L38 20L20 38L2 20L20 2Z"
        stroke="var(--color-brand-primary)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M20 10L30 20L20 30L10 20L20 10Z"
        fill="var(--color-brand-primary)"
      />
    </svg>
  </div>
);

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectQuestion }) => {
  return (
    <div
      className={clsx(
        'flex-1 flex flex-col items-center justify-center',
        'px-6 py-16 text-center',
        'animate-fade-in'
      )}
    >
      {/* Hero mark */}
      <div
        className="mb-7 animate-fade-in-up opacity-0"
        style={{ animationDelay: '0.05s', animationFillMode: 'forwards' }}
      >
        <HeroMark />
      </div>

      {/* Main heading — large and bright */}
      <div
        className="mb-3 animate-fade-in-up opacity-0"
        style={{ animationDelay: '0.12s', animationFillMode: 'forwards' }}
      >
        <h1 className="font-display font-bold text-3xl text-text-primary tracking-tight">
          Ask anything about the portfolio
        </h1>
      </div>

      {/* Sub-heading — bright secondary text */}
      <div
        className="mb-10 animate-fade-in-up opacity-0"
        style={{ animationDelay: '0.18s', animationFillMode: 'forwards' }}
      >
        <p className="text-text-secondary text-base font-body max-w-lg leading-relaxed">
          Natural language queries on{' '}
          <span className="text-brand-primary font-mono-data font-medium">994 loans</span>{' '}
          across{' '}
          <span className="text-brand-primary font-mono-data font-medium">4 originators</span>.
          <br />
          Get charts, tables, and risk analysis — no SQL required.
        </p>
      </div>

      {/* Suggestion cards */}
      <QueryInputSuggestions onSelect={onSelectQuestion} compact={false} />

      {/* Keyboard hint */}
      <div
        className="mt-10 animate-fade-in-up opacity-0"
        style={{ animationDelay: '0.55s', animationFillMode: 'forwards' }}
      >
        <p className="text-text-muted text-sm font-mono-data">
          Press{' '}
          <kbd className="px-2 py-0.5 rounded bg-bg-elevated border border-border-strong text-text-secondary text-xs">
            Enter
          </kbd>{' '}
          to submit ·{' '}
          <kbd className="px-2 py-0.5 rounded bg-bg-elevated border border-border-strong text-text-secondary text-xs">
            Shift+Enter
          </kbd>{' '}
          for new line
        </p>
      </div>
    </div>
  );
};