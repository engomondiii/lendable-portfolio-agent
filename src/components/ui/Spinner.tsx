'use client';

import React from 'react';
import { clsx } from 'clsx';

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'brand' | 'muted' | 'white';
  className?: string;
}

const sizeMap = {
  xs: 'w-3 h-3 border',
  sm: 'w-4 h-4 border',
  md: 'w-5 h-5 border-2',
  lg: 'w-7 h-7 border-2',
};

const colorMap = {
  brand: 'border-brand-primary/20 border-t-brand-primary',
  muted: 'border-text-muted/20 border-t-text-muted',
  white: 'border-white/20 border-t-white',
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'brand',
  className,
}) => {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={clsx(
        'inline-block rounded-full animate-spin',
        sizeMap[size],
        colorMap[color],
        className
      )}
    />
  );
};