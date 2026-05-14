'use client';

import React from 'react';
import { clsx } from 'clsx';
import SyntaxHighlighter from 'react-syntax-highlighter';

// Custom dark green theme matching the app palette
const lendableTheme: Record<string, React.CSSProperties> = {
  'hljs': {
    display: 'block',
    overflowX: 'auto',
    padding: '0',
    background: 'transparent',
    color: 'var(--color-text-secondary)',
    fontFamily: 'var(--font-dm-mono)',
    fontSize: '11px',
    lineHeight: '1.8',
  },
  'hljs-comment': { color: 'var(--color-text-muted)', fontStyle: 'italic' },
  'hljs-keyword': { color: 'var(--color-brand-primary)', fontWeight: '600' },
  'hljs-built_in': { color: 'var(--color-chart-2)' },
  'hljs-string': { color: 'var(--color-chart-3)' },
  'hljs-number': { color: 'var(--color-chart-4)' },
  'hljs-operator': { color: 'var(--color-brand-primary)', opacity: '0.7' },
  'hljs-punctuation': { color: 'var(--color-text-muted)' },
  'hljs-attr': { color: 'var(--color-chart-2)' },
  'hljs-name': { color: 'var(--color-risk-safe)' },
  'hljs-title': { color: 'var(--color-chart-2)', fontWeight: '600' },
  'hljs-selector-class': { color: 'var(--color-chart-2)' },
  'hljs-type': { color: 'var(--color-chart-3)' },
  'hljs-literal': { color: 'var(--color-chart-4)' },
  'hljs-symbol': { color: 'var(--color-chart-4)' },
  'hljs-variable': { color: 'var(--color-text-secondary)' },
};

interface SqlViewerProps {
  sql: string;
  className?: string;
}

export const SqlViewer: React.FC<SqlViewerProps> = ({ sql, className }) => {
  return (
    <div
      className={clsx(
        'rounded-lg bg-bg-base border border-border-subtle p-3',
        'overflow-x-auto',
        className
      )}
    >
      <SyntaxHighlighter
        language="sql"
        style={lendableTheme}
        customStyle={{
          background: 'transparent',
          padding: 0,
          margin: 0,
          fontSize: '11px',
          lineHeight: '1.8',
          fontFamily: 'var(--font-dm-mono)',
        }}
        wrapLongLines
      >
        {sql}
      </SyntaxHighlighter>
    </div>
  );
};