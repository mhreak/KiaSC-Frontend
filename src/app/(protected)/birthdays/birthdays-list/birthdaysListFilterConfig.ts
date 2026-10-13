import { FilterConfig } from "@/components/filterFormBuilder/types";

export const birthdaysListFilterConfig: FilterConfig = [
  {
    id: "birthDate",
    label: "تاریخ تولد",
    type: "date-range",
  },
  {
    id: "athlete",
    label: "نام و نام خانوادگی",
    type: "text",
  },
  {
    id: "nationalCode",
    label: "کد ملی",
    type: "text",
  },
  {
    id: "gift",
    label: "هدیه تولد",
    type: "text",
  },
];
