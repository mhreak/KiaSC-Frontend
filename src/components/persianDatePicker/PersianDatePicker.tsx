// components/persian-date-picker/persian-date-picker-advanced.tsx
"use client";

import * as React from "react";
import { useState, useMemo, useCallback, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarIcon,
  ChevronDown,
  X,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toPersianDigits } from "@/utils/numberConversions";

interface PersianDatePickerProps {
  value?: JalaliDate | null;
  onChange?: (date: JalaliDate | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
  minDate?: JalaliDate;
  maxDate?: JalaliDate;
  showMonthSelector?: boolean;
  showYearSelector?: boolean;
}

export function PersianDatePicker({
  value,
  onChange,
  placeholder = "انتخاب تاریخ",
  className,
  disabled = false,
  error,
  minDate,
  maxDate,
  showMonthSelector = true,
  showYearSelector = true,
}: PersianDatePickerProps) {
  const calendar = getCalendar();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<JalaliDate | null>(
    value || null,
  );
  const [viewMode, setViewMode] = useState<"days" | "months" | "years">("days");

  const today = useMemo(() => calendar.getToday(), [calendar]);
  const [viewYear, setViewYear] = useState(today.year);
  const [viewMonth, setViewMonth] = useState(today.month);

  const yearButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const yearContainerRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedDate(value);
      if (value) {
        setViewYear(value.year);
        setViewMonth(value.month);
      }
    }
  }, [value]);

  useEffect(() => {
    if (
      viewMode === "years" &&
      yearButtonRef.current &&
      yearContainerRef.current
    ) {
      // کمی تاخیر برای اطمینان از رندر شدن
      const timeoutId = setTimeout(() => {
        yearButtonRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 50);

      return () => clearTimeout(timeoutId);
    }
  }, [viewMode]);

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

  const displayValue = useMemo(() => {
    if (!selectedDate) return "";
    return calendar.formatDate(
      selectedDate.year,
      selectedDate.month,
      selectedDate.day,
      "full",
    );
  }, [selectedDate, calendar]);

  const handleDayClick = useCallback(
    (day: DayInfo) => {
      const newDate: JalaliDate = {
        year: day.year,
        month: day.month,
        day: day.day,
        jDateString: day.jDate,
      };

      setSelectedDate(newDate);
      onChange?.(newDate);
      setOpen(false);
    },
    [onChange],
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

  const handleClear = useCallback(() => {
    setSelectedDate(null);
    onChange?.(null);
  }, [onChange]);

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
                  error &&
                    "border border-destructive focus-visible:ring-destructive",
                  disabled && "opacity-50 cursor-not-allowed",
                )}
                onClick={() => !disabled && setOpen(true)}
              />
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
              {selectedDate && !disabled && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  <span className="text-lg">
                    <X size={18} />
                  </span>
                </button>
              )}
            </div>
          }
        ></PopoverTrigger>

        <PopoverContent className="w-auto p-0 rounded-3xl" align="start">
          <div className="p-3 bg-white rounded-3xl shadow-lg min-w-78">
            {/* هدر */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => handleNavigate(-1)}
                type="button"
              >
                <ArrowRight />
              </Button>

              <div className="flex items-center gap-2">
                {showMonthSelector && (
                  <button
                    onClick={() => setViewMode("months")}
                    className="text-md font-semibold hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer transition-all duration-100 ease-in-out"
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
                size="icon-sm"
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
                      selectedDate &&
                      selectedDate.year === day.year &&
                      selectedDate.month === day.month &&
                      selectedDate.day === day.day;

                    return (
                      <button
                        key={`${day.jDate}-${index}`}
                        onClick={() => handleDayClick(day)}
                        type="button"
                        className={cn(
                          "h-8 w-8 text-sm rounded-full flex items-center justify-center transition-colors cursor-pointer animate-slide-right",
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
                        // style={{animationDelay: `${(index+1)*10}ms`}}
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
          </div>
        </PopoverContent>
      </Popover>

      {/* {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )} */}
    </div>
  );
}
