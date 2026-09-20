// components/filter-builder/filter-renderer.tsx
"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FilterConfig } from "./types";
import { FilterFieldRenderer } from "./filter-field-renderer";
import { Button } from "@/components/ui/button";
import { Trash2, Search, Funnel } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FilterRendererProps {
  config: FilterConfig;
  // خروجی فقط شامل فیلترهایی است که کاربر واقعاً مقداردهی کرده است
  onApplyFilters: (filters: Record<string, any>) => void;
}

export function FilterRenderer({
  config,
  onApplyFilters,
}: Readonly<FilterRendererProps>) {
  // ۱. ساخت مقدار اولیه هوشمند (تنها در صورت وجود defaultValue پیش‌فرض می‌گیرد)
  const defaultValues = config.reduce(
    (acc, field) => {
      if (field.defaultValue !== undefined) {
        acc[field.id] = field.defaultValue;
      } else if (field.type === "multiselect") {
        acc[field.id] = [];
      } else if (field.type === "date-range") {
        acc[field.id] = { from: "", to: "" };
      } else if (field.type === "switch") {
        acc[field.id] = false;
      } else {
        acc[field.id] = "";
      }
      return acc;
    },
    {} as Record<string, any>,
  );

  const methods = useForm({
    defaultValues,
    mode: "onChange",
  });

  // ۲. تمیز کردن آبجکت قبل از ارسال به سرور (حذف مقادیر خالی، آرایه‌های تهی و بقیه موارد زائد)
  const handleSubmit = (data: Record<string, any>) => {
    const cleanFilters: Record<string, any> = {};

    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;

      // فیلتر آرایه‌های خالی در multiselect
      if (Array.isArray(value) && value.length === 0) return;

      // فیلتر بازه تاریخ خالی
      if (typeof value === "object" && "from" in value && "to" in value) {
        if (!value.from && !value.to) return;
      }

      // اگر سوییچ خاموش بود و مقدار بی‌تاثیر داشت
      if (typeof value === "boolean" && !value) return;

      cleanFilters[key] = value;
    });

    onApplyFilters(cleanFilters);
  };

  // ۳. ریست کردن فیلترها و آگاه‌سازی سرور
  const handleReset = () => {
    methods.reset(defaultValues);
    onApplyFilters({}); // ارسال آبجکت خالی به معنای حذف تمام فیلترها
  };

  return (
    <FormProvider {...methods}>
      <Accordion defaultValue={["shipping"]} className="mb-8">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="border bg-secondary rounded-full p-2">
              <Funnel className="text-primary-foreground" size={18} />
            </span>
            فیلترهای جستجو
          </AccordionTrigger>
          <AccordionContent>
            <form
              onSubmit={methods.handleSubmit(handleSubmit)}
              className="p-4 border rounded-xl bg-card space-y-4 shadow-sm"
            >
              {/* <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-sm font-bold text-foreground">
                  فیلترهای جستجو
                </h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="text-muted-foreground hover:text-destructive text-xs flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  پاکسازی فیلترها
                </Button>
              </div> */}

              {/* گرید هوشمند رندر فیلدها */}
              <div className="grid grid-cols-12 gap-x-20 gap-y-6 p-5 px-8">
                {config.map((field) => (
                  <FilterFieldRenderer key={field.id} field={field} />
                ))}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="text-muted-foreground hover:text-destructive text-xs flex items-center gap-1"
                >
                  <Trash2 className="size-4" />
                  پاکسازی فیلترها
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="gap-2"
                  variant={"secondary"}
                >
                  <Search className="size-4" />
                  اعمال فیلتر
                </Button>
              </div>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </FormProvider>
  );
}
