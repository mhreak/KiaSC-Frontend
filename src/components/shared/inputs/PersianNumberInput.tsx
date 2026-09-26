"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { toEnglishDigits, toPersianDigits } from "@/utils/numberConversions";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export interface PersianNumberInputProps extends Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "onChange"
> {
  value?: string;
  onChange?: (value: string) => void;
  icon?: React.ReactNode;
  inputSize?: "small" | "default" | null | undefined;
}

export function PersianNumberInput({
  value = "",
  onChange,
  icon,
  inputSize = "default",
  ...props
}: Readonly<PersianNumberInputProps>) {
  const displayValue = React.useMemo(() => toPersianDigits(value), [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = toEnglishDigits(e.target.value) || "";

    // فقط عدد
    const numeric = raw.replace(/\D/g, "");

    onChange?.(numeric);
  };

  return (
    <div className="relative">
      <Input
        {...props}
        inputMode="numeric"
        autoComplete="off"
        // dir="ltr"
        size={inputSize}
        value={displayValue}
        onChange={handleChange}
      />
      {icon && <span className="absolute top-1 left-2">{icon}</span>}
    </div>
  );
}
