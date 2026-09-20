import { CalendarDay, PersianDate } from '@/lib/calendar/types';
import moment from 'moment-jalaali';

/**
 * فرمت کردن تاریخ شمسی به صورت String
 */
export function formatPersianDate(
  year: number, 
  month: number, 
  day: number, 
  format: string = 'jYYYY/jMM/jDD'
): string {
  return moment(`${year}/${month}/${day}`, 'jYYYY/jMM/jDD').format(format);
}

/**
 * فرمت فارسی تاریخ
 */
export function formatPersianDateFarsi(date: PersianDate): string {
  return `${date.day} ${date.monthName} ${date.year}`;
}

/**
 * دریافت تاریخ امروز به صورت فرمت شده
 */
export function getTodayFormatted(format: string = 'jYYYY/jMM/jDD'): string {
  return moment().format(format);
}

/**
 * مرتب‌سازی روزهای تقویم بر اساس تاریخ
 */
export function sortCalendarDays(days: CalendarDay[]): CalendarDay[] {
  return [...days].sort((a, b) => a.timestamp - b.timestamp);
}

/**
 * فیلتر کردن روزهای آینده
 */
export function getFutureDays(days: CalendarDay[]): CalendarDay[] {
  return days.filter(day => day.isFuture);
}

/**
 * فیلتر کردن روزهای گذشته
 */
export function getPastDays(days: CalendarDay[]): CalendarDay[] {
  return days.filter(day => day.isPast);
}

/**
 * دریافت روزهای هفته
 */
export function getWeekDays(): string[] {
  return ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
}

/**
 * بررسی اینکه آیا تاریخ در محدوده مشخص است
 */
export function isDateInRange(date: CalendarDay, start: CalendarDay, end: CalendarDay): boolean {
  return date.timestamp >= start.timestamp && date.timestamp <= end.timestamp;
}

/**
 * گروه‌بندی روزها بر اساس هفته
 */
export function groupDaysByWeek(days: CalendarDay[]): CalendarDay[][] {
  const weeks: CalendarDay[][] = [];
  let currentWeek: CalendarDay[] = [];
  
  days.forEach((day, index) => {
    const dayOfWeek = day.date.dayOfWeek;
    // در تقویم شمسی شنبه = 0
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
    
    if (index === days.length - 1 && currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
  });
  
  return weeks;
}