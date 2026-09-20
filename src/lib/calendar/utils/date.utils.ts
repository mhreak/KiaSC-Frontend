// src/lib/calendar/utils/date.utils.ts
import * as jalaali from 'jalaali-js';
import { DayInfo, GregorianDate, JalaliDate, DayOfWeek } from '../types';
import { WEEK_DAY_NAMES, WEEK_DAY_NAMES_SHORT, MONTH_NAMES, WEEKEND_DAYS } from '../constants';
import { CalendarValidation } from './validation.utils';

export class DateUtils {
  /**
   * نرمال‌سازی تاریخ شمسی
   */
  static normalizeJalaliDate(year: number, month: number, day: number): string {
    return `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
  }

  /**
   * تبدیل تاریخ میلادی به شمسی
   */
  static gregorianToJalaliDate(gy: number, gm: number, gd: number): JalaliDate {
    const result = jalaali.toJalaali(gy, gm, gd);
    return {
      year: result.jy,
      month: result.jm,
      day: result.jd,
      jDateString: this.normalizeJalaliDate(result.jy, result.jm, result.jd),
    };
  }

  /**
   * تبدیل تاریخ شمسی به میلادی
   */
  static jalaliToGregorianDate(jy: number, jm: number, jd: number): GregorianDate {
    const result = jalaali.toGregorian(jy, jm, jd);
    return {
      year: result.gy,
      month: result.gm,
      day: result.gd,
      isoString: `${result.gy}-${result.gm.toString().padStart(2, '0')}-${result.gd.toString().padStart(2, '0')}`,
    };
  }

  /**
   * دریافت تاریخ امروز به صورت شمسی
   */
  static getTodayJalali(): JalaliDate {
    const now = new Date();
    return this.gregorianToJalaliDate(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate()
    );
  }

  /**
   * ایجاد Date object میلادی از تاریخ شمسی
   */
  static createGregorianDateFromJalali(year: number, month: number, day: number): Date {
    const gregorian = this.jalaliToGregorianDate(year, month, day);
    return new Date(gregorian.year, gregorian.month - 1, gregorian.day);
  }

  /**
   * ایجاد آبجکت DayInfo
   */
  static createDayObject(
    year: number,
    month: number,
    day: number,
  ): DayInfo {
    // تبدیل به تاریخ میلادی برای محاسبات
    const gregorianDate = this.jalaliToGregorianDate(year, month, day);
    const date = new Date(gregorianDate.year, gregorianDate.month - 1, gregorianDate.day);
    
    // محاسبه روز هفته (0=یکشنبه تا 6=شنبه در JavaScript)
    const jsDayOfWeek = date.getDay();
    // تبدیل به فرمت شمسی (0=شنبه تا 6=جمعه)
    const dayOfWeek = ((jsDayOfWeek + 1) % 7) as DayOfWeek;
    
    // بررسی امروز بودن
    const now = new Date();
    const isToday = now.getFullYear() === gregorianDate.year &&
                    now.getMonth() === gregorianDate.month - 1 &&
                    now.getDate() === gregorianDate.day;
    
    const dayInfo: DayInfo = {
      day,
      month,
      year,
      jDate: this.normalizeJalaliDate(year, month, day),
      isoDate: gregorianDate.isoString,
      dayOfWeek,
      dayOfWeekName: WEEK_DAY_NAMES[dayOfWeek],
      dayOfWeekShort: WEEK_DAY_NAMES_SHORT[dayOfWeek],
      monthName: MONTH_NAMES[month - 1],
      isToday,
      isWeekend: this.isWeekend(dayOfWeek),
      isLeapDay: month === 12 && day === 30 && CalendarValidation.isLeapYear(year),
      timestamp: date.getTime(),
    };
    
    return dayInfo;
  }

  /**
   * دریافت روز هفته
   */
  static getDayOfWeek(year: number, month: number, day: number): DayOfWeek {
    const gregorianDate = this.jalaliToGregorianDate(year, month, day);
    const date = new Date(gregorianDate.year, gregorianDate.month - 1, gregorianDate.day);
    const jsDayOfWeek = date.getDay();
    return ((jsDayOfWeek + 1) % 7) as DayOfWeek;
  }

  /**
   * بررسی آخر هفته
   */
  static isWeekend(dayOfWeek: number): boolean {
    return WEEKEND_DAYS.includes(dayOfWeek);
  }
  /**
   * تبدیل تاریخ شمسی به میلادی
   */
  static jalaliToGregorian(year: number, month: number, day: number): GregorianDate {
    return this.jalaliToGregorianDate(year, month, day);
  }

  /**
   * تبدیل تاریخ میلادی به شمسی
   */
  static gregorianToJalali(year: number, month: number, day: number): JalaliDate {
    return this.gregorianToJalaliDate(year, month, day);
  }

  /**
   * دریافت تعداد روزهای ماه
   */
  static getDaysInMonth(year: number, month: number): number {
    return jalaali.jalaaliMonthLength(year, month);
  }

  /**
   * دریافت روز شروع ماه (0=شنبه تا 6=جمعه)
   */
  static getFirstDayOfWeek(year: number, month: number): number {
    return this.getDayOfWeek(year, month, 1);
  }

  /**
   * دریافت ماه قبلی
   */
  static getPrevMonth(year: number, month: number): { year: number; month: number } {
    if (month === 1) {
      return { year: year - 1, month: 12 };
    }
    return { year, month: month - 1 };
  }

  /**
   * دریافت ماه بعدی
   */
  static getNextMonth(year: number, month: number): { year: number; month: number } {
    if (month === 12) {
      return { year: year + 1, month: 1 };
    }
    return { year, month: month + 1 };
  }

  /**
   * مقایسه دو تاریخ شمسی
   * خروجی: -1 اگر date1 زودتر باشد، 0 اگر مساوی، 1 اگر دیرتر باشد
   */
  static compareJalaliDates(
    date1: { year: number; month: number; day: number },
    date2: { year: number; month: number; day: number }
  ): number {
    if (date1.year !== date2.year) {
      return date1.year < date2.year ? -1 : 1;
    }
    if (date1.month !== date2.month) {
      return date1.month < date2.month ? -1 : 1;
    }
    if (date1.day !== date2.day) {
      return date1.day < date2.day ? -1 : 1;
    }
    return 0;
  }

  /**
   * بررسی معتبر بودن تاریخ
   */
  static isValidDate(year: number, month: number, day: number): boolean {
    if (!CalendarValidation.isValidMonth(month)) {
      return false;
    }
    
    const maxDay = this.getDaysInMonth(year, month);
    return day >= 1 && day <= maxDay;
  }

  /**
   * دریافت تفاوت روز بین دو تاریخ
   */
  static getDaysDifference(
    startYear: number, startMonth: number, startDay: number,
    endYear: number, endMonth: number, endDay: number
  ): number {
    const start = this.jalaliToGregorianDate(startYear, startMonth, startDay);
    const end = this.jalaliToGregorianDate(endYear, endMonth, endDay);
    
    const startDate = new Date(start.year, start.month - 1, start.day);
    const endDate = new Date(end.year, end.month - 1, end.day);
    
    const diffTime = endDate.getTime() - startDate.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * اضافه کردن روز به تاریخ شمسی
   */
  static addDays(year: number, month: number, day: number, days: number): JalaliDate {
    const gregorianDate = this.jalaliToGregorianDate(year, month, day);
    const date = new Date(gregorianDate.year, gregorianDate.month - 1, gregorianDate.day);
    date.setDate(date.getDate() + days);
    
    return this.gregorianToJalaliDate(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
  }

  /**
   * اضافه کردن ماه به تاریخ شمسی
   */
  static addMonths(year: number, month: number, months: number): { year: number; month: number } {
    let totalMonths = (year * 12) + (month - 1) + months;
    const newYear = Math.floor(totalMonths / 12);
    const newMonth = (totalMonths % 12) + 1;
    
    return {
      year: newYear,
      month: newMonth,
    };
  }
}