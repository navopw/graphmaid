import { useState, useRef, useEffect } from 'react';

interface SplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
  leftMin?: number;
  rightMin?: number;
  initialSplit?: number;
}

export default function SplitPane({ 
  left, 
  right, 
  leftMin = 300,
  rightMin = 300,
  initialSplit = 50 
}: SplitPaneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [split, setSplit] = useState(initialSplit);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      
      const minLeft = (leftMin / rect.width) * 100;
      const maxLeft = 100 - (rightMin / rect.width) * 100;
      
      setSplit(Math.max(minLeft, Math.min(maxLeft, percentage)));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, leftMin, rightMin]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <div ref={containerRef} className="flex h-full">
      <div 
        className="overflow-hidden" 
        style={{ width: `${split}%`, minWidth: leftMin }}
      >
        {left}
      </div>
      <div
        className={`w-1 bg-oled-border hover:bg-neon-cyan cursor-col-resize transition-colors flex items-center justify-center ${
          isDragging ? 'bg-neon-cyan' : ''
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className="w-1 h-8 bg-oled-black rounded-full opacity-0 hover:opacity-100 transition-opacity" />
      </div>
      <div 
        className="overflow-hidden flex-1" 
        style={{ minWidth: rightMin }}
      >
        {right}
      </div>
    </div>
  );
}
