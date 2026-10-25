import { FilterConfig } from "@/components/filterFormBuilder/types";

export const giftListFilterConfig: FilterConfig = [
  {
    id: "FilterGiftName",
    label: "نام هدیه",
    type: "text",
  },
  {
    id: "FilterActive",
    label: "وضعیت",
    type: "select",
    options: [
      { value: "true", label: "فعال" },
      { value: "false", label: "غیر فعال" },
    ],
  },
];
