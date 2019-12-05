import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';

export type XXXRequestConfig = AxiosRequestConfig;
export type XXXResponse<T> = AxiosResponse<T>;

export class XXXRequest {
  _instance: AxiosInstance;
  constructor(option?: XXXRequestConfig) {
    this._instance = axios.create(option);
  }

  get<T = any, R = XXXResponse<T>>(
    url: string,
    config?: XXXRequestConfig,
  ): Promise<R> {
    return axios.get<T, R>(url, config);
  }

  post<T = any, R = XXXResponse<T>>(
    url: string,
    data: any,
    config?: XXXRequestConfig,
  ): Promise<R> {
    return axios.post<T, R>(url, data, config);
  }

  delete<T = any, R = XXXResponse<T>>(
    url: string,
    config?: XXXRequestConfig,
  ): Promise<R> {
    return axios.delete<T, R>(url, config);
  }

  request<T = any, R = XXXResponse<T>>(config: XXXRequestConfig): Promise<R> {
    return axios.request<T, R>(config);
  }

  // 其他方法
}

export const xxxRequest = new XXXRequest();
