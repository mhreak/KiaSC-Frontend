import { FilterConfig } from "@/components/filterFormBuilder/types";

export const discountFilterConfig: FilterConfig = [
  {
    id: "FilterDiscountCodeType",
    label: "نوع کد تخفیف",
    type: "select",
    options: [
      { value: 1, label: "تخفیف مبلغ ثابت" },
      { value: 2, label: "درصد تخفیف" },
      { value: 3, label: "روش دلخواه" },
    ],
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
  {
    id: "alsufgha",
    label: "",
    type: "invisible",
  },
  {
    id: "FilterExpirationDateFrom",
    label: "تاریخ انقضا از",
    type: "date",
  },
  {
    id: "FilterExpirationDateTo",
    label: "تاریخ انقضا تا",
    type: "date",
  },
];
