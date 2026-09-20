// lib/calendar/calendar.ts
import {
  CalendarConfig,
  DateRangeParams,
  DayInfo,
  GregorianDate,
  HolidayInfo,
  JalaliDate,
  MonthInfo,
  MonthNavigation,
  NavigationDirection,
} from "./types";
import { CalendarService, ConversionService, HolidayService } from "./services";

export class PersianCalendar {
  private calendarService: CalendarService;
  private conversionService: ConversionService;
  private holidayService: HolidayService;

  constructor(config?: Partial<CalendarConfig>) {
    this.calendarService = new CalendarService(config);
    this.conversionService = new ConversionService();
    this.holidayService = new HolidayService();
  }

  /**
   * دریافت روزهای یک ماه
   */
  getMonthDays(
    year: number,
    month: number,
    includeAdjacentDays?: boolean,
  ): DayInfo[] {
    return this.calendarService.getMonthDays(year, month, includeAdjacentDays);
  }

  /**
   * دریافت کل روزهای یک سال
   */
  getYearDays(year: number): DayInfo[] {
    return this.calendarService.getYearDays(year);
  }

  /**
   * دریافت اطلاعات یک روز خاص
   */
  getDayInfo(year: number, month: number, day: number): DayInfo {
    return this.calendarService.getDayInfo(year, month, day);
  }

  /**
   * دریافت اطلاعات ماه‌های سال
   */
  getMonthsOfYear(year: number): MonthInfo[] {
    return this.calendarService.getMonthsOfYear(year);
  }

  /**
   * دریافت اطلاعات یک ماه
   */
  getMonthInfo(year: number, month: number): MonthInfo {
    return this.calendarService.getMonthInfo(year, month);
  }

  /**
   * ناوبری ماهانه
   */
  navigateMonth(
    year: number,
    month: number,
    direction: NavigationDirection,
  ): MonthNavigation {
    return this.calendarService.navigateMonth(year, month, direction);
  }

  /**
   * دریافت محدوده تاریخ‌ها
   */
  getDateRange(params: DateRangeParams): DayInfo[] {
    return this.calendarService.getDateRange(params);
  }

  /**
   * بررسی سال کبیسه
   */
  isLeapYear(year: number): boolean {
    return this.calendarService.isLeapYear(year);
  }

  /**
   * دریافت تعطیلات رسمی یک سال
   */
  getOfficialHolidays(year: number): HolidayInfo[] {
    return this.holidayService.getOfficialHolidays(year);
  }

  /**
   * بررسی تعطیل بودن یک روز
   */
  isHoliday(year: number, month: number, day: number): boolean {
    return this.holidayService.isHoliday(year, month, day);
  }

  /**
   * تبدیل تاریخ شمسی به میلادی
   */
  toGregorian(year: number, month: number, day: number): GregorianDate {
    return this.conversionService.jalaliToGregorian(year, month, day);
  }

  /**
   * تبدیل تاریخ میلادی به شمسی
   */
  toJalali(year: number, month: number, day: number): JalaliDate {
    return this.conversionService.gregorianToJalali(year, month, day);
  }

  /**
   * دریافت تاریخ امروز به صورت شمسی
   */
  getToday(): JalaliDate {
    const now = new Date();
    return this.conversionService.gregorianToJalali(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
    );
  }

  /**
   * تبدیل timestamp به تاریخ شمسی
   */
  timestampToJalali(timestamp: number): JalaliDate {
    return this.conversionService.timestampToJalali(timestamp);
  }

  /**
   * تبدیل تاریخ شمسی به timestamp
   */
  jalaliToTimestamp(year: number, month: number, day: number): number {
    return this.conversionService.jalaliToTimestamp(year, month, day);
  }

  /**
   * فرمت‌بندی تاریخ شمسی
   */
  formatDate(
    year: number,
    month: number,
    day: number,
    format?: "full" | "short" | "numeric",
  ): string {
    return this.conversionService.formatDate(year, month, day, format);
  }

  /**
   * پارس تاریخ شمسی
   */
  parseJalaliDate(dateString: string): JalaliDate {
    return this.conversionService.parseJalaliDate(dateString);
  }

  /**
   * اعتبارسنجی و پارس تاریخ
   */
  parseAndValidateDate(dateString: string): JalaliDate | null {
    return this.conversionService.parseAndValidateDate(dateString);
  }

  /**
   * دریافت نام ماه
   */
  getMonthName(month: number): string {
    return this.conversionService.getMonthName(month);
  }

  /**
   * دریافت نام روز هفته
   */
  getDayOfWeekName(dayOfWeek: number): string {
    return this.conversionService.getDayOfWeekName(dayOfWeek);
  }

  /**
   * دریافت امروز به همراه ۱۰ روز آینده
   */
  getTodayAndNext10Days(): DayInfo[] {
    return this.calendarService.getTodayAndNext10Days();
  }
}
