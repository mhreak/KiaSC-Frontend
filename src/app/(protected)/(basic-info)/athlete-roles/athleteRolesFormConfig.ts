import { FormConfig } from "@/components/formBuilder/types";

export const athleteRolesFormConfig: FormConfig = [
  {
    id: "roleName",
    label: "نام نقش",
    type: "text",
    required: true,
  },
  {
    id: "sport",
    label: "رشته ورزشی",
    type: "select",
    required: true,
  },
];
