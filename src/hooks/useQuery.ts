import { useCallback } from 'react';
import { useQueryStore } from '@/store/queryStore';
import { useHistoryStore } from '@/store/historyStore';
import { sendQuery } from '@/lib/api';
import { THINKING_STAGES } from '@/lib/constants';

export function useQuery() {
  const {
    currentQuestion,
    currentResult,
    isLoading,
    thinkingStage,
    error,
    errorSql,
    setCurrentQuestion,
    setCurrentResult,
    setLoading,
    setThinkingStage,
    setError,
  } = useQueryStore();

  const { addToHistory } = useHistoryStore();

  const submitQuery = useCallback(
    async (question: string) => {
      if (!question.trim() || isLoading) return;

      // Reset state
      setCurrentQuestion(question);
      setCurrentResult(null);
      setError(null);
      setLoading(true);

      try {
        // Stage 1: Generating SQL
        setThinkingStage('generating');
        await new Promise((r) => setTimeout(r, THINKING_STAGES[0].duration));

        // Stage 2: Executing
        setThinkingStage('executing');

        // Actual API call fires here (overlaps with stage 2 display)
        const result = await sendQuery(question);

        // Stage 3: Rendering
        setThinkingStage('rendering');
        await new Promise((r) => setTimeout(r, THINKING_STAGES[2].duration));

        setCurrentResult(result);
        setThinkingStage(null);

        // Add to history
        addToHistory({
          question,
          outputType: result.output_type,
          rowCount: result.row_count,
          sql: result.sql,
        });
      } catch (err: unknown) {
        const apiError = err as { message?: string; sql?: string };
        setError(
          apiError?.message || 'Something went wrong. Please try again.',
          apiError?.sql || null
        );
        setThinkingStage(null);
      } finally {
        setLoading(false);
      }
    },
    [isLoading, setCurrentQuestion, setCurrentResult, setError, setLoading, setThinkingStage, addToHistory]
  );

  const clearResult = useCallback(() => {
    setCurrentResult(null);
    setError(null);
    setCurrentQuestion('');
  }, [setCurrentResult, setError, setCurrentQuestion]);

  return {
    currentQuestion,
    currentResult,
    isLoading,
    thinkingStage,
    error,
    errorSql,
    submitQuery,
    clearResult,
  };
}