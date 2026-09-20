import { FormUIAdapter } from "../../core/ui-contracts";
import { ShadcnTextInput } from "./ShadcnTextInput";
import { ShadcnCheckbox } from "./ShadcnCheckbox";
import { ShadcnSelect } from "./ShadcnSelect";

export const shadcnUIAdapter: FormUIAdapter = {
  TextInput: ShadcnTextInput,
  Checkbox: ShadcnCheckbox,
  Select: ShadcnSelect,
};
