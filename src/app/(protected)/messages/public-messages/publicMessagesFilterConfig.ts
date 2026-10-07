import { FilterConfig } from "@/components/filterFormBuilder/types";

export const publicMessagesFilterConfig: FilterConfig = [
  {
    id: "field",
    label: "ورزش",
    type: "text",
  },
  {
    id: "term",
    label: "ترم",
    type: "text",
  },
  {
    id: "course",
    label: "دوره",
    type: "text",
  },
  {
    id: "team",
    label: "تیم",
    type: "text",
  },
  {
    id: "sender",
    label: "ارسال‌کننده",
    type: "text",
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
  },
  {
    id: "title",
    label: "عنوان پیام",
    type: "text",
  },
];
