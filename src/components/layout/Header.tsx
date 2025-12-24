import SampleSelector from '../toolbar/SampleSelector';

interface HeaderProps {
  title: string;
  onSampleSelect: (sample: { id: string; name: string; description: string; code: string; category: string }) => void;
  onClear: () => void;
}

export default function Header({ title, onSampleSelect, onClear }: HeaderProps) {
  return (
    <header className="h-12 flex items-center justify-between px-4 border-b border-border bg-bg-primary">
      <h1 className="font-medium text-text-primary">{title}</h1>
      
      <div className="flex items-center gap-2">
        <SampleSelector onSelectSample={onSampleSelect} />
        <button 
          onClick={onClear}
          className="px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          Clear
        </button>
      </div>
    </header>
  );
}
