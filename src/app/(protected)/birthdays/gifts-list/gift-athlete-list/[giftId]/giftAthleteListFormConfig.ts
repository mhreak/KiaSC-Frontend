import { FormConfig } from "@/components/formBuilder/types";

export const giftAthleteListFormConfig: FormConfig = [
  {
    id: "gift-info",
    type: "section",
    title: "اطلاعات هدیه تولد",
    icon: "Cake",
    wrapperVariant: "card",
    headerClassName: "text-orange-500",
    children: [
      {
        id: "gift",
        label: "هدیه تولد",
        type: "text",
        required: true,
        colSpan: 6,
      },
    ],
  },
];
