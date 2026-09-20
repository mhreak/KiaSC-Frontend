import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React from "react";

interface TextInputProps {
  label: string | React.ReactNode;
  value: string;
  onChange: (e: any) => void;
  placeHolder?: string;
  required?: boolean;
  defaultValue?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeHolder = "",
  required = false,
  defaultValue,
  ...rest
}) => {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <Input
        placeholder={placeHolder}
        required={required}
        value={value}
        onChange={onChange}
        type="text"
        {...rest}
      />
    </Field>
  );
};

export default TextInput;
