import axiosClient from "services/axiosClient";
import { TOKEN_NAME, USER_INFO_NAME } from "src/constants";
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
  logout : async () => {
    const response = await axiosClient.get("/logout");
    if(response){
      localStorage.removeItem(USER_INFO_NAME);
      localStorage.removeItem(TOKEN_NAME);
    }
    return response.data;
  }
};
