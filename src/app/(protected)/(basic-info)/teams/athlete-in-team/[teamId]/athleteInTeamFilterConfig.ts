import { FilterConfig } from "@/components/filterFormBuilder/types";

export const athleteInTeamFilterConfig: FilterConfig = [
  {
    id: "athleteId",
    label: "ورزشکار",
    type: "text",
  },
  {
    id: "role",
    label: "نقش",
    type: "select",
  },
];
