import axiosClient from "services/axiosClient";
import type { LoginFormData, RegisterFormDataTypes } from "types/globalTypes";

export const authApi = {
  login: async (data: LoginFormData) => {
    const response = await axiosClient.post("/login", data);
    return response.data;
  },
  register: async (data: RegisterFormDataTypes) => {
    const response = await axiosClient.post("/register", data);
    return response.data;
  },
};
