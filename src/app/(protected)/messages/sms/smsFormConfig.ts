import { FormConfig } from "@/components/formBuilder/types";

export const smsFormConfig: FormConfig = [
  {
    id: "basic-info",
    type: "section",
    title: "ارسال پیام کوتاه",
    icon: "MessagesCircle",
    wrapperVariant: "card",
    headerClassName: "text-green-400",
    children: [
      {
        id: "athlete",
        label: "ورزشکار",
        type: "text",
        required: false,
        colSpan: 6,
      },
      {
        id: "field",
        label: "رشتۀ ورزشی",
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
          {
            value: "male",
            label: "مرد",
          },
          {
            value: "female",
            label: "زن",
          },
        ],
        required: false,
        colSpan: 6,
      },
      {
        id: "phoneNumbers",
        label: "شماره‌های اضافه",
        type: "text",
        required: false,
        colSpan: 6,
      },
      {
        id: "text",
        label: "متن پیام",
        type: "textarea",
        required: false,
        colSpan: 6,
      },
    ],
  },
];
