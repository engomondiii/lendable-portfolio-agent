'use client';

import React from 'react';
import { clsx } from 'clsx';

const DbIcon = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
    <ellipse cx="6" cy="3" rx="5" ry="2"/>
    <path d="M1 3v6c0 1.1 2.24 2 5 2s5-.9 5-2V3"/>
    <path d="M1 6.5c0 1.1 2.24 2 5 2s5-.9 5-2"/>
  </svg>
);

const ModelIcon = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
    <circle cx="6" cy="6" r="2"/>
    <path d="M6 1v2M6 9v2M1 6h2M9 6h2M2.64 2.64l1.42 1.42M7.94 7.94l1.42 1.42M2.64 9.36l1.42-1.42M7.94 4.06l1.42-1.42"/>
  </svg>
);

const VersionIcon = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
    <polyline points="1,6 4,9 11,3"/>
  </svg>
);

interface StatusItem {
  icon: React.ReactNode;
  label: string;
}

const statusItems: StatusItem[] = [
  { icon: <DbIcon />, label: 'lendable_portfolio.db' },
  { icon: <ModelIcon />, label: 'claude-sonnet-4' },
  { icon: <VersionIcon />, label: 'v0.1.0' },
];

export const StatusBar: React.FC = () => {
  return (
    <footer
      className={clsx(
        'h-statusbar flex items-center justify-between',
        'px-4 border-t border-border',
        'bg-bg-surface/60',
        '[grid-area:statusbar]',
        'z-40'
      )}
    >
      <div className="flex items-center gap-4">
        {statusItems.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <span className="w-px h-3 bg-border inline-block" aria-hidden />
            )}
            <div className="flex items-center gap-1.5 text-text-muted text-[10px] font-mono-data">
              <span className="text-text-muted opacity-70">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="flex items-center gap-1.5 text-[10px] font-mono-data">
        <span className="status-dot scale-75" />
        <span className="text-brand-primary">Ready</span>
      </div>
    </footer>
  );
};