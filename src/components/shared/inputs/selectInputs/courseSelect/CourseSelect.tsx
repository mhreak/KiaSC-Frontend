"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CourseSelectDialog } from "./CourseSelectDialog";

export interface Course {
  id: string;
  name: string;
  sport: string;
  term: string;
  gender: 'male' | 'female';
}

interface Props extends Omit<React.ComponentProps<"div">, "onChange"> {
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
  onClear?: () => void;
  disabled?: boolean;
  readOnly?: boolean;
}

export function CourseSelect({
  value,
  onChange,
  className,
  onClear,
  disabled,
  readOnly,
  ...props
}: Readonly<Props>) {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  const handleSelectionChange = (courses: Course[]) => {
    setSelectedCourses(courses);
    onChange(courses.map((course) => course.id));
  };

  const handleRemove = (courseId: string) => {
    const newCourses = selectedCourses.filter(
      (course) => course.id !== courseId,
    );

    setSelectedCourses(newCourses);
    onChange(newCourses.map((course) => course.id));

    if (newCourses.length === 0) {
      onClear?.();
    }
  };

  const handleClear = () => {
    setSelectedCourses([]);
    onChange([]);
    onClear?.();
  };

  return (
    <div
      {...props}
      className={cn(
        "relative flex min-h-14 w-full flex-wrap items-center gap-2 rounded-xl border border-input bg-background px-3 py-2",
        "focus-within:ring-2 focus-within:ring-ring/50",
        (disabled || readOnly) && "cursor-not-allowed bg-muted opacity-70",
        className,
      )}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {selectedCourses.map((course) => (
          <div
            key={course.id}
            className="flex items-center text-white gap-1 rounded-lg bg-secondary px-2.5 py-1.5 text-sm font-medium"
          >
            <span>{course.name}</span>

            {!disabled && !readOnly && (
              <button
                type="button"
                onClick={() => handleRemove(course.id)}
                className="flex size-5 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="size-3.5 cursor-pointer" />
              </button>
            )}
          </div>
        ))}

        {selectedCourses.length === 0 && (
          <span className="text-sm text-muted-foreground">
            ورزشی انتخاب نشده است
          </span>
        )}
      </div>

      {selectedCourses.length > 0 && !disabled && !readOnly && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="shrink-0"
          onClick={handleClear}
        >
          <X className="size-4 text-muted-foreground" />
        </Button>
      )}

      {!disabled && !readOnly && (
        <CourseSelectDialog
          selectedCourses={selectedCourses}
          onSelectionChange={handleSelectionChange}
        />
      )}
    </div>
  );
}
