import axiosClient from "services/axiosClient";
import type { LoginFormData } from "types/globalTypes";


export const authApi = {
    login: async (data: LoginFormData) => {
        const response = await axiosClient.post("/login", data);
        return response.data;
    }
}
