"use client";
import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface Props extends Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "onChange"
> {
  value: string;
  onChange: (value: string) => void;
  inputClassName?: string;
}

const PasswordInput = ({
  value,
  onChange,
  inputClassName,
  ...props
}: Readonly<Props>) => {
  const [isShowPassword, setIsShowPassword] = React.useState<boolean>(false);
  return (
    <InputGroup className={inputClassName}>
      <InputGroupInput
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        type={isShowPassword ? "text" : "password"}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {isShowPassword ? (
          <EyeOffIcon
            onClick={() => setIsShowPassword((prev) => !prev)}
            className="cursor-pointer size-6 text-muted-foreground/50 animate-fade-in"
          />
        ) : (
          <EyeIcon
            onClick={() => setIsShowPassword((prev) => !prev)}
            className="cursor-pointer size-6 text-muted-foreground/50 animate-fade-in"
          />
        )}
      </InputGroupAddon>
    </InputGroup>
  );
};

export default PasswordInput;
