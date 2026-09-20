"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  PaginationState,
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  onPageChanged?: (currentPage: number) => void;
  onPageSizeChanged?: (currentPageSize: number) => void;

  selectionMode?: "none" | "single" | "multiple";
  onSelectionChange?: (rows: TData[]) => void;

  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onPageChanged,
  onPageSizeChanged,
  selectionMode = "none",
  onSelectionChange,
  isLoading = false,
}: Readonly<DataTableProps<TData, TValue>>) {
  // مدیریت استیت لوکال برای صفحه‌بندی
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  React.useEffect(() => {
    onPageChanged?.(pagination.pageIndex + 1);
  }, [pagination.pageIndex]);

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

    state: {
      pagination,
      rowSelection,
    },

    onPaginationChange: setPagination,
    onRowSelectionChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(rowSelection) : updater;

      if (selectionMode === "single") {
        const firstKey = Object.keys(next).find((k) => next[k]);

        setRowSelection(firstKey ? { [firstKey]: true } : {});
      } else {
        setRowSelection(next);
      }
    },

    enableRowSelection: selectionMode !== "none",

    enableMultiRowSelection: selectionMode === "multiple",

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const currentPage = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();

  // تولید شماره صفحه‌ها به صورت هوشمند همراه با نقطه‌چین (...)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      // همیشه صفحه اول را نشان بده
      pages.push(0);

      if (currentPage > 2) {
        pages.push("ellipsis-start");
      }

      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPages - 2, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push("ellipsis-end");
      }

      // همیشه صفحه آخر را نشان بده
      pages.push(totalPages - 1);
    }

    return pages;
  };

  return (
    <div className="rounded-xl border h-150 flex flex-col">
      {/* بخش جدول با ارتفاع ثابت و اسکرول داخلی */}
      <div className="relative flex-1 overflow-auto rounded-xl">
        <Table>
          <TableHeader className="font-extrabold bg-secondary/30 h-12">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="rounded-2xl">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{
                      width: header.getSize(),
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
            {!isLoading && table.getRowModel().rows?.length
              ? table.getRowModel().rows.map((row) => (
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
                        }}
                      >
                        <DataTableCellRenderer cell={cell} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : !isLoading && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-full text-center"
                    >
                      موردی یافت نشد!
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
            <Loader1 />
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
            value={`${toPersianDigits(table.getState().pagination.pageSize)}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              onPageSizeChanged?.(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-17.5" size="sm">
              <SelectValue
                placeholder={toPersianDigits(
                  table.getState().pagination.pageSize,
                )}
              />
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
                    if (table.getCanPreviousPage()) {
                      table.previousPage();
                    }
                  }}
                  className={
                    !table.getCanPreviousPage()
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
                        table.setPageIndex(pageNum);
                      }}
                    >
                      {toPersianDigits(pageNum + 1)}
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
                    if (table.getCanNextPage()) {
                      table.nextPage();
                    }
                  }}
                  className={
                    !table.getCanNextPage()
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                  text="بعدی"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <div className="text-xs font-medium text-muted-foreground whitespace-nowrap">
          صفحه {toPersianDigits(currentPage + 1)} از{" "}
          {toPersianDigits(totalPages || 1)}
        </div>
      </div>
    </div>
  );
}
