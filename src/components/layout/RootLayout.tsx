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
  const { sidebarOpen, sqlPanelOpen } = useUIStore();

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-bg-base">

      {/* TopBar — full width */}
      <TopBar />

      {/* Body row — sidebar + main + sql panel all in one flex row */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* Sidebar — collapses via width transition */}
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

        {/* Main content — shrinks when SQL panel opens */}
        <main className="flex-1 overflow-hidden flex flex-col min-w-0 relative bg-bg-base transition-all duration-300">
          {children}
        </main>

        {/* SQL Panel — IN the layout flow, pushes main left when open */}
        <div
          className={clsx(
            'flex-shrink-0 overflow-hidden',
            'border-l border-border-accent bg-bg-surface',
            'transition-[width] duration-300 ease-in-out',
            sqlPanelOpen ? 'w-[400px]' : 'w-0'
          )}
        >
          {/* Always render content so it's ready — just hidden by width:0 */}
          <div
            className={clsx(
              'w-[400px] h-full',
              'transition-opacity duration-200',
              sqlPanelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
          >
            {sqlPanel}
          </div>
        </div>

      </div>
    </div>
  );
};