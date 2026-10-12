import { FormConfig } from "@/components/formBuilder/types";

export const shopFormConfig: FormConfig = [
  {
    id: "shop-info",
    title: "اطلاعات فروشگاه",
    type: "section",
    wrapperVariant: "card",
    headerClassName: "text-teal-500",
    icon: "Store",
    children: [
      {
        id: "name",
        label: "نام فروشگاه",
        type: "text",
        required: true,
      },
      {
        id: "sthsth",
        label: "صنف",
        type: "select",
        required: true,
      },
      {
        id: "nayjbnme",
        label: "درصد تخفیف فروشگاه",
        type: "number",
      },
      {
        id: "sfgrf",
        label: "مدیریت",
        type: "text",
      },
      {
        id: "jyy",
        label: "تلفن ثابت",
        type: "phone",
      },
      {
        id: "dsxvnnn",
        label: "تلفن همراه",
        type: "mobile",
      },
      {
        id: "rr54sd",
        label: "آدرس",
        type: "textarea",
      },
      {
        id: "ujh5645",
        label: "فعال",
        type: "switch",
        defaultValue: true,
      },
      {
        id: "adehbnbb",
        label: "تصاویر فروشگاه",
        type: "image",
        maxFileUpload: 5,
        colSpan: 12,
      },
    ],
  },
];
