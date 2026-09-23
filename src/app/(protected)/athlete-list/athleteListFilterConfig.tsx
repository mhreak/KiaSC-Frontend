import { FilterConfig } from "@/components/filterFormBuilder/types";

export const athleteListFilterConfig: FilterConfig = [
  {
    id: "firstName",
    label: "نام",
    type: "text",
  },
  {
    id: "lastName",
    label: "نام خانوادگی",
    type: "text",
  },
  {
    id: "nationalCode",
    label: "کد ملی",
    type: "number",
  },
];
