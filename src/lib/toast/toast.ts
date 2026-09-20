import { ToastType } from "@/types/toast.types";

export interface ToastOptions {
  message: string;
  title?: string;
  duration?: number;
}

export interface ToastEvent extends ToastOptions {
  type: ToastType;
}

type ToastListener = (event: ToastEvent) => void;

const listeners = new Set<ToastListener>();

const emit = (event: ToastEvent) => {
  listeners.forEach((listener) => {
    listener(event);
  });
};

export const toast = {
  subscribe(listener: ToastListener) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  },

  show(
    message: string,
    type: ToastType = "info",
    title?: string,
    duration?: number,
  ) {
    emit({
      message,
      type,
      title,
      duration,
    });
  },

  success(message: string, title?: string, duration?: number) {
    emit({
      message,
      type: "success",
      title,
      duration,
    });
  },

  error(message: string, title?: string, duration?: number) {
    emit({
      message,
      type: "error",
      title,
      duration,
    });
  },

  warning(message: string, title?: string, duration?: number) {
    emit({
      message,
      type: "warning",
      title,
      duration,
    });
  },

  info(message: string, title?: string, duration?: number) {
    emit({
      message,
      type: "info",
      title,
      duration,
    });
  },
};
