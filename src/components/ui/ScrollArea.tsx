'use client';

import React from 'react';
import { clsx } from 'clsx';

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'vertical' | 'horizontal' | 'both';
  maxHeight?: string;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  className,
  orientation = 'vertical',
  maxHeight,
}) => {
  return (
    <div
      className={clsx(
        'overflow-hidden relative',
        className
      )}
      style={{ maxHeight }}
    >
      <div
        className={clsx('h-full', {
          'overflow-y-auto overflow-x-hidden': orientation === 'vertical',
          'overflow-x-auto overflow-y-hidden': orientation === 'horizontal',
          'overflow-auto': orientation === 'both',
        })}
      >
        {children}
      </div>
    </div>
  );
};