import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  sidebarOpen: boolean;
  sqlPanelOpen: boolean;
  activeTab: string;
  setSidebarOpen: (open: boolean) => void;
  setSqlPanelOpen: (open: boolean) => void;
  setActiveTab: (tab: string) => void;
  toggleSidebar: () => void;
  toggleSqlPanel: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      sqlPanelOpen: false,
      activeTab: 'dashboard',

      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setSqlPanelOpen: (open) => set({ sqlPanelOpen: open }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      toggleSqlPanel: () => set((s) => ({ sqlPanelOpen: !s.sqlPanelOpen })),
    }),
    {
      name: 'lendable-ui',
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        sqlPanelOpen: state.sqlPanelOpen,
        activeTab: state.activeTab,
      }),
    }
  )
);