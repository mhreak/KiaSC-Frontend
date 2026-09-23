import {
  BaseFieldConfig,
  FieldOption,
  FormConfig,
  isLayoutConfig,
} from "@/components/formBuilder/types";
import { toEnglishDigits } from "./numberConversions";

export default function validateNationalCode(
  code: number | string,
): boolean | undefined {
  const eCode = toEnglishDigits(code);

  if (eCode === undefined) return undefined;
  if (eCode.length !== 10) return false;

  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += Number(eCode[i]) * (10 - i);
  }

  const remainder = sum % 11;
  const checkDigit = Number(eCode[9]);

  return remainder < 2
    ? checkDigit === remainder
    : checkDigit === 11 - remainder;
}

export type FormFieldOptions = Record<string, FieldOption[]>;

export interface GenerateFormConfigOptions<T> {
  values?: T;
  readonlyFields?: string[];
  disabledFields?: string[];
  hiddenFields?: string[];
  visibleFields?: string[];
  options?: Record<string, FieldOption[]>;
  fieldProps?: Record<string, Partial<BaseFieldConfig>>;
}

export function generateFormConfig<T extends Record<string, any>>(
  config: FormConfig,
  {
    values,
    readonlyFields = [],
    disabledFields = [],
    hiddenFields = [],
    visibleFields = [],
    options = {},
    fieldProps = {},
  }: GenerateFormConfigOptions<T>,
): FormConfig {
  const transformField = (field: BaseFieldConfig): BaseFieldConfig => {
    const transformedField: BaseFieldConfig = {
      ...field,
      ...(values !== undefined && {
        defaultValue: values[field.id],
      }),
      ...(fieldProps[field.id] ?? {}),
    };

    if (readonlyFields.includes(field.id)) {
      transformedField.readonly = true;
    }

    if (disabledFields.includes(field.id)) {
      transformedField.disabled = true;
    }

    if (hiddenFields.includes(field.id)) {
      transformedField.visible = false;
    }

    if (visibleFields.includes(field.id)) {
      transformedField.visible = true;
    }

    // پر کردن options برای select و multiselect
    if (
      (field.type === "select" || field.type === "multiselect") &&
      options[field.id]
    ) {
      transformedField.options = options[field.id];
    }

    return transformedField;
  };

  return config.map((item) => {
    // اگر Field باشد
    if (!isLayoutConfig(item)) {
      return transformField(item);
    }

    // اگر Layout باشد
    return {
      ...item,

      // برای section و grid
      children: item.children?.map(transformField),

      // برای tabs و accordion
      items: item.items?.map((tab) => ({
        ...tab,
        children: tab.children.map((child) => {
          if (isLayoutConfig(child)) {
            return child;
          }

          return transformField(child);
        }),
      })),
    };
  });
}

export function toFieldOptions<T>(
  data: T[],
  labelKey: keyof T,
  valueKey: keyof T,
): FieldOption[] {
  return data.map((item) => ({
    label: String(item[labelKey]),
    value: item[valueKey] as string | number,
  }));
}

import { toJalaali } from "jalaali-js";
import {
  FilterConfig,
  FilterFieldConfig,
  FilterOption,
} from "@/components/filterFormBuilder/types";
import { ExistingFile } from "@/components/ui/file-upload";

export function toJalaliDate(
  date: string | null | undefined,
): string | undefined {
  if (!date) return undefined;

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    console.warn("Invalid date:", date);
    return undefined;
  }

  const gy = parsedDate.getFullYear();
  const gm = parsedDate.getMonth() + 1;
  const gd = parsedDate.getDate();

  try {
    const { jy, jm, jd } = toJalaali(gy, gm, gd);

    return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
  } catch (error) {
    console.warn("Failed to convert date to Jalaali:", {
      date,
      gy,
      gm,
      gd,
      error,
    });

    return undefined;
  }
}

export interface GenerateFilterConfigOptions {
  values?: Record<string, any>;
  options?: Record<string, FieldOption[]>;
}

export function generateFilterConfig(
  config: FilterConfig,
  { values, options = {} }: GenerateFilterConfigOptions = {},
): FilterConfig {
  return config.map((field) => ({
    ...field,

    // مقدار اولیه در حالت edit / مقداردهی اولیه
    ...(values && {
      defaultValue: values[field.id],
    }),

    // options جدید برای select و multiselect
    ...((field.type === "select" || field.type === "multiselect") &&
      options[field.id] && {
        options: options[field.id],
      }),
  }));
}

export function handleDownloadFile(
  data: Blob,
  downloadFileName: string = "downloaded-file.xls",
  blobType: string = "application/vnd.ms-excel",
) {
  const blob = new Blob([data], {
    type: blobType,
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;

  a.download = downloadFileName;

  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

export const handleDownload = async (file: ExistingFile) => {
  try {
    const params = new URLSearchParams({
      path: file.url,
      name: file.fileName,
    });

    const response = await fetch(`/api/download?${params.toString()}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      console.error("Download API error:", errorData);

      throw new Error(
        errorData?.backendResponse ||
          errorData?.message ||
          `Download failed with status ${response.status}`,
      );
    }

    const blob = await response.blob();

    handleDownloadFile(blob, file.fileName, getMimeType(file.extension));
  } catch (error) {
    console.error("Download error:", error);
  }
};

const getMimeType = (extension: string) => {
  const ext = extension.toLowerCase().replace(".", "");

  const mimeTypes: Record<string, string> = {
    pdf: "application/pdf",

    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    csv: "text/csv",

    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",

    txt: "text/plain",

    zip: "application/zip",
    rar: "application/vnd.rar",
    "7z": "application/x-7z-compressed",

    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    bmp: "image/bmp",
  };

  return mimeTypes[ext] ?? "application/octet-stream";
};
