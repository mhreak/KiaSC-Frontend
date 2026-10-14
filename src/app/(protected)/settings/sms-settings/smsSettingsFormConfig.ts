import { FormConfig } from "@/components/formBuilder/types";

export const smsSettingsFormConfig: FormConfig = [
  {
    id: "sms-info",
    title: "سرویس پیامک",
    type: "section",
    wrapperVariant: "card",
    headerClassName: "text-rose-400",
    icon: "MessagesCircle",
    children: [
      {
        id: "username",
        label: "نام کاربری پنل پیامک",
        type: "text",
        required: true,
      },
      {
        id: "password",
        label: "رمز عبور پنل پیامک",
        type: "text",
        required: true,
      },
      {
        id: "senderNumber",
        label: "شمارۀ ارسال‌کنندۀ پیامک",
        type: "number",
        required: true,
      },
    ],
  },
];
