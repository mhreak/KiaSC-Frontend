import { FilterConfig } from "@/components/filterFormBuilder/types";

export const onlineTransactionsFilterConfig: FilterConfig = [
  {
    id: "course",
    label: "دوره",
    type: "text",
  },
  {
    id: "athlete",
    label: "ورزشکار",
    type: "text",
  },
  {
    id: "date",
    label: "تاریخ",
    type: "date-range",
  },
  {
    id: "status",
    label: "وضعیت",
    type: "select",
    options: [
      {
        value: "success",
        label: "موفق",
      },
      {
        value: "failed",
        label: "ناموفق",
      },
    ],
  },
];
