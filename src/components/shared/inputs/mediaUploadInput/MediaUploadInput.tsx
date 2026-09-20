"use client";

import React, { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Mic, Video, X, FileIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type MediaType = "image" | "audio" | "video" | "file";

interface MediaUploadInputProps {
  value?: File | string | null;
  onChange?: (file: File | null) => void;

  type: MediaType;
  label: string;

  accept?: string;
  className?: string;
  disabled?: boolean;
}

const mediaConfig = {
  image: {
    icon: ImageIcon,
    accept: "image/*",
  },
  audio: {
    icon: Mic,
    accept: "audio/*",
  },
  video: {
    icon: Video,
    accept: "video/*",
  },
  file: {
    icon: FileIcon,
    accept: "*/*",
  },
} as const;

export default function MediaUploadInput({
  value,
  onChange,
  type,
  label,
  accept,
  className,
  disabled = false,
}: MediaUploadInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(
    typeof value === "string" ? value : null,
  );

  const [fileName, setFileName] = useState<string | null>(
    value instanceof File ? value.name : null,
  );

  const config = mediaConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (typeof value === "string") {
      setPreview(value);
      setFileName(null);
      return;
    }

    if (value instanceof File) {
      const url = URL.createObjectURL(value);

      setPreview(url);
      setFileName(value.name);

      return () => {
        URL.revokeObjectURL(url);
      };
    }

    setPreview(null);
    setFileName(null);
  }, [value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl);
    setFileName(file.name);

    onChange?.(file);
  };

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setFileName(null);

    onChange?.(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (disabled) return;

    inputRef.current?.click();
  };

  const hasValue = !!preview || !!fileName;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept ?? config.accept}
        className="hidden"
        disabled={disabled}
        onChange={handleFileChange}
      />

      <div
        onClick={handleClick}
        className={cn(
          "group relative flex size-24 flex-col items-center justify-center",
          "cursor-pointer rounded-2xl border border-border",
          "bg-background",
          "transition-all duration-200",
          "hover:bg-muted/40",
          "active:scale-95",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        {hasValue ? (
          <>
            {type === "image" && preview ? (
              <img
                src={preview}
                alt={label}
                className="absolute inset-0 size-full rounded-2xl object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-1 px-2">
                <Icon
                  className="size-6 text-muted-foreground"
                  strokeWidth={1.5}
                />

                <span
                  className="max-w-16 truncate text-[11px] text-muted-foreground"
                  title={fileName ?? undefined}
                >
                  {fileName ?? label}
                </span>
              </div>
            )}

            <Button
              type="button"
              onClick={handleRemove}
              variant="destructive"
              className={cn(
                "absolute -right-2 -top-2 z-20",
                "flex size-6 items-center justify-center",
                "rounded-full p-0",
              )}
            >
              <X className="size-3.5" />
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Icon className="size-6 text-muted-foreground" strokeWidth={1.5} />

            <span className="text-[12px] text-muted-foreground">{label}</span>
          </div>
        )}
      </div>
    </div>
  );
}
