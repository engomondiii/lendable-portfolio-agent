'use client';

import React from 'react';
import { clsx } from 'clsx';
import { useUIStore } from '@/store/uiStore';

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M3 5h12M3 9h12M3 13h12"/>
  </svg>
);

const SqlIcon = () => (
  <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 5l-2 2.5L3 10M12 5l2 2.5L12 10M8.5 3l-2 9"/>
  </svg>
);

// Panel open/close icon — shows direction of panel
const PanelRightIcon = ({ open }: { open: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    {/* Outer rectangle */}
    <rect x="1" y="1" width="12" height="12" rx="1.5" />
    {/* Right panel divider */}
    <path d="M9 1v12" />
    {/* Arrow inside right panel — points left when open (close), right when closed (open) */}
    {open
      ? <path d="M11 5l-1.5 2 1.5 2" strokeLinejoin="round" />
      : <path d="M10 5l1.5 2-1.5 2" strokeLinejoin="round" />
    }
  </svg>
);

const DiamondIcon = () => (
  <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
    <path d="M20 2L38 20L20 38L2 20L20 2Z" fill="var(--color-accent)" opacity="0.2"/>
    <path d="M20 2L38 20L20 38L2 20L20 2Z" stroke="var(--color-accent)" strokeWidth="2" fill="none"/>
    <path d="M20 11L29 20L20 29L11 20L20 11Z" fill="var(--color-accent)"/>
  </svg>
);

export const TopBar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, sqlPanelOpen, setSqlPanelOpen } = useUIStore();

  return (
    <header
      className={clsx(
        'flex-shrink-0 h-14 flex items-center justify-between',
        'px-4 border-b border-border bg-bg-surface z-30'
      )}
    >
      {/* Left — hamburger + logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded text-text-tertiary hover:text-text-primary hover:bg-bg-elevated transition-all duration-150"
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          <MenuIcon />
        </button>

        <div className="flex items-center gap-2.5">
          <DiamondIcon />
          <div>
            <p className="font-display font-bold text-text-primary text-sm leading-none tracking-tight">
              Lendable
            </p>
            <p className="text-text-muted text-[10px] font-mono-data leading-none mt-0.5 uppercase tracking-widest">
              Portfolio Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Center — live stats pill */}
      <div className="hidden md:flex items-center gap-2 bg-bg-elevated border border-border rounded-full px-3 py-1.5">
        <span
          className="w-1.5 h-1.5 rounded-full bg-risk-safe inline-block flex-shrink-0"
          style={{ boxShadow: '0 0 6px var(--color-risk-safe)' }}
        />
        <span className="text-text-secondary text-xs font-mono-data">
          994 loans · 4 originators · Jan 2024 – Dec 2025
        </span>
      </div>

      {/* Right — SQL toggle + connection status */}
      <div className="flex items-center gap-2">

        {/* SQL toggle — shows panel push icon + active state */}
        <button
          onClick={() => setSqlPanelOpen(!sqlPanelOpen)}
          className={clsx(
            'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-mono-data',
            'border transition-all duration-200',
            sqlPanelOpen
              ? [
                  'bg-accent-subtle text-accent',
                  'border-accent/50',
                  'shadow-[0_0_10px_var(--color-accent-glow)]',
                ]
              : [
                  'text-text-tertiary border-border',
                  'hover:text-text-secondary hover:border-border-strong hover:bg-bg-elevated',
                ]
          )}
          aria-label={sqlPanelOpen ? 'Close SQL panel' : 'Open SQL panel'}
          aria-pressed={sqlPanelOpen}
        >
          <PanelRightIcon open={sqlPanelOpen} />
          <span>SQL</span>
          {sqlPanelOpen && (
            <span className="text-[10px] text-accent/70 font-mono-data border-l border-accent/30 pl-2">
              open
            </span>
          )}
        </button>

        {/* Connection status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-bg-elevated border border-border">
          <span
            className="w-2 h-2 rounded-full bg-risk-safe flex-shrink-0"
            style={{ boxShadow: '0 0 6px var(--color-risk-safe)' }}
          />
          <span className="text-text-secondary text-xs font-mono-data hidden sm:inline">
            claude-sonnet-4
          </span>
        </div>
      </div>
    </header>
  );
};