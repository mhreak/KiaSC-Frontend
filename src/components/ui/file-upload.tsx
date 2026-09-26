"use client";

import {
  formatBytes,
  useFileUpload,
  type FileMetadata,
  type FileWithPreview,
} from "@/hooks/use-file-upload";

import { Alert, AlertDescription, AlertTitle } from "@/components/reui/alert";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  PlusIcon,
  FileIcon,
  XIcon,
  CircleAlertIcon,
  DownloadIcon,
} from "lucide-react";

import { toPersianDigits } from "@/utils/numberConversions";
import React from "react";
import { getFileIconConfig } from "../formBuilder/utils/file-input-helpers";
import { handleDownload } from "@/utils/utillityFunctions";

export interface ExistingFile {
  id: string;
  fileName: string;
  extension: string;
  url: string;
  thumbnailUrl: string | null;
  size: number;
}

interface FileUploadCompactProps {
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  error?: boolean;

  /**
   * فایل‌های جدید انتخاب‌شده توسط کاربر
   */
  onFilesChange?: (files: FileWithPreview[]) => void;

  /**
   * فایل‌های موجودی که از بک‌اند آمده‌اند
   */
  initialFiles?: ExistingFile[];

  /**
   * زمانی که یکی از فایل‌های قبلی حذف می‌شود
   */
  onExistingFilesChange?: (files: ExistingFile[]) => void;
}

export function FileUploadInput({
  maxFiles = 3,
  maxSize = 2 * 1024 * 1024,
  accept = undefined,
  multiple = true,
  disabled = false,
  className,
  error,
  onFilesChange,
  initialFiles = [],
  onExistingFilesChange,
}: FileUploadCompactProps) {
  const [
    { files, isDragging, errors },
    {
      removeFile,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles,
    maxSize,
    accept,
    multiple,
  });

  /**
   * فایل‌های موجود بک‌اند را داخل state نگه می‌داریم
   * تا حذف فایل قبلی هم مدیریت شود.
   */
  const [existingFiles, setExistingFiles] =
    React.useState<ExistingFile[]>(initialFiles);

  /**
   * اگر اطلاعات بک‌اند عوض شد، state را sync می‌کنیم.
   */
  React.useEffect(() => {
    setExistingFiles(initialFiles);
  }, [initialFiles]);

  /**
   * اطلاع دادن فایل‌های جدید به parent
   */
  const onFilesChangeRef = React.useRef(onFilesChange);

  React.useEffect(() => {
    onFilesChangeRef.current = onFilesChange;
  }, [onFilesChange]);

  React.useEffect(() => {
    onFilesChangeRef.current?.(files);
  }, [files]);

  /**
   * حذف فایل موجود از بک‌اند
   */
  const handleRemoveExistingFile = (fileId: string | number) => {
    const updatedFiles = existingFiles.filter((file) => file.id !== fileId);

    setExistingFiles(updatedFiles);

    onExistingFilesChange?.(updatedFiles);
  };

  /**
   * تشخیص image برای فایل جدید
   */
  const isImage = (file: File | FileMetadata) => {
    return file.type.startsWith("image/");
  };

  /**
   * تشخیص image برای فایل بک‌اند
   */
  const isExistingImage = (file: ExistingFile) => {
    const imageExtensions = [
      "jpg",
      "jpeg",
      "png",
      "gif",
      ".webp",
      "svg",
      "bmp",
    ];

    return imageExtensions.includes(file.extension.toLowerCase());
  };

  /**
   * تعداد کل فایل‌ها
   *
   * فایل‌های بک‌اند + فایل‌های جدید
   */
  const totalFiles = existingFiles.length + files.length;

  return (
    <div className={cn("w-full", className)}>
      {/* Upload Area */}
      <div
        className={cn(
          "border-border rounded-lg flex items-center gap-3 border border-dashed p-4 transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
          disabled && "pointer-events-none cursor-not-allowed opacity-50",
          error && "border-destructive/80 hover:border-destructive",
        )}
        onDragEnter={disabled ? undefined : handleDragEnter}
        onDragLeave={disabled ? undefined : handleDragLeave}
        onDragOver={disabled ? undefined : handleDragOver}
        onDrop={disabled ? undefined : handleDrop}
      >
        <input {...getInputProps()} className="sr-only" />

        {/* Upload Button */}
        <Button
          type="button"
          variant="secondary"
          onClick={openFileDialog}
          disabled={disabled || totalFiles >= maxFiles}
          size="sm"
          className={cn(isDragging && "animate-bounce")}
        >
          <PlusIcon className="h-4 w-4" />
          افزودن فایل
        </Button>

        {/* Files */}
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {totalFiles === 0 ? (
            <p className="text-muted-foreground text-sm">
              فایل را اینجا بکشید یا روی افزودن فایل کلیک کنید (حداکثر{" "}
              {toPersianDigits(maxFiles)} فایل)
            </p>
          ) : (
            <>
              {/* ========================= */}
              {/* Existing Backend Files */}
              {/* ========================= */}

              {existingFiles?.map((file) => (
                <div
                  key={`existing-${file.id}`}
                  className="group/item relative shrink-0"
                >
                  {isExistingImage(file) && file.thumbnailUrl ? (
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={file.thumbnailUrl ?? file.url}
                        alt={file.fileName}
                        className="h-12 w-12 rounded-lg border object-cover"
                        title={file.fileName}
                      />
                    </a>
                  ) : (
                    (() => {
                      const { icon: Icon, className } = getFileIconConfig(
                        file.extension,
                      );

                      return (
                        <div
                          className={cn(
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                            className,
                          )}
                        >
                          <Icon className="h-6 w-6" strokeWidth={1.8} />
                        </div>
                      );
                    })()
                  )}

                  {/* Download / Open */}
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute -bottom-2 -left-2 flex size-5 items-center justify-center rounded-full border bg-background opacity-0 shadow-md transition-opacity group-hover/item:opacity-100"
                    title="مشاهده فایل"
                  >
                    <DownloadIcon className="size-3" />
                  </a>

                  {/* Remove */}
                  <Button
                    type="button"
                    onClick={() => handleRemoveExistingFile(file.id)}
                    variant="outline"
                    size="icon"
                    disabled={disabled}
                    className="absolute -right-2 -top-2 size-5 rounded-full opacity-0 shadow-md transition-opacity group-hover/item:opacity-100"
                  >
                    <XIcon className="size-3" />
                  </Button>
                </div>
              ))}

              {/* ========================= */}
              {/* Newly Selected Files */}
              {/* ========================= */}

              {files.map((fileItem) => (
                <div key={fileItem.id} className="group/item relative shrink-0">
                  {isImage(fileItem.file) && fileItem.preview ? (
                    <img
                      src={fileItem.preview}
                      alt={fileItem.file.name}
                      className="h-12 w-12 rounded-lg border object-cover"
                      title={`${fileItem.file.name} (${formatBytes(
                        fileItem.file.size,
                      )})`}
                    />
                  ) : (
                    <div
                      className="bg-muted flex h-12 w-12 items-center justify-center rounded-lg border"
                      title={`${fileItem.file.name} (${formatBytes(
                        fileItem.file.size,
                      )})`}
                    >
                      <FileIcon className="text-muted-foreground h-5 w-5" />
                    </div>
                  )}

                  {/* Remove */}
                  <Button
                    type="button"
                    onClick={() => removeFile(fileItem.id)}
                    variant="outline"
                    size="icon"
                    className="absolute -right-2 -top-2 size-5 rounded-full opacity-0 shadow-md transition-opacity group-hover/item:opacity-100"
                  >
                    <XIcon className="size-3" />
                  </Button>
                </div>
              ))}
            </>
          )}
        </div>

        {/* File Count */}
        {totalFiles > 0 && (
          <div className="text-muted-foreground shrink-0 text-xs">
            {toPersianDigits(totalFiles)}/{toPersianDigits(maxFiles)}
          </div>
        )}
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <Alert variant="destructive" className="mt-5">
          <CircleAlertIcon />

          <AlertTitle>خطا در آپلود فایل!</AlertTitle>

          <AlertDescription>
            {errors.map((error, index) => (
              <p key={index} className="last:mb-0">
                {error}
              </p>
            ))}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
