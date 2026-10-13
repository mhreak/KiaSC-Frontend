import { FormConfig } from "@/components/formBuilder/types";

export const teamFormConfig: FormConfig = [
  {
    id: "name",
    label: "نام تیم",
    type: "text",
    required: true,
  },
  {
    id: "fgsdfg",
    label: "رشته ورزشی",
    type: "select",
    required: true,
  },
  {
    id: "uikyu",
    label: "جنسیت",
    type: "select",
    required: true,
    options: [
      { value: "1", label: "مرد" },
      { value: "2", label: "زن" },
    ],
  },
];
