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
  amount: (required, label) => {
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

  select: (required, label) => {
    const schema = z.union([z.string(), z.number()]);

    return required
      ? schema.refine(
          (value) => value !== "" && value !== null && value !== undefined,
          {
            message: `${label} انتخاب نشده است`,
          },
        )
      : schema.optional().or(z.literal("")).or(z.null());
  },

  multiselect: (required, label) => {
    const schema = z.array(z.union([z.string(), z.number()]));

    if (required) {
      return schema.min(1, {
        message: `حداقل یک مورد برای ${label} انتخاب کنید`,
      });
    }

    return schema;
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
  phone: (required, label) => {
    const schema = z.string().regex(/^\d{11}$/, {
      message: "شماره تلفن وارد شده معتبر نیست (باید ۱۱ رقم باشد).",
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
  postalcode: (required, label) => {
    const schema = z.string();

    return required
      ? schema
          .min(1, {
            message: `${label} الزامی است`,
          })
          .length(10, {
            message: "کد پستی باید ۱۰ رقم باشد.",
          })
      : schema.refine((value) => value === "" || value.length === 10, {
          message: "کد پستی باید ۱۰ رقم باشد.",
        });
  },

  switch: () => z.boolean().default(true),
};
