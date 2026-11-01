import { FormConfig } from "@/components/formBuilder/types";

export const athleteInTeamFormConfig: FormConfig = [
  {
    id: "AthleteId",
    label: "نام و نام خانوادگی",
    type: "athleteSearch",
    required: true,
  },
  {
    id: "AthleteRoleId",
    label: "نقش",
    type: "select",
    required: true,
  },
];
