import axiosClient from "services/axiosClient"
import { PREFIX_CATEGORY } from "src/constants/prefix"
import type { CategoryForm } from "types/globalTypes";


export const configApi = {
    category: {
        all: async () => {
            const response = await axiosClient.get(PREFIX_CATEGORY);
            return response?.data;
        },
        create: async (formData : CategoryForm) => {
            const response = await axiosClient.post(PREFIX_CATEGORY,formData);
            return response?.data;
        },
        update: async (id: number , formData: CategoryForm) => {
            const response = await axiosClient.put(`${PREFIX_CATEGORY}/${id}`,formData);
            return response?.data;
        },
        delete: async (id: number) => {
            if(!id) return;
            const response = await axiosClient.delete(`${PREFIX_CATEGORY}/${id}`);
            return response?.data;
        }
    }
}