import { FormConfig } from "@/components/formBuilder/types";

export const addInstallmentFormConfig: FormConfig = [
  {
    id: "basic-info",
    type: "section",
    title: "ایجاد قسط",
    icon: "HandCoins",
    wrapperVariant: "card",
    headerClassName: "text-green-400",
    children: [
      {
        id: "dueDate",
        label: "تاریخ سررسید",
        type: "date",
        required: true,
        colSpan: 6,
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
        required: true,
        colSpan: 6,
      },
      {
        id: "settlementDate",
        label: "تاریخ سررسید",
        type: "date",
        required: true,
        colSpan: 6,
      },
    ],
  },
];

export const editInstallmentFormConfig: FormConfig = [
  {
    id: "basic-info",
    type: "section",
    title: "ویرایش قسط",
    icon: "HandCoins",
    wrapperVariant: "card",
    headerClassName: "text-orange-500",
    children: [
      {
        id: "dueDate",
        label: "تاریخ سررسید",
        type: "date",
        required: true,
        colSpan: 6,
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
        required: true,
        colSpan: 6,
      },
      {
        id: "settlementDate",
        label: "تاریخ سررسید",
        type: "date",
        required: true,
        colSpan: 6,
      },
    ],
  },
];
