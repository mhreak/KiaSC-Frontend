import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  getRemainingDaysOfMonth, 
  getFullMonthDays,
  MonthDaysResult,
  PersianDate,
  CalendarDay
} from '@/lib/calendar';

interface UseCalendarOptions {
  includePastDays?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number; // میلی‌ثانیه
}

export function useCalendar(options: UseCalendarOptions = {}) {
  const { 
    includePastDays = false, 
    autoRefresh = false,
    refreshInterval = 60000, // 1 دقیقه
  } = options;
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState<MonthDaysResult | null>(null);
  
  // تابع به‌روزرسانی
  const refresh = useCallback(() => {
    setCurrentDate(new Date());
  }, []);
  
  // تابع رفتن به ماه بعد
  const nextMonth = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  }, [currentDate]);
  
  // تابع رفتن به ماه قبل
  const prevMonth = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  }, [currentDate]);
  
  // تابع رفتن به امروز
  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);
  
  // محاسبه داده‌های تقویم
  useEffect(() => {
    const data = includePastDays 
      ? getFullMonthDays(currentDate)
      : getRemainingDaysOfMonth(currentDate);
    
    setCalendarData(data);
  }, [currentDate, includePastDays]);
  
  // آپدیت خودکار
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      refresh();
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refresh]);
  
  // فیلتر کردن روزها بر اساس وضعیت
  const todayDays = useMemo(() => {
    return calendarData?.days.filter(day => day.isToday) || [];
  }, [calendarData]);
  
  const futureDays = useMemo(() => {
    return calendarData?.days.filter(day => day.isFuture) || [];
  }, [calendarData]);
  
  const pastDays = useMemo(() => {
    return calendarData?.days.filter(day => day.isPast) || [];
  }, [calendarData]);
  
  return {
    // داده‌های اصلی
    days: calendarData?.days || [],
    currentMonth: calendarData?.currentMonth,
    totalDays: calendarData?.totalDaysInMonth || 0,
    remainingDays: calendarData?.remainingDays || 0,
    firstDayOfMonth: calendarData?.firstDayOfMonth,
    lastDayOfMonth: calendarData?.lastDayOfMonth,
    
    // فیلترهای روزها
    todayDays,
    futureDays,
    pastDays,
    
    // توابع کنترل
    refresh,
    nextMonth,
    prevMonth,
    goToToday,
    
    // وضعیت
    isLoading: !calendarData,
    currentDate,
  };
}