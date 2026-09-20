import { useMemo } from "react";
import { z } from "zod";
import {
  FieldList,
  FormField,
  isFieldListArray,
  isWrappedFormFieldArray,
} from "@/services/formService/_types/formBuilder.types";

export function useFormBuilder(formFields: FormField) {
  const schema = useMemo(() => {
    const shape: Record<string, z.ZodTypeAny> = {};

    const buildField = (field: FieldList): z.ZodTypeAny => {
      let schema: z.ZodTypeAny;

      switch (field.type) {
        case "text":
        case "textarea":
        case "email":
          schema = z.string();
          break;

        case "number":
          schema = z.number();
          break;

        case "date":
        case "time":
        case "dateTime":
          schema = z.string();
          break;

        case "select":
          schema = z.union([z.string(), z.number()]);
          break;

        default:
          schema = z.any();
      }

      if (!field.required) {
        schema = schema.optional();
      }

      if (field.pattern && schema instanceof z.ZodString) {
        schema = schema.regex(field.pattern);
      }

      if (field.validation) {
        schema = field.validation(schema);
      }

      return schema;
    };

    if (isFieldListArray(formFields)) {
      formFields.forEach((field) => {
        shape[field.name] = buildField(field);
      });
    }

    if (isWrappedFormFieldArray(formFields)) {
      formFields.forEach((group) =>
        group.fieldList.forEach((field) => {
          shape[field.name] = buildField(field);
        }),
      );
    }

    return z.object(shape);
  }, [formFields]);

  return schema;
}
