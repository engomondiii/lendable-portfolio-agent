'use client';

import React from 'react';
import { clsx } from 'clsx';

export type BadgeVariant = 'default' | 'brand' | 'danger' | 'warning' | 'caution' | 'safe' | 'neutral';
export type BadgeSize = 'xs' | 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-bg-elevated text-text-secondary border border-border',
  brand: 'bg-brand-subtle text-brand-primary border border-brand-primary/20',
  danger: 'bg-risk-danger-bg text-risk-danger border border-risk-danger/20',
  warning: 'bg-risk-warning-bg text-risk-warning border border-risk-warning/20',
  caution: 'bg-risk-caution-bg text-risk-caution border border-risk-caution/20',
  safe: 'bg-risk-safe-bg text-risk-safe border border-risk-safe/20',
  neutral: 'bg-risk-neutral-bg text-risk-neutral border border-risk-neutral/20',
};

const sizeStyles: Record<BadgeSize, string> = {
  xs: 'text-[10px] px-1.5 py-0.5 gap-1',
  sm: 'text-xs px-2 py-0.5 gap-1.5',
  md: 'text-xs px-2.5 py-1 gap-1.5',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-text-muted',
  brand: 'bg-brand-primary',
  danger: 'bg-risk-danger',
  warning: 'bg-risk-warning',
  caution: 'bg-risk-caution',
  safe: 'bg-risk-safe',
  neutral: 'bg-risk-neutral',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'sm',
  dot = false,
  children,
  className,
}) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-body font-medium rounded-full',
        'whitespace-nowrap font-mono-data tracking-wide uppercase',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={clsx('rounded-full flex-shrink-0', dotColors[variant], {
            'w-1.5 h-1.5': size !== 'xs',
            'w-1 h-1': size === 'xs',
          })}
        />
      )}
      {children}
    </span>
  );
};