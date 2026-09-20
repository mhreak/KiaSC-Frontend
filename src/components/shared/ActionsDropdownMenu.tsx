import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { Row } from "@tanstack/react-table";

interface Props<T> {
  row: Row<T>;
  onView?: (data: T) => void;
  onEdit?: (data: T) => void;
  onDelete?: (data: T) => void;
}

export default function ActionsDropdownMenu<T>({ row, onView, onEdit, onDelete }: Readonly<Props<T>>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="size-4" />
          </Button>
        }
      ></DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onView?.(row.original)}>
          مشاهده
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onEdit?.(row.original)}>
          ویرایش
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-destructive"
          onClick={() => onDelete?.(row.original)}
        >
          حذف
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
