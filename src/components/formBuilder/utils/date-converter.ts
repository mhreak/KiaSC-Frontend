// utils/date-converter.ts

import { toJalaali, toGregorian } from "jalaali-js";
import type { JalaliDate } from "@/lib/calendar/types";
import { TimeValue } from "@/components/persianDatePicker/PersianTimePicker";
import { DateTimeValue } from "@/components/persianDatePicker/PersianDateTimePicker";

export function gregorianToJalali(date?: string | null): JalaliDate | null {
  if (!date) return null;

  const [gy, gm, gd] = date.split("-").map(Number);

  if (!gy || !gm || !gd) {
    return null;
  }

  const { jy, jm, jd } = toJalaali(gy, gm, gd);

  return {
    year: jy,
    month: jm,
    day: jd,
    jDateString: `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`,
  };
}

export function jalaliToGregorian(date?: JalaliDate | null): string {
  if (!date) return "";

  const { gy, gm, gd } = toGregorian(date.year, date.month, date.day);

  return `${gy}-${String(gm).padStart(2, "0")}-${String(gd).padStart(2, "0")}`;
}

export function stringToTimeValue(time?: string | null): TimeValue | null {
  if (!time) return null;

  const [hour, minute] = time.split(":").map(Number);

  if (
    !Number.isInteger(hour) ||
    !Number.isInteger(minute) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return null;
  }

  return {
    hour,
    minute,
  };
}

export function timeValueToString(time?: TimeValue | null): string {
  if (!time) return "";

  return `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(
    2,
    "0",
  )}`;
}

export function gregorianDateTimeToJalali(
  value?: string | null,
): DateTimeValue | null {
  if (!value) return null;

  const [datePart, timePart] = value.split(" ");

  const date = gregorianToJalali(datePart);
  const time = stringToTimeValue(timePart);

  if (!date || !time) return null;

  return {
    date,
    time,
  };
}

export function jalaliDateTimeToGregorian(
  value?: DateTimeValue | null,
): string {
  if (!value) return "";

  const date = jalaliToGregorian(value.date);
  const time = timeValueToString(value.time);

  if (!date || !time) return "";

  return `${date} ${time}`;
}
