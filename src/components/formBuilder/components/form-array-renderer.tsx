// components/form-builder/form-array-renderer.tsx
"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { BaseFieldConfig } from "../types";
import { FormFieldRenderer } from "./form-field-renderer";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

interface FormArrayRendererProps {
  field: BaseFieldConfig;
  parentName?: string; // برای پشتیبانی از آرایه‌های تودرتو (Nested)
}

export function FormArrayRenderer({
  field,
  parentName,
}: Readonly<FormArrayRendererProps>) {
  const { control } = useFormContext();

  // ۱. ساخت نام دقیق فیلد در روت فرم (اگر تودرتو باشد نام پدر را هم اضافه می‌کند)
  const fieldName = parentName ? `${parentName}.${field.id}` : field.id;

  // ۲. راه‌اندازی ابزار جادویی useFieldArray
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: fieldName,
  });

  // ساخت یک آبجکت خالی بر اساس دیفالت‌ولیوهای فیلدهای فرزند برای استفاده در Append
  const createEmptyRow = () => {
    return (field.fields ?? []).reduce(
      (acc, subField) => {
        acc[subField.id] =
          subField.defaultValue !== undefined ? subField.defaultValue : "";
        return acc;
      },
      {} as Record<string, any>,
    );
  };

  return (
    <div className="col-span-12 space-y-4 p-4 border-2 border-dashed rounded-xl bg-muted/30">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-foreground">{field.label}</h4>
          {field.description && (
            <p className="text-xs text-muted-foreground">{field.description}</p>
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append(createEmptyRow())}
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> افزودن آیتم
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="text-xs text-center text-muted-foreground py-4">
          هیچ آیتمی اضافه نشده است.
        </p>
      )}

      <div className="space-y-4">
        {fields.map((row, index) => (
          <div
            key={row.id}
            className="flex flex-row justify-center gap-4 p-4 border rounded-lg bg-background items-start shadow-sm"
          >
            {/* رندر فیلدهای داخل این سطر */}
            <div className="grid grid-cols-12 gap-4 flex-1">
              {(field.fields ?? []).map((subField) => {
                // ساخت نام منحصر به فرد هر فیلد در این سطر خاص (مثلا jobs.0.title)
                const subFieldName = `${fieldName}.${index}.${subField.id}`;

                // یک ترفند عالی: برای اینکه فیلدهای داخلی نام درستی داشته باشند، کانفیگ را موقتا تغییر نام می‌دهیم
                const adjustedField = { ...subField, id: subFieldName };

                return (
                  <FormFieldRenderer
                    key={subField.id}
                    field={adjustedField}
                    parentName={fieldName} // این خط اصلاح شد تا پدرِ فیلدهای داخلی مشخص باشد
                  />
                );
              })}
            </div>
            <div className="flex flex-col gap-1 pt-5">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
                title="حذف آیتم"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            {/* بخش دکمه‌های کنترل سطر (حذف و جابجایی) */}
            <div className="flex flex-col gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={index === 0}
                onClick={() => move(index, index - 1)}
                title="انتقال به بالا"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={index === fields.length - 1}
                onClick={() => move(index, index + 1)}
                title="انتقال به پایین"
              >
                <ArrowDown className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
