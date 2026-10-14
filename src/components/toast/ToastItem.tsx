"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

import { Toast, ToastType } from "@/types/toast.types";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    if (isExiting) {
      return;
    }

    setIsExiting(true);
  };

  useEffect(() => {
    if (!toast.duration || toast.duration <= 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      handleClose();
    }, toast.duration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [toast.duration]);

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

  const getIcon = (type: ToastType) => {
    const icons = {
      success: CheckCircle,
      error: XCircle,
      warning: AlertTriangle,
      info: Info,
    };

    return icons[type];
  };

  const styles = getToastStyles(toast.type);
  const IconComponent = getIcon(toast.type);

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: -35,
        scale: 0.94,
      }}
      animate={{
        opacity: isExiting ? 0 : 1,
        y: isExiting ? -30 : 0,
        scale: isExiting ? 0.96 : 1,
      }}
      exit={{
        opacity: 0,
        y: -30,
        scale: 0.96,
      }}
      transition={{
        layout: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        },

        default: {
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      onAnimationComplete={() => {
        if (isExiting) {
          onClose();
        }
      }}
      className={cn(
        "w-full",
        "rounded-3xl",
        "border",
        "shadow-lg",
        "backdrop-blur-sm",
        "transform-gpu",
        "will-change-transform",
        styles.bg,
      )}
      role="alert"
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className={cn(
              "flex shrink-0 items-center justify-center",
              "rounded-full",
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
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            {toast.title && (
              <h3 className={cn("text-md font-semibold", styles.text)}>
                {toast.title}
              </h3>
            )}

            <p className={cn("text-md wrap-break-word", styles.text, "mt-1")}>
              {toast.message}
            </p>
          </div>

          {/* Close */}
          <Button
            type="button"
            onClick={handleClose}
            variant="ghost"
            size="icon-sm"
            className="shrink-0"
            aria-label="بستن اعلان"
          >
            <X className="size-4" strokeWidth={2} />
          </Button>
        </div>

        {/* Progress */}
        {toast.duration && toast.duration > 0 && (
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-200/50 dark:bg-gray-700/50">
            <motion.div
              initial={{
                width: "100%",
              }}
              animate={{
                width: "0%",
              }}
              transition={{
                duration: toast.duration / 1000,
                ease: "linear",
              }}
              className={cn("h-full rounded-full", styles.progress)}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ToastItem;
