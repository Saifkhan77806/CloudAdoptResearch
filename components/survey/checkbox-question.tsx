'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface CheckboxQuestionProps {
  value: string[];
  options: readonly string[];
  onChange: (value: string[]) => void;
  error?: string;
  columns?: 1 | 2;
}

export function CheckboxQuestion({
  value,
  options,
  onChange,
  error,
  columns = 1,
}: CheckboxQuestionProps) {
  const toggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div>
      <div
        className={cn(
          'gap-2.5',
          columns === 2 ? 'grid grid-cols-1 sm:grid-cols-2' : 'flex flex-col'
        )}
      >
        {options.map((option) => {
          const selected = value.includes(option);
          return (
            <Label
              key={option}
              className={cn(
                'flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-all',
                selected
                  ? 'border-accent bg-accent/5 ring-1 ring-accent'
                  : 'border-border hover:border-accent/50 hover:bg-secondary/50'
              )}
            >
              <Checkbox
                checked={selected}
                onCheckedChange={() => toggle(option)}
                className={cn(selected && 'border-accent text-accent')}
              />
              <span className={cn(selected && 'font-medium')}>{option}</span>
            </Label>
          );
        })}
      </div>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}
