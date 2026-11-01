import { FormConfig } from "@/components/formBuilder/types";

export const courseRegisterOptionFormConfig: FormConfig = [
  {
    id: "section",
    title: "اطلاعات گزینه ی ثبت نام",
    type: "section",
    wrapperVariant: "card",
    children: [
      {
        id: "OptionName",
        label: "نام گزینه ی ثبت نامی",
        type: "text",
        required: true,
      },
      {
        id: "Amount",
        label: "مقدار",
        type: "number",
        required: true,
      },
      {
        id: "AllowPayInstallment",
        label: "اجازه پرداخت اقساط",
        type: "switch",
      },
      {
        id: "FirstInstallmentAmount",
        label: "مبلغ اولین قسط",
        type: "amount",
      },
      {
        id: "AllowUseWalletCredit",
        label: "اجازه پرداخت با کیف پول",
        type: "switch",
      },
      {
        id: "Descripton",
        label: "توضیحات",
        type: "textarea",
      },
      {
        id: "Active",
        label: "فعال",
        type: "switch",
        defaultValue: true,
      },
    ],
  },
];
