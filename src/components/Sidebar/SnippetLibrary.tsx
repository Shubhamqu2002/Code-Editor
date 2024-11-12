import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiCode, FiCheck, FiX, FiStar } from 'react-icons/fi';
import { SUPPORTED_LANGUAGES } from '../../constants';
import { Snippet, SupportedLanguage } from '../../types';
import { nanoid } from 'nanoid';

interface SnippetLibraryProps {
  onSnippetSelect: (snippet: Snippet) => void;
  onSnippetCountChange: (count: number) => void;
}

interface NewSnippet {
  name: string;
  description: string;
  language: SupportedLanguage;
  content: string;
}

const SnippetLibrary: React.FC<SnippetLibraryProps> = ({ onSnippetSelect, onSnippetCountChange }) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage | 'all'>('all');
  const [isAddingSnippet, setIsAddingSnippet] = useState(false);
  const [editingSnippetId, setEditingSnippetId] = useState<string | null>(null);
  const [newSnippet, setNewSnippet] = useState<NewSnippet>({
    name: '',
    description: '',
    language: 'javascript',
    content: ''
  });

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = snippet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || snippet.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  useEffect(() => {
    onSnippetCountChange(snippets.length);
  }, [snippets, onSnippetCountChange]);

  const handleAddSnippet = () => {
    if (!newSnippet.name.trim() || !newSnippet.content.trim()) return;

    const snippet: Snippet = {
      id: nanoid(),
      ...newSnippet,
      tags: [],
      favorite: false,
      created: Date.now(),
      lastModified: Date.now()
    };
    setSnippets([...snippets, snippet]);
    setIsAddingSnippet(false);
    setNewSnippet({
      name: '',
      description: '',
      language: 'javascript',
      content: ''
    });
  };

  const handleEditSnippet = (snippet: Snippet) => {
    setEditingSnippetId(snippet.id);
    setNewSnippet({
      name: snippet.name,
      description: snippet.description,
      language: snippet.language,
      content: snippet.content
    });
  };

  const handleUpdateSnippet = (id: string) => {
    setSnippets(snippets.map(snippet => 
      snippet.id === id 
        ? { 
            ...snippet, 
            ...newSnippet, 
            lastModified: Date.now(),
            tags: snippet.tags,
            favorite: snippet.favorite
          }
        : snippet
    ));
    setEditingSnippetId(null);
    setNewSnippet({
      name: '',
      description: '',
      language: 'javascript',
      content: ''
    });
  };

  const handleDeleteSnippet = (id: string) => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      setSnippets(snippets.filter(snippet => snippet.id !== id));
    }
  };

  const toggleFavorite = (id: string) => {
    setSnippets(snippets.map(snippet =>
      snippet.id === id
        ? { ...snippet, favorite: !snippet.favorite }
        : snippet
    ));
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="p-4 space-y-4 border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search snippets..."
            className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value as SupportedLanguage | 'all')}
        >
          <option value="all">All Languages</option>
          {Object.keys(SUPPORTED_LANGUAGES).map(lang => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isAddingSnippet && (
          <div className="p-4 border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
            <input
              type="text"
              placeholder="Snippet name"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newSnippet.name}
              onChange={(e) => setNewSnippet({ ...newSnippet, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newSnippet.description}
              onChange={(e) => setNewSnippet({ ...newSnippet, description: e.target.value })}
            />
            <select
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newSnippet.language}
              onChange={(e) => setNewSnippet({ ...newSnippet, language: e.target.value as SupportedLanguage })}
            >
              {Object.keys(SUPPORTED_LANGUAGES).map(lang => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Snippet content"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              value={newSnippet.content}
              onChange={(e) => setNewSnippet({ ...newSnippet, content: e.target.value })}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddingSnippet(false)}
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSnippet}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors"
                disabled={!newSnippet.name.trim() || !newSnippet.content.trim()}
              >
                Save
              </button>
            </div>
          </div>
        )}

        {filteredSnippets.map(snippet => (
          <div
            key={snippet.id}
            className="group border-b border-gray-700 hover:bg-gray-800/50 backdrop-blur-sm transition-colors"
          >
            {editingSnippetId === snippet.id ? (
              <div className="p-4 space-y-2">
                <input
                  type="text"
                  value={newSnippet.name}
                  onChange={(e) => setNewSnippet({ ...newSnippet, name: e.target.value })}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={newSnippet.description}
                  onChange={(e) => setNewSnippet({ ...newSnippet, description: e.target.value })}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newSnippet.language}
                  onChange={(e) => setNewSnippet({ ...newSnippet, language: e.target.value as SupportedLanguage })}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.keys(SUPPORTED_LANGUAGES).map(lang => (
                    <option key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </option>
                  ))}
                </select>
                <textarea
                  value={newSnippet.content}
                  onChange={(e) => setNewSnippet({ ...newSnippet, content: e.target.value })}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingSnippetId(null)}
                    className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleUpdateSnippet(snippet.id)}
                    className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-green-400 transition-colors"
                  >
                    <FiCheck className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4" onClick={() => onSnippetSelect(snippet)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">{snippet.name}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(snippet.id);
                      }}
                      className={`p-1 rounded-md transition-colors ${
                        snippet.favorite ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
                      }`}
                    >
                      <FiStar className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditSnippet(snippet);
                      }}
                      className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSnippet(snippet.id);
                      }}
                      className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-1">{snippet.description}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${SUPPORTED_LANGUAGES[snippet.language].color} bg-opacity-20`}>
                    {snippet.language}
                  </span>
                  {snippet.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-700 bg-gray-800/30 backdrop-blur-sm">
        <button
          onClick={() => setIsAddingSnippet(true)}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg px-4 py-2 transition-all transform hover:scale-[1.02]"
        >
          <FiPlus className="w-5 h-5" />
          <span>New Snippet</span>
        </button>
      </div>
    </div>
  );
};

export default SnippetLibrary;