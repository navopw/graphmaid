import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { sampleDiagrams, type Sample } from '../../data/samples';

interface SampleSelectorProps {
  onSelectSample: (sample: Sample) => void;
}

export default function SampleSelector({ onSelectSample }: SampleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  const getPosition = () => {
    if (!buttonRef.current) return { top: 0, right: 0 };
    const rect = buttonRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + 4,
      right: window.innerWidth - rect.right
    };
  };

  const position = isOpen ? getPosition() : { top: 0, right: 0 };

  const dropdown = isOpen && createPortal(
    <div 
      className="fixed w-56 bg-bg-tertiary border border-border rounded shadow-lg overflow-hidden"
      style={{ top: position.top, right: position.right, zIndex: 99999 }}
    >
      <div className="max-h-80 overflow-y-auto py-1">
        {sampleDiagrams.map(sample => (
          <button
            key={sample.id}
            onClick={() => {
              onSelectSample(sample);
              setIsOpen(false);
            }}
            className="w-full text-left px-3 py-2 hover:bg-white/5 transition-colors"
          >
            <div className="text-sm text-text-primary">{sample.name}</div>
            <div className="text-xs text-text-muted">{sample.category}</div>
          </button>
        ))}
      </div>
    </div>,
    document.body
  );

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary border border-border rounded hover:border-text-muted transition-colors"
      >
        Samples
      </button>
      {dropdown}
    </>
  );
}
