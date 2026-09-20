"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ToastItem from "./ToastItem";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  // تنظیمات پیش‌فرض برای نمایش در PWA
  const containerClasses = cn(
    "fixed z-50 flex flex-col gap-3",
    "max-h-screen overflow-hidden",
    "p-4 sm:p-6",
    // موقعیت‌های مختلف برای نمایش بهتر در PWA
    "top-4 left-1/2 -translate-x-1/2 ",
    "w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] md:w-[calc(100%-6rem)]",
    // حداکثر عرض برای جلوگیری از خیلی بزرگ شدن
    "max-w-2xl",
    // بهینه‌سازی برای PWA
    "safe-bottom safe-right",
    // پشتیبانی از notch
    "pt-safe pb-safe",
    toasts.length === 0 && "invisible",
  );

  return createPortal(
    <div className={containerClasses}>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>,
    document.body,
  );
};

export default ToastContainer;
