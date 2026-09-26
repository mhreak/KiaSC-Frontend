"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  RowSelectionState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableCellRenderer } from "./data-table-cell-renderer";
import { toPersianDigits } from "@/utils/numberConversions";
import Loader1 from "@/components/shared/loaders/Loader1/Loader1";
import { Button } from "../button";
import { RefreshCw } from "lucide-react";
import { APIMetaData } from "@/types/api/commonApiTypes";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  onPageChanged?: (currentPage: number) => void;
  onPageSizeChanged?: (currentPageSize: number) => void;

  selectionMode?: "none" | "single" | "multiple";
  onSelectionChange?: (rows: TData[]) => void;

  selectKey?: keyof TData;
  selectValue?: string | number | (string | number)[];

  isLoading?: boolean;
  onRefresh?: () => void;

  mode?: "base" | "modal" | "filter";
  paginationMeta?: APIMetaData | null;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onPageChanged,
  onPageSizeChanged,
  selectionMode = "none",
  onSelectionChange,
  selectKey,
  selectValue,
  isLoading = false,
  onRefresh,
  mode = "base",
  paginationMeta,
}: Readonly<DataTableProps<TData, TValue>>) {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  React.useEffect(() => {
    if (selectionMode === "none" || selectValue == null || !selectKey) {
      return;
    }

    const values = Array.isArray(selectValue) ? selectValue : [selectValue];

    const selectedRows: RowSelectionState = {};

    data.forEach((item) => {
      const value = item[selectKey];

      if (values.includes(value as string | number)) {
        selectedRows[String(value)] = true;
      }
    });

    setRowSelection(selectedRows);
  }, [data, selectKey, selectValue, selectionMode]);

  React.useEffect(() => {
    onSelectionChange?.(
      table.getSelectedRowModel().rows.map((r) => r.original),
    );
  }, [rowSelection]);

  const selectionColumn: ColumnDef<TData> = {
    id: "select",

    size: 50,

    header:
      selectionMode === "multiple"
        ? ({ table }) => (
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
          )
        : undefined,

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  };

  const finalColumns = React.useMemo(() => {
    if (selectionMode === "none") return columns;

    return [selectionColumn, ...columns];
  }, [columns, selectionMode]);

  const table = useReactTable({
    data,
    columns: finalColumns,

    getRowId: (row, index) => {
      if (selectKey) {
        return String(row[selectKey]);
      }

      return String(index);
    },

    state: {
      rowSelection,
    },

    onRowSelectionChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(rowSelection) : updater;

      if (selectionMode === "single") {
        const firstKey = Object.keys(next).find((key) => next[key]);

        setRowSelection(firstKey ? { [firstKey]: true } : {});
      } else {
        setRowSelection(next);
      }
    },

    enableRowSelection: selectionMode !== "none",
    enableMultiRowSelection: selectionMode === "multiple",

    getCoreRowModel: getCoreRowModel(),
  });

  const currentPage = paginationMeta?.page ?? 1;
  const totalPages = paginationMeta?.totalPages ?? 1;

  // تولید شماره صفحه‌ها به صورت هوشمند همراه با نقطه‌چین (...)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis-start");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis-end");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const getTableHeight = (): string => {
    switch (mode) {
      case "base":
        return "calc(100vh - 204px)";

      case "filter":
        return "calc(100vh - 274px)";

      default:
        return "500px";
    }
  };

  return (
    <div
      className="rounded-xl border min-h-150 flex flex-col"
      style={{
        height: getTableHeight(),
      }}
    >
      {/* بخش جدول با ارتفاع ثابت و اسکرول داخلی */}
      <div className="relative flex-1 overflow-auto rounded-xl">
        <Table>
          <TableHeader className="font-extrabold h-12 bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="rounded-2xl">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      textAlign: "right",
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!isLoading &&
              table.getRowModel().rows?.length > 0 &&
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    if (selectionMode === "single") {
                      table.resetRowSelection();
                    }

                    row.toggleSelected();
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                        paddingRight: "8px",
                      }}
                    >
                      <DataTableCellRenderer cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
            <Loader1 />
          </div>
        )}
        {table.getRowModel().rows?.length === 0 && !isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px] text-2xl">
            <span> موردی یافت نشد!</span>
          </div>
        )}
      </div>

      {/* بخش ناوبری و تغییر تعداد ردیف‌ها با استایل ثابت در پایین */}
      <div
        className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between px-4 py-3 border-t bg-muted/20"
        dir="rtl"
      >
        {/* انتخاب تعداد ردیف‌ها در هر صفحه */}
        <div className="flex items-center gap-2">
          <p className="text-xs font-medium text-muted-foreground">
            تعداد ردیف‌ها در هر صفحه
          </p>
          <Select
            value={`${paginationMeta?.pageSize ?? 20}`}
            onValueChange={(value) => {
              const newPageSize = Number(value);

              onPageSizeChanged?.(newPageSize);
            }}
          >
            <SelectTrigger className="h-8 w-17.5" size="sm">
              <SelectValue
                placeholder={toPersianDigits(paginationMeta?.pageSize ?? 20)}
              >
                {toPersianDigits(paginationMeta?.pageSize ?? 20)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {toPersianDigits(pageSize)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* کامپوننت صفحه‌بندی Shadcn UI */}
        <div className="flex items-center justify-center gap-4">
          <Pagination className="w-auto m-0">
            <PaginationContent className="gap-1">
              {/* دکمه صفحه قبلی */}
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();

                    if (!paginationMeta?.hasPrevious) return;

                    onPageChanged?.(currentPage - 1);
                  }}
                  className={
                    !paginationMeta?.hasPrevious
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                  text="قبلی"
                />
              </PaginationItem>

              {/* شماره صفحه‌ها و نقطه‌چین‌ها */}
              {getPageNumbers().map((page, index) => {
                if (page === "ellipsis-start" || page === "ellipsis-end") {
                  return (
                    <PaginationItem key={`ellipsis-${index + 1}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                const pageNum = page as number;
                return (
                  <PaginationItem key={`page-${pageNum}`}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === pageNum}
                      onClick={(e) => {
                        e.preventDefault();

                        if (pageNum === currentPage) return;

                        onPageChanged?.(pageNum);
                      }}
                    >
                      {toPersianDigits(pageNum)}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {/* دکمه صفحه بعدی */}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();

                    if (!paginationMeta?.hasNext) return;

                    onPageChanged?.(currentPage + 1);
                  }}
                  className={
                    !paginationMeta?.hasNext
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                  text="بعدی"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <div className="flex items-center gap-3">
          <Button variant={"outline"} size={"icon"} onClick={onRefresh}>
            <RefreshCw className="size-5 text-gray-600" />
          </Button>
          <div className="text-xs font-medium text-muted-foreground whitespace-nowrap">
            صفحه {toPersianDigits(currentPage)} از{" "}
            {toPersianDigits(totalPages || 1)}
          </div>
        </div>
      </div>
    </div>
  );
}
