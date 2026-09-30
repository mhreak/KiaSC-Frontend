import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { AthleteSearchDialog } from "./AthleteSearchDialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface Props extends Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "onChange"
> {
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
  onClear?: () => void;
  displayName?: string;
}

export function AthleteSearch({
  value,
  onChange,
  className,
  onClear,
  displayName,
  ...props
}: Readonly<Props>) {
  const [athleteName, setAthleteName] = useState<string>("");

  useEffect(() => {
    setAthleteName(displayName || "");
  }, [displayName]);

  return (
    <div className="relative">
      {athleteName && (
        <button
          className="absolute left-14 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setAthleteName("");
            onClear?.();
          }}
        >
          <X className="size-5 text-muted-foreground" />
        </button>
      )}
      <AthleteSearchDialog
        onAthleteSelect={(id, name) => {
          onChange(id);
          setAthleteName(name);
        }}
      />
      <Input value={athleteName} readOnly className={cn("pl-10")} {...props} />
    </div>
  );
}
