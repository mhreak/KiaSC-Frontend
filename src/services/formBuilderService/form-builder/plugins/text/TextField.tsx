"use client";

import React from "react";
import { FieldComponentProps } from "../../core/registry";
import { useUIAdapter } from "../../core/context";

export const TextField: React.FC<FieldComponentProps> = ({
  name,
  value,
  onChange,
  disabled,
  readOnly,
  error,
  config,
}) => {
  // Pull the abstract components context dynamically
  const { TextInput } = useUIAdapter();

  return (
    <TextInput
      id={config.id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={config.placeholder}
      error={error}
      {...config.props}
    />
  );
};
