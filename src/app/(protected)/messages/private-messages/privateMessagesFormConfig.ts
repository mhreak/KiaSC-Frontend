import { FormConfig } from "@/components/formBuilder/types";

export const privateMessagesFormConfig: FormConfig = [
  {
    id: "basic-info",
    type: "section",
    title: "ارسال پیام",
    icon: "MessagesCircle",
    wrapperVariant: "card",
    headerClassName: "text-green-400",
    children: [
      {
        id: "sender",
        label: "ارسال‌کننده",
        type: "text",
        required: false,
        colSpan: 6,
      },
      {
        id: "receiver",
        label: "گیرنده",
        type: "text",
        required: true,
        colSpan: 6,
      },
      {
        id: "title",
        label: "عنوان پیام",
        type: "text",
        required: true,
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
