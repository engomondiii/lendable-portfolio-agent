'use client';

import React, { useEffect } from 'react';
import { clsx } from 'clsx';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  size = 'md',
  className,
}) => {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg-overlay backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={clsx(
          'relative w-full bg-bg-surface border border-border rounded-xl shadow-modal',
          'animate-fade-in-up',
          sizeStyles[size],
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 id="modal-title" className="font-display text-base font-semibold text-text-primary">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary transition-colors"
              aria-label="Close modal"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M3.293 3.293a1 1 0 011.414 0L8 6.586l3.293-3.293a1 1 0 111.414 1.414L9.414 8l3.293 3.293a1 1 0 01-1.414 1.414L8 9.414l-3.293 3.293a1 1 0 01-1.414-1.414L6.586 8 3.293 4.707a1 1 0 010-1.414z" />
              </svg>
            </button>
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};