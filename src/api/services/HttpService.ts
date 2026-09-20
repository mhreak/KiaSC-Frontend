import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../axios/axios.instance";

class HttpService {
  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.request<T>(config);

    return response.data;
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: "GET",
      url,
    });
  }

  post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({
      ...config,
      method: "POST",
      url,
      data,
    });
  }

  put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({
      ...config,
      method: "PUT",
      url,
      data,
    });
  }

  patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({
      ...config,
      method: "PATCH",
      url,
      data,
    });
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: "DELETE",
      url,
    });
  }
}

export default new HttpService();
