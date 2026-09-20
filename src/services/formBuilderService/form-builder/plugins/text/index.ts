import { FormRegistry, FormFieldPlugin } from "../../core/registry";
import { TextField } from "./TextField";
import { createTextSchema } from "./createSchema";

export const TextFieldPlugin: FormFieldPlugin = {
  type: "text",
  component: TextField,
  toZodSchema: createTextSchema,
};

// Self-registering side effect
FormRegistry.register(TextFieldPlugin);

export { TextField };
