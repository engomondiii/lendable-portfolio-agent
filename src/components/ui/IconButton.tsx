'use client';

import React from 'react';
import { clsx } from 'clsx';
import { Tooltip } from './Tooltip';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'subtle' | 'brand';
  tooltip?: boolean;
}

const sizeStyles = {
  sm: 'w-7 h-7',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

const variantStyles = {
  ghost:
    'text-text-muted hover:text-text-primary hover:bg-bg-elevated rounded transition-all duration-150',
  subtle:
    'text-text-secondary hover:text-text-primary bg-bg-elevated hover:bg-bg-elevated border border-border hover:border-border-strong rounded transition-all duration-150',
  brand:
    'text-brand-primary hover:text-text-inverse hover:bg-brand-primary rounded transition-all duration-150',
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, size = 'md', variant = 'ghost', tooltip = true, className, ...props }, ref) => {
    const button = (
      <button
        ref={ref}
        aria-label={label}
        className={clsx(
          'inline-flex items-center justify-center flex-shrink-0',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {icon}
      </button>
    );

    if (tooltip) {
      return <Tooltip content={label}>{button}</Tooltip>;
    }

    return button;
  }
);

IconButton.displayName = 'IconButton';