export type DataTableFormatter<TData = unknown> = (
  value: unknown,
  row: TData,
) => React.ReactNode;
