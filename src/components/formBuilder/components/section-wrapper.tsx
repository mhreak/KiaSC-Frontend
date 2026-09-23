// components/form-builder/section-wrapper.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "./icon-renderer";
import { User } from "lucide-react";
import { colSpanMap } from "./form-field-renderer";

interface SectionWrapperProps {
  variant?: "default" | "card" | "bordered" | "gradient" | "dangerZone";
  customClassName?: string;
  title?: string;
  icon?: string;
  iconSize?: number; // اندازه آیکون به صورت عددی (px)
  children: React.ReactNode;
  sectionColSpan?: number;
  headerClassName?: string;
}

export function SectionWrapper({
  variant = "default",
  customClassName,
  title,
  icon,
  iconSize,
  children,
  sectionColSpan,
  headerClassName,
}: Readonly<SectionWrapperProps>) {
  // تعریف استایل‌های پیش‌فرض برای هر مدل Wrapper
  const variantStyles = {
    default: "space-y-4 py-4",
    card: "bg-card text-card-foreground rounded-xl border shadow-sm",
    bordered:
      "border-2 border-dashed border-muted-foreground/20 rounded-xl p-6 space-y-4",
    gradient:
      "bg-gradient-to-br from-muted/50 to-background rounded-xl border p-6 space-y-4 shadow-inner",
    dangerZone:
      "border-2 border-destructive/30 bg-destructive/5 rounded-xl p-6 space-y-4",
  };

  const titleStyles = {
    default: "text-lg font-bold tracking-tight text-foreground",
    card: "bg-stone-50 text-xl font-semibold border-b pb-2 text-primary",
    bordered:
      "text-base font-medium text-primary px-2 bg-background w-fit -mt-9", // افکت هدر روی خط
    gradient:
      "text-lg font-bold bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-transparent",
    dangerZone: "text-lg font-bold text-destructive flex items-center gap-2",
  };

  const colSpanClass = sectionColSpan
    ? colSpanMap[sectionColSpan]
    : "col-span-12";

  return (
    <div className={cn(variantStyles[variant], customClassName, colSpanClass)}>
      {title && (
        <div
          className={cn(
            titleStyles[variant],
            "flex flex-row items-end gap-3 rounded-t-xl p-4",
            headerClassName,
          )}
        >
          {variant === "dangerZone" && <span>⚠️</span>}
          {icon && (
            <DynamicIcon
              name={icon}
              className={cn("shrink-0 text-primary text-3xl", headerClassName)}
              iconSize={iconSize}
            />
          )}
          <p className="h-6">{title}</p>
        </div>
      )}

      {/* رندر کردن فیلدهای فرزند در گرید سیستم فرم */}
      <div className="grid grid-cols-12 gap-x-8 gap-y-6 p-6">{children}</div>
    </div>
  );
}
