import React, { useState } from 'react';
import { useEditorStore } from '../../store/editorStore';
import { FiX, FiEdit2 } from 'react-icons/fi';
import { SUPPORTED_LANGUAGES } from '../../constants';

const EditorTabs: React.FC = () => {
  const { tabs, activeTabId, removeTab, setActiveTab, updateTab } = useEditorStore();
  const [editingTab, setEditingTab] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleRename = (tabId: string) => {
    if (editName.trim()) {
      updateTab(tabId, { name: editName.trim() });
      setEditingTab(null);
      setEditName('');
    }
  };

  const startEditing = (tab: { id: string; name: string }) => {
    setEditingTab(tab.id);
    setEditName(tab.name);
  };

  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto bg-gray-50 dark:bg-gray-800">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`group flex items-center border-r border-gray-200 dark:border-gray-700
            ${tab.id === activeTabId 
              ? 'bg-white dark:bg-gray-900 text-primary dark:text-primary' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
        >
          {editingTab === tab.id ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={() => handleRename(tab.id)}
              onKeyDown={(e) => e.key === 'Enter' && handleRename(tab.id)}
              className="px-2 py-1 m-1 bg-transparent border-b border-primary outline-none w-32"
              autoFocus
            />
          ) : (
            <>
              <div
                className="px-4 py-2 cursor-pointer flex items-center"
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.name}</span>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  .{SUPPORTED_LANGUAGES[tab.language as keyof typeof SUPPORTED_LANGUAGES].extension}
                </span>
              </div>
              <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => startEditing(tab)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                >
                  <FiEdit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => removeTab(tab.id)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                >
                  <FiX className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default EditorTabs;