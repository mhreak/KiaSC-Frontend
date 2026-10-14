import { FormConfig } from "@/components/formBuilder/types";

export const smsTemplateFormConfig: FormConfig = [
  {
    id: "name",
    label: "نام قالب",
    type: "text",
    readonly: true,
  },
  {
    id: "decription",
    label: "توضیحات",
    type: "text",
    readonly: true,
  },
  {
    id: "templateText",
    label: "متن قالب",
    type: "textarea",
    colSpan: 12,
  },
];
