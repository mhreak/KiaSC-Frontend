"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

export interface ImageSelectItem {
  id: number;
  title: string;
  imagePath: string;
  imageClassName?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageContainerClassName?: string;
}

// Single Select
interface SingleSelectProps {
  items: ImageSelectItem[];
  selectionMode?: "single";
  selectedId?: number;
  onSelect: (id: number) => void;
  className?: string;
  imageClassName?: string;
  headerText?: string;
}

// Multi Select
interface MultiSelectProps {
  items: ImageSelectItem[];
  selectionMode: "multiple";
  selectedIds?: number[];
  onSelect: (ids: number[]) => void;
  className?: string;
  imageClassName?: string;
  headerText?: string;
}

type Props = SingleSelectProps | MultiSelectProps;

export default function ImageSelect(props: Props) {
  const { items, className, imageClassName, headerText } = props;

  const handleSelect = (id: number) => {
    // Single Select
    if (props.selectionMode !== "multiple") {
      props.onSelect(id);
      return;
    }

    // Multiple Select
    const selectedIds = props.selectedIds ?? [];

    const isSelected = selectedIds.includes(id);

    const newSelectedIds = isSelected
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];

    props.onSelect(newSelectedIds);
  };

  const isSelected = (id: number) => {
    // Single Select
    if (props.selectionMode !== "multiple") {
      return props.selectedId === id;
    }

    // Multiple Select
    return props.selectedIds?.includes(id) ?? false;
  };

  return (
    <>
      {headerText && (
        <h3 className="mb-2 text-right text-xl font-semibold">{headerText}</h3>
      )}

      <div
        className={cn(
          "flex flex-row gap-5 overflow-x-auto hide-scrollbar pt-8",
          className,
        )}
      >
        {items.map((item) => {
          const selected = isSelected(item.id);

          return (
            <div className={cn("mx-2 flex flex-col gap-4")} key={item.id}>
              <div
                className={cn(
                  "relative size-18 cursor-pointer overflow-visible rounded-lg bg-gradient transition-all duration-200",
                  selected
                    ? "scale-110 ring-2 ring-primary ring-offset-2"
                    : "hover:scale-105",
                  item.imageContainerClassName,
                )}
                onClick={() => handleSelect(item.id)}
              >
                <Image
                  src={item.imagePath}
                  alt={item.title}
                  width={item.imageWidth ?? 64}
                  height={item.imageHeight ?? 64}
                  className={cn(
                    "absolute bottom-1.5 left-0 scale-150 object-contain",
                    imageClassName,
                    item.imageClassName,
                  )}
                />
              </div>

              <span className="text-md text-muted-foreground">
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
