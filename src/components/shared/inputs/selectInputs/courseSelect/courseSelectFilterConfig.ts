import { FilterConfig } from "@/components/filterFormBuilder/types";

export const courseSelectFilterConfig: FilterConfig = [
  {
    id: "term",
    label: "ترم",
    type: "select",
  },
  {
    id: "sport",
    label: "رشتۀ ورزشی",
    type: "select",
  },
  {
    id: "stadium",
    label: "ورزشگاه",
    type: "select",
  },
  {
    id: "name",
    label: "نام دورۀ آموزشی",
    type: "text",
  },
];
