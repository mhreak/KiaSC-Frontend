import { FormConfig } from "@/components/formBuilder/types";

export const termFormConfig: FormConfig = [
  {
    id: "term-info",
    type: "section",
    title: "اطلاعات ترم",
    wrapperVariant: "card",
    headerClassName: "text-violet-400",
    icon: "CalendarDays",
    children: [
      {
        id: "name",
        label: "نام ترم",
        type: "text",
        required: true,
      },
      {
        id: "year",
        label: "سال",
        type: "number",
        required: true,
      },
      {
        id: "season",
        label: "فصل",
        type: "select",
        required: true,
        options: [
          { value: "1", label: "بهار" },
          { value: "2", label: "تابستان" },
          { value: "3", label: "پاییز" },
          { value: "4", label: "زمستان" },
        ],
      },
      {
        id: "adfgargh",
        label: "تاریخ آغاز ترم",
        type: "date",
      },
      {
        id: "ardgfdhrfvc",
        label: "تاریخ پایان ترم",
        type: "date",
      },
    ],
  },
];
