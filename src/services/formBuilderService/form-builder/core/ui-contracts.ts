import React from "react";

export interface BaseInputContract {
  id?: string;
  name: string;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  error?: { message?: string };
}

export interface TextInputContract extends BaseInputContract {
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "password" | "number";
}

export interface CheckboxContract extends BaseInputContract {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectContract extends BaseInputContract {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}

/**
 * The full collection of UI components our builder engine expects.
 */
export interface FormUIAdapter {
  TextInput: React.ComponentType<TextInputContract>;
  Checkbox: React.ComponentType<CheckboxContract>;
  Select: React.ComponentType<SelectContract>;
}
