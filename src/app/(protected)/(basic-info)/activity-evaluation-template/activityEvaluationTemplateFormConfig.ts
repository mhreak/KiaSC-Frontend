import { FormConfig } from "@/components/formBuilder/types";

export const activityEvaluationTemplateFormConfig: FormConfig = [
  {
    id: "basic-info",
    type: "section",
    title: "اطلاعات قالب ارزیابی فعالیت",
    wrapperVariant: "card",
    headerClassName: "text-rose-400",
    icon: "NotepadText",
    children: [
      {
        id: "title",
        label: "عنوان",
        type: "text",
        required: true,
      },
      {
        id: "tsdh",
        label: "رشته ورزشی",
        type: "select",

        required: true,
      },
      {
        id: "jyjd",
        label: "فیلد مجموع دارد",
        type: "select",
        options: [
          { value: "true", label: "بله" },
          { value: "false", label: "خیر" },
        ],
        required: true,
      },
      {
        id: "fbf",
        label: "عنوان فیلد مجموع",
        type: "text",
      },
      {
        id: "kuygb",
        label: "آنالیز اتوماتیک",
        type: "select",
        options: [
          { value: "true", label: "بله" },
          { value: "false", label: "خیر" },
        ],
        required: true,
      },
      {
        id: "titdsdsle",
        label: "وضعیت",
        type: "switch",
        defaultValue: true,
      },
    ],
  },
];
