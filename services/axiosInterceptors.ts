import { TOKEN_NAME } from "src/constants";
import axiosClient from "./axiosClient";
import type { AxiosInstance } from "axios";

export const axiosInterceptors = (axiosClient: AxiosInstance) => {
  axiosClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(TOKEN_NAME);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  axiosClient.interceptors.response.use(
    (response) => {
      return response?.data;
    },
    (error) => {
      return Promise.reject(error.response.data || error.message);
    }
  );

  return axiosClient;
};
