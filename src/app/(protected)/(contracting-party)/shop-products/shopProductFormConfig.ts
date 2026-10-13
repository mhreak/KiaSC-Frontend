import { FormConfig } from "@/components/formBuilder/types";

export const shopProductFormConfig: FormConfig = [
  {
    id: "product-info",
    title: "اطلاعات محصول",
    type: "section",
    wrapperVariant: "card",
    headerClassName: "text-pink-400",
    icon: "",
    children: [
      {
        id: "reukh",
        label: "نام محصول",
        type: "text",
        required: true,
      },
      {
        id: "adf",
        label: "فروشگاه",
        type: "select",
        required: true,
      },
      {
        id: "yjjjhm",
        label: "قیمت",
        type: "amount",
        required: true,
      },
      {
        id: "turfg",
        label: "درصد تخفیف محصول",
        type: "number",
        required: true,
      },
      {
        id: "rty",
        label: "فعال",
        type: "switch",
        defaultValue: true,
      },
      {
        id: "d5thbk",
        label: "تصویر محصول",
        type: "file",
      },
    ],
  },
];
