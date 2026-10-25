import { FilterConfig } from "@/components/filterFormBuilder/types";

export const ageGroupFilterConfig: FilterConfig = [
  {
    id: "FilterAgeGroupStartDateFrom",
    label: "آغاز محدوده از",
    type: "date",
  },
  {
    id: "FilterAgeGroupStartDateTo",
    label: "آغاز محدوده تا",
    type: "date",
  },
  {
    id: "FilterAgeGroupEndDateFrom",
    label: "پایان محدوده از",
    type: "date",
  },
  {
    id: "FilterAgeGroupEndDateTo",
    label: "پایان محدوده تا",
    type: "date",
  },
];
