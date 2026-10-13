import { FilterConfig } from "@/components/filterFormBuilder/types";

export const privateMessagesFilterConfig: FilterConfig = [
  {
    id: "sender",
    label: "ارسال‌کننده",
    type: "text",
  },
  {
    id: "receiver",
    label: "گیرنده",
    type: "text",
  },
  {
    id: "title",
    label: "عنوان پیام",
    type: "text",
  },
];
