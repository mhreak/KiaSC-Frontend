import { FormConfig } from "@/components/formBuilder/types";

export const courseSessionFormConfig: FormConfig = [
  {
    id: "CourseClassId",
    label: "کلاس",
    type: "select",
  },
  {
    id: "SessionDate",
    label: "تاریخ جلسه",
    type: "date",
  },
  {
    id: "SessionStartTime",
    label: "تاریخ آغاز جلسه",
    type: "date",
  },
  {
    id: "SessionEndTime",
    label: "تاریخ پایان جلسه",
    type: "date",
  },
  {
    id: "SessionState",
    label: "وضعیت جلسه",
    type: "text",
  },
];
