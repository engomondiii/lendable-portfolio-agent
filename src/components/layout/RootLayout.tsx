'use client';

import React from 'react';
import { clsx } from 'clsx';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { useUIStore } from '@/store/uiStore';

interface RootLayoutProps {
  children: React.ReactNode;
  sqlPanel?: React.ReactNode;
}

export const RootLayout: React.FC<RootLayoutProps> = ({ children, sqlPanel }) => {
  const { sidebarOpen, sqlPanelOpen, setSqlPanelOpen } = useUIStore();

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-bg-base">

      {/* ── TopBar — full width, fixed height ─────────────────────────── */}
      <TopBar />

      {/* ── Body row — sidebar + main ──────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* Sidebar — collapsible, fixed width */}
        <aside
          className={clsx(
            'flex-shrink-0 overflow-hidden',
            'border-r border-border bg-bg-surface',
            'transition-[width] duration-300 ease-in-out',
            sidebarOpen ? 'w-[260px]' : 'w-0'
          )}
        >
          {sidebarOpen && <Sidebar />}
        </aside>

        {/* Main content — takes all remaining space */}
        <main className="flex-1 overflow-hidden flex flex-col min-w-0 relative">
          {children}
        </main>
      </div>

      {/* ── SQL Panel — fixed overlay drawer from the right ────────────── */}
      {/* Backdrop */}
      {sqlPanelOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setSqlPanelOpen(false)}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <div
        className={clsx(
          'fixed top-0 right-0 h-full z-50',
          'w-[420px] max-w-[90vw]',
          'bg-bg-surface border-l border-border',
          'flex flex-col',
          'transition-transform duration-300 ease-in-out',
          sqlPanelOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {sqlPanel}
      </div>
    </div>
  );
};