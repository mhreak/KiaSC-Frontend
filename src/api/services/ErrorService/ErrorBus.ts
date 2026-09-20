import ApiError from "./ApiError";

type ErrorListener = (error: ApiError) => void;

class ErrorBus {
  private listeners: ErrorListener[] = [];

  emit(error: ApiError) {
    this.listeners.forEach((listener) => listener(error));
  }

  subscribe(listener: ErrorListener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}

export const errorBus = new ErrorBus();
