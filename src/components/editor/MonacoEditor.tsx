import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { createDarkTheme } from './mermaid-theme';
import initEditor from 'monaco-mermaid';

interface MonacoEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  errorLine: number | null;
}

export default function MonacoEditor({ value, onChange, errorLine }: MonacoEditorProps) {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    initEditor(monaco);
    createDarkTheme(monaco);
    monaco.editor.setTheme('oled-dark');

    monaco.languages.registerCompletionItemProvider('mermaid', {
      provideCompletionItems: () => {
        const suggestions = [
          { label: 'flowchart TD', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'flowchart TD\n    ' },
          { label: 'sequenceDiagram', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'sequenceDiagram\n    ' },
          { label: 'classDiagram', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'classDiagram\n    ' },
          { label: 'stateDiagram-v2', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'stateDiagram-v2\n    ' },
          { label: 'gantt', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'gantt\n    title Project\n    ' },
          { label: 'pie showData', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'pie showData\n    title Title\n    ' },
        ];
        return { suggestions };
      },
    });
  };

  useEffect(() => {
    if (errorLine && editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        editorRef.current.deltaDecorations(
          [],
          [{ 
            range: new (window as any).monaco.Range(errorLine, 1, errorLine, 1),
            options: { 
              isWholeLine: true, 
              className: 'errorLine',
              glyphMarginClassName: 'errorGlyph',
            } 
          }]
        );
      }
    } else if (editorRef.current) {
      editorRef.current.deltaDecorations([], []);
    }
  }, [errorLine]);

  return (
    <Editor
      height="100%"
      language="mermaid"
      value={value}
      onChange={onChange}
      onMount={handleEditorDidMount}
      theme="oled-dark"
      options={{
        minimap: { enabled: true },
        fontSize: 14,
        fontFamily: 'JetBrains Mono, monospace',
        lineNumbers: 'on',
        wordWrap: 'on',
        automaticLayout: true,
        scrollBeyondLastLine: false,
        renderWhitespace: 'selection',
        bracketPairColorization: { enabled: true },
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        formatOnPaste: true,
        tabSize: 2,
      }}
      loading={
        <div className="flex items-center justify-center h-full text-white/50">
          <div className="animate-spin-slow w-8 h-8 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full"></div>
        </div>
      }
    />
  );
}
