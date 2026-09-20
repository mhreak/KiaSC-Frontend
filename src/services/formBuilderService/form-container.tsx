"use client";

import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormDefinition } from "./form-builder/core/types";
import { FormUIAdapter } from "./form-builder/core/ui-contracts";
import { UIAdapterProvider } from "./form-builder/core/context";
import { compileZodSchema } from "./form-builder/core/compiler";
import { FormRenderer } from "./form-renderer";

interface FormContainerProps {
  schema: FormDefinition;
  uiAdapter: FormUIAdapter;
  onSubmit: (data: any) => void;
  defaultValues?: Record<string, any>;
  children?: React.ReactNode; // For appending submit buttons, custom actions etc
}

export const FormContainer: React.FC<FormContainerProps> = ({
  schema,
  uiAdapter,
  onSubmit,
  defaultValues,
  children,
}) => {
  const validationSchema = useMemo(() => compileZodSchema(schema), [schema]);

  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: defaultValues || {},
    mode: "onChange",
  });

  return (
    <UIAdapterProvider adapter={uiAdapter}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormRenderer fields={schema.fields} form={form} />
          {children}
        </form>
      </Form>
    </UIAdapterProvider>
  );
};
