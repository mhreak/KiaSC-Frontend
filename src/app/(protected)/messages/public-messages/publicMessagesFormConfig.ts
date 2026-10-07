import { FormConfig } from "@/components/formBuilder/types";

export const addPublicMessagesFormConfig: FormConfig = [
  {
    id: "basic-info",
    type: "section",
    title: "ارسال پیام",
    icon: "MessagesCircle",
    wrapperVariant: "card",
    headerClassName: "text-green-400",
    children: [
      {
        id: "title",
        label: "عنوان پیام",
        type: "text",
        required: true,
        colSpan: 6,
      },
      {
        id: "field",
        label: "رشتۀ ورزشی",
        type: "text",
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
        id: "sender",
        label: "ارسال‌کننده",
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

export const editPublicMessagesFormConfig: FormConfig = [
  {
    id: "basic-info",
    type: "section",
    title: "ویرایش پیام",
    icon: "MessagesCircle",
    wrapperVariant: "card",
    headerClassName: "text-orange-500",
    children: [
      {
        id: "title",
        label: "عنوان پیام",
        type: "text",
        required: true,
        colSpan: 6,
      },
      {
        id: "field",
        label: "رشتۀ ورزشی",
        type: "text",
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
        id: "sender",
        label: "ارسال‌کننده",
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
      {
        id: "status",
        label: "منتشر شده",
        type: "switch",
        required: false,
        colSpan: 6,
      },
    ],
  },
];
