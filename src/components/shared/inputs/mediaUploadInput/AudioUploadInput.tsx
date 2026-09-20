"use client";

import React from "react";

import MediaUploadInput from "./MediaUploadInput";

interface AudioUploadInputProps {
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  className?: string;
  disabled?: boolean;
}

export default function AudioUploadInput({
  value,
  onChange,
  className,
  disabled,
}: AudioUploadInputProps) {
  return (
    <MediaUploadInput
      type="audio"
      label="صدا"
      accept="audio/*"
      value={value}
      onChange={onChange}
      className={className}
      disabled={disabled}
    />
  );
}
