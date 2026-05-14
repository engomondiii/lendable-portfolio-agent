'use client';

import React from 'react';
import { clsx } from 'clsx';
import { useUIStore } from '@/store/uiStore';
import { useHistoryStore } from '@/store/historyStore';
import { SidebarNavItem } from './SidebarNavItem';
import { Divider } from '@/components/ui/Divider';
import { ScrollArea } from '@/components/ui/ScrollArea';

// Icons
const DashboardIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="1" y="1" width="6" height="6" rx="1"/>
    <rect x="8" y="1" width="6" height="6" rx="1"/>
    <rect x="1" y="8" width="6" height="6" rx="1"/>
    <rect x="8" y="8" width="6" height="6" rx="1"/>
  </svg>
);

const HistoryIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="7.5" cy="7.5" r="6"/>
    <path d="M7.5 4.5v3.5l2.5 1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M1 13.5l4-4 3 3 5-7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DatabaseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4">
    <ellipse cx="7.5" cy="4" rx="5.5" ry="2"/>
    <path d="M2 4v7c0 1.1 2.46 2 5.5 2s5.5-.9 5.5-2V4"/>
    <path d="M2 7.5c0 1.1 2.46 2 5.5 2s5.5-.9 5.5-2"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M1 3h10M4 3V2h4v1M2 3l.8 7h6.4L10 3"/>
  </svg>
);

const navItems = [
  { id: 'dashboard', label: 'Intelligence', icon: <DashboardIcon /> },
  { id: 'portfolio', label: 'Portfolio View', icon: <ChartIcon /> },
  { id: 'database', label: 'Schema', icon: <DatabaseIcon /> },
];

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useUIStore();
  const { history, clearHistory } = useHistoryStore();

  return (
    <aside
      className={clsx(
        'flex flex-col border-r border-border bg-bg-surface',
        'overflow-hidden [grid-area:sidebar]',
        'animate-slide-in-left'
      )}
    >
      {/* Navigation */}
      <nav className="p-3 space-y-0.5" aria-label="Main navigation">
        <p className="text-text-muted text-[10px] font-mono-data uppercase tracking-widest px-3 py-2">
          Navigation
        </p>
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
          />
        ))}
      </nav>

      <Divider className="mx-3" />

      {/* Query History */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2.5">
          <div className="flex items-center gap-2">
            <HistoryIcon />
            <span className="text-text-muted text-[10px] font-mono-data uppercase tracking-widest">
              History
            </span>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-text-muted hover:text-risk-danger transition-colors p-1 rounded"
              aria-label="Clear history"
            >
              <TrashIcon />
            </button>
          )}
        </div>

        <ScrollArea className="flex-1 px-3 pb-3">
          {history.length === 0 ? (
            <div className="px-3 py-6 text-center">
              <p className="text-text-muted text-xs font-body">No queries yet</p>
              <p className="text-text-muted text-[10px] font-mono-data mt-1 opacity-60">
                Ask anything above
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {history.slice().reverse().map((item, i) => (
                <div
                  key={item.id}
                  className={clsx(
                    'stagger-item opacity-0 animate-fade-in-up',
                    'group px-3 py-2 rounded border border-transparent',
                    'hover:bg-bg-elevated hover:border-border cursor-pointer',
                    'transition-all duration-150'
                  )}
                  style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'forwards' }}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-text-muted mt-0.5 flex-shrink-0 font-mono-data text-[10px]">
                      {item.outputType === 'chart' ? '📈' : '⊞'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-text-secondary text-xs font-body line-clamp-2 leading-relaxed">
                        {item.question}
                      </p>
                      <p className="text-text-muted text-[10px] font-mono-data mt-1">
                        {new Date(item.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                        {item.rowCount !== undefined && ` · ${item.rowCount} rows`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Bottom — version info */}
      <div className="p-3 border-t border-border">
        <div className="px-3 py-2 rounded bg-bg-elevated border border-border">
          <p className="text-text-muted text-[10px] font-mono-data">
            <span className="text-brand-primary">●</span> 994 loans · 4 originators
          </p>
          <p className="text-text-muted text-[10px] font-mono-data mt-0.5">
            Jan 2024 – Dec 2025
          </p>
        </div>
      </div>
    </aside>
  );
};