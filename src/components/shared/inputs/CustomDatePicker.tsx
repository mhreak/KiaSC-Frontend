import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { DynamicIcon } from "@/components/formBuilder/components/icon-renderer";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface CustomInputProps {
  value?: string;
  openCalendar?: () => void;
  iconName: string;
  className?: string;
  onClear: () => void;
  handleValueChange?: (value: string) => void;
}

export const CustomDatePicker = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      value,
      openCalendar,
      iconName,
      className,
      onClear,
      handleValueChange,
      ...props
    },
    ref,
  ) => {
    return (
      <InputGroup>
        {/* {value && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // handleValueChange?.("");
              onClear();
            }}
            className="absolute left-10 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-muted"
          >
            <X className="h-4 w-4 text-destructive" />
          </button>
        )} */}
        <InputGroupInput
          ref={ref}
          value={value ?? ""}
          readOnly
          onClick={openCalendar}
          className={cn("pr-7", className)}
          {...props}
        />
        <InputGroupAddon>
          <DynamicIcon
            name={iconName}
            className={`absolute right-3 top-1/2 size-6 -translate-y-1/2 text-muted-foreground cursor-pointer`}
            onClick={openCalendar}
          />
        </InputGroupAddon>
      </InputGroup>
    );
  },
);

CustomDatePicker.displayName = "CustomDatePicker";
