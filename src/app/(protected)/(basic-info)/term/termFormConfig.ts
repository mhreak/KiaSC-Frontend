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
        id: "TermName",
        label: "نام ترم",
        type: "text",
        required: true,
      },
      {
        id: "Year",
        label: "سال",
        type: "number",
        required: true,
      },
      {
        id: "SeasonNumber",
        label: "فصل",
        type: "select",
        required: true,
        options: [
          { value: 1, label: "بهار" },
          { value: 2, label: "تابستان" },
          { value: 3, label: "پاییز" },
          { value: 4, label: "زمستان" },
        ],
      },
      {
        id: "TermStartDate",
        label: "تاریخ آغاز ترم",
        type: "date",
      },
      {
        id: "TermFinishDate",
        label: "تاریخ پایان ترم",
        type: "date",
      },
    ],
  },
];
