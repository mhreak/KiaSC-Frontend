import { FormConfig } from "@/components/formBuilder/types";

export const personExcelReportFormConfig: FormConfig = [
  {
    id: "general-info",
    title: "اطلاعات گزارش",
    type: "section",
    wrapperVariant: "card",
    headerClassName: "text-violet-400",
    icon: "FileText",
    children: [
      {
        id: "Gender",
        label: "جنسیت",
        type: "select",
        options: [
          { value: "", label: "مرد" },
          { value: "", label: "زن" },
        ],
      },
      {
        id: "adgah",
        label: "رده سنی",
        type: "select",
      },
      {
        id: "Geryhuhdfhnder",
        label: "رشته ورزشی",
        type: "select",
      },
      {
        id: "uuhh",
        label: "ترم",
        type: "termSelect",
      },
      {
        id: "Gendeeeer",
        label: "دوره آموزشی",
        type: "courseSelect",
      },
      {
        id: "Genardrrarger",
        label: "تیم",
        type: "teamSelect",
      },
    ],
  },
  {
    id: "general-info",
    title: "فیلد های خروجی اکسل را مشخص کنید",
    type: "section",
    wrapperVariant: "card",
    headerClassName: "text-pink-400",
    icon: "FileChartColumn",
    children: [
      {
        id: "check-0",
        label: "شناسه ورزشکار",
        type: "checkbox",
        colSpan: 4,
      },
      {
        id: "check-18",
        label: "نام",
        type: "checkbox",
        colSpan: 4,
      },
      {
        id: "check-2",
        label: "نام خانوادگی",
        type: "checkbox",
        colSpan: 4,
      },
      {
        id: "check-1",
        label: "جنسیت",
        type: "checkbox",
        colSpan: 4,
      },
      {
        id: "check-3",
        label: "کد ملی",
        type: "checkbox",
        colSpan: 4,
      },
      {
        id: "check-5",
        label: "نام پدر",
        type: "checkbox",
        colSpan: 4,
      },
      {
        id: "check-4",
        label: "تاریخ تولد",
        type: "checkbox",
        colSpan: 4,
      },
      {
        id: "check-6",
        label: "تلفن ثابت",
        type: "checkbox",
        colSpan: 4,
      },
      {
        id: "check-8",
        label: "تلفن ثابت (۲)",
        type: "checkbox",
        colSpan: 4,
      },
      {
        id: "check-7",
        label: "تلفن همراه",
        type: "checkbox",
        colSpan: 4,
      },
      {
        id: "check-9",
        label: "ایمیل",
        type: "checkbox",
        colSpan: 4,
      },
      {
        id: "check-11",
        label: "آدرس",
        type: "checkbox",
        colSpan: 4,
      },
      {
        id: "check-10",
        label: "تلفن ثابت ولی",
        type: "checkbox",
        colSpan: 4,
      },
      {
        id: "check-12",
        label: "تلفن همراه ولی",
        type: "checkbox",
        colSpan: 4,
      },
      {
        id: "check-14",
        label: "سابقه ورزشی",
        type: "checkbox",
        colSpan: 4,
      },
      {
        id: "check-13",
        label: "کد معرفی",
        type: "checkbox",
        colSpan: 4,
      },
      {
        id: "check-15",
        label: "موجودی کیف پول",
        type: "checkbox",
        colSpan: 4,
      },
      {
        id: "check-17",
        label: "درصد پورسانت معرفی ورزشکاران",
        type: "checkbox",
        colSpan: 4,
      },
      {
        id: "check-16",
        label: "تاریخ ثبت",
        type: "checkbox",
        colSpan: 4,
      },
    ],
  },
];
