import { FormConfig } from "@/components/formBuilder/types";

export const courseFormConfig: FormConfig = [
  {
    id: "course-info",
    title: "اطلاعات دوره آموزشی",
    type: "section",
    wrapperVariant: "card",
    headerClassName: "text-blue-400",
    icon: "NotepadText",
    children: [
      {
        id: "courseName",
        label: "نام دوره آموزشی",
        type: "text",
        required: true,
      },
      {
        id: "sport",
        label: "رشته ورزشی",
        type: "select",
        required: true,
      },
      {
        id: "term",
        label: "ترم",
        type: "text",
        required: true,
      },
      {
        id: "gender",
        label: "جنسیت",
        type: "select",
        options: [
          { value: "1", label: "زن" },
          { value: "2", label: "مرد" },
        ],
        required: true,
      },
      {
        id: "dfgs",
        label: "ورزشگاه",
        type: "select",
        required: true,
      },
      {
        id: "adf",
        label: "زمین (سالن)",
        type: "select",
        required: true,
      },
      {
        id: "ahrec",
        label: "ظرفیت ثبت نام",
        type: "number",
        required: true,
      },
    ],
  },
  {
    id: "date-info",
    title: "اطلاعات تاریخ",
    type: "section",
    wrapperVariant: "card",
    headerClassName: "text-rose-400",
    icon: "CalendarDays",
    children: [
      {
        id: "gfad.m",
        label: "تاریخ آغاز ثبت نام",
        type: "date",
      },
      {
        id: "ad",
        label: "تاریخ پایان ثبت نام",
        type: "date",
      },
      {
        id: "hrt",
        label: "تاریخ آغاز دوره",
        type: "date",
      },
      {
        id: "tyedrg",
        label: "تاریخ پایان دوره",
        type: "date",
      },
    ],
  },
  {
    id: "sms-info",
    title: "پیامک غیبت",
    type: "section",
    wrapperVariant: "card",
    icon: "MessagesCircle",
    headerClassName: "text-orange-400",
    children: [
      {
        id: "sdijl",
        label: "ارسال پیامک غیبت",
        type: "switch",
      },
      {
        id: "gcver",
        label: "حداکثر سن ارسال پیامک غیبت",
        type: "number",
      },
    ],
  },
  {
    id: "payment-info",
    title: "اطلاعات پرداخت",
    type: "section",
    wrapperVariant: "card",
    headerClassName: "text-violet-500",
    icon: "CreditCard",
    children: [
      {
        id: "erdfh",
        label: "هزینه ثبت نام",
        type: "amount",
      },
      {
        id: "ybn",
        label: "اجازه پرداخت آنلاین",
        type: "switch",
      },
      {
        id: "gkj",
        label: "اجازه پرداخت نقدی",
        type: "switch",
      },
      {
        id: "tusf",
        label: "اجازه پرداخت با چک",
        type: "switch",
      },
      {
        id: "jyfvvff",
        label: "اجازه پرداخت قسطی",
        type: "switch",
      },
      {
        id: "ygeeee",
        label: "مبلغ اولین قسط",
        type: "amount",
      },
    ],
  },
  {
    id: "dicount-info",
    title: "کد تخفیف",
    type: "section",
    wrapperVariant: "card",
    headerClassName: "text-red-500",
    icon: "Percent",
    children: [
      {
        id: "ohjgkm",
        label: "اعمال کد تخفیف (پرداخت آنلاین)",
        type: "switch",
      },
      {
        id: "ohjgkme",
        label: "اعمال کد تخفیف (پرداخت نقدی)",
        type: "switch",
      },
      {
        id: "lkihjfklg",
        label: "اعمال کد تخفیف (پرداخت چک)",
        type: "switch",
      },
      {
        id: "lkdfj;",
        label: "اعمال کد تخفیف (پرداخت قسطی)",
        type: "switch",
      },
    ],
  },
  {
    id: "karname-info",
    title: "کارنامه",
    type: "section",
    wrapperVariant: "card",
    headerClassName: "text-teal-500",
    icon: "BookBookmark",
    children: [
      {
        id: "asfa",
        label: "کارنامه دارد",
        type: "switch",
      },
      {
        id: "thfth",
        label: "تاریخ انتشار کارنامه",
        type: "date",
      },
      {
        id: "lolg",
        label: "تاریخ پایان کارنامه",
        type: "date",
      },
    ],
  },
  {
    id: "sayer-info",
    title: "سایر اطلاعات",
    type: "section",
    wrapperVariant: "card",
    headerClassName: "text-blue-500",
    icon: "Ellipsis",
    children: [
      {
        id: "rfvgj",
        label: "اجازه استفاده از کیف پول",
        type: "switch",
      },
      {
        id: "rfvlilikl;gj",
        label: "قالب ارزیابی فعالیت",
        type: "select",
      },
      {
        id: "jyguyk",
        label: "شرایط و قوانین دارد",
        type: "switch",
      },
      {
        id: "inv",
        label: "",
        type: "invisible",
      },
      {
        id: "klkk",
        label: "شرایط و قوانین ",
        type: "textarea",
        colSpan: 12,
      },
    ],
  },
];
