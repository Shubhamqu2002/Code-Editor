import React from 'react';
import { FiTerminal, FiTrash2 } from 'react-icons/fi';
import { useEditorStore } from '../../store/editorStore';

const Console: React.FC = () => {
  const { consoleOutputs, clearConsole } = useEditorStore();

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center text-gray-900 dark:text-white">
          <FiTerminal className="w-4 h-4 mr-2" />
          <span>Console</span>
        </div>
        <button
          onClick={clearConsole}
          className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
        >
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
        {consoleOutputs.map((output) => (
          <div
            key={output.id}
            className={`mb-2 ${
              output.type === 'error'
                ? 'text-red-500'
                : output.type === 'info'
                ? 'text-blue-500'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {output.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Console;