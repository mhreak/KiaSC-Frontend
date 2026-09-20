// اصلاح شده در components/form-builder/form-renderer.tsx
"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FormConfig,
  FormNode,
  isLayoutConfig,
  BaseFieldConfig,
} from "../types";
import { FormFieldRenderer } from "./form-field-renderer";
import { FormLayoutRenderer } from "./form-layout-renderer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { validators } from "../lib/form-validator";

interface FormRendererProps {
  config: FormConfig;
  onSubmit: (data: any) => void;
  submitButtonText?: string;
  onCancel?: () => void;
  cancelButtonText?: string;
}

// تابع کمکی برای استخراج تمام فیلدهای ساده از درون کل ساختار درختی چیدمان‌ها
function flattenFields(nodes: FormNode[]): BaseFieldConfig[] {
  let fields: BaseFieldConfig[] = [];
  nodes.forEach((node) => {
    if (isLayoutConfig(node)) {
      if (node.children) {
        fields = [...fields, ...flattenFields(node.children)];
      }
      if (node.items) {
        node.items.forEach((item) => {
          fields = [...fields, ...flattenFields(item.children)];
        });
      }
    } else {
      fields.push(node);
    }
  });
  return fields;
}

export function FormRenderer({
  config,
  onSubmit,
  submitButtonText = "ثبت فرم",
  onCancel,
  cancelButtonText = "لغو",
}: Readonly<FormRendererProps>) {
  const allFields = flattenFields(config);

  // ساخت داینامیک اسکیمای Zod
  const createSchemaFromConfig = (fields: BaseFieldConfig[]) => {
    const schemaFields: Record<string, z.ZodTypeAny> = {};

    fields.forEach((field) => {
      const validator = validators[field.type];

      if (validator) {
        schemaFields[field.id] = validator(
          field.required === true,
          field.label,
          field.validation?.pattern,
          field.validation?.errorMessage,
        );
      } else {
        schemaFields[field.id] = z.any();
      }
    });

    return z.object(schemaFields);
  };

  const formSchema = createSchemaFromConfig(allFields);

  // مقداردهی اولیه مقادیر فرم
  const defaultValues = allFields.reduce(
    (acc, field) => {
      // اگر مقدار پیش‌فرض مستقیماً تعریف شده باشد، همان را برمی‌داریم
      if (field.defaultValue !== undefined) {
        acc[field.id] = field.defaultValue;
      }
      // در غیر این صورت، بر اساس نوع فیلد مقدار اولیه پیش‌فرض استاندارد می‌گذاریم
      else if (field.type === "array" || field.type === "multiselect") {
        acc[field.id] = []; // آرایه خالی برای فیلدهای لیستی و چند انتخابی
      } else if (field.type === "checkbox") {
        acc[field.id] = false; // مقدار بولین برای چک‌باکس
      } else {
        acc[field.id] = ""; // رشته خالی برای فیلدهای متنی، ایمیل، تاریخ و غیره
      }

      return acc;
    },
    {} as Record<string, any>,
  );

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="relative flex flex-col justify-between h-full"
      >
        <div className="space-y-5">
          {config.map((node) => {
            if (isLayoutConfig(node)) {
              return <FormLayoutRenderer key={node.id} layout={node} />;
            }
            return <FormFieldRenderer key={node.id} field={node} />;
          })}
        </div>
        {/* <div className="flex-between mt-16 sticky bottom-0 right-0 left-0 bg-background py-5 rounded-xl">
          <Button type="submit" >
            {submitButtonText}
          </Button>
          <Button variant={"destructive"} onClick={onCancel}>
            {cancelButtonText}
          </Button>
        </div> */}
        <Button type="submit" className={"w-full mt-8"} variant={"gradient"}>
            {submitButtonText}
          </Button>
      </form>
    </FormProvider>
  );
}
