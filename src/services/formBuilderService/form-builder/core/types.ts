import { z } from "zod";

/**
 * 1. SUPPORTED PRIMITIVE & STRUCTURAL FIELD TYPES
 * Explicitly maps all requested functional controls and structural types
 */
export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "email"
  | "password"
  | "checkbox"
  | "switch"
  | "select"
  | "multiselect"
  | "async-select"
  | "radio"
  | "date"
  | "datetime"
  | "time"
  | "file"
  | "image"
  | "array"
  | "object";

/**
 * 2. CONDITIONAL RENDERING RULES
 * Strongly typed operators for evaluating values at runtime
 */
export interface Condition<TKey extends string = string> {
  field: TKey;
  operator:
    | "equals"
    | "notEquals"
    | "contains"
    | "filled"
    | "empty"
    | "greaterThan"
    | "lessThan";
  value?: unknown;
}

/**
 * 3. CORE FIELD VALIDATION CONFIGURATION
 */
export interface ValidationRule {
  min?: number;
  max?: number;
  regex?: string;
  customMessage?: string;
}

/**
 * 4. FIELD DEFINITION (DISCRIMINATED UNIONS)
 * Maps out structural fields versus standard data-collecting fields
 */
export interface BaseFieldDefinition<
  TType extends FieldType = FieldType,
  TProps = Record<string, unknown>,
> {
  id: string;
  type: TType;
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  validation?: ValidationRule;
  props?: TProps;
  conditions?: Condition[];
}

export interface ObjectFieldDefinition extends BaseFieldDefinition<"object"> {
  fields: FormElementDefinition[];
}

export interface ArrayFieldDefinition extends BaseFieldDefinition<"array"> {
  fields: FormElementDefinition[]; // Layout templates repeated per row
}

export type FieldDefinition =
  | BaseFieldDefinition<Exclude<FieldType, "object" | "array">>
  | ObjectFieldDefinition
  | ArrayFieldDefinition;

/**
 * 5. SECTIONS & STRUCTURAL LAYOUT DEFINITIONS
 */
export interface SectionDefinition {
  id: string;
  type: "section";
  title?: string;
  description?: string;
  className?: string; // Custom layouts via Tailwind classes
  fields: FormElementDefinition[];
}

// // Every possible element allowed inside a schema layer
// export type FormElementDefinition = FieldDefinition | SectionDefinition;

/**
 * 6. FORM DEFINITION SCHEMA ROOT
 */
export interface FormDefinition {
  id: string;
  title?: string;
  fields: FormElementDefinition[];
}

/**
 * 7. PLUGIN DEFINITION CONTRACT
 * Enforces how custom extensions attach UI configurations to Zod mappings
 */
export interface PluginDefinition<TType extends string = string, TProps = any> {
  type: TType;
  toZodSchema: (config: BaseFieldDefinition<any, TProps>) => z.ZodTypeAny;
  // Type-safe placeholder for the UI engine token
  component: unknown;
}

/**
 * 8. ADVANCED TYPE INFERENCE (InferFormValues)
 * Deeply maps the recursive JSON structure down into a concrete TypeScript type compile-time safe contract.
 */
type FlattenElements<T extends readonly unknown[]> = T extends readonly [
  infer Head,
  ...infer Tail,
]
  ? Head extends SectionDefinition
    ? [...FlattenElements<Head["fields"]>, ...FlattenElements<Tail>]
    : [Head, ...FlattenElements<Tail>]
  : [];

type MapFieldArrayToTuple<T extends readonly unknown[]> =
  FlattenElements<T> extends infer Flattened extends readonly unknown[]
    ? {
        [K in Flattened[number] as K extends FieldDefinition
          ? K["name"]
          : never]: K extends ObjectFieldDefinition
          ? InferFormValues<{ fields: K["fields"] }>
          : K extends ArrayFieldDefinition
            ? Array<InferFormValues<{ fields: K["fields"] }>>
            : K extends BaseFieldDefinition<"checkbox" | "switch">
              ? boolean
              : K extends BaseFieldDefinition<"number">
                ? number
                : K extends BaseFieldDefinition<"multiselect">
                  ? string[]
                  : K extends BaseFieldDefinition<"date" | "datetime">
                    ? Date
                    : K extends BaseFieldDefinition<"file" | "image">
                      ? any
                      : string; // Default fallback for text, textarea, email, password, select, radio, time
      }
    : never;

export type InferFormValues<TFormDef extends Pick<FormDefinition, "fields">> =
  MapFieldArrayToTuple<TFormDef["fields"]> extends infer O
    ? { [K in keyof O]: O[K] }
    : never;

// Update the layout blocks in your types schema file:

export type LayoutType = "grid" | "tabs" | "accordion" | "section" | "wrapper";

export interface BaseLayoutDefinition {
  id: string;
  type: LayoutType;
  className?: string; // Custom container styles, custom wrappers, or utility injection
  props?: Record<string, any>;
}

export interface GridLayoutDefinition extends BaseLayoutDefinition {
  type: "grid";
  // e.g., { default: "1", md: "2", lg: "4" } for responsive grid columns mapping
  columns?:
    | string
    | { default?: string; sm?: string; md?: string; lg?: string; xl?: string };
  fields: FormElementDefinition[];
}

export interface TabItem {
  id: string;
  value: string;
  label: string;
  fields: FormElementDefinition[];
}

export interface TabsLayoutDefinition extends BaseLayoutDefinition {
  type: "tabs";
  defaultValue?: string;
  items: TabItem[];
}

export interface AccordionItem {
  id: string;
  value: string;
  trigger: string;
  fields: FormElementDefinition[];
}

export interface AccordionLayoutDefinition extends BaseLayoutDefinition {
  type: "accordion";
  collapsible?: boolean;
  multiple?: boolean;
  items: AccordionItem[];
}

export interface SectionLayoutDefinition extends BaseLayoutDefinition {
  type: "section";
  title?: string;
  description?: string;
  fields: FormElementDefinition[];
}

export interface CustomWrapperLayoutDefinition extends BaseLayoutDefinition {
  type: "wrapper";
  variant?: string; // Evaluated by custom layout providers
  fields: FormElementDefinition[];
}

export type LayoutElementDefinition =
  | GridLayoutDefinition
  | TabsLayoutDefinition
  | AccordionLayoutDefinition
  | SectionLayoutDefinition
  | CustomWrapperLayoutDefinition;

// Union definition updating the structural configuration landscape
export type FormElementDefinition =
  | FieldDefinition
  | LayoutElementDefinition
  | SectionDefinition;
