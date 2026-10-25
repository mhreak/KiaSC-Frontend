import { FilterConfig } from "@/components/filterFormBuilder/types";

export const courseFilterConfig: FilterConfig = [
  {
    id: "FilterCourseName",
    label: "نام دوره آموزشی",
    type: "text",
  },
  {
    id: "ifsjlk",
    label: "",
    type: "invisible",
  },
  {
    id: "ifsj",
    label: "",
    type: "invisible",
  },
  {
    id: "FilterTermId",
    label: "ترم",
    type: "select",
  },
  {
    id: "FilterSportId",
    label: "رشته ورزشی",
    type: "select",
  },
  {
    id: "ifrtyj",
    label: "",
    type: "invisible",
  },
  {
    id: "FilterPlaceId",
    label: "محل برگزاری",
    type: "select",
  },
  {
    id: "FilterGender",
    label: "جنسیت",
    type: "select",
    options: [
      { value: "false", label: "خانم" },
      { value: "true", label: "آقا" },
    ],
  },
];
