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
        id: "ShopName",
        label: "نام فروشگاه",
        type: "text",
        required: true,
      },
      {
        id: "SenfId",
        label: "صنف",
        type: "select",
        required: true,
      },
      {
        id: "DiscountPercent",
        label: "درصد تخفیف فروشگاه",
        type: "number",
        required: true,
      },
      {
        id: "ManagerName",
        label: "مدیریت",
        type: "text",
      },
      {
        id: "PhoneNumber",
        label: "تلفن ثابت",
        type: "phone",
      },
      {
        id: "Mobile",
        label: "تلفن همراه",
        type: "mobile",
      },
      {
        id: "Address",
        label: "آدرس",
        type: "textarea",
      },
      {
        id: "Active",
        label: "فعال",
        type: "switch",
        defaultValue: true,
      },
      {
        id: "images",
        label: "تصاویر فروشگاه",
        type: "image",
        maxFileUpload: 5,
        colSpan: 12,
      },
    ],
  },
];
