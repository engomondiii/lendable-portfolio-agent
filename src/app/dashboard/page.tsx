'use client';

import React from 'react';
import { clsx } from 'clsx';
import { RootLayout } from '@/components/layout/RootLayout';
import { MetricsRow } from '@/components/metrics/MetricsRow';
import { QueryInput } from '@/components/agent/QueryInput';
import { AgentResponse } from '@/components/agent/AgentResponse';
import { EmptyState } from '@/components/agent/EmptyState';
import { ResultsPanel } from '@/components/results/ResultsPanel';
import { SqlPanel } from '@/components/sql/SqlPanel';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Divider } from '@/components/ui/Divider';
import { useQuery } from '@/hooks/useQuery';
import { useQueryStore } from '@/store/queryStore';

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

  const hasInteracted = !!currentResult || !!error || isLoading;

  return (
    <RootLayout sqlPanel={<SqlPanel />}>
      <div className="flex flex-col h-full overflow-hidden">

        {/* KPI Metrics Row */}
        <div className="flex-shrink-0 border-b border-border">
          <MetricsRow />
        </div>

        <Divider />

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {!hasInteracted ? (
            /* Empty state */
            <ScrollArea className="flex-1">
              <EmptyState onSelectQuestion={(q) => submitQuery(q)} />
            </ScrollArea>
          ) : (
            /* Results scroll area */
            <ScrollArea className="flex-1 px-6 py-6">
              <div className="max-w-4xl mx-auto">
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
              </div>
            </ScrollArea>
          )}

          {/* Query Input — pinned bottom */}
          <div
            className={clsx(
              'flex-shrink-0 border-t border-border',
              'bg-bg-surface/80 backdrop-blur-sm',
              'px-6 py-4'
            )}
          >
            <div className="max-w-4xl mx-auto">
              <QueryInput
                onSubmit={submitQuery}
                isLoading={isLoading}
                initialValue={useQueryStore.getState().currentQuestion}
                showSuggestions={!hasInteracted}
              />
            </div>
          </div>
        </div>

      </div>
    </RootLayout>
  );
}