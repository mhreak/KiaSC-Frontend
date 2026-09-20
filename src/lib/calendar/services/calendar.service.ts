// src/lib/calendar/services/calendar.service.ts
import {
  CalendarConfig,
  DateRangeParams,
  DayInfo,
  MonthInfo,
  MonthNavigation,
  NavigationDirection,
} from "../types";

import { HolidayService } from "./holiday.service";
import { MONTH_NAMES, MONTH_NAMES_SHORT } from "../constants";
import { DateUtils } from "../utils/date.utils";
import { CalendarValidation } from "../utils/validation.utils";

export class CalendarService {
  private config: CalendarConfig;
  private holidayService: HolidayService;

  constructor(config?: Partial<CalendarConfig>) {
    this.config = {
      minYear: 1320,
      maxYear: 1480,
      weeksToDisplay: 6,
      includeAdjacentDays: true,
      ...config,
    };
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
    this.validateYear(year);
    this.validateMonth(month);

    const shouldIncludeAdjacent =
      includeAdjacentDays ?? this.config.includeAdjacentDays;
    const daysInMonth = DateUtils.getDaysInMonth(year, month);

    // روزهای ماه جاری
    const days: DayInfo[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(this.createDayWithHoliday(year, month, day));
    }

    if (shouldIncludeAdjacent) {
      return this.addAdjacentDays(days, year, month);
    }

    return days;
  }

  /**
   * دریافت کل روزهای یک سال
   */
  getYearDays(year: number): DayInfo[] {
    this.validateYear(year);

    const yearDays: DayInfo[] = [];
    for (let month = 1; month <= 12; month++) {
      yearDays.push(...this.getMonthDays(year, month, false));
    }
    return yearDays;
  }

  /**
   * دریافت اطلاعات یک روز خاص
   */
  getDayInfo(year: number, month: number, day: number): DayInfo {
    this.validateDate(year, month, day);
    return this.createDayWithHoliday(year, month, day);
  }

  /**
   * دریافت اطلاعات ماه‌های سال
   */
  getMonthsOfYear(year: number): MonthInfo[] {
    this.validateYear(year);

    const months: MonthInfo[] = [];
    for (let month = 1; month <= 12; month++) {
      months.push(this.getMonthInfo(year, month));
    }
    return months;
  }

  /**
   * دریافت اطلاعات یک ماه
   */
  getMonthInfo(year: number, month: number): MonthInfo {
    this.validateYear(year);
    this.validateMonth(month);

    const daysCount = DateUtils.getDaysInMonth(year, month);

    return {
      monthNumber: month,
      monthName: MONTH_NAMES[month - 1],
      monthNameShort: MONTH_NAMES_SHORT[month - 1],
      daysCount,
      isLeapMonth: month === 12 && CalendarValidation.isLeapYear(year),
    };
  }

  /**
   * ناوبری ماهانه
   */
  navigateMonth(
    year: number,
    month: number,
    direction: NavigationDirection,
  ): MonthNavigation {
    this.validateYear(year);
    this.validateMonth(month);

    let nextYear = year;
    let nextMonth = month + direction;

    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear++;
    } else if (nextMonth < 1) {
      nextMonth = 12;
      nextYear--;
    }

    // اعتبارسنجی سال جدید
    this.validateYear(nextYear);

    return {
      year: nextYear,
      month: nextMonth,
    };
  }

  /**
   * دریافت محدوده تاریخ‌ها
   */
  getDateRange(params: DateRangeParams): DayInfo[] {
    const { startYear, startMonth, startDay, endYear, endMonth, endDay } =
      params;

    this.validateDate(startYear, startMonth, startDay);
    this.validateDate(endYear, endMonth, endDay);

    const comparison = DateUtils.compareJalaliDates(
      { year: startYear, month: startMonth, day: startDay },
      { year: endYear, month: endMonth, day: endDay },
    );

    if (comparison > 0) {
      throw new Error("تاریخ شروع نمی‌تواند بعد از تاریخ پایان باشد");
    }

    const range: DayInfo[] = [];
    let currentYear = startYear;
    let currentMonth = startMonth;
    let currentDay = startDay;

    let safetyCounter = 0;
    const maxIterations = 100000; // حداکثر ۱۰۰ هزار روز

    while (safetyCounter < maxIterations) {
      range.push(
        this.createDayWithHoliday(currentYear, currentMonth, currentDay),
      );

      // بررسی پایان
      if (
        currentYear === endYear &&
        currentMonth === endMonth &&
        currentDay === endDay
      ) {
        break;
      }

      // رفتن به روز بعد
      const nextDate = DateUtils.addDays(
        currentYear,
        currentMonth,
        currentDay,
        1,
      );
      currentYear = nextDate.year;
      currentMonth = nextDate.month;
      currentDay = nextDate.day;

      safetyCounter++;
    }

    if (safetyCounter >= maxIterations) {
      throw new Error("محدوده تاریخ بیش از حد طولانی است");
    }

    return range;
  }

  /**
   * بررسی سال کبیسه
   */
  isLeapYear(year: number): boolean {
    this.validateYear(year);
    return CalendarValidation.isLeapYear(year);
  }

  /**
   * اضافه کردن روزهای ماه‌های مجاور
   */
  private addAdjacentDays(
    days: DayInfo[],
    year: number,
    month: number,
  ): DayInfo[] {
    const firstDayOfWeek = DateUtils.getFirstDayOfWeek(year, month);
    const totalDaysInView = this.config.weeksToDisplay * 7;

    const prevMonthDays: DayInfo[] = [];
    if (firstDayOfWeek > 0) {
      const prevMonth = DateUtils.getPrevMonth(year, month);
      const prevMonthDaysCount = DateUtils.getDaysInMonth(
        prevMonth.year,
        prevMonth.month,
      );

      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        prevMonthDays.push(
          this.createDayWithHoliday(
            prevMonth.year,
            prevMonth.month,
            prevMonthDaysCount - i,
          ),
        );
      }
    }

    const nextMonthDays: DayInfo[] = [];
    const totalDaysSoFar = prevMonthDays.length + days.length;
    const remainingDays = totalDaysInView - totalDaysSoFar;

    if (remainingDays > 0) {
      const nextMonth = DateUtils.getNextMonth(year, month);
      const nextMonthDaysCount = DateUtils.getDaysInMonth(
        nextMonth.year,
        nextMonth.month,
      );
      const daysToAdd = Math.min(remainingDays, nextMonthDaysCount);

      for (let i = 1; i <= daysToAdd; i++) {
        nextMonthDays.push(
          this.createDayWithHoliday(nextMonth.year, nextMonth.month, i),
        );
      }

      // اگر هنوز جای خالی مانده، از ماه بعدی اضافه کن
      if (nextMonthDays.length < remainingDays) {
        const nextNextMonth = DateUtils.getNextMonth(
          nextMonth.year,
          nextMonth.month,
        );
        const additionalDays = remainingDays - nextMonthDays.length;
        for (let i = 1; i <= additionalDays; i++) {
          nextMonthDays.push(
            this.createDayWithHoliday(
              nextNextMonth.year,
              nextNextMonth.month,
              i,
            ),
          );
        }
      }
    }

    return [...prevMonthDays, ...days, ...nextMonthDays];
  }

  /**
   * ایجاد روز با اطلاعات تعطیلی
   */
  private createDayWithHoliday(
    year: number,
    month: number,
    day: number,
  ): DayInfo {
    const dayInfo = DateUtils.createDayObject(year, month, day);
    const holidayTitle = this.holidayService.getHolidayTitle(year, month, day);

    if (holidayTitle) {
      dayInfo.isHoliday = true;
      dayInfo.holidayTitle = holidayTitle;
    }

    return dayInfo;
  }

  /**
   * اعتبارسنجی سال
   */
  private validateYear(year: number): void {
    if (
      !CalendarValidation.isValidYear(
        year,
        this.config.minYear,
        this.config.maxYear,
      )
    ) {
      throw new Error(
        `سال ${year} خارج از محدوده مجاز است (${this.config.minYear} تا ${this.config.maxYear})`,
      );
    }
  }

  /**
   * اعتبارسنجی ماه
   */
  private validateMonth(month: number): void {
    if (!CalendarValidation.isValidMonth(month)) {
      throw new Error("ماه باید بین 1 تا 12 باشد");
    }
  }

  /**
   * اعتبارسنجی تاریخ کامل
   */
  private validateDate(year: number, month: number, day: number): void {
    if (!CalendarValidation.isValidJalaliDate(year, month, day)) {
      throw new Error(`تاریخ نامعتبر: ${year}/${month}/${day}`);
    }
  }

  /**
   * دریافت امروز به همراه ۱۰ روز آینده
   * مجموعاً ۱۱ روز
   */
  getTodayAndNext10Days(): DayInfo[] {
    const today = DateUtils.getTodayJalali();

    const days: DayInfo[] = [];

    for (let i = 0; i <= 10; i++) {
      const nextDate = DateUtils.addDays(today.year, today.month, today.day, i);

      days.push(
        this.createDayWithHoliday(nextDate.year, nextDate.month, nextDate.day),
      );
    }

    return days;
  }
}
