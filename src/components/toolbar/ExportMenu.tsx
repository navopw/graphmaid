import { useState } from 'react';
import { exportAsSVG, exportAsPNG, copyToClipboard } from '../../lib/export';

interface ExportMenuProps {
  svgElement: SVGElement | null;
}

export default function ExportMenu({ svgElement }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExportSVG = async () => {
    if (svgElement) {
      await exportAsSVG(svgElement);
      setIsOpen(false);
    }
  };

  const handleExportPNG = async () => {
    if (svgElement) {
      await exportAsPNG(svgElement);
      setIsOpen(false);
    }
  };

  const handleCopySVG = async () => {
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      await copyToClipboard(svgData);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-primary flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Export
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-48 glass-panel rounded-lg shadow-xl z-50 animate-slide-down overflow-hidden">
            <button
              onClick={handleExportSVG}
              className="w-full px-4 py-3 text-left text-sm hover:bg-neon-cyan/10 transition-colors flex items-center gap-2 border-b border-white/5"
            >
              <span className="text-neon-cyan">⟡</span>
              Download SVG
            </button>
            <button
              onClick={handleExportPNG}
              className="w-full px-4 py-3 text-left text-sm hover:bg-neon-cyan/10 transition-colors flex items-center gap-2 border-b border-white/5"
            >
              <span className="text-neon-purple">⬡</span>
              Download PNG
            </button>
            <button
              onClick={handleCopySVG}
              className="w-full px-4 py-3 text-left text-sm hover:bg-neon-cyan/10 transition-colors flex items-center gap-2"
            >
              <span className="text-neon-green">◻</span>
              Copy SVG to Clipboard
            </button>
          </div>
        </>
      )}
    </div>
  );
}
