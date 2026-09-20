// types/form-builder.ts

export type FieldType =
  | "text"
  | "number"
  | "amount"
  | "nationalcode"
  | "mobile"
  | "select"
  | "checkbox"
  | "switch"
  | "textarea"
  | "array"
  | "email" // جدید
  | "password" // جدید
  | "multiselect" // جدید
  | "radio" // جدید
  | "date" // جدید
  | "datetime" // جدید
  | "time" // جدید
  | "file" // جدید
  | "image"
  | "postalcode"
  | "customerSearch";
export type LayoutType = "grid" | "section" | "tabs" | "accordion";
export interface FieldValidation {
  pattern?: string; // الگوی ریجکس به صورت رشته (مثلا "^09\\d{9}$")
  errorMessage?: string; // پیغام خطای دلخواه در صورت عدم تطابق
}

export interface BaseFieldConfig {
  id: string; // شناسه منحصر به فرد فیلد (مثلا firstName)
  type: FieldType; // نوع فیلد
  label: string; // برچسب فیلد
  placeholder?: string;
  description?: string; // توضیحات زیر فیلد
  defaultValue?: any;

  // حالا این پراپ‌ها می‌توانند یا یک مقدار ثابت باشند یا تابعی که به کل فرم دسترسی دارد
  visible?: boolean | ((formValues: Record<string, any>) => boolean);
  disabled?: boolean | ((formValues: Record<string, any>) => boolean);
  readonly?: boolean | ((formValues: Record<string, any>) => boolean);
  required?: boolean | ((formValues: Record<string, any>) => boolean);

  // فیلد محاسباتی تابعی است که مقدار جدید را برمی‌گرداند
  computedValue?: (formValues: Record<string, any>) => any;

  // گزینه‌ها برای فیلدهایی مثل Select
  options?: { label: string; value: string }[];

  // سیستم چیدمان (مثلا این فیلد چقدر از گرید را بگیرد)
  colSpan?: number;

  fields?: BaseFieldConfig[];
  multiple?: boolean;
  validation?: FieldValidation;

  isRial?: boolean;
  maxLength?: number;

}

// ساختار جدید برای چیدمان‌ها
export interface LayoutConfig {
  id: string;
  type: LayoutType;
  label?: string; // برای نمایش در UI
  title?: string; // برای عنوان Section یا Accordion
  visible?: boolean;

  // برای سیستم تب‌ها یا آکاردئون‌های چندتایی
  items?: {
    id: string;
    label: string;
    children: FormNode[];
  }[];

  // برای گرید یا بخش‌های ساده
  children?: FormNode[];
  icon?: string;
  iconSize?: number; // اندازه آیکون به صورت عددی (px)
  wrapperVariant?: "default" | "card" | "bordered" | "gradient" | "dangerZone";
  customWrapperClassName?: string; // برای مواقعی که می‌خواهیم مستقیماً کلاس Tailwind پاس بدهیم
  sectionColSpan?: number;
  headerClassName?: string;
}

// یک نود در فرم می‌تواند فیلد باشد یا خودش یک چیدمان باشد (ساختار درختی)
export type FormNode = BaseFieldConfig | LayoutConfig;

export type FormConfig = FormNode[];

// تابع کمکی برای تشخیص نوع نود در کدهای تایپ اسکریپت
export function isLayoutConfig(node: FormNode): node is LayoutConfig {
  return ["grid", "section", "tabs", "accordion"].includes(node.type);
}
