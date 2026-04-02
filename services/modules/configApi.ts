import axiosClient from "services/axiosClient"
import { PREFIX_CATEGORY, PREFIX_LABEL } from "src/constants/prefix"
import type { CategoryForm } from "types/globalTypes";

export const request_methods = (prefix : string) => {
    return {
        all: async () => {
            const response = await axiosClient.get(prefix);
            return response?.data;
        },
        create: async (formData : CategoryForm) => {
            const response = await axiosClient.post(prefix,formData);
            return response?.data;
        },
        update: async (id: number , formData: CategoryForm) => {
            const response = await axiosClient.put(`${prefix}/${id}`,formData);
            return response?.data;
        },
        delete: async (id: number) => {
            if(!id) return;
            const response = await axiosClient.delete(`${prefix}/${id}`);
            return response?.data;
        }
    }
}
export const configApi = {
    category: request_methods(PREFIX_CATEGORY),
    labels: request_methods(PREFIX_LABEL)
}