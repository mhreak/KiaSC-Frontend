import * as z from "zod";
import { FieldType } from "../types";
import validateNationalCode from "@/utils/utillityFunctions";

export type ValidatorFactory = (
  required: boolean,
  label: string,
  pattern?: string,
  errorMessage?: string,
) => z.ZodTypeAny;

export const validators: Partial<Record<FieldType, ValidatorFactory>> = {
  text: (required, label, pattern, errorMessage) => {
    let schema = z.string();

    if (pattern) {
      schema = schema.regex(new RegExp(pattern), {
        message: errorMessage ?? "فرمت وارد شده صحیح نیست",
      });
    }

    return required
      ? schema.min(1, { message: `${label} الزامی است` })
      : schema.optional().or(z.literal("")).or(z.null());
  },

  textarea: (required, label, pattern, errorMessage) => {
    let schema = z.string();

    if (pattern) {
      schema = schema.regex(new RegExp(pattern), {
        message: errorMessage ?? "فرمت وارد شده صحیح نیست",
      });
    }

    return required
      ? schema.min(1, { message: `${label} الزامی است` })
      : schema.optional().or(z.literal("")).or(z.null());
  },

  email: (required, label) => {
    const schema = z.email({
      message: "فرمت ایمیل معتبر نیست",
    });

    return required ? schema : schema.optional().or(z.literal("")).or(z.null());
  },

  password: (required, label) => {
    const schema = z.string();

    return required
      ? schema.min(1, { message: `${label} الزامی است` })
      : schema.optional().or(z.literal("")).or(z.null());
  },

  number: (required, label) => {
    const schema = z.coerce.number({
      message: "لطفاً عدد معتبر وارد کنید",
    });

    return required
      ? schema.min(1, {
          message: `${label} باید بزرگتر از صفر باشد`,
        })
      : schema.optional().or(z.null());
  },

  checkbox: () => z.boolean().default(false),

  multiselect: (required, label) => {
    const schema = z.array(z.string());

    return required
      ? schema.min(1, {
          message: `حداقل یک مورد برای ${label} انتخاب کنید`,
        })
      : schema.default([]);
  },

  file: (required, label) =>
    required
      ? z.any().refine((file) => file != null, {
          message: `بارگذاری ${label} الزامی است`,
        })
      : z.any().optional(),

  image: (required, label) =>
    required
      ? z.any().refine((file) => file != null, {
          message: `بارگذاری ${label} الزامی است`,
        })
      : z.any().optional(),

  mobile: (required, label) => {
    const schema = z.string().regex(/^09\d{9}$/, {
      message:
        "شماره موبایل وارد شده معتبر نیست (باید با ۰۹ شروع شده و ۱۱ رقم باشد).",
    });

    return required
      ? schema.min(1, { message: `${label} الزامی است` })
      : schema.optional().or(z.literal("")).or(z.null());
  },

  nationalcode: (required, label) => {
    const schema = z.string().refine(validateNationalCode, {
      message: "کد ملی معتبر نیست",
    });

    return required
      ? schema.min(1, { message: `${label} الزامی است` })
      : schema.optional().or(z.literal("")).or(z.null());
  },
  postalcode: () =>
    z.string().length(10, { message: "کد پستی باید ۱۰ رقم باشد." }),
};
