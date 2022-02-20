import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const URL = 'https://' as const;

export const plainRequest: AxiosInstance = axios.create({
  baseURL: URL,
});

export const authRequest: AxiosInstance = axios.create({
  baseURL: URL,
});

// authRequest.interceptors.request.use(function (config: AxiosRequestConfig) {});
