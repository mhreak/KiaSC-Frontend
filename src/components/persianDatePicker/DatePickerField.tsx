// components/persian-date-picker/date-picker-field.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { JalaliDate } from '@/lib/calendar/types';
import { PersianDatePicker } from './PersianDatePicker';


interface DatePickerFieldProps {
  label?: string;
  value?: JalaliDate | null;
  onChange?: (date: JalaliDate | null) => void;
  error?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  minDate?: JalaliDate;
  maxDate?: JalaliDate;
  showClearButton?: boolean;
}

export function DatePickerField({
  label,
  value,
  onChange,
  error,
  required,
  className,
  disabled,
  readOnly,
  placeholder,
  minDate,
  maxDate,
  showClearButton,
}: DatePickerFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <PersianDatePicker
        value={value}
        onChange={onChange}
        error={error}
        disabled={disabled}
        // readOnly={readOnly}
        placeholder={placeholder}
        minDate={minDate}
        maxDate={maxDate}
        // showClearButton={showClearButton}
      />
    </div>
  );
}