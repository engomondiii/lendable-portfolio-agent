'use client';

import React from 'react';
import { clsx } from 'clsx';
import { SqlViewer } from './SqlViewer';
import { SqlCopyButton } from './SqlCopyButton';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { useQueryStore } from '@/store/queryStore';
import { useUIStore } from '@/store/uiStore';

const SqlIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M2.5 4.5l-2 2.5 2 2.5M10.5 4.5l2 2.5-2 2.5M7.5 2l-2 9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <path d="M2.293 2.293a1 1 0 011.414 0L6 4.586l2.293-2.293a1 1 0 111.414 1.414L7.414 6l2.293 2.293a1 1 0 01-1.414 1.414L6 7.414l-2.293 2.293a1 1 0 01-1.414-1.414L4.586 6 2.293 3.707a1 1 0 010-1.414z"/>
  </svg>
);

export const SqlPanel: React.FC = () => {
  const { currentResult } = useQueryStore();
  const { setSqlPanelOpen } = useUIStore();

  const sql = currentResult?.sql ?? null;

  return (
    <div className="flex flex-col h-full animate-slide-in-right">
      {/* Header */}
      <div
        className={clsx(
          'flex items-center justify-between px-4 py-3',
          'border-b border-border bg-bg-surface flex-shrink-0'
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-brand-primary">
            <SqlIcon />
          </span>
          <span className="text-text-secondary text-xs font-mono-data font-medium">
            Generated SQL
          </span>
          {sql && (
            <span className="text-text-muted text-[10px] font-mono-data">
              · {sql.split('\n').length} lines
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {sql && <SqlCopyButton sql={sql} />}
          <button
            onClick={() => setSqlPanelOpen(false)}
            className="text-text-muted hover:text-text-secondary transition-colors p-1 rounded"
            aria-label="Close SQL panel"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Body */}
      <ScrollArea className="flex-1 p-4">
        {sql ? (
          <div className="space-y-4 animate-fade-in-up">
            <SqlViewer sql={sql} />

            {/* Schema quick reference */}
            <div className="rounded-lg border border-border-subtle bg-bg-elevated p-3">
              <p className="text-text-muted text-[10px] font-mono-data uppercase tracking-wider mb-2">
                Schema Reference
              </p>
              <div className="space-y-2">
                {[
                  {
                    table: 'loans',
                    cols: 'loan_id, originator_name, product_type, begin_date, original_end_date, rescheduled_end_date, reschedule_flag, principal, monthly_rate',
                  },
                  {
                    table: 'history',
                    cols: 'loan_id, record_date, month_on_book, amount_due, amount_paid, days_late, status',
                  },
                ].map((t) => (
                  <div key={t.table}>
                    <p className="text-brand-primary text-[10px] font-mono-data">
                      {t.table}
                    </p>
                    <p className="text-text-muted text-[10px] font-mono-data leading-relaxed">
                      {t.cols}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Status definitions */}
            <div className="rounded-lg border border-border-subtle bg-bg-elevated p-3">
              <p className="text-text-muted text-[10px] font-mono-data uppercase tracking-wider mb-2">
                Status Definitions
              </p>
              {[
                { s: 'Current', d: '0 days late', c: 'text-risk-safe' },
                { s: 'PAR', d: '1–29 days late', c: 'text-risk-warning' },
                { s: 'PAR30', d: '30–59 days late', c: 'text-risk-caution' },
                { s: 'PAR60', d: '60–89 days late', c: 'text-risk-danger' },
                { s: 'Write-off', d: '90+ days late', c: 'text-risk-danger' },
                { s: 'Paid-off', d: 'Fully repaid', c: 'text-risk-neutral' },
              ].map(({ s, d, c }) => (
                <div key={s} className="flex items-center gap-2 py-0.5">
                  <span className={`text-[10px] font-mono-data w-16 ${c}`}>{s}</span>
                  <span className="text-text-muted text-[10px] font-mono-data">{d}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-16 text-center">
            <div className="w-10 h-10 rounded-full bg-bg-elevated border border-border flex items-center justify-center mb-3">
              <span className="text-text-muted">
                <SqlIcon />
              </span>
            </div>
            <p className="text-text-muted text-xs font-mono-data">No SQL yet</p>
            <p className="text-text-muted text-[10px] font-mono-data mt-1 opacity-60">
              Ask a question to see the generated query
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};