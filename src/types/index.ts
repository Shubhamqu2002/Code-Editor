// Theme Types
export type ThemeType = 'light' | 'dark';

// Language Types
export type SupportedLanguage = 'javascript' | 'typescript' | 'python' | 'cpp' | 'java';

// Editor Settings
export interface EditorSettings {
  theme: ThemeType;
  fontSize: number;
  tabSize: number;
  wordWrap: boolean;
  lineNumbers: boolean;
  minimap: boolean;
  autoSave: boolean;
  formatOnSave: boolean;
  autoClosingBrackets: boolean;
  autoClosingQuotes: boolean;
  highlightActiveLine: boolean;
  highlightSelectionMatches: boolean;
}

// Tab Interface
export interface Tab {
  id: string;
  name: string;
  language: SupportedLanguage;
  content: string;
  path?: string;
  unsavedChanges: boolean;
  lastModified: number;
}

// Console Output Interface
export interface ConsoleOutput {
  id: string;
  type: 'output' | 'error' | 'info' | 'warning';
  content: string;
  timestamp: number;
  source?: string;
}

// Snippet Interface
export interface Snippet {
  id: string;
  name: string;
  description: string;
  language: SupportedLanguage;
  content: string;
  tags: string[];
  created: number;
  lastModified: number;
  favorite: boolean;
}

// File Explorer Types
export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'directory';
  path: string;
  children?: FileNode[];
  language?: SupportedLanguage;
  size?: number;
  lastModified?: number;
}

// Search Results
export interface SearchResult {
  id: string;
  fileName: string;
  filePath: string;
  line: number;
  column: number;
  matchText: string;
  language: SupportedLanguage;
}

// User Preferences
export interface UserPreferences {
  editorSettings: EditorSettings;
  snippetsEnabled: boolean;
  recentFiles: string[];
  favoriteSnippets: string[];
  customKeyBindings: Record<string, string>;
  extensions: {
    id: string;
    enabled: boolean;
  }[];
}

// Extension Interface
export interface Extension {
  id: string;
  name: string;
  version: string;
  description: string;
  enabled: boolean;
  author: string;
  dependencies?: string[];
  config?: Record<string, any>;
}

// Error Types
export type ErrorType = 'syntax' | 'runtime' | 'compilation' | 'validation';

export interface CodeError {
  type: ErrorType;
  message: string;
  line?: number;
  column?: number;
  source?: string;
  severity: 'error' | 'warning' | 'info';
}

// Language Server Protocol Types
export interface DiagnosticResult {
  file: string;
  errors: CodeError[];
  warnings: CodeError[];
}

// Editor State
export interface EditorState {
  currentTheme: ThemeType;
  activeTabId: string | null;
  tabs: Tab[];
  consoleOutputs: ConsoleOutput[];
  snippets: Snippet[];
  fileTree: FileNode[];
  searchResults: SearchResult[];
  errors: CodeError[];
  preferences: UserPreferences;
  extensions: Extension[];
  isLoading: boolean;
  selectedText: string | null;
  clipboard: string | null;
  undoStack: string[];
  redoStack: string[];
}

// Action Types
export type ActionType =
  | 'CREATE_TAB'
  | 'CLOSE_TAB'
  | 'UPDATE_TAB'
  | 'SWITCH_TAB'
  | 'SAVE_FILE'
  | 'UPDATE_SETTINGS'
  | 'ADD_SNIPPET'
  | 'DELETE_SNIPPET'
  | 'TOGGLE_THEME'
  | 'CLEAR_CONSOLE'
  | 'RUN_CODE'
  | 'FORMAT_CODE'
  | 'SEARCH_FILES'
  | 'TOGGLE_EXTENSION';

// Editor Commands
export interface EditorCommand {
  id: string;
  title: string;
  keybinding?: string;
  handler: () => void;
  when?: string;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  action?: {
    text: string;
    handler: () => void;
  };
}

// Context Menu Items
export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  action: () => void;
  submenu?: ContextMenuItem[];
  separator?: boolean;
  disabled?: boolean;
}

// Language Server Interface
export interface LanguageServer {
  language: SupportedLanguage;
  capabilities: string[];
  initialize: () => Promise<void>;
  getCompletions: (document: string, position: Position) => Promise<Completion[]>;
  getDiagnostics: (document: string) => Promise<DiagnosticResult>;
  getDefinition: (document: string, position: Position) => Promise<Location>;
}

// Position and Location Types
export interface Position {
  line: number;
  character: number;
}

export interface Location {
  uri: string;
  range: {
    start: Position;
    end: Position;
  };
}

export interface Completion {
  label: string;
  kind: string;
  detail?: string;
  documentation?: string;
  insertText: string;
}