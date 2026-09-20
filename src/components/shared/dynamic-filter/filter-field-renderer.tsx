// components/filter-builder/filter-field-renderer.tsx
"use client";

import React, { useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FilterFieldConfig } from "./types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { PersianNumberInput } from "@/components/shared/inputs/PersianNumberInput";
import { CustomDatePicker } from "@/components/shared/inputs/CustomDatePicker";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterFieldRendererProps {
  field: FilterFieldConfig;
}

const colSpanMap: Record<number, string> = {
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

export function FilterFieldRenderer({
  field,
}: Readonly<FilterFieldRendererProps>) {
  const { control, setValue, resetField, getValues } = useFormContext();

  const datePickerRef = useRef<any>(null);

  const colSpanClass = field.colSpan
    ? colSpanMap[field.colSpan]
    : "col-span-12 md:col-span-3";

  return (
    <div className={cn(colSpanClass, "space-y-1.5")}>
      {field.type !== "switch" && (
        <Label htmlFor={field.id} className="text-md text-foreground mr-2">
          {field.label}
        </Label>
      )}

      <Controller
        control={control}
        name={field.id}
        render={({ field: { onChange, value } }) => {
          switch (field.type) {
            case "text":
              return (
                <Input
                  id={field.id}
                  placeholder={field.placeholder}
                  value={value ?? ""}
                  onChange={onChange}
                  size={"small"}
                />
              );

            case "number":
              return (
                <PersianNumberInput
                  id={field.id}
                  placeholder={field.placeholder ?? "مقدار عددی..."}
                  value={value ?? ""}
                  onChange={onChange}
                  className="h-9 text-xs"
                />
              );

            case "select": {
              const selectedOption = field.options?.find(
                (opt) => opt.value === value,
              );
              return (
                <Select onValueChange={onChange} value={value ?? undefined}>
                  <SelectTrigger id={field.id} size="sm">
                    <SelectValue placeholder={field.placeholder ?? "انتخاب..."}>
                      {selectedOption ? selectedOption.label : null}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="text-xs"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }

            case "multiselect": {
              const currentValues = Array.isArray(value) ? value : [];
              const toggleOption = (optValue: string) => {
                const updated = currentValues.includes(optValue)
                  ? currentValues.filter((v: string) => v !== optValue)
                  : [...currentValues, optValue];
                onChange(updated);
              };
              return (
                <div className="flex flex-wrap gap-1.5 p-1 border rounded-2xl min-h-9 bg-input/30 items-center">
                  {field.options?.map((option) => {
                    const isSelected = currentValues.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => toggleOption(option.value)}
                        className={cn(
                          "px-2 py-0.5 text-[10px] rounded-2xl border transition-all",
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
                    <span className="text-[10px] text-muted-foreground px-1">
                      {field.placeholder ?? "چند انتخابی..."}
                    </span>
                  )}
                </div>
              );
            }

            case "date":
              return (
                <DatePicker
                  ref={datePickerRef}
                  value={value || null}
                  onChange={(date) => onChange(date ? date.format() : null)}
                  format="YYYY/MM/DD"
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="top-right"
                  render={
                    <CustomDatePicker
                      iconName="Calendar"
                      className="h-9 text-xs"
                      onClear={() => {
                        resetField(field.id, {
                          defaultValue: "",
                        });
                        datePickerRef.current?.setValue?.(null);
                        onChange(null);
                        setValue(field.id, "", {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });
                        console.log("onClear");
                        console.log(getValues());
                        onChange("");
                        console.log(getValues());
                      }}
                      handleValueChange={onChange}
                    />
                  }
                  containerClassName="h-9"
                />
              );

            case "date-range": {
              const rangeValue = value || { from: "", to: "" };
              return (
                <div className="flex gap-1 items-center">
                  <DatePicker
                    value={rangeValue.from || ""}
                    onChange={(date) =>
                      onChange({
                        ...rangeValue,
                        from: date?.isValid ? date.format() : "",
                      })
                    }
                    format="YYYY/MM/DD"
                    calendar={persian}
                    locale={persian_fa}
                    placeholder="از تاریخ"
                    render={
                      <CustomDatePicker
                        iconName="Calendar"
                        // className="h-9 text-xs w-full"
                        onClear={() => {
                          console.log("onClear");
                        }}
                      />
                    }
                    containerClassName="w-full"
                  />
                  <span className="text-muted-foreground text-[10px]">تا</span>
                  <DatePicker
                    value={rangeValue.to || ""}
                    onChange={(date) =>
                      onChange({
                        ...rangeValue,
                        to: date?.isValid ? date.format() : "",
                      })
                    }
                    format="YYYY/MM/DD"
                    calendar={persian}
                    locale={persian_fa}
                    placeholder="تا تاریخ"
                    render={
                      <CustomDatePicker
                        iconName="Calendar"
                        // className="h-9 text-xs w-full"
                        onClear={() => {
                          console.log("onClear");
                        }}
                      />
                    }
                    containerClassName="w-full"
                  />
                </div>
              );
            }

            case "switch":
              return (
                <div className="flex items-center space-x-2 space-x-reverse h-9 pt-1">
                  <Switch
                    id={field.id}
                    checked={!!value}
                    onCheckedChange={onChange}
                  />
                  <Label
                    htmlFor={field.id}
                    className="text-xs cursor-pointer text-muted-foreground"
                  >
                    {field.label}
                  </Label>
                </div>
              );

            default:
              return <></>;
          }
        }}
      />
    </div>
  );
}
