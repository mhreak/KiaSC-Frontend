// lib/calendar/services/conversion.service.ts
import { DateUtils } from '../utils/date.utils';
import { GregorianDate, JalaliDate } from '../types';

export class ConversionService {
  /**
   * تبدیل تاریخ شمسی به میلادی
   */
  jalaliToGregorian(year: number, month: number, day: number): GregorianDate {
    return DateUtils.jalaliToGregorian(year, month, day);
  }

  /**
   * تبدیل تاریخ میلادی به شمسی
   */
  gregorianToJalali(year: number, month: number, day: number): JalaliDate {
    return DateUtils.gregorianToJalali(year, month, day);
  }

  /**
   * تبدیل رشته تاریخ شمسی به آبجکت
   */
  parseJalaliDate(dateString: string): JalaliDate {
    const [year, month, day] = dateString.split('/').map(Number);
    
    if (!year || !month || !day) {
      throw new Error('فرمت تاریخ نامعتبر است. از فرمت YYYY/MM/DD استفاده کنید');
    }
    
    return {
      year,
      month,
      day,
      jDateString: DateUtils.normalizeJalaliDate(year, month, day),
    };
  }

  /**
   * فرمت‌بندی تاریخ شمسی
   */
  formatDate(
    year: number, 
    month: number, 
    day: number, 
    format: 'full' | 'short' | 'numeric' = 'full'
  ): string {
    const normalizedDate = DateUtils.normalizeJalaliDate(year, month, day);
    
    switch (format) {
      case 'full':
        // مثال: ۱۴۰۳/۰۵/۲۷
        return this.toPersianDigits(normalizedDate);
      case 'short':
        // مثال: ۰۳/۰۵/۲۷
        return this.toPersianDigits(
          `${year.toString().slice(-2)}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`
        );
      case 'numeric':
        // مثال: 1403/05/27
        return normalizedDate;
      default:
        return normalizedDate;
    }
  }

  /**
   * تبدیل اعداد انگلیسی به فارسی
   */
  private toPersianDigits(input: string | number): string {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return input.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  }

  /**
   * تبدیل اعداد فارسی به انگلیسی
   */
  private toEnglishDigits(input: string): string {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    return input
      .split('')
      .map(char => {
        const index = persianDigits.indexOf(char);
        return index !== -1 ? englishDigits[index] : char;
      })
      .join('');
  }

  /**
   * پارس و اعتبارسنجی تاریخ
   */
  parseAndValidateDate(dateString: string): JalaliDate | null {
    try {
      const parsed = this.parseJalaliDate(dateString);
      if (DateUtils.isValidDate(parsed.year, parsed.month, parsed.day)) {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * تبدیل تاریخ شمسی به timestamp
   */
  jalaliToTimestamp(year: number, month: number, day: number): number {
    const gregorian = DateUtils.jalaliToGregorian(year, month, day);
    const date = new Date(gregorian.year, gregorian.month - 1, gregorian.day);
    return date.getTime();
  }

  /**
   * تبدیل timestamp به تاریخ شمسی
   */
  timestampToJalali(timestamp: number): JalaliDate {
    const date = new Date(timestamp);
    return DateUtils.gregorianToJalali(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
  }

  /**
   * دریافت نام ماه به فارسی
   */
  getMonthName(month: number): string {
    const monthNames = [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ];
    
    if (month < 1 || month > 12) {
      throw new Error('ماه باید بین 1 تا 12 باشد');
    }
    
    return monthNames[month - 1];
  }

  /**
   * دریافت نام روز هفته به فارسی
   */
  getDayOfWeekName(dayOfWeek: number): string {
    const dayNames = [
      'شنبه',
      'یکشنبه',
      'دوشنبه',
      'سه‌شنبه',
      'چهارشنبه',
      'پنجشنبه',
      'جمعه',
    ];
    
    if (dayOfWeek < 0 || dayOfWeek > 6) {
      throw new Error('روز هفته باید بین 0 تا 6 باشد');
    }
    
    return dayNames[dayOfWeek];
  }
}