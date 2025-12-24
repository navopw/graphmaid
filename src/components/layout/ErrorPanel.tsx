interface ErrorPanelProps {
  error: string | null;
  errorLine: number | null;
  onJumpToLine: (line: number) => void;
}

export default function ErrorPanel({ error, errorLine, onJumpToLine }: ErrorPanelProps) {
  if (!error) return null;

  return (
    <div className="px-3 py-2 bg-error/10 border border-error/20 rounded text-sm">
      <div className="flex items-start justify-between gap-4">
        <p className="text-text-primary font-mono text-xs">{error}</p>
        {errorLine && (
          <button
            onClick={() => onJumpToLine(errorLine)}
            className="text-xs text-accent hover:underline whitespace-nowrap"
          >
            Line {errorLine}
          </button>
        )}
      </div>
    </div>
  );
}
