import { FormConfig } from "@/components/formBuilder/types";

export const ageGroupFormConfig: FormConfig = [
  {
    id: "AgeGroupName",
    label: "نام رده سنی",
    type: "text",
    required: true,
  },
  {
    id: "AgeGroupStartDate",
    label: "تاریخ آغاز",
    type: "date",
    required: true,
  },
  {
    id: "AgeGroupEndDate",
    label: "تاریخ پایان",
    type: "date",
    required: true,
  },
];
