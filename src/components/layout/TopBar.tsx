'use client';

import React from 'react';
import { clsx } from 'clsx';
import { useUIStore } from '@/store/uiStore';
import { IconButton } from '@/components/ui/IconButton';

// Lendable diamond mark as inline SVG
const LendableMark = () => (
  <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 2L38 20L20 38L2 20L20 2Z"
      fill="currentColor"
      className="text-brand-primary"
    />
    <path
      d="M20 10L30 20L20 30L10 20L20 10Z"
      fill="currentColor"
      className="text-bg-base"
    />
  </svg>
);

const MenuIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

const SqlIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M3 5l-2 2.5L3 10M12 5l2 2.5L12 10M8.5 3l-2 9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TopBar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, sqlPanelOpen, setSqlPanelOpen } = useUIStore();

  return (
    <header
      className={clsx(
        'h-topbar flex items-center justify-between',
        'px-4 border-b border-border',
        'bg-bg-surface/80 backdrop-blur-sm',
        'sticky top-0 z-40',
        '[grid-area:topbar]'
      )}
    >
      {/* Left — menu toggle + logo */}
      <div className="flex items-center gap-3">
        <IconButton
          icon={<MenuIcon />}
          label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          variant="ghost"
          size="sm"
        />

        <div className="flex items-center gap-2.5">
          <LendableMark />
          <div className="flex flex-col">
            <span className="font-display font-bold text-text-primary text-sm leading-tight tracking-tight">
              Lendable
            </span>
            <span className="font-mono-data text-text-muted text-[10px] leading-tight uppercase tracking-widest">
              Portfolio Intelligence
            </span>
          </div>
        </div>
      </div>

      {/* Center — breadcrumb */}
      <div className="hidden md:flex items-center gap-2 text-text-muted text-xs font-mono-data">
        <span className="text-text-secondary">lendable_portfolio.db</span>
        <span>/</span>
        <span className="text-brand-primary">994 loans</span>
        <span>/</span>
        <span>2024 – 2025</span>
      </div>

      {/* Right — SQL panel toggle + connection */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSqlPanelOpen(!sqlPanelOpen)}
          className={clsx(
            'hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-mono-data',
            'border transition-all duration-150',
            sqlPanelOpen
              ? 'bg-brand-subtle text-brand-primary border-brand-primary/30'
              : 'text-text-muted border-border hover:text-text-secondary hover:border-border-strong'
          )}
        >
          <SqlIcon />
          <span>SQL</span>
        </button>

        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-bg-elevated border border-border text-xs font-mono-data text-text-secondary">
          <span className="status-dot" />
          <span className="hidden sm:inline">Connected</span>
        </div>
      </div>
    </header>
  );
};