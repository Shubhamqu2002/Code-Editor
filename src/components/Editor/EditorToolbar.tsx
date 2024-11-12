import React from 'react';
import { FiPlay, FiSettings } from 'react-icons/fi';
import { useEditorStore } from '../../store/editorStore';
import { SUPPORTED_LANGUAGES } from '../../constants';
import { runCode } from '../../utils/codeRunner';
import { SupportedLanguage } from '../../types';

const EditorToolbar: React.FC = () => {
  const { 
    activeTabId, 
    tabs, 
    fontSize, 
    setFontSize,
    updateTab,
    addConsoleOutput 
  } = useEditorStore();

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  const handleRun = async () => {
    if (!activeTab) return;

    addConsoleOutput({
      type: 'info',
      content: `Running ${activeTab.name}.${SUPPORTED_LANGUAGES[activeTab.language].extension}...`
    });

    try {
      const output = await runCode(activeTab.content, activeTab.language);
      addConsoleOutput({
        type: 'output',
        content: output
      });
    } catch (error) {
      addConsoleOutput({
        type: 'error',
        content: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center space-x-4">
        <button
          onClick={handleRun}
          className="flex items-center px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          disabled={!activeTab}
        >
          <FiPlay className="w-4 h-4 mr-2" />
          Run
        </button>

        {activeTab && (
          <select
            value={activeTab.language}
            onChange={(e) => updateTab(activeTab.id, { language: e.target.value as SupportedLanguage })}
            className="px-2 py-1.5 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {Object.entries(SUPPORTED_LANGUAGES).map(([lang, config]) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600 dark:text-gray-300">Font Size:</label>
          <input
            type="number"
            min="8"
            max="32"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-16 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          <FiSettings className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default EditorToolbar;