import type { Monaco } from '@monaco-editor/react';

export function createDarkTheme(monaco: Monaco) {
  monaco.editor.defineTheme('oled-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6A9955' },
      { token: 'keyword', foreground: 'C586C0' },
      { token: 'string', foreground: 'CE9178' },
      { token: 'number', foreground: 'B5CEA8' },
      { token: 'tag', foreground: '569CD6' },
      { token: 'tag.name', foreground: '4EC9B0' },
      { token: 'attribute.name', foreground: '9CDCFE' },
      { token: 'attribute.value', foreground: 'CE9178' },
      { token: 'delimiter', foreground: '808080' },
    ],
    colors: {
      'editor.background': '#0a0a0a',
      'editor.foreground': '#d4d4d4',
      'editorCursor.foreground': '#00f5ff',
      'editor.lineHighlightBackground': '#111111',
      'editorLineNumber.foreground': '#606060',
      'editor.selectionBackground': '#264f78',
      'editor.inactiveSelectionBackground': '#3a3d41',
      'editorIndentGuide.background': '#1a1a1a',
      'editorIndentGuide.activeBackground': '#2a2a2a',
      'editorSuggestWidget.background': '#111111',
      'editorSuggestWidget.border': '#1a1a1a',
      'editorSuggestWidget.foreground': '#d4d4d4',
      'editorSuggestWidget.selectedBackground': '#1a1a1a',
      'editorHoverWidget.background': '#111111',
      'editorHoverWidget.border': '#1a1a1a',
    },
  });
}
