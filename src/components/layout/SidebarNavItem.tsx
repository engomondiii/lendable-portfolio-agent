'use client';

import React from 'react';
import { clsx } from 'clsx';

interface SidebarNavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string | number;
  onClick?: () => void;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  icon,
  label,
  active = false,
  badge,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-full flex items-center gap-3 px-3 py-2 rounded text-sm',
        'transition-all duration-150 group',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50',
        active
          ? 'bg-brand-subtle text-brand-primary border border-brand-primary/20'
          : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated border border-transparent'
      )}
      aria-current={active ? 'page' : undefined}
    >
      <span
        className={clsx(
          'flex-shrink-0 transition-colors duration-150',
          active ? 'text-brand-primary' : 'text-text-muted group-hover:text-text-secondary'
        )}
      >
        {icon}
      </span>
      <span className="flex-1 text-left font-body truncate">{label}</span>
      {badge !== undefined && (
        <span
          className={clsx(
            'font-mono-data text-[10px] px-1.5 py-0.5 rounded-full leading-none',
            active
              ? 'bg-brand-primary/20 text-brand-primary'
              : 'bg-bg-elevated text-text-muted border border-border'
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
};