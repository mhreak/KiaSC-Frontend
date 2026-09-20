// src/lib/calendar/utils/validation.utils.ts
import * as jalaali from 'jalaali-js';

export class CalendarValidation {
  /**
   * اعتبارسنجی سال شمسی
   */
  static isValidYear(year: number, minYear: number = 1320, maxYear: number = 1480): boolean {
    if (!Number.isInteger(year)) {
      return false;
    }
    return year >= minYear && year <= maxYear;
  }

  /**
   * اعتبارسنجی ماه شمسی
   */
  static isValidMonth(month: number): boolean {
    if (!Number.isInteger(month)) {
      return false;
    }
    return month >= 1 && month <= 12;
  }

  /**
   * اعتبارسنجی روز شمسی
   */
  static isValidDay(year: number, month: number, day: number): boolean {
    if (!Number.isInteger(day)) {
      return false;
    }
    
    const maxDay = this.getMaxDayOfMonth(year, month);
    return day >= 1 && day <= maxDay;
  }

  /**
   * اعتبارسنجی کامل تاریخ شمسی
   */
  static isValidJalaliDate(year: number, month: number, day: number): boolean {
    return (
      this.isValidYear(year) &&
      this.isValidMonth(month) &&
      this.isValidDay(year, month, day)
    );
  }

  /**
   * دریافت حداکثر روزهای یک ماه
   */
  static getMaxDayOfMonth(year: number, month: number): number {
    return jalaali.jalaaliMonthLength(year, month);
  }

  /**
   * بررسی سال کبیسه
   */
  static isLeapYear(year: number): boolean {
    return jalaali.isLeapJalaaliYear(year);
  }
}