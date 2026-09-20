import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const SectionContentVariants = cva("", {
  variants: {
    variant: {
      default: "flex gap-8",
      scroll:
        "flex gap-5 overflow-x-auto hide-scrollbar show-scrollbar lg:pb-4",
      grid: "grid grid-cols-2 md:grid-cols-4 gap-6",
      wrap: "flex flex-wrap gap-6",
    },
  },
  defaultVariants: {
    variant: "scroll",
  },
});

export interface SectionContentProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof SectionContentVariants> {}

const SectionContent = React.forwardRef<HTMLDivElement, SectionContentProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(SectionContentVariants({ variant }), className)}
      {...props}
    />
  ),
);

SectionContent.displayName = "SectionContent";

export { SectionContent, SectionContentVariants };
