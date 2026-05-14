import { useUIStore } from '@/store/uiStore';
import { useEffect } from 'react';

export function useSqlPanel() {
  const { sqlPanelOpen, setSqlPanelOpen, toggleSqlPanel } = useUIStore();

  // Keyboard shortcut: Cmd+\ or Ctrl+\
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '\\') {
        e.preventDefault();
        toggleSqlPanel();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggleSqlPanel]);

  return { sqlPanelOpen, setSqlPanelOpen, toggleSqlPanel };
}