import { FormConfig } from "@/components/formBuilder/types";

export const editPersonWalletFormConfig: FormConfig = [
  {
    id: "basic-info",
    type: "section",
    title: "ویرایش موجودی کیف پول",
    icon: "Wallet",
    wrapperVariant: "card",
    headerClassName: "text-orange-500",
    children: [
      {
        id: "amount",
        label: "موجودی",
        type: "number",
        required: true,
        colSpan: 6,
      },
      {
        id: "description",
        label: "توضیحات",
        type: "textarea",
        required: false,
        colSpan: 6,
      },
    ],
  },
];
