import { FilterConfig } from "@/components/filterFormBuilder/types";

export const courseFilterConfig: FilterConfig = [
  {
    id: "sport",
    label: "ورزش",
    type: "text",
  },
  {
    id: "term",
    label: "ترم",
    type: "text",
  },
  {
    id: "stadium",
    label: "ورزشگاه",
    type: "select",
  },
  {
    id: "courseName",
    label: "نام دوره",
    type: "text",
  },
];
