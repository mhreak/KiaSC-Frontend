import { FormConfig } from "@/components/formBuilder/types";

export const installmentAddItemFormConfig: FormConfig = [
  {
    id: "basic-info",
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

export const installmentEditItemFormConfig: FormConfig = [
  {
    id: "basic-info",
    type: "section",
    title: "ویرایش آیتم قسط",
    icon: "HandCoins",
    wrapperVariant: "card",
    headerClassName: "text-orange-400",
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
