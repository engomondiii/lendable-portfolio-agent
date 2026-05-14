'use client';

import React from 'react';
import { clsx } from 'clsx';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  label,
  className,
}) => {
  if (orientation === 'vertical') {
    return (
      <span
        className={clsx(
          'inline-block w-px self-stretch bg-border',
          className
        )}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  if (label) {
    return (
      <div
        className={clsx('flex items-center gap-3', className)}
        role="separator"
        aria-orientation="horizontal"
      >
        <span className="flex-1 h-px bg-border" />
        <span className="text-text-muted text-xs font-body uppercase tracking-wider">
          {label}
        </span>
        <span className="flex-1 h-px bg-border" />
      </div>
    );
  }

  return (
    <hr
      className={clsx('border-0 h-px bg-border', className)}
      role="separator"
    />
  );
};