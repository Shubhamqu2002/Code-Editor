import React, { useState, useCallback } from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Sidebar/Sidebar';
import CodeEditor from './components/Editor/CodeEditor';
import Console from './components/Console/Console';
import { useEditorStore } from './store/editorStore';
import { ThemeType } from './types';
import EditorTabs from './components/Editor/EditorTabs';

interface EditorState {
  theme: ThemeType;
}

const App: React.FC = () => {
  const theme = useEditorStore((state: EditorState) => state.theme);
  const [isDragging, setIsDragging] = useState(false);
  const [splitPosition, setSplitPosition] = useState(70);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const container = e.currentTarget as HTMLDivElement;
    const containerRect = container.getBoundingClientRect();
    const newPosition = ((e.clientY - containerRect.top) / containerRect.height) * 100;
    setSplitPosition(Math.min(Math.max(newPosition, 20), 80));
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className={`h-screen flex flex-col ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <EditorTabs />
          <div 
            className="flex-1 flex flex-col relative"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div 
              className="editor-container"
              style={{ height: `${splitPosition}%` }}
            >
              <CodeEditor />
            </div>
            
            <div
              className={`resizer ${isDragging ? 'dragging' : ''}`}
              onMouseDown={handleMouseDown}
            />
            
            <div 
              className="console-container"
              style={{ height: `${100 - splitPosition}%` }}
            >
              <Console />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;