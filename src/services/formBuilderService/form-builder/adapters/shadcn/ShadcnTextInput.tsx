"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { TextInputContract } from "../../core/ui-contracts";

export const ShadcnTextInput: React.FC<TextInputContract> = ({
  id,
  name,
  value,
  onChange,
  disabled,
  readOnly,
  placeholder,
  type = "text",
}) => {
  return (
    <Input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
    />
  );
};
