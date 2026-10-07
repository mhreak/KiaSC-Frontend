import { FilterConfig } from "@/components/filterFormBuilder/types";

export const athleteIntroducingChargeFilterConfig: FilterConfig = [
  {
    id: "ownerName",
    label: "نام و نام خانوادگی",
    type: "text",
  },
  {
    id: "nationalCode",
    label: "کد ملی",
    type: "text",
  },
  {
    id: "percentageFrom",
    label: "درصد از",
    type: "number",
  },
  {
    id: "percentageTo",
    label: "درصد تا",
    type: "number",
  },
];
