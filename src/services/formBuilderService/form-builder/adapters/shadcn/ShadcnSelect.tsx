"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectContract } from "../../core/ui-contracts";

export const ShadcnSelect: React.FC<SelectContract> = ({
  id,
  value,
  onChange,
  disabled,
  placeholder,
  options,
}) => {
  return (
    // Intercept incoming value adjustments and convert any nullish states into a clean text string
    <Select
      value={value ?? ""}
      onValueChange={(val) => onChange(val ?? "")}
      disabled={disabled}
    >
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
