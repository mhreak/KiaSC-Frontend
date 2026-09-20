// components/persian-date-picker/time-picker.tsx
"use client";

import * as React from "react";
import { useState, useMemo, useCallback, useEffect } from "react";
import { Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

interface PersianTimePickerProps {
  value?: TimeValue | null;
  onChange?: (time: TimeValue | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
  format?: "24h" | "12h";
  showSeconds?: boolean;
  minuteStep?: number;
}

export function PersianTimePicker({
  value,
  onChange,
  placeholder = "انتخاب زمان",
  className,
  disabled = false,
  error,
  format = "24h",
  showSeconds = false,
  minuteStep = 5,
}: PersianTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<TimeValue | null>(
    value || null,
  );
  const [viewMode, setViewMode] = useState<"hours" | "minutes">("hours");
  const [tempHour, setTempHour] = useState<number>(value?.hour ?? 12);
  const [tempMinute, setTempMinute] = useState<number>(value?.minute ?? 0);

  const hourContainerRef = React.useRef<HTMLDivElement | null>(null);
  const minuteContainerRef = React.useRef<HTMLDivElement | null>(null);
  const selectedHourRef = React.useRef<HTMLButtonElement | null>(null);
  const selectedMinuteRef = React.useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedTime(value);
      if (value) {
        setTempHour(value.hour);
        setTempMinute(value.minute);
      }
    }
  }, [value]);

  // اسکرول به ساعت انتخاب شده
  useEffect(() => {
    if (
      viewMode === "hours" &&
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
  }, [viewMode]);

  // اسکرول به دقیقه انتخاب شده
  useEffect(() => {
    if (
      viewMode === "minutes" &&
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
  }, [viewMode]);

  const hours = useMemo(() => {
    const hourList = [];
    const maxHour = format === "24h" ? 23 : 12;
    const startHour = format === "24h" ? 0 : 1;

    for (let h = startHour; h <= maxHour; h++) {
      hourList.push(h);
    }
    return hourList;
  }, [format]);

  const minutes = useMemo(() => {
    const minuteList = [];
    for (let m = 0; m < 60; m += minuteStep) {
      minuteList.push(m);
    }
    return minuteList;
  }, [minuteStep]);

  const displayValue = useMemo(() => {
    if (!selectedTime) return "";
    const hourStr = toPersianDigits(
      selectedTime.hour.toString().padStart(2, "0"),
    );
    const minuteStr = toPersianDigits(
      selectedTime.minute.toString().padStart(2, "0"),
    );
    return `${hourStr}:${minuteStr}`;
  }, [selectedTime]);

  const handleHourClick = useCallback((hour: number) => {
    setTempHour(hour);
    setViewMode("minutes");
  }, []);

  const handleMinuteClick = useCallback(
    (minute: number) => {
      const newTime: TimeValue = {
        hour: tempHour,
        minute,
      };

      setSelectedTime(newTime);
      setTempMinute(minute);
      onChange?.(newTime);
      setOpen(false);
      setViewMode("hours");
    },
    [tempHour, onChange],
  );

  const handleNowClick = useCallback(() => {
    const now = new Date();
    const currentTime: TimeValue = {
      hour: now.getHours(),
      minute: now.getMinutes(),
    };

    setSelectedTime(currentTime);
    setTempHour(currentTime.hour);
    setTempMinute(currentTime.minute);
    onChange?.(currentTime);
    setOpen(false);
  }, [onChange]);

  const handleClear = useCallback(() => {
    setSelectedTime(null);
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
                  error && "border-red-500",
                  disabled && "opacity-50 cursor-not-allowed",
                )}
                onClick={() => !disabled && setOpen(true)}
              />
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />

              {selectedTime && !disabled && (
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
        />

        <PopoverContent className="w-full p-0 rounded-3xl" align="start">
          <div className="p-3 bg-white rounded-3xl shadow-lg min-w-80 ">
            {/* هدر */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">
                {viewMode === "hours" ? "انتخاب ساعت" : "انتخاب دقیقه"}
              </h3>

              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setViewMode(viewMode === "hours" ? "minutes" : "hours")
                }
                type="button"
                className={"w-fit text-sm"}
              >
                {viewMode === "hours" ? "دقیقه" : "ساعت"}
              </Button>
            </div>

            {/* نمایش ساعت‌ها */}
            {viewMode === "hours" && (
              <div
                ref={hourContainerRef}
                className="grid grid-cols-4 gap-1 max-h-48 overflow-y-auto scroll-smooth"
              >
                {hours.map((hour) => {
                  const isSelected = tempHour === hour;

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
            {viewMode === "minutes" && (
              <div
                ref={minuteContainerRef}
                className="grid grid-cols-4 gap-1 max-h-48 overflow-y-auto scroll-smooth"
              >
                {minutes.map((minute) => {
                  const isSelected = tempMinute === minute;

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

            {/* فوتر */}
            <div className="mt-4 pt-3 border-t flex justify-between items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNowClick}
                type="button"
                className={"w-fit"}
              >
                الان
              </Button>

              {selectedTime && (
                <div className="text-md text-gray-500">{displayValue}</div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
