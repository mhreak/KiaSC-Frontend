// lib/calendar/index.ts
import { PersianCalendar } from './calendar';
import { CalendarConfig } from './types';

// Singleton
let calendarInstance: PersianCalendar | null = null;

/**
 * دریافت نمونه یکتا از تقویم
 */
export function getCalendar(): PersianCalendar {
  if (!calendarInstance) {
    calendarInstance = new PersianCalendar();
  }
  return calendarInstance;
}

/**
 * ایجاد نمونه جدید از تقویم با تنظیمات دلخواه
 */
export function createCalendar(config?: Partial<CalendarConfig>): PersianCalendar {
  return new PersianCalendar(config);
}

// Export همه چیز
export * from './types';
export * from './constants';
export * from './services';
export * from './calendar';

// Export پیش‌فرض
export default PersianCalendar;