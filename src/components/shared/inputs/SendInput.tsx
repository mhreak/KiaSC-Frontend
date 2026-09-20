"use client";
import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props extends Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "onChange"
> {
  value: string;
  onChange: (value: string) => void;
}

const SendInput = ({ value, onChange, ...props }: Readonly<Props>) => {
  return (
    <InputGroup>
      <InputGroupInput
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        type={"text"}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <Button
          variant={"outline"}
          size={"icon-lg"}
          className={"bg-linear-to-r from-[#E675C4] to-[#8983FA]"}
        >
          <Send className="text-primary-foreground" />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SendInput;
