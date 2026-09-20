import { Cell, flexRender } from "@tanstack/react-table";

interface Props<TData> {
  cell: Cell<TData, unknown>;
}

export function DataTableCellRenderer<TData>({ cell }: Props<TData>) {
  const value = cell.getValue();

  const formatter = cell.column.columnDef.meta?.formatter;

  if (formatter) {
    return formatter(value, cell.row.original);
  }

  return flexRender(cell.column.columnDef.cell, cell.getContext());
}
