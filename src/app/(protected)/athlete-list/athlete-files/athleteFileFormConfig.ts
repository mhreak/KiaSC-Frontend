import { FormConfig } from "@/components/formBuilder/types";

export const athleteFileFormConfig: FormConfig = [
  {
    id: "file-info",
    title: "اطلاعات فایل",
    type: "section",
    wrapperVariant: "card",
    icon: "File",
    headerClassName: "text-sky-500",
    children: [
      {
        id: "fileType",
        label: "نوع فایل",
        type: "select",
      },
      {
        id: "sportDiscipline",
        label: "رشته ورزشی",
        type: "select",
      },
      {
        id: "term",
        label: "ترم",
        type: "select",
      },
      {
        id: "course",
        label: "دوره آموزشی",
        type: "select",
      },
      {
        id: "team",
        label: "تیم",
        type: "select",
      },
      {
        id: "genger",
        label: "جنسیت",
        type: "select",
        options: [
          { value: "1", label: "خانم" },
          { value: "2", label: "آقا" },
        ],
      },
      {
        id: "isActive",
        label: "فعال / غیرفعال",
        type: "switch",
        defaultValue: true,
      },
    ],
  },
];
