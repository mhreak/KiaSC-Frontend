import { FormConfig } from "@/components/formBuilder/types";

export const addUserListFormConfig: FormConfig = [
  {
    id: "user-info",
    type: "section",
    title: "اطلاعات کاربر",
    icon: "User",
    wrapperVariant: "card",
    headerClassName: "text-green-400",
    children: [
      {
        id: "name",
        label: "نام و نام خانوادگی",
        type: "text",
        required: true,
        colSpan: 6,
      },
      {
        id: "username",
        label: "نام کاربری (فقط انگلیسی)",
        type: "text",
        required: true,
        colSpan: 6,
      },
      {
        id: "email",
        label: "ایمیل",
        type: "email",
        required: true,
        colSpan: 6,
      },
      {
        id: "phoneNumber",
        label: "شماره تماس (یازده رقم)",
        type: "mobile",
        required: true,
        colSpan: 6,
      },
      {
        id: "password",
        label: "کلمه عبور",
        type: "password",
        required: true,
        colSpan: 6,
      },
      {
        id: "confirmPassword",
        label: "تکرار کلمه عبور",
        type: "password",
        required: true,
        colSpan: 6,
      },
      {
        id: "role",
        label: "نقش کاربر",
        type: "select",
        options: [
          {
            value: "Admin",
            label: "ادمین",
          },
          {
            value: "Manager",
            label: "مدیر",
          },
          {
            value: "Athlete",
            label: "ورزشکار",
          },
          {
            value: "Person",
            label: "شخص",
          },
        ],
        required: true,
        colSpan: 6,
      },
    ],
  },
];

export const editUserListFormConfig: FormConfig = [
  {
    id: "user-info",
    type: "section",
    title: "اطلاعات کاربر",
    icon: "User",
    wrapperVariant: "card",
    headerClassName: "text-orange-500",
    children: [
      {
        id: "name",
        label: "نام و نام خانوادگی",
        type: "text",
        required: true,
        colSpan: 6,
      },
      {
        id: "username",
        label: "نام کاربری (فقط انگلیسی)",
        type: "text",
        required: true,
        colSpan: 6,
      },
      {
        id: "email",
        label: "ایمیل",
        type: "email",
        required: true,
        colSpan: 6,
      },
      {
        id: "phoneNumber",
        label: "شماره تماس (یازده رقم)",
        type: "mobile",
        required: true,
        colSpan: 6,
      },
      {
        id: "password",
        label: "کلمه عبور",
        type: "password",
        required: true,
        colSpan: 6,
      },
      {
        id: "role",
        label: "نقش کاربر",
        type: "select",
        options: [
          {
            value: "Admin",
            label: "ادمین",
          },
          {
            value: "Manager",
            label: "مدیر",
          },
          {
            value: "Athlete",
            label: "ورزشکار",
          },
          {
            value: "Person",
            label: "شخص",
          },
        ],
        required: true,
        colSpan: 6,
      },
    ],
  },
];
