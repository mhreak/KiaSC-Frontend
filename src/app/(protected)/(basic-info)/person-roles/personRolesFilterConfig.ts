import { FilterConfig } from "@/components/filterFormBuilder/types";

export const personRolesFilterConfig: FilterConfig = [
  {
    id: "FilterRoleName",
    label: "نام نقش",
    type: "text",
  },
  {
    id: "FilterSportId",
    label: "رشته ورزشی",
    type: "select",
  },
];
