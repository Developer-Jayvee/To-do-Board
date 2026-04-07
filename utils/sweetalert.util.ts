import Swal from "sweetalert2";


interface SweetAlertProps {
    icon : string;
    title : string;
    showCancelButton: boolean;
    timer ?: number;
}
export default function SweetAlert({
    icon , title , showCancelButton = false , timer
} : SweetAlertProps){
    return Swal.fire({
        icon: icon,
        title:title,
        showCancelButton:showCancelButton,
        timer: timer 
    });
}