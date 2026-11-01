import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { CourseSearchDialog } from "./CourseSearchDialog";
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
  onConfirm?: () => void;
}

export function CourseSearch({
  value,
  onChange,
  className,
  onClear,
  displayName,
  onConfirm,
  ...props
}: Readonly<Props>) {
  const [courseName, setCourseName] = useState<string>("");

  useEffect(() => {
    setCourseName(displayName || "");
  }, [displayName]);

  return (
    <div className="relative">
      {courseName && (
        <button
          className="absolute left-14 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setCourseName("");
            onClear?.();
          }}
        >
          <X className="size-5 text-muted-foreground" />
        </button>
      )}
      <CourseSearchDialog
        onCourseSelect={(id, name) => {
          onChange(id);
          setCourseName(name);
        }}
        onConfirm={onConfirm}
      />
      <Input value={courseName} readOnly className={cn("pl-10")} {...props} />
    </div>
  );
}
