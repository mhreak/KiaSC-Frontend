// table-meta.ts

import { RowData } from "@tanstack/react-table";
import { DataTableFormatter } from "./types";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    formatter?: DataTableFormatter<TData>;
  }
}
