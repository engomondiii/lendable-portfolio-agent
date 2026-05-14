import { useHistoryStore } from '@/store/historyStore';
import { useQueryStore } from '@/store/queryStore';

export function useQueryHistory() {
  const { history, clearHistory, removeFromHistory } = useHistoryStore();
  const { setCurrentQuestion } = useQueryStore();

  const reaskQuestion = (question: string) => {
    setCurrentQuestion(question);
    // Scroll to top of page / focus input
    const input = document.getElementById('query-input');
    if (input) {
      input.focus();
      (input as HTMLTextAreaElement).value = question;
    }
  };

  return {
    history,
    clearHistory,
    removeFromHistory,
    reaskQuestion,
  };
}