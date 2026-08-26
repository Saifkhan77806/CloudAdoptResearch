'use client';

import { cn } from '@/lib/utils';

interface RatingQuestionProps {
  value: number | undefined;
  onChange: (value: number) => void;
  labels?: Record<number, string>;
  error?: string;
}

export function RatingQuestion({
  value,
  onChange,
  labels = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
  },
  error,
}: RatingQuestionProps) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {[1, 2, 3, 4, 5].map((num) => {
          const selected = value === num;
          return (
            <button
              key={num}
              type="button"
              onClick={() => onChange(num)}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-lg border text-sm font-medium transition-all',
                selected
                  ? 'border-accent bg-accent text-white shadow-sm'
                  : 'border-border bg-background hover:border-accent/50 hover:bg-secondary/50'
              )}
              aria-label={`Rate ${num}`}
              aria-pressed={selected}
            >
              {num}
            </button>
          );
        })}
      </div>
      {value && labels[value] && (
        <p className="mt-3 text-sm font-medium text-accent">{labels[value]}</p>
      )}
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}
