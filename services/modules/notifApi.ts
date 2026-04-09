import axiosClient from "services/axiosClient"
import { PREFIX_NOTIF } from "src/constants/prefix"


export const checkNotif = async () => {
    const response = await axiosClient.get(PREFIX_NOTIF);
    return response.data;
}