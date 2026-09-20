// lib/calendar/constants/holidays.ts
import { MonthNumber } from '../types';

export interface HolidayDefinition {
  month: MonthNumber;
  day: number;
  title: string;
}

export const OFFICIAL_HOLIDAYS: HolidayDefinition[] = [
  { month: 1, day: 1, title: 'عید نوروز' },
  { month: 1, day: 2, title: 'عید نوروز' },
  { month: 1, day: 3, title: 'عید نوروز' },
  { month: 1, day: 4, title: 'عید نوروز' },
  { month: 1, day: 12, title: 'روز جمهوری اسلامی' },
  { month: 1, day: 13, title: 'روز طبیعت' },
  { month: 3, day: 14, title: 'رحلت امام خمینی' },
  { month: 3, day: 15, title: 'قیام ۱۵ خرداد' },
  { month: 11, day: 22, title: 'پیروزی انقلاب اسلامی' },
  { month: 12, day: 29, title: 'روز ملی شدن صنعت نفت' },
];

export const WEEKEND_DAYS = [6]; //  جمعه