"use client";

import React from "react";
import {
  useWatch,
  UseFormReturn,
  FieldValues,
  Path,
  Controller,
} from "react-hook-form";
import { FormRegistry } from "./form-builder/core/registry";
import {
  FormElementDefinition,
  FieldDefinition,
  SectionDefinition,
} from "./form-builder/core/types";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

interface FormRendererProps<TFieldValues extends FieldValues = FieldValues> {
  fields: FormElementDefinition[];
  form: UseFormReturn<TFieldValues>;
  parentPath?: string;
}

export const FormRenderer = <TFieldValues extends FieldValues = FieldValues>({
  fields,
  form,
  parentPath,
}: FormRendererProps<TFieldValues>) => {
  return (
    <>
      {fields.map((element) => {
        // 1. Handle Structural Layout Rows
        if (element.type === "section") {
          const section = element as SectionDefinition;
          return (
            <div key={section.id} className={section.className || "space-y-4"}>
              {(section.title || section.description) && (
                <div className="space-y-1">
                  {section.title && (
                    <h3 className="text-lg font-medium">{section.title}</h3>
                  )}
                  {section.description && (
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  )}
                </div>
              )}
              <div className="grid gap-4">
                <FormRenderer
                  fields={section.fields}
                  form={form}
                  parentPath={parentPath}
                />
              </div>
            </div>
          );
        }

        // 2. Handle Registered Data Fields via Controller Adapter
        const field = element as FieldDefinition;
        const currentPath = parentPath
          ? `${parentPath}.${field.name}`
          : field.name;

        return (
          <ConditionalEvaluator key={field.id} field={field} form={form}>
            <Controller
              control={form.control}
              name={currentPath as Path<TFieldValues>}
              render={({ field: rhfField, fieldState }) => {
                const plugin = FormRegistry.get(field.type);

                if (!plugin) {
                  return (
                    <div className="p-3 border border-dashed border-destructive/50 bg-destructive/5 rounded text-destructive text-xs font-mono">
                      [FormBuilder Error]: Unregistered input type &quot;
                      {field.type}&quot;.
                    </div>
                  );
                }

                const TargetFieldComponent = plugin.component;

                return (
                  <FormItem className={field.props?.className}>
                    {field.label && <FormLabel>{field.label}</FormLabel>}
                    <FormControl>
                      <TargetFieldComponent
                        name={currentPath}
                        value={rhfField.value ?? ""}
                        onChange={rhfField.onChange}
                        error={fieldState.error}
                        disabled={rhfField.disabled || field.props?.disabled}
                        readOnly={field.props?.readOnly}
                        config={field}
                      />
                    </FormControl>
                    {field.description && (
                      <FormDescription>{field.description}</FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </ConditionalEvaluator>
        );
      })}
    </>
  );
};

/**
 * Conditional compilation block utilizing declarative context subscription listeners
 */
const ConditionalEvaluator: React.FC<{
  field: FieldDefinition;
  form: UseFormReturn<any>;
  children: React.ReactNode;
}> = ({ field, form, children }) => {
  const conditions = field.conditions || [];
  const watchedValues = useWatch({
    control: form.control,
    name: conditions.map((c) => c.field),
  });

  if (conditions.length === 0) return <>{children}</>;

  const isVisible = conditions.every((condition, index) => {
    const value = watchedValues[index];
    const strategies = {
      equals: () => value === condition.value,
      notEquals: () => value !== condition.value,
      filled: () => value !== undefined && value !== null && value !== "",
      empty: () => value === undefined || value === null || value === "",
      contains: () => Array.isArray(value) && value.includes(condition.value),
      greaterThan: () => Number(value) > Number(condition.value),
      lessThan: () => Number(value) < Number(condition.value),
    };
    return strategies[condition.operator]?.() ?? true;
  });

  if (!isVisible) return null;
  return <>{children}</>;
};
