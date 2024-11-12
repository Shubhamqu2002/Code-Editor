import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Tab, ThemeType, ConsoleOutput, SupportedLanguage } from '../types';

interface EditorState {
  tabs: Tab[];
  activeTabId: string | null;
  theme: ThemeType;
  fontSize: number;
  consoleOutputs: ConsoleOutput[];
  addTab: (tab: Omit<Tab, 'id'>) => void;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateTab: (id: string, updates: Partial<Omit<Tab, 'id'>>) => void;
  updateTabContent: (id: string, content: string) => void;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
  setFontSize: (size: number) => void;
  addConsoleOutput: (output: Omit<ConsoleOutput, 'id' | 'timestamp'>) => void;
  clearConsole: () => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      tabs: [],
      activeTabId: null,
      theme: 'light',
      fontSize: 14,
      consoleOutputs: [],

      addTab: (tab) =>
        set((state) => ({
          tabs: [...state.tabs, { ...tab, id: Date.now().toString() }],
          activeTabId: Date.now().toString(),
        })),

      removeTab: (id) =>
        set((state) => ({
          tabs: state.tabs.filter((tab) => tab.id !== id),
          activeTabId:
            state.activeTabId === id
              ? state.tabs[state.tabs.length - 2]?.id || null
              : state.activeTabId,
        })),

      setActiveTab: (id) =>
        set(() => ({
          activeTabId: id,
        })),

      updateTab: (id, updates) =>
        set((state) => ({
          tabs: state.tabs.map((tab) =>
            tab.id === id ? { ...tab, ...updates } : tab
          ),
        })),

      updateTabContent: (id, content) =>
        set((state) => ({
          tabs: state.tabs.map((tab) =>
            tab.id === id ? { ...tab, content } : tab
          ),
        })),

      setTheme: (theme) =>
        set(() => ({
          theme,
        })),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      setFontSize: (size) =>
        set(() => ({
          fontSize: size,
        })),

      addConsoleOutput: (output) =>
        set((state) => ({
          consoleOutputs: [
            ...state.consoleOutputs,
            {
              ...output,
              id: Date.now().toString(),
              timestamp: Date.now(),
            },
          ],
        })),

      clearConsole: () =>
        set(() => ({
          consoleOutputs: [],
        })),
    }),
    {
      name: 'editor-storage',
    }
  )
);