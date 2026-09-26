import { FilterConfig } from "@/components/filterFormBuilder/types";

export const athleteInsuranceListFilterConfig: FilterConfig = [
  {
    id: "dateFrom",
    label: "تاریخ اعتبار از",
    type: "date",
  },
  {
    id: "dateTo",
    label: "تاریخ اعتبار تا",
    type: "date",
  },
  {
    id: "name",
    label: "نام و نام خانوادگی",
    type: "text",
  },
  {
    id: "nationalCode",
    label: "کد ملی",
    type: "number",
  },
  {
    id: "asdflkji;",
    label: "وضعیت تمدید",
    type: "select",
    options: [
      { value: "1", label: "تمدید" },
      { value: "2", label: "انصراف از تمدید" },
    ],
  },
];
