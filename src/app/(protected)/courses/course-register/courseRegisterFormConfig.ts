import { FormConfig } from "@/components/formBuilder/types";

export const courseRegisterFormConfig: FormConfig = [
  {
    id: "athlete-info",
    title: "اطلاعات ورزشکار",
    type: "section",
    wrapperVariant: "card",
    headerClassName: "text-rose-400",
    icon: "Volleyball",
    children: [
      {
        id: "AthleteId",
        label: "ورزشکار",
        type: "athleteSearch",
        required: true,
      },
      {
        id: "CourseId",
        label: "دوره آموزشی",
        type: "courseSearch",
        required: true,
      },
      {
        id: "CourseClassId",
        label: "کلاس",
        type: "select",
        required: true,
      },
    ],
  },
  {
    id: "course-info",
    title: "اطلاعات ثبت نام",
    type: "section",
    wrapperVariant: "card",
    headerClassName: "text-sky-400",
    icon: "NotebookPen",
    children: [
      {
        id: "PaymentTypeId",
        label: "نحوه ی پرداخت",
        type: "select",
        required: true,
      },
      {
        id: "RegisterState",
        label: "وضعیت ثبت نام",
        type: "select",
        options: [
          { value: 2, label: "در حال ثبت نام" },
          { value: 3, label: "ثبت نام نهایی" },
        ],
        required: true,
      },
    ],
  },
  {
    id: "discount-info",
    title: "کد تخفیف",
    type: "section",
    wrapperVariant: "card",
    headerClassName: "text-teal-400",
    icon: "CirclePercent",
    children: [
      {
        id: "DiscountCode",
        label: "",
        placeholder: "کد تخفیف را وارد کنید",
        type: "textWithConfirm",
      },
    ],
  },
  {
    id: "wallet-info",
    title: "کیف پول",
    type: "section",
    wrapperVariant: "card",
    headerClassName: "text-red-400",
    icon: "Wallet",
    children: [
      {
        id: "UsedWalletCredit",
        label: "استفاده از کیف پول",
        type: "textWithConfirm",
      },
    ],
  },
  {
    id: "final-",
    title: "هزینه نهایی",
    type: "section",
    wrapperVariant: "card",
    headerClassName: "text-purple-500",
    icon: "CircleDollarSign",
    children: [
      {
        id: "coursePrice",
        label: "هزینه ثبت نام دوره",
        type: "text",
        disabled: true,
      },
      {
        id: "coursePricer5yedf",
        label: "جمع هزینه ها",
        type: "text",
        disabled: true,
      },
      {
        id: "discount",
        label: "تخفیف",
        type: "text",
        disabled: true,
      },
      {
        id: "coursePrice2343",
        label: "استفاده از کیف پول",
        type: "text",
        disabled: true,
      },
      {
        id: "coursePriceafdghar",
        label: "هزینه نهایی",
        type: "text",
        disabled: true,
      },
    ],
  },
];
