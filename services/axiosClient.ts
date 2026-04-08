import axios from "axios";
import { axiosInterceptors } from "./axiosInterceptors";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
  },
});

axiosInterceptors(axiosClient);

export default axiosClient;
