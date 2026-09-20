"use client";

import { cn } from "@/lib/utils";
import React from "react";

export interface BadgeSelectItem {
  id: number | string;
  title: string;
}

interface SingleSelectProps {
  items: BadgeSelectItem[];
  selectionMode?: "single";
  selectedId?: number | string;
  onSelect: (id: number | string) => void;
}

interface MultiSelectProps {
  items: BadgeSelectItem[];
  selectionMode: "multiple";
  selectedIds?: (number | string)[];
  onSelect: (ids: (number | string)[]) => void;
}

type Props = SingleSelectProps | MultiSelectProps;

export default function BadgeSelect(props: Props) {
  const { items } = props;

  const handleSelect = (id: number | string) => {
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

  const isSelected = (id: number | string) => {
    // Single Select
    if (props.selectionMode !== "multiple") {
      return props.selectedId === id;
    }

    // Multiple Select
    return props.selectedIds?.includes(id) ?? false;
  };

  return (
    <div className="flex flex-row gap-5 overflow-x-auto hide-scrollbar">
      {items.map((item) => {
        const selected = isSelected(item.id);

        return (
          <div
            key={item.id}
            onClick={() => handleSelect(item.id)}
            className={cn(
              "cursor-pointer whitespace-nowrap rounded-3xl border border-select-border px-4 py-2 text-sm",
              "transition-all duration-300 ease-in-out",
              selected
                ? "bg-select-foreground text-select"
                : "bg-select text-select-foreground",
            )}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
}
