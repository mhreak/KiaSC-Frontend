"use client";

import BackButton from "@/components/shared/BackButton";
import { cn } from "@/lib/utils";
import React from "react";

interface SharedProfileHeaderProps {
  title: string;
  description?: string;
  actionButton?: React.ReactNode;
  className?: string;
}

export default function SharedPageHeader({
  title,
  description,
  actionButton,
  className,
}: SharedProfileHeaderProps) {
  return (
    <div
      className={cn("flex flex-row justify-start items-center mb-5", className)}
    >
      <BackButton />
      <div className="flex-1">
        <h3 className="flex-1 font-semibold text-xl text-center">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground text-center mt-2">
            {description}
          </p>
        )}
      </div>
      {actionButton}
    </div>
  );
}
