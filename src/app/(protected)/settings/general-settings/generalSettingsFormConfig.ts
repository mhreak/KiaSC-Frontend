import { FormConfig } from "@/components/formBuilder/types";

export const generalSettingsFormConfig: FormConfig = [
  {
    id: "reward-info",
    title: "پاداش‌ها",
    type: "section",
    wrapperVariant: "card",
    headerClassName: "text-rose-400",
    icon: "Gift",
    children: [
      {
        id: "athleteIntroducingPercentage",
        label: "درصد پیش‌فرض پاداش معرفی (ورزشکاران)",
        type: "number",
        required: true,
      },
      {
        id: "personIntroducingPercentage",
        label: "درصد پیش‌فرض پاداش معرفی (افراد)",
        type: "number",
        required: true,
      },
      {
        id: "birthdayGift",
        label: "هدیه تولد پیش‌فرض",
        type: "select",
      },
    ],
  },
  {
    id: "insurance-info",
    title: "بیمه",
    type: "section",
    wrapperVariant: "card",
    headerClassName: "text-sky-400",
    icon: "FileUser",
    children: [
      {
        id: "insuranceStatus",
        label: "وضعیت پیش‌فرض تمدید بیمۀ ورزشکاران",
        type: "select",
        options: [
          { value: 1, label: "تمدید" },
          { value: 2, label: "انصراف از تمدید" },
        ],
      },
      {
        id: "insuranceRenewalTime",
        label: "مهلت یادآوری تمدید بیمۀ ورزشکاران",
        type: "number",
        required: true,
      },
    ],
  },
];
