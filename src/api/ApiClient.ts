import { AxiosRequestConfig } from "axios";
import httpService from "./services/HttpService";

export default class ApiClient {
  constructor(private readonly baseUrl: string) {}

  get<TResponse>(
    url: string,
    params?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    return httpService.get<TResponse>(`${this.baseUrl}${url}`, {
      ...config,
      params,
    });
  }

  post<TResponse, TRequest = unknown>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    return httpService.post<TResponse, TRequest>(
      `${this.baseUrl}${url}`,
      data,
      config,
    );
  }

  put<TResponse, TRequest = unknown>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    return httpService.put<TResponse, TRequest>(
      `${this.baseUrl}${url}`,
      data,
      config,
    );
  }

  patch<TResponse, TRequest = unknown>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    return httpService.patch<TResponse, TRequest>(
      `${this.baseUrl}${url}`,
      data,
      config,
    );
  }

  delete<TResponse>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    return httpService.delete<TResponse>(`${this.baseUrl}${url}`, config);
  }
}
