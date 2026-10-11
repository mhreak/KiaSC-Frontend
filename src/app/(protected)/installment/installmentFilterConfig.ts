import { FilterConfig } from "@/components/filterFormBuilder/types";

export const installmentFilterConfig: FilterConfig = [
  {
    id: "term",
    label: "ترم",
    type: "text",
  },
  {
    id: "course",
    label: "دوره",
    type: "text",
  },
  {
    id: "priceFrom",
    label: "مبلغ از",
    type: "text",
  },
  {
    id: "priceTo",
    label: "مبلغ تا",
    type: "text",
  },
  {
    id: "dueDate",
    label: "تاریخ سررسید",
    type: "date-range",
  },
  {
    id: "settlementDate",
    label: "تاریخ تسویه",
    type: "date-range",
  },
  {
    id: "status",
    label: "وضعیت",
    type: "select",
    options: [
      {
        value: "settled",
        label: "تسویه شده",
      },
      {
        value: "unsettled",
        label: "تسویه نشده",
      },
      {
        value: "deleted",
        label: "حذف شده",
      },
    ],
  },
];
