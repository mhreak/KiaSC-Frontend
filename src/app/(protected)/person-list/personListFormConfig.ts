import { FormConfig } from "@/components/formBuilder/types";

export const personListFormConfig: FormConfig = [
  {
    id: "personal-info",
    title: "اطلاعات فردی",
    type: "section",
    wrapperVariant: "card",
    icon: "User2",
    headerClassName: "text-amber-400",
    children: [
      {
        id: "firstName",
        label: "نام",
        type: "text",
        required: true,
        colSpan: 6,
      },
      {
        id: "lastName",
        label: "نام خانوادگی",
        type: "text",
        required: true,
        colSpan: 6,
      },
      {
        id: "fatherName",
        label: "نام پدر",
        type: "text",
        required: true,
        colSpan: 6,
      },
      {
        id: "nationalCode",
        label: "کد ملی",
        type: "nationalcode",
        required: true,
        colSpan: 6,
        maxLength: 10,
      },
      {
        id: "gender",
        label: "جنسیت",
        type: "select",
        options: [
          {
            value: "1",
            label: "خانم",
          },
          {
            value: "2",
            label: "آقا",
          },
        ],
        required: true,
        colSpan: 6,
      },
      {
        id: "birthDate",
        label: "تاریخ تولد",
        type: "date",
        colSpan: 6,
      },
      {
        id: "personelImage",
        label: "عکس پرسنلی",
        type: "image",
        colSpan: 6,
      },
    ],
  },
  {
    id: "call-info",
    type: "section",
    title: "اطلاعات تماس",
    icon: "Phone",
    wrapperVariant: "card",
    headerClassName: "text-blue-400",
    children: [
      {
        id: "phone",
        label: "تلفن ثابت",
        type: "phone",
        required: true,
        colSpan: 6,
      },
      {
        id: "phone2",
        label: "تلفن ثابت (۲)",
        type: "phone",
        colSpan: 6,
      },
      {
        id: "mobile",
        label: "تلفن همراه",
        type: "mobile",
        required: true,
        colSpan: 6,
      },
      {
        id: "email",
        label: "ایمیل",
        type: "email",
        colSpan: 6,
      },
      {
        id: "address",
        label: "آدرس",
        type: "textarea",
        required: true,
        colSpan: 12,
      },
    ],
  },
  {
    id: "password",
    type: "section",
    title: "رمز عبور",
    icon: "Lock",
    wrapperVariant: "card",
    headerClassName: "text-amber-500",
    children: [
      {
        id: "password",
        label: "رمز عبور",
        type: "password",
        colSpan: 6,
      },
      {
        id: "passwordAgain",
        label: "تکرار رمز عبور",
        type: "password",
        colSpan: 6,
      },
    ],
  },
];
