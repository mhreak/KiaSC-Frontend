import { FormConfig } from "@/components/formBuilder/types";

export const personFileFormConfig: FormConfig = [
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
        label: "فرد",
        type: "select",
        required: true,
      },
      {
        id: "sportDiscipline",
        label: "نام فایل",
        type: "text",
        required: true,
      },
      {
        id: "decription",
        label: "توضیحات",
        type: "textarea",
        colSpan: 12,
      },
      {
        id: "file",
        label: "آپلود فایل",
        type: "file",
      },
    ],
  },
];
