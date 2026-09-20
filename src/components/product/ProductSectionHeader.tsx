import * as React from "react";
import { Link } from "next-view-transitions";
import { ChevronLeft } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const headerVariants = cva("flex justify-between ", {
  variants: {
    variant: {
      default: "items-end",
      contained: "rounded-xl border bg-card p-6",
      centered: "items-center",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const titleVariants = cva("font-semibold", {
  variants: {
    variant: {
      default: "text-xl",
      contained: "text-primary-foreground text-2xl",
      hero: "text-3xl",
      compact: "text-lg",
      muted: "text-xl text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const descriptionVariants = cva("", {
  variants: {
    variant: {
      default: "text-sm text-muted-foreground",
      hero: "text-base text-muted-foreground",
      compact: "text-xs text-muted-foreground",
      hidden: "hidden",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const linkVariants = cva("flex items-center gap-1 p-0", {
  variants: {
    variant: {
      default: "text-link text-sm",
      contained: "text-primary-foreground",
      primary: "text-primary",
      muted: "text-muted-foreground",
      hidden: "hidden",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ProductSectionHeaderProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headerVariants> {
  title: string;
  description?: string;
  link?: string;
  linkLabel?: string;

  titleVariant?: VariantProps<typeof titleVariants>["variant"];
  descriptionVariant?: VariantProps<typeof descriptionVariants>["variant"];
  linkVariant?: VariantProps<typeof linkVariants>["variant"];
}

const ProductSectionHeader = React.forwardRef<
  HTMLDivElement,
  ProductSectionHeaderProps
>(
  (
    {
      className,
      variant,

      title,
      description,
      link,
      linkLabel = "دیدن همه",

      titleVariant,
      descriptionVariant,
      linkVariant,

      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(headerVariants({ variant }), className)}
        {...props}
      >
        <div className="flex flex-col">
          <h3 className={cn(titleVariants({ variant: titleVariant }))}>
            {title}
          </h3>

          {description && (
            <p
              className={cn(
                descriptionVariants({ variant: descriptionVariant }),
              )}
            >
              {description}
            </p>
          )}
        </div>

        {link && (
          <Link href={link}>
            <Button
              variant="link"
              className={cn(linkVariants({ variant: linkVariant }))}
            >
              <span>{linkLabel}</span>
              <ChevronLeft className="size-4" />
            </Button>
          </Link>
        )}
      </div>
    );
  },
);

ProductSectionHeader.displayName = "ProductSectionHeader";

export {
  ProductSectionHeader,
  headerVariants,
  titleVariants,
  descriptionVariants,
  linkVariants,
};
