import { FilterConfig } from "@/components/filterFormBuilder/types";

export const termFilterConfig: FilterConfig = [
  {
    id: "TermName",
    label: "نام ترم",
    type: "text",
  },
  {
    id: "Year",
    label: "سال",
    type: "number",
  },
  {
    id: "Season",
    label: "فصل",
    type: "select",
    options: [
      { value: "1", label: "بهار" },
      { value: "2", label: "تابستان" },
      { value: "3", label: "پاییز" },
      { value: "4", label: "زمستان" },
    ],
  },
];
