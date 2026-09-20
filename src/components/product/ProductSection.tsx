import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const productSectionVariants = cva("flex flex-col gap-5", {
  variants: {
    variant: {
      default: "",
      contained: "h-fit rounded-xl border bg-card bg-gradient p-5",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ProductSectionProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof productSectionVariants> {}

const ProductSection = React.forwardRef<HTMLDivElement, ProductSectionProps>(
  ({ className, variant, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(productSectionVariants({ variant }), className)}
      {...props}
    />
  ),
);

ProductSection.displayName = "ProductSection";

export { ProductSection, productSectionVariants };
