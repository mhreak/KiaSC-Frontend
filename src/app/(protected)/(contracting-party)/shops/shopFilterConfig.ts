import { FilterConfig } from "@/components/filterFormBuilder/types";

export const shopFilterConfig: FilterConfig = [
  {
    id: "FilterShopName",
    label: "نام فروشگاه",
    type: "text",
  },
  {
    id: "FilterSenfId",
    label: "صنف",
    type: "select",
  },
  {
    id: "FilterPhoneNumberOrMobile",
    label: "شماره تماس",
    type: "number",
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
