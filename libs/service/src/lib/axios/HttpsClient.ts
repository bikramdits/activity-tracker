// import store from "Stores";
import axios, { AxiosResponse } from 'axios';

export const BASE_URL = process.env.NX_PUBLIC_API_URL;

//axios Instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// axios response interceptor
axiosInstance.interceptors.response.use((response) => {
  return response;
});

// axios request  interceptor
axiosInstance.interceptors.request.use(function (config) {
  //refresh token
  const token = localStorage.getItem('accessToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export async function get<T>(url: string): Promise<T> {
  const response = await axiosInstance.get<T>(url);
  return response.data;
}

export async function post<T, D>(url: string, data: D): Promise<T> {
  const response = await axiosInstance.post<D, AxiosResponse<T>>(url, data);
  return response.data;
}

export async function put<T, D>(url: string, data: D): Promise<T> {
  const response = await axiosInstance.put<D, AxiosResponse<T>>(url, data);
  return response.data;
}

export async function del<T, D>(url: string): Promise<T> {
  const response = await axiosInstance.delete<D, AxiosResponse<T>>(url);
  return response.data;
}

export async function patch<T, D>(url: string, data: D): Promise<T> {
  const response = await axiosInstance.patch<D, AxiosResponse<T>>(url, data);
  return response.data;
}
export async function multipart<T, D>(url: string, data: D): Promise<T> {
  const response = await axiosInstance.post<D, AxiosResponse<T>>(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}
export async function multipartput<T, D>(url: string, data: D): Promise<T> {
  const response = await axiosInstance.put<D, AxiosResponse<T>>(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}
export default axiosInstance;
