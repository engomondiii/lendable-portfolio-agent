'use client';

import React, { useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { RootLayout } from '@/components/layout/RootLayout';
import { QueryInput } from '@/components/agent/QueryInput';
import { AgentResponse } from '@/components/agent/AgentResponse';
import { EmptyState } from '@/components/agent/EmptyState';
import { ResultsPanel } from '@/components/results/ResultsPanel';
import { SqlPanel } from '@/components/sql/SqlPanel';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { useQuery } from '@/hooks/useQuery';
import { useQueryStore } from '@/store/queryStore';

// ── Compact inline metrics strip ────────────────────────────────────────────
import { MetricsStrip } from '@/components/metrics/MetricsStrip';

export default function DashboardPage() {
  const {
    submitQuery,
    currentQuestion,
    isLoading,
    thinkingStage,
    currentResult,
    error,
    errorSql,
    clearResult,
  } = useQuery();

  const resultsEndRef = useRef<HTMLDivElement>(null);
  const hasInteracted = !!currentResult || !!error || isLoading;

  // Auto-scroll to bottom when new result arrives
  useEffect(() => {
    if (currentResult || isLoading) {
      resultsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentResult, isLoading]);

  return (
    <RootLayout sqlPanel={<SqlPanel />}>
      {/*
        ┌──────────────────────────────────────────┐
        │  METRICS STRIP  (compact, always visible) │  ~56px
        ├──────────────────────────────────────────┤
        │                                          │
        │  RESULTS / EMPTY STATE  (flex-1)         │  all remaining space
        │                                          │
        ├──────────────────────────────────────────┤
        │  QUERY INPUT  (fixed bottom)             │  ~80–120px
        └──────────────────────────────────────────┘
      */}
      <div className="flex flex-col h-full overflow-hidden">

        {/* ── 1. Metrics strip — always visible, never scrolls away ─────── */}
        <MetricsStrip />

        {/* ── 2. Main content area — takes everything between strips ──────── */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          {!hasInteracted ? (
            // Empty state — centered in remaining space
            <div className="flex-1 overflow-auto flex items-center justify-center">
              <EmptyState onSelectQuestion={(q) => submitQuery(q)} />
            </div>
          ) : (
            // Results area — scrollable
            <ScrollArea className="flex-1">
              <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
                <AgentResponse
                  question={currentQuestion}
                  isLoading={isLoading}
                  thinkingStage={thinkingStage}
                  result={currentResult}
                  error={error}
                  errorSql={errorSql}
                  onDismissError={clearResult}
                  onRetry={() => submitQuery(currentQuestion)}
                >
                  {currentResult && (
                    <ResultsPanel result={currentResult} />
                  )}
                </AgentResponse>
                <div ref={resultsEndRef} />
              </div>
            </ScrollArea>
          )}
        </div>

        {/* ── 3. Query input — pinned to bottom, always accessible ─────── */}
        <div
          className={clsx(
            'flex-shrink-0',
            'border-t border-border bg-bg-surface',
            'px-6 py-4'
          )}
        >
          {/* Input label row */}
          <div className="max-w-5xl mx-auto">
            {hasInteracted && (
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                <span className="text-text-muted text-xs font-mono-data">
                  Ask a follow-up question
                </span>
              </div>
            )}
            <QueryInput
              onSubmit={submitQuery}
              isLoading={isLoading}
              initialValue={useQueryStore.getState().currentQuestion}
              showSuggestions={!hasInteracted}
            />
          </div>
        </div>

      </div>
    </RootLayout>
  );
}