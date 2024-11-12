import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useEditorStore } from '../../store/editorStore';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useEditorStore();

  return (
    <button
      onClick={toggleTheme}
      className={`
        p-2.5 rounded-lg transition-all duration-300 transform hover:scale-105
        ${theme === 'dark' 
          ? 'bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 text-gray-900 hover:shadow-orange-500/50' 
          : 'bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white hover:shadow-purple-500/50'
        }
        shadow-lg hover:shadow-xl
        relative overflow-hidden
        group
      `}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {theme === 'dark' ? (
          <FiSun className="w-5 h-5 transform transition-transform group-hover:rotate-90" />
        ) : (
          <FiMoon className="w-5 h-5 transform transition-transform group-hover:-rotate-12" />
        )}
      </div>
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300
        ${theme === 'dark' 
          ? 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-200 via-transparent to-transparent'
          : 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-200 via-transparent to-transparent'
        }
      `} />
    </button>
  );
};

export default ThemeToggle;