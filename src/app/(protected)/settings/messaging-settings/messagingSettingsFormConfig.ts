import { FormConfig } from "@/components/formBuilder/types";

export const messagingSettingsFormConfig: FormConfig = [
  {
    id: "messaging-info",
    title: "گزینه‌های ارسال",
    type: "section",
    wrapperVariant: "card",
    headerClassName: "text-rose-400",
    icon: "MessageCircleCheck",
    children: [
      {
        id: "signInMessage",
        label: "ارسال پیامک هنگام ثبت نام",
        type: "switch",
      },
      {
        id: "paymentMessage",
        label: "ارسال پیامک هنگام پرداخت",
        type: "switch",
      },
      {
        id: "privateMessage",
        label: "ارسال پیامک پیام خصوصی",
        type: "switch",
      },
    ],
  },
  {
    id: "managing-info",
    title: "مدیریت",
    type: "section",
    wrapperVariant: "card",
    headerClassName: "text-sky-400",
    icon: "MessageCircleMore",
    children: [
      {
        id: "managerNumber",
        label: "شماره موبایل مدیریت",
        type: "number",
      },
      {
        id: "installmentMessage",
        label: "ارسال پیامک تعویق قسط",
        type: "switch",
      },
      {
        id: "managerInstallmentMessage",
        label: "ارسال پیامک تعویق قسط برای مدیریت",
        type: "switch",
      },
    ],
  },
];
