import { useState, useRef } from 'react';
import { Toaster } from 'sonner';
import type { editor } from 'monaco-editor';
import MonacoEditor from './components/editor/MonacoEditor';
import MermaidDiagram from './components/viewer/MermaidDiagram';
import Header from './components/layout/Header';
import SplitPane from './components/layout/SplitPane';
import ErrorPanel from './components/layout/ErrorPanel';
import { useMermaidRender } from './hooks/useMermaidRender';
import { sampleDiagrams, type Sample } from './data/samples';

function App() {
  const rawCode = new URLSearchParams(window.location.search).get('code');
  const initialCode = rawCode ? atob(rawCode) : sampleDiagrams[0].code;
  const [code, setCode] = useState(initialCode);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const { svg, error, errorLine, loading } = useMermaidRender(code);

  const handleSampleSelect = (sample: Sample) => {
    setCode(sample.code);
  };

  const handleClear = () => {
    setCode('');
  };

  const handleJumpToLine = (line: number) => {
    if (editorRef.current) {
      editorRef.current.revealLineInCenter(line);
      editorRef.current.setPosition({ lineNumber: line, column: 1 });
      editorRef.current.focus();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-bg-primary overflow-hidden">
      <Toaster theme="dark" position="bottom-center" />
      <Header
        title="Graphmaid"
        onSampleSelect={handleSampleSelect}
        onClear={handleClear}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {error && (
          <div className="px-4 py-2">
            <ErrorPanel 
              error={error} 
              errorLine={errorLine} 
              onJumpToLine={handleJumpToLine}
            />
          </div>
        )}
        
        <SplitPane initialSplit={50}
          left={
            <div className="h-full flex flex-col bg-bg-secondary border-r border-border">
              <div className="flex items-center justify-between px-3 py-2 border-b border-border">
                <span className="text-sm text-text-secondary">Editor</span>
                <span className="text-xs text-text-muted font-mono">
                  {code.split('\n').length} lines
                </span>
              </div>
              <div className="flex-1 overflow-hidden">
                <MonacoEditor 
                  value={code} 
                  onChange={(value) => setCode(value || '')}
                  errorLine={errorLine}
                />
              </div>
            </div>
          }
          right={
            <div className="h-full bg-bg-secondary">
              <MermaidDiagram svg={svg} loading={loading} />
            </div>
          }
        />
      </div>
    </div>
  );
}

export default App;
