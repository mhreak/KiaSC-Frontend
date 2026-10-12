import { FilterConfig } from "@/components/filterFormBuilder/types";

export const discountReportFilterConfig: FilterConfig = [
  {
    id: "athlete",
    label: "ورزشکار",
    type: "text",
  },
  {
    id: "course",
    label: "دوره",
    type: "text",
  },
  {
    id: "status",
    label: "وضعیت ثبت نام",
    type: "select",
    options: [
      {
        value: "removed",
        label: "حذف شده",
      },
      {
        value: "submitting",
        label: "در حال ثبت نام",
      },
      {
        value: "submitted",
        label: "ثبت نام نهایی",
      },
    ],
  },
];
