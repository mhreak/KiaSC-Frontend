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
        id: "CourseName",
        label: "نام دوره آموزشی",
        type: "text",
        required: true,
      },
      {
        id: "SportId",
        label: "رشته ورزشی",
        type: "select",
        required: true,
      },
      {
        id: "TermId",
        label: "ترم",
        type: "select",
        required: true,
      },
      {
        id: "Gender",
        label: "جنسیت",
        type: "select",
        options: [
          { value: "false", label: "خانم" },
          { value: "true", label: "آقا" },
        ],
        required: true,
      },
      {
        id: "PlaceId",
        label: "ورزشگاه",
        type: "select",
      },
      {
        id: "SubPlaceId",
        label: "زمین (سالن)",
        type: "select",
      },
      {
        id: "RegisterCapacity",
        label: "ظرفیت ثبت نام",
        type: "number",
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
        id: "RegisterStartDate",
        label: "تاریخ آغاز ثبت نام",
        type: "date",
      },
      {
        id: "RegisterEndDate",
        label: "تاریخ پایان ثبت نام",
        type: "date",
      },
      {
        id: "CourseStartDate",
        label: "تاریخ آغاز دوره",
        type: "date",
      },
      {
        id: "CourseEndDate",
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
        id: "SendAbsentSMS",
        label: "ارسال پیامک غیبت",
        type: "switch",
      },
      {
        id: "AbsentSMSMaxAge",
        label: "حداکثر سن ارسال پیامک غیبت",
        type: "number",
        required: (data) => (data.SendAbsentSMS ? true : false),
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
        id: "RegisterAmount",
        label: "هزینه ثبت نام",
        type: "amount",
        required: true,
      },
      {
        id: "AllowOnlinePay",
        label: "اجازه پرداخت آنلاین",
        type: "switch",
      },
      {
        id: "AllowCashPay",
        label: "اجازه پرداخت نقدی",
        type: "switch",
      },
      {
        id: "AllowPayWithCheque",
        label: "اجازه پرداخت با چک",
        type: "switch",
      },
      {
        id: "AllowPayInstallment",
        label: "اجازه پرداخت قسطی",
        type: "switch",
      },
      {
        id: "FirstInstallmentAmount",
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
        id: "AllowDiscountCodeForOnlinePay",
        label: "اعمال کد تخفیف (پرداخت آنلاین)",
        type: "switch",
      },
      {
        id: "AllowDiscountCodeForCashPay",
        label: "اعمال کد تخفیف (پرداخت نقدی)",
        type: "switch",
      },
      {
        id: "AllowDiscountCodeForPayWithCheque",
        label: "اعمال کد تخفیف (پرداخت چک)",
        type: "switch",
      },
      {
        id: "AllowDiscountCodeForInstallmentPay",
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
        id: "HasReportCard",
        label: "کارنامه دارد",
        type: "switch",
      },
      {
        id: "ReportCardStartDate",
        label: "تاریخ انتشار کارنامه",
        type: "date",
      },
      {
        id: "ReportCardEndDate",
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
        id: "AllowUseWalletCredit",
        label: "اجازه استفاده از کیف پول",
        type: "switch",
      },
      {
        id: "ActivityEvaluationTemplateId",
        label: "قالب ارزیابی فعالیت",
        type: "select",
      },
      {
        id: "HasTermsAndConditions",
        label: "شرایط و قوانین دارد",
        type: "switch",
      },
      {
        id: "inv",
        label: "",
        type: "invisible",
      },
      {
        id: "TermsAndConditions",
        label: "شرایط و قوانین ",
        type: "textarea",
        colSpan: 12,
      },
    ],
  },
];
