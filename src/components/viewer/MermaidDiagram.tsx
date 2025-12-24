import { useState, useRef, useEffect, type WheelEvent } from 'react';
import { toast } from 'sonner';
import { exportAsSVG, exportAsPNG, copyToClipboard } from '../../lib/export';

interface MermaidDiagramProps {
  svg: string | null;
  loading: boolean;
}

export default function MermaidDiagram({ svg, loading }: MermaidDiagramProps) {
  const [scale, setScale] = useState(1);
  const [panning, setPanning] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const prevScale = scale;
    const delta = -Math.sign(e.deltaY) * 0.25;
    const newScale = Math.max(0.1, Math.min(50, prevScale + delta));

    const scaleRatio = newScale / prevScale;

    const cursorInSVG = {
      x: mouseX - centerX - position.x,
      y: mouseY - centerY - position.y,
    };

    const newCursorInSVG = {
      x: cursorInSVG.x * scaleRatio,
      y: cursorInSVG.y * scaleRatio,
    };

    setPosition({
      x: mouseX - centerX - newCursorInSVG.x,
      y: mouseY - centerY - newCursorInSVG.y,
    });
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      e.preventDefault();
      setPanning(true);
      setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (panning) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      });
    }
  };

  const handleMouseUp = () => setPanning(false);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (panning) {
        setPosition({
          x: e.clientX - startPos.x,
          y: e.clientY - startPos.y,
        });
      }
    };

    const handleGlobalMouseUp = () => {
      setPanning(false);
    };

    if (panning) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [panning, startPos]);

  const handleExportSVG = async () => {
    const svgElement = svgRef.current?.querySelector('svg');
    if (svgElement) {
      await exportAsSVG(svgElement);
    }
  };

  const handleExportPNG = async () => {
    const svgElement = svgRef.current?.querySelector('svg');
    if (svgElement) {
      await exportAsPNG(svgElement);
    }
  };

  const handleCopySVG = async () => {
    const svgElement = svgRef.current?.querySelector('svg');
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const success = await copyToClipboard(svgData);
      if (success) {
        toast.success('SVG copied to clipboard');
      } else {
        toast.error('Failed to copy');
      }
    }
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <span className="text-sm text-text-secondary">Preview</span>
        <div className="flex gap-2">
          <button onClick={handleReset} className="px-2 py-1 text-xs text-text-muted hover:text-text-primary">Reset</button>
          <span className="text-border">|</span>
          <button onClick={handleCopySVG} className="px-2 py-1 text-xs text-text-muted hover:text-text-primary">Copy SVG</button>
          <button onClick={handleExportSVG} className="px-2 py-1 text-xs text-text-muted hover:text-text-primary">Download SVG</button>
          <button onClick={handleExportPNG} className="px-2 py-1 text-xs text-text-muted hover:text-text-primary">Download PNG</button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden relative cursor-grab active:cursor-grabbing select-none"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          ref={svgRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})` }}
        >
          {loading ? (
            <div className="text-text-muted text-sm">Rendering...</div>
          ) : svg ? (
            <div
              className="max-w-full max-h-full p-4 select-none"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          ) : (
            <div className="text-center text-text-muted">
              <p>Enter Mermaid code to preview</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2 py-1 bg-bg-tertiary/90 rounded text-xs text-text-muted">
          {Math.round(scale * 100)}%
        </div>
      </div>
    </div>
  );
}
