import { FilterConfig } from "@/components/filterFormBuilder/types";

export const personInTeamFilterConfig: FilterConfig = [
  {
    id: "personId",
    label: "ورزشکار",
    type: "text",
  },
  {
    id: "role",
    label: "نقش",
    type: "select",
  },
];
