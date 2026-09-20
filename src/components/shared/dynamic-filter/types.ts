// types/filters.ts

export type FilterFieldType =
  | "text"
  | "number"
  | "select"
  | "multiselect"
  | "date"
  | "date-range" // فیلتر بازه تاریخ
  | "switch";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterFieldConfig {
  id: string; // کلیدی که به سمت سرور فرستاده می‌شود (مثلا 'status' یا 'search')
  label: string; // عنوان فیلتر
  type: FilterFieldType;
  placeholder?: string;
  options?: FilterOption[]; // برای select و multiselect
  colSpan?: number; // چیدمان گرید (بین ۱ تا ۱۲)
  defaultValue?: any;
}

export type FilterConfig = FilterFieldConfig[];
