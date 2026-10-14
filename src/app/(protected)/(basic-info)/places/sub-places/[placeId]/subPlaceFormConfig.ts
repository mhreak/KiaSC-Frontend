import { FormConfig } from "@/components/formBuilder/types";

export const subPlaceFormConfig: FormConfig = [
  {
    id: "name",
    label: "نام زمین",
    type: "text",
    required: true,
  },
  {
    id: "roofed",
    label: "مسقف",
    type: "switch",
    defaultValue: true,
  },
  {
    id: "status",
    label: "وضعیت",
    type: "switch",
    defaultValue: true,
  },
];
