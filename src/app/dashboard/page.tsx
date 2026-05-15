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
import { MetricsStrip } from '@/components/metrics/MetricsStrip';
import { useQuery } from '@/hooks/useQuery';
import { useQueryStore } from '@/store/queryStore';
import { useUIStore } from '@/store/uiStore';

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

  const { sqlPanelOpen } = useUIStore();
  const resultsEndRef = useRef<HTMLDivElement>(null);
  const hasInteracted = !!currentResult || !!error || isLoading;

  useEffect(() => {
    if (currentResult || isLoading) {
      resultsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentResult, isLoading]);

  return (
    <RootLayout sqlPanel={<SqlPanel />}>
      <div className="flex flex-col h-full overflow-hidden">

        {/* ── Metrics strip ─────────────────────────────────────────────── */}
        <MetricsStrip />

        {/* ── Results / empty state ─────────────────────────────────────── */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          {!hasInteracted ? (
            <div className="flex-1 overflow-auto flex items-center justify-center">
              <EmptyState onSelectQuestion={(q) => submitQuery(q)} />
            </div>
          ) : (
            <ScrollArea className="flex-1">
              {/*
                When SQL panel is open the available width shrinks.
                We remove max-w constraint so content fills the narrower space
                rather than leaving dead whitespace on the right.
              */}
              <div
                className={clsx(
                  'mx-auto px-6 py-6 space-y-6 transition-all duration-300',
                  sqlPanelOpen ? 'max-w-full' : 'max-w-5xl'
                )}
              >
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
                  {currentResult && <ResultsPanel result={currentResult} />}
                </AgentResponse>
                <div ref={resultsEndRef} />
              </div>
            </ScrollArea>
          )}
        </div>

        {/* ── Query input — pinned bottom ───────────────────────────────── */}
        <div className="flex-shrink-0 border-t border-border bg-bg-surface px-6 py-4">
          <div
            className={clsx(
              'mx-auto transition-all duration-300',
              sqlPanelOpen ? 'max-w-full' : 'max-w-5xl'
            )}
          >
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