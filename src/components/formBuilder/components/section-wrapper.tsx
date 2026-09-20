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
    bordered: "space-y-4 mt-8",
    gradient:
      "bg-gradient-to-br from-muted/50 to-background rounded-xl border p-6 space-y-4 shadow-inner",
    dangerZone:
      "border-2 border-destructive/30 bg-destructive/5 rounded-xl p-6 space-y-4",
  };

  const titleStyles = {
    default: "text-lg font-bold tracking-tight text-foreground",
    card: "text-xl font-semibold border-b pb-2 text-primary",
    bordered: "text-2xl font-medium text-text px-2 bg-transparent w-fit", // افکت هدر روی خط
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
        <div className="flex items-center gap-3">
          <div
            className={cn(
              titleStyles[variant],
              "flex items-center gap-2 rounded-t-xl p-6 pr-0 py-3",
              headerClassName,
            )}
          >
            {variant === "dangerZone" && <span>⚠️</span>}
            {icon && (
              <div className="size-10 rounded-full bg-primary flex justify-center items-center">
                <DynamicIcon
                  name={icon}
                  className="shrink-0 text-primary-foreground text-4xl"
                  iconSize={iconSize}
                />
              </div>
            )}
            {title}
          </div>
          {variant === "bordered" && (
            <div className="h-px flex-1 bg-border" />
          )}
        </div>
      )}
      {/* رندر کردن فیلدهای فرزند در گرید سیستم فرم */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-x-16 gap-y-8">{children}</div>
    </div>
  );
}
