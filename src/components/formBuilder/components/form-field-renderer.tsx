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
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { CustomDatePicker } from "@/components/shared/inputs/CustomDatePicker";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { DynamicIcon } from "./icon-renderer";
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

interface FormFieldRendererProps {
  field: BaseFieldConfig;
  parentName?: string; // ارسال نام پدر برای پشتیبانی از آرایه‌های تودرتو
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
}: Readonly<FormFieldRendererProps>) {
  const { control, setValue } = useFormContext();

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

  const colSpanClass = field.colSpan
    ? colSpanMap[field.colSpan]
    : "sm:col-span-12 col-span-1";

  return (
    <div className={cn(colSpanClass, "space-y-2")}>
      {/* رندر هوشمند لِیبل (فیلد چک‌باکس لِیبل متفاوتی دارد که جلوتر مدیریت کردیم) */}
      {field.type !== "checkbox" && field.type !== "switch" && (
        <Label
          htmlFor={field.id}
          className={cn(
            isDisabled && "opacity-50",
            "mr-2 mb-2 text-lg text-text",
          )}
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
                  <InputGroup>
                    <InputGroupInput
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
                    {field.icon && (
                      <InputGroupAddon align="inline-start">
                        <DynamicIcon name={field.icon} className="size-5" />
                      </InputGroupAddon>
                    )}
                  </InputGroup>
                );

              case "number":
              case "nationalcode":
              case "mobile":
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
                        "border-destructive focus-visible:ring-destructive",
                      (isReadOnly || field.computedValue) &&
                        "bg-muted cursor-not-allowed focus-visible:ring-0",
                    )}
                    maxLength={field.maxLength}
                    icon={
                      field.icon ? (
                        <DynamicIcon name={field.icon} className="size-5" />
                      ) : undefined
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
                    rows={5}
                    className={cn(
                      "w-full",
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
                  <div className="flex items-center space-x-2">
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
                return (
                  <Select
                    disabled={isDisabled || isReadOnly}
                    onValueChange={onChange}
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
                      {field.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
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
                const toggleOption = (optValue: string) => {
                  const updated = currentValues.includes(optValue)
                    ? currentValues.filter((v: string) => v !== optValue)
                    : [...currentValues, optValue];
                  onChange(updated);
                };
                return (
                  <div className="flex flex-wrap gap-2 p-1 border rounded-md min-h-10 bg-background">
                    {field.options?.map((option) => {
                      const isSelected = currentValues.includes(option.value);
                      return (
                        <button
                          key={option.value}
                          type="button"
                          disabled={isDisabled || isReadOnly}
                          onClick={() => toggleOption(option.value)}
                          className={cn(
                            "px-3 py-1 text-xs rounded-full border transition-all",
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-secondary text-secondary-foreground hover:bg-muted",
                          )}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                    {currentValues.length === 0 && (
                      <span className="text-xs text-muted-foreground p-1.5">
                        {field.placeholder ??
                          "جهت انتخاب روی گزینه‌ها کلیک کنید..."}
                      </span>
                    )}
                  </div>
                );
              }
              // ۴. مدیریت فایل و تصویر (File & Image Upload)
              case "file":
              case "image": {
                const handleFileChange = (
                  e: React.ChangeEvent<HTMLInputElement>,
                ) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    // فرستادن کل فایل یا لیست فایل‌ها به react-hook-form
                    onChange(field.multiple ? Array.from(files) : files[0]);
                  }
                };
                return (
                  <div className="space-y-2">
                    <Input
                      id={field.id}
                      type="file"
                      accept={field.type === "image" ? "image/*" : undefined}
                      multiple={field.multiple}
                      disabled={isDisabled || isReadOnly}
                      onChange={handleFileChange}
                      onBlur={onBlur}
                      ref={(e) => {
                        ref(e);

                        fileInputRef.current = e;
                      }}
                      className={cn(
                        "cursor-pointer file:bg-secondary file:text-secondary-foreground file:border-0 file:rounded-md file:px-2 file:py-1 file:ml-2 file:text-xs",
                        error && "border-destructive",
                      )}
                    />
                    {/* نمایش یک پیش‌نمایش کوچک در صورتی که فیلد تصویر بود و فایلی انتخاب شده بود */}
                    {field.type === "image" && value && (
                      <div className="mt-2 border p-2 rounded-lg w-fit bg-muted">
                        <p className="text-[10px] text-muted-foreground mb-1">
                          فایل انتخاب شد:
                        </p>
                        <span className="text-xs font-mono">
                          {value instanceof File
                            ? value.name
                            : "تصویر بارگذاری شده"}
                        </span>
                      </div>
                    )}
                  </div>
                );
              }

              case "location": {
                return null;
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
