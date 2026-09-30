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
        id: "athleteId",
        label: "ورزشکار",
        type: "athleteSearch",
      },
      {
        id: "courseId",
        label: "دوره آموزشی",
        type: "text",
      },
      {
        id: "classId",
        label: "کلاس",
        type: "select",
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
        id: "registerType",
        label: "نوع ثبت نام",
        type: "select",
        options: [
          { value: 1, label: "پرداخت قسطی" },
          { value: 2, label: "پرداخت نقدی" },
          { value: 3, label: "پرداخت چک" },
          { value: 4, label: "دستگاه کارتخوان" },
          { value: 5, label: "کارت به کارت" },
          { value: 6, label: "فیش بانکی" },
        ],
      },
      {
        id: "registerState",
        label: "وضعیت ثبت نام",
        type: "select",
        options: [
          { value: 1, label: "در حال ثبت نام" },
          { value: 2, label: "ثبت نام نهایی" },
        ],
      },
      {
        id: "discountCode",
        label: "کد تخفیف",
        type: "textWithConfirm",
        onClick: () => {
          console.log("clicked");
        },
      },
      {
        id: "useWallet",
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
        id: "coursePrice",
        label: "جمع هزینه ها",
        type: "text",
        disabled: true,
      },
      {
        id: "coursePrice",
        label: "تخفیف",
        type: "text",
        disabled: true,
      },
      {
        id: "coursePrice",
        label: "استفاده از کیف پول",
        type: "text",
        disabled: true,
      },
      {
        id: "coursePrice",
        label: "هزینه نهایی",
        type: "text",
        disabled: true,
      },
    ],
  },
];
