import { Row } from "@tanstack/react-table";
import React from "react";
import { Button } from "../ui/button";

interface ActionItemsProps<T> {
  row: Row<T>;
  onView?: (data: T) => void;
  onEdit?: (data: T) => void;
  onDelete?: (data: T) => void;
  otherActions?: { label: string; onClick: (data: T) => void }[];
}

export default function ActionItems<T>({
  row,
  onView,
  onDelete,
  onEdit,
  otherActions,
}: ActionItemsProps<T>) {
  return (
    <div className="flex flex-row items-center gap-2">
      {onEdit && (
        <Button
          variant={"edit"}
          size={"sm"}
          onClick={() => onEdit(row.original)}
        >
          ویرایش
        </Button>
      )}
      {onView && (
        <Button
          variant={"view"}
          size={"sm"}
          onClick={() => onView(row.original)}
        >
          نمایش
        </Button>
      )}
      {onDelete && (
        <Button
          variant={"delete"}
          size={"sm"}
          onClick={() => onDelete(row.original)}
        >
          حذف
        </Button>
      )}
      {otherActions?.map((action) => (
        <Button
          key={action.label}
          variant={"infoOutline"}
          size={"sm"}
          onClick={() => action.onClick(row.original)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
