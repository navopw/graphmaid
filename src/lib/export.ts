import html2canvas from 'html2canvas';

export async function exportAsSVG(svgElement: SVGElement, filename: string = 'diagram.svg') {
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function exportAsPNG(svgElement: SVGElement, filename: string = 'diagram.png') {
  const canvas = await html2canvas(svgElement.parentElement as HTMLElement || document.body, {
    backgroundColor: '#0a0a0a',
    scale: 2,
  });
  
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function copyToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
}
