import { FormConfig } from "@/components/formBuilder/types";

export const promoTypeFormConfig: FormConfig = [
  {
    id: "name",
    label: "نام",
    type: "text",
    required: true,
  },
  {
    id: "status",
    label: "فعال",
    type: "switch",
    defaultValue: true,
  },
];
