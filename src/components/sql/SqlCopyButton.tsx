'use client';

import React, { useState } from 'react';
import { clsx } from 'clsx';

interface SqlCopyButtonProps {
  sql: string;
}

const CopyIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
    <rect x="4" y="4" width="7" height="7" rx="1"/>
    <path d="M8 4V2a1 1 0 00-1-1H2a1 1 0 00-1 1v5a1 1 0 001 1h2"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="1.5,6 4.5,9 10.5,3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SqlCopyButton: React.FC<SqlCopyButtonProps> = ({ sql }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sql);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement('textarea');
      el.value = sql;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={clsx(
        'flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono-data',
        'border transition-all duration-150',
        copied
          ? 'text-brand-primary border-brand-primary/30 bg-brand-subtle'
          : 'text-text-muted border-border hover:text-text-secondary hover:border-border-strong'
      )}
      aria-label="Copy SQL to clipboard"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};