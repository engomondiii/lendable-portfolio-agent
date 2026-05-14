'use client';

import React, { useState, useRef } from 'react';
import { clsx } from 'clsx';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

const positionStyles = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 400,
  className,
}) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  return (
    <span
      className={clsx('relative inline-flex items-center', className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className={clsx(
            'absolute z-50 pointer-events-none',
            'px-2.5 py-1.5 rounded',
            'bg-bg-elevated border border-border-strong',
            'text-text-primary text-xs font-body',
            'shadow-elevated whitespace-nowrap',
            'animate-fade-in',
            positionStyles[position]
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
};