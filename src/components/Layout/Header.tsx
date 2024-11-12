import React, { useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useEditorStore } from '../../store/editorStore';
import { 
  FiPlus, 
  FiSave, 
  FiFolder, 
  FiSettings, 
  FiCode, 
  FiGitBranch, 
  FiCommand,
  FiGlobe 
} from 'react-icons/fi';
import { SUPPORTED_LANGUAGES } from '../../constants';
import { SupportedLanguage } from '../../types';

const Header: React.FC = () => {
  const { addTab, activeTabId, tabs, theme } = useEditorStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showNewFileDialog, setShowNewFileDialog] = useState(false);

  const createNewFile = (language: SupportedLanguage) => {
    addTab({
      name: `Untitled.${SUPPORTED_LANGUAGES[language].extension}`,
      language,
      content: getDefaultTemplate(language),
      unsavedChanges: true,
      lastModified: Date.now()
    });
    setShowNewFileDialog(false);
  };

  const saveFile = () => {
    const activeTab = tabs.find(tab => tab.id === activeTabId);
    if (!activeTab) return;

    const blob = new Blob([activeTab.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab.name}.${SUPPORTED_LANGUAGES[activeTab.language].extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      const language = Object.entries(SUPPORTED_LANGUAGES).find(
        ([_, config]) => config.extension === ext
      )?.[0] as SupportedLanguage || 'javascript';
      
      addTab({
        name: file.name.split('.')[0],
        language,
        content,
        unsavedChanges: false,
        lastModified: Date.now()
      });
    };
    reader.readAsText(file);
  };

  const getDefaultTemplate = (language: SupportedLanguage): string => {
    return SUPPORTED_LANGUAGES[language].snippets[0]?.code || '';
  };

  return (
    <>
      <header className={`h-14 px-4 flex items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/50 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-300 relative z-10`}>
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 group">
            <div className="relative">
              <FiCode className="w-6 h-6 text-blue-400 transform transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-blue-400/20 blur-lg rounded-full animate-pulse" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
              Code Editor
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => setShowNewFileDialog(true)}
              className="flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all transform hover:scale-105 shadow-md hover:shadow-blue-500/30 group"
            >
              <FiPlus className="w-4 h-4 mr-2 transform transition-transform group-hover:rotate-90" />
              New File
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white transition-all transform hover:scale-105 shadow-md hover:shadow-gray-500/30 group"
            >
              <FiFolder className="w-4 h-4 mr-2 transform transition-transform group-hover:translate-y-[-1px]" />
              Open
            </button>

            <button
              onClick={saveFile}
              disabled={!activeTabId}
              className={`flex items-center px-3 py-1.5 rounded-lg transition-all transform hover:scale-105 shadow-md group ${activeTabId ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:shadow-green-500/30' : 'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-400 cursor-not-allowed opacity-75'}`}
            >
              <FiSave className="w-4 h-4 mr-2 transform transition-transform group-hover:translate-y-[-1px]" />
              Save
            </button>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={openFile}
          className="hidden"
          accept={Object.values(SUPPORTED_LANGUAGES).map(lang => `.${lang.extension}`).join(',')}
        />

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 shadow-md">
              <FiGitBranch className="w-4 h-4" />
              <span className="text-sm font-medium">main</span>
            </div>

            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 shadow-md">
              <FiGlobe className="w-4 h-4" />
              <span className="text-sm font-medium">v1.0.0</span>
            </div>
          </div>
          
          <button className="p-2.5 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-gray-300 hover:text-white transition-all transform hover:scale-105 shadow-md hover:shadow-gray-600/30 group">
            <FiSettings className="w-5 h-5 transform transition-transform group-hover:rotate-90" />
          </button>

          <button className="hidden sm:flex p-2.5 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-gray-300 hover:text-white transition-all transform hover:scale-105 shadow-md hover:shadow-gray-600/30 group">
            <FiCommand className="w-5 h-5 transform transition-transform group-hover:scale-110" />
          </button>
          
          <div className="w-px h-6 bg-gray-700/50" />
          <ThemeToggle />
        </div>
      </header>

      {/* New File Dialog */}
      {showNewFileDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-2xl w-full max-w-md transform transition-all animate-fade-in-up border border-gray-700/50">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <FiPlus className="w-5 h-5 mr-2 text-blue-400" />
                Create New File
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(SUPPORTED_LANGUAGES).map(([lang, config]) => (
                  <button
                    key={lang}
                    onClick={() => createNewFile(lang as SupportedLanguage)}
                    className="flex items-center p-4 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-all transform hover:scale-105 group relative overflow-hidden"
                  >
                    <div className={`w-2 h-8 rounded-sm ${config.color.replace('text', 'bg')} mr-3 group-hover:h-10 transition-all`} />
                    <div className="flex flex-col items-start relative z-10">
                      <span className="text-white font-medium">
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </span>
                      <span className="text-xs text-gray-400">
                        .{config.extension}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </button>
                ))}
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-900/50 rounded-b-xl flex justify-end border-t border-gray-700/50">
              <button
                onClick={() => setShowNewFileDialog(false)}
                className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;