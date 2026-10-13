import { FormConfig } from "@/components/formBuilder/types";

export const giftsListFormConfig: FormConfig = [
  {
    id: "gift-info",
    type: "section",
    title: "اطلاعات هدیه تولد",
    icon: "Cake",
    wrapperVariant: "card",
    headerClassName: "text-orange-500",
    children: [
      {
        id: "name",
        label: "نام هدیه",
        type: "text",
        required: true,
        colSpan: 6,
      },
      {
        id: "price",
        label: "مبلغ شارژ کیف پول",
        type: "number",
        required: true,
        colSpan: 6,
      },
      {
        id: "status",
        label: "فعال",
        type: "switch",
        required: false,
        colSpan: 6,
      },
    ],
  },
];
