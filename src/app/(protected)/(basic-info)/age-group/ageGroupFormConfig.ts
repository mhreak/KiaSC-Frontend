import { FormConfig } from "@/components/formBuilder/types";

export const ageGroupFormConfig: FormConfig = [
  {
    id: "name",
    label: "نام رده سنی",
    type: "text",
    required: true,
  },
  {
    id: "startDate",
    label: "تاریخ آغاز",
    type: "date",
    required: true,
  },
  {
    id: "endDate",
    label: "تاریخ پایان",
    type: "date",
    required: true,
  },
];
