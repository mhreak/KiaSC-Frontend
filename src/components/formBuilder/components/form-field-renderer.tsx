// components/form-builder/form-field-renderer.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { BaseFieldConfig } from "../types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { resolveValue } from "../lib/form-evaluator";
import { FormArrayRenderer } from "./form-array-renderer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PersianNumberInput } from "@/components/shared/inputs/PersianNumberInput";
import { AmountInput } from "@/components/shared/inputs/AmountInput";
import { Switch } from "@/components/ui/switch";
import PasswordInput from "@/components/shared/inputs/PasswordInput";
import MultipleSelector from "@/components/ui/multi-select";
import { FileUploadInput } from "@/components/ui/file-upload";
import { PersianDatePicker } from "@/components/persianDatePicker/PersianDatePicker";
import {
  gregorianDateTimeToJalali,
  gregorianToJalali,
  jalaliDateTimeToGregorian,
  jalaliToGregorian,
  stringToTimeValue,
  timeValueToString,
} from "../utils/date-converter";
import { PersianTimePicker } from "@/components/persianDatePicker/PersianTimePicker";
import { PersianDateTimePicker } from "@/components/persianDatePicker/PersianDateTimePicker";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { AthleteSearch } from "@/components/shared/inputs/searchInputs/athleteSearch/AthleteSearch";
import { Skeleton } from "@/components/ui/skeleton";
interface FormFieldRendererProps {
  field: BaseFieldConfig;
  parentName?: string; // ارسال نام پدر برای پشتیبانی از آرایه‌های تودرتو
  onFieldChange?: (
    fieldId: string,
    value: any,
    formValues: Record<string, any>,
  ) => void;
}

export const colSpanMap: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

export function FormFieldRenderer({
  field,
  parentName,
  onFieldChange,
}: Readonly<FormFieldRendererProps>) {
  const { control, setValue, formState } = useFormContext();
  console.log(formState.errors);

  // ۱. مانیتور کردن زنده مقادیر فرم
  const formValues = useWatch({ control }) || {};

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ۲. ارزیابی شروط داینامیک فیلد
  const isVisible =
    field.visible !== undefined
      ? resolveValue(field.visible, formValues) !== false
      : true;
  const isDisabled = !!resolveValue(field.disabled, formValues);
  const isReadOnly = !!resolveValue(field.readonly, formValues);
  const isRequired = !!resolveValue(field.required, formValues);

  // ۳. اعمال محاسبات داینامیک (Computed Value)
  useEffect(() => {
    if (field.computedValue) {
      const computedResult = field.computedValue(formValues);
      if (
        computedResult !== undefined &&
        computedResult !== formValues[field.id]
      ) {
        setValue(field.id, computedResult, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
  }, [formValues, field.computedValue, field.id, setValue]);

  // اگر فیلد نباید دیده شود کلاً رندر نشود
  if (!isVisible) return null;

  // ۴. استثنای طلایی: اگر فیلد از نوع آرایه بود، بدون لِیبل و کنترلرِ اضافه رندرش کن
  if (field.type === "array") {
    return <FormArrayRenderer field={field} parentName={parentName} />;
  }

  const colSpanClass = field.colSpan ? colSpanMap[field.colSpan] : "col-span-6";

  return (
    <div className={cn(colSpanClass, "space-y-2")}>
      {/* رندر هوشمند لِیبل (فیلد چک‌باکس لِیبل متفاوتی دارد که جلوتر مدیریت کردیم) */}
      {field.type !== "checkbox" &&
        field.type !== "switch" &&
        field.type !== "invisible" && (
          <Label
            htmlFor={field.id}
            className={cn(isDisabled && "opacity-50", "text-lg")}
          >
            {field.label}{" "}
            {isRequired && <span className="text-destructive">*</span>}
          </Label>
        )}

      <Controller
        control={control}
        name={field.id}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => {
          const renderInput = () => {
            switch (field.type) {
              case "text":
              case "email":
                return (
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    disabled={isDisabled}
                    readOnly={isReadOnly || !!field.computedValue}
                    value={value ?? ""}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    className={cn(
                      error &&
                        "border-destructive focus-visible:ring-destructive",
                      (isReadOnly || field.computedValue) &&
                        "bg-muted cursor-not-allowed focus-visible:ring-0",
                    )}
                    maxLength={field.maxLength}
                  />
                );

              case "number":
              case "nationalcode":
              case "mobile":
              case "phone":
              case "postalcode":
                return (
                  <PersianNumberInput
                    id={field.id}
                    type={"text"}
                    placeholder={field.placeholder}
                    disabled={isDisabled}
                    readOnly={isReadOnly || !!field.computedValue}
                    value={value ?? ""}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    className={cn(
                      error &&
                        " border-destructive focus-visible:ring-destructive ocus-visible:ring",
                      (isReadOnly || field.computedValue) &&
                        "bg-muted cursor-not-allowed focus-visible:ring-0",
                    )}
                    maxLength={
                      field.type === "mobile" || field.type === "phone"
                        ? 11
                        : field.maxLength
                    }
                  />
                );

              case "amount":
                return (
                  <AmountInput
                    id={field.id}
                    type={"text"}
                    placeholder={field.placeholder}
                    disabled={isDisabled}
                    readOnly={isReadOnly || !!field.computedValue}
                    value={value ?? ""}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    className={cn(
                      error &&
                        "border-destructive focus-visible:ring-destructive",
                      (isReadOnly || field.computedValue) &&
                        "bg-muted cursor-not-allowed focus-visible:ring-0",
                    )}
                    isRial={field.isRial}
                    maxLength={field.maxLength}
                  />
                );

              case "password": {
                return (
                  <PasswordInput
                    id={field.id}
                    placeholder={field.placeholder}
                    disabled={isDisabled}
                    readOnly={isReadOnly || !!field.computedValue}
                    value={value ?? ""}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    className={cn(
                      error &&
                        "border-destructive focus-visible:ring-destructive",
                      (isReadOnly || field.computedValue) &&
                        "bg-muted cursor-not-allowed focus-visible:ring-0",
                    )}
                    maxLength={field.maxLength}
                  />
                );
              }

              case "date": {
                return (
                  <PersianDatePicker
                    value={gregorianToJalali(value)}
                    onChange={(date) => {
                      onChange(jalaliToGregorian(date));
                    }}
                    placeholder={field.placeholder ?? "انتخاب تاریخ"}
                    disabled={isReadOnly || !!field.computedValue}
                    error={error?.message}
                    className={cn(
                      error &&
                        "border-destructive focus-visible:ring-destructive",
                      (isReadOnly || field.computedValue) &&
                        "bg-muted cursor-not-allowed focus-visible:ring-0",
                      "w-full",
                    )}
                  />
                );
              }
              case "time": {
                return (
                  <PersianTimePicker
                    value={stringToTimeValue(value)}
                    onChange={(time) => {
                      onChange(timeValueToString(time));
                    }}
                    placeholder={field.placeholder ?? "انتخاب زمان"}
                    disabled={isReadOnly || isDisabled || !!field.computedValue}
                    error={error?.message}
                    className={cn(
                      error &&
                        "border-destructive focus-visible:ring-destructive",
                      (isReadOnly || field.computedValue) &&
                        "bg-muted cursor-not-allowed focus-visible:ring-0",
                      "w-full",
                    )}
                    format="24h"
                    minuteStep={5}
                  />
                );
              }

              case "datetime": {
                return (
                  <PersianDateTimePicker
                    value={gregorianDateTimeToJalali(value)}
                    onChange={(dateTime) => {
                      onChange(jalaliDateTimeToGregorian(dateTime));
                    }}
                    placeholder="انتخاب تاریخ و زمان"
                    disabled={isReadOnly || !!field.computedValue}
                    error={error?.message}
                    className="w-full"
                    timeFormat="24h"
                    minuteStep={5}
                    showTimePicker
                  />
                );
              }
              case "textarea":
                return (
                  <Textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    disabled={isDisabled}
                    readOnly={isReadOnly}
                    value={value ?? ""}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    className={cn(
                      error &&
                        "border-destructive focus-visible:ring-destructive",
                      isReadOnly &&
                        "bg-muted cursor-not-allowed focus-visible:ring-0",
                    )}
                    maxLength={field.maxLength}
                  />
                );

              case "checkbox":
                return (
                  <div className="flex items-center space-x-2 space-x-reverse pt-2">
                    <Checkbox
                      id={field.id}
                      disabled={isDisabled}
                      checked={!!value}
                      onCheckedChange={onChange}
                      ref={ref}
                    />
                    <Label
                      htmlFor={field.id}
                      className={cn(
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                        isDisabled && "opacity-50",
                      )}
                    >
                      {field.label}{" "}
                      {isRequired && (
                        <span className="text-destructive">*</span>
                      )}
                    </Label>
                  </div>
                );

              case "switch":
                return (
                  <div className="flex items-center space-x-5 h-full">
                    <Label
                      htmlFor={field.id}
                      className={cn(
                        "text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                        isDisabled && "opacity-50",
                      )}
                    >
                      {field.label}{" "}
                      {isRequired && (
                        <span className="text-destructive">*</span>
                      )}
                    </Label>
                    <Switch
                      id={field.id}
                      disabled={isDisabled}
                      checked={!!value}
                      onCheckedChange={onChange}
                      ref={ref}
                    />
                  </div>
                );

              case "select": {
                const selectedOption = field.options?.find(
                  (opt) => opt.value === value,
                );
                if (field.isLoading)
                  return <Skeleton className="w-full h-14 rounded-xl" />;
                else
                  return (
                    <Select
                      disabled={isDisabled || isReadOnly}
                      onValueChange={(value: any) => {
                        onChange(value);

                        onFieldChange?.(field.id, value, {
                          ...formValues,
                          [field.id]: value,
                        });
                      }}
                      value={value ?? undefined}
                    >
                      <SelectTrigger
                        id={field.id}
                        ref={ref}
                        className={cn(
                          error &&
                            "border-destructive focus-visible:ring-destructive",
                        )}
                      >
                        <SelectValue
                          placeholder={field.placeholder ?? "انتخاب کنید..."}
                        >
                          {selectedOption ? selectedOption.label : null}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={""}>انتخاب کنید</SelectItem>
                        {field.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.component ? option.component : option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
              }

              case "radio":
                return (
                  <RadioGroup
                    disabled={isDisabled || isReadOnly}
                    onValueChange={onChange}
                    value={value ?? ""}
                    className="flex flex-wrap gap-4 pt-2"
                  >
                    {field.options?.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-2 space-x-reverse"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={`${field.id}-${option.value}`}
                        />
                        <Label
                          htmlFor={`${field.id}-${option.value}`}
                          className="cursor-pointer font-normal mr-1"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                );

              case "multiselect": {
                const currentValues = Array.isArray(value) ? value : [];

                const options =
                  field.options?.map((option) => ({
                    value: String(option.value),
                    label: option.label,
                    className: option.className,
                    style: option.style,
                  })) ?? [];

                const selectedOptions = options.filter((option) =>
                  currentValues.some(
                    (currentValue) => String(currentValue) === option.value,
                  ),
                );

                return (
                  <MultipleSelector
                    value={selectedOptions}
                    defaultOptions={options}
                    placeholder={
                      field.placeholder ?? "جهت انتخاب موارد کلیک کنید..."
                    }
                    emptyIndicator={
                      <p className="text-center text-sm">موردی یافت نشد</p>
                    }
                    disabled={isDisabled || isReadOnly}
                    className="w-full"
                    commandProps={{
                      label: field.label ?? "انتخاب موارد",
                    }}
                    onChange={(selected) => {
                      const selectedValues = selected.map((option) => {
                        const originalOption = field.options?.find(
                          (item) => String(item.value) === option.value,
                        );

                        return originalOption?.value ?? option.value;
                      });

                      onChange(selectedValues);

                      onFieldChange?.(field.id, selectedValues, {
                        ...formValues,
                        [field.id]: selectedValues,
                      });
                    }}
                  />
                );
              }
              // ۴. مدیریت فایل و تصویر (File & Image Upload)
              case "file":
              case "image": {
                const isMultiple = (field.maxFileUpload ?? 1) > 1;
                // return <div></div>;

                return (
                  <FileUploadInput
                    maxFiles={field.maxFileUpload ?? 1}
                    maxSize={2 * 1024 * 1024}
                    accept={field.type === "image" ? "image/*" : undefined}
                    multiple={isMultiple}
                    disabled={isDisabled || isReadOnly}
                    className={cn("w-full")}
                    error={!!error}
                    initialFiles={field.defaultValue ?? []}
                    onFilesChange={(files) => {
                      const selectedFiles = files.map(
                        (fileItem) => fileItem.file,
                      );

                      if (isMultiple) {
                        onChange(selectedFiles);
                      } else {
                        onChange(selectedFiles[0] ?? null);
                      }

                      onBlur();
                    }}
                    onExistingFilesChange={(files) => {
                      console.log(files);
                      if (files.length === 0) {
                        onFieldChange?.(field.id, undefined, {
                          ...formValues,
                          [field.id]: undefined,
                        });
                      }
                    }}
                  />
                );
              }

              case "athleteSearch": {
                return (
                  <AthleteSearch
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    disabled={isDisabled}
                    readOnly={isReadOnly || !!field.computedValue}
                    value={value ?? ""}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    className={cn(
                      error &&
                        "border-destructive focus-visible:ring-destructive",
                      (isReadOnly || field.computedValue) &&
                        "bg-muted cursor-not-allowed focus-visible:ring-0",
                    )}
                    maxLength={field.maxLength}
                    onClear={() => {
                      onChange("");
                    }}
                    displayName={field.displayName}
                  />
                );
              }
              case "invisible": {
                return <div className="w-full invisible"></div>;
              }

              case "textWithConfirm": {
                return (
                  <div className="flex items-center gap-2">
                    <Input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      disabled={isDisabled}
                      readOnly={isReadOnly || !!field.computedValue}
                      value={value ?? ""}
                      onChange={onChange}
                      onBlur={onBlur}
                      ref={ref}
                      className={cn(
                        error &&
                          "border-destructive focus-visible:ring-destructive",
                        (isReadOnly || field.computedValue) &&
                          "bg-muted cursor-not-allowed focus-visible:ring-0",
                      )}
                      maxLength={field.maxLength}
                    />
                    <Button
                      variant={"secondary"}
                      size={"icon-lg"}
                      onClick={field.onClick}
                    >
                      <Check className="size-5" strokeWidth={4} />
                    </Button>
                  </div>
                );
              }
              default:
                return null;
            }
          };

          return (
            <>
              {renderInput()}
              {field.description && !error && (
                <p className="text-sm text-muted-foreground mt-2 ">
                  {field.description}
                </p>
              )}
              {error && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {error.message}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
}
