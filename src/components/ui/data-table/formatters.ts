// formatters.ts

import { toPersianDigits } from "@/utils/numberConversions";

export const numberFormatter = (value: unknown) => {
  return toPersianDigits(String(value));
};

export const currencyFormatter = (value: unknown) => {
  return `${toPersianDigits(Number(value).toLocaleString("fa-IR"))} تومان`;
};

export const phoneFormatter = (value: unknown) => {
  return toPersianDigits(String(value));
};

export const nationalCodeFormatter = (value: unknown) => {
  return toPersianDigits(String(value));
};

export const percentFormatter = (value: unknown) => {
  return `${toPersianDigits(String(value))}٪`;
};

export const dateFormatter = (value: unknown) => {
  return value
}


