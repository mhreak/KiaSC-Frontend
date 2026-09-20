// lib/calendar/services/holiday.service.ts
import { HolidayInfo } from '../types';
import { OFFICIAL_HOLIDAYS } from '../constants';
import { DateUtils } from '../utils/date.utils';


export class HolidayService {
  /**
   * دریافت تعطیلات رسمی یک سال
   */
  getOfficialHolidays(year: number): HolidayInfo[] {
    return OFFICIAL_HOLIDAYS.map(holiday => {
      const dayInfo = DateUtils.createDayObject(year, holiday.month, holiday.day);
      return {
        ...dayInfo,
        holidayTitle: holiday.title,
        date: DateUtils.normalizeJalaliDate(year, holiday.month, holiday.day),
        isHoliday: true,
      };
    });
  }

  /**
   * بررسی تعطیل بودن یک روز
   */
  isHoliday(year: number, month: number, day: number): boolean {
    return OFFICIAL_HOLIDAYS.some(
      holiday => holiday.month === month && holiday.day === day
    );
  }

  /**
   * دریافت عنوان تعطیلی
   */
  getHolidayTitle(year: number, month: number, day: number): string | null {
    const holiday = OFFICIAL_HOLIDAYS.find(
      h => h.month === month && h.day === day
    );
    return holiday ? holiday.title : null;
  }

  /**
   * دریافت همه تعطیلات یک ماه
   */
  getMonthHolidays(year: number, month: number): HolidayInfo[] {
    return OFFICIAL_HOLIDAYS
      .filter(holiday => holiday.month === month)
      .map(holiday => {
        const dayInfo = DateUtils.createDayObject(year, holiday.month, holiday.day);
        return {
          ...dayInfo,
          holidayTitle: holiday.title,
          date: DateUtils.normalizeJalaliDate(year, holiday.month, holiday.day),
          isHoliday: true,
        };
      });
  }
}