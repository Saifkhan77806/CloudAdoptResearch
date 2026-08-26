'use client';

import { cn } from '@/lib/utils';

interface MatrixQuestionProps {
  drivers: readonly string[];
  values: Record<string, number>;
  onChange: (driver: string, value: number) => void;
  error?: string;
}

export function MatrixQuestion({
  drivers,
  values,
  onChange,
  error,
}: MatrixQuestionProps) {
  return (
    <div>
      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          <div className="grid grid-cols-[1fr_repeat(5,3rem)] gap-2 border-b border-border pb-3">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Factor
            </div>
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                {n}
              </div>
            ))}
          </div>
          <div className="divide-y divide-border">
            {drivers.map((driver) => (
              <div
                key={driver}
                className="grid grid-cols-[1fr_repeat(5,3rem)] items-center gap-2 py-3"
              >
                <div className="text-sm">{driver}</div>
                {[1, 2, 3, 4, 5].map((num) => {
                  const selected = values[driver] === num;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => onChange(driver, num)}
                      className={cn(
                        'mx-auto flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium transition-all',
                        selected
                          ? 'border-accent bg-accent text-white'
                          : 'border-border hover:border-accent/50 hover:bg-secondary/50'
                      )}
                      aria-label={`${driver}: ${num}`}
                      aria-pressed={selected}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}
