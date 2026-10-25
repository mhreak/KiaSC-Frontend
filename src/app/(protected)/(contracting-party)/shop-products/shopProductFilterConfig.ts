import { FilterConfig } from "@/components/filterFormBuilder/types";

export const shopProductFilterConfig: FilterConfig = [
  {
    id: "FilterProductName",
    label: "نام محصول",
    type: "text",
  },
  {
    id: "FilterShopId",
    label: "فروشگاه",
    type: "select",
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
