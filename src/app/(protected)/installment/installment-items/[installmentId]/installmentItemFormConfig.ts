import { FormConfig } from "@/components/formBuilder/types";

export const installmentItemFormConfig: FormConfig = [
  {
    id: "installment-info",
    type: "section",
    title: "ایجاد آیتم قسط",
    icon: "HandCoins",
    wrapperVariant: "card",
    headerClassName: "text-green-500",
    children: [
      {
        id: "for",
        label: "بابت",
        type: "select",
        options: [
          {
            value: "option-1",
            label: "...",
          },
        ],
        required: true,
        colSpan: 6,
      },
      {
        id: "price",
        label: "مبلغ (تومان)",
        type: "number",
        required: true,
        colSpan: 6,
      },
    ],
  },
];
