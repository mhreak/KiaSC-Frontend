// اصلاح شده در components/form-builder/form-renderer.tsx
"use client";

import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FormConfig,
  FormNode,
  isLayoutConfig,
  BaseFieldConfig,
  FormMode,
} from "../types";
import { FormFieldRenderer } from "./form-field-renderer";
import { FormLayoutRenderer } from "./form-layout-renderer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { validators } from "../lib/form-validator";

import { Eye, Pencil, Plus } from "lucide-react";

interface FormRendererProps {
  config: FormConfig;
  onSubmit: (data: any) => void;

  onFieldChange?: (
    fieldId: string,
    value: any,
    formValues: Record<string, any>,
  ) => void;

  submitButtonText?: string;
  onCancel?: () => void;
  cancelButtonText?: string;
  disableSubmitButton?: boolean;
  isSubmitting?: boolean;
  isSubmittingText?: string;
  formMode?: FormMode;
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
  onFieldChange,
  submitButtonText = "ثبت فرم",
  onCancel,
  cancelButtonText = "لغو",
  disableSubmitButton = false,
  isSubmitting = false,
  isSubmittingText,
  formMode,
}: Readonly<FormRendererProps>) {
  const allFields = flattenFields(config);

  // ساخت داینامیک اسکیمای Zod
  const createSchemaFromConfig = (
    fields: BaseFieldConfig[],
    values: Record<string, any>,
  ) => {
    const schemaFields: Record<string, z.ZodTypeAny> = {};

    fields.forEach((field) => {
      const validator = validators[field.type];

      const isRequired =
        typeof field.required === "function"
          ? field.required(values)
          : field.required === true;

      if (!validator) {
        schemaFields[field.id] = z.any();
        if (isRequired) {
          schemaFields[field.id] = z
            .any()
            .refine(
              (value) => value !== "" && value !== null && value !== undefined,
              {
                message: `${field.label} الزامی است`,
              },
            );
        }
        return;
      }

      schemaFields[field.id] = validator(
        isRequired,
        field.label,
        field.validation?.pattern,
        field.validation?.errorMessage,
      );
    });

    return z.object(schemaFields);
  };

  // const formSchema = createSchemaFromConfig(allFields);

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
      } else if (field.type === "checkbox" || field.type === "switch") {
        acc[field.id] = false; // مقدار بولین برای چک‌باکس
      } else if (field.type === "file" || field.type === "image") {
        acc[field.id] = null;
      } else {
        acc[field.id] = ""; // رشته خالی برای فیلدهای متنی، ایمیل، تاریخ و غیره
      }

      return acc;
    },
    {} as Record<string, any>,
  );

  console.log(defaultValues);

  const methods = useForm({
    resolver: async (values, context, options) => {
      const schema = createSchemaFromConfig(allFields, values);

      return zodResolver(schema)(values, context, options);
    },
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  // useEffect(() => {
  //   methods.reset(defaultValues);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [config]);

  const handleFormSubmit = (data: Record<string, any>) => {
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(
        ([, value]) => value !== "" && value !== null && value !== undefined,
      ),
    );

    onSubmit(cleanedData);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className="relative flex flex-col justify-between h-full"
      >
        <div className="grid grid-cols-12 gap-4 gap-y-12">
          {config.map((node) => {
            if (isLayoutConfig(node)) {
              return (
                <FormLayoutRenderer
                  key={node.id}
                  layout={node}
                  onFieldChange={onFieldChange}
                />
              );
            }
            return (
              <FormFieldRenderer
                key={node.id}
                field={node}
                onFieldChange={onFieldChange}
              />
            );
          })}
        </div>
        <div className="flex-between mt-16 sticky bottom-0 right-0 left-0 bg-background py-5">
          <Button
            type="submit"
            size={"lg"}
            variant={formMode === "edit" ? "warning" : "success"}
            disabled={disableSubmitButton}
            isLoading={isSubmitting}
            isLoadingText={isSubmittingText}
          >
            {formMode === "add" ? (
              <Plus />
            ) : formMode === "edit" ? (
              <Pencil />
            ) : (
              <Eye />
            )}
            {submitButtonText}
          </Button>
          <Button variant={"destructive"} onClick={onCancel} size={"lg"}>
            {cancelButtonText}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
