'use client';

import React from 'react';
import { clsx } from 'clsx';
import { QueryInputSuggestions } from './QueryInputSuggestions';

interface EmptyStateProps {
  onSelectQuestion: (question: string) => void;
}

// Lendable diamond with data visualization aesthetic
const HeroMark = () => (
  <div className="relative flex items-center justify-center w-20 h-20">
    {/* Outer glow ring */}
    <div
      className="absolute inset-0 rounded-full opacity-20"
      style={{
        background:
          'radial-gradient(circle, var(--color-brand-primary) 0%, transparent 70%)',
        animation: 'glowPulse 3s ease-in-out infinite',
      }}
    />
    {/* Diamond mark */}
    <svg
      width="48"
      height="48"
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
        'px-6 py-12 text-center',
        'animate-fade-in'
      )}
    >
      {/* Hero mark */}
      <div
        className="mb-6 animate-fade-in-up opacity-0"
        style={{ animationDelay: '0.05s', animationFillMode: 'forwards' }}
      >
        <HeroMark />
      </div>

      {/* Heading */}
      <div
        className="mb-2 animate-fade-in-up opacity-0"
        style={{ animationDelay: '0.12s', animationFillMode: 'forwards' }}
      >
        <h1 className="font-display font-bold text-2xl text-text-primary tracking-tight">
          Ask anything about the portfolio
        </h1>
      </div>

      {/* Sub-heading */}
      <div
        className="mb-8 animate-fade-in-up opacity-0"
        style={{ animationDelay: '0.18s', animationFillMode: 'forwards' }}
      >
        <p className="text-text-secondary text-sm font-body max-w-md leading-relaxed">
          Natural language queries on{' '}
          <span className="text-brand-primary font-mono-data">994 loans</span> across{' '}
          <span className="text-brand-primary font-mono-data">4 originators</span>.
          <br />
          Get charts, tables, and risk analysis — no SQL required.
        </p>
      </div>

      {/* Suggestion cards */}
      <QueryInputSuggestions onSelect={onSelectQuestion} compact={false} />

      {/* Bottom hint */}
      <div
        className="mt-8 animate-fade-in-up opacity-0"
        style={{ animationDelay: '0.55s', animationFillMode: 'forwards' }}
      >
        <p className="text-text-muted text-[11px] font-mono-data">
          Press{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-bg-elevated border border-border text-[10px]">
            Enter
          </kbd>{' '}
          to submit ·{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-bg-elevated border border-border text-[10px]">
            Shift+Enter
          </kbd>{' '}
          for new line
        </p>
      </div>
    </div>
  );
};