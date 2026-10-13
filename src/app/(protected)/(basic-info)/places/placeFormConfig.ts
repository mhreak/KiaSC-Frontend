import { FormConfig } from "@/components/formBuilder/types";

export const placeFormConfig: FormConfig = [
  {
    id: "place-info",
    type: "section",
    title: "اطلاعات ورزشگاه",
    wrapperVariant: "card",
    headerClassName: "text-orange-400",
    icon: "Castle",
    children: [
      {
        id: "name",
        label: "نام ورزشگاه",
        type: "text",
        required: true,
      },
      {
        id: "manager",
        label: "مدیریت",
        type: "text",
      },
      {
        id: "ryhdfgh",
        label: "تلفن تماس مدیریت",
        type: "number",
      },
      {
        id: "uygbh",
        label: "تلفن تماس",
        type: "number",
      },
      {
        id: "nartdcgme",
        label: "تلفن تماس ۲",
        type: "number",
      },
      {
        id: "kkytsdg",
        label: "نام و نام خانوادگی رابط",
        type: "text",
      },
      {
        id: "5dfh",
        label: "تلفن تماس رابط",
        type: "number",
      },
      {
        id: "jhfd",
        label: "آدرس",
        type: "textarea",
      },
    ],
  },
];
