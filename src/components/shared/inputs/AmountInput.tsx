"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  digitDivider,
  removeCommas,
  toEnglishDigits,
  toPersianDigits,
  toPersianLetters,
} from "@/utils/numberConversions";

interface AmountInputProps extends Omit<
  React.ComponentProps<"input">, 
  "value" | "onChange"
> {
  value?: string;
  onChange?: (value: string) => void;
  isRial?: boolean;
}

export function AmountInput({
  value = "",
  onChange,
  isRial = false,
  ...props
}: Readonly<AmountInputProps>) {
  const displayValue = React.useMemo(() => {
    return toPersianDigits(digitDivider(value));
  }, [value]);

  const unitLetter =
    (value !== undefined &&
      value !== "" &&
      value !== null &&
      (isRial ? " ریال" : " تومان")) ||
    "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;

    raw = toEnglishDigits(raw) || "";

    // حذف کاما
    raw = removeCommas(raw);

    // فقط عدد
    raw = raw.replace(/\D/g, "");

    onChange?.(raw);
  };

  return (
    <>
      <Input
        {...props}
        value={displayValue}
        inputMode="numeric"
        dir="ltr"
        onChange={handleChange}
        size={"default"}
      />
      <p className="text-xs text-muted-foreground mt-1">
        {toPersianLetters(
          isRial ? Number.parseInt(value) : Number.parseInt(value) / 10,
        ) + unitLetter}
      </p>
    </>
  );
}
