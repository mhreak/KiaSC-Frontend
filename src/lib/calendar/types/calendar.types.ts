// lib/calendar/types/calendar.types.ts

export interface DayInfo {
  /** روز شمسی (۱-۳۱) */
  day: number;
  /** ماه شمسی (۱-۱۲) */
  month: number;
  /** سال شمسی */
  year: number;
  /** تاریخ شمسی به صورت رشته */
  jDate: string;
  /** تاریخ میلادی به صورت ISO */
  isoDate: string;
  /** روز هفته (۰=شنبه تا ۶=جمعه) */
  dayOfWeek: number;
  /** نام کامل روز هفته */
  dayOfWeekName: string;
  /** نام کوتاه روز هفته */
  dayOfWeekShort: string;
  /** نام ماه */
  monthName: string;
  /** آیا امروز است */
  isToday: boolean;
  /** آیا آخر هفته است (پنجشنبه/جمعه) */
  isWeekend: boolean;
  /** آیا روز کبیسه است */
  isLeapDay: boolean;
  /** تایم‌استمپ */
  timestamp: number;
  /** آیا روز تعطیل رسمی است */
  isHoliday?: boolean;
  /** عنوان تعطیلی */
  holidayTitle?: string;
}

export interface MonthInfo {
  /** شماره ماه (۱-۱۲) */
  monthNumber: number;
  /** نام کامل ماه */
  monthName: string;
  /** نام کوتاه ماه */
  monthNameShort: string;
  /** تعداد روزهای ماه */
  daysCount: number;
  /** آیا ماه کبیسه است */
  isLeapMonth: boolean;
}

export interface HolidayInfo extends DayInfo {
  /** عنوان تعطیلی */
  holidayTitle: string;
  /** تاریخ به صورت شمسی */
  date: string;
}

export interface GregorianDate {
  year: number;
  month: number;
  day: number;
  isoString: string;
}

export interface JalaliDate {
  year: number;
  month: number;
  day: number;
  jDateString: string;
}

export interface DateRangeParams {
  startYear: number;
  startMonth: number;
  startDay: number;
  endYear: number;
  endMonth: number;
  endDay: number;
}

export interface CalendarConfig {
  /** حداقل سال پشتیبانی شده */
  minYear: number;
  /** حداکثر سال پشتیبانی شده */
  maxYear: number;
  /** تعداد هفته‌های نمایش داده شده */
  weeksToDisplay: number;
  /** آیا روزهای ماه‌های مجاور نمایش داده شوند */
  includeAdjacentDays: boolean;
}

export interface MonthNavigation {
  year: number;
  month: number;
}

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type NavigationDirection = -1 | 1;

// lib/calendar/types/calendar.types.ts


// تعریف تایپ برای فرمت تاریخ
export type DateFormat = 'full' | 'short' | 'numeric';
