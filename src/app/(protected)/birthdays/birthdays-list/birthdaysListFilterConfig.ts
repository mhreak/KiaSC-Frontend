import { FilterConfig } from "@/components/filterFormBuilder/types";
import { toPersianDigits } from "@/utils/numberConversions";

export const birthdaysListFilterConfig: FilterConfig = [
  {
    id: "AthleteId",
    label: "ورزشکار",
    type: "text",
  },
  {
    id: "BirthdayMonth",
    label: "ماه تولد",
    type: "select",
    options: [
      { value: "1", label: "فروردین" },
      { value: "2", label: "اردیبهشت" },
      { value: "3", label: "خرداد" },
      { value: "4", label: "تیر" },
      { value: "5", label: "مرداد" },
      { value: "6", label: "شهریور" },
      { value: "7", label: "مهر" },
      { value: "8", label: "آبان" },
      { value: "9", label: "آذر" },
      { value: "10", label: "دی" },
      { value: "11", label: "بهمن" },
      { value: "12", label: "اسفند" },
    ],
  },
  {
    id: "BirthdayDayOfMonth",
    label: "روز تولد",
    type: "select",
    options: Array.from({ length: 31 }, (_, i) => ({
      value: String(i + 1),
      label: toPersianDigits(i + 1) || "",
    })),
  },
  {
    id: "BirthdayGiftId",
    label: "هدیه تولد",
    type: "text",
  },
];
