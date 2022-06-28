import { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

export interface BaseHeaders {
  ['Content-Type']: string;
  Accept: string;
  Authorization?: string;
}

export interface ApiRequestConfig extends AxiosRequestConfig {
  url: string;
  method?: Method;
}

export type ApiError = AxiosResponse;

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
