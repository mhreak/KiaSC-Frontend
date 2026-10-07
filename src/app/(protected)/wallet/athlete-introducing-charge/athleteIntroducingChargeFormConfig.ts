import { FormConfig } from "@/components/formBuilder/types";

export const athleteIntroducingChargeFormConfig: FormConfig = [
  {
    id: "basic-info",
    type: "section",
    title: "ویرایش درصد",
    icon: "Wallet",
    wrapperVariant: "card",
    headerClassName: "text-orange-500",
    children: [
      {
        id: "introducingPercentage",
        label: "درصد پاداش معرفی",
        type: "number",
        required: true,
        colSpan: 6,
      },
    ],
  },
];
