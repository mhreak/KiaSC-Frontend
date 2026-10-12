import { FilterConfig } from "@/components/filterFormBuilder/types";

export const teamSelectFilterConfig: FilterConfig = [
  {
    id: "name",
    label: "نام تیم",
    type: "text",
  },
  {
    id: "sport",
    label: "رشتۀ ورزشی",
    type: "select",
  },
  {
    id: "gender",
    label: "جنسیت",
    type: "select",
    options: [
      { label: "مرد", value: "male" },
      { label: "زن", value: "female" },
    ],
  },
];
