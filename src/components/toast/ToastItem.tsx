"use client";

import React, { useEffect, useState } from "react";
import { Toast, ToastType } from "@/types/toast.types";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { Button } from "../ui/button";

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 350);
  };

  const getToastStyles = (type: ToastType) => {
    const styles = {
      success: {
        bg: "bg-green-50 dark:bg-green-950/30",
        border: "border-green-500 dark:border-green-400",
        icon: "text-green-600 dark:text-green-400",
        iconBg: "bg-green-100 dark:bg-green-900/50",
        text: "text-green-900 dark:text-green-100",
        progress: "bg-green-500 dark:bg-green-400",
        ring: "ring-green-400/20",
      },
      error: {
        bg: "bg-red-50 dark:bg-red-950/30",
        border: "border-red-500 dark:border-red-400",
        icon: "text-red-600 dark:text-red-400",
        iconBg: "bg-red-100 dark:bg-red-900/50",
        text: "text-red-900 dark:text-red-100",
        progress: "bg-red-500 dark:bg-red-400",
        ring: "ring-red-400/20",
      },
      warning: {
        bg: "bg-amber-50 dark:bg-amber-950/30",
        border: "border-amber-500 dark:border-amber-400",
        icon: "text-amber-600 dark:text-amber-400",
        iconBg: "bg-amber-100 dark:bg-amber-900/50",
        text: "text-amber-900 dark:text-amber-100",
        progress: "bg-amber-500 dark:bg-amber-400",
        ring: "ring-amber-400/20",
      },
      info: {
        bg: "bg-blue-50 dark:bg-blue-950/30",
        border: "border-blue-500 dark:border-blue-400",
        icon: "text-blue-600 dark:text-blue-400",
        iconBg: "bg-blue-100 dark:bg-blue-900/50",
        text: "text-blue-900 dark:text-blue-100",
        progress: "bg-blue-500 dark:bg-blue-400",
        ring: "ring-blue-400/20",
      },
    };
    return styles[type];
  };

  const styles = getToastStyles(toast.type);

  const getIcon = (type: ToastType) => {
    const icons = {
      success: CheckCircle,
      error: XCircle,
      warning: AlertTriangle,
      info: Info,
    };
    return icons[type];
  };

  const IconComponent = getIcon(toast.type);

  return (
    <div
      className={cn(
        "w-full rounded-3xl shadow-lg",
        "backdrop-blur-sm",
        "transition-all duration-300 ease-out ",
        "transform-gpu will-change-transform",
        styles.bg,
        styles.border,
        isExiting ? "animate-toast-out" : "animate-slide-down",
      )}
      role="alert"
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon with ring effect */}
          <div
            className={cn(
              "shrink-0 rounded-full flex-center",
              "ring-2 ring-offset-2 ring-offset-transparent",
              styles.iconBg,
              styles.ring,
              toast.title ? "p-2" : "p-0.5",
            )}
          >
            <IconComponent
              className={cn(styles.icon, toast.title ? "size-8" : "size-6")}
              strokeWidth={2}
            />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center h-full">
            {toast.title && (
              <h3 className={cn("text-md font-semibold", styles.text)}>
                {toast.title}
              </h3>
            )}
            <p
              className={cn(
                "text-md wrap-break-word",
                styles.text,
                toast.title ? "mt-1" : "mt-1",
              )}
            >
              {toast.message}
            </p>
          </div>

          {/* Close button with X icon */}
          <Button onClick={handleClose} variant={"ghost"} size={"icon-sm"}>
            <X className="w-4 h-4" strokeWidth={2} />
          </Button>
        </div>

        {/* Progress bar */}
        {toast.duration && toast.duration > 0 && (
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-200/50 dark:bg-gray-700/50">
            <div
              className={cn("h-full rounded-full", styles.progress)}
              style={{
                width: "100%",
                animation: `shrink-width ${toast.duration}ms linear forwards`,
              }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shrink-width {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default ToastItem;
