"use client";

import React from "react";

import MediaUploadInput from "./MediaUploadInput";

interface VideoUploadInputProps {
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  className?: string;
  disabled?: boolean;
}

export default function VideoUploadInput({
  value,
  onChange,
  className,
  disabled,
}: VideoUploadInputProps) {
  return (
    <MediaUploadInput
      type="video"
      label="ویدیو"
      accept="video/*"
      value={value}
      onChange={onChange}
      className={className}
      disabled={disabled}
    />
  );
}
