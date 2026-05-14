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
        'px-4 border-b border-border',
        'bg-bg-surface',
        'z-30'
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
            <p className="text-text-muted text-[10px] font-mono leading-none mt-0.5 uppercase tracking-widest">
              Portfolio Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Center — live stats pill */}
      <div className="hidden md:flex items-center gap-1 bg-bg-elevated border border-border rounded-full px-3 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-risk-safe inline-block" />
        <span className="text-text-secondary text-xs font-mono-data">
          994 loans · 4 originators · Jan 2024 – Dec 2025
        </span>
      </div>

      {/* Right — SQL toggle + connection status */}
      <div className="flex items-center gap-2">
        {/* SQL toggle button */}
        <button
          onClick={() => setSqlPanelOpen(!sqlPanelOpen)}
          className={clsx(
            'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-mono-data',
            'border transition-all duration-150',
            sqlPanelOpen
              ? 'bg-accent-subtle text-accent border-accent/40 shadow-brand-glow-sm'
              : 'text-text-tertiary border-border hover:text-text-secondary hover:border-border-strong hover:bg-bg-elevated'
          )}
        >
          <SqlIcon />
          <span>SQL</span>
        </button>

        {/* Connection status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-bg-elevated border border-border">
          <span className="w-2 h-2 rounded-full bg-risk-safe" style={{
            boxShadow: '0 0 6px var(--color-risk-safe)',
            animationName: 'glowPulse',
            animationDuration: '2s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }} />
          <span className="text-text-secondary text-xs font-mono-data hidden sm:inline">
            claude-sonnet-4
          </span>
        </div>
      </div>
    </header>
  );
};