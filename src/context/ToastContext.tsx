"use client";

import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

import { Toast, ToastContextType } from "@/types/toast.types";
import { toast, ToastEvent } from "@/lib/toast/toast";

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

export const ToastProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (toastData: Omit<Toast, "id">) => {
      const id = crypto.randomUUID();

      const newToast: Toast = {
        ...toastData,
        id,
        duration: toastData.duration ?? 5000,
      };

      setToasts((prev) => [...prev, newToast]);

      const duration = newToast.duration ?? 5000;

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast],
  );

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  useEffect(() => {
    const unsubscribe = toast.subscribe((event: ToastEvent) => {
      addToast({
        message: event.message,
        type: event.type,
        title: event.title,
        duration: event.duration,
      });
    });

    return unsubscribe;
  }, [addToast]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        clearToasts,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
