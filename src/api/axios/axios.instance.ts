import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { ENV } from "@/config/env";
import TokenService from "../services/TokenService";
import AuthService from "../services/AuthService";
import ErrorService from "../services/ErrorService/ErrorService";
import { API_CONFIG } from "@/config/apiConfig";

export const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;

let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => {
    callback(token);
  });

  refreshSubscribers = [];
}

function onRefreshFailed() {
  refreshSubscribers = [];
}

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = TokenService.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const status = error.response?.status;

    if (status !== 401 || originalRequest?._retry) {
      const apiError = ErrorService.handle(error);
      return Promise.reject(apiError);
    }

    // Refresh request خودش نباید وارد این چرخه شود
    if (
      originalRequest.url?.includes(
        `${API_CONFIG.panel.admin}/auth/refresh-token`,
      )
    ) {
      TokenService.clearTokens();

      ErrorService.handle(error);

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;

          resolve(axiosInstance(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const newAccessToken = await AuthService.refreshToken();

      onRefreshed(newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      onRefreshFailed();
      TokenService.clearTokens();

      if (axios.isAxiosError(refreshError)) {
        const apiError = ErrorService.handle(refreshError);
        return Promise.reject(apiError);
      }

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
