"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxContract } from "../../core/ui-contracts";

export const ShadcnCheckbox: React.FC<CheckboxContract> = ({
  id,
  name,
  value,
  onChange,
  disabled,
}) => {
  return (
    <Checkbox
      id={id}
      name={name}
      checked={value}
      onCheckedChange={(checked) => onChange(!!checked)}
      disabled={disabled}
    />
  );
};
