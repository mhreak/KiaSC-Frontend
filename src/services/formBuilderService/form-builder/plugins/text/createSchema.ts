import { z } from "zod";
import { FieldDefinition } from "../../core/types";

/**
 * Maps incoming JSON string metadata directly down into explicit Zod validation instances.
 */
export function createTextSchema(config: FieldDefinition): z.ZodTypeAny {
  let schema = z.string();
  const rules = config.validation;

  if (!rules) return schema;

  // Polymorphic execution strategy to chain constraints without if blocks
  const modifiers = [
    () =>
      rules.min !== undefined &&
      (schema = schema.min(rules.min, rules.customMessage)),
    () =>
      rules.max !== undefined &&
      (schema = schema.max(rules.max, rules.customMessage)),
    () =>
      rules.regex !== undefined &&
      (schema = schema.regex(new RegExp(rules.regex), rules.customMessage)),
  ];

  modifiers.forEach((modify) => modify());

  return schema;
}
