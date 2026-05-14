'use client';

import React from 'react';
import { clsx } from 'clsx';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { StatusBar } from './StatusBar';
import { useUIStore } from '@/store/uiStore';

interface RootLayoutProps {
  children: React.ReactNode;
  sqlPanel?: React.ReactNode;
}

export const RootLayout: React.FC<RootLayoutProps> = ({ children, sqlPanel }) => {
  const { sidebarOpen, sqlPanelOpen } = useUIStore();

  return (
    <div
      className={clsx(
        'h-screen overflow-hidden',
        // Grid layout
        'grid',
        // Rows: topbar | content | statusbar
        'grid-rows-[var(--topbar-height)_1fr_var(--statusbar-height)]',
        // Cols: sidebar | main | (optional sql panel)
        sidebarOpen && sqlPanelOpen
          ? 'grid-cols-[var(--sidebar-width)_1fr_var(--sql-panel-width)]'
          : sidebarOpen && !sqlPanelOpen
          ? 'grid-cols-[var(--sidebar-width)_1fr]'
          : !sidebarOpen && sqlPanelOpen
          ? 'grid-cols-[0_1fr_var(--sql-panel-width)]'
          : 'grid-cols-[0_1fr]',
        'transition-[grid-template-columns] duration-300 ease-smooth'
      )}
    >
      {/* TopBar — spans full width */}
      <div
        className="col-span-full"
        style={{ gridArea: '1 / 1 / 2 / -1' }}
      >
        <TopBar />
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div
          className="row-start-2 col-start-1 overflow-hidden"
          style={{ gridArea: '2 / 1 / 3 / 2' }}
        >
          <Sidebar />
        </div>
      )}

      {/* Main content */}
      <main
        className={clsx(
          'row-start-2 overflow-hidden flex flex-col',
          'bg-bg-base',
          sidebarOpen ? 'col-start-2' : 'col-start-1'
        )}
        style={{
          gridColumn: sidebarOpen
            ? sqlPanelOpen
              ? '2 / 3'
              : '2 / -1'
            : sqlPanelOpen
            ? '1 / 3'
            : '1 / -1',
          gridRow: '2 / 3',
        }}
      >
        {/* Subtle grid background texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-brand-primary) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-brand-primary) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
          aria-hidden
        />
        <div className="relative flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </main>

      {/* SQL Panel */}
      {sqlPanelOpen && sqlPanel && (
        <div
          className="row-start-2 overflow-hidden border-l border-border bg-bg-surface"
          style={{ gridArea: `2 / ${sidebarOpen ? 3 : 2} / 3 / -1` }}
        >
          {sqlPanel}
        </div>
      )}

      {/* StatusBar — spans full width */}
      <div
        className="col-span-full border-t border-border bg-bg-surface/60"
        style={{ gridArea: '3 / 1 / 4 / -1' }}
      >
        <StatusBar />
      </div>
    </div>
  );
};