'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TextQuestionProps {
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  type?: 'text' | 'email' | 'tel';
}

export function TextQuestion({
  label,
  value,
  onChange,
  placeholder,
  required,
  optional,
  error,
  type = 'text',
}: TextQuestionProps) {
  return (
    <div>
      <Label className="mb-2 flex items-center gap-1.5">
        {label}
        {required && <span className="text-destructive">*</span>}
        {optional && (
          <span className="text-xs font-normal text-muted-foreground">
            (optional)
          </span>
        )}
      </Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={error && 'border-destructive focus-visible:ring-destructive'}
      />
      {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  );
}
