"use client";

import { useContext } from "react";

import { ToastType } from "@/types/toast.types";
import { ToastContext } from "@/context/ToastContext";
import { toast as imperativeToast } from "@/lib/toast/toast";

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const showToast = (
    message: string,
    type: ToastType = "info",
    duration?: number,
    title?: string,
  ) => {
    context.addToast({
      message,
      type,
      duration,
      title,
    });
  };

  return {
    ...context,

    success: (message: string, title?: string, duration?: number) =>
      showToast(message, "success", duration, title),

    error: (message: string, title?: string, duration?: number) =>
      showToast(message, "error", duration, title),

    warning: (message: string, title?: string, duration?: number) =>
      showToast(message, "warning", duration, title),

    info: (message: string, title?: string, duration?: number) =>
      showToast(message, "info", duration, title),

    // API مستقل، قابل استفاده بدون Hook
    imperative: imperativeToast,
  };
};

export default useToast;
