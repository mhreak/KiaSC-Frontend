import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { CustomerSearchDialog } from "./CustomerSearchDialog";
import { cn } from "@/lib/utils";

interface Props extends Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "onChange"
> {
  value: string | number;
  onChange: (value: string | number) => void;
}

export function CustomerSearch({ value, onChange, ...props }: Readonly<Props>) {
  const [customerName, setCustomerName] = useState<string>("");

  return (
    <div className="relative">
      <CustomerSearchDialog
        onCustomerSelect={(id, name) => {
          onChange(id);
          setCustomerName(name);
          
        }}
      />
      <Input
        value={customerName}
        readOnly
        className={cn("pl-10")}
        {...props}
      />
    </div>
  );
}
