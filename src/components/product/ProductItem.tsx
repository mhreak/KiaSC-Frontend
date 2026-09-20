import * as React from "react";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Heart, Star, Zap } from "lucide-react";
import { toPersianDigits } from "@/utils/numberConversions";
import { Link } from "next-view-transitions";

const productItemVariants = cva(
  "relative flex flex-col items-center active:scale-95 transition-default",
  {
    variants: {
      variant: {
        default: "min-w-fit",
        bordered: "rounded-2xl border p-4",
        card: "rounded-2xl bg-card p-3 shadow-sm w-full",
        animate: "animate-slide-right",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const imageVariants = cva("rounded-2xl object-cover", {
  variants: {
    variant: {
      default: "",
      rounded: "rounded-3xl",
      square: "rounded-none",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const titleVariants = cva("mt-3 font-semibold", {
  variants: {
    variant: {
      default: "text-base text-text",
      large: "text-lg text-text",
      muted: "text-base text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const discountedPriceVariants = cva("", {
  variants: {
    variant: {
      default: "text-xs text-muted-foreground line-through",
      visible: "text-xs text-muted-foreground line-through",
      hidden: "hidden",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const priceVariants = cva("font-semibold", {
  variants: {
    variant: {
      default: "text-gradient",
      primary: "text-primary",
      accent: "text-accent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const badgeVariants = cva(
  "absolute top-3 right-3 flex h-6 min-w-8 items-center justify-center rounded-md px-2 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "bg-destructive text-destructive-foreground",
        special: "bg-card",
        like: "rounded-full bg-card size-12 top-3 right-3",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        gradient: "bg-gradient text-primary-foreground",
        outline: "border border-border bg-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface ProductItemProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof productItemVariants> {
  productId?: number;
  imageSrc: string;
  title: string;
  discountedPrice?: string | number;
  price?: string | number;
  discountPercent?: string | number;
  storeName?: string;
  rating?: string;

  imageVariant?: VariantProps<typeof imageVariants>["variant"];
  titleVariant?: VariantProps<typeof titleVariants>["variant"];
  discountedPriceVariant?: VariantProps<
    typeof discountedPriceVariants
  >["variant"];
  priceVariant?: VariantProps<typeof priceVariants>["variant"];
  badgeVariant?: VariantProps<typeof badgeVariants>["variant"];

  imageClassName?: string;
  titleClassName?: string;
  discountedPriceClassName?: string;
  priceClassName?: string;
  badgeClassName?: string;
  storeNameClassName?: string;
  ratingClassName?: string;

  imageWidth?: number;
  imageHeight?: number;

  onLike?: (isLiked: boolean) => void;
  isLiked?: boolean;
}

const ProductItem = React.forwardRef<HTMLDivElement, ProductItemProps>(
  (
    {
      className,
      variant,

      productId,
      imageSrc,
      title,
      discountedPrice,
      price,
      storeName,
      rating,

      imageVariant,
      titleVariant,
      discountedPriceVariant,
      priceVariant,

      imageClassName,
      titleClassName,
      discountedPriceClassName,
      priceClassName,
      storeNameClassName,
      ratingClassName,

      imageWidth = 155,
      imageHeight = 155,

      discountPercent,
      badgeVariant,
      badgeClassName,

      onLike,
      isLiked,

      ...props
    },
    ref,
  ) => {
    return (
      <Link href={`/product/${productId}`}>
        <div
          ref={ref}
          className={cn(productItemVariants({ variant }), className)}
          {...props}
        >
          <div className="relative w-full aspect-square">
            <Image
              src={imageSrc}
              alt={title}
              // width={imageWidth}
              // height={imageHeight}
              fill
              className={cn(
                imageVariants({ variant: imageVariant }),
                imageClassName,
              )}
            />
            {badgeVariant === "like" && (
              <span
                className={cn(
                  badgeVariants({ variant: badgeVariant }),
                  badgeClassName,
                )}
                onClick={(e) => {
                  e.preventDefault();
                  onLike?.(true);
                }}
              >
                {
                  <Heart
                    className="text-rose-500 transition-all duration-300"
                    fill={isLiked ? "currentColor" : "var(--color-background)"}
                  />
                }
              </span>
            )}
          </div>

          {discountPercent && (
            <span
              className={cn(
                badgeVariants({ variant: badgeVariant }),
                badgeClassName,
              )}
            >
              {badgeVariant === "special" && (
                <Zap className="text-emerald-500 ml-1" size={15} />
              )}

              {`${toPersianDigits(discountPercent)}${badgeVariant === "default" ? "% -" : ""}`}
            </span>
          )}

          <p
            className={cn(
              titleVariants({ variant: titleVariant }),
              titleClassName,
            )}
          >
            {title}
          </p>

          {storeName && (
            <p className="text-muted-foreground text-sm">{storeName}</p>
          )}

          <div className="mt-1 flex items-center gap-2">
            {discountedPrice && (
              <span
                className={cn(
                  discountedPriceVariants({
                    variant: discountedPriceVariant,
                  }),
                  discountedPriceClassName,
                )}
              >
                {toPersianDigits(Number(discountedPrice).toLocaleString())}{" "}
                {"تومان"}
              </span>
            )}

            {price && (
              <span
                className={cn(
                  priceVariants({ variant: priceVariant }),
                  priceClassName,
                )}
              >
                {toPersianDigits(Number(price).toLocaleString())} {"تومان"}
              </span>
            )}
          </div>
          {rating && (
            <div
              className={cn(
                "flex flex-row justify-start gap-2",
                ratingClassName,
              )}
            >
              <Star fill="currentColor" className="text-yellow-400" size={14} />
              <p className="text-text font-semibold">{rating}</p>
            </div>
          )}
        </div>
      </Link>
    );
  },
);

ProductItem.displayName = "ProductItem";

export {
  ProductItem,
  productItemVariants,
  imageVariants,
  titleVariants,
  discountedPriceVariants,
  priceVariants,
  badgeVariants,
};
