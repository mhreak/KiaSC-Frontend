import { FilterConfig } from "@/components/filterFormBuilder/types";

export const termSelectFilterConfig: FilterConfig = [
  {
    id: "name",
    label: "نام ترم",
    type: "text",
  },
  {
    id: "year",
    label: "سال",
    type: "text",
  },
  {
    id: "season",
    label: "فصل",
    type: "select",
  },
];
