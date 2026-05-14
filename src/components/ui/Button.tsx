'use client';

import React from 'react';
import { clsx } from 'clsx';
import { Spinner } from './Spinner';

export type ButtonVariant = 'brand' | 'ghost' | 'danger' | 'subtle';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  brand: [
    'bg-brand-primary text-bg-base font-semibold',
    'hover:bg-brand-deep hover:shadow-brand-glow-sm hover:-translate-y-px',
    'active:translate-y-0',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none',
  ].join(' '),
  ghost: [
    'bg-transparent text-text-secondary border border-border',
    'hover:bg-bg-elevated hover:text-text-primary hover:border-border-strong',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),
  danger: [
    'bg-risk-danger-bg text-risk-danger border border-risk-danger/20',
    'hover:bg-risk-danger/20 hover:border-risk-danger/40',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),
  subtle: [
    'bg-bg-elevated text-text-secondary border border-border-subtle',
    'hover:bg-bg-elevated hover:text-text-primary hover:border-border',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-xs px-2.5 py-1.5 gap-1.5 rounded',
  md: 'text-sm px-3.5 py-2 gap-2 rounded',
  lg: 'text-sm px-5 py-2.5 gap-2 rounded-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'ghost',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          'inline-flex items-center justify-center font-body',
          'transition-all duration-150 ease-smooth',
          'select-none whitespace-nowrap',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <Spinner size="sm" />
        ) : leftIcon ? (
          <span className="flex-shrink-0">{leftIcon}</span>
        ) : null}
        {children && <span>{children}</span>}
        {!loading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';