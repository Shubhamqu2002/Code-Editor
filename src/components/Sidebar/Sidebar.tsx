import React, { useState } from 'react';
import { FiCode, FiChevronLeft, FiChevronRight, FiBook, FiSettings } from 'react-icons/fi';
import SnippetLibrary from './SnippetLibrary';
import { useEditorStore } from '../../store/editorStore';
import { Snippet } from '../../types';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [snippetCount, setSnippetCount] = useState(0);
  const { theme, addTab } = useEditorStore();

  const handleSnippetSelect = (snippet: Snippet) => {
    addTab({
      name: snippet.name,
      language: snippet.language,
      content: snippet.content,
      unsavedChanges: false,
      lastModified: Date.now()
    });
  };

  return (
    <div 
      className={`
        ${isCollapsed ? 'w-16' : 'w-72'} 
        bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
        border-r border-gray-700 
        flex flex-col 
        transition-all duration-300 ease-in-out
        h-full
      `}
    >
      <div className="h-14 flex items-center justify-between px-4 border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <FiBook className="w-5 h-5 text-blue-400" />
            <span className="font-medium text-white">Code Snippets</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-gray-400 hover:text-white"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <FiChevronRight className="w-5 h-5" />
          ) : (
            <FiChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {!isCollapsed ? (
        <SnippetLibrary 
          onSnippetSelect={handleSnippetSelect}
          onSnippetCountChange={setSnippetCount}
        />
      ) : (
        <div className="flex-1 flex flex-col items-center py-4 space-y-4">
          <button 
            className="p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 group relative"
            title="Snippets"
          >
            <FiCode className="w-6 h-6 text-gray-400 group-hover:text-blue-400" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Snippets
            </div>
          </button>
          <button 
            className="p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 group relative"
            title="Settings"
          >
            <FiSettings className="w-6 h-6 text-gray-400 group-hover:text-blue-400" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Settings
            </div>
          </button>
        </div>
      )}

      {/* Optional: Add a footer */}
      <div className="p-4 border-t border-gray-700 bg-gray-800/30 backdrop-blur-sm">
        {!isCollapsed && (
          <div className="text-xs text-gray-500 text-center">
            {snippetCount} snippets available
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;