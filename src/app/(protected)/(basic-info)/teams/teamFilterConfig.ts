import { FilterConfig } from "@/components/filterFormBuilder/types";

export const teamFilterConfig: FilterConfig = [
  {
    id: "FilterTeamName",
    label: "نام تیم",
    type: "text",
  },
  {
    id: "FilterSportId",
    label: "رشته ورزشی",
    type: "select",
  },
  {
    id: "FilterGender",
    label: "جنسیت",
    type: "select",
    options: [
      { value: "true", label: "مرد" },
      { value: "false", label: "زن" },
    ],
  },
];
