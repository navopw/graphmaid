import mermaid from 'mermaid';

let isInitialized = false;

export function initMermaid() {
  if (isInitialized) return;

  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    themeVariables: {
      darkMode: true,
      background: '#0a0a0a',
      primaryColor: '#a855f7',
      primaryTextColor: '#ffffff',
      primaryBorderColor: '#00f5ff',
      lineColor: '#00f5ff',
      secondaryColor: '#111111',
      tertiaryColor: '#1a1a1a',
      fontSize: '16px',
      fontFamily: 'DM Sans',
    },
    securityLevel: 'loose',
  });

  isInitialized = true;
}

export async function renderMermaid(code: string): Promise<{ svg: string; error?: string }> {
  initMermaid();

  try {
    const { svg } = await mermaid.render(`mermaid-${Date.now()}`, code);
    return { svg };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { svg: '', error: error.message };
    }
    return { svg: '', error: 'Unknown error' };
  }
}

export function getErrorLine(error: string): number | null {
  const match = error.match(/line (\d+)/i);
  return match ? parseInt(match[1], 10) : null;
}
