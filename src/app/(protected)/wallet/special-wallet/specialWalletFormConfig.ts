import { FormConfig } from "@/components/formBuilder/types";

export const addSpecialWalletFormConfig: FormConfig = [
  {
    id: "basic-info",
    type: "section",
    title: "اطلاعات کیف پول",
    icon: "Wallet",
    wrapperVariant: "card",
    headerClassName: "text-green-400",
    children: [
      {
        id: "name",
        label: "نام کیف پول",
        type: "text",
        required: true,
        colSpan: 6,
      },
      {
        id: "ownerName",
        label: "صاحب کیف پول",
        type: "text",
        required: true,
        colSpan: 6,
      },
      {
        id: "amount",
        label: "موجودی کیف پول",
        type: "number",
        required: true,
        colSpan: 6,
      },
      {
        id: "commissionPercentage",
        label: "درصد کمیسیون",
        type: "number",
        required: true,
        colSpan: 6,
      },
      {
        id: "status",
        label: "وضعیت",
        type: "switch",
        required: true,
        colSpan: 6,
      },
    ],
  },
];

export const editSpecialWalletFormConfig: FormConfig = [
  {
    id: "basic-info",
    type: "section",
    title: "اطلاعات کیف پول",
    icon: "Wallet",
    wrapperVariant: "card",
    headerClassName: "text-orange-500",
    children: [
      {
        id: "name",
        label: "نام کیف پول",
        type: "text",
        required: true,
        colSpan: 6,
      },
      {
        id: "ownerName",
        label: "صاحب کیف پول",
        type: "text",
        required: true,
        colSpan: 6,
      },
      {
        id: "amount",
        label: "موجودی کیف پول",
        type: "number",
        required: true,
        colSpan: 6,
      },
      {
        id: "commissionPercentage",
        label: "درصد کمیسیون",
        type: "number",
        required: true,
        colSpan: 6,
      },
      {
        id: "status",
        label: "وضعیت",
        type: "switch",
        required: true,
        colSpan: 6,
      },
    ],
  },
];
