export { FormRegistry } from "./core/registry";
export { compileZodSchema } from "./core/compiler";
export { FormRenderer } from "../form-renderer";
import "./plugins/text";

export type { FieldComponentProps, FormFieldPlugin } from "./core/registry";

export type {
  FormDefinition,
  FormElementDefinition,
  FieldDefinition,
  SectionDefinition,
  InferFormValues,
} from "./core/types";
