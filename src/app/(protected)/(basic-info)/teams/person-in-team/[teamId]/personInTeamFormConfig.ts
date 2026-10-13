import { FormConfig } from "@/components/formBuilder/types";

export const personInTeamFormConfig: FormConfig = [
  {
    id: "fullName",
    label: "نام و نام خانوادگی",
    type: "athleteSearch",
    required: true,
  },
  {
    id: "role",
    label: "نقش",
    type: "select",
    required: true,
  },
];
