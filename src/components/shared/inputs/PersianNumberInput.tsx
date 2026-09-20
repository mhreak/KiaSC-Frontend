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
}

export function PersianNumberInput({
  value = "",
  onChange,
  icon,
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
    <InputGroup>
      <InputGroupInput
        {...props}
        inputMode="numeric"
        autoComplete="off"
        // dir="ltr"
        value={displayValue}
        onChange={handleChange}
      />
      {icon && <InputGroupAddon>{icon}</InputGroupAddon>}
    </InputGroup>
  );
}
