"use client";

import React from "react";

import MediaUploadInput from "./MediaUploadInput";

interface ImageUploadInputProps {
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  className?: string;
  disabled?: boolean;
}

export default function ImageUploadInput({
  value,
  onChange,
  className,
  disabled,
}: ImageUploadInputProps) {
  return (
    <MediaUploadInput
      type="image"
      label="تصویر"
      accept="image/*"
      value={value}
      onChange={onChange}
      className={className}
      disabled={disabled}
    />
  );
}
