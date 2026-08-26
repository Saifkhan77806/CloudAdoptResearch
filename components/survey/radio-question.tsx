'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface RadioQuestionProps {
  name: string;
  value: string | undefined;
  options: readonly string[];
  onChange: (value: string) => void;
  error?: string;
  columns?: 1 | 2;
}

export function RadioQuestion({
  value,
  options,
  onChange,
  error,
  columns = 1,
}: RadioQuestionProps) {
  return (
    <div>
      <RadioGroup
        value={value ?? ''}
        onValueChange={onChange}
        className={cn('gap-2.5', columns === 2 && 'grid grid-cols-1 sm:grid-cols-2')}
      >
        {options.map((option) => {
          const selected = value === option;
          return (
            <Label
              key={option}
              htmlFor={option}
              className={cn(
                'flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-all',
                selected
                  ? 'border-accent bg-accent/5 ring-1 ring-accent'
                  : 'border-border hover:border-accent/50 hover:bg-secondary/50'
              )}
            >
              <RadioGroupItem
                id={option}
                value={option}
                className={cn(selected && 'border-accent text-accent')}
              />
              <span className={cn(selected && 'font-medium')}>{option}</span>
            </Label>
          );
        })}
      </RadioGroup>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}
