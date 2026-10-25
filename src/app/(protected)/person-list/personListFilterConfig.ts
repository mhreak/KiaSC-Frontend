import { FilterConfig } from "@/components/filterFormBuilder/types";

export const personListFilterConfig: FilterConfig = [
  {
    id: "FilterFullName",
    label: "نام و نام خانوادگی",
    type: "text",
  },
  {
    id: "FilterNationalCode",
    label: "کد ملی",
    type: "number",
  },
  {
    id: "FilterMobile",
    label: "تلفن همراه",
    type: "number",
  },
  {
    id: "FilterGender",
    label: "جنسیت",
    type: "select",
    options: [
      { value: "true", label: "آقا" },
      { value: "false", label: "خانم" },
    ],
  },
];
