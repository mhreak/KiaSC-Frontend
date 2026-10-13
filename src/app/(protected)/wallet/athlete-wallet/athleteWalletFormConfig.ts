import { FormConfig } from "@/components/formBuilder/types";

export const editSomeAthleteWalletFormConfig: FormConfig = [
  {
    id: "basic-info",
    type: "section",
    title: "ویرایش آیتم ها",
    icon: "Wallet",
    wrapperVariant: "card",
    headerClassName: "text-green-400",
    children: [
      {
        id: "field",
        label: "رشته ورزشی",
        type: "select",
        required: false,
        colSpan: 6,
      },
      {
        id: "term",
        label: "ترم",
        type: "text",
        required: false,
        colSpan: 6,
      },
      {
        id: "course",
        label: "دورۀ آموزشی",
        type: "text",
        required: false,
        colSpan: 6,
      },
      {
        id: "team",
        label: "تیم",
        type: "text",
        required: false,
        colSpan: 6,
      },
      {
        id: "gender",
        label: "جنسیت",
        type: "select",
        options: [
          { label: "مرد", value: "male" },
          { label: "زن", value: "female" },
        ],
        required: false,
        colSpan: 6,
      },
      {
        id: "priceChange",
        label: "میزان تغییر قیمت",
        type: "number",
        required: true,
        colSpan: 6,
      },
      {
        id: "direction",
        label: "افزایش یا کاهش",
        type: "switch",
        required: false,
        colSpan: 6,
      },
    ],
  },
];

export const editAthleteWalletFormConfig: FormConfig = [
  {
    id: "basic-info",
    type: "section",
    title: "ویرایش موجودی کیف پول",
    icon: "Wallet",
    wrapperVariant: "card",
    headerClassName: "text-orange-500",
    children: [
      {
        id: "amount",
        label: "موجودی",
        type: "number",
        required: true,
        colSpan: 6,
      },
      {
        id: "description",
        label: "توضیحات",
        type: "textarea",
        required: false,
        colSpan: 6,
      },
    ],
  },
];
