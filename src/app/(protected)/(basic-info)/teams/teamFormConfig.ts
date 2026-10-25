import { FormConfig } from "@/components/formBuilder/types";

export const teamFormConfig: FormConfig = [
  {
    id: "TeamName",
    label: "نام تیم",
    type: "text",
    required: true,
  },
  {
    id: "SportId",
    label: "رشته ورزشی",
    type: "select",
    required: true,
  },
  {
    id: "Gender",
    label: "جنسیت",
    type: "select",
    required: true,
    options: [
      { value: "true", label: "مرد" },
      { value: "false", label: "زن" },
    ],
  },
];
