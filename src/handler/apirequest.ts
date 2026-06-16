import axios, {
  type AxiosInstance,
  type AxiosRequestHeaders,
  type AxiosResponse,
} from "axios";
import { getBaseUrl } from "./domainHanlder";

const api: AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 15000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const handleResponse = <T>(res: AxiosResponse<T>): T => res.data;

const handleError = (error: any): Promise<never> => {
  return Promise.reject(
    error?.response?.data || {
      message: error.message || "Something went wrong",
    }
  );
};

// Common types
type Headers = AxiosRequestHeaders | Record<string, string>;

export const apiRequest = {
  // GET
  async get<T = any>(
    url: string,
    headers: Headers = {},
    params: Record<string, any> = {}
  ): Promise<T> {
    try {
      const res = await api.get<T>(url, { headers, params });
      return handleResponse<T>(res);
    } catch (error) {
      return handleError(error);
    }
  },

  // POST
  async post<T = any>(
    url: string,
    body: any = {},
    headers: Headers = {},
    params: Record<string, any> = {}
  ): Promise<T> {
    try {
      const res = await api.post<T>(url, body, { headers, params });
      return handleResponse<T>(res);
    } catch (error) {
      return handleError(error);
    }
  },

  // PUT
  async put<T = any>(
    url: string,
    body: any = {},
    headers: Headers = {},
    params: Record<string, any> = {}
  ): Promise<T> {
    try {
      const res = await api.put<T>(url, body, { headers, params });
      return handleResponse<T>(res);
    } catch (error) {
      return handleError(error);
    }
  },

  // PATCH
  async patch<T = any>(
    url: string,
    body: any = {},
    headers: Headers = {},
    params: Record<string, any> = {}
  ): Promise<T> {
    try {
      const res = await api.patch<T>(url, body, { headers, params });
      return handleResponse<T>(res);
    } catch (error) {
      return handleError(error);
    }
  },

  // DELETE
  async delete<T = any>(
    url: string,
    headers: Headers = {},
    params: Record<string, any> = {}
  ): Promise<T> {
    try {
      const res = await api.delete<T>(url, { headers, params });
      return handleResponse<T>(res);
    } catch (error) {
      return handleError(error);
    }
  },
};