'use client';

import React from 'react';
import { clsx } from 'clsx';
import { SqlViewer } from './SqlViewer';
import { SqlCopyButton } from './SqlCopyButton';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { useQueryStore } from '@/store/queryStore';
import { useUIStore } from '@/store/uiStore';

const SqlIcon = () => (
  <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 4.5l-2 2.5 2 2.5M10.5 4.5l2 2.5-2 2.5M7.5 2l-2 9"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M3.293 3.293a1 1 0 011.414 0L7 5.586l2.293-2.293a1 1 0 111.414 1.414L8.414 7l2.293 2.293a1 1 0 01-1.414 1.414L7 8.414l-2.293 2.293a1 1 0 01-1.414-1.414L5.586 7 3.293 4.707a1 1 0 010-1.414z"/>
  </svg>
);

export const SqlPanel: React.FC = () => {
  const { currentResult } = useQueryStore();
  const { setSqlPanelOpen } = useUIStore();
  const sql = currentResult?.sql ?? null;

  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <span className="text-accent"><SqlIcon /></span>
          <span className="text-text-primary text-sm font-body font-semibold">Generated SQL</span>
          {sql && (
            <span className="text-text-muted text-xs font-mono-data bg-bg-elevated border border-border px-2 py-0.5 rounded-full">
              {sql.split('\n').length} lines
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {sql && <SqlCopyButton sql={sql} />}
          <button
            onClick={() => setSqlPanelOpen(false)}
            className="p-1.5 rounded text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-all duration-150"
            aria-label="Close SQL panel"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Body */}
      <ScrollArea className="flex-1 p-5">
        {sql ? (
          <div className="space-y-5 animate-fade-in-up">
            {/* SQL code */}
            <SqlViewer sql={sql} />

            {/* Schema reference */}
            <div className="rounded-lg border border-border bg-bg-elevated p-4">
              <p className="text-text-muted text-xs font-mono-data uppercase tracking-wider mb-3">
                Schema Reference
              </p>
              <div className="space-y-3">
                {[
                  { table: 'loans', cols: 'loan_id, originator_name, product_type, begin_date, original_end_date, rescheduled_end_date, reschedule_flag, principal, monthly_rate' },
                  { table: 'history', cols: 'loan_id, record_date, month_on_book, amount_due, amount_paid, days_late, status' },
                ].map((t) => (
                  <div key={t.table}>
                    <p className="text-accent text-xs font-mono-data font-medium mb-1">{t.table}</p>
                    <p className="text-text-muted text-xs font-mono-data leading-relaxed">{t.cols}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Status definitions */}
            <div className="rounded-lg border border-border bg-bg-elevated p-4">
              <p className="text-text-muted text-xs font-mono-data uppercase tracking-wider mb-3">
                Status Definitions
              </p>
              <div className="space-y-2">
                {[
                  { s: 'Current',   d: '0 days late',     color: 'text-risk-safe'    },
                  { s: 'PAR',       d: '1–29 days late',   color: 'text-risk-caution' },
                  { s: 'PAR30',     d: '30–59 days late',  color: 'text-risk-warning' },
                  { s: 'PAR60',     d: '60–89 days late',  color: 'text-risk-danger'  },
                  { s: 'Write-off', d: '90+ days late',    color: 'text-risk-danger'  },
                  { s: 'Paid-off',  d: 'Fully repaid',     color: 'text-risk-neutral' },
                ].map(({ s, d, color }) => (
                  <div key={s} className="flex items-center justify-between">
                    <span className={`text-xs font-mono-data font-medium ${color}`}>{s}</span>
                    <span className="text-text-muted text-xs font-mono-data">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-20 text-center">
            <div className="w-14 h-14 rounded-full bg-bg-elevated border border-border flex items-center justify-center mb-4">
              <span className="text-text-muted"><SqlIcon /></span>
            </div>
            <p className="text-text-secondary text-sm font-body font-medium">No SQL generated yet</p>
            <p className="text-text-muted text-xs font-mono-data mt-1">
              Ask a question to see the generated query
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};