import { FilterConfig } from "@/components/filterFormBuilder/types";

export const athleteListFilterConfig: FilterConfig = [
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
    id: "FilterAgeGroupId",
    label: "رده سنی",
    type: "select",
  },
];
