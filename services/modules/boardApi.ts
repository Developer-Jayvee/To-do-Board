import axiosClient from "services/axiosClient"
import { PREFIX_TICKET } from "src/constants/prefix"
import type { TicketFormTypes } from "types/globalTypes";


export const boardApi = {
    create: async (formData : TicketFormTypes) => {
        const response = await axiosClient.post(PREFIX_TICKET,formData);
        return response.data;
    },
    fetch : async() => {
        const response = await axiosClient.get(PREFIX_TICKET);
        return response.data;
    }
}