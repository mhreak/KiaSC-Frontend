import { FilterConfig } from "@/components/filterFormBuilder/types";

export const personWalletFilterConfig: FilterConfig = [
  {
    id: "ownerName",
    label: "نام و نام خانوادگی",
    type: "text",
  },
  {
    id: "nationalCode",
    label: "کد ملی",
    type: "text",
  },
  {
    id: "amountFrom",
    label: "موجودی از",
    type: "number",
  },
  {
    id: "amountTo",
    label: "موجودی تا",
    type: "number",
  },
];
