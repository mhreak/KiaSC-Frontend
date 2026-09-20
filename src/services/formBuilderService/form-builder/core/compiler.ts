import { z } from "zod";
import { FormRegistry } from "./registry";
import {
  FormDefinition,
  FormElementDefinition,
  FieldDefinition,
} from "./types";

/**
 * DYNAMIC ZOD SCHEMA COMPILER
 * Compiles a JSON form definition layout directly into a native Zod object.
 * Uses Pick<FormDefinition, "fields"> to allow recursive nested compilation safely.
 */
export function compileZodSchema(
  schema: Pick<FormDefinition, "fields">,
): z.ZodObject<any> {
  const shape: Record<string, z.ZodTypeAny> = {};

  // Flatten structural blocks out before mapping constraints to handle section nodes uniformly
  const flatFields = flattenElements(schema.fields);

  for (const node of flatFields) {
    // Determine schema mapping function based on plugin presence or explicit structural helpers
    const strategies = [
      () => FormRegistry.get(node.type)?.toZodSchema(node),
      () =>
        STRUCTURAL_COMPILERS[node.type as keyof typeof STRUCTURAL_COMPILERS]?.(
          node,
        ),
      () => z.any(), // Final fallback strategy to prevent system rendering errors
    ];

    // Find the first valid resolution strategy execution context
    const fieldSchema = strategies
      .map((strategy) => strategy())
      .find((result) => result !== undefined) as z.ZodTypeAny;

    // Apply strict optionality checking polymorphically bypassing conditional statements
    const schemaModifiers = {
      true: () => fieldSchema,
      false: () => fieldSchema.optional().nullable(),
    };

    const isRequiredKey = String(!!node.required) as "true" | "false";
    shape[node.name] = schemaModifiers[isRequiredKey]();
  }

  return z.object(shape);
}

/**
 * STRUCTURAL FIELD COMPILERS
 * Specialized strategies for recursively mapping deeply nested array or object structures
 */
const STRUCTURAL_COMPILERS = {
  object: (node: any) => compileZodSchema({ fields: node.fields }),
  array: (node: any) => z.array(compileZodSchema({ fields: node.fields })),
};

/**
 * UTILITY: STRUCTURAL COMPONENT FLATTENER
 * Extracts validation fields out of structural visual sections polymorphically.
 */
function flattenElements(elements: FormElementDefinition[]): FieldDefinition[] {
  return elements.flatMap((element) => {
    const structuralMappers = {
      section: () => flattenElements((element as any).fields),
      field: () => [element as FieldDefinition],
    };

    // Determine type key: If type isn't 'section', it treats it as a standard validated field block
    const isSection = element.type === "section" ? "section" : "field";
    return structuralMappers[isSection]();
  });
}
