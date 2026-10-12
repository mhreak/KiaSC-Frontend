"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TermSelectDialog } from "./TermSelectDialog";

export interface Term {
  id: string;
  name: string;
  year: string;
  season: string;
}

interface Props extends Omit<React.ComponentProps<"div">, "onChange"> {
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
  onClear?: () => void;
  disabled?: boolean;
  readOnly?: boolean;
}

export function TermSelect({
  value,
  onChange,
  className,
  onClear,
  disabled,
  readOnly,
  ...props
}: Readonly<Props>) {
  const [selectedTerms, setSelectedTerms] = useState<Term[]>([]);

  const handleSelectionChange = (terms: Term[]) => {
    setSelectedTerms(terms);
    onChange(terms.map((term) => term.id));
  };

  const handleRemove = (termId: string) => {
    const newTerms = selectedTerms.filter((term) => term.id !== termId);

    setSelectedTerms(newTerms);
    onChange(newTerms.map((term) => term.id));

    if (newTerms.length === 0) {
      onClear?.();
    }
  };

  const handleClear = () => {
    setSelectedTerms([]);
    onChange([]);
    onClear?.();
  };

  return (
    <div
      {...props}
      className={cn(
        "relative flex min-h-14 w-full flex-wrap items-center gap-2 rounded-xl border border-input bg-background px-3 py-2",
        "focus-within:ring-2 focus-within:ring-ring/50",
        (disabled || readOnly) && "cursor-not-allowed bg-muted opacity-70",
        className,
      )}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {selectedTerms.map((term) => (
          <div
            key={term.id}
            className="flex items-center text-white gap-1 rounded-lg bg-secondary px-2.5 py-1.5 text-sm font-medium"
          >
            <span>{term.name}</span>

            {!disabled && !readOnly && (
              <button
                type="button"
                onClick={() => handleRemove(term.id)}
                className="flex size-5 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="size-3.5 cursor-pointer" />
              </button>
            )}
          </div>
        ))}

        {selectedTerms.length === 0 && (
          <span className="text-sm text-muted-foreground">
            ورزشی انتخاب نشده است
          </span>
        )}
      </div>

      {selectedTerms.length > 0 && !disabled && !readOnly && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="shrink-0"
          onClick={handleClear}
        >
          <X className="size-4 text-muted-foreground" />
        </Button>
      )}

      {!disabled && !readOnly && (
        <TermSelectDialog
          selectedTerms={selectedTerms}
          onSelectionChange={handleSelectionChange}
        />
      )}
    </div>
  );
}
