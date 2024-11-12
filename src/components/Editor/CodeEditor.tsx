import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { useEditorStore } from '../../store/editorStore';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { githubLight } from '@uiw/codemirror-theme-github';
import EditorToolbar from './EditorToolbar';

const SUPPORTED_LANGUAGES = {
  javascript: {
    extension: javascript(),
    fileExt: 'js',
    color: 'text-yellow-500'
  },
  python: {
    extension: python(),
    fileExt: 'py',
    color: 'text-blue-500'
  },
  cpp: {
    extension: cpp(),
    fileExt: 'cpp',
    color: 'text-purple-500'
  },
  typescript: {
    extension: javascript({ typescript: true }),
    fileExt: 'ts',
    color: 'text-blue-400'
  }
} as const;

type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

const CodeEditor: React.FC = () => {
  const { 
    activeTabId, 
    tabs, 
    updateTabContent, 
    theme, 
    fontSize 
  } = useEditorStore();

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  const getLanguageExtension = (language: string) => {
    const lang = language.toLowerCase() as SupportedLanguage;
    return SUPPORTED_LANGUAGES[lang]?.extension || SUPPORTED_LANGUAGES.javascript.extension;
  };

  if (!activeTab) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 dark:text-white">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Welcome to Code Editor</h3>
          <p className="text-sm">Create a new file or open an existing one to start coding</p>
          <div className="mt-4 flex gap-2 justify-center">
            {Object.entries(SUPPORTED_LANGUAGES).map(([lang, config]) => (
              <span 
                key={lang} 
                className={`px-2 py-1 rounded-md text-sm ${config.color} bg-opacity-10 bg-current`}
              >
                .{config.fileExt}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-dark-100">
      <EditorToolbar />
      <div className="flex-1 overflow-hidden">
        <CodeMirror
          value={activeTab.content}
          height="100%"
          theme={theme === 'dark' ? dracula : githubLight}
          extensions={[getLanguageExtension(activeTab.language)]}
          onChange={(value) => {
            updateTabContent(activeTab.id, value);
          }}
          style={{ 
            fontSize: `${fontSize}px`,
            height: '100%'
          }}
          className="h-full"
        />
      </div>
    </div>
  );
};

export default CodeEditor;