// components/persian-date-picker/date-time-picker-unified.tsx
"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, CalendarClock, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCalendar, WEEK_DAY_NAMES_SHORT } from "@/lib/calendar";
import { DayInfo, JalaliDate } from "@/lib/calendar/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toPersianDigits } from "@/utils/numberConversions";

export interface TimeValue {
  hour: number;
  minute: number;
}

export interface DateTimeValue {
  date: JalaliDate;
  time: TimeValue;
}

interface PersianDateTimePickerProps {
  value?: DateTimeValue | null;
  onChange?: (dateTime: DateTimeValue | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
  minDate?: JalaliDate;
  maxDate?: JalaliDate;
  showMonthSelector?: boolean;
  showYearSelector?: boolean;
  timeFormat?: "24h" | "12h";
  minuteStep?: number;
  showTimePicker?: boolean;
}

export function PersianDateTimePicker({
  value,
  onChange,
  placeholder = "انتخاب تاریخ و زمان",
  className,
  disabled = false,
  error,
  minDate,
  maxDate,
  showMonthSelector = true,
  showYearSelector = true,
  timeFormat = "24h",
  minuteStep = 5,
  showTimePicker = true,
}: PersianDateTimePickerProps) {
  const calendar = getCalendar();
  const [open, setOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] =
    useState<DateTimeValue | null>(value || null);

  // دریافت تاریخ امروز شمسی
  const today = useMemo(() => calendar.getToday(), [calendar]);

  // State برای نمایش تقویم - استفاده از تاریخ شمسی
  const [viewMode, setViewMode] = useState<
    "days" | "months" | "years" | "time"
  >("days");
  const [viewYear, setViewYear] = useState(value?.date.year || today.year);
  const [viewMonth, setViewMonth] = useState(value?.date.month || today.month);

  // State برای نمایش زمان
  const [selectedHour, setSelectedHour] = useState(
    value?.time.hour ?? today.day,
  );
  const [selectedMinute, setSelectedMinute] = useState(value?.time.minute ?? 0);
  const [timeViewMode, setTimeViewMode] = useState<"hours" | "minutes">(
    "hours",
  );

  const yearButtonRef = useRef<HTMLButtonElement | null>(null);
  const yearContainerRef = useRef<HTMLDivElement | null>(null);
  const hourContainerRef = useRef<HTMLDivElement | null>(null);
  const minuteContainerRef = useRef<HTMLDivElement | null>(null);
  const selectedHourRef = useRef<HTMLButtonElement | null>(null);
  const selectedMinuteRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedDateTime(value);
      if (value) {
        setViewYear(value.date.year);
        setViewMonth(value.date.month);
        setSelectedHour(value.time.hour);
        setSelectedMinute(value.time.minute);
      }
    }
  }, [value]);

  // اسکرول به سال انتخاب شده
  useEffect(() => {
    if (
      viewMode === "years" &&
      yearButtonRef.current &&
      yearContainerRef.current
    ) {
      const timeoutId = setTimeout(() => {
        yearButtonRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [viewMode]);

  // اسکرول به ساعت انتخاب شده
  useEffect(() => {
    if (
      timeViewMode === "hours" &&
      selectedHourRef.current &&
      hourContainerRef.current
    ) {
      const timeoutId = setTimeout(() => {
        selectedHourRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [timeViewMode]);

  // اسکرول به دقیقه انتخاب شده
  useEffect(() => {
    if (
      timeViewMode === "minutes" &&
      selectedMinuteRef.current &&
      minuteContainerRef.current
    ) {
      const timeoutId = setTimeout(() => {
        selectedMinuteRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [timeViewMode]);

  const days = useMemo(() => {
    if (viewMode === "days") {
      return calendar.getMonthDays(viewYear, viewMonth);
    }
    return [];
  }, [calendar, viewYear, viewMonth, viewMode]);

  const monthInfo = useMemo(() => {
    return calendar.getMonthInfo(viewYear, viewMonth);
  }, [calendar, viewYear, viewMonth]);

  const months = useMemo(() => {
    const monthList = [];
    for (let i = 1; i <= 12; i++) {
      monthList.push(calendar.getMonthInfo(viewYear, i));
    }
    return monthList;
  }, [calendar, viewYear]);

  const years = useMemo(() => {
    const yearList = [];
    const startYear = Math.max(1320, viewYear - 50);
    const endYear = Math.min(1480, viewYear + 50);
    for (let y = startYear; y <= endYear; y++) {
      yearList.push(y);
    }
    return yearList;
  }, [viewYear]);

  const hours = useMemo(() => {
    const hourList = [];
    const maxHour = timeFormat === "24h" ? 23 : 12;
    const startHour = timeFormat === "24h" ? 0 : 1;

    for (let h = startHour; h <= maxHour; h++) {
      hourList.push(h);
    }
    return hourList;
  }, [timeFormat]);

  const minutes = useMemo(() => {
    const minuteList = [];
    for (let m = 0; m < 60; m += minuteStep) {
      minuteList.push(m);
    }
    return minuteList;
  }, [minuteStep]);

  const displayValue = useMemo(() => {
    if (!selectedDateTime) return "";

    const dateStr = toPersianDigits(
      `${selectedDateTime.date.year}/${selectedDateTime.date.month.toString().padStart(2, "0")}/${selectedDateTime.date.day.toString().padStart(2, "0")}`,
    );
    const timeStr = toPersianDigits(
      `${selectedDateTime.time.hour.toString().padStart(2, "0")}:${selectedDateTime.time.minute.toString().padStart(2, "0")}`,
    );

    return `${dateStr} - ${timeStr}`;
  }, [selectedDateTime]);

  const handleDayClick = useCallback(
    (day: DayInfo) => {
      const newDate: JalaliDate = {
        year: day.year,
        month: day.month,
        day: day.day,
        jDateString: day.jDate,
      };

      const newDateTime: DateTimeValue = {
        date: newDate,
        time: {
          hour: selectedHour,
          minute: selectedMinute,
        },
      };

      setSelectedDateTime(newDateTime);
      onChange?.(newDateTime);

      // اگر زمان هم انتخاب شده، popover را ببند
      if (
        !showTimePicker ||
        (selectedHour !== undefined && selectedMinute !== undefined)
      ) {
        setOpen(false);
      }
    },
    [selectedHour, selectedMinute, onChange, showTimePicker],
  );

  const handleMonthSelect = useCallback((month: number) => {
    setViewMonth(month);
    setViewMode("days");
  }, []);

  const handleYearSelect = useCallback((year: number) => {
    setViewYear(year);
    setViewMode("days");
  }, []);

  const handleNavigate = useCallback(
    (direction: -1 | 1) => {
      if (viewMode === "days") {
        const next = calendar.navigateMonth(viewYear, viewMonth, direction);
        setViewYear(next.year);
        setViewMonth(next.month);
      } else if (viewMode === "months") {
        setViewYear(viewYear + direction);
      } else if (viewMode === "years") {
        setViewYear(viewYear + direction * 10);
      }
    },
    [calendar, viewYear, viewMonth, viewMode],
  );

  const handleHourClick = useCallback(
    (hour: number) => {
      setSelectedHour(hour);
      setTimeViewMode("minutes");

      // اگر تاریخ انتخاب شده، بلافاصله آپدیت کن
      if (selectedDateTime?.date) {
        const newDateTime: DateTimeValue = {
          date: selectedDateTime.date,
          time: {
            hour,
            minute: selectedMinute,
          },
        };
        setSelectedDateTime(newDateTime);
        onChange?.(newDateTime);
      }
    },
    [selectedDateTime, selectedMinute, onChange],
  );

  const handleMinuteClick = useCallback(
    (minute: number) => {
      setSelectedMinute(minute);

      // اگر تاریخ انتخاب شده، آپدیت کن
      if (selectedDateTime?.date) {
        const newDateTime: DateTimeValue = {
          date: selectedDateTime.date,
          time: {
            hour: selectedHour,
            minute,
          },
        };
        setSelectedDateTime(newDateTime);
        onChange?.(newDateTime);
      }

      setTimeViewMode("hours");
    },
    [selectedDateTime, selectedHour, onChange],
  );

  const handleNowClick = useCallback(() => {
    const now = new Date();
    const currentDateTime: DateTimeValue = {
      date: calendar.toJalali(
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate(),
      ),
      time: {
        hour: now.getHours(),
        minute: now.getMinutes(),
      },
    };

    setSelectedDateTime(currentDateTime);
    setViewYear(currentDateTime.date.year);
    setViewMonth(currentDateTime.date.month);
    setSelectedHour(currentDateTime.time.hour);
    setSelectedMinute(currentDateTime.time.minute);
    onChange?.(currentDateTime);
    setOpen(false);
  }, [calendar, onChange]);

  const handleClear = useCallback(() => {
    setSelectedDateTime(null);
    onChange?.(null);
  }, [onChange]);

  const handleConfirm = useCallback(() => {
    if (selectedDateTime) {
      onChange?.(selectedDateTime);
      setOpen(false);
    }
  }, [selectedDateTime, onChange]);

  return (
    <div className={cn("relative", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          nativeButton={false}
          render={
            <div className="relative">
              <Input
                value={displayValue}
                placeholder={placeholder}
                disabled={disabled}
                readOnly
                className={cn(
                  "pl-10 cursor-pointer",
                  error && "border-red-500",
                  disabled && "opacity-50 cursor-not-allowed",
                )}
                onClick={() => !disabled && setOpen(true)}
              />
              <CalendarClock className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />

              {selectedDateTime && !disabled && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  <span className="text-lg"><X size={18}/></span>
                </button>
              )}
            </div>
          }
        />

        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 bg-white rounded-lg shadow-lg min-w-80">
            {/* تب‌ها */}
            <div className="flex gap-2 mb-4 border-b">
              <button
                onClick={() => setViewMode("days")}
                className={cn(
                  "flex-1 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer",
                  viewMode !== "time"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500",
                )}
                type="button"
              >
                تاریخ
              </button>

              {showTimePicker && (
                <button
                  onClick={() => setViewMode("time")}
                  className={cn(
                    "flex-1 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer",
                    viewMode === "time"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500",
                  )}
                  type="button"
                >
                  زمان
                </button>
              )}
            </div>

            {/* بخش تاریخ */}
            {viewMode !== "time" && (
              <>
                {/* هدر تقویم */}
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigate(-1)}
                    type="button"
                  >
                    <ArrowRight />
                  </Button>

                  <div className="flex items-center gap-2">
                    {showMonthSelector && (
                      <button
                        onClick={() => setViewMode("months")}
                        className="text-md font-semibold hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer"
                      >
                        {monthInfo.monthName}
                      </button>
                    )}

                    {showYearSelector && (
                      <button
                        onClick={() => setViewMode("years")}
                        className="text-md font-semibold hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer"
                      >
                        {toPersianDigits(viewYear)}
                      </button>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigate(1)}
                    type="button"
                  >
                    <ArrowLeft />
                  </Button>
                </div>

                {/* نمایش روزها */}
                {viewMode === "days" && (
                  <>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {WEEK_DAY_NAMES_SHORT.map((dayName, index) => (
                        <div
                          key={index}
                          className="text-center text-xs font-medium text-gray-500 w-8"
                        >
                          {dayName}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {days.map((day, index) => {
                        const isCurrentMonth = day.month === viewMonth;
                        const isToday = day.isToday;
                        const isWeekend = day.isWeekend;
                        const isHoliday = day.isHoliday;
                        const selected =
                          selectedDateTime &&
                          selectedDateTime.date.year === day.year &&
                          selectedDateTime.date.month === day.month &&
                          selectedDateTime.date.day === day.day;

                        return (
                          <button
                            key={`${day.jDate}-${index}`}
                            onClick={() => handleDayClick(day)}
                            type="button"
                            className={cn(
                              "h-8 w-8 text-sm rounded-full flex items-center justify-center transition-colors cursor-pointer",
                              !isCurrentMonth && "text-gray-300",
                              isWeekend &&
                                isCurrentMonth &&
                                !selected &&
                                "text-red-500",
                              isHoliday &&
                                isCurrentMonth &&
                                !selected &&
                                "text-green-600",
                              isToday && !selected && "bg-primary/30 font-bold",
                              selected &&
                                "bg-primary text-primary-foreground font-bold hover:bg-primary/80",
                              !selected && "hover:bg-gray-200",
                            )}
                          >
                            {toPersianDigits(day.day)}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* نمایش ماه‌ها */}
                {viewMode === "months" && (
                  <div className="grid grid-cols-3 gap-2 min-h-56">
                    {months.map((month) => (
                      <button
                        key={month.monthNumber}
                        onClick={() => handleMonthSelect(month.monthNumber)}
                        type="button"
                        className={cn(
                          "p-2 h-fit text-md rounded-lg transition-colors cursor-pointer",
                          month.monthNumber === viewMonth
                            ? "bg-primary text-primary-foreground font-bold"
                            : "hover:bg-gray-100",
                        )}
                      >
                        {month.monthName}
                      </button>
                    ))}
                  </div>
                )}

                {/* نمایش سال‌ها */}
                {viewMode === "years" && (
                  <div
                    ref={yearContainerRef}
                    className="grid grid-cols-3 gap-2 max-h-56 overflow-y-auto scroll-smooth"
                  >
                    {years.map((year) => (
                      <button
                        key={year}
                        ref={year === viewYear ? yearButtonRef : undefined}
                        onClick={() => handleYearSelect(year)}
                        type="button"
                        className={cn(
                          "p-2 text-sm rounded-lg transition-colors cursor-pointer",
                          year === viewYear
                            ? "bg-primary text-primary-foreground font-bold"
                            : "hover:bg-gray-100",
                        )}
                      >
                        {toPersianDigits(year)}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* بخش زمان */}
            {viewMode === "time" && showTimePicker && (
              <div className="min-h-60">
                {/* تب‌های ساعت و دقیقه */}
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setTimeViewMode("hours")}
                    className={cn(
                      "flex-1 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer",
                      timeViewMode === "hours"
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-100",
                    )}
                    type="button"
                  >
                    ساعت
                  </button>

                  <button
                    onClick={() => setTimeViewMode("minutes")}
                    className={cn(
                      "flex-1 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer",
                      timeViewMode === "minutes"
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-100",
                    )}
                    type="button"
                  >
                    دقیقه
                  </button>
                </div>

                {/* نمایش ساعت‌ها */}
                {timeViewMode === "hours" && (
                  <div
                    ref={hourContainerRef}
                    className="grid grid-cols-4 gap-1 max-h-48 overflow-y-auto scroll-smooth"
                  >
                    {hours.map((hour) => {
                      const isSelected = selectedHour === hour;

                      return (
                        <button
                          key={hour}
                          ref={isSelected ? selectedHourRef : undefined}
                          onClick={() => handleHourClick(hour)}
                          type="button"
                          className={cn(
                            "p-2 text-sm rounded-lg transition-colors cursor-pointer",
                            isSelected
                              ? "bg-primary text-primary-foreground font-bold"
                              : "hover:bg-gray-100",
                          )}
                        >
                          {toPersianDigits(hour.toString().padStart(2, "0"))}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* نمایش دقیقه‌ها */}
                {timeViewMode === "minutes" && (
                  <div
                    ref={minuteContainerRef}
                    className="grid grid-cols-4 gap-1 max-h-48 overflow-y-auto scroll-smooth"
                  >
                    {minutes.map((minute) => {
                      const isSelected = selectedMinute === minute;

                      return (
                        <button
                          key={minute}
                          ref={isSelected ? selectedMinuteRef : undefined}
                          onClick={() => handleMinuteClick(minute)}
                          type="button"
                          className={cn(
                            "p-2 text-sm rounded-lg transition-colors cursor-pointer",
                            isSelected
                              ? "bg-primary text-primary-foreground font-bold"
                              : "hover:bg-gray-100",
                          )}
                        >
                          {toPersianDigits(minute.toString().padStart(2, "0"))}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* فوتر */}
            <div className="mt-4 pt-3 border-t flex justify-between items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNowClick}
                type="button"
              >
                الان
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpen(false)}
                  type="button"
                >
                  انصراف
                </Button>

                <Button   
                  size="sm"
                  onClick={handleConfirm}
                  type="button"
                  disabled={!selectedDateTime}
                >
                  تایید
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
