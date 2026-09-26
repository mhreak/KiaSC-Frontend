import { FilterConfig } from "@/components/filterFormBuilder/types";

export const athleteInsuranceExpiringFilterConfig: FilterConfig = [
  {
    id: "name",
    label: "نام و نام خانوادگی",
    type: "text",
  },
  {
    id: "nationalCode",
    label: "کد ملی",
    type: "number",
  },
];
