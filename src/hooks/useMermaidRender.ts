import { useState, useCallback, useEffect } from 'react';
import { renderMermaid, getErrorLine } from '../lib/mermaid';

export interface RenderResult {
  svg: string | null;
  error: string | null;
  errorLine: number | null;
  loading: boolean;
}

export function useMermaidRender(code: string, debounceMs: number = 500) {
  const [result, setResult] = useState<RenderResult>({
    svg: null,
    error: null,
    errorLine: null,
    loading: false,
  });

  const render = useCallback(async () => {
    if (!code.trim()) {
      setResult({ svg: null, error: null, errorLine: null, loading: false });
      return;
    }

    setResult(prev => ({ ...prev, loading: true, error: null, errorLine: null }));

    const { svg, error } = await renderMermaid(code);
    
    setResult({
      svg: error ? null : svg,
      error: error || null,
      errorLine: error ? getErrorLine(error) : null,
      loading: false,
    });
  }, [code]);

  useEffect(() => {
    const timeoutId = setTimeout(render, debounceMs);
    return () => clearTimeout(timeoutId);
  }, [render, debounceMs]);

  return result;
}
